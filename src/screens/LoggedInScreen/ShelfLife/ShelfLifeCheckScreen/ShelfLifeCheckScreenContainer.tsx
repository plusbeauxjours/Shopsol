import React, {useState, useEffect, createRef} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {onScrollEvent, useValue} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import ShelfLifeCheckScreenPresenter from './ShelfLifeCheckScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import styleGuide from '~/constants/styleGuide';
import {setLoadingVisible} from '~/redux/splashSlice';
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
  const navigation = useNavigation();
  const {loading} = useSelector((state: any) => state.splashReducer);
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
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
    {name: 'd-day', color: styleGuide.palette.donutColor, items: []},
    {name: 'd-1', color: styleGuide.palette.donutColor, items: []},
    {name: 'd-7', color: '#ccc', items: []},
    {name: 'd-14', color: '#ccc', items: []},
    {name: 'd-30', color: '#ccc', items: []},
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
  const [search, setSearch] = useState<string>('');
  const [barCodeCameraModalOpen, setBarCodeCameraModalOpen] = useState<boolean>(
    false,
  );
  const [codenumber, setCodenumber] = useState<string>('');
  const [isUpdateToastVisible, setIsUpdateToastVisible] = useState<boolean>(
    false,
  );
  const [isCancelToastVisible, setIsCancelToastVisible] = useState<boolean>(
    false,
  );

  const confirmModal = (name, shelfLife_SEQ, image) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품의 유통기한 만료로 폐기 또는 처리 완료 체크합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => updateShelfLife(name, shelfLife_SEQ),
      image,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelModal = (name, shelfLife_SEQ, image) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품 처리완료를 취소합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => cancelShelfLife(name, shelfLife_SEQ),
      image,
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

  // 처리 취소 토스트
  const cancelToastFn = () => {
    clearTimeout();
    setIsCancelToastVisible(true);
    setTimeout(() => {
      setIsCancelToastVisible(false);
    }, 1000);
  };

  // 처리 토스트
  const updateToastFn = () => {
    clearTimeout();
    setIsUpdateToastVisible(true);
    setTimeout(() => {
      setIsUpdateToastVisible(false);
    }, 1000);
  };

  // 새로고침
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  // 처리 취소 API
  const cancelShelfLife = async (name, shelfLife_SEQ) => {
    try {
      cancelToastFn();
      dispatch(cancelSHELFLIFE({name, shelfLife_SEQ}));
      const {data} = await api.cancelShelfLifeData({shelfLife_SEQ});
      if (data.resultmsg !== '1') {
        alertModal('연결에 실패하였습니다.');
      } else {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 처리 API
  const updateShelfLife = async (name, shelfLife_SEQ) => {
    try {
      updateToastFn();
      dispatch(
        checkSHELFLIFE({
          name,
          shelfLife_SEQ,
          checkEmpName: MEMBER_NAME,
          checkTime: moment().format('YYYY-MM-DD HH:mm'),
        }),
      );
      const {data} = await api.checkShelfLifeData({
        STORE,
        EMP_SEQ,
        MEMBER_SEQ,
        shelfLife_SEQ,
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
      // 데이터 패칭
      const data = await dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
      const day = moment();
      // 오늘로부터 해당 날짜들을 변수로 저장
      const ddayDuration = moment().add(1, 'days');
      const dayDuration = moment().add(2, 'days');
      const weekDuration = moment().add(7, 'days').add(1, 'days');
      const weeksDuration = moment().add(14, 'days').add(1, 'days');
      const monthDuration = moment().add(1, 'months').add(1, 'days');
      if (data) {
        while (monthDuration.diff(day, 'days') > 0) {
          if (ddayDuration.diff(day, 'days') > 0) {
            //오늘
            data[day.format('YYYY-MM-DD')]?.length > 0 &&
              defaultData[0].items.push(...data[day.format('YYYY-MM-DD')]);
          } else if (dayDuration.diff(day, 'days') > 0) {
            //내일
            data[day.format('YYYY-MM-DD')]?.length > 0 &&
              defaultData[1].items.push(...data[day.format('YYYY-MM-DD')]);
          } else if (weekDuration.diff(day, 'days') > 0) {
            //1주일
            data[day.format('YYYY-MM-DD')]?.length > 0 &&
              defaultData[2].items.push(...data[day.format('YYYY-MM-DD')]);
          } else if (weeksDuration.diff(day, 'days') > 0) {
            //이주일
            data[day.format('YYYY-MM-DD')]?.length > 0 &&
              defaultData[3].items.push(...data[day.format('YYYY-MM-DD')]);
          } else {
            data[day.format('YYYY-MM-DD')]?.length > 0 &&
              //1개월
              defaultData[4].items.push(...data[day.format('YYYY-MM-DD')]);
          }
          day.add(1, 'days');
        }
      }
      dispatch(setSHELFLIFE_DATA(defaultData));

      // 해당 날짜들의 카운트
      const ddayCount = defaultData[0].items.length;
      const dayCount =
        defaultData[0].items.length + defaultData[1].items.length;
      const weekCount =
        defaultData[0].items.length +
        defaultData[1].items.length +
        defaultData[2].items.length;
      const weeksCount =
        defaultData[0].items.length +
        defaultData[1].items.length +
        defaultData[2].items.length +
        defaultData[3].items.length;
      const monthCount =
        defaultData[0].items.length +
        defaultData[1].items.length +
        defaultData[2].items.length +
        defaultData[3].items.length +
        defaultData[4].items.length;

        // 해당 날짜들의 카운트에서 처리된 아이템의 갯수 추출 (나중에 처리 비율 렌터)
      const ddayDone = defaultData[0].items.filter((i) => i.checkType === '1')
        .length;
      const dayDone =
        defaultData[1].items.filter((i) => i.checkType === '1').length +
        ddayDone;
      const weekDone =
        defaultData[2].items.filter((i) => i.checkType === '1').length +
        dayDone;
      const weeksDone =
        defaultData[3].items.filter((i) => i.checkType === '1').length +
        weekDone;
      const monthDone =
        defaultData[4].items.filter((i) => i.checkType === '1').length +
        weeksDone;

      setData([
        {
          titleWord: 'd-day',
          backgroundColor: 'white',
          textColor: styleGuide.palette.donutColor,
          totalQTY: ddayCount ?? 0,
          doneQTY: ddayDone,
          percentage: isNaN(ddayDone / ddayCount)
            ? 0
            : Math.ceil((ddayDone / ddayCount) * 100),
        },
        {
          titleWord: 'd-1',
          backgroundColor: 'white',
          textColor: styleGuide.palette.donutColor,
          totalQTY: dayCount ?? 0,
          doneQTY: dayDone,
          percentage: isNaN(dayDone / dayCount)
            ? 0
            : Math.ceil((dayDone / dayCount) * 100),
        },
        {
          titleWord: 'd-7',
          backgroundColor: 'white',
          textColor: styleGuide.palette.lightGreyColor,
          totalQTY: weekCount ?? 0,
          doneQTY: weekDone,
          percentage: isNaN(weekDone / weekCount)
            ? 0
            : Math.ceil((weekDone / weekCount) * 100),
        },
        {
          titleWord: 'd-14',
          backgroundColor: 'white',
          textColor: styleGuide.palette.lightGreyColor,
          totalQTY: weeksCount ?? 0,
          doneQTY: weeksDone,
          percentage: isNaN(weeksDone / weeksCount)
            ? 0
            : Math.ceil((weeksDone / weeksCount) * 100),
        },
        {
          titleWord: 'd-30',
          backgroundColor: 'white',
          textColor: styleGuide.palette.lightGreyColor,
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

  // 오른쪽 하단 등록하기 버튼
  const gotoAdd = () => {
    navigation.navigate('AddShelfLifeScreen', {onRefresh});
  };

  // 앵커된 y값으로 이동
  const gotoCategory = (index) => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.getNode()?.scrollTo({
          y: tabs[index].anchor + 270,
          animated: true,
        });
      }, 100);
    }
  };

  // 헤더 마운트
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

  // 바코드 검색
  const handleBarCodeScanned = async (codenumber) => {
    console.log(codenumber);
    await setBarCodeCameraModalOpen(false);
    setSearch(codenumber);
    setCodenumber(codenumber);
  };

  useEffect(() => {
    dispatch(setLoadingVisible(false));
    fetchData();
  }, []);

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
      gotoAdd={gotoAdd}
      search={search}
      setSearch={setSearch}
      codenumber={codenumber}
      setCodenumber={setCodenumber}
      isCancelToastVisible={isCancelToastVisible}
      isUpdateToastVisible={isUpdateToastVisible}
      barCodeCameraModalOpen={barCodeCameraModalOpen}
      setBarCodeCameraModalOpen={setBarCodeCameraModalOpen}
      handleBarCodeScanned={handleBarCodeScanned}
      loading={loading}
      STORE={STORE}
    />
  );
};
