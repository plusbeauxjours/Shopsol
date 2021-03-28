import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {Alert, Linking, Platform} from 'react-native';
import {openSettings} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import MyPageAlarmSetScreenPresenter from './MyPageAlarmSetScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {
  setAllPush,
  setWorkPush,
  setCheckPush,
  setChecksharePush,
  setScedulePUsh,
} from '~/redux/userAlarmSlice';
import api from '~/constants/LoggedInApi';
import utils from '~/constants/utils';
import {setDEVICE_INFO} from '~/redux/userSlice';

export default () => {
  const dispatch = useDispatch();
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {
    All_PUSH,
    WORK_PUSH,
    CHECK_PUSH,
    CHECKSHARE_PUSH,
    SCHEDULE_PUSH,
    IS_SUPER_USER,
  } = useSelector((state: any) => state.userAlarmReducer);

  const [allPushState, setAllPushState] = useState<boolean>(All_PUSH);
  const [workPushState, setWorkPushState] = useState<boolean>(WORK_PUSH);
  const [checkPushState, setCheckPushState] = useState<boolean>(CHECK_PUSH);
  const [checksharePushState, setChecksharePushState] = useState<boolean>(
    CHECKSHARE_PUSH,
  );
  const [scedulePUshState, setScedulePUshState] = useState<boolean>(
    SCHEDULE_PUSH,
  );

  const toggleState = (value) => {
    switch (value) {
      case 'All_PUSH':
        return setAllPushState(!allPushState);
      case 'WORK_PUSH':
        return setWorkPushState(!workPushState);
      case 'CHECK_PUSH':
        return setCheckPushState(!checkPushState);
      case 'CHECKSHARE_PUSH':
        return setChecksharePushState(!checksharePushState);
      case 'SCHEDULE_PUSH':
        return setScedulePUshState(!scedulePUshState);
      default:
        break;
    }
  };

  const toggleRedux = (value) => {
    switch (value) {
      case 'All_PUSH':
        return dispatch(setAllPush(!allPushState));
      case 'WORK_PUSH':
        return dispatch(setWorkPush(!workPushState));
      case 'CHECK_PUSH':
        return dispatch(setCheckPush(!checkPushState));
      case 'CHECKSHARE_PUSH':
        return dispatch(setChecksharePush(!checksharePushState));
      case 'SCHEDULE_PUSH':
        return dispatch(setScedulePUsh(!scedulePUshState));
      default:
        break;
    }
  };

  const updateAlarm = async (value: boolean, alarm: string) => {
    const isAlarmOn = value == true ? '0' : '1';
    toggleState(alarm);
    try {
      const {data} = await api.updatePush({
        MEMBER_SEQ,
        [alarm]: isAlarmOn,
      });
      if (data.message == 'SUCCESS') {
        toggleRedux(alarm);
      }
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
    }
  };

  const fetch = async () => {
    try {
      const {data} = await api.getPush({MEMBER_SEQ});
      data.All_Push == '1'
        ? (setAllPushState(true), dispatch(setAllPush(true)))
        : (setAllPushState(false), dispatch(setAllPush(false)));
      data.WORK_PUSH == '1'
        ? (setWorkPushState(true), dispatch(setWorkPush(true)))
        : (setWorkPushState(false), dispatch(setWorkPush(false)));
      data.CHECK_PUSH == '1'
        ? (setCheckPushState(true), dispatch(setCheckPush(true)))
        : (setCheckPushState(false), dispatch(setCheckPush(false)));
      data.CHECKSHARE_PUSH == '1'
        ? (setChecksharePushState(true), dispatch(setChecksharePush(true)))
        : (setChecksharePushState(false), dispatch(setChecksharePush(false)));
      data.SCHEDULE_PUSH == '1'
        ? (setScedulePUshState(true), dispatch(setScedulePUsh(true)))
        : (setScedulePUshState(false), dispatch(setScedulePUsh(false)));
    } catch (e) {
      console.log(e);
    }
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    const PUSH_TOKEN = await messaging().getToken();
    if (PUSH_TOKEN && !IS_SUPER_USER) {
      await api.changeToken({
        token: PUSH_TOKEN,
        MEMBER_SEQ,
      });
      dispatch(
        setDEVICE_INFO({
          PUSH_TOKEN,
          DEVICE_MODEL: DeviceInfo.getModel(),
          DEVICE_PLATFORM: Platform.OS,
          DEVICE_SYSTEM_VERSION:
            Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
        }),
      );
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(
    () => () => {
      if (All_PUSH) {
        requestUserPermission();
      }
    },
    [],
  );

  useEffect(() => {
    if (All_PUSH) {
      requestUserPermission();
    }
  }, [All_PUSH]);

  return (
    <MyPageAlarmSetScreenPresenter
      updateAlarm={updateAlarm}
      allPushState={allPushState}
      workPushState={workPushState}
      checkPushState={checkPushState}
      checksharePushState={checksharePushState}
      scedulePUshState={scedulePUshState}
    />
  );
};
