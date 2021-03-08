import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectStoreScreenPresenter from './SelectStoreScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {NativeModules, Alert, Linking, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setDEVICE_INFO} from '~/redux/userSlice';
import {selectSTORE} from '~/redux/storeSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import DeviceInfo from 'react-native-device-info';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SharedStorage = NativeModules.SharedStorage;
  const {MEMBER_SEQ, STORE, IS_SUPER_USER} = useSelector(
    (state: any) => state.userReducer,
  );
  const {visible} = useSelector((state: any) => state.splashReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [STORELIST_DATA, setSTORELIST_DATA] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  const alertModal = (content, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      content,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // GOTO 홈스크린
  const gotoHomeScreen = (data) => {
    if (STORE == 0 && data.TYPE == '0') {
      alertModal('합류승인 대기중입니다.');
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeScreen',
            params: {
              STORE_SEQ: data.STORE_SEQ,
              STORE,
              STORE_NAME: data.NAME,
              WORKING_COUNT: data.workinglist,
              TOTAL_COUNT: data.emplist,
              GPS: data.GPS,
              hasConfirmed: data.hasConfirmedQr,
              category: data.CATEGORY,
              QR_Num: data.QR_Num, //0208 REMOVEQR
            },
          },
        ],
      });
      dispatch(
        selectSTORE({
          STORE_SEQ: data.STORE_SEQ,
          STORE_NAME: data.NAME,
        }),
      );
    }
  };

  // GOTO 사업장 등록하기
  const gotoAddStore = () => {
    navigation.navigate('AddStoreScreen');
  };

  const fetchData = async () => {
    try {
      dispatch(setSplashVisible({visible: true, text: '사업장 목록'}));
      const {data} = await api.storeList(STORE, MEMBER_SEQ);
      if (data.message === 'SUCCESS') {
        setSTORELIST_DATA(data.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
      setloading(false);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const PUSH_TOKEN = await messaging().getToken();
    if (PUSH_TOKEN && !IS_SUPER_USER) {
      console.log('PUSH_TOKEN', PUSH_TOKEN);
      await api.changeToken({
        token: PUSH_TOKEN,
        MEMBER_SEQ,
      });
      dispatch(
        setDEVICE_INFO({
          PUSH_TOKEN,
          DEVICE_MODEL: DeviceInfo.getModel(),
          DEVICE_PLATFORM: Platform.OS,
          DEVICE_SYSTEM_VERSION:
            Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
        }),
      );
    }
  };

  useEffect(() => {
    requestUserPermission();
    fetchData();
    // if (utils.isAndroid()) {
    //   if (STORE_NAME == '') {
    //     SharedStorage.set(
    //       JSON.stringify({
    //         WIDGET_TEXT:
    //           '선택된 사업장이 없습니다. 탭하여 사업장을 선택하세요.',
    //         WIDGET_STORE: STORE,
    //         WIDGET_STATUS: '1',
    //       }),
    //     );
    //   }
    // }
    // dispatch(resetCUSTOM_MENU_STORE());
  }, []);

  return (
    <SelectStoreScreenPresenter
      STORE={STORE}
      STORELIST_DATA={STORELIST_DATA}
      refreshing={refreshing}
      onRefresh={onRefresh}
      gotoAddStore={gotoAddStore}
      gotoHomeScreen={gotoHomeScreen}
      visible={visible}
      loading={loading}
    />
  );
};
