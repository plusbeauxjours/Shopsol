import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import api from '~/constants/LoggedInApi';
import {
  setCALENDAR_DATA,
  setCALENDAR_DATA_STORE_SEQ,
} from '~/redux/calendarSlice';
import DailyDashBoardScreen from './DailyDashBoardScreen';
import WeeklyDashBoardScreen from './WeeklyDashBoardScreen';
import MonthlyDashBoardScreen from './MonthlyDashBoardScreen';
import {setSplashVisible} from '~/redux/splashSlice';
import styleGuide from '~/constants/styleGuide';

export default () => {
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();

  const {CALENDAR_DATA_STORE_SEQ, CALENDAR_DATA} = useSelector(
    (state: any) => state.calendarReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {
    STORE_SEQ,
    EMP_SEQ,
    STORE_DATA: {resultdata: {CALENDAR_EDIT = null} = {}} = {},
  } = useSelector((state: any) => state.storeReducer);

  const [loading, setLoading] = useState<boolean>(true);

  // 캘린더스크린에서 렌더되는 일정정보를 패칭
  const fetchSchedulesData = async () => {
    try {
      dispatch(setSplashVisible({visible: true, text: '사업장현황'}));
      dispatch(setCALENDAR_DATA_STORE_SEQ(STORE_SEQ));
      if (
        !CALENDAR_DATA_STORE_SEQ ||
        CALENDAR_DATA_STORE_SEQ != STORE_SEQ ||
        !CALENDAR_DATA[moment().format('YYYY-MM-DD')]
      ) {
        const {data: scheduleData} = await api.getAllSchedules(
          STORE_SEQ,
          moment().format('YYYY'),
          moment().format('M'),
        );
        // 데이터 가공
        if (scheduleData.message === 'SUCCESS') {
          let buffer = {};
          const iterator = Object.keys(scheduleData.result);
          for (const key of iterator) {
            buffer[key] = scheduleData.result[key]['EMP_LIST'];
            if (buffer[key].length !== 0) {
              for (let k = 0; k < buffer[key].length; k++) {
                buffer[key][k] = {...buffer[key][k], WORKDATE: key};
              }
            }
          }
          if (STORE == '0' && CALENDAR_EDIT !== 1) {
            for (const key of iterator) {
              buffer[key] = buffer[key]?.filter(
                (info) => info.EMP_ID == EMP_SEQ,
              );
            }
          }
          dispatch(
            setCALENDAR_DATA({
              CALENDAR_DATA: buffer,
              date: moment().format('YYYY-MM-DD'),
            }),
          );
        }
      }
      // 오늘이 월의 마지막주라면 다음달의 일정도 패칭(주간 사업장현황)
      // 예를 들면 2021.03.29~2021.04.04
      if (
        CALENDAR_DATA_STORE_SEQ != STORE_SEQ ||
        (moment().startOf('isoWeek').format('MM') !==
          moment().endOf('isoWeek').format('MM') &&
          !CALENDAR_DATA[moment().add(1, 'month').format('YYYY-MM-DD')])
      ) {
        const {data: scheduleData} = await api.getAllSchedules(
          STORE_SEQ,
          moment().add(1, 'month').format('YYYY'),
          moment().add(1, 'month').format('M'),
        );
        // 마찬가지로 데이터 가공
        if (scheduleData.message === 'SUCCESS') {
          let buffer = {};
          const iterator = Object.keys(scheduleData.result);
          for (const key of iterator) {
            buffer[key] = scheduleData.result[key]['EMP_LIST'];
            if (buffer[key].length !== 0) {
              for (let k = 0; k < buffer[key].length; k++) {
                buffer[key][k] = {...buffer[key][k], WORKDATE: key};
              }
            }
          }
          if (STORE == '0' && CALENDAR_EDIT !== 1) {
            for (const key of iterator) {
              buffer[key] = buffer[key]?.filter(
                (info) => info.EMP_ID == EMP_SEQ,
              );
            }
          }
          dispatch(
            setCALENDAR_DATA({
              CALENDAR_DATA: buffer,
              date: moment().add(1, 'month').format('YYYY-MM-DD'),
              STORE_SEQ,
            }),
          );
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      dispatch(setSplashVisible({visible: false}));
    }
  };

  useEffect(() => {
    fetchSchedulesData();
    analytics().logScreenView({
      screen_name: '사업장현황',
      screen_class: '사업장현황',
    });
  }, []);

  if (loading) {
    return null;
  } else {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: 14},
          indicatorStyle: {
            height: 4,
            borderRadius: 10,
            backgroundColor: styleGuide.palette.primary,
          },
          style: {backgroundColor: 'white'},
        }}>
        <Tab.Screen name="일별현황" component={DailyDashBoardScreen} />
        <Tab.Screen name="주별현황" component={WeeklyDashBoardScreen} />
        <Tab.Screen name="월별현황" component={MonthlyDashBoardScreen} />
      </Tab.Navigator>
    );
  }
};
