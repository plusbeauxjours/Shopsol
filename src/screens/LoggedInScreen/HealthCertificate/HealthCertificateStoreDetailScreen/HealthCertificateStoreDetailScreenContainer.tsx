import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import HealthCertificateStoreDetailScreenPresenter from './HealthCertificateStoreDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setHEALTH_STORE_DETAIL} from '~/redux/healthSlice';

export default () => {
  const dispatch = useDispatch();

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const {HEALTH_STORE_DETAIL} = useSelector(
    (state: any) => state.healthReducer,
  );

  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);

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
      dispatch(setSplashVisible({visible: true, text: '위생교육증'}));
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const fetchData = async () => {
    try {
      const {data} = await api.getAllCeoHealth({STORE_SEQ});
      if (data.resultmsg === '1') {
        dispatch(setSelectIndex(0));
        dispatch(setHEALTH_STORE_DETAIL(data.resultdata));
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
    <HealthCertificateStoreDetailScreenPresenter
      fetchData={fetchData}
      onRefresh={onRefresh}
      alertModal={alertModal}
      HEALTH_STORE_DETAIL={HEALTH_STORE_DETAIL}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      selectIndex={selectIndex}
      decreaseSelectIndex={decreaseSelectIndex}
      increaseSelectIndex={increaseSelectIndex}
    />
  );
};
