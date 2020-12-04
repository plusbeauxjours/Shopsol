import React, {useState, useEffect, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

import ChecklistShareInsertScreenPresenter from './ChecklistShareInsertScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {
  getCHECKLIST_SHARE_DATA1,
  getCHECKLIST_SHARE_DATA2,
} from '~/redux/checklistshareSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollRef = createRef(0);

  const {STORE, MEMBER_SEQ, MEMBER_NAME} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [date, setDate] = useState<string>(params?.date);
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);

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

  const registerFn = async () => {
    if (cameraPictureList?.length > 0) {
      try {
        dispatch(setSplashVisible(true));
        const formData: any = new FormData();
        formData.append('TITLE', title);
        formData.append('CONTENTS', content);
        formData.append('ADDDATE', date);
        formData.append('STORE_SEQ', STORE_SEQ);
        formData.append('STORE', STORE);
        formData.append('EMP_NAME', MEMBER_NAME);
        formData.append('MEMBER_SEQ', MEMBER_SEQ);
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
        const {data} = await api.setNoticeImg(formData);
        if (data.result === 'SUCCESS') {
          alertModal(`${params.TITLE}이 등록되었습니다.`);
          if (params.TITLE === '지시사항') {
            dispatch(getCHECKLIST_SHARE_DATA1(date));
          } else {
            dispatch(getCHECKLIST_SHARE_DATA2(date));
          }
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.setNotice({
          TITLE: title,
          CONTENTS: content,
          STORE_SEQ,
          STORE,
          EMP_NAME: MEMBER_NAME,
          MEMBER_SEQ,
          ADDDATE: date,
        });
        if (data.result === 'SUCCESS') {
          alertModal(`${params.TITLE}이 등록되었습니다.`);
          if (params.TITLE === '지시사항') {
            dispatch(getCHECKLIST_SHARE_DATA1(date));
          } else {
            dispatch(getCHECKLIST_SHARE_DATA2(date));
          }
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  const selectPicture = () => {
    setCameraPictureList([...cameraPictureList, {uri: cameraPictureLast}]);
    setIsCameraModalVisible(false);
    setCameraPictureLast(null);
  };

  useEffect(() => {
    console.log(
      '===================',
      `${params?.TITLE} 등록`,
      '===================',
    );
    firebase.analytics().setCurrentScreen(`${params?.TITLE} 등록`);
  }, []);

  return (
    <ChecklistShareInsertScreenPresenter
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      date={date}
      setDate={setDate}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      TITLE={params?.TITLE}
      registerFn={registerFn}
      onPressImageFn={onPressImageFn}
      launchImageLibraryFn={launchImageLibraryFn}
      takePictureFn={takePictureFn}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      cameraPictureList={cameraPictureList}
      selectPicture={selectPicture}
      scrollRef={scrollRef}
    />
  );
};

// http://133.186.210.223:80/api/v2/Employee/getNotice2?STORE_SEQ=4878&STORE=1&DATE=2020-12-04&MEMBER_SEQ=11823
