import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import styled from 'styled-components/native';
import firebase from 'react-native-firebase';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import api from '~/constants/LoggedInApi';
import {setCALENDAR_DATA} from '~/redux/calendarSlice';
import DailyDashBoardScreen from './DailyDashBoardScreen';
import WeeklyDashBoardScreen from './WeeklyDashBoardScreen';
import MonthlyDashBoardScreen from './MonthlyDashBoardScreen';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default () => {
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();

  const {STORE} = useSelector((state: any) => state.userReducer);
  const {
    STORE_SEQ,
    EMP_SEQ,
    STORE_DATA: {resultdata: {CALENDAR_EDIT = null} = {}} = {},
  } = useSelector((state: any) => state.storeReducer);

  const fetchData = async (date) => {
    try {
      const {data} = await api.getAllSchedules(
        STORE_SEQ,
        moment(date).format('YYYY'),
        moment(date).format('M'),
      );
      if (data.message === 'SUCCESS') {
        let buffer = {};
        const iterator = Object.keys(data.result);
        for (const key of iterator) {
          buffer[key] = data.result[key]['EMP_LIST'];
          if (buffer[key].length !== 0) {
            for (let k = 0; k < buffer[key].length; k++) {
              buffer[key][k] = {...buffer[key][k], WORKDATE: key};
            }
          }
        }
        if (STORE == '0' && CALENDAR_EDIT !== 1) {
          for (const key of iterator) {
            buffer[key] = buffer[key]?.filter((info) => info.EMP_ID == EMP_SEQ);
          }
        }
        dispatch(setCALENDAR_DATA({CALENDAR_DATA: buffer, date}));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData(moment().format('YYYY-MM-DD'));
    console.log(
      moment().startOf('isoWeek').format('MM'),
      moment().endOf('isoWeek').format('MM'),
    );
    // if (
    //   moment().startOf('isoWeek').format('MM') !==
    //   moment().endOf('isoWeek').format('MM')
    // ) {
    //   // fetchData(moment().add('month', 1).format('YYYY-MM-DD'));
    //   console.log('koko');
    // }
    firebase.analytics().setCurrentScreen('사업장 현황');
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 14},
        indicatorStyle: {
          height: 4,
          borderRadius: 10,
          backgroundColor: '#e85356',
        },
        style: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen name="일별현황" component={DailyDashBoardScreen} />
      <Tab.Screen name="주별현황" component={WeeklyDashBoardScreen} />
      <Tab.Screen name="월별현황" component={MonthlyDashBoardScreen} />
    </Tab.Navigator>
  );
};
