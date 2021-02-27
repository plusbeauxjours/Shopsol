import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import {BackHandler, ToastAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';
import appsFlyer from 'react-native-appsflyer';

import store, {persistor} from './src/redux/store';
import RootContainer from './src/components/RootContainer';

function App() {
  // const _handleAppStateChange = (nextAppState) => {
  //   if (nextAppState === 'active') {
  //     _registerLocalNotification();
  //   }
  // };

  appsFlyer.initSdk(
    {
      devKey: 'HWrK6iFipjPUqDhwJUABpA',
      isDebug: false,
      appId: '1408364175',
    },
    (result) => {
      console.log(result);
    },
    (error) => {
      console.error(error);
    },
  );

  let exitApp;
  const handleBackButton = () => {
    if (!exitApp || exitApp == undefined) {
      exitApp = true;
      ToastAndroid.show('한번 더 누르면 종료됩니다.', 2000);
      setTimeout(() => {
        exitApp = false;
        clearTimeout();
      }, 2000);
    } else {
      clearTimeout();
      BackHandler.exitApp();
      exitApp = false;
    }
    return true;
  };

  const register = async () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }
    PushNotification.getApplicationIconBadgeNumber((number) => {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
    PushNotification.configure({
      popInitialNotification: true,
      onRegister: () => {
        console.log('onRegister');
      },
      onNotification: () => {
        console.log('onNotification');
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      requestPermissions: true,
    });
  };

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background1!', remoteMessage);
  });

  const localNotif = (remoteMessage) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      id: remoteMessage.messageId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      autoCancel: true, // (optional) default: true
      largeIcon: '', // (optional) default: "ic_launcher"
      smallIcon: '', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: remoteMessage.notification.title, // (optional) default: "message" prop
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view

      /* iOS and Android properties */
      title: remoteMessage.notification.title, // (optional)
      message: remoteMessage.notification.body, // (required)
    });
  };

  useEffect(() => {
    register();
    messaging().onMessage(async (remoteMessage) => {
      localNotif(remoteMessage);
      console.log('Message handled in the background2!', remoteMessage);
    });
  }, []);

  useEffect(() => {
    return () => {
      PushNotification.cancelAllLocalNotifications();
    };
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
          <RootContainer />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(App);

// Andrioid
// shopsol.master-gmail.com/shopsolWesop-android
// appcenter codepush release-react -a shopsol.master-gmail.com/shopsolWesop-android -d Production
// appcenter codepush deployment list -a shopsol.master-gmail.com/shopsolWesop-android -k
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ IQ-khtu0aKK5BdIbO4km_EtFgAQjWBnmiq-T6 │
// └────────────┴───────────────────────────────────────┘

// iOS
// shopsol.master-gmail.com/shopsolWesop-ios
// appcenter codepush release-react -a shopsol.master-gmail.com/shopsolWesop-ios -d Production
// appcenter codepush deployment list -a shopsol.master-gmail.com/shopsolWesop-ios -k
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ KJJ3ieWUWc4o6dSzHZxZXdSayNHMvsvlC9U6y │
// └────────────┴───────────────────────────────────────┘
