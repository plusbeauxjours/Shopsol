import React, {createRef, useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import moment from 'moment';

import WeeklyDashBoardScreenPresenter from './WeeklyDashBoardScreenPresenter';
import colors from '~/constants/colors';

export default () => {
  const scrollRef = createRef(0);
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);
  const {STORE_NAME} = useSelector((state: any) => state.storeReducer);
  const {visible} = useSelector((state: any) => state.splashReducer);

  const [loading, setLoading] = useState<boolean>(true);
  const [EMP_LIST, setEMP_LIST] = useState<any>([]);
  const [totalEARLY_COUNT, setTotalEARLY_COUNT] = useState<number>(0);
  const [totalEARLY_EMP, setTotalEARLY_EMP] = useState<number>(0);
  const [EARLY_EMP_LIST, setEARLY_EMP_LIST] = useState<any>([]);
  const [totalLATE_COUNT, setTotalLATE_COUNT] = useState<number>(0);
  const [totalLATE_EMP, setTotalLATE_EMP] = useState<number>(0);
  const [LATE_EMP_LIST, setLATE_EMP_LIST] = useState<any>([]);
  const [totalREST_TIME_COUNT, setTotalREST_TIME_COUNT] = useState<number>(0);
  const [REST_TIME_EMP_LIST, setREST_TIME_EMP_LIST] = useState<any>([]);
  const [totalVACATION_COUNT, setTotalVACATION_COUNT] = useState<number>(0);
  const [totalVACATION_EMP, setTotalVACATION_EMP] = useState<number>(0);
  const [VACATION_EMP_LIST, setVACATION_EMP_LIST] = useState<any>([]);
  const [totalWORKING_COUNT, setTotalWORKING_COUNT] = useState<number>(0);
  const [totalWORKING_EMP, setTotalWORKING_EMP] = useState<number>(0);
  const [totalSUB_WORKING_EMP, setTotalSUB_WORKING_EMP] = useState<number>(0);
  const [totalWORKING_DAY, setTotalWORKING_DAY] = useState<number>(0);

  const weekStartDate = moment().startOf('isoWeek');
  const weekEndDate = moment().endOf('isoWeek');

  const onPressSection = () => {
    return scrollRef.current?.getNode()?.scrollToEnd({animated: true});
  };

  const init = async () => {
    let currentMoment = moment().startOf('isoWeek');
    let endMoment = moment().endOf('isoWeek');
    const weekDates = [];
    while (currentMoment < endMoment) {
      weekDates.push(currentMoment.format('YYYY-MM-DD'));
      currentMoment.add(1, 'days');
    }

    let startSubMoment = moment().startOf('isoWeek');
    let currentSubMoment = moment();
    const weekSubDates = [];
    while (startSubMoment < currentSubMoment) {
      weekSubDates.push(startSubMoment.format('YYYY-MM-DD'));
      startSubMoment.add(1, 'days');
    }

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
          EARLY: 0,
          LATE: 0,
          REST_TIME: 0,
          VACATION: 0,
          IMAGE: '',
        });
      });
      await weekSubDates.map((date, index) => {
        CALENDAR_DATA[date]?.map((i) => {
          let emp = empListTemp.find((j) => j.EMP_SEQ == i.EMP_ID);
          if (emp) {
            emp['EARLY'] = emp['EARLY'] + (i?.alear === '1' ? 1 : 0);
            emp['LATE'] = emp['LATE'] + (i?.jigark === '1' ? 1 : 0);
            emp['VACATION'] = emp['VACATION'] + (i?.VACATION === '1' ? 1 : 0);
            emp['IMAGE'] = i?.IMAGE ?? '';

            ((i.CHANGE_START && i.CHANGE_END) ||
              (i.ATTENDANCE_TIME && i.WORK_OFF_TIME) ||
              (i.START && i.END)) &&
              setTotalSUB_WORKING_EMP(
                (totalSUB_WORKING_EMP) => totalSUB_WORKING_EMP + 1,
              );

            setTotalEARLY_COUNT(
              (totalEARLY_COUNT) =>
                totalEARLY_COUNT + (i.alear === '1' ? 1 : 0),
            );
            setTotalLATE_COUNT(
              (totalLATE_COUNT) => totalLATE_COUNT + (i.jigark === '1' ? 1 : 0),
            );

            setTotalVACATION_COUNT(
              (totalVACATION_COUNT) =>
                totalVACATION_COUNT + (i.VACATION == '1' ? 1 : 0),
            );
          }
        });
      });
      await weekDates.map((date, index) => {
        CALENDAR_DATA[date].length !== 0 &&
          setTotalWORKING_DAY((totalWORKING_DAY) => totalWORKING_DAY + 1);
        CALENDAR_DATA[date]?.map((i) => {
          let emp = empListTemp.find((j) => j.EMP_SEQ == i.EMP_ID);
          setTotalREST_TIME_COUNT(
            (totalREST_TIME_COUNT) =>
              totalREST_TIME_COUNT + Number(i.REST_TIME),
          );
          if (emp) {
            emp['REST_TIME'] = i?.REST_TIME;

            i.CHANGE_START && i.CHANGE_END
              ? moment.duration(i.CHANGE_START).as('milliseconds') >
                moment.duration(i.CHANGE_END).as('milliseconds')
                ? ((emp['START_TIME'] = i.CHANGE_START),
                  (emp['END_TIME'] = i.CHANGE_END),
                  (emp['WORKING'] =
                    emp['WORKING'] +
                    Number(
                      moment(i.CHANGE_END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.CHANGE_START, 'kk:mm')),
                    )),
                  setTotalWORKING_COUNT(
                    (totalWORKING_COUNT) =>
                      totalWORKING_COUNT +
                      Number(
                        moment(i.CHANGE_END, 'kk:mm')
                          .add(1, 'days')
                          .diff(moment(i.CHANGE_START, 'kk:mm')),
                      ),
                  ),
                  setTotalWORKING_EMP(
                    (totalWORKING_EMP) => totalWORKING_EMP + 1,
                  ))
                : ((emp['START_TIME'] = i.CHANGE_START),
                  (emp['END_TIME'] = i.CHANGE_END),
                  (emp['WORKING'] =
                    emp['WORKING'] +
                    Number(
                      moment(i.CHANGE_END, 'kk:mm').diff(
                        moment(i.CHANGE_START, 'kk:mm'),
                      ),
                    )),
                  setTotalWORKING_COUNT(
                    (totalWORKING_COUNT) =>
                      totalWORKING_COUNT +
                      Number(
                        moment(i.CHANGE_END, 'kk:mm').diff(
                          moment(i.CHANGE_START, 'kk:mm'),
                        ),
                      ),
                  ),
                  setTotalWORKING_EMP(
                    (totalWORKING_EMP) => totalWORKING_EMP + 1,
                  ))
              : i.ATTENDANCE_TIME && i.WORK_OFF_TIME
              ? moment.duration(i.ATTENDANCE_TIME).as('milliseconds') >
                moment.duration(i.WORK_OFF_TIME).as('milliseconds')
                ? ((emp['START_TIME'] = i.ATTENDANCE_TIME),
                  (emp['END_TIME'] = i.WORK_OFF_TIME),
                  (emp['WORKING'] =
                    emp['WORKING'] +
                    Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.ATTENDANCE_TIME, 'kk:mm')),
                    )),
                  setTotalWORKING_COUNT(
                    (totalWORKING_COUNT) =>
                      totalWORKING_COUNT +
                      Number(
                        moment(i.WORK_OFF_TIME, 'kk:mm')
                          .add(1, 'days')
                          .diff(moment(i.ATTENDANCE_TIME, 'kk:mm')),
                      ),
                  ),
                  setTotalWORKING_EMP(
                    (totalWORKING_EMP) => totalWORKING_EMP + 1,
                  ))
                : ((emp['START_TIME'] = i.ATTENDANCE_TIME),
                  (emp['END_TIME'] = i.WORK_OFF_TIME),
                  (emp['WORKING'] =
                    emp['WORKING'] +
                    Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm').diff(
                        moment(i.ATTENDANCE_TIME, 'kk:mm'),
                      ),
                    )),
                  setTotalWORKING_COUNT(
                    (totalWORKING_COUNT) =>
                      totalWORKING_COUNT +
                      Number(
                        moment(i.WORK_OFF_TIME, 'kk:mm').diff(
                          moment(i.ATTENDANCE_TIME, 'kk:mm'),
                        ),
                      ),
                  ),
                  setTotalWORKING_EMP(
                    (totalWORKING_EMP) => totalWORKING_EMP + 1,
                  ))
              : moment.duration(i.START).as('milliseconds') >
                moment.duration(i.END).as('milliseconds')
              ? ((emp['START_TIME'] = i.START),
                (emp['END_TIME'] = i.END),
                (emp['WORKING'] =
                  emp['WORKING'] +
                  Number(
                    moment(i.END, 'kk:mm')
                      .add(1, 'days')
                      .diff(moment(i.START, 'kk:mm')),
                  )),
                setTotalWORKING_COUNT(
                  (totalWORKING_COUNT) =>
                    totalWORKING_COUNT +
                    Number(
                      moment(i.END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.START, 'kk:mm')),
                    ),
                ),
                setTotalWORKING_EMP((totalWORKING_EMP) => totalWORKING_EMP + 1),
                setTotalWORKING_DAY((totalWORKING_DAY) => totalWORKING_DAY + 1))
              : ((emp['START_TIME'] = i.START),
                (emp['END_TIME'] = i.END),
                (emp['WORKING'] =
                  emp['WORKING'] +
                  Number(
                    moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm')),
                  )),
                setTotalWORKING_COUNT(
                  (totalWORKING_COUNT) =>
                    totalWORKING_COUNT +
                    Number(
                      moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm')),
                    ),
                ),
                setTotalWORKING_EMP(
                  (totalWORKING_EMP) => totalWORKING_EMP + 1,
                ));
          }
        });
      });

      setTotalEARLY_EMP(empListTemp.filter((i) => i.EARLY > 0).length);
      setTotalLATE_EMP(empListTemp.filter((i) => i.LATE > 0).length);
      setTotalVACATION_EMP(empListTemp.filter((i) => i.VACATION > 0).length);

      const orderByWORKING = [...empListTemp];
      setEMP_LIST(orderByWORKING.sort((a, b) => b.WORKING - a.WORKING));

      const orderByEARLY = [...empListTemp];
      setEARLY_EMP_LIST(orderByEARLY.sort((a, b) => b.EARLY - a.EARLY));

      const orderByLATE = [...empListTemp];
      setLATE_EMP_LIST(orderByLATE.sort((a, b) => b.LATE - a.LATE));

      const orderByREST_TIME = [...empListTemp];
      setREST_TIME_EMP_LIST(
        orderByREST_TIME.sort(
          (a, b) => Number(b.REST_TIME) - Number(a.REST_TIME),
        ),
      );

      const orderByVACATION = [...empListTemp];
      setVACATION_EMP_LIST(
        orderByVACATION.sort((a, b) => b.VACATION - a.VACATION),
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <WeeklyDashBoardScreenPresenter
      EMP_LIST={EMP_LIST}
      totalEARLY_COUNT={totalEARLY_COUNT}
      EARLY_EMP_LIST={EARLY_EMP_LIST}
      totalLATE_COUNT={totalLATE_COUNT}
      LATE_EMP_LIST={LATE_EMP_LIST}
      totalREST_TIME_COUNT={totalREST_TIME_COUNT}
      REST_TIME_EMP_LIST={REST_TIME_EMP_LIST}
      totalVACATION_COUNT={totalVACATION_COUNT}
      VACATION_EMP_LIST={VACATION_EMP_LIST}
      totalWORKING_COUNT={totalWORKING_COUNT}
      totalWORKING_EMP={totalWORKING_EMP}
      weekStartDate={weekStartDate}
      weekEndDate={weekEndDate}
      loading={loading}
      visible={visible}
      STORE_NAME={STORE_NAME}
      scrollRef={scrollRef}
      onPressSection={onPressSection}
      totalWORKING_DAY={totalWORKING_DAY}
      totalEARLY_EMP={totalEARLY_EMP}
      totalLATE_EMP={totalLATE_EMP}
      totalVACATION_EMP={totalVACATION_EMP}
      totalSUB_WORKING_EMP={totalSUB_WORKING_EMP}
    />
  );
};
