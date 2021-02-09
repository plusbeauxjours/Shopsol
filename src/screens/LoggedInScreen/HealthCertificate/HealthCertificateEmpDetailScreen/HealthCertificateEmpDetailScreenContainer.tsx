import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import HealthCertificateEmpDetailScreenPresenter from './HealthCertificateEmpDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setHEALTH_EMP_DETAIL} from '~/redux/healthSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const {HEALTH_EMP_DETAIL} = useSelector((state: any) => state.healthReducer);
  const {data: {EMP_SEQ = null} = {}} = params;

  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onRefresh = async () => {
    try {
      dispatch(setSplashVisible({visible: true, text: '보건증'}));
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const fetchData = async () => {
    try {
      const {data} = await api.storeHealthEmpDetail(EMP_SEQ);
      if (data.message === 'SUCCESS') {
        setSelectIndex(0);
        dispatch(setHEALTH_EMP_DETAIL(data.result));
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const decreaseSelectIndex = () => {
    setSelectIndex(selectIndex - 1);
  };

  const increaseSelectIndex = () => {
    setSelectIndex(selectIndex + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateEmpDetailScreenPresenter
      fetchData={fetchData}
      EMP_SEQ={EMP_SEQ}
      onRefresh={onRefresh}
      alertModal={alertModal}
      loading={loading}
      HEALTH_EMP_DETAIL_PARAMS_DATA={params?.data}
      HEALTH_EMP_DETAIL={HEALTH_EMP_DETAIL}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      selectIndex={selectIndex}
      decreaseSelectIndex={decreaseSelectIndex}
      increaseSelectIndex={increaseSelectIndex}
    />
  );
};
