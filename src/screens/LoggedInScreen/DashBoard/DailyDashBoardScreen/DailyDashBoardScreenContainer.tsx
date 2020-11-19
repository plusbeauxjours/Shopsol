import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import DailyDashBoardScreenPresenter from './DailyDashBoardScreenPresenter';

export default () => {
  const dispatch = useDispatch();
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);

  const [empList, setEmpList] = useState<any>([]);
  const [allEmpWorkingTimeAvg, setAllEmpWorkingTimeAvg] = useState<number>(0);
  const toDay = moment().format('YYYY-MM-DD');

  const init = () => {
    let empListTemp = [];
    EMPLOYEE_LIST?.workinglist?.map((i) => {
      empListTemp.push({
        EMP_SEQ: i.EMP_SEQ,
        EMP_NAME: i.EMP_NAME,
        IS_MANAGER: i.IS_MANAGER,
      });
    });
    CALENDAR_DATA[toDay]?.map((i) => {
      let emp = empListTemp.find((emp) => emp.EMP_SEQ == i.EMP_ID);
      emp['VACATION'] = i.VACATION ?? '0';
      emp['REST_TIME'] = i.REST_TIME;
      i.CHANGE_START && i.CHANGE_END
        ? ((emp['START_TIME'] = i.CHANGE_START),
          (emp['END_TIME'] = i.CHANGE_END),
          (emp['WORKING'] = moment(i.CHANGE_END, 'kk:mm').diff(
            moment(i.CHANGE_START, 'kk:mm'),
          )))
        : i.ATTENDANCE_TIME && i.WORK_OFF_TIME
        ? ((emp['START_TIME'] = i.ATTENDANCE_TIME),
          (emp['END_TIME'] = i.WORK_OFF_TIME),
          (emp['WORKING'] = moment(i.WORK_OFF_TIME, 'kk:mm').diff(
            moment(i.ATTENDANCE_TIME, 'kk:mm'),
          )))
        : ((emp['START_TIME'] = i.START),
          (emp['END_TIME'] = i.END),
          (emp['WORKING'] = moment(i.END, 'kk:mm').diff(
            moment(i.START, 'kk:mm'),
          )));
      emp['EARLY'] = i.alear ?? '0';
      emp['LATE'] = i.jigark ?? '0';
    });
    setEmpList(empListTemp);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <DailyDashBoardScreenPresenter
      empList={empList}
      toDay={toDay}
      data={CALENDAR_DATA[toDay]}
    />
  );
};
