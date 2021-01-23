import React, {useState, useEffect, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import AddStoreScreenPresenter from './AddStoreScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollRef = createRef(0);

  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [NAME, setNAME] = useState<string>('');
  const [ADDR1, setADDR1] = useState<string>(params?.addr || '');
  const [ADDR2, setADDR2] = useState<string>('');
  const [LATE_FLAG, setLATE_FLAG] = useState<string>('1');
  const [LATE_TIME, setLATE_TIME] = useState<number>(0);
  const [EARLY_FLAG, setEARLY_FLAG] = useState<string>('1');
  const [EARLY_TIME, setEARLY_TIME] = useState<number>(0);
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>('1');
  const [LAT, setLAT] = useState<number>(params?.lat || 0);
  const [LONG, setLONG] = useState<number>(params?.lng || 0);
  const [TYPE, setTYPE] = useState<number>(0);

  const [commuteType, setCommuteType] = useState<number>(0); // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
  const [storeCategoryType, setStoreCategoryType] = useState<string>(
    '분류 선택',
  ); // 사업장 분류 유형, 0: 요식업, 1: 도,소매업, 2: 서비스업, 3: 일반회사, 4: 기타

  const [distance, setDistance] = useState<string>('500');
  const [days, setDays] = useState<any>(new Array(30));
  const [sizeTypeCheck, setSizeTypeCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]); //1: 5인 이상, 0: 5인 미만
  const [commuteTypeCheck, setCommuteTypeCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]);
  const [storeCategoryTypeEtc, setStoreCategoryTypeEtc] = useState<string>(''); // 사업장 분류 유형이 4(기타)인 경우 직접 입력 값
  const [categoryCheck, setCategoryCheck] = useState<boolean>(false);
  const [EARLYtimeCheck, setEARLYtimeCheck] = useState<boolean>(true);
  const [distanceCheck, setDistanceCheck] = useState<boolean>(true);
  const [timeCheck, setTimeCheck] = useState<boolean>(true);
  const [dayCheck, setDayCheck] = useState<boolean>(true);

  const [modalVisible1, setModalVisible1] = useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [modalVisible3, setModalVisible3] = useState<boolean>(false);
  const [modalVisible4, setModalVisible4] = useState<boolean>(false);
  const [modalVisible5, setModalVisible5] = useState<boolean>(false);
  const [helparr, setHelparr] = useState<[]>([]);

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
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

  // 정산일모달 확인버튼
  const checkDirectInput = () => {
    let value = JSON.parse(JSON.stringify(days));
    value.fill(false); // ES6
    let day = days.indexOf(true) + 1;
    let calculateDay = `${day + 1}`;
    if (day > 29) {
      calculateDay = '1';
    }
    setModalVisible3(false);
    setDayCheck(true);
    setCALCULATE_DAY(calculateDay);
  };

  const gotoSearchAddress = () => {
    navigation.navigate('SearchAddressScreen', {screen: 0});
  };

  // 지각모달 분 선택
  const onPressLate = (LATE_TIME, LATE_FLAG) => {
    setModalVisible2(false);
    setLATE_TIME(LATE_TIME);
    setLATE_FLAG(LATE_FLAG);
    setTimeCheck(true);
  };

  // 조퇴모달 분 선택
  const onPressEarly = (EARLY_TIME, EARLY_FLAG) => {
    setModalVisible1(false);
    setEARLY_TIME(EARLY_TIME);
    setEARLY_FLAG(EARLY_FLAG);
    setEARLYtimeCheck(true);
  };

  // 출퇴근 허용거리 선택
  const onPressDistance = (DISTANCE) => {
    setModalVisible4(false);
    setDistance(DISTANCE);
    setDistanceCheck(true);
  };

  // 사업장분류 선택
  const onPressCategory = (CATEGORY) => {
    setModalVisible5(false);
    setStoreCategoryType(CATEGORY);
    setCategoryCheck(true);
  };

  // 등록하기버튼
  const submit = async () => {
    if (NAME == '') {
      dispatch(setSplashVisible({visible: false}));
      alertModal('점포명을 입력해주세요.');
      scrollRef.current?.getNode()?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (NAME?.length > 10) {
      dispatch(setSplashVisible({visible: false}));
      alertModal('점포명은 10자 이하로 입력해주세요.');
      scrollRef.current?.getNode()?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (ADDR1 == '') {
      alertModal('기본주소를 입력해주세요.');
      scrollRef.current?.getNode()?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (ADDR2 == '') {
      alertModal('상세주소를 입력해주세요.');
      scrollRef.current?.getNode()?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (storeCategoryType == '분류 선택') {
      alertModal('사업장분류를 선택해주세요.');
      scrollRef.current?.getNode()?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (storeCategoryType == '기타' && storeCategoryTypeEtc == '') {
      alertModal('기타 사업장분류를 입력해주세요.');
      scrollRef.current?.getNode()?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      try {
        dispatch(
          setSplashVisible({visible: true, fullText: '점포를 등록중입니다.'}),
        );
        const {data} = await api.addStore({
          NAME,
          ADDR1,
          ADDR2,
          MEMBER_SEQ,
          LAT,
          LONG,
          CALCULATE_DAY,
          LATE_TIME,
          LATE_FLAG,
          EARLY_TIME,
          EARLY_FLAG,
          GPS: commuteType,
          JULI: distance,
          TYPE,
          CATEGORY: storeCategoryType,
          other: storeCategoryTypeEtc,
        });
        if (data.message == 'SUCCESS') {
          alertModal(
            '사업장 추가완료\n\n사업장을 클릭하신 후 직원을 초대하세요.',
          );
          dispatch(getSTORELIST_DATA());
          navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    }
  };

  const fetchData = async () => {
    const {data} = await api.getHelpInfo();
    if (data.helparr.length > 0) {
      setHelparr(data.helparr);
    }
  };

  useEffect(() => {
    setADDR1(params?.addr ?? '');
    setLAT(params?.LAT ?? '');
    setLONG(params?.LONG ?? '');
  }, [params]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AddStoreScreenPresenter
      days={days}
      sizeTypeCheck={sizeTypeCheck}
      setTYPE={setTYPE}
      setDays={setDays}
      CALCULATE_DAY={CALCULATE_DAY}
      onPressLate={onPressLate}
      onPressEarly={onPressEarly}
      onPressDistance={onPressDistance}
      onPressCategory={onPressCategory}
      modalVisible1={modalVisible1}
      setModalVisible1={setModalVisible1}
      modalVisible2={modalVisible2}
      setModalVisible2={setModalVisible2}
      modalVisible3={modalVisible3}
      setModalVisible3={setModalVisible3}
      modalVisible4={modalVisible4}
      setModalVisible4={setModalVisible4}
      modalVisible5={modalVisible5}
      setModalVisible5={setModalVisible5}
      checkDirectInput={checkDirectInput}
      EARLY_TIME={EARLY_TIME}
      LATE_TIME={LATE_TIME}
      timeCheck={timeCheck}
      EARLYtimeCheck={EARLYtimeCheck}
      distance={distance}
      distanceCheck={distanceCheck}
      explainModal={explainModal}
      dayCheck={dayCheck}
      gotoSearchAddress={gotoSearchAddress}
      setADDR1={setADDR1}
      ADDR1={ADDR1}
      setADDR2={setADDR2}
      ADDR2={ADDR2}
      setSizeTypeCheck={setSizeTypeCheck}
      NAME={NAME}
      setNAME={setNAME}
      submit={submit}
      helparr={helparr}
      setCommuteType={setCommuteType}
      commuteTypeCheck={commuteTypeCheck}
      setCommuteTypeCheck={setCommuteTypeCheck}
      storeCategoryType={storeCategoryType}
      categoryCheck={categoryCheck}
      setStoreCategoryTypeEtc={setStoreCategoryTypeEtc}
      storeCategoryTypeEtc={storeCategoryTypeEtc}
      scrollRef={scrollRef}
    />
  );
};
