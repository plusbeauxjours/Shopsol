import React, {useState} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import HealthCertificateEmpFormScreenPresenter from './HealthCertificateEmpFormScreenPresenter';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {EMP_SEQ = null} = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<any>(
    moment().format('YYYY-MM-DD'),
  ); // 교육일시 / 검진일
  const [NAME, setNAME] = useState<string>(params?.NAME || ''); // 교육이수자성명 / 성명
  const [RESULT_COUNT, setRESULT_COUNT] = useState<any>(params?.RESULT_COUNT); // 회차

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const takePictureFn = async (cameraRef) => {
    const options = {quality: 1.0, base64: true, width: 900, height: 900};
    const data = await cameraRef.current.takePictureAsync(options);
    setCameraPictureLast(data.uri);
  };

  const submitFn = async () => {
    const reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    if (reg.test(EDUCATION_DATE) === false) {
      return alertModal(
        '검진일 날짜형식',
        '검진일 날짜형식은 "2020-01-01"과 같은 형식이어야 합니다. 사진이 인식되지 않는다면 항목을 눌러 날짜를 직접 선택해주세요.',
      );
    }

    if (NAME.length === 0 || !NAME) {
      return alertModal('', '성명을 입력해주세요.');
    }
    if (RESULT_COUNT.length === 0 || !RESULT_COUNT) {
      alertModal('', '회차를 입력해주세요.');
    }
    try {
      dispatch(setSplashVisible(true));
      const formData: any = new FormData();
      formData.append('EMP_NAME', NAME);
      formData.append('EMP_SEQ', EMP_SEQ);
      formData.append('STORE_SEQ', STORE_SEQ);
      formData.append('RESULT_DATE', EDUCATION_DATE);
      formData.append('RESULT_COUNT', RESULT_COUNT);
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
      const {data} = await api.saveOcr(formData);
      if (data.result == '1') {
        {
          params?.fetchData && params?.fetchData();
        }
        navigation.goBack();
        alertModal('', '저장 완료');
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const checkOrcFn = async () => {
    try {
      dispatch(setSplashVisible(true));
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
          '인식 실패',
          '촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
        );
      } else {
        alertModal('', '인식 완료');
        setNAME(data.name);
        setEDUCATION_DATE(data.resultdate);
        setRESULT_COUNT(data.count);
      }
    } catch (e) {
      alertModal(
        '인식 실패',
        '촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
      );
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  return (
    <HealthCertificateEmpFormScreenPresenter
      submitFn={submitFn}
      checkOrcFn={checkOrcFn}
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      NAME={NAME}
      setNAME={setNAME}
      RESULT_COUNT={RESULT_COUNT}
      setRESULT_COUNT={setRESULT_COUNT}
      EDUCATION_DATE={EDUCATION_DATE}
      setEDUCATION_DATE={setEDUCATION_DATE}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      takePictureFn={takePictureFn}
    />
  );
};
