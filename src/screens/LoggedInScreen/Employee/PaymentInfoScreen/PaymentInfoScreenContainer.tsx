import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PaymentInfoScreenPresenter from './PaymentInfoScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {getTOTAL_PAYMENT_WORKING_EMP} from '~/redux/paymentSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setEMPLOYEE_LIST} from '~/redux/employeeSlice';
import api from '~/constants/LoggedInApi';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);
  const {TOTAL_PAYMENT_WORKING_EMP} = useSelector(
    (state: any) => state.paymentReducer,
  );
  const {
    STORE_SEQ,
    STORE_DATA: {
      STOREPAY_SHOW = null,
      resultdata: {CALCULATE_DAY = null} = {},
    } = {},
    MANAGER_CALLED,
  } = useSelector((state: any) => state.storeReducer);

  let CALCULATE_MONTH_temp =
    Number(moment().format('D')) < Number(CALCULATE_DAY)
      ? moment().subtract(1, 'months').format('MM')
      : moment().format('MM');
  let CALCULATE_DAY_temp =
    Number(CALCULATE_DAY) < 10 ? '0' + CALCULATE_DAY : CALCULATE_DAY;

  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    moment(
      `${
        moment().year() + '-' + CALCULATE_MONTH_temp + '-' + CALCULATE_DAY_temp
      }`,
    ).format('YYYY-MM-DD'),
  );
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

  const onRefresh = async () => {
    try {
      await fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  const nextpay = async () => {
    try {
      await setStartDate(
        moment(startDate).add(1, 'month').format('YYYY-MM-DD'),
      );
      await setLoading(true);
      await dispatch(
        getTOTAL_PAYMENT_WORKING_EMP(
          moment(startDate).add(1, 'month').format('YYYY'),
          moment(startDate).add(1, 'month').format('MM'),
        ),
      );
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const backpay = async () => {
    try {
      await setStartDate(
        moment(startDate).subtract(1, 'month').format('YYYY-MM-DD'),
      );
      await setLoading(true);
      await dispatch(
        getTOTAL_PAYMENT_WORKING_EMP(
          moment(startDate).subtract(1, 'month').format('YYYY'),
          moment(startDate).subtract(1, 'month').format('MM'),
        ),
      );
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      await setLoading(true);
      const {data: empData} = await api.getEmpLists(STORE_SEQ);
      if (empData.message == 'SUCCESS') {
        dispatch(setEMPLOYEE_LIST(empData));
      }
      await dispatch(getTOTAL_PAYMENT_WORKING_EMP());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setStartDate(
        moment(
          `${
            moment().year() +
            '-' +
            CALCULATE_MONTH_temp +
            '-' +
            CALCULATE_DAY_temp
          }`,
        ).format('YYYY-MM-DD'),
      );
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PaymentInfoScreenPresenter
      onRefresh={onRefresh}
      nextpay={nextpay}
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      STOREPAY_SHOW={STOREPAY_SHOW}
      backpay={backpay}
      TOTAL_PAYMENT_WORKING_EMP={TOTAL_PAYMENT_WORKING_EMP}
      explainModal={explainModal}
      loading={loading}
      startDate={startDate}
      EMPLOYEE_LIST={EMPLOYEE_LIST}
      MANAGER_CALLED={MANAGER_CALLED}
    />
  );
};
