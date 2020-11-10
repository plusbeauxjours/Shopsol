import React, {useState, useEffect, createRef} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {onScrollEvent, useValue} from 'react-native-redash';
import Animated from 'react-native-reanimated';

import ShelfLifeCheckScreenPresenter from './ShelfLifeCheckScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {resultdata} from '~/assets/dummy';
import {
  getSHELFLIFE_DATA,
  checkSHELFLIFE,
  cancelSHELFLIFE,
  setSHELFLIFE_DATA,
} from '~/redux/shelflifeSlice';

export default () => {
  const YEAR = moment().format('YYYY');
  const MONTH = moment().format('MM');
  const DAY = moment().format('DD');

  const dispatch = useDispatch();

  const scrollRef = createRef(0);
  const {interpolate, Extrapolate} = Animated;
  const y = useValue(0);

  const opacity = (anchor = 20) => {
    return interpolate(y, {
      // inputRange: [Number(anchor) + 100, Number(anchor) + 200],
      inputRange: [Number(anchor) + 350, Number(anchor) + 450],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  };

  const defaultData = [
    {name: '1일전', color: '#ea1901', items: []},
    {name: '1주전', color: '#aace36', items: []},
    {name: '2주전', color: '#aace36', items: []},
    {name: '1달전', color: '#aace36', items: []},
  ];

  const defaultTabs = defaultData.map(({name, color}) => ({
    name,
    color,
    anchor: 20,
  }));
  const {EMP_SEQ} = useSelector((state: any) => state.storeReducer);
  const {STORE, MEMBER_NAME} = useSelector((state: any) => state.userReducer);
  const {SHELFLIFE_DATA} = useSelector((state: any) => state.shelflifeReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [tabs, setTabs] = useState<any>(defaultTabs);
  const [ready, setReady] = useState<boolean>(false);

  const confirmModal = (name, shelfLife_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품의 유통기한 만료로 폐기 또는 처리 완료 체크합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => updateShelfLife(name, shelfLife_SEQ),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelModal = (name, shelfLife_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품 처리완료를 취소합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => cancelShelfLife(name, shelfLife_SEQ),
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

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const cancelShelfLife = async (name, shelfLife_SEQ) => {
    try {
      alertModal('상품의 처리완료를 취소하였습니다.');
      dispatch(cancelSHELFLIFE({name, shelfLife_SEQ}));
      // const {data} = await api.cancelShelfLifeData({shelfLife_SEQ});
      // if (data.resultmsg !== '1') {
      //   alertModal('연결에 실패하였습니다.');
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const updateShelfLife = async (name, shelfLife_SEQ) => {
    try {
      alertModal('상품의 폐기 또는 처리 완료 하였습니다.');
      dispatch(
        checkSHELFLIFE({
          name,
          shelfLife_SEQ,
          checkEmpName: STORE === '1' ? '점주' : MEMBER_NAME,
          checkTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      );
      // const {data} = await api.checkShelfLifeData({
      //   STORE,
      //   EMP_SEQ,
      //   shelfLife_SEQ,
      // });
      // if (data.resultmsg !== '1') {
      //   alertModal('연결에 실패하였습니다.');
      // }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // dispatch(setSHELFLIFE_DATA([]));

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const data = await dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
      const day = moment();
      const dayDuration = moment().add(2, 'days');
      const weekDuration = moment().add(7, 'days').add(1, 'days');
      const weeksDuration = moment().add(14, 'days').add(1, 'days');
      const monthDuration = moment().add(1, 'months').add(1, 'days');
      while (monthDuration.diff(day, 'days') > 0) {
        if (dayDuration.diff(day, 'days') > 0) {
          resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[0].items.push(...resultdata[day.format('YYYY-MM-DD')]);
        } else if (weekDuration.diff(day, 'days') > 0) {
          resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[1].items.push(...resultdata[day.format('YYYY-MM-DD')]);
        } else if (weeksDuration.diff(day, 'days') > 0) {
          resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[2].items.push(...resultdata[day.format('YYYY-MM-DD')]);
        } else {
          resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
            defaultData[3].items.push(...resultdata[day.format('YYYY-MM-DD')]);
        }
        day.add(1, 'days');
      }
      dispatch(setSHELFLIFE_DATA(defaultData));

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
      const weekDone = defaultData[1].items.filter((i) => i.checkType === '1')
        .length;
      const weeksDone = defaultData[2].items.filter((i) => i.checkType === '1')
        .length;
      const monthDone = defaultData[3].items.filter((i) => i.checkType === '1')
        .length;

      setData([
        {
          titleNumber: '1',
          titleWord: '일전',
          backgroundColor: 'white',
          textColor: '#ea1901',
          radius: 60,
          totalQTY: dayCount ?? 0,
          doneQTY: dayDone,
          percentage: isNaN(dayDone / dayCount)
            ? 0
            : Math.ceil((dayDone / dayCount) * 100),
        },
        {
          titleNumber: '1',
          titleWord: '주전',
          backgroundColor: 'white',
          textColor: '#e6efbf',
          radius: 50,
          totalQTY: weekCount ?? 0,
          doneQTY: weekDone,
          percentage: isNaN(weekDone / weekCount)
            ? 0
            : Math.ceil((weekDone / weekCount) * 100),
        },
        {
          titleNumber: '2',
          titleWord: '주전',
          backgroundColor: 'white',
          textColor: '#cade7e',
          radius: 40,
          totalQTY: weeksCount ?? 0,
          doneQTY: weeksDone,
          percentage: isNaN(weeksDone / weeksCount)
            ? 0
            : Math.ceil((weeksDone / weeksCount) * 100),
        },
        {
          titleNumber: '1',
          titleWord: '달전',
          backgroundColor: 'white',
          textColor: '#aace36',
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

  const gotoCategory = (index) => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.getNode()?.scrollTo({
          y: tabs[index].anchor + 470,
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

  return (
    <ShelfLifeCheckScreenPresenter
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
      SHELFLIFE_DATA={SHELFLIFE_DATA}
      gotoCategory={gotoCategory}
      onMeasurement={onMeasurement}
      ready={ready}
    />
  );
};
