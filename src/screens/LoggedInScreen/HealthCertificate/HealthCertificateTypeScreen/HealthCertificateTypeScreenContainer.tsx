import React, {useState, useEffect} from 'react';

import HealthCertificateTypeScreenPresenter from './HealthCertificateTypeScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getHEALTH_CERTIFICATE_DATA} from '~/redux/healthSlice';

export default () => {
  const dispatch = useDispatch();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {HEALTH_CERTIFICATE_DATA} = useSelector(
    (state: any) => state.healthReducer,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
      setRefreshing(true);
      await dispatch(getHEALTH_CERTIFICATE_DATA());
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const dday = moment(HEALTH_CERTIFICATE_DATA.EDUCATION_DATA).diff(
    moment().subtract(1, 'year'),
    'days',
  );

  useEffect(() => {
    dispatch(getHEALTH_CERTIFICATE_DATA());
  }, []);

  return (
    <HealthCertificateTypeScreenPresenter
      refreshing={refreshing}
      STORE={STORE}
      EDUCATION_CERTIFICATE={HEALTH_CERTIFICATE_DATA.EDUCATION_CERTIFICATE}
      HEALTH_CERTIFICATE_TARGET={
        HEALTH_CERTIFICATE_DATA.HEALTH_CERTIFICATE_TARGET
      }
      HEALTH_CERTIFICATE_APPLY={
        HEALTH_CERTIFICATE_DATA.HEALTH_CERTIFICATE_APPLY
      }
      HEALTH_DDAY={HEALTH_CERTIFICATE_DATA.HEALTH_DDAY}
      EDUCATION_DATA={HEALTH_CERTIFICATE_DATA.EDUCATION_DATA}
      explainModal={explainModal}
      onRefresh={onRefresh}
      dday={dday}
    />
  );
};
