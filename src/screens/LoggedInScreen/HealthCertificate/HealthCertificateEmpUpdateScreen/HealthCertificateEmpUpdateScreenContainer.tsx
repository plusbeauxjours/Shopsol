import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ImageResizer from 'react-native-image-resizer';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import HealthCertificateEmpUpdateScreenPresenter from './HealthCertificateEmpUpdateScreenPresenter';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {
  getSTORE_HEALTH_EMP_LIST,
  removeHEALTH_EMP_DETAIL,
} from '~/redux/healthSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(params);
  const {EMP_SEQ = null, STORE_SEQ = null, STORE_HEALTH_SEQ = null} = params;
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [cameraPictureLast, setCameraPictureLast] = useState<any>(
    params?.IMG_LIST || null,
  );
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<any>(
    moment(params?.EDUCATION_DATE) || moment(),
  ); // 교육일시 / 검진일
  const [initEDUCATION_DATE, setInitEDUCATION_DATE] = useState<any>(
    moment(params?.EDUCATION_DATE) || moment(),
  );
  const [NAME, setNAME] = useState<string>(params?.NAME || ''); // 교육이수자성명 / 성명
  const [RESULT_COUNT, setRESULT_COUNT] = useState<any>(
    params?.RESULT_COUNT || null,
  ); // 회차

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = () => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '등록한 정보를 삭제하시겠습니까?',
      okCallback: () => {
        deleteFn();
      },
      okButtonText: '삭제',
      cancelButtonText: '취소',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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

  const submitFn = async () => {
    if (!cameraPictureLast) {
      return alertModal('보건증을 촬영해주세요.');
    }
    if (NAME.length === 0 || !NAME) {
      return alertModal('성명을 입력해주세요.');
    }
    if (RESULT_COUNT.length === 0 || !RESULT_COUNT) {
      return alertModal('회차를 입력해주세요.');
    }
    const reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    if (reg.test(moment(EDUCATION_DATE).format('YYYY-MM-DD')) === false) {
      return alertModal(
        '검진일 날짜형식은 "2020-01-01"과 같은 형식이어야 합니다. 사진이 인식되지 않는다면 항목을 눌러 날짜를 직접 선택해주세요.',
      );
    }
    try {
      dispatch(
        setSplashVisible({visible: true, fullText: '보건증을 수정중입니다.'}),
      );
      const formData: any = new FormData();
      formData.append('EMP_NAME', NAME);
      formData.append('EMP_SEQ', EMP_SEQ);
      formData.append('STORE_SEQ', STORE_SEQ);
      formData.append(
        'RESULT_DATE',
        moment(EDUCATION_DATE).format('YYYY-MM-DD'),
      );
      formData.append('RESULT_COUNT', RESULT_COUNT);
      formData.append('STORE_HEALTH_SEQ', STORE_HEALTH_SEQ);
      formData.append('MEMBER_SEQ', MEMBER_SEQ);

      const fileInfoArr = cameraPictureLast.split('/');
      const fileInfo = fileInfoArr[fileInfoArr.length - 1];
      const extensionIndex = fileInfo.indexOf('.');
      let fileName;
      let fileType;
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
      const {data} = await api.updateOcr(formData);
      if (data.result == '1') {
        dispatch(getSTORE_HEALTH_EMP_LIST());
        params?.fetchData();
        navigation.goBack();
        alertModal('수정 완료');
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const checkOrcFn = async () => {
    try {
      dispatch(
        setSplashVisible({
          visible: true,
          fullText: '문자인식(OCR) 기술로 정보를 인식중입니다.',
        }),
      );
      const formData: any = new FormData();
      formData.append('MEMBER_SEQ', MEMBER_SEQ);

      const fileInfoArr = cameraPictureLast.split('/');
      const fileInfo = fileInfoArr[fileInfoArr.length - 1];
      const extensionIndex = fileInfo.indexOf('.');
      let fileName;
      let fileType;
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
      const {data} = await api.checkOcr(formData);
      if (data.result == '0') {
        return alertModal(
          '인식 실패\n\n촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
        );
      } else {
        alertModal('인식 완료');
        setNAME(data.name);
        setEDUCATION_DATE(data.resultdate);
        setInitEDUCATION_DATE(data.resultdate);
        setRESULT_COUNT(data.count);
      }
    } catch (e) {
      alertModal(
        '인식 실패\n\n촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
      );
    } finally {
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const deleteFn = async () => {
    try {
      dispatch(getSTORE_HEALTH_EMP_LIST());
      dispatch(removeHEALTH_EMP_DETAIL(STORE_HEALTH_SEQ));
      navigation.pop(2);
      alertModal(
        `${moment(EDUCATION_DATE).format(
          'YYYY',
        )}년 위생교육증을 삭제하였습니다.`,
      );
      const {data} = await api.deleteStoreHealth({
        STORE_HEALTH_SEQ,
      });
      if (data.resultmsg === '0') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HealthCertificateEmpUpdateScreenPresenter
      checkOrcFn={checkOrcFn}
      confirmModal={confirmModal}
      takePictureFn={takePictureFn}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      submitFn={submitFn}
      NAME={NAME}
      setNAME={setNAME}
      RESULT_COUNT={RESULT_COUNT}
      setRESULT_COUNT={setRESULT_COUNT}
      EDUCATION_DATE={EDUCATION_DATE}
      initEDUCATION_DATE={initEDUCATION_DATE}
      setEDUCATION_DATE={setEDUCATION_DATE}
      setInitEDUCATION_DATE={setInitEDUCATION_DATE}
    />
  );
};
