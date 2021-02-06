import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UpdateStoreScreenPresenter from './UpdateStoreScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {closeSTORE_ON_STORE_LIST} from '~/redux/userSlice';
import api from '~/constants/LoggedInApi';
import {closeSTORE_DATA, updateSTORE} from '~/redux/storeSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ, STORE_DATA} = useSelector(
    (state: any) => state.storeReducer,
  );

  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(
    STORE_DATA?.resultdata?.CLOSE_FLAG == '0' ? false : true || false,
  );
  const [NAME, setNAME] = useState<string>(STORE_DATA?.resultdata?.NAME || '');
  const [ADDR1, setADDR1] = useState<string>(
    STORE_DATA?.resultdata?.ADDR1 || '',
  );
  const [ADDR2, setADDR2] = useState<string>(
    STORE_DATA?.resultdata?.ADDR2 || '',
  );

  const [LATE_FLAG, setLATE_FLAG] = useState<string>(
    STORE_DATA?.resultdata?.LATE_FLAG || '0',
  );
  const [LATE_TIME, setLATE_TIME] = useState<number>(
    STORE_DATA?.resultdata?.LATE_TIME || 0,
  );
  const [EARLY_FLAG, setEARLY_FLAG] = useState<string>(
    STORE_DATA?.resultdata?.EARLY_FLAG || '0',
  );
  const [EARLY_TIME, setEARLY_TIME] = useState<number>(
    STORE_DATA?.resultdata?.EARLY_TIME || 0,
  );
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>(
    STORE_DATA?.resultdata?.CALCULATE_DAY || '1',
  );
  const [LAT, setLAT] = useState<number>(STORE_DATA?.resultdata?.LAT || 0);
  const [LONG, setLONG] = useState<number>(STORE_DATA?.resultdata?.LONG || 0);
  const [TYPE, setTYPE] = useState<number>(STORE_DATA?.resultdata?.TYPE || 0);

  //0208 REMOVEQR
  // const [commuteType, setCommuteType] = useState<number>(
  //   STORE_DATA?.resultdata?.GPS == '1' ? 1 : 0,
  // ); // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
  // const [commuteTypeCheck, setCommuteTypeCheck] = useState<[boolean, boolean]>(
  //   STORE_DATA?.resultdata?.GPS == '1'
  //     ? [true, false]
  //     : [false, true] || [true, false],
  // );

  const [storeCategoryType, setStoreCategoryType] = useState<number>(
    STORE_DATA?.resultdata?.CATEGORY || '분류 선택',
  ); // 사업장 분류 유형, 0: 요식업, 1: 도,소매업, 2: 서비스업, 3: 일반회사, 4: 기타
  const [distance, setDistance] = useState<string>(
    STORE_DATA?.resultdata?.JULI || '0',
  );
  const [days, setDays] = useState<any>(new Array(30));
  const [sizeTypeCheck, setSizeTypeCheck] = useState<[boolean, boolean]>(
    STORE_DATA?.resultdata?.TYPE == 0
      ? [true, false]
      : [false, true] || [true, false],
  ); //1: 5인 이상, 0: 5인 미만
  const [storeCategoryTypeEtc, setStoreCategoryTypeEtc] = useState<string>(
    STORE_DATA?.resultdata?.other || null,
  ); // 사업장 분류 유형이 4(기타)인 경우 직접 입력 값

  const [EARLYtimeCheck, setEARLYtimeCheck] = useState<boolean>(
    STORE_DATA?.resultdata?.EARLY_TIME ? true : false,
  );
  const [distanceCheck, setDistanceCheck] = useState<boolean>(
    STORE_DATA?.resultdata?.JULI ? true : false,
  );
  const [timeCheck, setTimeCheck] = useState<boolean>(
    STORE_DATA?.resultdata?.LATE_TIME ? true : false,
  );
  const [dayCheck, setDayCheck] = useState<boolean>(
    STORE_DATA?.resultdata?.CALCULATE_DAY ? true : false,
  );
  const [categoryCheck, setCategoryCheck] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);

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

  const confirmModal = (content) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      okCallback: () => {
        submit('close');
      },
      okButtonText: '변경',
      cancelButtonText: '취소',
      warning: 'yes',
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
    navigation.navigate('SearchAddressScreen', {screen: 1});
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
  };
  // 수정하기버튼
  const submit = async (sign) => {
    if (sign == 'close') {
      alertModal('사업장의 폐업처리가 완료되었습니다.');
      navigation.reset({
        index: 0,
        routes: [{name: 'SelectStoreScreen'}],
      });
      dispatch(closeSTORE_ON_STORE_LIST());
    } else {
      alertModal('수정하였습니다.');
      dispatch(
        updateSTORE({
          NAME,
          ADDR1,
          ADDR2,
          TYPE,
          LATE_FLAG,
          LATE_TIME,
          EARLY_FLAG,
          EARLY_TIME,
          CALCULATE_DAY,
          // GPS: commuteType.toString(), //0208 REMOVEQR
          GPS: '1', // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
          JULI: distance,
          CATEGORY: storeCategoryType,
          other: storeCategoryTypeEtc,
          LAT,
          LONG,
        }),
      );
      navigation.goBack();
    }
    let CLOSE_FLAGProps = CLOSE_FLAG == false ? '0' : '1';
    if (sign == 'close') {
      CLOSE_FLAGProps = '1';
    } else {
      CLOSE_FLAGProps = '0';
    }
    try {
      const {data} = await api.updateStore({
        CLOSE_FLAG: CLOSE_FLAGProps,
        STORE_SEQ,
        NAME,
        ADDR1,
        ADDR2,
        LAT,
        LONG,
        CALCULATE_DAY,
        LATE_TIME,
        LATE_FLAG,
        EARLY_TIME,
        EARLY_FLAG,
        // GPS: commuteType.toString(), //0208 REMOVEQR
        GPS: '1', // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
        JULI: distance,
        TYPE,
        CATEGORY: storeCategoryType,
        other: storeCategoryTypeEtc,
      });
      if (data.message !== 'SUCCESS') {
        navigation.navigate('UpdateStoreScreen');
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    const {data} = await api.getHelpInfo();
    if (data.helparr.length > 0) {
      setHelparr(data.helparr);
    }
  };

  useEffect(() => {
    setADDR1(params?.addr ?? STORE_DATA?.resultdata?.ADDR1);
    setLAT(params?.LAT ?? STORE_DATA?.resultdata?.LAT);
    setLONG(params?.LONG ?? STORE_DATA?.resultdata?.LONG);
  }, [params]);

  useEffect(() => {
    if (
      typeof STORE_DATA?.CATEGORY !== 'undefined' &&
      STORE_DATA?.CATEGORY !== null
    ) {
      const storeCategoryTypeCheckProps = categoryCheck;
      storeCategoryTypeCheckProps[Number(STORE_DATA?.CATEGORY)] = true;
      setCategoryCheck(storeCategoryTypeCheckProps);
    }
    fetchData();
  }, []);

  return (
    <UpdateStoreScreenPresenter
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
      storeCategoryType={storeCategoryType}
      categoryCheck={categoryCheck}
      setStoreCategoryTypeEtc={setStoreCategoryTypeEtc}
      storeCategoryTypeEtc={storeCategoryTypeEtc}
      STORE={STORE}
      confirmModal={confirmModal}
      // commuteType={commuteType} //0208 REMOVEQR
      // setCommuteType={setCommuteType} //0208 REMOVEQR
      // commuteTypeCheck={commuteTypeCheck} //0208 REMOVEQR
      // setCommuteTypeCheck={setCommuteTypeCheck} //0208 REMOVEQR
    />
  );
};
