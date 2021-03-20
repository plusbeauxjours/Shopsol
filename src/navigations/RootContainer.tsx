import React, {useRef} from 'react';
import {StatusBar, LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {isIphoneX} from 'react-native-iphone-x-helper';

import CloseBtn from '../components/Header/CloseBtn';
import LoggedInNavigation from './LoggedInNavigation';
import LoggedOutNavigation from './LoggedOutNavigation';
import HelpModalScreen from '../screens/LoggedInScreen/Home/HelpModalScreen/index';
import Loader from '../components/Loader';
import WebViewScreen from '../components/WebViewScreen';

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
  // Ref
  const routeNameRef = useRef(null);
  const navigationRef = useRef(null);
  const dispatch = useDispatch();

  // 전역변수 호출
  const {visible} = useSelector((state: any) => state.splashReducer); // [로딩중]인지 알려주는 전역변수🍉
  const {isLoggedIn} = useSelector((state: any) => state.userReducer); // [로그인]되어있는지 알려주는 전역변수🥑

  // 안드로이드에서 앱을 켰을 때 헤더의 높이가 순간바뀌는 이슈 대응 (feat.대표님)
  const headerStyle = utils.isAndroid() &&
    !isIphoneX() && {
      height: 56,
    };

  const RootStack = createStackNavigator();

  // 네트워크가 없을 때 알림창🐙 띄우기 위하여 네트워크 상태 확인
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

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute()?.name)
      }
      onStateChange={async () => {
        const onNetwork = await isNetworkAvailable();
        if (!onNetwork) {
          alertModal('연결에 실패하였습니다. 네트워크 상태를 확인하세요.'); // 알림창🐙
          navigationRef.current.goBack();
        }

        // GA를 위하여 따로 설정한 스크린 네이밍
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
          // GA를 위하여 따로 설정한 스크린 네이밍의 예외처리
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
          // LoggedInNavigation: [로그인]되어있는지 알려주는 전역변수🥑 가 ture일때 나타나는 네비게이션
          // LoggedOutNavigation: [로그인]되어있는지 알려주는 전역변수🥑 가 false일때 나타나는 네비게이션
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
      {visible && ( // [로딩중]인지 알려주는 전역변수🍉가 true일때 나타나는 로딩스피너
        <Container>
          <Loader />
        </Container>
      )}
    </NavigationContainer>
  );
};
