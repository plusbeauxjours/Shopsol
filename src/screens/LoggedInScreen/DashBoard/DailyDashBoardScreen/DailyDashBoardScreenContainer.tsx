import React, {createRef, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import * as Hangul from 'hangul-js';
import api from '~/constants/LoggedInApi';
import {setCALENDAR_DATA} from '~/redux/calendarSlice';
import styleGuide from '~/constants/styleGuide';

import DailyDashBoardScreenPresenter from './DailyDashBoardScreenPresenter';

export default () => {
  const screenScrollRef = createRef(0);
  const cardScrollRef = createRef(0);
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
  const [loading, setLoading] = useState<boolean>(true);
  const [EMP_LIST, setEMP_LIST] = useState<any>([]);
  const [TIME_EMP_LIST, setTIME_EMP_LIST] = useState<any>([]);
  const [totalEARLY, setTotalEARLY] = useState<number>(0);
  const [EARLY_EMP_LIST, setEARLY_EMP_LIST] = useState<any>([]);
  const [totalLATE, setTotalLATE] = useState<number>(0);
  const [LATE_EMP_LIST, setLATE_EMP_LIST] = useState<any>([]);
  const [totalREST_TIME, setTotalREST_TIME] = useState<number>(0);
  const [REST_TIME_EMP_LIST, setREST_TIME_EMP_LIST] = useState<any>([]);
  const [totalVACATION, setTotalVACATION] = useState<number>(0);
  const [VACATION_EMP_LIST, setVACATION_EMP_LIST] = useState<any>([]);
  const [totalNOWORK, setTotalNOWORK] = useState<number>(0);
  const [NOWORK_EMP_LIST, setNOWORK_EMP_LIST] = useState<any>([]);
  const [totalWORKING, setTotalWORKING] = useState<number>(0);
  const [totlaWORKING_EMP, setTotalWORKING_EMP] = useState<number>(0);
  const [modalEARLY, setModalEARLY] = useState<boolean>(false);
  const [modalLATE, setModalLATE] = useState<boolean>(false);
  const [modalREST_TIME, setModalREST_TIME] = useState<boolean>(false);
  const [modalVACATION, setModalVACATION] = useState<boolean>(false);
  const [modalNOWORK, setModalNOWORK] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [indexTime, setIndexTime] = useState<number>(20000);
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<any>([]);
  const [toDay, setToDay] = useState<any>(moment().format('YYYY-MM-DD'));

  const onPressSection = () => {
    return screenScrollRef.current?.getNode()?.scrollToEnd({animated: true});
  };

  const gotoSelectedIndex = (index) => {
    return cardScrollRef.current
      ?.getNode()
      ?.scrollTo({x: index * 220, animated: false});
  };

  const gotoSelectedCard = (index) => {
    return scrollRef.current?.getNode()?.scrollTo({y: index * 60 + 190});
  };

  const gotoTop = () => {
    return screenScrollRef.current?.getNode()?.scrollTo({y: 0, animated: true});
  };

  const onScroll = (e) => {
    const {
      nativeEvent: {
        contentOffset: {x},
      },
    } = e;
    const position = Math.abs(Math.round(x / 220));
    // setSelectedIndex(position);
    scrollRef.current?.getNode()?.scrollTo({y: position * 60});
  };

  const prevDay = () => {
    setSelectedIndex(0);
    setToDay(moment(toDay).subtract(1, 'days').format('YYYY-MM-DD'));
    fetchSchedulesData(moment(toDay).subtract(1, 'days').format('YYYY-MM-DD'));
  };

  const nextDay = () => {
    setSelectedIndex(0);
    setToDay(moment(toDay).add(1, 'days').format('YYYY-MM-DD'));
    fetchSchedulesData(moment(toDay).add(1, 'days').format('YYYY-MM-DD'));
  };

  const fetchSchedulesData = async (date) => {
    try {
      setLoading(true);
      setTotalEARLY(0);
      setTotalLATE(0);
      setTotalREST_TIME(0);
      setTotalVACATION(0);
      setTotalNOWORK(0);
      setTotalWORKING(0);
      setTotalWORKING_EMP(0);
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
    try {
      let empListTemp = [];
      EMPLOYEE_LIST?.workinglist?.map((i, index) => {
        empListTemp.push({
          key: `item-${index}`,
          EMP_SEQ: i.EMP_SEQ,
          EMP_NAME: i.EMP_NAME,
          IS_MANAGER: i.IS_MANAGER,
          name: i.EMP_NAME,
          legendFontColor: styleGuide.palette.greyColor,
          legendfontSize: styleGuide.fontSize.middle,
          WORKING: 0,
          IMAGE: i?.images[0]?.IMAGE || '',
        });
      });

      CALENDAR_DATA[date]?.map((i) => {
        let emp = empListTemp?.find((j) => j.EMP_SEQ == i.EMP_ID);
        if (emp) {
          emp['IMAGE'] = i?.IMAGE;
          emp['EARLY'] = i?.alear ?? '0';
          emp['LATE'] = i?.jigark ?? '0';
          emp['REST_TIME'] = i?.REST_TIME;
          emp['VACATION'] = i?.VACATION === '1' ? true : false;
          emp['VACATION_PAID'] = i?.VACATION_PAID === '1' ? true : false;
          emp['NOWORK'] = i.nowork ?? '0';

          setTotalEARLY((totalEARLY) => totalEARLY + (i.alear === '1' ? 1 : 0));
          setTotalLATE((totalLATE) => totalLATE + (i.jigark === '1' ? 1 : 0));
          setTotalREST_TIME(
            (totalREST_TIME) => totalREST_TIME + Number(i.REST_TIME),
          );
          setTotalVACATION(
            (totalVACATION) => totalVACATION + (i.VACATION ? 1 : 0),
          );
          setTotalNOWORK(
            (totalNOWORK) => totalNOWORK + (i.nowork == '1' ? 1 : 0),
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

      const orderByWORKING = [...empListTemp];
      setEMP_LIST(
        orderByWORKING.sort(
          (a, b) => b.WORKING.toString() - a.WORKING.toString(),
        ),
      );

      const orderBySTART_TIME = [...empListTemp];
      setTIME_EMP_LIST(
        orderBySTART_TIME.sort(
          (a, b) =>
            (b.START_TIME != null) - (a.START_TIME != null) ||
            !b.VACATION - !a.VACATION ||
            b.VACATION_PAID - a.VACATION_PAID ||
            moment(date).diff(
              moment.duration(b.START_TIME).as('milliseconds'),
            ) -
              moment(date).diff(
                moment.duration(a.START_TIME).as('milliseconds'),
              ),
        ),
      );

      const orderByEARLY = [...empListTemp];
      setEARLY_EMP_LIST(orderByEARLY.sort((a, b) => b.EARLY - a.EARLY));

      const orderByLATE = [...empListTemp];
      setLATE_EMP_LIST(orderByLATE.sort((a, b) => b.LATE - a.LATE));

      const orderByREST_TIME = [...empListTemp];
      setREST_TIME_EMP_LIST(
        orderByREST_TIME.sort((a, b) => b.REST_TIME - a.REST_TIME),
      );

      const orderByVACATION = [...empListTemp];
      setVACATION_EMP_LIST(
        orderByVACATION.sort((a, b) => b.VACATION - a.VACATION),
      );

      const orderByNOWORK = [...empListTemp];
      setNOWORK_EMP_LIST(orderByNOWORK.sort((a, b) => b.NOWORK - a.NOWORK));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const searchName = (text) => {
    setSearch(text);
    screenScrollRef.current?.getNode()?.scrollTo({y: 0, animated: false});
    TIME_EMP_LIST.forEach(function (item) {
      let dis = Hangul.disassemble(item.EMP_NAME, true);
      let cho = dis.reduce(function (prev, elem: any) {
        elem = elem[0] ? elem[0] : elem;
        return prev + elem;
      }, '');
      item.disassembled = cho;
    });
    let searchText = Hangul.disassemble(text).join(''); // 렭 -> ㄹㅕㄹr
    const result = TIME_EMP_LIST.filter(function (item) {
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
    <DailyDashBoardScreenPresenter
      EMP_LIST={EMP_LIST}
      TIME_EMP_LIST={TIME_EMP_LIST}
      totalEARLY={totalEARLY}
      EARLY_EMP_LIST={EARLY_EMP_LIST}
      totalLATE={totalLATE}
      LATE_EMP_LIST={LATE_EMP_LIST}
      totalREST_TIME={totalREST_TIME}
      REST_TIME_EMP_LIST={REST_TIME_EMP_LIST}
      totalVACATION={totalVACATION}
      VACATION_EMP_LIST={VACATION_EMP_LIST}
      totalNOWORK={totalNOWORK}
      NOWORK_EMP_LIST={NOWORK_EMP_LIST}
      totalWORKING={totalWORKING}
      totlaWORKING_EMP={totlaWORKING_EMP}
      toDay={toDay}
      loading={loading}
      STORE_NAME={STORE_NAME}
      screenScrollRef={screenScrollRef}
      cardScrollRef={cardScrollRef}
      onPressSection={onPressSection}
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
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      onScroll={onScroll}
      gotoSelectedIndex={gotoSelectedIndex}
      indexTime={indexTime}
      setIndexTime={setIndexTime}
      scrollRef={scrollRef}
      gotoSelectedCard={gotoSelectedCard}
      gotoTop={gotoTop}
      search={search}
      result={result}
      searchName={searchName}
      prevDay={prevDay}
      nextDay={nextDay}
      setSearch={setSearch}
      MANAGER_CALLED={MANAGER_CALLED}
    />
  );
};
