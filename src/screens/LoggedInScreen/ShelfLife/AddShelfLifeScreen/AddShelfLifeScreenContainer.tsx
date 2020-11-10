import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import AddShelfLifeScreenPresenter from './AddShelfLifeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getSHELFLIFE_DATA} from '~/redux/shelflifeSlice';
import api from '~/constants/LoggedInApi';
import ImagePicker from 'react-native-image-crop-picker';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const [shelfLifeName, setShelfLifeName] = useState<string>('');
  const [shelfLifeDate, setShelfLifeDate] = useState<string>('');
  const [shelfLifeMemo, setShelfLifeMemo] = useState<string>('');
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );

  const alertModal = (title, text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      title: title,
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
      return alertModal('', '상품명을 입력해주세요.');
    }
    if (shelfLifeDate == '') {
      return alertModal('', '기한을 입력해주세요.', () =>
        setIsDateModalVisible(true),
      );
    }
    for (let i = 0; i < list.length; i++) {
      if (shelfLifeName == list[i].NAME && shelfLifeDate == list[i].DATE) {
        return alertModal('', '같은 일자에 동일한 상품이 작성되어 있습니다.');
      }
    }
    let buffer = list;
    buffer.unshift({
      shelfLifeNAME: shelfLifeName,
      shelfLifeDATE: shelfLifeDate,
      shelfLifeMEMO: shelfLifeMemo,
      shelfLifeIMAGE: cameraPictureLast,
    });
    setCameraPictureLast(null);
    setShelfLifeName('');
    setShelfLifeDate('');
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

  const submitFn = async () => {
    if (list.length == 0) {
      return alertModal(
        '',
        '등록하실 상품을 목록에 추가하신 후 등록을 해주세요.',
      );
    }
    try {
      alertModal('', '등록이 완료되었습니다.');
      navigation.goBack();
      dispatch(
        getSHELFLIFE_DATA(
          moment(shelfLifeDate).format('YYYY'),
          moment(shelfLifeDate).format('MM'),
          moment(shelfLifeDate).format('DD'),
        ),
      );
      const {data} = await api.setShelfLifeData({STORE_SEQ, LIST: list});
      if (data.result == '0') {
        alertModal('', '연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const takePictureFn = async (cameraRef) => {
    const options = {quality: 1.0, base64: true, width: 900, height: 900};
    const data = await cameraRef.current.takePictureAsync(options);
    setCameraPictureLast(data.uri);
  };

  const launchImageLibraryFn = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      includeBase64: true,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 720,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
    }).then((images: any) => {
      setCameraPictureLast(images.path);
    });
  };

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
    />
  );
};
