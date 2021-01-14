import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import AddShelfLifeScreenPresenter from './AddShelfLifeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {setSplashVisible} from '~/redux/splashSlice';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const shelfLifeDataTempList = [];

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const [shelfLifeName, setShelfLifeName] = useState<string>('');
  const [shelfLifeDate, setShelfLifeDate] = useState<any>(moment());
  const [shelfLifeDateSet, setShelfLifeDateSet] = useState<boolean>(false);
  const [shelfLifeMemo, setShelfLifeMemo] = useState<string>('');
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [barCodeCameraModalOpen, setBarCodeCameraModalOpen] = useState<boolean>(
    false,
  );
  const [codenumber, setCodenumber] = useState<string>('');

  const alertModal = (text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      content: text,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const addFn = () => {
    if (shelfLifeName == '') {
      return alertModal('상품명을 입력해주세요.');
    }
    if (!shelfLifeDateSet) {
      return alertModal('기한을 입력해주세요.', () =>
        setIsDateModalVisible(true),
      );
    }

    for (let i = 0; i < list.length; i++) {
      if (
        shelfLifeName == list[i].shelfLifeNAME &&
        moment(shelfLifeDate).format('YYYY-MM-DD') == list[i].shelfLifeDATE
      ) {
        return alertModal('같은 일자에 동일한 상품이 작성되어 있습니다.');
      }
    }
    let buffer = list;
    buffer.unshift({
      shelfLifeNAME: shelfLifeName,
      shelfLifeDATE: moment(shelfLifeDate).format('YYYY-MM-DD'),
      shelfLifeMEMO: shelfLifeMemo,
      shelfLifeIMAGE: cameraPictureLast,
    });
    setCameraPictureLast(null);
    setShelfLifeName('');
    setShelfLifeDate(moment());
    setShelfLifeDateSet(false);
    setShelfLifeMemo('');
    setList(buffer);
  };

  const deleteBuffer = (name, date) => {
    setTimeout(() => {
      setList((buffer) =>
        buffer.filter(
          (item) => item.shelfLifeNAME !== name || item.shelfLifeDATE !== date,
        ),
      );
    }, 200);
  };

  const submitShelfLifeDataImg = async (i, shelfLifeSTORE_SEQ) => {
    const formData: any = new FormData();
    formData.append('STORE_SEQ', shelfLifeSTORE_SEQ);
    formData.append('shelfLifeDATE', i.shelfLifeDATE);
    formData.append('shelfLifeMEMO', i.shelfLifeMEMO);
    formData.append('shelfLifeNAME', i.shelfLifeNAME);

    const fileInfoArr = i.shelfLifeIMAGE.split('/');
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
        ? i.shelfLifeIMAGE
        : i.shelfLifeIMAGE.replace('file://', ''),
      name: fileName,
      type: fileType,
    });

    try {
      const {data} = await api.setShelfLifeDataImg(formData);
      await params?.fetchData();
      if (data.result == '0') {
        alertModal('연결에 실패하였습니다.');
      } else {
        alertModal('등록이 완료되었습니다.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const submitFn = async () => {
    if (list.length == 0) {
      return alertModal('등록하실 상품을 목록에 추가하신 후 등록을 해주세요.');
    }
    list.map((i) =>
      i.shelfLifeIMAGE
        ? submitShelfLifeDataImg(i, STORE_SEQ)
        : shelfLifeDataTempList.push(i),
    );
    dispatch(setSplashVisible({visible: true}));
    navigation.goBack();
    if (shelfLifeDataTempList.length > 0) {
      try {
        const {data} = await api.setShelfLifeData({
          STORE_SEQ,
          LIST: shelfLifeDataTempList,
        });
        await params?.fetchData();
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        } else {
          alertModal('등록이 완료되었습니다.');
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

  const handleBarCodeScanned = async (codenumber) => {
    setBarCodeCameraModalOpen(false);
    if (!codenumber) {
      setTimeout(() => {
        alertModal('바코드를 읽을 수 없습니다.');
      }, 100);
    } else {
      setCodenumber(codenumber);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(setSplashVisible({visible: true}));
        if (codenumber !== '') {
          const {data} = await api.getBarCode(codenumber);
          if (data.resultdata?.length > 0) {
            dispatch(setSplashVisible({visible: false}));
            setShelfLifeName(data.resultdata[0].NAME);
            setShelfLifeMemo(data.resultdata[0].BRAND);
            setCameraPictureLast(data.resultdata[0].IMG);
          } else {
            dispatch(setSplashVisible({visible: false}));
            setTimeout(() => {
              alertModal('등록된 데이터가 없습니다.');
            }, 100);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setCodenumber('');
        dispatch(setSplashVisible({visible: false}));
      }
    })();
  }, [codenumber]);

  return (
    <AddShelfLifeScreenPresenter
      addFn={addFn}
      explainModal={explainModal}
      deleteBuffer={deleteBuffer}
      submitFn={submitFn}
      list={list}
      shelfLifeName={shelfLifeName}
      setShelfLifeName={setShelfLifeName}
      shelfLifeMemo={shelfLifeMemo}
      setShelfLifeMemo={setShelfLifeMemo}
      shelfLifeDate={shelfLifeDate}
      setShelfLifeDate={setShelfLifeDate}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      takePictureFn={takePictureFn}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      launchImageLibraryFn={launchImageLibraryFn}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      alertModal={alertModal}
      shelfLifeDateSet={shelfLifeDateSet}
      setShelfLifeDateSet={setShelfLifeDateSet}
      barCodeCameraModalOpen={barCodeCameraModalOpen}
      setBarCodeCameraModalOpen={setBarCodeCameraModalOpen}
      handleBarCodeScanned={handleBarCodeScanned}
    />
  );
};
