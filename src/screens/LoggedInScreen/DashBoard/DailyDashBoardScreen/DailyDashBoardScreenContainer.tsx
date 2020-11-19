import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import DailyDashBoardScreenPresenter from './DailyDashBoardScreenPresenter';

export default () => {
  const dispatch = useDispatch();
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);

  const toDay = moment().format('YYYY-MM-DD');

  useEffect(() => {}, []);

  return <DailyDashBoardScreenPresenter toDay={toDay} />;
};
