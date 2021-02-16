import React, {useState, useEffect, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import analytics from '@react-native-firebase/analytics';
import ImageResizer from 'react-native-image-resizer';
import moment from 'moment';

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

  const {MEMBER_SEQ, MEMBER_NAME} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<string>(null);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [date, setDate] = useState<any>(moment(params?.date));
  const [initDate, setInitDate] = useState<any>(moment(params?.date));
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

  const registerFn = async () => {
    if (cameraPictureList?.length > 0) {
      try {
        dispatch(
          setSplashVisible({
            visible: true,
            fullText: `${params?.TITLE}이 등록중입니다.`,
          }),
        );
        const formData: any = new FormData();
        formData.append('TITLE', title);
        formData.append('CONTENTS', content);
        formData.append('ADDDATE', moment(date).format('YYYY-MM-DD'));
        formData.append('STORE_SEQ', STORE_SEQ);
        formData.append('STORE', params.TITLE == '지시사항' ? '1' : '0');
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
          console.log(cameraPicture.uri);
          formData.append('image', {
            uri: utils.isAndroid
              ? cameraPicture?.uri
              : cameraPicture?.uri.replace('file://', ''),
            name: fileName,
            type: fileType,
          });
        }
        const {data} = await api.setNoticeImg(formData);
        console.log(data);
        if (data.result === 'SUCCESS') {
          alertModal(`${params.TITLE}이 등록되었습니다.`);
          if (params.TITLE === '지시사항') {
            dispatch(
              getCHECKLIST_SHARE_DATA1(moment(date).format('YYYY-MM-DD')),
            );
          } else {
            dispatch(
              getCHECKLIST_SHARE_DATA2(moment(date).format('YYYY-MM-DD')),
            );
          }
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    } else {
      try {
        dispatch(setSplashVisible({visible: true}));
        const {data} = await api.setNotice({
          TITLE: title,
          CONTENTS: content,
          STORE_SEQ,
          STORE: params.TITLE == '지시사항' ? '1' : '0',
          EMP_NAME: MEMBER_NAME,
          MEMBER_SEQ,
          ADDDATE: moment(date).format('YYYY-MM-DD'),
        });
        if (data.result === 'SUCCESS') {
          alertModal(`${params.TITLE}이 등록되었습니다.`);
          if (params.TITLE === '지시사항') {
            dispatch(
              getCHECKLIST_SHARE_DATA1(moment(date).format('YYYY-MM-DD')),
            );
          } else {
            dispatch(
              getCHECKLIST_SHARE_DATA2(moment(date).format('YYYY-MM-DD')),
            );
          }
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    }
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
    ImagePicker.openPicker({
      multiple: false,
      forceJpg: true,
      mediaType: 'photo',
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 1200,
    }).then((photo: any) => {
      if (photo) {
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: photo.path},
        ]);
      }
    });
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
    analytics().logScreenView({
      screen_name: `${params?.TITLE} 등록`,
      screen_class: `${params?.TITLE} 등록`,
    });
  }, []);

  return (
    <ChecklistShareInsertScreenPresenter
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      date={date}
      initDate={initDate}
      setInitDate={setInitDate}
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
