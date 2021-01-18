import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import ChecklistItemsScreenPresenter from './ChecklistItemsScreenPresenter';
import {setCHECKLIST_MARKED, getCHECKLIST_DATA} from '~/redux/checklistSlice';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {CHECKLIST_DATA, CHECKLIST_MARKED} = useSelector(
    (state: any) => state.checklistReducer,
  );
  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {
    EMP_SEQ,
    STORE_SEQ,
    STORE_DATA: {
      check_count: CHECK_COUNT = null,
      resultdata: {CHECK_COUNT: MAX_CHECK_COUNT = null} = {},
    } = {},
  } = useSelector((state: any) => state.storeReducer);

  const intended = {
    key: 'intended',
    color: '#0D4F8A',
    selectedDotColor: '#0D4F8A',
  }; // 체크 예정
  const clear = {key: 'clear', color: '#AACE36', selectedDotColor: '#AACE36'}; // 체크 정상
  const confused = {
    key: 'confused',
    color: '#984B19',
    selectedDotColor: '#984B19',
  }; // 체크 이상

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState<boolean>(
    false,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD') || '');
  const [staticmarkedDates, setStaticmarkedDates] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const onRefresh = () => {
    try {
      setRefreshing(true);
      dispatch(getCHECKLIST_DATA());
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 캘린더에서 월을 이동이도하는 경우 해당 월의 Marking 로드
  const onMonthChange = (date) => {
    markingFn(date.year, date.month, date.day);
    setDate(date.dateString);
  };

  // 점주가 체크리스트 추가하기를 눌렀을 때
  const onPressAddChecklist = () => {
    if (Number(MAX_CHECK_COUNT) <= Number(CHECK_COUNT)) {
      alertModal(
        '체크리스트는 ' + MAX_CHECK_COUNT + '개까지만 등록가능합니다.',
      );
    } else {
      gotoChecklistAdd();
    }
  };

  const gotoChecklistAdd = () => {
    navigation.navigate('ChecklistAddScreen', {type: '등록', DATE: date});
  };

  // 캘린더 마킹 데이터
  const markingFn = async (YEAR, MONTH, DAY) => {
    try {
      const {data} = await api.getChecklistAll(STORE_SEQ, YEAR, MONTH);
      if (data.message === 'SUCCESS') {
        const iterator = Object.keys(data.result);
        const staticmarkedDates = {};
        const markedDates = {};
        let today = new Date();
        for (const key of iterator) {
          staticmarkedDates[key] = '';
          markedDates[key] = '';
          let dots1 = [];
          let status1 = '0';
          let status2 = '0';
          let status3 = '0';

          let keyday = new Date(key);
          if (today.getTime() < keyday.getTime()) {
            continue;
          }
          for (let j = 0; j < data.result[key].length; j++) {
            if (data.result[key][j].EMP_CHECK == '0') {
              status1 = '1'; // 예정
            } else {
              if (data.result[key][j].CHECK_TYPE == '1') {
                status2 = '1'; // 이상
              } else {
                status3 = '1'; // 정상
              }
            }
          }
          if (data.result[key].length !== 0) {
            if (status1 == '1') {
              dots1.push(intended);
            } else if (status2 == '1') {
              dots1.push(confused);
            } else {
              dots1.push(clear);
            }
          }
          staticmarkedDates[key] = {
            dots: dots1,
          };
        }
        MONTH < 10 ? (MONTH = '0' + MONTH) : MONTH;
        DAY < 10 ? (DAY = '0' + DAY) : DAY;
        staticmarkedDates[YEAR + '-' + MONTH + '-' + DAY] = {
          ...staticmarkedDates[YEAR + '-' + MONTH + '-' + DAY],
          selected: true,
          selectedColor: '#ccc',
        };
        setStaticmarkedDates(staticmarkedDates);
        dispatch(setCHECKLIST_MARKED(staticmarkedDates));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // 캘린더에서 날짜를 선택하는 경우 공통업무와 점포업무 로드
  const onDayPress = (date) => {
    let markedDates = staticmarkedDates;
    let iterator = Object.keys(markedDates);
    for (const key of iterator) {
      markedDates[key] = {
        ...markedDates[key],
        selected: false,
      };
    }
    markedDates[date.dateString] = {
      ...markedDates[date.dateString],
      selected: true,
      selectedColor: '#ccc',
    };
    dispatch(getCHECKLIST_DATA(date.dateString));
    setDate(date.dateString);
    setIsCalendarModalVisible(false);
    dispatch(setCHECKLIST_MARKED(markedDates));
  };

  const fetchData = (date) => {
    dispatch(getCHECKLIST_DATA(date));
    markingFn(
      moment(date).format('YYYY'),
      moment(date).format('M'),
      moment(date).format('D'),
    );
  };

  useEffect(() => {
    dispatch(getCHECKLIST_DATA());
    markingFn(
      moment().format('YYYY'),
      moment().format('M'),
      moment().format('D'),
    );
  }, []);

  return (
    <ChecklistItemsScreenPresenter
      EMP_SEQ={EMP_SEQ}
      STORE={STORE}
      date={date}
      setDate={setDate}
      refreshing={refreshing}
      onRefresh={onRefresh}
      markingFn={markingFn}
      isCalendarModalVisible={isCalendarModalVisible}
      setIsCalendarModalVisible={setIsCalendarModalVisible}
      onPressAddChecklist={onPressAddChecklist}
      CHECKLIST_MARKED={CHECKLIST_MARKED}
      onDayPress={(date) => onDayPress(date)}
      onMonthChange={onMonthChange}
      CHECKLIST_DATA={CHECKLIST_DATA}
      fetchData={fetchData}
      loading={loading}
    />
  );
};
