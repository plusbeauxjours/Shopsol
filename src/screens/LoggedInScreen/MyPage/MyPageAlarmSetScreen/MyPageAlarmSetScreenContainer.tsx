import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firebase from 'react-native-firebase';
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
    try {
      await api.updatePush({
        MEMBER_SEQ,
        [alarm]: isAlarmOn,
      });
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
      toggleAlarm(value);
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

  const getToken = async () => {
    const PUSH_TOKEN = await firebase.messaging().getToken();
    console.log('PUSH_TOKEN', PUSH_TOKEN);
    if (PUSH_TOKEN) {
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

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
      Alert.alert(
        '푸쉬 알림 거절',
        '푸시 알림을 받으려면 확인을 누른 뒤, 환경 설정에서 푸시를 켜주세요.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => {
              utils.isAndroid
                ? openSettings()
                : Linking.openURL('app-settings:');
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(
    () => () => {
      if (All_PUSH) {
        getToken();
      }
    },
    [],
  );

  useEffect(() => {
    if (All_PUSH) {
      checkPermission();
    }
  }, [All_PUSH]);

  return (
    <MyPageAlarmSetScreenPresenter
      updateAlarm={updateAlarm}
      All_PUSH={All_PUSH}
      WORK_PUSH={WORK_PUSH}
      CHECK_PUSH={CHECK_PUSH}
      CHECKSHARE_PUSH={CHECKSHARE_PUSH}
      SCHEDULE_PUSH={SCHEDULE_PUSH}
      toggleAlarm={toggleAlarm}
    />
  );
};
