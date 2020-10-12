import React, {useEffect} from 'react';
import {Platform, Alert, Linking} from 'react-native';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {openSettings} from 'react-native-permissions';

import {setDEVICE_INFO} from '../redux/userSlice';
import utils from '~/constants/utils';

interface Props {
  children: JSX.Element;
  onNotificationOpened?: (data: {[key: string]: string}) => any;
}

export default ({children, onNotificationOpened}: Props): JSX.Element => {
  const dispatch = useDispatch();

  const CHANNEL_ID = 'com.wesop.cuwesop';
  const APP_NAME = 'CUwesop';
  const DESCRIPTION = 'CUwesop channel';

  let _onTokenRefreshListener: any = undefined;
  let _notificationDisplayedListener: any = undefined;
  let _notificationListener: any = undefined;
  let _notificationOpenedListener: any = undefined;

  const _registerMessageListener = (): void => {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen) => {
        if (
          onNotificationOpened &&
          typeof onNotificationOpened === 'function' &&
          notificationOpen &&
          notificationOpen.notification &&
          notificationOpen.notification.data &&
          notificationOpen.notification.data.notifications_id
        ) {
          onNotificationOpened(notificationOpen.notification.data);
        }
      });

    const channel = new firebase.notifications.Android.Channel(
      CHANNEL_ID,
      APP_NAME,
      firebase.notifications.Android.Importance.Max,
    ).setDescription(DESCRIPTION);
    firebase.notifications().android.createChannel(channel);

    _notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        // Process your notification as required
        notification.android.setPriority(
          firebase.notifications.Android.Priority.Max,
        );
        notification.android.setChannelId(CHANNEL_ID);

        firebase.notifications().displayNotification(notification);
      });
    _notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(() => {});
    _notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        if (
          onNotificationOpened &&
          typeof onNotificationOpened === 'function'
        ) {
          onNotificationOpened(notificationOpen.notification.data);
        }
      });
  };

  const _registerToken = (fcmToken: string) => {
    dispatch(
      setDEVICE_INFO({
        PUSH_TOKEN: fcmToken,
        DEVICE_MODEL: DeviceInfo.getModel(),
        DEVICE_PLATFORM: Platform.OS,
        DEVICE_SYSTEM_VERSION:
          Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
      }),
    );
  };

  const _registerTokenRefreshListener = (): void => {
    if (_onTokenRefreshListener) {
      _onTokenRefreshListener();
      _onTokenRefreshListener = undefined;
    }

    _onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh((fcmToken) => {
        // Process your token as required
        _registerToken(fcmToken);
      });
  };
  const _updateTokenToServer = async (): Promise<void> => {
    try {
      const fcmToken = await firebase.messaging().getToken();
      _registerMessageListener();
      _registerToken(fcmToken);
    } catch (e) {
      console.log(e);
    }
  };

  const _requestPermission = async (): Promise<void> => {
    try {
      await firebase.messaging().requestPermission();
      await _updateTokenToServer();
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
              utils.isAndroid()
                ? openSettings()
                : Linking.openURL('app-settings:');
            },
          },
        ],
      );
    }
  };

  const _checkPermission = async (): Promise<void> => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        _updateTokenToServer();
        _registerTokenRefreshListener();
      } else {
        _requestPermission();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    _checkPermission();
    return (): void => {
      if (_onTokenRefreshListener) {
        _onTokenRefreshListener();
        _onTokenRefreshListener = undefined;
      }
      if (_notificationDisplayedListener) {
        _notificationDisplayedListener();
        _notificationDisplayedListener = undefined;
      }
      if (_notificationListener) {
        _notificationListener();
        _notificationListener = undefined;
      }
      if (_notificationOpenedListener) {
        _notificationOpenedListener();
        _notificationOpenedListener = undefined;
      }
    };
  }, []);

  if (Platform.OS === 'ios') {
    firebase.notifications().setBadge(0);
  }

  return children;
};
