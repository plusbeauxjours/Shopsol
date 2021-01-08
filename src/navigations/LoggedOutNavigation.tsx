import React, {useEffect} from 'react';
import {NativeModules} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import StartScreen from '../screens/LoggedOutScreen/StartScreen';
import LogInScreen from '../screens/LoggedOutScreen/LogInScreen';
import SignupScreen from '../screens/LoggedOutScreen/SignupScreen';
import FindPasswordScreen from '../screens/LoggedOutScreen/FindPasswordScreen';
import VerificationScreen from '../screens/LoggedOutScreen/VerificationScreen';
import BackBtn from '../components/Header/BackBtn';
import {useSelector} from 'react-redux';
import RootModal from '../components/RootModal';

import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

const LoggedOutNavigation = createStackNavigator();

export default () => {
  const alert = useSelector((state: any) => state.alertReducer);
  const SharedStorage = NativeModules.SharedStorage;
  useEffect(() => {
    // if (utils.isAndroid) {
    //   SharedStorage.set(
    //     JSON.stringify({
    //       WIDGET_TEXT: '로그아웃 되어있습니다. 탭하여 로그인하세요.',
    //       WIDGET_STORE: null,
    //       WIDGET_STATUS: '0',
    //     }),
    //   );
    // }
  }, []);

  return (
    <React.Fragment>
      <LoggedOutNavigation.Navigator
        headerMode={'screen'}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          animationEnabled: utils.isAndroid() ? false : true,
          headerStyle: {
            backgroundColor: styleGuide.palette.primary,
            borderColor: 'white',
            borderWidth: 0,
          },
          headerBackTitleVisible: false,
          headerBackImage: () => <BackBtn />,
          headerLeftContainerStyle: {marginLeft: 10},
        }}>
        <LoggedOutNavigation.Screen
          name="StartScreen"
          component={StartScreen}
          options={{
            headerShown: false,
            title: '시작 페이지',
          }}
        />
        <LoggedOutNavigation.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={{
            headerTitle: '로그인',
            title: '로그인',
            headerTintColor: 'white',
          }}
        />
        <LoggedOutNavigation.Screen
          name="VerificationScreen"
          component={VerificationScreen}
          options={{
            headerTitle: '회원가입',
            title: '전화번호 인증',
            headerTintColor: 'white',
          }}
        />
        <LoggedOutNavigation.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            headerTitle: '회원가입',
            title: '회원가입',
            headerTintColor: 'white',
          }}
        />
        <LoggedOutNavigation.Screen
          name="FindPasswordScreen"
          component={FindPasswordScreen}
          options={{
            headerTitle: '비밀번호 찾기',
            title: '비밀번호 찾기',
            headerTintColor: 'white',
          }}
        />
      </LoggedOutNavigation.Navigator>
      {alert.visible && <RootModal alert={alert} />}
    </React.Fragment>
  );
};
