import React, {useState} from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import CalendarInfoScreenPresenter from './CalendarInfoScreenPresenter';
import {setCALENDAR_DATA} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';

export default () => {
  const vacation = {
    key: 'vacation',
    color: '#325CBE',
    selectedDotColor: '#325CBE',
  };
  const nowork = {key: 'nowork', color: '#B91C1B', selectedDotColor: '#B91C1B'};
  const jigark = {key: 'jigark', color: '#E8B12F', selectedDotColor: '#E8B12F'};

  const dispatch = useDispatch();

  const {STORE} = useSelector((state: any) => state.userReducer);
  const {CALENDAR_DATA} = useSelector((state: any) => state.calendarReducer);
  const {
    STORE_SEQ,
    EMP_SEQ,
    STORE_DATA: {resultdata: {CALENDAR_EDIT = null} = {}} = {},
  } = useSelector((state: any) => state.storeReducer);
  const [markedDates, setMarkedDates] = useState<any>(null);

  // INIT으로 받은 데이터를 가공
  const setMarkFn = (data) => {
    let staticMarked = {};
    let marked = {};

    const iterator = Object.keys(data.result);
    for (const key of iterator) {
      let nowork1 = false;
      let jigark1 = false;
      let vacation1 = false;

      if (STORE == '1' || CALENDAR_EDIT == '1') {
        data.result[key]['EMP_LIST'].map((data) => {
          if (data.nowork == '1') {
            nowork1 = true;
          }
          if (data.jigark == '1') {
            jigark1 = true;
          }
          if (data.alear == '1') {
            jigark1 = true;
          }
          if (data.VACATION == '1') {
            vacation1 = true;
          }
          if (data.TYPE == '3') {
            vacation1 = true;
          }
        });
      } else {
        data.result[key]['EMP_LIST'].map((data) => {
          if (EMP_SEQ == data.EMP_ID) {
            if (data.nowork == '1') {
              nowork1 = true;
            }
            if (data.jigark == '1') {
              jigark1 = true;
            }
            if (data.alear == '1') {
              jigark1 = true;
            }
            if (data.VACATION == '1') {
              vacation1 = true;
            }
            if (data.TYPE == '3') {
              vacation1 = true;
            }
          }
        });
      }
      if (vacation1 !== false && nowork1 !== false && jigark1 !== false) {
        staticMarked[key] = {dots: [vacation, nowork, jigark]};
      } else {
        if (vacation1 !== false) {
          staticMarked[key] = {dots: [vacation]};
        }
        if (nowork1 !== false) {
          staticMarked[key] = {dots: [nowork]};
        }
        if (jigark1 !== false) {
          staticMarked[key] = {dots: [jigark]};
        }
        if (vacation1 !== false && nowork1 !== false) {
          staticMarked[key] = {dots: [vacation, nowork]};
        }
        if (vacation1 !== false && jigark1 !== false) {
          staticMarked[key] = {dots: [vacation, jigark]};
        }
        if (nowork1 !== false && jigark1 !== false) {
          staticMarked[key] = {dots: [nowork, jigark]};
        }
      }
      marked = staticMarked;
    }
    setMarkedDates(Object.assign(marked, markedDates));
  };

  const fetchData = async (date) => {
    try {
      const {data} = await api.getAllSchedules(
        STORE_SEQ,
        moment(date).format('YYYY'),
        moment(date).format('M'),
      );
      if (data.message === 'SUCCESS') {
        let buffer = {};
        const iterator = Object.keys(data.result);
        for (const key of iterator) {
          buffer[key] = data.result[key]['EMP_LIST'];
          if (buffer[key].length !== 0) {
            for (let k = 0; k < buffer[key].length; k++) {
              buffer[key][k] = {...buffer[key][k], WORKDATE: key};
            }
          }
        }
        if (STORE == '0' && CALENDAR_EDIT !== 1) {
          for (const key of iterator) {
            buffer[key] = buffer[key]?.filter((info) => info.EMP_ID == EMP_SEQ);
          }
        }
        dispatch(setCALENDAR_DATA({CALENDAR_DATA: buffer, date}));
        setMarkFn(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 캘린더에서 일이 바뀔 때
  const onDayPressFn = (date) => {
    fetchData(date.dateString);
  };

  // 캘린더에서 달이 바뀔 때
  const onChangeMonth = async (date) => {
    fetchData(date.dateString);
  };

  // useEffect(() => {
  //   fetchData(moment().format('YYYY-MM-DD'));
  // });

  return (
    <CalendarInfoScreenPresenter
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      CALENDAR_EDIT={CALENDAR_EDIT}
      onDayPressFn={onDayPressFn}
      onChangeMonth={onChangeMonth}
      markedDates={markedDates}
      CALENDAR_DATA={CALENDAR_DATA}
    />
  );
};
