import React, {useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import ShelfLifeCheckScreenPresenter from './ShelfLifeCheckScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {
  getSHELFLIFE_DATA,
  udpateSHELFLIFE,
  cancelSHELFLIFE,
} from '~/redux/shelflifeSlice';

export default () => {
  const YEAR = moment().format('YYYY');
  const MONTH = moment().format('MM');
  const DAY = moment().format('DD');

  const dispatch = useDispatch();

  const {EMP_SEQ} = useSelector((state: any) => state.storeReducer);
  const {STORE, MEMBER_NAME} = useSelector((state: any) => state.userReducer);
  const {SHELFLIFE_DATA, SHELFLIFE_MARKED} = useSelector(
    (state: any) => state.shelflifeReducer,
  );

  const confirmModal = (shelfLife_SEQ, shelfLifeDate) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품의 유통기한 만료로 폐기 또는 처리 완료 체크합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => updateShelfLife(shelfLife_SEQ, shelfLifeDate),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelModal = (shelfLife_SEQ, shelfLifeDate) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품 처리완료를 취소합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => cancelShelfLife(shelfLife_SEQ, shelfLifeDate),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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

  const onDayPress = (day) => {
    dispatch(getSHELFLIFE_DATA(day.year, day.month, day.day));
  };

  const onRefresh = () => {
    dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
  };

  const cancelShelfLife = async (shelfLife_SEQ, shelfLifeDate) => {
    try {
      alertModal('상품의 처리완료를 취소하였습니다.');
      dispatch(cancelSHELFLIFE({shelfLife_SEQ, shelfLifeDate}));
      const {data} = await api.cancelShelfLifeData({shelfLife_SEQ});
      if (data.resultmsg !== '1') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateShelfLife = async (shelfLife_SEQ, shelfLifeDate) => {
    try {
      alertModal('상품의 폐기 또는 처리 완료 하였습니다.');
      dispatch(
        udpateSHELFLIFE({
          shelfLife_SEQ,
          shelfLifeDate,
          checkEmpName: STORE === '1' ? '점주' : MEMBER_NAME,
          checkTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      );
      const {data} = await api.checkShelfLifeData({
        STORE,
        EMP_SEQ,
        shelfLife_SEQ,
      });
      if (data.resultmsg !== '1') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
  }, []);

  return (
    <ShelfLifeCheckScreenPresenter
      SHELFLIFE_DATA={SHELFLIFE_DATA}
      SHELFLIFE_MARKED={SHELFLIFE_MARKED}
      onDayPress={onDayPress}
      onRefresh={onRefresh}
      confirmModal={confirmModal}
      cancelModal={cancelModal}
      alertModal={alertModal}
    />
  );
};
