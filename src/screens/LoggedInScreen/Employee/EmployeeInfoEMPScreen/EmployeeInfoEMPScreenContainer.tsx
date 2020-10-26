import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EmployeeInfoEMPScreenPresenter from './EmployeeInfoEMPScreenPresenter';
import {setSplashVisible} from '~/redux/splashSlice';
import {setEMPLOYEE_INFO_DATA} from '~/redux/employeeSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import moment from 'moment';

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

export default () => {
  const dispatch = useDispatch();

  const {
    EMP_SEQ,
    STORE_DATA: {resultdata: {CALCULATE_DAY = null} = {}} = {},
  } = useSelector((state: any) => state.storeReducer);
  const {EMPLOYEE_INFO_DATA} = useSelector(
    (state: any) => state.employeeReducer,
  );
  const {GENDER} = useSelector((state: any) => state.userReducer);

  const [isFreeWorkingType, setIsFreeWorkingType] = useState<boolean>(true); // true: 자율출퇴근 직원, false: 일정이 있는 직원
  const [timeTableIndex, setTimeTableIndex] = useState<any>(null); // 저장된 시간 목록 중 선택된 항목의 인덱스
  const [timeTable, setTimeTable] = useState<any>([]); // timeList를 근무 시작일 / 근무 종료일 별로 저장한 배열
  const [timeListIndex, setTimeListIndex] = useState<number>(0); // 저장된 근무 시간 목록 중 선택된 항목의 인덱스
  const [timeList, setTimeList] = useState<any>([]); // 저장된 근무 시간 목록
  const [originalDayList, setOriginalDayList] = useState<any>([]); // dayList 원본 값
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title || '',
      content: text || '',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

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

  const fetchSchedule = async (EMP_SEQ) => {
    try {
      const {data} = await api.getSchedules(
        EMP_SEQ,
        moment().format('YYYY'),
        moment().format('MM'),
      );
      if (data.message === 'SUCCESS') {
        initTimeTable(data.result);
      } else if (data.message === 'LIST_EMPTY') {
        initTimeTable([]);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.1');
    }
  };

  const fetchData = async () => {
    try {
      if (!EMPLOYEE_INFO_DATA) {
        dispatch(setSplashVisible(true));
      }
      const {data} = await api.getEmp(EMP_SEQ);
      if (data.message === 'SUCCESS') {
        dispatch(setEMPLOYEE_INFO_DATA(data.result));
        if (data.result.CALENDAR === '1') {
          setIsFreeWorkingType(true);
        }
        if (data.result.CALENDAR === '0') {
          setIsFreeWorkingType(false);
          fetchSchedule(EMP_SEQ);
        }
      }
    } catch (e) {
      console.log(e);
      dispatch(setSplashVisible(false));
      alertModal('', '통신이 원활하지 않습니다.2');
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const getNumberToday = (stringDate?) => {
    if (stringDate) {
      return Number(stringDate.replace(/-/g, ''));
    }
    const numToday = Number(`${moment().format('YYYYMMDD')}`);
    return numToday;
  };

  const numberComma = (num) => {
    let result = num;
    if (isNaN(num)) {
      result = Number(num);
    }
    let resultArray = result.toString().split('.');
    resultArray[0] = resultArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return resultArray.join('.');
  };

  const initTimeTable = (rawTimeList) => {
    const objTimeTable = {};
    const numberToday = getNumberToday();
    /*
    - 종료일이 없는 경우 가장 배열의 가장 뒤에 배치
    - 오늘이 근무 시작일과 종료일 사이에 걸쳐 있는 경우 근무 종료일이 가장 큰 값을 뒤에 배치
    - 기본은 근무 종료일이 가장 큰 값을 뒤에 배치
  */
    rawTimeList.sort((prev, next) => {
      const numPrevStart = Number(prev.START?.replace(/-/g, ''));
      const numPrevEnd = Number(prev.END?.replace(/-/g, ''));
      const numNextStart = Number(next.START?.replace(/-/g, ''));
      const numNextEnd = Number(next.END?.replace(/-/g, ''));
      if (!prev.END || !next.END) {
        if (numPrevStart === numNextStart && numPrevEnd === numNextEnd) {
          return 1;
        }
        return 1;
      }
      if (numPrevStart === numNextStart && numPrevEnd === numNextEnd) {
        return 1;
      }
      if (
        (numPrevStart <= numberToday && numPrevEnd >= numberToday) ||
        (numNextStart <= numberToday && numNextEnd >= numberToday)
      ) {
        if (numPrevEnd > numNextEnd) {
          return 1;
        }
        return -1;
      }
      return numPrevEnd - numNextEnd;
    });

    const originalDayListJSON = [
      {day: 0, text: '일', isChecked: false, EMP_SCH_SEQ: null},
      {day: 1, text: '월', isChecked: false, EMP_SCH_SEQ: null},
      {day: 2, text: '화', isChecked: false, EMP_SCH_SEQ: null},
      {day: 3, text: '수', isChecked: false, EMP_SCH_SEQ: null},
      {day: 4, text: '목', isChecked: false, EMP_SCH_SEQ: null},
      {day: 5, text: '금', isChecked: false, EMP_SCH_SEQ: null},
      {day: 6, text: '토', isChecked: false, EMP_SCH_SEQ: null},
    ];
    setOriginalDayList(JSON.parse(JSON.stringify(originalDayListJSON)));

    for (const rawTime of rawTimeList) {
      const key = `${rawTime.START}@@${rawTime.END || ''}`;
      if (!objTimeTable[key]) {
        // 새로운 데이터인 경우
        const dayList = JSON.parse(JSON.stringify(originalDayListJSON));
        dayList[Number(rawTime.DAY)].isChecked = true;
        dayList[Number(rawTime.DAY)].EMP_SCH_SEQ = rawTime.EMP_SCH_SEQ;
        objTimeTable[key] = {
          startDate: rawTime.START,
          endDate: rawTime.END,
          data: [],
        };
        objTimeTable[key].data.push({
          startTime: rawTime.ATTENDANCE_TIME,
          endTime: rawTime.WORK_OFF_TIME,
          color: constant.COLOR[0],
          dayList,
        });
      } else {
        // 해당 날짜가 이미 존재하는 경우
        let index = -1;
        for (let i = 0; i < objTimeTable[key].data.length; i++) {
          const time = objTimeTable[key].data[i];
          if (
            time.startTime === rawTime.ATTENDANCE_TIME &&
            time.endTime === rawTime.WORK_OFF_TIME
          ) {
            index = i;
          }
        }
        if (index === -1) {
          // 해당 날자가 이미 존재하지만 시간이 다른 경우
          const dayList = JSON.parse(JSON.stringify(originalDayListJSON));
          dayList[Number(rawTime.DAY)].isChecked = true;
          dayList[Number(rawTime.DAY)].EMP_SCH_SEQ = rawTime.EMP_SCH_SEQ;
          objTimeTable[key].data.push({
            startTime: rawTime.ATTENDANCE_TIME,
            endTime: rawTime.WORK_OFF_TIME,
            color: constant.COLOR[objTimeTable[key].data.length],
            dayList,
          });
        }
        if (index > -1) {
          const dayList = JSON.parse(
            JSON.stringify(objTimeTable[key].data[index].dayList),
          );
          dayList[Number(rawTime.DAY)].isChecked = true;
          dayList[Number(rawTime.DAY)].EMP_SCH_SEQ = rawTime.EMP_SCH_SEQ;
          objTimeTable[key].data[index].dayList = dayList;
        }
      }
    }
    const result = [];
    for (const key of Object.keys(objTimeTable)) {
      result.push(objTimeTable[key]);
    }
    setTimeTable(result);
    if (rawTimeList.length === 0) {
      setTimeTableIndex(null);
      setTimeList([]);
      return;
    }
    let timeTableIndex = result.length - 1;
    const today = getNumberToday();
    for (let i = 0; i < result.length; i += 1) {
      const timeObj = result[i];
      if (timeObj) {
        const startDate = getNumberToday(timeObj.startDate);
        const endDate = timeObj.endDate
          ? getNumberToday(timeObj.endDate)
          : 99999999;
        if (startDate <= today && today <= endDate) {
          timeTableIndex = i;
        }
      }
    }
    setTimeTableIndex(timeTableIndex);
    setTimeList(result[timeTableIndex].data);
  };

  const getPeriod = (CALCULATE_DAY) => {
    let dayFrom = new Date();
    let dayTo = new Date();
    let dayFromMonth, dayToMonth, dayFromDay, dayToDay, NowYear;
    NowYear = dayFrom.getFullYear();
    dayFrom.setDate(CALCULATE_DAY); // 시작일 => 정산일로설정
    dayTo.setDate(CALCULATE_DAY); // 종료일 => 정산일로 설정

    dayTo.setMonth(dayTo.getMonth() + 1); // 종료월 => 정산일의 월 +1로 설정
    dayTo.setDate(dayTo.getDate() - 1); // 종료일 => 종료일 -1로 설정

    dayFromMonth = dayFrom.getMonth() + 1;
    dayFromMonth =
      dayFromMonth < 10 ? '0' + String(dayFromMonth) : String(dayFromMonth);

    dayToMonth = dayTo.getMonth() + 1;
    dayToMonth =
      dayToMonth < 10 ? '0' + String(dayToMonth) : String(dayToMonth);

    dayFromDay = dayFrom.getDate();
    dayFromDay < 10 ? (dayFromDay = '0' + dayFromDay) : dayFromDay;
    dayToDay = dayTo.getDate();
    dayToDay < 10 ? (dayToDay = '0' + dayToDay) : dayToDay;

    return `기간: ${NowYear}.${dayFromMonth}.${dayFromDay} ~ ${
      dayToMonth == '01' ? NowYear + 1 : NowYear
    }.${dayToMonth}.${dayToDay}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EmployeeInfoEMPScreenPresenter
      originalDayList={originalDayList}
      timeTableIndex={timeTableIndex}
      timeListIndex={timeListIndex}
      timeList={timeList}
      refreshing={refreshing}
      onRefresh={onRefresh}
      EMPLOYEE_INFO_DATA={EMPLOYEE_INFO_DATA}
      getPeriod={getPeriod}
      numberComma={numberComma}
      isFreeWorkingType={isFreeWorkingType}
      timeTable={timeTable}
      setTimeTableIndex={setTimeTableIndex}
      setTimeListIndex={setTimeListIndex}
      setTimeList={setTimeList}
      getNumberToday={getNumberToday}
      CALCULATE_DAY={CALCULATE_DAY}
      GENDER={GENDER}
    />
  );
};
