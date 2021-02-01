import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EmployeeListScreenPresenter from './EmployeeListScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setEMPLOYEE_LIST} from '~/redux/employeeSlice';
import api from '~/constants/LoggedInApi';

export default () => {
  const dispatch = useDispatch();
  const {STORE_SEQ, MANAGER_CALLED} = useSelector(
    (state: any) => state.storeReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {EMPLOYEE_LIST, EMPLOYEE_LIST_SEQ} = useSelector(
    (state: any) => state.employeeReducer,
  );

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
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const fetchData = async () => {
    if (EMPLOYEE_LIST_SEQ != STORE_SEQ) {
      try {
        if (!EMPLOYEE_LIST) {
          dispatch(setSplashVisible({visible: true, text: '직원'}));
        }
        const {data} = await api.getEmpLists(STORE_SEQ);
        if (data.message == 'SUCCESS') {
          dispatch(setEMPLOYEE_LIST({EMPLOYEE_LIST: data, STORE_SEQ}));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
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
      adviceModal={adviceModal}
      employeeNowOn={EMPLOYEE_LIST?.workinglist}
      employeeNowOff={EMPLOYEE_LIST?.endlist}
      MANAGER_CALLED={MANAGER_CALLED}
    />
  );
};
