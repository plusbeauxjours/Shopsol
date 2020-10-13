import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectStoreScreenPresenter from './SelectStoreScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {BackHandler, Linking, NativeModules} from 'react-native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import {selectSTORE} from '~/redux/storeSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SharedStorage = NativeModules.SharedStorage;
  const {STORE_NAME} = useSelector((state: any) => state.storeReducer);
  const {MEMBER_SEQ, STORE, STORELIST_DATA, DEVICE_PLATFORM} = useSelector(
    (state: any) => state.userReducer,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    p;
    try {
      setRefreshing(true);
      await dispatch(getSTORELIST_DATA());
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const alertModal = (title, text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      title,
      content: text,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const exitandroid = () => {
    dispatch(setAlertVisible(false));
    if (utils.isAndroid()) {
      BackHandler.exitApp();
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

  // 버전체크
  const checkVersion = async () => {
    try {
      const {data} = await api.checkApp({
        appinfoversion: utils.appVersion,
        Dplatform: DEVICE_PLATFORM,
      });
      if (data.RESULT_CODE == '1') {
        alertModal(
          '[ 업데이트 알림 ]',
          '새로운 버전이 출시되었습니다. 업데이트를 진행해주세요.\n\n* 이동 후 업데이트 버튼이 없는 경우에는 앱스토어 종료 후 다시 실행해 주세요.',
          () => {
            exitandroid();
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // GOTO 홈스크린
  const gotoHomeScreen = (data) => {
    if (STORE == 0 && data.TYPE == '0') {
      alertModal('', '합류승인 대기중입니다.');
    } else {
      dispatch(
        selectSTORE({
          STORE_SEQ: data.STORE_SEQ,
          STORE_NAME: data.NAME,
        }),
      );
      navigation.navigate('HomeScreen', {
        STORE_SEQ: data.STORE_SEQ,
        STORE,
        STORE_NAME: data.NAME,
        WORKING_COUNT: data.workinglist,
        TOTAL_COUNT: data.emplist,
      });
    }
  };

  // GOTO 점포 등록하기
  const gotoAddStore = () => {
    navigation.navigate('AddStoreScreen');
  };

  useEffect(() => {
    if (utils.isAndroid()) {
      if (STORE_NAME == '') {
        SharedStorage.set(
          JSON.stringify({
            WIDGET_TEXT:
              '선택된 사업장이 없습니다. 탭하여 사업장을 선택하세요.',
            WIDGET_STORE: STORE,
            WIDGET_STATUS: '1',
          }),
        );
      }
    }

    checkVersion();
    dispatch(getSTORELIST_DATA());
  }, []);

  return (
    <SelectStoreScreenPresenter
      STORE={STORE}
      STORELIST_DATA={STORELIST_DATA}
      refreshing={refreshing}
      onRefresh={onRefresh}
      gotoAddStore={gotoAddStore}
      gotoHomeScreen={gotoHomeScreen}
    />
  );
};
