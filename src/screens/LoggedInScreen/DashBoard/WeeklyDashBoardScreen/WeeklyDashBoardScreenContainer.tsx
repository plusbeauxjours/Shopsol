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
  const [totalNOWORK_COUNT, setTotalNOWORK_COUNT] = useState<number>(0);
  const [totalNOWORK_EMP, setTotalNOWORK_EMP] = useState<number>(0);
  const [NOWORK_EMP_LIST, setNOWORK_EMP_LIST] = useState<any>([]);
  const [totalWORKING_COUNT, setTotalWORKING_COUNT] = useState<number>(0);
  const [totalWORKING_EMP, setTotalWORKING_EMP] = useState<number>(0);
  const [totalSUB_WORKING_EMP, setTotalSUB_WORKING_EMP] = useState<number>(0);
  const [totalWORKING_DAY, setTotalWORKING_DAY] = useState<number>(0);
  const [modalEARLY, setModalEARLY] = useState<boolean>(false);
  const [modalLATE, setModalLATE] = useState<boolean>(false);
  const [modalREST_TIME, setModalREST_TIME] = useState<boolean>(false);
  const [modalVACATION, setModalVACATION] = useState<boolean>(false);
  const [modalNOWORK, setModalNOWORK] = useState<boolean>(false);

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
        empListTemp?.push({
          EMP_SEQ: i.EMP_SEQ,
          EMP_NAME: i.EMP_NAME,
          IS_MANAGER: i.IS_MANAGER,
          name: i.EMP_NAME,
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
          color: colors[index],
          TOTAL_WORKING: 0,
          WORKING: [
            [0, '00:00', '00:00', false, false, false, false],
            [0, '00:00', '00:00', false, false, false, false],
            [0, '00:00', '00:00', false, false, false, false],
            [0, '00:00', '00:00', false, false, false, false],
            [0, '00:00', '00:00', false, false, false, false],
            [0, '00:00', '00:00', false, false, false, false],
            [0, '00:00', '00:00', false, false, false, false],
          ],
          TOTAL_EARLY: 0,
          TOTAL_LATE: 0,
          TOTAL_VACATION: 0,
          TOTAL_NOWORK: 0,
          REST_TIME: '0',
          IMAGE: '',
        });
      });
      await weekSubDates.map((date) => {
        CALENDAR_DATA[date]?.map((i) => {
          let emp = empListTemp?.find((j) => j.EMP_SEQ == i.EMP_ID);
          if (emp) {
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
            setTotalNOWORK_COUNT(
              (totalNOWORK_COUNT) =>
                totalNOWORK_COUNT + (i.nowork == '1' ? 1 : 0),
            );
          }
        });
      });
      await weekDates.map((date, index) => {
        CALENDAR_DATA[date] &&
          CALENDAR_DATA[date]?.length !== 0 &&
          setTotalWORKING_DAY((totalWORKING_DAY) => totalWORKING_DAY + 1);
        CALENDAR_DATA[date]?.map((i) => {
          let emp = empListTemp?.find((j) => j.EMP_SEQ == i.EMP_ID);
          setTotalREST_TIME_COUNT(
            (totalREST_TIME_COUNT) =>
              totalREST_TIME_COUNT + Number(i.REST_TIME),
          );
          if (emp) {
            i.CHANGE_START && i.CHANGE_END
              ? moment.duration(i.CHANGE_START).as('milliseconds') >
                moment.duration(i.CHANGE_END).as('milliseconds')
                ? ((emp['WORKING'][index][1] = i.CHANGE_START),
                  (emp['WORKING'][index][2] = i.CHANGE_END),
                  (emp['TOTAL_WORKING'] =
                    emp['TOTAL_WORKING'] +
                    Number(
                      moment(i.CHANGE_END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.CHANGE_START, 'kk:mm')),
                    )),
                  (emp['WORKING'][index][0] = Number(
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
                : ((emp['WORKING'][index][1] = i.CHANGE_START),
                  (emp['WORKING'][index][2] = i.CHANGE_END),
                  (emp['TOTAL_WORKING'] =
                    emp['TOTAL_WORKING'] +
                    Number(
                      moment(i.CHANGE_END, 'kk:mm').diff(
                        moment(i.CHANGE_START, 'kk:mm'),
                      ),
                    )),
                  (emp['WORKING'][index][0] = Number(
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
                ? ((emp['WORKING'][index][1] = i.ATTENDANCE_TIME),
                  (emp['WORKING'][index][2] = i.WORK_OFF_TIME),
                  (emp['TOTAL_WORKING'] =
                    emp['TOTAL_WORKING'] +
                    Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.ATTENDANCE_TIME, 'kk:mm')),
                    )),
                  (emp['WORKING'][index][0] = Number(
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
                : ((emp['WORKING'][index][1] = i.ATTENDANCE_TIME),
                  (emp['WORKING'][index][2] = i.WORK_OFF_TIME),
                  (emp['TOTAL_WORKING'] =
                    emp['TOTAL_WORKING'] +
                    Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm').diff(
                        moment(i.ATTENDANCE_TIME, 'kk:mm'),
                      ),
                    )),
                  (emp['WORKING'][index][0] = Number(
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
              ? ((emp['WORKING'][index][1] = i.START),
                (emp['WORKING'][index][2] = i.END),
                (emp['TOTAL_WORKING'] =
                  emp['TOTAL_WORKING'] +
                  Number(
                    moment(i.END, 'kk:mm')
                      .add(1, 'days')
                      .diff(moment(i.START, 'kk:mm')),
                  )),
                (emp['WORKING'][index][0] = Number(
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
              : ((emp['WORKING'][index][1] = i.START),
                (emp['WORKING'][index][2] = i.END),
                (emp['TOTAL_WORKING'] =
                  emp['TOTAL_WORKING'] +
                  Number(
                    moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm')),
                  )),
                (emp['WORKING'][index][0] = Number(
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

            emp['TOTAL_VACATION'] =
              emp['TOTAL_VACATION'] + (i?.VACATION === '1' ? 1 : 0);
            emp['WORKING'][index][3] = i?.VACATION === '1' && true;

            emp['TOTAL_LATE'] = emp['TOTAL_LATE'] + (i?.jigark === '1' ? 1 : 0);
            emp['WORKING'][index][4] = i?.jigark === '1' && true;

            emp['TOTAL_EARLY'] =
              emp['TOTAL_EARLY'] + (i?.alear === '1' ? 1 : 0);
            emp['WORKING'][index][5] = i?.alear === '1' && true;

            emp['TOTAL_NOWORK'] =
              emp['TOTAL_NOWORK'] + (i?.nowork === '1' ? 1 : 0);
            emp['WORKING'][index][6] = i?.nowork === '1' && true;

            emp['REST_TIME'] = i?.REST_TIME;
          }
        });
      });

      setTotalEARLY_EMP(empListTemp?.filter((i) => i.TOTAL_EARLY > 0).length);
      setTotalLATE_EMP(empListTemp?.filter((i) => i.TOTAL_LATE > 0).length);
      setTotalVACATION_EMP(
        empListTemp?.filter((i) => i.TOTAL_VACATION > 0).length,
      );
      setTotalNOWORK_EMP(empListTemp?.filter((i) => i.TOTAL_NOWORK > 0).length);

      const orderByWORKING = [...empListTemp];
      setEMP_LIST(
        orderByWORKING?.sort((a, b) => b.TOTAL_WORKING - a.TOTAL_WORKING),
      );

      const orderByEARLY = [...empListTemp];
      setEARLY_EMP_LIST(
        orderByEARLY?.sort((a, b) => b.TOTAL_EARLY - a.TOTAL_EARLY),
      );

      const orderByLATE = [...empListTemp];
      setLATE_EMP_LIST(
        orderByLATE?.sort((a, b) => b.TOTAL_LATE - a.TOTAL_LATE),
      );

      const orderByVACATION = [...empListTemp];
      setVACATION_EMP_LIST(
        orderByVACATION?.sort((a, b) => b.TOTAL_VACATION - a.TOTAL_VACATION),
      );

      const orderByREST_TIME = [...empListTemp];
      setREST_TIME_EMP_LIST(
        orderByREST_TIME?.sort(
          (a, b) => Number(b.REST_TIME) - Number(a.REST_TIME),
        ),
      );

      const orderByNOWORK = [...empListTemp];
      setNOWORK_EMP_LIST(
        orderByNOWORK?.sort((a, b) => b.TOTAL_NOWORK - a.TOTAL_NOWORK),
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loading && init();
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
      totalNOWORK_COUNT={totalNOWORK_COUNT}
      totalNOWORK_EMP={totalNOWORK_EMP}
      NOWORK_EMP_LIST={NOWORK_EMP_LIST}
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
      modalEARLY={modalEARLY}
      setModalEARLY={setModalEARLY}
      modalLATE={modalLATE}
      setModalLATE={setModalLATE}
      modalREST_TIME={modalREST_TIME}
      setModalREST_TIME={setModalREST_TIME}
      modalVACATION={modalVACATION}
      setModalVACATION={setModalVACATION}
      modalNOWORK={modalNOWORK}
      setModalNOWORK={setModalNOWORK}
    />
  );
};
