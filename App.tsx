import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import {
  AppState,
  PushNotificationIOS,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';

import store, {persistor} from './src/redux/store';
import RootContainer from './src/components/RootContainer';

function App() {
  // const _handleAppStateChange = (nextAppState) => {
  //   if (nextAppState === 'active') {
  //     _registerLocalNotification();
  //   }
  // };

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
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();
    PushNotification.configure({
      popInitialNotification: true,
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION');
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      requestPermissions: true,
    });
  };

  // const unregister = () => {
  //   AppState.removeEventListener('change', _handleAppStateChange);
  // };

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background1!', remoteMessage);
  });

  useEffect(() => {
    register();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Message handled in the background2!', remoteMessage);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return () => {
      null;
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
