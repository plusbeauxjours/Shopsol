import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PaymentInfoScreenPresenter from './PaymentInfoScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {getTOTAL_PAYMENT_WORKING_EMP} from '~/redux/paymentSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';
import {setEMPLOYEE_LIST} from '~/redux/employeeSlice';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);
  const {TOTAL_PAYMENT_WORKING_EMP} = useSelector(
    (state: any) => state.paymentReducer,
  );
  const {STORE_SEQ, STORE_DATA: {STOREPAY_SHOW = null} = {}} = useSelector(
    (state: any) => state.storeReducer,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
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
      await setDate(moment(date).add(1, 'month').format('YYYY-MM-DD'));
      await setLoading(true);
      await dispatch(
        getTOTAL_PAYMENT_WORKING_EMP(
          moment(date).add(1, 'month').format('YYYY'),
          moment(date).add(1, 'month').format('MM'),
        ),
      );
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const backpay = async () => {
    try {
      await setDate(moment(date).subtract(1, 'month').format('YYYY-MM-DD'));
      await setLoading(true);
      await dispatch(
        getTOTAL_PAYMENT_WORKING_EMP(
          moment(date).subtract(1, 'month').format('YYYY'),
          moment(date).subtract(1, 'month').format('MM'),
        ),
      );
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      if (!EMPLOYEE_LIST) {
        dispatch(setSplashVisible(true));
      }
      const {data} = await api.getEmpLists(STORE_SEQ);
      if (data.message == 'SUCCESS') {
        dispatch(setEMPLOYEE_LIST(data));
      }
      await setLoading(true);
      await dispatch(getTOTAL_PAYMENT_WORKING_EMP());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setDate(moment().format('YYYY-MM-DD'));
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
      EMPLOYEE_LIST={EMPLOYEE_LIST}
      loading={loading}
    />
  );
};
