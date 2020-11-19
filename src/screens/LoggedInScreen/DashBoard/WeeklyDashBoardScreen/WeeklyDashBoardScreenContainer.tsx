import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import WeeklyDashBoardScreenPresenter from './WeeklyDashBoardScreenPresenter';

export default () => {
  const dispatch = useDispatch();
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);

  const weekStartDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
  const weekEndDate = moment().endOf('isoWeek').format('YYYY-MM-DD');

  useEffect(() => {}, []);

  return (
    <WeeklyDashBoardScreenPresenter
      weekStartDate={weekStartDate}
      weekEndDate={weekEndDate}
    />
  );
};
