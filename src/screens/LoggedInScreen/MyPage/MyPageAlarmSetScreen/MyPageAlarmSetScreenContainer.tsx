import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MyPageAlarmSetScreenPresenter from './MyPageAlarmSetScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {
  setAllPush,
  setWorkPush,
  setCheckPush,
  setChecksharePush,
  setScedulePUsh,
} from '~/redux/userAlarmSlice';
import api from '~/constants/LoggedInApi';

export default () => {
  const dispatch = useDispatch();
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {
    All_PUSH,
    WORK_PUSH,
    CHECK_PUSH,
    CHECKSHARE_PUSH,
    SCHEDULE_PUSH,
  } = useSelector((state: any) => state.userAlarmReducer);

  const toggleAlarm = (value) => {
    switch (value) {
      case 'All_PUSH':
        return dispatch(setAllPush(!All_PUSH));
      case 'WORK_PUSH':
        return dispatch(setWorkPush(!WORK_PUSH));
      case 'CHECK_PUSH':
        return dispatch(setCheckPush(!CHECK_PUSH));
      case 'CHECKSHARE_PUSH':
        return dispatch(setChecksharePush(!CHECKSHARE_PUSH));
      case 'SCHEDULE_PUSH':
        return dispatch(setScedulePUsh(!SCHEDULE_PUSH));
      default:
        break;
    }
  };

  const updateAlarm = async (value: boolean, alarm: string) => {
    const isAlarmOn = value == true ? '0' : '1';
    try {
      await api.updatePush({
        MEMBER_SEQ,
        [alarm]: isAlarmOn,
      });
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      toggleAlarm(value);
    }
  };

  const fetch = async () => {
    try {
      const {data} = await api.getPush({MEMBER_SEQ});
      data.All_Push == '1' && dispatch(setAllPush(true));
      data.WORK_PUSH == '1' && dispatch(setWorkPush(true));
      data.CHECK_PUSH == '1' && dispatch(setCheckPush(true));
      data.CHECKSHARE_PUSH == '1' && dispatch(setChecksharePush(true));
      data.SCHEDULE_PUSH == '1' && dispatch(setScedulePUsh(true));
    } catch (e) {
      console.log(e);
    }
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <MyPageAlarmSetScreenPresenter
      updateAlarm={updateAlarm}
      All_PUSH={All_PUSH}
      WORK_PUSH={WORK_PUSH}
      CHECK_PUSH={CHECK_PUSH}
      CHECKSHARE_PUSH={CHECKSHARE_PUSH}
      SCHEDULE_PUSH={SCHEDULE_PUSH}
      toggleAlarm={toggleAlarm}
    />
  );
};
