import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import {
  updateSHELFLIFE_DATA,
  removeSHELFLIFE_DATA,
} from '~/redux/shelflifeSlice';
import ShelfLifeUpdateScreenPresenter from './ShelfLifeUpdateScreenPresenter';
import utils from '~/constants/utils';
import {setSplashVisible} from '~/redux/splashSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shelfLife_SEQ = params?.shelfLife_SEQ || '';
  const [shelfLifeName, setShelfLifeName] = useState<string>(
    params?.shelfLifeName || '',
  );
  const [shelfLifeMemo, setShelfLifeMemo] = useState<string>(
    params?.shelfLifeMemo || '',
  );
  const [shelfLifeDate, setShelfLifeDate] = useState<any>(
    moment(params?.shelfLifeDate),
  );
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(
    params?.shelfLifeImage || '',
  );

  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteModal = (title, text) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      okCallback: () => {
        deleteShelfLife();
      },
      okButtonText: '삭제',
      cancelButtonText: '취소',
      warning: 'yes',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteShelfLife = async () => {
    try {
      alertModal('상품을 삭제하였습니다.');
      navigation.goBack();
      dispatch(removeSHELFLIFE_DATA({name: params?.name, shelfLife_SEQ}));
      await api.deleteShelfLifeData({shelfLife_SEQ});
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    if (shelfLifeName == '') {
      alertModal('업무명을 적어주세요.');
    }
    console.log('cameraPictureLast', cameraPictureLast);
    if (cameraPictureLast?.length === 0) {
      try {
        navigation.goBack();
        alertModal('수정이 완료되었습니다.');
        dispatch(
          updateSHELFLIFE_DATA({
            name: params?.name,
            shelfLife_SEQ,
            shelfLifeName,
            shelfLifeDate: moment(shelfLifeDate).format('YYYY-MM-DD'),
            shelfLifeMemo,
          }),
        );
        const {data} = await api.updateShelfLifeData({
          shelfLife_SEQ,
          shelfLifeNAME: shelfLifeName,
          shelfLifeDATE: moment(shelfLifeDate).format('YYYY-MM-DD'),
          shelfLifeMEMO: shelfLifeMemo,
        });
        await params?.fetchData();
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      const formData: any = new FormData();
      formData.append('shelfLife_SEQ', shelfLife_SEQ);
      formData.append('shelfLifeNAME', shelfLifeName);
      formData.append(
        'shelfLifeDATE',
        moment(shelfLifeDate).format('YYYY-MM-DD'),
      );
      formData.append('shelfLifeMEMO', shelfLifeMemo);

      const fileInfoArr = cameraPictureLast.split('/');
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
          ? cameraPictureLast
          : cameraPictureLast.replace('file://', ''),
        name: fileName,
        type: fileType,
      });

      try {
        navigation.goBack();
        alertModal('수정이 완료되었습니다.');
        dispatch(
          updateSHELFLIFE_DATA({
            name: params?.name,
            shelfLife_SEQ,
            shelfLifeName,
            shelfLifeDate: moment(shelfLifeDate).format('YYYY-MM-DD'),
            shelfLifeMemo,
          }),
        );
        const {data} = await api.updateShelfLifeDataImg(formData);
        await params?.fetchData();
        if (data.result == '0') {
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
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
        maxHeight: 1200,
      },
      (response) => {
        !response.didCancel && setCameraPictureLast(response.uri);
      },
    );
  };

  return (
    <ShelfLifeUpdateScreenPresenter
      deleteModal={deleteModal}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      shelfLifeName={shelfLifeName}
      setShelfLifeName={setShelfLifeName}
      shelfLifeDate={shelfLifeDate}
      setShelfLifeDate={setShelfLifeDate}
      shelfLifeMemo={shelfLifeMemo}
      setShelfLifeMemo={setShelfLifeMemo}
      takePictureFn={takePictureFn}
      launchImageLibraryFn={launchImageLibraryFn}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      submit={submit}
      alertModal={alertModal}
    />
  );
};
