import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EmployeeListScreenPresenter from './EmployeeListScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setEMPLOYEE_LIST} from '~/redux/employeeSlice';
import api from '~/constants/LoggedInApi';

export default () => {
  const dispatch = useDispatch();
  const {STORE_NAME, STORE_SEQ} = useSelector(
    (state: any) => state.storeReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const adviceModal = (title, text, height) => {
    const params = {
      alertType: 'explain',
      height: height,
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EmployeeListScreenPresenter
      refreshing={refreshing}
      onRefresh={onRefresh}
      STORE={STORE}
      STORE_NAME={STORE_NAME}
      adviceModal={adviceModal}
      employeeNowOn={EMPLOYEE_LIST?.workinglist}
      employeeNowOff={EMPLOYEE_LIST?.endlist}
    />
  );
};
