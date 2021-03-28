import React, {createRef, useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import * as Hangul from 'hangul-js';

import MonthlyDashBoardScreenPresenter from './MonthlyDashBoardScreenPresenter';
import api from '~/constants/LoggedInApi';
import {setCALENDAR_DATA} from '~/redux/calendarSlice';
import styleGuide from '~/constants/styleGuide';

export default () => {
  const scrollRef = createRef(0);
  const dispatch = useDispatch();

  const {STORE} = useSelector((state: any) => state.userReducer);
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);
  const {
    STORE_NAME,
    STORE_SEQ,
    EMP_SEQ,
    STORE_DATA: {resultdata: {CALENDAR_EDIT = null} = {}} = {},
    MANAGER_CALLED,
  } = useSelector((state: any) => state.storeReducer);
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
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<any>([]);
  const [toDay, setToDay] = useState<any>(moment());

  // 범위를 위해서 해당월의 시작일과 마지막일
  const monthStartDate = moment(toDay).startOf('month');
  const monthEndDate = moment(toDay).endOf('month');

  // 스크린의 가장 아래로 이동 (사용안함
  const onPressSection = () => {
    return scrollRef.current?.getNode()?.scrollToEnd({animated: true});
  };

  // 오른쪽 하단의 버튼을 탭하면 가장 위로 이동
  const gotoTop = () => {
    return scrollRef.current?.getNode()?.scrollTo({y: 0, animated: true});
  };

  const prevMonth = () => {
    setToDay(moment(toDay).subtract(1, 'months').format('YYYY-MM-DD'));
    fetchSchedulesData(
      moment(toDay).subtract(1, 'months').format('YYYY-MM-DD'),
    );
  };

  const nextMonth = () => {
    setToDay(moment(toDay).add(1, 'months').format('YYYY-MM-DD'));
    fetchSchedulesData(moment(toDay).add(1, 'months').format('YYYY-MM-DD'));
  };

  // 날짜를 옮겼을 때 리덕스에 옮긴 주가 없을 때 데이터 패칭
  // 예를 들면 리덕스에 3월과 4월의 데이터가 있을 때 5월로 이동
  const fetchSchedulesData = async (date) => {
    try {
      setLoading(true);
      setTotalEARLY_COUNT(0);
      setTotalEARLY_EMP(0);
      setTotalLATE_COUNT(0);
      setTotalLATE_EMP(0);
      setTotalREST_TIME_COUNT(0);
      setTotalVACATION_COUNT(0);
      setTotalVACATION_EMP(0);
      setTotalNOWORK_COUNT(0);
      setTotalNOWORK_EMP(0);
      setTotalWORKING_COUNT(0);
      setTotalWORKING_EMP(0);
      setTotalSUB_WORKING_EMP(0);
      setTotalWORKING_DAY(0);
      if (!CALENDAR_DATA[moment(date).format('YYYY-MM-DD')]) {
        const {data: scheduleData} = await api.getAllSchedules(
          STORE_SEQ,
          moment(date).format('YYYY'),
          moment(date).format('M'),
        );
        if (scheduleData.message === 'SUCCESS') {
          try {
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
                date: moment(date).format('YYYY-MM-DD'),
              }),
            );
            init(buffer, date);
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        init(CALENDAR_DATA, date);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const init = (CALENDAR_DATA, date) => {
    let currentMoment = moment(date).startOf('month');
    let endMoment = moment(date).endOf('month');
    const monthDates = new Array();
    while (currentMoment < endMoment) {
      monthDates.push(currentMoment.format('YYYY-MM-DD'));
      currentMoment.add(1, 'days');
    }

    let startSubMoment = moment(date).startOf('month');
    let currentSubMoment =
      moment().format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')
        ? moment()
        : moment(date).endOf('month');
    const monthSubDates = new Array();
    while (startSubMoment < currentSubMoment) {
      monthSubDates.push(startSubMoment.format('YYYY-MM-DD'));
      startSubMoment.add(1, 'days');
    }

    try {
      let empListTemp = new Array();
      EMPLOYEE_LIST?.workinglist?.map((i, index) => {
        const WORKING = Array.from(
          Array(Number(moment(date).endOf('month').date())),
          () => [
            0, // 0: 근무시간
            '00:00', // 1: 시작시간
            '00:00', // 2: 종료시간
            false, // 3: 휴가
            false, // 4: 지각
            false, // 5: 조퇴
            false, // 6: 결근
            false, // 7: 유급휴가
            0, // 8: 유급휴가 근무시간
            0, // 9: 출퇴근시간
            '00:00', // 10: 출근시간
            '00:00', // 11: 퇴근시간
          ],
        );
        empListTemp.push({
          EMP_SEQ: i.EMP_SEQ,
          EMP_NAME: i.EMP_NAME,
          IS_MANAGER: i.IS_MANAGER,
          name: i.EMP_NAME,
          legendFontColor: styleGuide.palette.greyColor,
          legendfontSize: styleGuide.fontSize.middle,
          TOTAL_WORKING: 0,
          TOTAL_WORKING_DAY: 0,
          TOTAL_VACATION_TIME: 0,
          WORKING,
          TOTAL_EARLY: 0,
          TOTAL_LATE: 0,
          TOTAL_VACATION: 0,
          TOTAL_NOWORK: 0,
          REST_TIME: '0',
          IMAGE: i?.images[0]?.IMAGE || '',
        });
      });

      //루프를 돌면서 해당일의 총지각, 총조퇴, 총휴게시간, 총휴가, 총결근을 카운트
      monthSubDates.map((date) => {
        CALENDAR_DATA[date]?.map((i) => {
          let emp = empListTemp?.find((j) => j.EMP_SEQ == i.EMP_ID);
          if (emp) {
            emp['IMAGE'] = i?.IMAGE;
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

      // 최신 근무시간을 저장, 직원의 주간 지각일, 조퇴일, 유급휴가일,무급휴가일, 결근일 카운트
      monthDates.map((date, index) => {
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
            (i.START_TIME?.substring(0, 5) ==
              i.UPDATED_START?.substring(0, 5) &&
              i.END_TIME?.substring(0, 5) == i.UPDATED_END?.substring(0, 5)) ||
            (!i.UPDATED_START && !i.UPDATED_END)
              ? ((emp['WORKING'][index][10] = i.START_TIME || '미출근'),
                (emp['WORKING'][index][11] =
                  i.START_TIME && i.AUTOWORKOFF == '1' && !i.END_TIME
                    ? '퇴근미체크'
                    : i.END_TIME
                    ? i.END_TIME
                    : '미퇴근'),
                (emp['WORKING'][index][9] = !i.START_TIME
                  ? '출근미체크'
                  : i.AUTOWORKOFF == '1' && !i.END_TIME
                  ? '퇴근미체크'
                  : moment.duration(i.START_TIME).as('milliseconds') >
                    moment.duration(i.END_TIME).as('milliseconds')
                  ? Number(
                      moment(i.END_TIME, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.START_TIME, 'kk:mm')),
                    )
                  : Number(
                      moment(i.END_TIME, 'kk:mm').diff(
                        moment(i.START_TIME, 'kk:mm'),
                      ),
                    )))
              : ((emp['WORKING'][index][10] = !i.UPDATED_START
                  ? '미출근'
                  : i.UPDATED_START),
                (emp['WORKING'][index][11] =
                  i.UPDATED_START && i.AUTOWORKOFF == '1' && !i.UPDATED_END
                    ? '퇴근미체크'
                    : i.UPDATED_END
                    ? i.UPDATED_END
                    : '미퇴근'),
                (emp['WORKING'][index][9] = !i.UPDATED_START
                  ? '출근미체크'
                  : i.AUTOWORKOFF == '1' && !i.UPDATED_END
                  ? '퇴근미체크'
                  : moment.duration(i.UPDATED_START).as('milliseconds') >
                    moment.duration(i.UPDATED_END).as('milliseconds')
                  ? Number(
                      moment(i.UPDATED_END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.UPDATED_START, 'kk:mm')),
                    )
                  : Number(
                      moment(i.UPDATED_END, 'kk:mm').diff(
                        moment(i.UPDATED_START, 'kk:mm'),
                      ),
                    )));

            i.CHANGE_START && i.CHANGE_END
              ? moment.duration(i.CHANGE_START).as('milliseconds') >
                moment.duration(i.CHANGE_END).as('milliseconds')
                ? i?.VACATION === '1' && i?.VACATION_PAID === '1'
                  ? ((emp['WORKING'][index][0] = -1),
                    (emp['WORKING'][index][7] = true),
                    (emp['WORKING'][index][8] = Number(
                      moment(i.CHANGE_END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.CHANGE_START, 'kk:mm')),
                    )),
                    (emp['TOTAL_VACATION_TIME'] =
                      emp['TOTAL_VACATION_TIME'] +
                      Number(
                        moment(i.CHANGE_END, 'kk:mm')
                          .add(1, 'days')
                          .diff(moment(i.CHANGE_START, 'kk:mm')),
                      )))
                  : i?.VACATION === '1' && i?.VACATION_PAID === '0'
                  ? (emp['WORKING'][index][0] = -1)
                  : ((emp['WORKING'][index][1] = i.CHANGE_START),
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
                : i?.VACATION === '1' && i?.VACATION_PAID === '1'
                ? ((emp['WORKING'][index][0] = -1),
                  (emp['WORKING'][index][7] = true),
                  (emp['WORKING'][index][8] = Number(
                    moment(i.CHANGE_END, 'kk:mm').diff(
                      moment(i.CHANGE_START, 'kk:mm'),
                    ),
                  )),
                  (emp['TOTAL_VACATION_TIME'] =
                    emp['TOTAL_VACATION_TIME'] +
                    Number(
                      moment(i.CHANGE_END, 'kk:mm').diff(
                        moment(i.CHANGE_START, 'kk:mm'),
                      ),
                    )))
                : i?.VACATION === '1' && i?.VACATION_PAID === '0'
                ? (emp['WORKING'][index][0] = -1)
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
                ? i?.VACATION === '1' && i?.VACATION_PAID === '1'
                  ? ((emp['WORKING'][index][0] = -1),
                    (emp['WORKING'][index][7] = true),
                    (emp['WORKING'][index][8] = Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.ATTENDANCE_TIME, 'kk:mm')),
                    )),
                    (emp['TOTAL_VACATION_TIME'] =
                      emp['TOTAL_VACATION_TIME'] +
                      Number(
                        moment(i.WORK_OFF_TIME, 'kk:mm')
                          .add(1, 'days')
                          .diff(moment(i.ATTENDANCE_TIME, 'kk:mm')),
                      )))
                  : i?.VACATION === '1' && i?.VACATION_PAID === '0'
                  ? (emp['WORKING'][index][0] = -1)
                  : ((emp['WORKING'][index][1] = i.ATTENDANCE_TIME),
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
                : i?.VACATION === '1' && i?.VACATION_PAID === '1'
                ? ((emp['WORKING'][index][0] = -1),
                  (emp['WORKING'][index][7] = true),
                  (emp['WORKING'][index][8] = Number(
                    moment(i.WORK_OFF_TIME, 'kk:mm').diff(
                      moment(i.ATTENDANCE_TIME, 'kk:mm'),
                    ),
                  )),
                  (emp['TOTAL_VACATION_TIME'] =
                    emp['TOTAL_VACATION_TIME'] +
                    Number(
                      moment(i.WORK_OFF_TIME, 'kk:mm').diff(
                        moment(i.ATTENDANCE_TIME, 'kk:mm'),
                      ),
                    )))
                : i?.VACATION === '1' && i?.VACATION_PAID === '0'
                ? (emp['WORKING'][index][0] = -1)
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
              ? i?.VACATION === '1' && i?.VACATION_PAID === '1'
                ? ((emp['WORKING'][index][0] = -1),
                  (emp['WORKING'][index][7] = true),
                  (emp['WORKING'][index][8] = Number(
                    moment(i.END, 'kk:mm')
                      .add(1, 'days')
                      .diff(moment(i.START, 'kk:mm')),
                  )),
                  (emp['TOTAL_VACATION_TIME'] =
                    emp['TOTAL_VACATION_TIME'] +
                    Number(
                      moment(i.END, 'kk:mm')
                        .add(1, 'days')
                        .diff(moment(i.START, 'kk:mm')),
                    )))
                : i?.VACATION === '1' && i?.VACATION_PAID === '0'
                ? (emp['WORKING'][index][0] = -1)
                : ((emp['WORKING'][index][1] = i.START),
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
                  setTotalWORKING_EMP(
                    (totalWORKING_EMP) => totalWORKING_EMP + 1,
                  ),
                  setTotalWORKING_DAY(
                    (totalWORKING_DAY) => totalWORKING_DAY + 1,
                  ))
              : i?.VACATION === '1' && i?.VACATION_PAID === '1'
              ? ((emp['WORKING'][index][0] = -1),
                (emp['WORKING'][index][7] = true),
                (emp['WORKING'][index][8] = Number(
                  moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm')),
                )),
                (emp['TOTAL_VACATION_TIME'] =
                  emp['TOTAL_VACATION_TIME'] +
                  Number(
                    moment(i.END, 'kk:mm').diff(moment(i.START, 'kk:mm')),
                  )))
              : i?.VACATION === '1' && i?.VACATION_PAID === '0'
              ? (emp['WORKING'][index][0] = -1)
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

      // 조퇴, 지각, 휴가, 결근을 한번이라도 한 직원의 카운트(사용안함)
      setTotalEARLY_EMP(empListTemp?.filter((i) => i.TOTAL_EARLY > 0).length);
      setTotalLATE_EMP(empListTemp?.filter((i) => i.TOTAL_LATE > 0).length);
      setTotalVACATION_EMP(
        empListTemp?.filter((i) => i.TOTAL_VACATION > 0).length,
      );
      setTotalNOWORK_EMP(empListTemp?.filter((i) => i.TOTAL_NOWORK > 0).length);

      // 상위직원3명 & 모달의 직원 순서를 위한 소팅
      const orderByWORKING = [...empListTemp];
      setEMP_LIST(
        orderByWORKING.sort((a, b) => b.TOTAL_WORKING - a.TOTAL_WORKING),
      );

      const orderByEARLY = [...empListTemp];
      setEARLY_EMP_LIST(
        orderByEARLY.sort((a, b) => b.TOTAL_EARLY - a.TOTAL_EARLY),
      );

      const orderByLATE = [...empListTemp];
      setLATE_EMP_LIST(orderByLATE.sort((a, b) => b.TOTAL_LATE - a.TOTAL_LATE));

      const orderByVACATION = [...empListTemp];
      setVACATION_EMP_LIST(
        orderByVACATION.sort((a, b) => b.TOTAL_VACATION - a.TOTAL_VACATION),
      );

      const orderByREST_TIME = [...empListTemp];
      setREST_TIME_EMP_LIST(
        orderByREST_TIME.sort(
          (a, b) => Number(b.REST_TIME) - Number(a.REST_TIME),
        ),
      );

      const orderByNOWORK = [...empListTemp];
      setNOWORK_EMP_LIST(
        orderByNOWORK.sort((a, b) => b.TOTAL_NOWORK - a.TOTAL_NOWORK),
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // 이름으로 직원 검색
  const searchName = (text) => {
    setSearch(text);
    EMP_LIST.forEach(function (item) {
      let dis = Hangul.disassemble(item.EMP_NAME, true);
      let cho = dis.reduce(function (prev, elem: any) {
        elem = elem[0] ? elem[0] : elem;
        return prev + elem;
      }, '');
      item.disassembled = cho;
    });
    let searchText = Hangul.disassemble(text).join(''); // 렭 -> ㄹㅕㄹr
    const result = EMP_LIST.filter(function (item) {
      return (
        item.EMP_NAME.includes(text) || item.disassembled.includes(searchText)
      );
    });
    setResult(result);
  };

  useEffect(() => {
    loading && init(CALENDAR_DATA, toDay);
  }, []);

  return (
    <MonthlyDashBoardScreenPresenter
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
      monthStartDate={monthStartDate}
      monthEndDate={monthEndDate}
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
      gotoTop={gotoTop}
      search={search}
      result={result}
      searchName={searchName}
      toDay={toDay}
      prevMonth={prevMonth}
      nextMonth={nextMonth}
      setSearch={setSearch}
      MANAGER_CALLED={MANAGER_CALLED}
    />
  );
};
