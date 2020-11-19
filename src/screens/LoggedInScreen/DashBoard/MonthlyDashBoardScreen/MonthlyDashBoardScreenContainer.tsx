import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import MonthlyDashBoardScreenPresenter from './MonthlyDashBoardScreenPresenter';

export default () => {
  const dispatch = useDispatch();
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);

  const monthStartDate = moment().startOf('month').format('YYYY-MM-DD');
  const monthEndDate = moment().endOf('month').format('YYYY-MM-DD');

  useEffect(() => {}, []);

  return (
    <MonthlyDashBoardScreenPresenter
      monthStartDate={monthStartDate}
      monthEndDate={monthEndDate}
    />
  );
};
