import React, {useEffect, useState, useRef} from 'react';
import {Linking, BackHandler, NativeModules, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import HomeScreenPresenter from './HomeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {updateQR_Num, resetSTORE_DATA} from '~/redux/storeSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {getStore} from '~/redux/storeSlice';
import {resetCALENDAR_DATA} from '~/redux/calendarSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({route: {params}}) => {
  const mapRef = useRef(null);
  const animationRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SharedStorage = NativeModules.SharedStorage;
  const {
    STORE_SEQ,
    STORE,
    STORE_NAME,
    WORKING_COUNT,
    TOTAL_COUNT,
    GPS,
    QR_Num,
  } = params;
  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);
  const {
    AVATAR,
    MEMBER_SEQ,
    MEMBER_NAME,
    DEVICE_PLATFORM,
    GENDER,
  } = useSelector((state: any) => state.userReducer);
  const [isGpsVisible, setIsGpsVisible] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [isWorkingMode, setIsWorkingMode] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const [failModalOpen, setFailModalOpen] = useState<boolean>(false);
  const [actionTYPE, setActionTYPE] = useState<string>('출근');
  const [workingTYPE, setWorkingTYPE] = useState<string>('QR');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);

  const [checkWorkingLoading, setCheckWorkingLoading] = useState<boolean>(
    false,
  );
  const [workingLoading, setWorkingLoading] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState<boolean>(
    STORE_SEQ != STORE_DATA?.resultdata?.STORE_SEQ ? true : false,
  );

  const [resultCode, setResultCode] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultCode2, setResultCode2] = useState<string>('');
  const [resultMessage2, setResultMessage2] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [qrCameraModalOpen1, setQrCameraModalOpen1] = useState<boolean>(false);
  const [showPictureModalOpen, setShowPictureModalOpen] = useState<boolean>(
    false,
  );
  const [banner1D, setBanner1D] = useState<number>(null);
  const [banner2D, setBanner2D] = useState<number>(null);
  const [customMenuIndex, setCustomMenuIndex] = useState<any>([]);
  const [isModalToastVisible, setIsModalToastVisible] = useState<boolean>(
    false,
  );

  //0208 REMOVEQR
  // const [qrConfirmLoading, setQrConfirmLoading] = useState<boolean>(false);
  // const [qrCameraModalOpen2, setQrCameraModalOpen2] = useState<boolean>(false);
  // const [qrCameraMode, setQrCameraMode] = useState<boolean>(false);
  // const [hasConfirmed, setHasConfirmed] = useState<boolean>(
  //   params?.hasConfirmed == '1',
  // );

  // const [
  //   qrCameraConfirmModalOpen,
  //   setQrCameraConfirmModalOpen,
  // ] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const customMenu = [
    {
      selection: '체크리스트',
      paging: 'ChecklistItemsScreen',
      count: STORE_DATA?.checklength || 0,
      source: require(`../../../../assets/main/ChecklistItems.png`),
    },
    {
      selection: '업무일지',
      paging: 'ChecklistShareMainScreen',
      source: require(`../../../../assets/main/ChecklistShareMain.png`),
    },
    {
      selection: '유통기한',
      paging: 'ShelfLifeCheckScreen',
      count: null,
      source: require(`../../../../assets/main/ShelfLifeCheck.png`),
    },
    {
      selection: '업무캘린더',
      paging: 'TaskCheckScreen',
      count: null,
      source: require(`../../../../assets/main/TaskCalendar.png`),
    },
    {
      selection: '조기경보',
      paging: 'HealthCertificateTypeScreen',
      count: null,
      source: require(`../../../../assets/main/HealthCertificateType.png`),
    },
  ];

  const employeesMenu = [
    {
      selection: '캘린더',
      paging: 'CalendarInfoScreen',
      count: null,
      source:
        STORE_DATA?.CalendarEdit == 1
          ? require(`../../../../assets/main/CalendarInfo.png`)
          : require(`../../../../assets/main/CalendarInfoEmp.png`),
    },
    {
      selection: '직원정보',
      paging: 'EmployeeInfoEMPScreen',
      count: null,
      source: require(`../../../../assets/main/EmployeeInfoEmp.png`),
    },
    {
      selection: '급여정보',
      paging: 'EmpPayInfoScreen',
      count: null,
      source: require(`../../../../assets/main/PaymentInfo.png`),
    },
    ...customMenu.filter((_, index) => customMenuIndex?.includes(index)),
  ];

  const addCUSTOM_MENU_EMP_Fn = (CUSTOM_MENU_EMP) => {
    setCustomMenuIndex([...customMenuIndex, CUSTOM_MENU_EMP]);
  };

  const removeCUSTOM_MENU_EMP_Fn = (CUSTOM_MENU_EMP) => {
    setCustomMenuIndex(customMenuIndex?.filter((i) => i !== CUSTOM_MENU_EMP));
  };

  const alertModal = (title, text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      title,
      content: text,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const modalToastFn = () => {
    clearTimeout();
    setIsModalToastVisible(true);
    setTimeout(() => {
      setIsModalToastVisible(false);
    }, 1000);
  };

  // 출근하기
  const goWorkFn = async (TYPE) => {
    if (lat === 0 && long === 0) {
      modalToastFn();
    } else {
      setActionTYPE('출근');
      try {
        setWorkingLoading(true);
        await utils.handleLocationPermission(setLat, setLong);
        const {data} = await api.attendanceWork({
          STORE_ID: STORE_SEQ,
          LAT: lat,
          LONG: long,
          // LAT: Number(STORE_DATA.resultdata.LAT) + 0.002,
          // LONG: Number(STORE_DATA.resultdata.LONG) + 0.002,
          MEMBER_SEQ,
          TYPE,
        });

        if (data.message === 'CONTRACT_END') {
          setErrorMessage('해당 사업장 QR코드가 아닙니다.');
          setFailModalOpen(true);
        } else if (data.message === 'WORK_ON_SUCCESS') {
          setSucessModalOpen(true);
          setResultCode(data.resultCode);
          setResultMessage(data.resultMessage);
          setResultCode2(data.resultCode2);
          setResultMessage2(data.resultMessage2);
        } else if (data.message === 'SCHEDULE_EMPTY') {
          setErrorMessage('오늘은 근무일이 아닙니다.');
          setFailModalOpen(true);
        } else if (data.message === 'SCHEDULE_EXIST') {
          setErrorMessage('이미 출근처리를 완료했습니다.');
          setFailModalOpen(true);
        } else if (data.message === 'ALREADY_SUCCESS') {
          setErrorMessage('이미 출근처리를 완료했습니다.');
          setFailModalOpen(true);
        } else if (data.message === 'FAR_STORE') {
          setErrorMessage('사업장 도착 후 출근을 진행해주세요.');
          setFailModalOpen(true);
        } else if (data.message === 'FAIL') {
          setFailModalOpen(true);
        } else {
          setFailModalOpen(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setWorkingLoading(false);
      }
    }
  };

  // 퇴근하기
  const leaveWorkFn = async (TYPE) => {
    if (lat === 0 && long === 0) {
      modalToastFn();
    } else {
      setActionTYPE('퇴근');
      try {
        setWorkingLoading(true);
        await utils.handleLocationPermission(setLat, setLong);
        const {data} = await api.attendanceOffWork({
          STORE_ID: STORE_SEQ,
          LAT: lat,
          LONG: long,
          // LAT: Number(STORE_DATA.resultdata.LAT) + 0.002,
          // LONG: Number(STORE_DATA.resultdata.LONG) + 0.002,
          MEMBER_SEQ,
          TYPE,
        });
        if (data.message == 'CONTRACT_END') {
          setErrorMessage('해당 사업장 QR코드가 아닙니다');
          setFailModalOpen(true);
        } else if (data.message == 'SCHEDULE_EMPTY') {
          setErrorMessage('일하는 시간이 아닙니다.');
          setFailModalOpen(true);
        } else if (data.message == 'ALREADY_SUCCESS') {
          setErrorMessage('이미 퇴근하였습니다.');
          setFailModalOpen(true);
        } else if (data.message == 'WORK_OFF_SUCCESS') {
          setSucessModalOpen(true);
        } else if (data.message == 'NOWORK') {
          setErrorMessage('출근기록이 없습니다.');
          setFailModalOpen(true);
        } else if (data.message === 'FAR_STORE') {
          setErrorMessage('사업장 도착 후 퇴근을 진행해주세요.');
          setFailModalOpen(true);
        } else if (data.message == 'FAIL') {
          setFailModalOpen(true);
        } else {
          setFailModalOpen(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setWorkingLoading(false);
      }
    }
  };

  // VERSION
  const checkVersion = async () => {
    try {
      const {data} = await api.checkApp({
        appinfoversion: utils.appVersion,
        Dplatform: DEVICE_PLATFORM,
      });
      if (data.result == '1') {
        alertModal(
          '[ 업데이트 알림 ]',
          '새로운 버전이 출시되었습니다. 업데이트를 진행해주세요.\n\n* 이동 후 업데이트 버튼이 없는 경우에는 앱스토어 종료 후 다시 실행해 주세요.',
          () => {
            exitandroid();
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // EXIT
  const exitandroid = () => {
    dispatch(setAlertVisible(false));
    if (utils.isAndroid()) {
      BackHandler.exitApp();
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.wesop.appshopsol',
      );
    } else {
      Linking.openURL(
        'https://itunes.apple.com/kr/app/샵솔/id1408364175?l=ko&ls=1&mt=8',
      );
    }
  };

  const setCustomMenu = async () => {
    try {
      const {data} = await api.setCustomMenu({
        STORE_SEQ,
        item: customMenuIndex,
      });
      if (data.message !== 'SUCCESS') {
        alertModal('', '서버 접속이 원할하지 않습니다.');
      }
    } catch (e) {
      alertModal('', '서버 접속이 원할하지 않습니다.');
    }
  };

  const fetchData = async () => {
    try {
      setWorkingModalOpen(false);
      setCheckWorkingLoading(true);
      const {data} = await api.getStoreInfo({
        STORE,
        MEMBER_SEQ,
        STORE_SEQ,
      });
      if (!data?.WORKFLAG && STORE === '0') {
        gotoSelectStoreFn();
      } else if (data.resultmsg === '1') {
        setCustomMenuIndex(data?.menu);
        dispatch(getStore(data));
        Image.getSize(
          data?.eventImage1,
          (width, height) => {
            setBanner1D(height / width);
          },
          (error) => {
            console.log('Image.getSize failed with error: ', error);
          },
        );
        Image.getSize(
          data?.boardImage1,
          (width, height) => {
            setBanner2D(height / width);
          },
          (error) => {
            console.log('Image.getSize failed with error: ', error);
          },
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCheckWorkingLoading(false);
      setInitLoading(false);
    }
  };

  const getDistance = () => {
    const R = 6371e3; // metres
    const lat1 = Number(STORE_DATA?.resultdata?.LAT);
    const lon1 = Number(STORE_DATA?.resultdata?.LONG);
    // const lat1 = Number(STORE_DATA.resultdata.LAT) + 0.002;
    // const lon1 = Number(STORE_DATA.resultdata.LONG) + 0.002;
    const lat2 = lat;
    const lon2 = long;

    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const gotoSelectStoreFn = () => {
    dispatch(resetCALENDAR_DATA());
    dispatch(resetSTORE_DATA());
    navigation.reset({
      index: 0,
      routes: [{name: 'SelectStoreScreen'}],
    });
  };

  const gotoScreen = (paging) => {
    navigation.navigate(`${paging}`);
    setEditMode(false);
  };

  const gotoWork = () => {
    setIsGpsVisible(false);
    setTimeout(() => {
      setWorkingModalOpen(true);
    }, 600);
  };

  const moveMap = () => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(lat.toString()),
          longitude: parseFloat(long.toString()),
        },
      },
      {duration: 1000},
    );
  };

  // // QR 처음 등록하기  //0208 REMOVEQR
  // const confirmModal = () => {
  //   const params = {
  //     alertType: 'confirm',
  //     title: '',
  //     content: '0208 REMOVEQR?',
  //     cancelButtonText: '취소',
  //     okButtonText: '확인',
  //     okCallback: async () => {
  //       setHasConfirmed(true);
  //       const {data} = await api.confirmQR({STORE_SEQ});
  //       utils.handleCameraPermission(setQrCameraModalOpen2);
  //     },
  //   };
  //   dispatch(setAlertInfo(params));
  //   dispatch(setAlertVisible(true));
  // };

  // 출퇴근QR 스캔
  const handleBarCodeScanned1 = (codenumber) => {
    console.log(codenumber);
    if (!codenumber || STORE_SEQ != codenumber) {
      setQrCameraModalOpen1(false);
      setTimeout(() => {
        alertModal('', '해당 사업장 QR코드가 아닙니다');
      }, 500);
    } else {
      setIsWorkingMode(true);
    }
  };

  // // 사업장QR 스캔 //0208 REMOVEQR
  // const handleBarCodeScanned2 = async (codenumber) => {
  //   await setQrCameraModalOpen2(false);
  //   if (/^wes/.test(codenumber)) {
  //     try {
  //       const {data} = await api.insertQR(STORE_SEQ, codenumber);
  //       if (data.message !== 'SUCCESS') {
  //         setTimeout(() => {
  //           alertModal('', '연결에 실패하였습니다.');
  //         }, 500);
  //       } else {
  //         setTimeout(() => {
  //           alertModal('', 'QR코드를 등록하였습니다.');
  //         }, 500);
  //         dispatch(updateQR_Num(codenumber));
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setQrCameraModalOpen2(false);
  //       setShowPictureModalOpen(false);
  //       setQrCameraMode(false);
  //     }
  //   } else {
  //     setTimeout(() => {
  //       alertModal('', '샵솔에서 제공한 QR코드가 아닙니다.');
  //     }, 500);
  //   }
  // };
  const setAsyncStorage = async () => {
    AsyncStorage.setItem('STORE', STORE);
    AsyncStorage.setItem('STORE_SEQ', STORE_SEQ.toString());
    AsyncStorage.setItem('MEMBER_SEQ', MEMBER_SEQ);
  };

  useEffect(() => {
    // if (utils.isAndroid()) {
    //   STORE === '1'
    //     ? SharedStorage.set(
    //         JSON.stringify({
    //           WIDGET_TEXT: `${STORE_NAME}입니다. ${TOTAL_COUNT}명 중 ${WORKING_COUNT}명 근무중 입니다.`,
    //           WIDGET_STORE: STORE,
    //           WIDGET_STATUS: '2',
    //         }),
    //       )
    //     : SharedStorage.set(
    //         JSON.stringify({
    //           WIDGET_TEXT: `${STORE_NAME}입니다. 탭하하여 출근하세요.`,
    //           WIDGET_STORE: STORE,
    //           WIDGET_STATUS: '2',
    //         }),
    //       );
    // }
    setIsGpsVisible(false);
    fetchData();
    checkVersion();
    setAsyncStorage();
  }, []);

  useEffect(
    () => () => {
      clearTimeout();
    },
    [],
  );

  return (
    <HomeScreenPresenter
      STORE_DATA={STORE_DATA}
      MEMBER_NAME={MEMBER_NAME}
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      STORE_NAME={STORE_NAME}
      TOTAL_COUNT={TOTAL_COUNT || STORE_DATA?.emplist?.toString()}
      WORKING_COUNT={WORKING_COUNT || STORE_DATA?.workinglist?.toString()}
      EMPCOUNT={STORE_DATA?.EMPCOUNT}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      goWorkFn={goWorkFn}
      leaveWorkFn={leaveWorkFn}
      invitedEmpCount={STORE_DATA.inviteemp || 0}
      isGpsVisible={isGpsVisible}
      setIsGpsVisible={setIsGpsVisible}
      lat={lat}
      long={long}
      getDistance={getDistance}
      GPS={GPS || STORE_DATA?.resultdata?.GPS}
      sucessModalOpen={sucessModalOpen}
      setSucessModalOpen={setSucessModalOpen}
      failModalOpen={failModalOpen}
      setFailModalOpen={setFailModalOpen}
      actionTYPE={actionTYPE}
      workingTYPE={workingTYPE}
      setWorkingTYPE={setWorkingTYPE}
      errorMessage={errorMessage}
      isWorkingMode={isWorkingMode}
      setIsWorkingMode={setIsWorkingMode}
      editMode={editMode}
      setEditMode={setEditMode}
      employeesMenu={employeesMenu}
      addCUSTOM_MENU_EMP_Fn={addCUSTOM_MENU_EMP_Fn}
      removeCUSTOM_MENU_EMP_Fn={removeCUSTOM_MENU_EMP_Fn}
      AVATAR={AVATAR}
      checkWorkingLoading={checkWorkingLoading}
      workingLoading={workingLoading}
      initLoading={initLoading}
      gotoScreen={gotoScreen}
      refreshing={refreshing}
      onRefresh={onRefresh}
      setLat={setLat}
      setLong={setLong}
      category={params?.category}
      mapRef={mapRef}
      animationRef={animationRef}
      moveMap={moveMap}
      gotoSelectStoreFn={gotoSelectStoreFn}
      QR={STORE_DATA?.resultdata?.QR}
      // hasConfirmed={hasConfirmed}
      // confirmModal={confirmModal}
      setShowPictureModalOpen={setShowPictureModalOpen}
      showPictureModalOpen={showPictureModalOpen}
      handleBarCodeScanned1={handleBarCodeScanned1}
      // handleBarCodeScanned2={handleBarCodeScanned2}
      // qrCameraConfirmModalOpen={qrCameraConfirmModalOpen}
      // setQrCameraConfirmModalOpen={setQrCameraConfirmModalOpen}
      // qrConfirmLoading={qrConfirmLoading}
      // setQrConfirmLoading={setQrConfirmLoading}
      qrCameraModalOpen1={qrCameraModalOpen1}
      setQrCameraModalOpen1={setQrCameraModalOpen1}
      // qrCameraModalOpen2={qrCameraModalOpen2}
      // setQrCameraModalOpen2={setQrCameraModalOpen2}
      // qrCameraMode={qrCameraMode}
      // setQrCameraMode={setQrCameraMode}
      // QR_Num={QR_Num}
      banner1D={banner1D}
      banner2D={banner2D}
      gotoWork={gotoWork}
      resultCode={resultCode}
      resultMessage={resultMessage}
      resultCode2={resultCode2}
      resultMessage2={resultMessage2}
      customMenuIndex={customMenuIndex}
      customMenu={customMenu}
      setCustomMenu={setCustomMenu}
      isModalToastVisible={isModalToastVisible}
    />
  );
};
