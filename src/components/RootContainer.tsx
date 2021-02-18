import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import {StatusBar, LogBox} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {isIphoneX} from 'react-native-iphone-x-helper';
import * as Sentry from '@sentry/react-native';

import CloseBtn from './Header/CloseBtn';
import LoggedInNavigation from '../navigations/LoggedInNavigation';
import LoggedOutNavigation from '../navigations/LoggedOutNavigation';
import HelpModalScreen from '../screens/LoggedInScreen/Home/HelpModalScreen/index';
import Loader from './Loader';
import WebViewScreen from './WebViewScreen';
import BackBtn from './Header/BackBtn';

import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';

LogBox.ignoreAllLogs(true);

const Container = styled.View`
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
  background-color: 'rgba(52, 52, 52, 0.8)';
  flex: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const routeNameRef = useRef(null);
  const navigationRef = useRef(null);
  const dispatch = useDispatch();

  const headerStyle = utils.isAndroid() &&
    !isIphoneX() && {
      height: 56,
    };

  const {visible} = useSelector((state: any) => state.splashReducer);
  const {isLoggedIn, STORE, MEMBER_SEQ} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const RootStack = createStackNavigator();

  const isNetworkAvailable = async () => {
    const response = await NetInfo.fetch();
    return response.isConnected;
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  Sentry.init({
    dsn:
      'https://920fb530d09442768b04ec6825a3a2b4@o450648.ingest.sentry.io/5457931',
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 10000,
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute()?.name)
      }
      onStateChange={async () => {
        // if (
        //   navigationRef?.current?.getCurrentOptions()?.title == '메인 페이지'
        // ) {
        //   const {data: storeData} = await api.getStoreInfo({
        //     STORE,
        //     MEMBER_SEQ,
        //     STORE_SEQ,
        //   });
        //   if (storeData.resultmsg === '1') {
        //     dispatch(getStore(storeData));
        //   }
        // }
        const onNetwork = await isNetworkAvailable();
        if (!onNetwork) {
          alertModal('연결에 실패하였습니다. 네트워크 상태를 확인하세요.');
          navigationRef.current.goBack();
        }
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.current?.getCurrentRoute()
          ?.name;
        if (
          previousRouteName !== currentRouteName &&
          navigationRef.current.getCurrentOptions()?.title
        ) {
          console.log(
            '===================',
            navigationRef.current.getCurrentOptions()?.title,
            '===================',
          );
          analytics().logScreenView({
            screen_name: navigationRef.current.getCurrentOptions()?.title,
            screen_class: navigationRef.current.getCurrentOptions()?.title,
          });
        } else {
          if (
            navigationRef.current.getCurrentRoute()?.name !==
              'ChecklistShareUpdateScreen' &&
            navigationRef.current.getCurrentRoute()?.name !== '특이사항' &&
            navigationRef.current.getCurrentRoute()?.name !== '지시사항' &&
            navigationRef.current.getCurrentRoute()?.name !==
              'ChecklistShareItemScreen' &&
            navigationRef.current.getCurrentRoute()?.name !==
              'ChecklistShareInsertScreen'
          ) {
            console.log(
              'NO TITLE *********************',
              navigationRef.current.getCurrentRoute()?.name,
              '********************* HERE',
            );
          }
        }
        routeNameRef.current = currentRouteName;
      }}>
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator
        mode="modal"
        initialRouteName={
          isLoggedIn ? 'LoggedInNavigation' : 'LoggedOutNavigation'
        }>
        <RootStack.Screen
          name="LoggedInNavigation"
          component={LoggedInNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <RootStack.Screen
          name="LoggedOutNavigation"
          component={LoggedOutNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <RootStack.Screen
          name="HelpModalScreen"
          component={HelpModalScreen}
          options={{
            title: '도움말 전체보기',
            headerRight: () => <CloseBtn />,
            headerStyle: {
              backgroundColor: styleGuide.palette.primary,
              borderColor: 'white',
              borderWidth: 0,
              ...headerStyle,
            },
            headerTintColor: 'white',
            headerLeft: null,
          }}
        />
        <RootStack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{
            gestureEnabled: false,
            title: '자주 묻는 질문',
            headerRight: () => <CloseBtn />,
            headerStyle: {
              backgroundColor: styleGuide.palette.primary,
              borderColor: 'white',
              borderWidth: 0,
              ...headerStyle,
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerLeft: null,
          }}
        />
      </RootStack.Navigator>
      {visible && (
        <Container>
          <Loader />
        </Container>
      )}
    </NavigationContainer>
  );
};
