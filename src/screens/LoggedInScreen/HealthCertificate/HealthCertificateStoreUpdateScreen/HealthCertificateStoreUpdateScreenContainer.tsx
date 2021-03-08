import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ImageResizer from 'react-native-image-resizer';

import HealthCertificateStoreUpdateScreenPresenter from './HealthCertificateStoreUpdateScreenPresenter';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {setSplashVisible} from '~/redux/splashSlice';
import {
  removeHEALTH_STORE_DETAIL,
  getHEALTH_CERTIFICATE_DATA,
} from '~/redux/healthSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE_SEQ = null, CEO_HEALTH_SEQ = null} = params;
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(
    params?.IMG_LIST || null,
  );
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [NAME, setNAME] = useState<string>(params?.NAME || ''); // 교육이수자성명 / 성명
  const [owner, setOwner] = useState<string>(params?.owner || ''); // 대표자성명
  const [storename, setStorename] = useState<string>(params?.storename || ''); // 영업소 명칭
  const [businesstype, setBusinesstype] = useState<string>(
    params?.businesstype || '',
  ); // 영업의종류
  const [position, setPosition] = useState<string>(params?.position || ''); // 직책
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<any>(
    moment(params?.EDUCATION_DATE) || moment(),
  ); // 교육일시 / 검진일
  const [initEDUCATION_DATE, setInitEDUCATION_DATE] = useState<any>(
    moment(params?.EDUCATION_DATE) || moment(),
  );
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<'online' | 'offline'>(
    params?.EDUCATION_TYPE || 'online',
  ); // 교육구분

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

  const toggleEducationType = () => {
    if (EDUCATION_TYPE === 'online') {
      return setEDUCATION_TYPE('offline');
    } else {
      return setEDUCATION_TYPE('online');
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

  const submitFn = async () => {
    const reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    if (reg.test(moment(EDUCATION_DATE).format('YYYY-MM-DD')) === false) {
      return alertModal(
        '교육일시 날짜형식은 "2020-01-01"과 같은 형식이어야 합니다. 사진이 인식되지 않는다면 항목을 눌러 날짜를 직접 선택해주세요.',
      );
    }
    if (!cameraPictureLast) {
      return alertModal('위생교육증을 촬영해주세요.');
    }
    if (NAME.length === 0 || !NAME) {
      return alertModal('교육이수자 성명을 입력해주세요.');
    }
    if (position.length === 0 || !position) {
      return alertModal('직책을 입력해주세요.');
    }
    if (owner.length === 0 || !owner) {
      return alertModal('대표자 성명을 입력해주세요.');
    }
    if (storename.length === 0 || !storename) {
      return alertModal('영업소 명칭을 입력해주세요.');
    }
    if (businesstype.length === 0 || !businesstype) {
      return alertModal('영업의 종류를 입력해주세요.');
    }
    if (EDUCATION_TYPE.length === 0 || !EDUCATION_TYPE) {
      return alertModal('교육구분을 선택해주세요.');
    }
    try {
      dispatch(
        setSplashVisible({
          visible: true,
          fullText: '위생교육증을 수정중입니다.',
        }),
      );
      const formData: any = new FormData();

      formData.append('businesstype', businesstype);
      formData.append('position', position);
      formData.append('owner', owner);
      formData.append('storename', storename);
      formData.append(
        'RESULT_DATE',
        moment(EDUCATION_DATE).format('YYYY-MM-DD'),
      );
      formData.append('EDUCATION_TYPE', EDUCATION_TYPE);
      formData.append('EMP_NAME', NAME);
      formData.append('STORE_SEQ', STORE_SEQ);
      formData.append('CEO_HEALTH_SEQ', CEO_HEALTH_SEQ);
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
        uri: utils.isAndroid()
          ? cameraPictureLast?.uri
          : cameraPictureLast?.uri.replace('file://', ''),
        name: fileName,
        type: fileType,
      });
      const {data} = await api.updateOcr1(formData);
      if (data.result == '1') {
        dispatch(getHEALTH_CERTIFICATE_DATA());
        params?.fetchData();
        navigation.goBack();
        alertModal('저장 완료');
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
        uri: utils.isAndroid()
          ? cameraPictureLast?.uri
          : cameraPictureLast?.uri.replace('file://', ''),
        name: fileName,
        type: fileType,
      });
      const {data} = await api.checkocr1(formData);
      if (data.result == '0') {
        return alertModal(
          '인식 실패\n\n촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
        );
      } else {
        var date = data.resultdate;
        var yearstr = date.split('년');
        var monthstr = yearstr[1].split('월');
        var daystr = monthstr[1].split('일');
        alertModal('인식 완료');
        setNAME(data.name);
        setPosition(data.position);
        setOwner(data.owner);
        setStorename(data.storename);
        setEDUCATION_DATE(
          yearstr[0] +
            '-' +
            monthstr[0].replace(' ', '') +
            '-' +
            daystr[0].replace(' ', ''),
        );
        setInitEDUCATION_DATE(
          yearstr[0] +
            '-' +
            monthstr[0].replace(' ', '') +
            '-' +
            daystr[0].replace(' ', ''),
        );
        setBusinesstype(data.businesstype);
        setEDUCATION_TYPE(data.EDUCATION_TYPE);
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
      dispatch(getHEALTH_CERTIFICATE_DATA());
      dispatch(removeHEALTH_STORE_DETAIL(CEO_HEALTH_SEQ));
      navigation.pop(2);
      alertModal(
        `${moment(EDUCATION_DATE).format(
          'YYYY',
        )}년 위생교육증을 삭제하였습니다.`,
      );
      const {data} = await api.deleteCeoHealth({CEO_HEALTH_SEQ});
      if (data.resultmsg === '0') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HealthCertificateStoreUpdateScreenPresenter
      submitFn={submitFn}
      setNAME={setNAME}
      NAME={NAME}
      setPosition={setPosition}
      position={position}
      setOwner={setOwner}
      owner={owner}
      setStorename={setStorename}
      storename={storename}
      EDUCATION_DATE={EDUCATION_DATE}
      initEDUCATION_DATE={initEDUCATION_DATE}
      setEDUCATION_DATE={setEDUCATION_DATE}
      setInitEDUCATION_DATE={setInitEDUCATION_DATE}
      EDUCATION_TYPE={EDUCATION_TYPE}
      setBusinesstype={setBusinesstype}
      businesstype={businesstype}
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      toggleEducationType={toggleEducationType}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      takePictureFn={takePictureFn}
      checkOrcFn={checkOrcFn}
      confirmModal={confirmModal}
    />
  );
};
