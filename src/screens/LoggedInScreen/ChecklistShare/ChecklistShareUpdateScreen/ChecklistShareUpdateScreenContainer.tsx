import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
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

  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureFlash, setCameraPictureFlash] = useState<boolean>(false);
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

  const launchImageLibraryFn = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 720,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
    }).then((images: any) => {
      images.map((i) => {
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: i.path},
        ]);
      });
    });
  };

  const takePictureFn = async (cameraRef) => {
    const options = {quality: 0.8, base64: true, width: 720, height: 720};
    const data = await cameraRef.current.takePictureAsync(options);
    setCameraPictureLast(data.uri);
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
      cameraPictureFlash={cameraPictureFlash}
      setCameraPictureFlash={setCameraPictureFlash}
      takePictureFn={takePictureFn}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      cameraPictureList={cameraPictureList}
      setCameraPictureList={setCameraPictureList}
    />
  );
};
