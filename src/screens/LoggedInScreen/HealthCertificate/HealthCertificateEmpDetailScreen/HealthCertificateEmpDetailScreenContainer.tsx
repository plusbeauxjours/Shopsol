import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import HealthCertificateEmpDetailScreenPresenter from './HealthCertificateEmpDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setHEALTH_EMP_DETAIL, setSELECT_INDEX} from '~/redux/healthSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const {HEALTH_EMP_DETAIL, SELECT_INDEX} = useSelector(
    (state: any) => state.healthReducer,
  );
  const {data: {EMP_SEQ = null} = {}} = params;
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
      const {data} = await api.storeHealthEmpDetail(EMP_SEQ);
      if (data.message === 'SUCCESS') {
        dispatch(setSELECT_INDEX(0));
        dispatch(setHEALTH_EMP_DETAIL(data.result));
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
    <HealthCertificateEmpDetailScreenPresenter
      fetchData={fetchData}
      EMP_SEQ={EMP_SEQ}
      onRefresh={onRefresh}
      alertModal={alertModal}
      HEALTH_EMP_DETAIL={HEALTH_EMP_DETAIL}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      SELECT_INDEX={SELECT_INDEX}
      decreaseSELECT_INDEX={decreaseSELECT_INDEX}
      increaseSELECT_INDEX={increaseSELECT_INDEX}
    />
  );
};
