import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import RealWorkTimeScreenPresenter from './RealWorkTimeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {updateSCHEDULE} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    data: {
      SCH_ID = null,
      EMP_ID = null,
      NAME = null,
      START = null,
      END = null,
      ATTENDANCE_TIME = null,
      WORK_OFF_TIME = null,
      CHANGE_START = null,
      CHANGE_END = null,
      START_TIME = null,
      END_TIME = null,
      UPDATED_START = null,
      UPDATED_END = null,
    } = {},
    date,
  } = params;

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [startTime, setStartTime] = useState<string>(
    ATTENDANCE_TIME?.substring(0, 5) ??
      UPDATED_START?.substring(0, 5) ??
      START?.substring(0, 5),
  );
  const [endTime, setEndTime] = useState<string>(
    WORK_OFF_TIME?.substring(0, 5) ??
      UPDATED_END?.substring(0, 5) ??
      END?.substring(0, 5),
  );
  const [isStartTimeModalVisible, setIsStartTimeModalVisible] = useState<
    boolean
  >(false);
  const [isEndTimeModalVisible, setIsEndTimeModalVisible] = useState<boolean>(
    false,
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const registerFn = async () => {
    if (!SCH_ID) {
      try {
        navigation.goBack(); // 뒤로
        alertModal('출퇴근 시간이 변경되었습니다.');
        dispatch(
          updateSCHEDULE({
            date,
            EMP_ID,
            START_TIME,
            END_TIME,
            UPDATED_START: startTime,
            UPDATED_END: endTime,
          }),
        );
        await api.createSchedule({
          STORE_ID: STORE_SEQ,
          EMP_ID,
          EMP_NAME: NAME,
          START:
            startTime == '00:00'
              ? null
              : startTime == '미출근'
              ? '-1'
              : startTime,
          END: endTime == '00:00' ? null : endTime == '미퇴근' ? '-1' : endTime,
          DATE: date,
          TYPE: '0',
          SCHEDULETYPE: '0',
          CHANGE: '2',
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        navigation.goBack(); // 뒤로
        alertModal('출퇴근 시간이 변경되었습니다.');
        dispatch(
          updateSCHEDULE({
            date,
            EMP_ID,
            START_TIME,
            END_TIME,
            UPDATED_START: startTime,
            UPDATED_END: endTime,
          }),
        );
        await api.updateSchedule({
          SCH_ID,
          EMP_ID,
          START:
            startTime == '00:00'
              ? null
              : startTime == '미출근'
              ? '-1'
              : startTime,
          END: endTime == '00:00' ? null : endTime == '미퇴근' ? '-1' : endTime,
          TYPE: '0',
          STATUS: '0',
          STYPE: '',
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const nomalTimeFn = (type) => {
    const workStart = (ATTENDANCE_TIME || CHANGE_START || START).substring(
      0,
      5,
    );
    const workEnd = (WORK_OFF_TIME || CHANGE_END || END).substring(0, 5);
    if (type == 'start') {
      setStartTime(workStart);
    } else if (type == 'end') {
      setEndTime(workEnd);
    } else if (type == 'deleteStart') {
      setStartTime('미출근');
    } else if (type == 'deleteEnd') {
      setEndTime('미퇴근');
    }
  };

  return (
    <RealWorkTimeScreenPresenter
      startTime={startTime}
      endTime={endTime}
      NAME={NAME}
      START={START}
      END={END}
      ATTENDANCE_TIME={ATTENDANCE_TIME}
      WORK_OFF_TIME={WORK_OFF_TIME}
      CHANGE_START={CHANGE_START}
      CHANGE_END={CHANGE_END}
      START_TIME={START_TIME}
      END_TIME={END_TIME}
      UPDATED_START={UPDATED_START}
      UPDATED_END={UPDATED_END}
      registerFn={registerFn}
      nomalTimeFn={nomalTimeFn}
      isStartTimeModalVisible={isStartTimeModalVisible}
      setIsStartTimeModalVisible={setIsStartTimeModalVisible}
      isEndTimeModalVisible={isEndTimeModalVisible}
      setIsEndTimeModalVisible={setIsEndTimeModalVisible}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
    />
  );
};
