import React, {useEffect} from 'react';
import {Platform, Linking, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

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

  const exitandroid = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://itunes.apple.com/kr/app/샵솔/id1408364175?l=ko&ls=1&mt=8',
      );
    } else {
      BackHandler.exitApp();
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.wesop.appshopsol',
      );
    }
  };

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
  }, []);

  return (
    <StartScreenPresenter
      gotoLogin={gotoLogin}
      gotoVerification={gotoVerification}
    />
  );
};
