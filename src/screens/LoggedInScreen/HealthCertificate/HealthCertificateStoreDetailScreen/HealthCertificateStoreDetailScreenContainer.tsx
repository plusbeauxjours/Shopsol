import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import HealthCertificateStoreDetailScreenPresenter from './HealthCertificateStoreDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setHEALTH_STORE_DETAIL, setSELECT_INDEX} from '~/redux/healthSlice';

export default () => {
  const dispatch = useDispatch();

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const {HEALTH_STORE_DETAIL, SELECT_INDEX} = useSelector(
    (state: any) => state.healthReducer,
  );

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
      dispatch(setSplashVisible({visible: true}));
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
        dispatch(setSELECT_INDEX(0));
        dispatch(setHEALTH_STORE_DETAIL(data.resultdata));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const decreaseSELECT_INDEX = () => {
    dispatch(setSELECT_INDEX(SELECT_INDEX - 1));
  };

  const increaseSELECT_INDEX = () => {
    dispatch(setSELECT_INDEX(SELECT_INDEX + 1));
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
      SELECT_INDEX={SELECT_INDEX}
      decreaseSELECT_INDEX={decreaseSELECT_INDEX}
      increaseSELECT_INDEX={increaseSELECT_INDEX}
    />
  );
};
