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
  } = useSelector((state: any) => state.userAlarmReducer);

  const [allPushState, setAllPushState] = useState<boolean>(All_PUSH || false);
  const [workPushState, setWorkPushState] = useState<boolean>(
    WORK_PUSH || false,
  );
  const [checkPushState, setCheckPushState] = useState<boolean>(
    CHECK_PUSH || false,
  );
  const [checksharePushState, setChecksharePushState] = useState<boolean>(
    CHECKSHARE_PUSH || false,
  );
  const [scedulePUshState, setScedulePUshState] = useState<boolean>(
    SCHEDULE_PUSH || false,
  );

  const toggleAlarmState = (value, hasSuccessed) => {
    switch (value) {
      case 'All_PUSH':
        return setAllPushState(hasSuccessed ? !allPushState : All_PUSH);
      case 'WORK_PUSH':
        return setWorkPushState(hasSuccessed ? !workPushState : WORK_PUSH);
      case 'CHECK_PUSH':
        return setCheckPushState(hasSuccessed ? !checkPushState : CHECK_PUSH);
      case 'CHECKSHARE_PUSH':
        return setChecksharePushState(
          hasSuccessed ? !checksharePushState : CHECKSHARE_PUSH,
        );
      case 'SCHEDULE_PUSH':
        return setScedulePUshState(
          hasSuccessed ? !scedulePUshState : SCHEDULE_PUSH,
        );
      default:
        break;
    }
  };

  const toggleAlarm = (value) => {
    switch (value) {
      case 'All_PUSH':
        return dispatch(setAllPush(!All_PUSH));
      case 'WORK_PUSH':
        return dispatch(setWorkPush(!WORK_PUSH));
      case 'CHECK_PUSH':
        return dispatch(setCheckPush(!CHECK_PUSH));
      case 'CHECKSHARE_PUSH':
        return dispatch(setChecksharePush(!CHECKSHARE_PUSH));
      case 'SCHEDULE_PUSH':
        return dispatch(setScedulePUsh(!SCHEDULE_PUSH));
      default:
        break;
    }
  };

  const updateAlarm = async (value: boolean, alarm: string) => {
    const isAlarmOn = value == true ? '0' : '1';
    toggleAlarmState(alarm, true);
    try {
      const {data} = await api.updatePush({
        MEMBER_SEQ,
        [alarm]: isAlarmOn,
      });
      if (data.message == 'SUCCESS') {
        toggleAlarm(alarm);
      }
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      setTimeout(() => {
        toggleAlarmState(alarm, false);
      }, 200);
    }
  };

  const fetch = async () => {
    try {
      const {data} = await api.getPush({MEMBER_SEQ});
      data.All_Push == '1' && dispatch(setAllPush(true));
      data.WORK_PUSH == '1' && dispatch(setWorkPush(true));
      data.CHECK_PUSH == '1' && dispatch(setCheckPush(true));
      data.CHECKSHARE_PUSH == '1' && dispatch(setChecksharePush(true));
      data.SCHEDULE_PUSH == '1' && dispatch(setScedulePUsh(true));
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
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const PUSH_TOKEN = await messaging().getToken();
    if (PUSH_TOKEN) {
      console.log('PUSH_TOKEN', PUSH_TOKEN);
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
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(
    () => () => {
      if (All_PUSH) {
        getFcmToken();
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
