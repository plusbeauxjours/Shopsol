import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import * as IOSImagePicker from 'react-native-image-picker';

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
import {setSplashVisible, setLoadingVisible} from '~/redux/splashSlice';

// 업데이트 스크린은 parmas로 기존의 정보를 모두 받아서 기본 렌더를 함
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
  const [initShelfLifeDate, setInitShelfLifeDate] = useState<any>(
    moment(params?.shelfLifeDate),
  );
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(
    params?.shelfLifeImage || null,
  );

  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [barCodeCameraModalOpen, setBarCodeCameraModalOpen] = useState<boolean>(
    false,
  );
  const [codenumber, setCodenumber] = useState<string>(null);
  const [shelfLifeBarcode, setShelfLifeBarcode] = useState<string>(
    params?.shelfLifeBarcode || null,
  );
  const [shelfLifeImgLink, setShelfLifeImgLink] = useState<string>(
    params?.shelfLifeImgLink || null,
  );
  const [
    barCodeInputCameraModalOpen,
    setBarCodeInputCameraModalOpen,
  ] = useState<boolean>(false);

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 삭제 버튼을 탭하였을 때
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

  // 삭제 API
  const deleteShelfLife = async () => {
    try {
      dispatch(removeSHELFLIFE_DATA({name: params?.name, shelfLife_SEQ}));
      const {data} = await api.deleteShelfLifeData({shelfLife_SEQ});
      if (data.resultmsg === 'success') {
        alertModal('상품을 삭제하였습니다.');
        navigation.goBack();
      } else {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 수정 API
  const submit = async () => {
    if (shelfLifeName == '') {
      alertModal('업무명을 적어주세요.');
    }
    if (!cameraPictureLast) {
      // 이미지가 없을 때
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
            IMG_LIST: null,
            shelfLifeBarcode,
            shelfLifeImgLink,
          }),
        );
        const {data} = await api.updateShelfLifeData({
          shelfLife_SEQ,
          shelfLifeNAME: shelfLifeName,
          shelfLifeDATE: moment(shelfLifeDate).format('YYYY-MM-DD'),
          shelfLifeMEMO: shelfLifeMemo,
          shelfLifeBarcode,
          shelfLifeImgLink,
        });
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      // 이미지가 있을 때
      try {
        navigation.goBack();
        alertModal('수정이 완료되었습니다.');
        dispatch(setLoadingVisible(true));
        const formData: any = new FormData();
        formData.append('shelfLife_SEQ', shelfLife_SEQ);
        formData.append('shelfLifeNAME', shelfLifeName);
        formData.append(
          'shelfLifeDATE',
          moment(shelfLifeDate).format('YYYY-MM-DD'),
        );
        formData.append('shelfLifeMEMO', shelfLifeMemo);
        formData.append('shelfLifeBarcode', shelfLifeBarcode);
        formData.append('shelfLifeImgLink', shelfLifeImgLink);

        const fileInfoArr = cameraPictureLast?.split('/');
        const fileInfo = fileInfoArr[fileInfoArr?.length - 1];
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
            ? cameraPictureLast?.uri
            : cameraPictureLast?.uri.replace('file://', ''),
          name: fileName,
          type: fileType,
        });

        dispatch(
          updateSHELFLIFE_DATA({
            name: params?.name,
            shelfLife_SEQ,
            shelfLifeName,
            shelfLifeDate: moment(shelfLifeDate).format('YYYY-MM-DD'),
            shelfLifeMemo,
            IMG_LIST: cameraPictureLast,
            shelfLifeBarcode,
            shelfLifeImgLink,
          }),
        );
        const {data} = await api.updateShelfLifeDataImg(formData);
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        } else {
          dispatch(setLoadingVisible(false));
        }
      } catch (e) {
        console.log(e);
      }
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
          console.log(res);
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
            console.log(res);
            !res.didCancel && setCameraPictureLast(res.uri);
          },
        );
  };

  // 카메라로 바코드를 스캔하여 유통기한아이템을 등록 할 때 실행
  const handleBarCodeScanned = async (codenumber) => {
    console.log(codenumber);
    await setBarCodeCameraModalOpen(false);
    if (!codenumber) {
      setTimeout(() => {
        alertModal('바코드를 읽을 수 없습니다.');
      }, 100);
    } else {
      setCodenumber(codenumber);
    }
  };

  // 유통기한아이템을 등록 할 때 바코드를 옵션으로 등록하려고 할 때 실행(홀딩 feat.대표님)
  const handleBarCodeInputScanned = async (codenumber) => {
    console.log(codenumber);
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
      initShelfLifeDate={initShelfLifeDate}
      setInitShelfLifeDate={setInitShelfLifeDate}
      shelfLifeMemo={shelfLifeMemo}
      setShelfLifeMemo={setShelfLifeMemo}
      takePictureFn={takePictureFn}
      launchImageLibraryFn={launchImageLibraryFn}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      submit={submit}
      alertModal={alertModal}
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
