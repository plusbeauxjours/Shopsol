import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectStoreScreenPresenter from './SelectStoreScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {NativeModules} from 'react-native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import {selectSTORE} from '~/redux/storeSlice';
import {
  resetCALENDAR_DATA,
  setCALENDAR_DATA_STORE_SEQ,
} from '~/redux/calendarSlice';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SharedStorage = NativeModules.SharedStorage;
  const {visible} = useSelector((state: any) => state.splashReducer);
  const {STORE, STORELIST_DATA} = useSelector(
    (state: any) => state.userReducer,
  );
  const {MANAGER_CALLED} = useSelector((state: any) => state.storeReducer);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
        QR_Num: data.QR_Num,
      });
    }
  };

  // GOTO 점포 등록하기
  const gotoAddStore = () => {
    navigation.navigate('AddStoreScreen');
  };

  useEffect(() => {
    try {
      dispatch(setCALENDAR_DATA_STORE_SEQ(''));
      dispatch(resetCALENDAR_DATA());
      dispatch(getSTORELIST_DATA());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
      visible={visible}
      loading={loading}
    />
  );
};
