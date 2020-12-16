import React, {useState} from 'react';
import WorkTimeScreenPresenter from './WorkTimeScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import {updateWORKTIME} from '~/redux/calendarSlice';

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
      IMAGE = null,
      ATTENDANCE_TIME = null,
      WORK_OFF_TIME = null,
      CHANGE_START = null,
      CHANGE_END = null,
      START_TIME = null,
      END_TIME = null,
      UPDATED_START = null,
      UPDATED_END = null,
      TYPE = null,
      AUTOWORKOFF = null,
      REST_TIME = null,
    },
    date,
  } = params;

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [stepFourClick, setStepFourClick] = useState<boolean>(false);
  const [incentiveCheck, setIncentiveCheck] = useState<
    [boolean, boolean, boolean]
  >([true, false, false]); // [기본급 적용(1배), 야간근무수당 적용(1.5배), 야간근무수당 적용(2배)]
  const [startTime, setStartTime] = useState<any>(
    CHANGE_START
      ? moment(CHANGE_START?.substring(0, 5), 'HH:mm')
      : ATTENDANCE_TIME
      ? moment(ATTENDANCE_TIME?.substring(0, 5), 'HH:mm')
      : moment(START?.substring(0, 5), 'HH:mm'),
  );
  const [endTime, setEndTime] = useState<any>(
    CHANGE_END
      ? moment(CHANGE_END?.substring(0, 5), 'HH:mm')
      : WORK_OFF_TIME
      ? moment(WORK_OFF_TIME?.substring(0, 5), 'HH:mm')
      : moment(END?.substring(0, 5), 'HH:mm'),
  );
  const [startTimeSet, setStartTimeSet] = useState<boolean>(false);
  const [endTimeSet, setEndTimeSet] = useState<boolean>(false);
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
    if (startTime == endTime) {
      return alertModal('출퇴근 시간을 다르게 입력해주세요.');
    } else if (!SCH_ID) {
      try {
        dispatch(
          updateWORKTIME({
            date,
            EMP_ID,
            START,
            END,
            CHANGE_START: moment(startTime).format('HH:mm'),
            CHANGE_END: moment(endTime).format('HH:mm'),
          }),
        );
        navigation.goBack();
        alertModal('근무시간이 변경되었습니다.');
        await api.createSchedule({
          STORE_ID: STORE_SEQ,
          EMP_ID,
          EMP_NAME: NAME,
          START: moment(startTime).format('HH:mm'),
          END: moment(endTime).format('HH:mm'),
          DATE: date,
          TYPE: '1',
          SCHEDULETYPE: '0',
          CHANGE: '1',
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        dispatch(
          updateWORKTIME({
            date,
            EMP_ID,
            START,
            END,
            CHANGE_START: moment(startTime).format('HH:mm'),
            CHANGE_END: moment(endTime).format('HH:mm'),
          }),
        );
        navigation.goBack();
        alertModal('근무시간이 변경되었습니다.');
        await api.updateSchedule({
          SCH_ID,
          EMP_ID,
          START: moment(startTime).format('HH:mm'),
          END: moment(endTime).format('HH:mm'),
          TYPE: '1',
          STATUS: '0',
          STYPE: '',
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <WorkTimeScreenPresenter
      startTime={startTime}
      endTime={endTime}
      stepFourClick={stepFourClick}
      setStepFourClick={setStepFourClick}
      incentiveCheck={incentiveCheck}
      setIncentiveCheck={setIncentiveCheck}
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
      isStartTimeModalVisible={isStartTimeModalVisible}
      setIsStartTimeModalVisible={setIsStartTimeModalVisible}
      isEndTimeModalVisible={isEndTimeModalVisible}
      setIsEndTimeModalVisible={setIsEndTimeModalVisible}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      TYPE={TYPE}
      AUTOWORKOFF={AUTOWORKOFF}
      startTimeSet={startTimeSet}
      setStartTimeSet={setStartTimeSet}
      endTimeSet={endTimeSet}
      setEndTimeSet={setEndTimeSet}
      REST_TIME={REST_TIME}
    />
  );
};
