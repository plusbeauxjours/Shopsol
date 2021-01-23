import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

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
      IMAGE = null,
      AUTOWORKOFF = null,
      REST_TIME = null,
    } = {},
    date,
  } = params;

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [startTime, setStartTime] = useState<any>(
    UPDATED_START
      ? moment(UPDATED_START?.substring(0, 5), 'kk:mm')
      : ATTENDANCE_TIME
      ? moment(ATTENDANCE_TIME?.substring(0, 5), 'kk:mm')
      : moment(START?.substring(0, 5), 'kk:mm'),
  );
  const [initStartTime, setInitStartTime] = useState<any>(
    UPDATED_START
      ? moment(UPDATED_START?.substring(0, 5), 'kk:mm')
      : ATTENDANCE_TIME
      ? moment(ATTENDANCE_TIME?.substring(0, 5), 'kk:mm')
      : moment(START?.substring(0, 5), 'kk:mm'),
  );
  const [endTime, setEndTime] = useState<any>(
    UPDATED_END
      ? moment(UPDATED_END?.substring(0, 5), 'kk:mm')
      : WORK_OFF_TIME
      ? moment(WORK_OFF_TIME?.substring(0, 5), 'kk:mm')
      : moment(END?.substring(0, 5), 'kk:mm'),
  );
  const [initEndTime, setInitEndTime] = useState<any>(
    UPDATED_END
      ? moment(UPDATED_END?.substring(0, 5), 'kk:mm')
      : WORK_OFF_TIME
      ? moment(WORK_OFF_TIME?.substring(0, 5), 'kk:mm')
      : moment(END?.substring(0, 5), 'kk:mm'),
  );
  const [startTimeSet, setStartTimeSet] = useState<boolean>(false);
  const [endTimeSet, setEndTimeSet] = useState<boolean>(false);
  const [noStart, setNoStart] = useState<boolean>(
    !ATTENDANCE_TIME && !UPDATED_START ? true : false,
  );
  const [noEnd, setNoEnd] = useState<boolean>(
    !WORK_OFF_TIME && !UPDATED_END ? true : false,
  );
  const [
    isStartTimeModalVisible,
    setIsStartTimeModalVisible,
  ] = useState<boolean>(false);
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
    if (
      !noStart &&
      !noEnd &&
      moment(startTime).format('kk:mm') == moment(endTime).format('kk:mm')
    ) {
      return alertModal('출퇴근 시간을 다르게 입력해주세요.');
    } else if (!SCH_ID) {
      try {
        navigation.goBack(); // 뒤로
        alertModal('출퇴근 시간이 변경되었습니다.');
        dispatch(
          updateSCHEDULE({
            date,
            EMP_ID,
            START_TIME,
            END_TIME,
            UPDATED_START: noStart ? null : moment(startTime).format('kk:mm'),
            UPDATED_END: noEnd ? null : moment(endTime).format('kk:mm'),
          }),
        );
        await api.createSchedule({
          STORE_ID: STORE_SEQ,
          EMP_ID,
          EMP_NAME: NAME,
          START: noStart ? '-1' : moment(startTime).format('kk:mm'),
          END: noEnd ? '-1' : moment(endTime).format('kk:mm'),
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
            UPDATED_START: noStart ? null : moment(startTime).format('kk:mm'),
            UPDATED_END: noEnd ? null : moment(endTime).format('kk:mm'),
          }),
        );
        await api.updateSchedule({
          SCH_ID,
          EMP_ID,
          START: noStart ? '-1' : moment(startTime).format('kk:mm'),
          END: noEnd ? '-1' : moment(endTime).format('kk:mm'),
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
    if (type == 'start') {
      setNoStart(false);
      setStartTime(
        ATTENDANCE_TIME
          ? moment(ATTENDANCE_TIME?.substring(0, 5), 'kk:mm')
          : CHANGE_START
          ? moment(CHANGE_START?.substring(0, 5), 'kk:mm')
          : START
          ? moment(START?.substring(0, 5), 'kk:mm')
          : moment(),
      );
      setInitStartTime(
        ATTENDANCE_TIME
          ? moment(ATTENDANCE_TIME?.substring(0, 5), 'kk:mm')
          : CHANGE_START
          ? moment(CHANGE_START?.substring(0, 5), 'kk:mm')
          : START
          ? moment(START?.substring(0, 5), 'kk:mm')
          : moment(),
      );
    } else if (type == 'end') {
      setNoEnd(false);
      setEndTime(
        WORK_OFF_TIME
          ? moment(WORK_OFF_TIME?.substring(0, 5), 'kk:mm')
          : CHANGE_END
          ? moment(CHANGE_END?.substring(0, 5), 'kk:mm')
          : END
          ? moment(END?.substring(0, 5), 'kk:mm')
          : moment(),
      );
      setInitEndTime(
        WORK_OFF_TIME
          ? moment(WORK_OFF_TIME?.substring(0, 5), 'kk:mm')
          : CHANGE_END
          ? moment(CHANGE_END?.substring(0, 5), 'kk:mm')
          : END
          ? moment(END?.substring(0, 5), 'kk:mm')
          : moment(),
      );
    } else if (type == 'deleteStart') {
      setNoStart(true);
    } else if (type == 'deleteEnd') {
      setNoEnd(true);
    }
  };

  return (
    <RealWorkTimeScreenPresenter
      startTime={startTime}
      endTime={endTime}
      NAME={NAME}
      START={START}
      END={END}
      IMAGE={IMAGE}
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
      startTimeSet={startTimeSet}
      setStartTimeSet={setStartTimeSet}
      endTimeSet={endTimeSet}
      setEndTimeSet={setEndTimeSet}
      noStart={noStart}
      noEnd={noEnd}
      AUTOWORKOFF={AUTOWORKOFF}
      REST_TIME={REST_TIME}
      initStartTime={initStartTime}
      setInitStartTime={setInitStartTime}
      initEndTime={initEndTime}
      setInitEndTime={setInitEndTime}
    />
  );
};
