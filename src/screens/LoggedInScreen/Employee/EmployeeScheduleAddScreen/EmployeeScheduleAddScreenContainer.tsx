import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import EmployeeScheduleAddScreenPresenter from './EmployeeScheduleAddScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';
import {useNavigation} from '@react-navigation/native';

const constant = {
  WORK_TYPE: {
    FIX: 'fix',
    FREE: 'free',
  },
  COLOR: [
    '#0D4F8A',
    '#ED8F52',
    '#FEBF40',
    '#5CAD6F',
    '#984B19',
    '#CB8DB1',
    '#FEBF40',
  ],
};

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {type: TYPE, EMP_SEQ, fetchData} = params;
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false); // INSERT 또는 UPDATE 상태값
  const [timeList, setTimeList] = useState<any>(params?.timeList || []); // 저장된 근무 시간 목록
  const [startDate, setStartDate] = useState<any>(
    moment(params?.startDate) || moment(),
  ); // 근무 시작일
  const [endDate, setEndDate] = useState<any>(
    moment(params?.endDate) || moment(),
  ); // 근무 종료일
  const [initStartDate, setInitStartDate] = useState<any>(
    moment(params?.startDate) || moment(),
  ); // 근무 시작일
  const [initEndDate, setInitEndDate] = useState<any>(
    moment(params?.endDate) || moment(),
  ); // 근무 종료일

  const [startTime, setStartTime] = useState<any>(moment());
  const [endTime, setEndTime] = useState<any>(moment());
  const [startTimeSet, setStartTimeSet] = useState<boolean>(false);
  const [endTimeSet, setEndTimeSet] = useState<boolean>(false);

  const [timeListIndex, setTimeListIndex] = useState<any>(0); // 저장된 근무 시간 목록 중 선택된 항목의 인덱스
  const [originalDayList, setOriginalDayList] = useState<any>([]); // dayList 원본 값
  const [dayList, setDayList] = useState<any>([]); // 일요일 ~ 토요일까지 화면에 보여질 요일 배열
  const [calendarModalType, setCalendarModalType] = useState<string>(null); // 캘린더 모달 종류 (start: 근무 시작일, end: 근무 종료일)
  const [checkNoEndDate, setCheckNoEndDate] = useState<boolean>(
    params?.endDate ? false : true,
  ); // 일정 종료일 없음 체크
  const [deleteList, setDeleteList] = useState<any>([]); // 삭제 대상 목록
  const [isStartDayModalVisible, setIsStartDayModalVisible] = useState<boolean>(
    false,
  );
  const [isEndDayModalVisible, setIsEndDayModalVisible] = useState<boolean>(
    false,
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

  const explainModal = (text) => {
    const params = {
      alertType: 'explain',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const selectDateFn = (date) => {
    let markedDates = {};
    markedDates[date.dateString] = {
      selected: true,
      selectedColor: '#7e7c7c',
    };
    if (calendarModalType === 'start') {
      setStartDate(date.dateString);
      setInitStartDate(date.dateString);
    } else {
      params?.endDate && setEndDate(moment(date.dateString));
      params?.endDate && setInitEndDate(moment(date.dateString));
    }
  };

  // STEP2 출퇴근 요일 선택 추가하기 버튼
  const checkAddTimeFn = () => {
    let validDay = false;
    for (const day of dayList) {
      if (day.isChecked) {
        validDay = true;
        break;
      }
    }
    if (!startTimeSet || !endTimeSet) {
      alertModal('출퇴근 시간을 입력해주세요');
    } else if (
      moment(startTime).format('HH:mm') == moment(endTime).format('HH:mm')
    ) {
      return alertModal('출퇴근 시간을 다르게 입력해주세요.');
    } else if (!validDay) {
      alertModal('출퇴근 요일을 선택해주세요');
    } else {
      // 상단 폼 영역부터 초기화
      setStartTimeSet(false);
      setEndTimeSet(false);
      setDayList(JSON.parse(JSON.stringify(originalDayList)));
      setTimeListIndex(timeList.length);
      // 중간에 삭제되는 경우 다음 추가에 대한 컬러 인덱스 우선권 부여
      const colorIndex =
        timeList.length <= constant.COLOR.length ? timeList.length : 0;
      setTimeList([
        ...timeList,
        {
          startTime: moment(startTime).format('HH:mm'),
          endTime: moment(endTime).format('HH:mm'),
          dayList,
          color: constant.COLOR[colorIndex],
        },
      ]);
    }
  };

  // STEP3 출퇴근 시간 삭제
  const removeTimeFn = (index) => {
    let timeListed = [...timeList];
    timeListed.splice(index, 1);
    for (let i = 0; i < timeListed.length; i++) {
      const color = constant.COLOR[i];
      if (color) {
        timeListed[i].color = color;
      }
    }
    setTimeListIndex(0);
    setTimeList(timeListed);
  };

  // STEP3 출퇴근 시간 삭제
  const removeDayFn = (day) => {
    let count = 0;
    let index = -1;
    for (let i = 0; i < timeList.length; i++) {
      for (const innerDay of timeList[i].dayList) {
        if (innerDay.isChecked && day.day === innerDay.day) {
          index = i;
          innerDay.isChecked = false;
          innerDay.EMP_SCH_SEQ = null;
        }
      }
    }
    if (index > -1) {
      for (const innerDay of timeList[index].dayList) {
        if (innerDay.isChecked) {
          count++;
        }
      }
    }
    if (count === 0 && index > -1) {
      removeTimeFn(index);
    }
  };

  // 추가 완료 & 수정 완료
  const submitFn = async () => {
    try {
      dispatch(setSplashVisible({visible: true, text: '일정'}));
      const params = {
        EMP_SEQ,
        START: moment(startDate).format('YYYY-MM-DD'),
        END: !checkNoEndDate ? moment(endDate).format('YYYY-MM-DD') : null,
        empSchedules: [],
      };
      for (const time of timeList) {
        for (const day of time.dayList) {
          if (day.isChecked) {
            params.empSchedules.push({
              EMP_SCH_SEQ: -1,
              JE_SEQ: -1,
              EMP_SEQ,
              DAY: day.day,
              ATTENDANCE_TIME: time.startTime,
              WORK_OFF_TIME: time.endTime,
              USE_FLAG: 1,
              START: moment(startDate).format('YYYY-MM-DD'),
              END: !checkNoEndDate
                ? moment(endDate).format('YYYY-MM-DD')
                : null,
            });
          }
        }
      }
      if (isUpdateMode) {
        const {data} = await api.updateEmpSchedule({DEL: deleteList});
        if (data.message !== 'SUCCESS') {
          alertModal(data.result);
        }
      }
      const {data} = await api.insertEmpSchedule(params);
      if (data.message === 'SUCCESS') {
        alertModal('일정이 ' + TYPE + '되었습니다.');
      } else {
        alertModal(data.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      fetchData();
      navigation.goBack();
      dispatch(setSplashVisible({visible: false}));
    }
  };

  const initialize = () => {
    const dayListed = [
      {day: 0, text: '일', isChecked: false, EMP_SCH_SEQ: null},
      {day: 1, text: '월', isChecked: false, EMP_SCH_SEQ: null},
      {day: 2, text: '화', isChecked: false, EMP_SCH_SEQ: null},
      {day: 3, text: '수', isChecked: false, EMP_SCH_SEQ: null},
      {day: 4, text: '목', isChecked: false, EMP_SCH_SEQ: null},
      {day: 5, text: '금', isChecked: false, EMP_SCH_SEQ: null},
      {day: 6, text: '토', isChecked: false, EMP_SCH_SEQ: null},
    ];

    let timeListed = [];

    if (params) {
      if (params?.timeList) {
        timeListed = JSON.parse(JSON.stringify(params?.timeList));
      }
    }
    setDayList(dayListed);
    setOriginalDayList(JSON.parse(JSON.stringify(dayListed)));

    // 수정이면 값 세팅
    if (timeListed && timeListed.length > 0) {
      const deleteListed = [];
      for (const time of timeListed) {
        for (const day of time.dayList) {
          if (day.EMP_SCH_SEQ) {
            deleteListed.push(day.EMP_SCH_SEQ);
          }
        }
      }
      setIsUpdateMode(true);
      setTimeList(timeListed);
      setDeleteList(deleteListed);
      setCalendarModalType('start');
      selectDateFn({dateString: moment(startDate).format('YYYY-MM-DD')});
      if (!checkNoEndDate) {
        setCalendarModalType('end');
        selectDateFn({dateString: moment(endDate).format('YYYY-MM-DD')});
      }
    }
  };

  // STEP2 요일을 눌렀을 때 toggle isChecked
  const onDayPress = (index) => {
    let dayListed = dayList;
    dayListed[index].isChecked = !dayList[index].isChecked;
    setDayList(dayListed);
  };

  useEffect(() => {
    initialize();
    TYPE == '수정'
      ? navigation.setOptions({headerTitle: '일정 수정'})
      : navigation.setOptions({headerTitle: '일정 추가'});
  }, []);

  return (
    <EmployeeScheduleAddScreenPresenter
      timeList={timeList}
      timeListIndex={timeListIndex}
      setTimeListIndex={setTimeListIndex}
      originalDayList={originalDayList}
      removeDayFn={removeDayFn}
      dayList={dayList}
      startTime={startTime}
      endTime={endTime}
      alertModal={alertModal}
      submitFn={submitFn}
      TYPE={TYPE}
      checkAddTimeFn={checkAddTimeFn}
      explainModal={explainModal}
      startDate={startDate}
      setStartDate={setStartDate}
      isStartDayModalVisible={isStartDayModalVisible}
      setIsStartDayModalVisible={setIsStartDayModalVisible}
      endDate={endDate}
      setEndDate={setEndDate}
      isEndDayModalVisible={isEndDayModalVisible}
      setIsEndDayModalVisible={setIsEndDayModalVisible}
      setCheckNoEndDate={setCheckNoEndDate}
      checkNoEndDate={checkNoEndDate}
      onDayPress={onDayPress}
      removeTimeFn={removeTimeFn}
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
      initStartDate={initStartDate}
      initEndDate={initEndDate}
    />
  );
};
