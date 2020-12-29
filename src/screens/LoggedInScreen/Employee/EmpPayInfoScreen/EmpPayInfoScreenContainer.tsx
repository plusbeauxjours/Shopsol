import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import EmpPayInfoScreenPresenter from './EmpPayInfoScreenPresenter';
import moment from 'moment';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    EMP_SEQ = null,
    STOREPAY_SHOW = null,
    MEMBER_NAME = null,
    IS_MANAGER = null,
    EMP_PAY_TYPE = null,
    PAY = null,
    image = null,
    START = null,
    END = null,
  } = params;

  const {
    STORE_SEQ,
    EMP_SEQ: EMP_SEQ_state,
    IS_MANAGER: IS_MANAGER_state,
    STORE_DATA: {
      resultdata: {
        STOREPAY_SHOW: STOREPAY_SHOW_state = null,
        CALCULATE_DAY = null,
      } = {},
    } = {},
  } = useSelector((state: any) => state.storeReducer);
  const {MEMBER_NAME: MEMBER_NAME_state} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {visible} = useSelector((state: any) => state.splashReducer);

  let CALCULATE_MONTH_temp =
    Number(moment().format('D')) < Number(CALCULATE_DAY)
      ? moment().subtract(1, 'months').format('MM')
      : moment().format('MM');
  let CALCULATE_DAY_temp =
    Number(CALCULATE_DAY) < 10 ? '0' + CALCULATE_DAY : CALCULATE_DAY;

  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<any>(
    moment(
      `${
        moment().year() + '-' + CALCULATE_MONTH_temp + '-' + CALCULATE_DAY_temp
      }`,
    ).format('YYYY-MM-DD'),
  );
  const [boxButton, setBoxButton] = useState<boolean>(false);
  const [boxButton2, setBoxButton2] = useState<boolean>(false);
  const [isCardShowed, setIsCardShowed] = useState<boolean>(false);
  const [click1, setClick1] = useState<boolean>(false);
  const [click2, setClick2] = useState<boolean>(false);
  const [click3, setClick3] = useState<boolean>(false);
  const [click4, setClick4] = useState<boolean>(false);
  const [click5, setClick5] = useState<boolean>(false);
  const [maindata, setMaindata] = useState<any>({});

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
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
    if (click === 'click4' && maindata?.CARDLIST?.length == 0) {
      alertModal('급여현황이 존재하지 않습니다.');
    }
    if (click === 'click4') {
      setClick4(!click4);
    } else {
      setClick5(!click5);
    }
    setIsCardShowed(!isCardShowed);
  };

  const nextpay = async () => {
    if (
      Number(moment(date).add(1, 'month').format('YYYYMMDD')) <=
      Number(moment().format('YYYYMMDD'))
    ) {
      try {
        dispatch(setSplashVisible(true));
        setDate(moment(date).add(1, 'month'));
        const {data} = await api.monthLists(
          STORE_SEQ,
          EMP_SEQ || EMP_SEQ_state,
          moment(date).add(1, 'month').format('YYYY'),
          moment(date).add(1, 'month').format('MM'),
        );
        setMaindata(data.message);
      } catch (e) {
        console.log(e);
        alertModal('통신이 원활하지 않습니다.');
        navigation.goBack();
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      alertModal('최신데이터 입니다.');
    }
  };

  const backpay = async () => {
    try {
      dispatch(setSplashVisible(true));
      setDate(moment(date).subtract(1, 'month'));
      const {data} = await api.monthLists(
        STORE_SEQ,
        EMP_SEQ || EMP_SEQ_state,
        moment(date).subtract(1, 'month').format('YYYY'),
        moment(date).subtract(1, 'month').format('MM'),
      );
      setMaindata(data.message);
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.monthLists(
        STORE_SEQ,
        EMP_SEQ || EMP_SEQ_state,
        moment(date).format('YYYY'),
        moment(date).format('MM'),
      );
      setMaindata(data.message);
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
      setLoading(false);
    }
  };

  // 보라색 테두리의 수정 버튼
  const gotoSetInfo = () => {
    navigation.navigate('SetEmployeeInfoScreen', {
      EMP_NAME: MEMBER_NAME || MEMBER_NAME_state,
      STORE_SEQ: STORE_SEQ,
      EMP_SEQ: EMP_SEQ || EMP_SEQ_state,
      from: 'EmployeeInfoScreen',
      onRefresh: fetchData,
      IMAGE: image,
      IS_MANAGER: IS_MANAGER || IS_MANAGER_state,
      EMP_PAY_TYPE,
      START,
      END,
      PAY,
    });
  };

  useEffect(() => {
    fetchData();
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
      fetchData={fetchData}
      numberComma={numberComma}
      click1={click1}
      click2={click2}
      click3={click3}
      isCardShowed={isCardShowed}
      setClick1={setClick1}
      setClick2={setClick2}
      setClick3={setClick3}
      onPressFooter={onPressFooter}
      EMP_PAY_TYPE={EMP_PAY_TYPE}
      PAY={PAY}
      image={image}
      START={START}
      END={END}
      gotoSetInfo={gotoSetInfo}
      visible={visible}
      loading={loading}
      date={date}
    />
  );
};
