import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, LogBox} from 'react-native';
import {useSelector} from 'react-redux';
import firebase from 'react-native-firebase';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import * as Sentry from '@sentry/react-native';

import CloseBtn from './Header/CloseBtn';
import LoggedInNavigation from '../navigations/LoggedInNavigation';
import LoggedOutNavigation from '../navigations/LoggedOutNavigation';
import HelpModalScreen from '../screens/LoggedInScreen/Home/HelpModalScreen/index';
import Loader from './Loader';

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

  const {visible} = useSelector((state: any) => state.splashReducer);
  const {isLoggedIn} = useSelector((state: any) => state.userReducer);
  const RootStack = createStackNavigator();

  // Sentry.init({
  //   dsn:
  //     'https://920fb530d09442768b04ec6825a3a2b4@o450648.ingest.sentry.io/5457931',
  //   enableAutoSessionTracking: true,
  //   sessionTrackingIntervalMillis: 10000,
  // });

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (
          previousRouteName !== currentRouteName &&
          navigationRef.current.getCurrentOptions().title
        ) {
          console.log(
            '===================',
            navigationRef.current.getCurrentOptions().title,
            '===================',
          );
          firebase
            .analytics()
            .setCurrentScreen(navigationRef.current.getCurrentOptions().title);
        } else {
          if (
            navigationRef.current.getCurrentRoute().name !==
              'ChecklistShareUpdateScreen' &&
            navigationRef.current.getCurrentRoute().name !== '특이사항' &&
            navigationRef.current.getCurrentRoute().name !== '지시사항' &&
            navigationRef.current.getCurrentRoute().name !==
              'ChecklistShareItemScreen' &&
            navigationRef.current.getCurrentRoute().name !==
              'ChecklistShareInsertScreen'
          ) {
            console.log(
              'NO TITLE *********************',
              navigationRef.current.getCurrentRoute().name,
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
              backgroundColor: '#e85356',
              borderColor: '#fff',
              borderWidth: 0,
            },
            headerTintColor: '#fff',
            headerLeft: null,
          }}
        />
      </RootStack.Navigator>
      {visible && (
        <Container>
          <Loader size={'large'} />
        </Container>
      )}
    </NavigationContainer>
  );
};
