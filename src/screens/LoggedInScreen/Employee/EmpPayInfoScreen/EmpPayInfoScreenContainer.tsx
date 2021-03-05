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
    STORE_SEQ,
    EMP_SEQ,
    IS_MANAGER,
    STORE_DATA: {
      resultdata: {STOREPAY_SHOW = null, CALCULATE_DAY = null} = {},
    } = {},
    MANAGER_CALLED,
  } = useSelector((state: any) => state.storeReducer);
  const {MEMBER_NAME} = useSelector((state: any) => state.userReducer);
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {visible} = useSelector((state: any) => state.splashReducer);

  const {EMPLOYEE_LIST: {workinglist = []} = {}} = useSelector(
    (state: any) => state.employeeReducer,
  );

  const user = workinglist?.find((i) => i.EMP_SEQ == EMP_SEQ);
  const START_store = user?.START;
  const END_store = user?.END;
  const PAY_TYPE_store = user?.PAY_TYPE;
  const PAY_store = user?.PAY;

  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<any>(moment().format(`YYYY-MM-DD`));
  const [boxButton, setBoxButton] = useState<boolean>(false);
  const [boxButton2, setBoxButton2] = useState<boolean>(false);
  const [isCardShowed, setIsCardShowed] = useState<boolean>(false);
  const [click1, setClick1] = useState<boolean>(false);
  const [click2, setClick2] = useState<boolean>(false);
  const [click3, setClick3] = useState<boolean>(false);
  const [click4, setClick4] = useState<boolean>(false);
  const [click5, setClick5] = useState<boolean>(false);
  const [maindata, setMaindata] = useState<any>({});

  const [image, setImage] = useState<string>(null);
  const [START, setSTART] = useState<string>(null);
  const [END, setEND] = useState<string>(null);

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
        dispatch(
          setSplashVisible({
            visible: true,
            text: `${moment(date).add(1, 'month').format('YYYY년 M월 ')}급여`,
          }),
        );
        setDate(moment(date).add(1, 'month'));
        const {data} = await api.monthLists(
          STORE_SEQ,
          params?.EMP_SEQ || EMP_SEQ,
          moment(date).add(1, 'month').format('YYYY'),
          moment(date).add(1, 'month').format('MM'),
        );
        setMaindata(data.message);
      } catch (e) {
        console.log(e);
        alertModal('통신이 원활하지 않습니다.');
        navigation.goBack();
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    } else {
      alertModal('최신데이터 입니다.');
    }
  };

  const backpay = async () => {
    try {
      dispatch(
        setSplashVisible({
          visible: true,
          text: `${moment(date)
            .subtract(1, 'month')
            .format('YYYY년 M월 ')}급여`,
        }),
      );
      setDate(moment(date).subtract(1, 'month'));
      const {data} = await api.monthLists(
        STORE_SEQ,
        params?.EMP_SEQ || EMP_SEQ,
        moment(date).subtract(1, 'month').format('YYYY'),
        moment(date).subtract(1, 'month').format('MM'),
      );
      setMaindata(data.message);
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const fetchData = async () => {
    dispatch(
      setSplashVisible({
        visible: true,
        text: `${params?.MEMBER_NAME || MEMBER_NAME}님의 급여`,
      }),
    );
    try {
      const {data} = await api.getEmp(params?.EMP_SEQ || EMP_SEQ);
      setImage(data?.result.images[0].IMAGE);
      setSTART(data?.result.START);
      setEND(data?.result.END);
    } catch (e) {
      console.log(e);
    }
    try {
      const {data} = await api.monthLists(
        STORE_SEQ,
        params?.EMP_SEQ || EMP_SEQ,
        moment(date).format('YYYY'),
        moment(date).format('MM'),
      );
      setMaindata(data.message);
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible({visible: false}));
      setLoading(false);
    }
  };

  // 보라색 테두리의 수정 버튼
  const gotoSetInfo = () => {
    navigation.navigate('SetEmployeeInfoScreen', {
      EMP_NAME: params?.MEMBER_NAME || MEMBER_NAME,
      STORE_SEQ: STORE_SEQ,
      EMP_SEQ: params?.EMP_SEQ || EMP_SEQ,
      from: 'EmpPayInfoScreen',
      onRefresh: fetchData,
      IMAGE: params?.image,
      IS_MANAGER: params?.IS_MANAGER || IS_MANAGER,
      EMP_PAY_TYPE: params?.EMP_PAY_TYPE || maindata?.PAY_TYPE,
      PAY: params?.PAY || maindata?.PAY,
      START: params?.START || START,
      END: params?.END || END,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EmpPayInfoScreenPresenter
      MEMBER_NAME={params?.MEMBER_NAME || MEMBER_NAME}
      maindata={maindata}
      PAY_TYPE={maindata.PAY_TYPE}
      backpay={backpay}
      replaceAll={replaceAll}
      nextpay={nextpay}
      STORE={STORE}
      STOREPAY_SHOW={params?.STOREPAY_SHOW || STOREPAY_SHOW}
      IS_MANAGER={params?.IS_MANAGER || IS_MANAGER}
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
      EMP_PAY_TYPE={PAY_TYPE_store || maindata?.PAY_TYPE}
      PAY={PAY_store || maindata?.PAY}
      image={params?.image || image}
      START={START_store || START}
      END={END_store || END}
      gotoSetInfo={gotoSetInfo}
      visible={visible}
      loading={loading}
      date={date}
      MANAGER_CALLED={MANAGER_CALLED}
      probationDATE={params?.probationDATE}
      probationPercent={params?.probationPercent}
    />
  );
};
