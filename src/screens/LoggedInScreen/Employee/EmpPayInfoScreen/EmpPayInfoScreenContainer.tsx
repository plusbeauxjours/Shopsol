import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import EmpPayInfoScreenPresenter from './EmpPayInfoScreenPresenter';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    EMP_SEQ = null,
    STOREPAY_SHOW = null,
    MEMBER_NAME = null,
    IS_MANAGER = null,
  } = (params: any = {});
  const {
    STORE_SEQ,
    EMP_SEQ: EMP_SEQ_state,
    IS_MANAGER: IS_MANAGER_state,
    STORE_DATA: {
      resultdata: {STOREPAY_SHOW: STOREPAY_SHOW_state = null} = {},
    } = {},
  } = useSelector((state: any) => state.storeReducer);
  const {MEMBER_NAME: MEMBER_NAME_state} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);

  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [boxButton, setBoxButton] = useState<boolean>(true);
  const [boxButton2, setBoxButton2] = useState<boolean>(true);
  const [isCardShowed, setIsCardShowed] = useState<boolean>(false);
  const [click1, setClick1] = useState<boolean>(false);
  const [click2, setClick2] = useState<boolean>(false);
  const [click3, setClick3] = useState<boolean>(false);
  const [click4, setClick4] = useState<boolean>(false);
  const [click5, setClick5] = useState<boolean>(false);
  const [maindata, setMaindata] = useState<any>({});

  const onRefresh = async () => {
    try {
      dispatch(setSplashVisible(true));
      await fetchData(year, month);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const numberComma = (num) => {
    let result = num;
    if (isNaN(num)) {
      result = Number(num);
    }
    let resultArray = result.toString().split('.');
    resultArray[0] = resultArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return resultArray.join('.');
  };

  const replaceAll = (text) => {
    const RA = text?.split('-').join('.');
    return RA?.slice(5);
  };

  const onPressFooter = (click) => {
    if (maindata?.CARDLIST?.length == 0) {
      alertModal('', '급여현황이 존재하지 않습니다.');
    }
    if (click === 'click4') {
      setClick4(!click4);
    } else {
      setClick5(!click5);
    }
    setIsCardShowed(!isCardShowed);
  };

  const nextpay = async () => {
    let YEAR = year;
    let MONTH = month;
    if (MONTH == 12) {
      YEAR = YEAR + 1;
      MONTH = 1;
    } else {
      MONTH = Number(MONTH) + 1;
    }
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.monthLists(
        STORE_SEQ,
        EMP_SEQ || EMP_SEQ_state,
        YEAR.toString(),
        MONTH.toString(),
      );
      setMaindata(data.message);
      setYear(YEAR);
      setMonth(MONTH);
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const backpay = async () => {
    let YEAR = year;
    let MONTH = month - 1;
    if (MONTH == 0) {
      YEAR = YEAR - 1;
      MONTH = 12;
    }
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.monthLists(
        STORE_SEQ,
        EMP_SEQ || EMP_SEQ_state,
        YEAR.toString(),
        MONTH.toString(),
      );
      setMaindata(data.message);
      setYear(YEAR);
      setMonth(MONTH);
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async (year, month) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.monthLists(
        STORE_SEQ,
        EMP_SEQ || EMP_SEQ_state,
        year,
        month,
      );
      setMaindata(data.message);
      setYear(year);
      setMonth(month);
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    let DAY_FROM = new Date();
    let YEAR = DAY_FROM.getFullYear();
    let MONTH = DAY_FROM.getMonth() + 1;
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    fetchData(YEAR, MONTH);
  }, []);
  return (
    <EmpPayInfoScreenPresenter
      MEMBER_NAME={MEMBER_NAME || MEMBER_NAME_state}
      maindata={maindata}
      PAY_TYPE={maindata.PAY_TYPE}
      backpay={backpay}
      replaceAll={replaceAll}
      nextpay={nextpay}
      STORE={STORE}
      STOREPAY_SHOW={STOREPAY_SHOW || STOREPAY_SHOW_state}
      IS_MANAGER={IS_MANAGER || IS_MANAGER_state}
      boxButton={boxButton}
      setBoxButton={setBoxButton}
      boxButton2={boxButton2}
      setBoxButton2={setBoxButton2}
      onRefresh={onRefresh}
      numberComma={numberComma}
      click1={click1}
      click2={click2}
      click3={click3}
      isCardShowed={isCardShowed}
      setClick1={setClick1}
      setClick2={setClick2}
      setClick3={setClick3}
      onPressFooter={onPressFooter}
    />
  );
};
