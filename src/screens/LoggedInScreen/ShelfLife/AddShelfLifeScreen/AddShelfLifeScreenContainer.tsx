import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import AddShelfLifeScreenPresenter from './AddShelfLifeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import ImagePicker from 'react-native-image-crop-picker';
import * as IOSImagePicker from 'react-native-image-picker';

import ImageResizer from 'react-native-image-resizer';
import {setSplashVisible, setLoadingVisible} from '~/redux/splashSlice';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const shelfLifeDataTempList = [];

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const [shelfLifeName, setShelfLifeName] = useState<string>('');
  const [shelfLifeDate, setShelfLifeDate] = useState<any>(moment());
  const [initShelfLifeDate, setInitShelfLifeDate] = useState<any>(moment());
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
  const [codenumber, setCodenumber] = useState<string>(null);
  const [shelfLifeBarcode, setShelfLifeBarcode] = useState<string>(null);
  const [shelfLifeImgLink, setShelfLifeImgLink] = useState<string>(null);
  const [
    barCodeInputCameraModalOpen,
    setBarCodeInputCameraModalOpen,
  ] = useState<boolean>(false);

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

  // 목록에 추가하기 버튼
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
        return alertModal('같은 일자에 동일한 상품명이 작성되어 있습니다.');
      }
      if (
        shelfLifeBarcode &&
        shelfLifeBarcode == list[i].shelfLifeBarcode &&
        moment(shelfLifeDate).format('YYYY-MM-DD') == list[i].shelfLifeDATE
      ) {
        return alertModal(
          '같은 일자에 동일한 바코드의 상품이 작성되어 있습니다.',
        );
      }
    }
    let buffer = list;
    buffer.unshift({
      shelfLifeNAME: shelfLifeName,
      shelfLifeDATE: moment(shelfLifeDate).format('YYYY-MM-DD'),
      shelfLifeMEMO: shelfLifeMemo,
      shelfLifeIMAGE: cameraPictureLast,
      shelfLifeBarcode,
      shelfLifeImgLink,
    });
    setCameraPictureLast(null);
    setShelfLifeName('');
    setShelfLifeDate(moment());
    setInitShelfLifeDate(moment());
    setShelfLifeDateSet(false);
    setShelfLifeMemo('');
    setShelfLifeBarcode(null);
    setShelfLifeImgLink(null);
    setList(buffer);
  };

  // 유통기한 목록에서 제거
  const deleteBuffer = (name, date) => {
    setTimeout(() => {
      setList((buffer) =>
        buffer.filter(
          (item) => item.shelfLifeNAME !== name || item.shelfLifeDATE !== date,
        ),
      );
    }, 200);
  };

  // 이미지가 있는 유통기한 등록
  const submitShelfLifeDataImg = async (i, shelfLifeSTORE_SEQ) => {
    try {
      dispatch(setLoadingVisible(true));
      const formData: any = new FormData();
      formData.append('STORE_SEQ', shelfLifeSTORE_SEQ);
      formData.append('shelfLifeDATE', i.shelfLifeDATE);
      formData.append('shelfLifeMEMO', i.shelfLifeMEMO);
      formData.append('shelfLifeNAME', i.shelfLifeNAME);
      formData.append('shelfLifeBarcode', i.shelfLifeBarcode);
      formData.append('shelfLifeImgLink', i.shelfLifeImgLink);

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

      const {data} = await api.setShelfLifeDataImg(formData);
      if (data.result == '0') {
        alertModal('연결에 실패하였습니다.');
      } else {
        dispatch(setLoadingVisible(false));
      }
    } catch (e) {
      console.log(e);
      alertModal('연결에 실패하였습니다.');
    } finally {
      dispatch(setLoadingVisible(false));
    }
  };

  // 유통기한 등록 (이미지가 있는 유통기한 등록 & 이미지가 없는 유통기한 등록)
  const submitFn = async () => {
    if (list.length == 0) {
      return alertModal('등록하실 상품을 목록에 추가하신 후 등록을 해주세요.');
    }
    try {
      // 로딩스피너
      dispatch(
        setSplashVisible({
          visible: true,
          fullText: '유통기한을 등록중입니다.',
        }),
      );
      // 이미지가 없는 업무는 리스트를 파라미터로 받기 때문에 빈리스트에 푸시
      list.map(
        (i, index) => !i.shelfLifeIMAGE && shelfLifeDataTempList.push(i),
      );
      // 이미지가 없는 유통기한 리퀘스트
      if (shelfLifeDataTempList.length > 0) {
        const {data} = await api.setShelfLifeData({
          STORE_SEQ,
          LIST: shelfLifeDataTempList,
        });
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        } else {
          alertModal('등록이 완료되었습니다.');
        }
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      navigation.goBack();
      // 이미지가 있는 업무는 업무하나에 리퀘스트 하나를 보내기때문에 시간이 오래걸림
      // 그 동안 리프레쉬를 하여서 이미지가 없는 업무를 등록한 것을 렌더
      dispatch(setSplashVisible({visible: false}));
      // 루프를 돌면서 이미지가 있는 업무를 등록
      list.map((i, index) => {
        if (list.length - 1 == index) {
          params?.onRefresh();
        }
        i.shelfLifeIMAGE && submitShelfLifeDataImg(i, STORE_SEQ);
      });
    }
  };

  // 카메라로 사진 촬영 후 압축
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
      .then((res) => {
        setCameraPictureLast(res.uri);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 디바이스의 앨범에서 사진 선택 후 압축
  // 이미지 등록에 이슈가 있어서 플랫폼에 따라 다른 라이브러리를 사용 중
  // 오랜 삽질을 거쳐서 최적화됨
  const launchImageLibraryFn = () => {
    utils.isAndroid()
      ? ImagePicker.openPicker({
          multiple: false,
          forceJpg: true,
          mediaType: 'photo',
          compressImageMaxWidth: 800,
          compressImageMaxHeight: 1200,
        }).then((res: any) => {
          if (res) {
            setCameraPictureLast(res.path);
          }
        })
      : IOSImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 1200,
          },
          (res) => {
            !res.didCancel && setCameraPictureLast(res.uri);
          },
        );
  };

  // 카메라로 바코드를 스캔하여 유통기한아이템을 등록 할 때 실행
  const handleBarCodeScanned = async (codenumber) => {
    await setBarCodeCameraModalOpen(false);
    if (!codenumber) {
      setTimeout(() => {
        alertModal('바코드를 읽을 수 없습니다.');
      }, 100);
    } else {
      setCodenumber(codenumber);
    }
  };

  // 유통기한 아이템을 등록 할 때 바코드를 옵션으로 등록하려고 할 때 실행(홀딩 feat.대표님)
  const handleBarCodeInputScanned = async (codenumber) => {
    await setBarCodeInputCameraModalOpen(false);
    if (!codenumber) {
      setTimeout(() => {
        alertModal('바코드를 읽을 수 없습니다.');
      }, 100);
    } else {
      setShelfLifeBarcode(codenumber);
    }
  };

  // 바코드로 아이템을 스캔 후 정보를 받아왔을 때, 입력
  useEffect(() => {
    (async () => {
      if (codenumber?.length > 0) {
        try {
          dispatch(setSplashVisible({visible: true, text: '유통기한'}));
          if (codenumber) {
            const {data} = await api.getBarCode(codenumber);
            if (data.message == 'SUCCESS') {
              dispatch(setSplashVisible({visible: false}));
              setShelfLifeName(data.resultdata[0].NAME);
              setShelfLifeMemo(data.resultdata[0].BRAND);
              setShelfLifeBarcode(data.resultdata[0].codenumber);
              setShelfLifeImgLink(data.resultdata[0].IMG);
            } else {
              dispatch(setSplashVisible({visible: false}));
              setTimeout(() => {
                setShelfLifeBarcode(codenumber);
                alertModal(
                  '등록된 데이터가 없습니다.\n직접입력하여 진행해 주세요.',
                );
              }, 100);
            }
          }
        } catch (e) {
          console.log(e);
        } finally {
          setCodenumber(null);
          dispatch(setSplashVisible({visible: false}));
        }
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
      initShelfLifeDate={initShelfLifeDate}
      setInitShelfLifeDate={setInitShelfLifeDate}
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
      handleBarCodeInputScanned={handleBarCodeInputScanned}
      shelfLifeBarcode={shelfLifeBarcode}
      setShelfLifeBarcode={setShelfLifeBarcode}
      barCodeInputCameraModalOpen={barCodeInputCameraModalOpen}
      setBarCodeInputCameraModalOpen={setBarCodeInputCameraModalOpen}
      shelfLifeImgLink={shelfLifeImgLink}
      setShelfLifeImgLink={setShelfLifeImgLink}
    />
  );
};
