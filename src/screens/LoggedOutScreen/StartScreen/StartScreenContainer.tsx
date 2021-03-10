import React, {useEffect, useState, useRef} from 'react';
import {Platform, Linking, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '~/constants/LoggedOutApi';
import utils from '~/constants/utils';
import {setDEVICE_PLATFORM} from '~/redux/userSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import StartScreenPresenter from './StartScreenPresenter';
import {setSplashVisible} from '~/redux/splashSlice';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {DEVICE_PLATFORM} = useSelector((state: any) => state.userReducer);

  const [loading, setLoading] = useState<boolean>(true);
  const [SHOWN_APP_GUIDE_SCREEN, setSHOWN_APP_GUIDE_SCREEN] = useState<boolean>(
    false,
  );

  const init = async () => {
    const ASYNC_SHOWN_APP_GUIDE_SCREEN = await AsyncStorage.getItem(
      'SHOWN_APP_GUIDE_SCREEN',
    );
    if (!ASYNC_SHOWN_APP_GUIDE_SCREEN) {
      setSHOWN_APP_GUIDE_SCREEN(true);
    }
    return setLoading(false);
  };

  const setAsyncStorage = async () => {
    setTimeout(() => {
      setSHOWN_APP_GUIDE_SCREEN(false);
      // await AsyncStorage.setItem('SHOWN_APP_GUIDE_SCREEN', 'true');
    }, 200);
  };
  const removeAsyncStorage = async () => {
    setSHOWN_APP_GUIDE_SCREEN(true);
    await AsyncStorage.removeItem('SHOWN_APP_GUIDE_SCREEN');
  };

  const checkVersion = async () => {
    try {
      const {data} = await api.checkApp({
        appinfoversion: utils.appVersion,
        Dplatform: DEVICE_PLATFORM,
      });
      if (data.RESULT_CODE == '1') {
        alertModal(
          '[ 업데이트 알림 ]',
          '새로운 버전이 출시되었습니다. 업데이트를 진행해주세요.\n* 이동 후 업데이트 버튼이 없는 경우에는 앱스토어 종료 후 다시 실행해 주세요.',
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // EXIT
  const exitandroid = () => {
    dispatch(setAlertVisible(false));
    if (utils.isAndroid()) {
      BackHandler.exitApp();
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.wesop.appshopsol',
      );
    } else {
      Linking.openURL(
        'https://itunes.apple.com/kr/app/샵솔/id1408364175?l=ko&ls=1&mt=8',
      );
    }
  };

  useEffect(() => {
    init();
  }, []);

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
      close: '1',
      okCallback: () => {
        exitandroid();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const gotoLogin = () => {
    navigation.navigate('LogInScreen', {
      appVersion: utils.appVersion,
    });
  };

  const gotoVerification = () => {
    navigation.navigate('VerificationScreen');
  };

  useEffect(() => {
    dispatch(setSplashVisible({visible: false}));
    dispatch(setDEVICE_PLATFORM(Platform.OS));
    checkVersion();
    dispatch(setAlertVisible(false));
  }, []);

  return (
    <StartScreenPresenter
      loading={loading}
      gotoLogin={gotoLogin}
      gotoVerification={gotoVerification}
      SHOWN_APP_GUIDE_SCREEN={SHOWN_APP_GUIDE_SCREEN}
      setAsyncStorage={setAsyncStorage}
      removeAsyncStorage={removeAsyncStorage}
    />
  );
};
