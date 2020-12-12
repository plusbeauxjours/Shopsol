import React, {useState, useEffect, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import firebase from 'react-native-firebase';

import ChecklistShareUpdateScreenPresenter from './ChecklistShareUpdateScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import utils from '~/constants/utils';
import {setSplashVisible} from '~/redux/splashSlice';
import {
  updateCHECKLIST_SHARE_DATA,
  deleteCHECKLIST_SHARE_DATA,
  getCHECKLIST_SHARE_DATA1,
  getCHECKLIST_SHARE_DATA2,
} from '~/redux/checklistshareSlice';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollRef = createRef(0);

  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [title, setTitle] = useState<string>(params?.NOTI_TITLE);
  const [content, setContent] = useState<string>(params?.CONTENTS);

  const confirmModal = (content, okButtonText, warning, okCallback) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      cancelButtonText: '취소',
      okButtonText,
      warning,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onPressImageFn = (item) => {
    setCameraPictureList(
      cameraPictureList.filter(
        (cameraPictureItem) => cameraPictureItem.uri !== item.uri,
      ),
    );
  };

  const takePictureFn = async (cameraRef) => {
    const data = await cameraRef.current.takePictureAsync();
    return ImageResizer.createResizedImage(
      data.uri,
      800,
      1200,
      'JPEG',
      100,
      0,
      null,
      true,
    )
      .then((response) => {
        setCameraPictureLast(response.uri);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const launchImageLibraryFn = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
        maxHeight: 1200,
      },
      (response) => {
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: response.uri},
        ]);
      },
    );
  };

  const selectPicture = () => {
    scrollRef.current?.getNode()?.scrollToEnd({animated: true});
    setCameraPictureList([...cameraPictureList, {uri: cameraPictureLast}]);
    setIsCameraModalVisible(false);
    setCameraPictureLast(null);
  };

  const registerFn = async (sign) => {
    if (cameraPictureList?.length > 0) {
      try {
        const formData: any = new FormData();
        formData.append('TITLE', title);
        formData.append('CONTENTS', content);
        formData.append('NOTICE_SEQ', params?.NOTICE_SEQ);
        formData.append('CLOSE_FLAG', sign == 'close' ? '1' : '0');
        formData.append('MEMBER_SEQ', MEMBER_SEQ);
        if (sign == 'close') {
          navigation.pop(2);
          alertModal(`${params?.TITLE}이 삭제되었습니다.`);
          dispatch(
            deleteCHECKLIST_SHARE_DATA({
              TITLE: params?.TITLE,
              NOTICE_SEQ: params?.NOTICE_SEQ,
              isFavorite: params?.isFavorite,
            }),
          );
          const {data} = await api.updateNoticeImg(formData);
          if (data.result !== 'SUCCESS') {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          dispatch(setSplashVisible(true));
          for (let i = 0; i < cameraPictureList.length; i++) {
            const cameraPicture = cameraPictureList[i];
            const fileInfoArr = cameraPicture.uri.split('/');
            const fileInfo = fileInfoArr[fileInfoArr.length - 1];
            const extensionIndex = fileInfo.indexOf('.');
            let fileName = fileInfo;
            let fileType = '';
            if (extensionIndex > -1) {
              fileName = fileInfo;
              fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;
              if (fileType === 'image/jpg') {
                fileType = 'image/jpeg';
              }
            }
            formData.append('image', {
              uri: utils.isAndroid
                ? cameraPicture.uri
                : cameraPicture.uri.replace('file://', ''),
              name: fileName,
              type: fileType,
            });
          }
          const {data} = await api.updateNoticeImg(formData);
          if (data.result === 'SUCCESS') {
            navigation.pop(2);
            alertModal(`${params?.TITLE}이 수정되었습니다.`);
            dispatch(setSplashVisible(false));
            if (params?.ADDDATE) {
              if (params.TITLE === '지시사항') {
                dispatch(getCHECKLIST_SHARE_DATA1(params?.ADDDATE));
              } else {
                dispatch(getCHECKLIST_SHARE_DATA2(params?.ADDDATE));
              }
            }
          } else {
            alertModal('연결에 실패하였습니다.');
            dispatch(setSplashVisible(false));
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (sign == 'close') {
          navigation.pop(2);
          alertModal(`${params?.TITLE}이 삭제되었습니다.`);
          dispatch(
            deleteCHECKLIST_SHARE_DATA({
              TITLE: params?.TITLE,
              NOTICE_SEQ: params?.NOTICE_SEQ,
              isFavorite: params?.isFavorite,
            }),
          );
          const {data} = await api.updateNotice({
            TITLE: title,
            CONTENTS: content,
            NOTICE_SEQ: params?.NOTICE_SEQ,
            CLOSE_FLAG: '1',
          });
          if (data.result !== 'SUCCESS') {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          navigation.pop(2);
          alertModal(`${params?.TITLE}이 수정되었습니다.`);
          dispatch(
            updateCHECKLIST_SHARE_DATA({
              TITLE: params?.TITLE,
              title,
              content,
              NOTICE_SEQ: params?.NOTICE_SEQ,
              CLOSE_FLAG: sign == 'close' ? '1' : '0',
              isFavorite: params?.isFavorite,
              IMG_LIST: '',
            }),
          );
          const {data} = await api.updateNotice({
            TITLE: title,
            CONTENTS: content,
            NOTICE_SEQ: params?.NOTICE_SEQ,
            CLOSE_FLAG: '0',
          });
          if (data.result !== 'SUCCESS') {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (cameraPictureList?.length === 0 && params?.IMG_LIST) {
      const allimg = params?.IMG_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: `http://133.186.210.223/uploads/${allimg[i]}`},
        ]);
      }
    }
    console.log(
      '===================',
      `${params?.TITLE} 수정`,
      '===================',
    );
    firebase.analytics().setCurrentScreen(`${params?.TITLE} 수정`);
  }, []);

  return (
    <ChecklistShareUpdateScreenPresenter
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      TITLE={params?.TITLE}
      registerFn={registerFn}
      confirmModal={confirmModal}
      onPressImageFn={onPressImageFn}
      launchImageLibraryFn={launchImageLibraryFn}
      takePictureFn={takePictureFn}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      cameraPictureList={cameraPictureList}
      CREATE_TIME={params?.CREATE_TIME}
      selectPicture={selectPicture}
      scrollRef={scrollRef}
    />
  );
};
