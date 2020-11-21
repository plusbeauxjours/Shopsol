import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import DailyDashBoardScreenPresenter from './DailyDashBoardScreenPresenter';
import colors from '~/constants/colors';

export default () => {
  const dispatch = useDispatch();
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);
  const {visible} = useSelector((state: any) => state.splashReducer);

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
  const [totlaWORKING_EMP, setTotalWORKING_EMP] = useState<number>(0);

  const toDay = moment().format('YYYY-MM-DD');

  const init = async () => {
    try {
      let empListTemp = [];
      await EMPLOYEE_LIST?.workinglist?.map((i, index) => {
        empListTemp.push({
          EMP_SEQ: i.EMP_SEQ,
          EMP_NAME: i.EMP_NAME,
          IS_MANAGER: i.IS_MANAGER,
          name: i.EMP_NAME,
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
          color: colors[index],
          WORKING: 0,
        });
      });
      // CALENDAR_DATA[toDay]?.map((i) => {
      await CALENDAR_DATA['2020-11-20']?.map((i) => {
        let emp = empListTemp.find((j) => j.EMP_SEQ == i.EMP_ID);
        if (emp) {
          emp['EARLY'] = i?.alear ?? '0';
          emp['LATE'] = i?.jigark ?? '0';
          emp['REST_TIME'] = i?.REST_TIME;
          emp['VACATION'] = i?.VACATION ?? '0';
          emp['IMAGE'] = i?.IMAGE ?? '';

          setTotalEARLY((totalEARLY) => totalEARLY + (i.alear === '1' ? 1 : 0));
          setTotalLATE((totalLATE) => totalLATE + (i.jigark === '1' ? 1 : 0));
          setTotalREST_TIME(
            (totalREST_TIME) => totalREST_TIME + Number(i.REST_TIME),
          );
          setTotalVACATION(
            (totalVACATION) => totalVACATION + (i.VACATION == '1' ? 1 : 0),
          );

          i.CHANGE_START && i.CHANGE_END
            ? moment.duration(i.CHANGE_START).as('milliseconds') >
              moment.duration(i.CHANGE_END).as('milliseconds')
              ? ((emp['START_TIME'] = i.CHANGE_START),
                (emp['END_TIME'] = i.CHANGE_END),
                (emp['WORKING'] = moment(i.CHANGE_END, 'kk:mm')
                  .add(1, 'days')
                  .diff(moment(i.CHANGE_START, 'kk:mm'))),
                setTotalWORKING(
                  (totalWORKING) =>
                    totalWORKING +
                    Number(
                      moment(i.CHANGE_END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.CHANGE_START, 'kk:mm')),
                    ),
                ),
                setTotalWORKING_EMP((totlaWORKING_EMP) => totlaWORKING_EMP + 1))
              : ((emp['START_TIME'] = i.CHANGE_START),
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
                ),
                setTotalWORKING_EMP((totlaWORKING_EMP) => totlaWORKING_EMP + 1))
            : i.ATTENDANCE_TIME && i.WORK_OFF_TIME
            ? moment.duration(i.ATTENDANCE_TIME).as('milliseconds') >
              moment.duration(i.WORK_OFF_TIME).as('milliseconds')
              ? ((emp['START_TIME'] = i.ATTENDANCE_TIME),
                (emp['END_TIME'] = i.WORK_OFF_TIME),
                (emp['WORKING'] = moment(i.WORK_OFF_TIME, 'kk:mm')
                  .add(1, 'days')
                  .diff(moment(i.ATTENDANCE_TIME, 'kk:mm'))),
                setTotalWORKING(
                  (totalWORKING) =>
                    totalWORKING +
                    Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.ATTENDANCE_TIME, 'kk:mm')),
                    ),
                ),
                setTotalWORKING_EMP((totlaWORKING_EMP) => totlaWORKING_EMP + 1))
              : ((emp['START_TIME'] = i.ATTENDANCE_TIME),
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
                ),
                setTotalWORKING_EMP((totlaWORKING_EMP) => totlaWORKING_EMP + 1))
            : moment.duration(i.START).as('milliseconds') >
              moment.duration(i.END).as('milliseconds')
            ? ((emp['START_TIME'] = i.START),
              (emp['END_TIME'] = i.END),
              (emp['WORKING'] = moment(i.END, 'kk:mm')
                .add(1, 'days')
                .diff(moment(i.START, 'kk:mm'))),
              setTotalWORKING(
                (totalWORKING) =>
                  totalWORKING +
                  Number(
                    moment(i.END, 'kk:mm')
                      .add(1, 'days')
                      .diff(moment(i.START, 'kk:mm')),
                  ),
              ),
              setTotalWORKING_EMP((totlaWORKING_EMP) => totlaWORKING_EMP + 1))
            : ((emp['START_TIME'] = i.START),
              (emp['END_TIME'] = i.END),
              (emp['WORKING'] = moment(i.END, 'kk:mm').diff(
                moment(i.START, 'kk:mm'),
              )),
              setTotalWORKING(
                (totalWORKING) =>
                  totalWORKING +
                  Number(moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm'))),
              ),
              setTotalWORKING_EMP((totlaWORKING_EMP) => totlaWORKING_EMP + 1));
        }
      });
      setEMP_LIST(
        empListTemp.sort((a, b) =>
          a.WORKING > b.WORKING ? -1 : b.WORKING > a.WORKING ? 1 : 0,
        ),
      );

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
    } catch (e) {
      console.log(e);
    }
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
      totlaWORKING_EMP={totlaWORKING_EMP}
      toDay={toDay}
      visible={visible}
    />
  );
};
