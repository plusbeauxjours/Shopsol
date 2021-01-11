import React, {useState, useEffect, createRef} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {onScrollEvent, useValue} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import TaskCheckScreenPresenter from './TaskCheckScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import styleGuide from '~/constants/styleGuide';
import {
  getTASK_DATA,
  checkTASK,
  cancelTASK,
  setTASK_DATA,
} from '~/redux/taskSlice';

export default () => {
  const YEAR = moment().format('YYYY');
  const MONTH = moment().format('MM');
  const DAY = moment().format('DD');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const scrollRef = createRef(0);
  const {interpolate, Extrapolate} = Animated;
  const y = useValue(0);

  const opacity = (anchor = 20) => {
    return interpolate(y, {
      inputRange: [Number(anchor) + 350, Number(anchor) + 450],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  };

  const defaultData = [
    {name: '1일전', color: styleGuide.palette.secondary, items: []},
    {name: '1주전', color: '#ccc', items: []},
    {name: '2주전', color: '#ccc', items: []},
    {name: '1달전', color: '#ccc', items: []},
  ];

  const defaultTabs = defaultData.map(({name, color}) => ({
    name,
    color,
    anchor: 20,
  }));
  const {EMP_SEQ} = useSelector((state: any) => state.storeReducer);
  const {STORE, MEMBER_NAME} = useSelector((state: any) => state.userReducer);
  const {TASK_DATA} = useSelector((state: any) => state.taskReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [tabs, setTabs] = useState<any>(defaultTabs);
  const [ready, setReady] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [isUpdateToastVisible, setIsUpdateToastVisible] = useState<boolean>(
    false,
  );
  const [isCancelToastVisible, setIsCancelToastVisible] = useState<boolean>(
    false,
  );

  const confirmModal = (name, task_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '업무처리를 완료합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => updateTask(name, task_SEQ),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelModal = (name, task_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '업무처리 완료를 취소합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => cancelTask(name, task_SEQ),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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

  const cancelToastFn = () => {
    clearTimeout();
    setIsCancelToastVisible(true);
    setTimeout(() => {
      setIsCancelToastVisible(false);
    }, 1000);
  };

  const updateToastFn = () => {
    clearTimeout();
    setIsUpdateToastVisible(true);
    setTimeout(() => {
      setIsUpdateToastVisible(false);
    }, 1000);
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      dispatch(getTASK_DATA(YEAR, MONTH, DAY));
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const cancelTask = async (name, task_SEQ) => {
    try {
      cancelToastFn();
      dispatch(cancelTASK({name, task_SEQ}));
      const {data} = await api.cancelTaskData({task_SEQ});
      if (data.resultmsg !== '1') {
        alertModal('연결에 실패하였습니다.');
      } else {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = async (name, task_SEQ) => {
    try {
      updateToastFn();
      dispatch(
        checkTASK({
          name,
          task_SEQ,
          checkEmpName: STORE === '1' ? '점주' : MEMBER_NAME,
          checkTime: moment().format('YYYY-MM-DD HH:mm'),
        }),
      );
      const {data} = await api.checkTaskData({
        STORE,
        EMP_SEQ,
        task_SEQ,
      });
      if (data.resultmsg !== '1') {
        alertModal('연결에 실패하였습니다.');
      } else {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const data = await dispatch(getTASK_DATA(YEAR, MONTH, DAY));
      const day = moment();
      const dayDuration = moment().add(2, 'days');
      const weekDuration = moment().add(7, 'days').add(1, 'days');
      const weeksDuration = moment().add(14, 'days').add(1, 'days');
      const monthDuration = moment().add(1, 'months').add(1, 'days');
      while (monthDuration.diff(day, 'days') > 0) {
        if (dayDuration.diff(day, 'days') > 0) {
          data[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[0].items.push(...data[day.format('YYYY-MM-DD')]);
        } else if (weekDuration.diff(day, 'days') > 0) {
          data[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[1].items.push(...data[day.format('YYYY-MM-DD')]);
        } else if (weeksDuration.diff(day, 'days') > 0) {
          data[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[2].items.push(...data[day.format('YYYY-MM-DD')]);
        } else {
          data[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[3].items.push(...data[day.format('YYYY-MM-DD')]);
        }
        day.add(1, 'days');
      }
      dispatch(setTASK_DATA(defaultData));

      const dayCount = defaultData[0].items.length;
      const weekCount =
        defaultData[0].items.length + defaultData[1].items.length;
      const weeksCount =
        defaultData[0].items.length +
        defaultData[1].items.length +
        defaultData[2].items.length;
      const monthCount =
        defaultData[0].items.length +
        defaultData[1].items.length +
        defaultData[2].items.length +
        defaultData[3].items.length;

      const dayDone = defaultData[0].items.filter((i) => i.checkType === '1')
        .length;
      const weekDone =
        defaultData[1].items.filter((i) => i.checkType === '1').length +
        dayDone;
      const weeksDone =
        defaultData[2].items.filter((i) => i.checkType === '1').length +
        weekDone;
      const monthDone =
        defaultData[3].items.filter((i) => i.checkType === '1').length +
        weeksDone;

      setData([
        {
          titleWord: '1일전',
          backgroundColor: 'white',
          textColor: styleGuide.palette.secondary,
          radius: 60,
          totalQTY: dayCount ?? 0,
          doneQTY: dayDone,
          percentage: isNaN(dayDone / dayCount)
            ? 0
            : Math.ceil((dayDone / dayCount) * 100),
        },
        {
          titleWord: '1주전',
          backgroundColor: 'white',
          textColor: styleGuide.palette.greyColor,
          radius: 50,
          totalQTY: weekCount ?? 0,
          doneQTY: weekDone,
          percentage: isNaN(weekDone / weekCount)
            ? 0
            : Math.ceil((weekDone / weekCount) * 100),
        },
        {
          titleWord: '2주전',
          backgroundColor: 'white',
          textColor: styleGuide.palette.greyColor,
          radius: 40,
          totalQTY: weeksCount ?? 0,
          doneQTY: weeksDone,
          percentage: isNaN(weeksDone / weeksCount)
            ? 0
            : Math.ceil((weeksDone / weeksCount) * 100),
        },
        {
          titleWord: '1달전',
          backgroundColor: 'white',
          textColor: styleGuide.palette.greyColor,
          radius: 30,
          totalQTY: monthCount ?? 0,
          doneQTY: monthDone ?? 0,
          percentage: isNaN(monthDone / monthCount)
            ? 0
            : Math.ceil((monthDone / monthCount) * 100),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const gotoAdd = () => {
    navigation.navigate('AddTaskScreen', {fetchData});
  };

  const gotoCategory = (index) => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.getNode()?.scrollTo({
          y: tabs[index].anchor + 350,
          animated: true,
        });
      }, 100);
    }
  };

  const onMeasurement = (index, tab) => {
    setTimeout(() => {
      tabs[index] = tab;
      setTabs([...tabs]);
    }, 5000);
    if (index === 3) {
      setReady(true);
    }
  };

  const onScroll = onScrollEvent({y});

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TaskCheckScreenPresenter
      onRefresh={onRefresh}
      confirmModal={confirmModal}
      cancelModal={cancelModal}
      data={data}
      refreshing={refreshing}
      tabs={tabs}
      scrollRef={scrollRef}
      onScroll={onScroll}
      opacity={opacity}
      y={y}
      TASK_DATA={TASK_DATA}
      gotoCategory={gotoCategory}
      onMeasurement={onMeasurement}
      ready={ready}
      gotoAdd={gotoAdd}
      fetchData={fetchData}
      search={search}
      setSearch={setSearch}
      isCancelToastVisible={isCancelToastVisible}
      isUpdateToastVisible={isUpdateToastVisible}
    />
  );
};