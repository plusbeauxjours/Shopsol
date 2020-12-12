import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectStoreScreenPresenter from './SelectStoreScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {NativeModules} from 'react-native';

import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import {selectSTORE} from '~/redux/storeSlice';
import utils from '~/constants/utils';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SharedStorage = NativeModules.SharedStorage;
  const {STORE_NAME} = useSelector((state: any) => state.storeReducer);
  const {STORE, STORELIST_DATA} = useSelector(
    (state: any) => state.userReducer,
  );
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
        GPS: data.GPS,
      });
    }
  };

  // GOTO 점포 등록하기
  const gotoAddStore = () => {
    navigation.navigate('AddStoreScreen');
  };

  useEffect(() => {
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

    dispatch(getSTORELIST_DATA());
    dispatch(setSplashVisible(false));
    dispatch(setAlertVisible(false));
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
