import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectStoreScreenPresenter from './SelectStoreScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {NativeModules, Alert, Linking, Platform} from 'react-native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getSTORELIST_DATA, setDEVICE_INFO} from '~/redux/userSlice';
import {selectSTORE} from '~/redux/storeSlice';
import {setSplashVisible, setLoadingVisible} from '~/redux/splashSlice';
import firebase from 'react-native-firebase';
import utils from '~/constants/utils';
import {openSettings} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import api from '~/constants/LoggedInApi';
import {
  resetCALENDAR_DATA,
  setCALENDAR_DATA_STORE_SEQ,
} from '~/redux/calendarSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SharedStorage = NativeModules.SharedStorage;
  const {MEMBER_SEQ, STORE, STORELIST_DATA} = useSelector(
    (state: any) => state.userReducer,
  );
  const {visible, loading} = useSelector((state: any) => state.splashReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await dispatch(getSTORELIST_DATA());
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  const alertModal = (text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      content: text,
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
              QR_Num: data.QR_Num,
              hasConfirmed: data.hasConfirmedQr,
              category: data.CATEGORY,
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

  const getToken = async () => {
    const PUSH_TOKEN = await firebase.messaging().getToken();
    console.log('PUSH_TOKEN', PUSH_TOKEN);
    if (PUSH_TOKEN) {
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

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
      Alert.alert(
        '푸쉬 알림 거절',
        '푸시 알림을 받으려면 확인을 누른 뒤, 환경 설정에서 푸시를 켜주세요.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => {
              utils.isAndroid
                ? openSettings()
                : Linking.openURL('app-settings:');
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    if (params?.from == 'loginScreen') {
      checkPermission();
    }
  }, [params]);

  useEffect(() => {
    try {
      if (visible) {
        dispatch(setSplashVisible({visible: false}));
      }
      if (loading) {
        dispatch(setLoadingVisible(false));
      }
      // dispatch(resetCALENDAR_DATA());
      // dispatch(setCALENDAR_DATA_STORE_SEQ(''));
      if (STORELIST_DATA.length == 0) {
        dispatch(getSTORELIST_DATA());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setAlertVisible(false));
    }
    // if (utils.isAndroid) {
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
    />
  );
};
