import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import DailyDashBoardScreenPresenter from './DailyDashBoardScreenPresenter';

export default () => {
  const dispatch = useDispatch();
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);

  const [EMP_LIST, setEMP_LIST] = useState<any>([]);
  const [totalEARLY, setTotalEARLY] = useState<number>(0);
  const [EARLY_EMP_LIST, setEARLY_EMP_LIST] = useState<any>([]);
  const [totalLATE, setTotalLATE] = useState<number>(0);
  const [LATE_EMP_LIST, setLATE_EMP_LIST] = useState<any>([]);
  const [totalREST_TIME, setTotalREST_TIME] = useState<number>(0);
  const [REST_TIME_EMP_LIST, setREST_TIME_EMP_LIST] = useState<any>([]);
  const [totalVACATION, setTotalVACATION] = useState<number>(0);
  const [VACATION_EMP_LIST, setVACATION_EMP_LIST] = useState<any>([]);
  const [totalWORKING, setTotalWORKING] = useState<number>(0);
  const [WORKING_EMP_LIST, setWORKING_EMP_LIST] = useState<any>([]);

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
      emp['EARLY'] = i.alear ?? '0';
      emp['LATE'] = i.jigark ?? '0';
      emp['REST_TIME'] = i.REST_TIME;
      emp['VACATION'] = i.VACATION ?? '0';
      emp['IMAGE'] = i.IMAGE ?? '';

      setTotalEARLY((totalEARLY) => totalEARLY + (i.alear === '1' ? 1 : 0));
      setTotalLATE((totalLATE) => totalLATE + (i.jigark === '1' ? 1 : 0));
      setTotalREST_TIME(
        (totalREST_TIME) => totalREST_TIME + Number(i.REST_TIME),
      );
      setTotalVACATION(
        (totalVACATION) => totalVACATION + (i.VACATION == '1' ? 1 : 0),
      );

      i.CHANGE_START && i.CHANGE_END
        ? ((emp['START_TIME'] = i.CHANGE_START),
          (emp['END_TIME'] = i.CHANGE_END),
          (emp['WORKING'] = moment(i.CHANGE_END, 'kk:mm').diff(
            moment(i.CHANGE_START, 'kk:mm'),
          )),
          setTotalWORKING(
            (totalWORKING) =>
              totalWORKING +
              Number(
                moment(i.CHANGE_END, 'kk:mm').diff(
                  moment(i.CHANGE_START, 'kk:mm'),
                ),
              ),
          ))
        : i.ATTENDANCE_TIME && i.WORK_OFF_TIME
        ? ((emp['START_TIME'] = i.ATTENDANCE_TIME),
          (emp['END_TIME'] = i.WORK_OFF_TIME),
          (emp['WORKING'] = moment(i.WORK_OFF_TIME, 'kk:mm').diff(
            moment(i.ATTENDANCE_TIME, 'kk:mm'),
          )),
          setTotalWORKING(
            (totalWORKING) =>
              totalWORKING +
              Number(
                moment(i.WORK_OFF_TIME, 'kk:mm').diff(
                  moment(i.ATTENDANCE_TIME, 'kk:mm'),
                ),
              ),
          ))
        : ((emp['START_TIME'] = i.START),
          (emp['END_TIME'] = i.END),
          (emp['WORKING'] = moment(i.END, 'kk:mm').diff(
            moment(i.START, 'kk:mm'),
          )),
          setTotalWORKING(
            (totalWORKING) =>
              totalWORKING +
              Number(moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm'))),
          ));
    });
    setEMP_LIST(empListTemp);
    setEARLY_EMP_LIST(
      empListTemp.sort((a, b) =>
        a.EARLY > b.EARLY ? -1 : b.EARLY > a.EARLY ? 1 : 0,
      ),
    );

    setLATE_EMP_LIST(
      empListTemp.sort((a, b) =>
        a.LATE > b.LATE ? -1 : b.LATE > a.LATE ? 1 : 0,
      ),
    );

    setREST_TIME_EMP_LIST(
      empListTemp.sort((a, b) =>
        a.REST_TIME > b.REST_TIME ? -1 : b.REST_TIME > a.REST_TIME ? 1 : 0,
      ),
    );

    setVACATION_EMP_LIST(
      empListTemp.sort((a, b) =>
        a.VACATION > b.VACATION ? -1 : b.VACATION > a.VACATION ? 1 : 0,
      ),
    );
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <DailyDashBoardScreenPresenter
      EMP_LIST={EMP_LIST}
      totalEARLY={totalEARLY}
      EARLY_EMP_LIST={EARLY_EMP_LIST}
      totalLATE={totalLATE}
      LATE_EMP_LIST={LATE_EMP_LIST}
      totalREST_TIME={totalREST_TIME}
      REST_TIME_EMP_LIST={REST_TIME_EMP_LIST}
      totalVACATION={totalVACATION}
      VACATION_EMP_LIST={VACATION_EMP_LIST}
      totalWORKING={totalWORKING}
      WORKING_EMP_LIST={WORKING_EMP_LIST}
    />
  );
};
