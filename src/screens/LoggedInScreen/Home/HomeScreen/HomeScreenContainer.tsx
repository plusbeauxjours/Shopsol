import React, {useEffect, useState} from 'react';
import {Linking, BackHandler, NativeModules} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import HomeScreenPresenter from './HomeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {updateQR_Num, setSTORE_DATA, setEMP_SEQ} from '~/redux/storeSlice';
import {addCUSTOM_MENU_EMP, removeCUSTOM_MENU_EMP} from '~/redux/userSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {setNOTICE_COUNT} from '~/redux/checklistshareSlice';
import {setEMPLOYEE_LIST} from '~/redux/employeeSlice';

export default ({route: {params}}) => {
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
    CUSTOM_MENU_EMP,
  } = useSelector((state: any) => state.userReducer);
  const {NOTICE_COUNT} = useSelector(
    (state: any) => state.checklistshareReducer,
  );
  const [qrConfirmLoading, setQrConfirmLoading] = useState<boolean>(false);
  const [workingLoading, setWorkingLoading] = useState<boolean>(false);
  const [isGpsVisible, setIsGpsVisible] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [QR, setQR] = useState<string>('');
  const [invitedEmpCount, setInvitedEmpCount] = useState<number>(0);
  const [checklistCount, setChecklistCount] = useState<number>(0);
  const [showPictureModalOpen, setShowPictureModalOpen] = useState<boolean>(
    false,
  );
  const [
    qrCameraConfirmModalOpen,
    setQrCameraConfirmModalOpen,
  ] = useState<boolean>(false);
  const [qrCameraModalOpen1, setQrCameraModalOpen1] = useState<boolean>(false);
  const [qrCameraModalOpen2, setQrCameraModalOpen2] = useState<boolean>(false);
  const [isWorkingMode, setIsWorkingMode] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);
  const [qrCameraMode, setQrCameraMode] = useState<boolean>(false);
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const [failModalOpen, setFailModalOpen] = useState<boolean>(false);
  const [actionTYPE, setActionTYPE] = useState<string>('출근');
  const [workingTYPE, setWorkingTYPE] = useState<string>('QR');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState<boolean>(
    STORE_SEQ != STORE_DATA?.resultdata?.STORE_SEQ ? true : false,
  );
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(
    params?.hasConfirmed == '1',
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  const storeKeepersEMPMenu = [
    {
      selection: '체크리스트',
      paging: 'ChecklistItemsScreen',
      count: checklistCount,
      source: require(`../../../../assets/main/ChecklistItems.png`),
    },
    {
      selection: '업무일지',
      paging: 'ChecklistShareMainScreen',
      count: NOTICE_COUNT,
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

  const managersEMPMenu = [
    {
      selection: '체크리스트',
      paging: 'ChecklistItemsScreen',
      count: checklistCount,
      source: require(`../../../../assets/main/ChecklistItems.png`),
    },
    {
      selection: '업무일지',
      paging: 'ChecklistShareMainScreen',
      count: NOTICE_COUNT,
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
    {
      selection: '체크리스트',
      paging: 'ChecklistItemsScreen',
      count: checklistCount,
      source: require(`../../../../assets/main/ChecklistItems.png`),
    },
    {
      selection: '업무일지',
      paging: 'ChecklistShareMainScreen',
      count: NOTICE_COUNT,
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

  const addCUSTOM_MENU_EMP_Fn = (CUSTOM_MENU_EMP) => {
    dispatch(addCUSTOM_MENU_EMP({STORE_SEQ, CUSTOM_MENU_EMP}));
  };

  const removeCUSTOM_MENU_EMP_Fn = (CUSTOM_MENU_EMP) => {
    dispatch(removeCUSTOM_MENU_EMP({STORE_SEQ, CUSTOM_MENU_EMP}));
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

  const confirmModal = () => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '텍스트텍스트텍스트?',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: async () => {
        setHasConfirmed(true);
        const {data} = await api.confirmQR({STORE_SEQ});
        utils.handleCameraPermission(setQrCameraModalOpen2);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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
    if (utils.isAndroid) {
      BackHandler.exitApp();
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.wesop.cuhr',
      );
    } else {
      Linking.openURL(
        'https://apps.apple.com/kr/app/%ED%87%B4%EA%B7%BC%ED%95%B4%EC%94%A8%EC%9C%A0-%EC%9A%B0%EB%A6%AC%EB%A7%A4%EC%9E%A5-%ED%95%84%EC%88%98%ED%92%88/id1503486454',
      );
    }
  };

  // QR 출근하기
  const goWorkFn = async (TYPE) => {
    setActionTYPE('출근');
    try {
      setWorkingLoading(true);
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
        setWorkingLoading(false);
        setErrorMessage('해당 사업장 QR코드가 아닙니다');
        setFailModalOpen(true);
      } else if (data.message === 'WORK_ON_SUCCESS') {
        setWorkingLoading(false);
        setSucessModalOpen(true);
      } else if (data.message === 'SCHEDULE_EMPTY') {
        setWorkingLoading(false);
        setErrorMessage('오늘은 근무일이 아닙니다');
        setFailModalOpen(true);
      } else if (data.message === 'SCHEDULE_EXIST') {
        setWorkingLoading(false);
        setErrorMessage('이미 출근처리를 완료했습니다');
        setFailModalOpen(true);
      } else if (data.message === 'ALREADY_SUCCESS') {
        setWorkingLoading(false);
        setErrorMessage('이미 출근처리를 완료했습니다');
        setFailModalOpen(true);
      } else if (data.message === 'FAIL') {
        setWorkingLoading(false);
        setErrorMessage(data.result);
        setFailModalOpen(true);
      } else {
        setWorkingLoading(false);
        setErrorMessage(data.result);
        setFailModalOpen(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setWorkingLoading(false);
    }
  };

  // QR 퇴근하기
  const leaveWorkFn = async (TYPE) => {
    setActionTYPE('퇴근');
    try {
      setWorkingLoading(true);
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
      } else if (data.message == 'FAIL') {
        setErrorMessage(data.result);
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
      }
    } catch (e) {
      console.log(e);
    } finally {
      setWorkingLoading(false);
    }
  };

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

  // 사업장QR 스캔
  const handleBarCodeScanned2 = async (codenumber) => {
    console.log(codenumber, /^wes/.test(codenumber));
    await setQrCameraModalOpen2(false);
    if (/^wes/.test(codenumber)) {
      try {
        const {data} = await api.insertQR(STORE_SEQ, codenumber);
        if (data.message !== 'SUCCESS') {
          alertModal('', '연결에 실패하였습니다.');
        } else {
          alertModal('', 'QR코드를 등록하였습니다.');
          dispatch(updateQR_Num(codenumber));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setQrCameraModalOpen2(false);
        setShowPictureModalOpen(false);
        setQrCameraMode(false);
      }
    } else {
      alertModal('', '샵솔에서 제공한 QR코드가 아닙니다.');
    }
  };

  const fetchData = async () => {
    setWorkingModalOpen(false);
    try {
      const {data: empData} = await api.getEmpLists(STORE_SEQ);
      if (empData.message == 'SUCCESS') {
        dispatch(setEMPLOYEE_LIST(empData));
      }
      const {data} = await api.getStoreInfo({
        STORE,
        MEMBER_SEQ,
        STORE_SEQ,
      });
      if (data.resultmsg === '1') {
        dispatch(setSTORE_DATA(data));
        dispatch(setEMP_SEQ(data.EMP_SEQ));
        setQR(data.resultdata.QR);
        setInvitedEmpCount(data.inviteemp);
        setChecklistCount(data.checklength);
        dispatch(setNOTICE_COUNT(data.noticelength));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setInitLoading(false);
    }
  };

  const getDistance = () => {
    const R = 6371e3; // metres
    const lat1 = Number(STORE_DATA.resultdata.LAT);
    const lon1 = Number(STORE_DATA.resultdata.LONG);
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

  const gotoScreen = (paging) => {
    navigation.navigate(`${paging}`);
    setEditMode(false);
  };

  useEffect(() => {
    // if (utils.isAndroid) {
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
    fetchData();
    checkVersion();
  }, []);

  return (
    <HomeScreenPresenter
      STORE_DATA={STORE_DATA}
      MEMBER_NAME={MEMBER_NAME}
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      STORE_NAME={STORE_NAME}
      TOTAL_COUNT={TOTAL_COUNT}
      WORKING_COUNT={WORKING_COUNT}
      setShowPictureModalOpen={setShowPictureModalOpen}
      showPictureModalOpen={showPictureModalOpen}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      goWorkFn={goWorkFn}
      leaveWorkFn={leaveWorkFn}
      handleBarCodeScanned1={handleBarCodeScanned1}
      handleBarCodeScanned2={handleBarCodeScanned2}
      invitedEmpCount={invitedEmpCount}
      checklistCount={checklistCount}
      NOTICE_COUNT={NOTICE_COUNT}
      QR={QR}
      qrCameraConfirmModalOpen={qrCameraConfirmModalOpen}
      setQrCameraConfirmModalOpen={setQrCameraConfirmModalOpen}
      qrConfirmLoading={qrConfirmLoading}
      setQrConfirmLoading={setQrConfirmLoading}
      qrCameraModalOpen1={qrCameraModalOpen1}
      setQrCameraModalOpen1={setQrCameraModalOpen1}
      qrCameraModalOpen2={qrCameraModalOpen2}
      setQrCameraModalOpen2={setQrCameraModalOpen2}
      isGpsVisible={isGpsVisible}
      setIsGpsVisible={setIsGpsVisible}
      lat={lat}
      long={long}
      getDistance={getDistance}
      GPS={GPS}
      sucessModalOpen={sucessModalOpen}
      setSucessModalOpen={setSucessModalOpen}
      failModalOpen={failModalOpen}
      setFailModalOpen={setFailModalOpen}
      actionTYPE={actionTYPE}
      workingTYPE={workingTYPE}
      setWorkingTYPE={setWorkingTYPE}
      errorMessage={errorMessage}
      workingLoading={workingLoading}
      isWorkingMode={isWorkingMode}
      setIsWorkingMode={setIsWorkingMode}
      editMode={editMode}
      setEditMode={setEditMode}
      storeKeepersEMPMenu={storeKeepersEMPMenu}
      managersEMPMenu={managersEMPMenu}
      employeesMenu={employeesMenu}
      CUSTOM_MENU_EMP={CUSTOM_MENU_EMP}
      addCUSTOM_MENU_EMP_Fn={addCUSTOM_MENU_EMP_Fn}
      removeCUSTOM_MENU_EMP_Fn={removeCUSTOM_MENU_EMP_Fn}
      AVATAR={AVATAR}
      initLoading={initLoading}
      gotoScreen={gotoScreen}
      qrCameraMode={qrCameraMode}
      setQrCameraMode={setQrCameraMode}
      QR_Num={QR_Num}
      refreshing={refreshing}
      onRefresh={onRefresh}
      setLat={setLat}
      setLong={setLong}
      hasConfirmed={hasConfirmed}
      confirmModal={confirmModal}
      category={params?.category}
    />
  );
};
