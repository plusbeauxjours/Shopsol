import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  BackHandler,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import HomeScreenPresenter from './HomeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setSTORE_DATA, setEMP_SEQ} from '~/redux/storeSlice';
import {
  addCUSTOM_MENU_STORE,
  addCUSTOM_MENU_EMP,
  removeCUSTOM_MENU_STORE,
  removeCUSTOM_MENU_EMP,
} from '~/redux/userSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {setNOTICE_COUNT} from '~/redux/checklistshareSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const SharedStorage = NativeModules.SharedStorage;
  const {
    STORE_SEQ,
    STORE,
    STORE_NAME,
    WORKING_COUNT,
    TOTAL_COUNT,
    GPS,
  } = params;
  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);
  const {
    MEMBER_SEQ,
    MEMBER_NAME,
    DEVICE_PLATFORM,
    GENDER,
    CUSTOM_MENU_STORE,
    CUSTOM_MENU_EMP,
  } = useSelector((state: any) => state.userReducer);
  const {NOTICE_COUNT} = useSelector(
    (state: any) => state.checklistshareReducer,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isGpsVisible, setIsGpsVisible] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [QR, setQR] = useState<string>('');
  const [invitedEmpCount, setInvitedEmpCount] = useState<number>(0);
  const [checklistCount, setChecklistCount] = useState<number>(0);
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [qrCameraModalOpen, setQrCameraModalOpen] = useState<boolean>(false);
  const [isWorkingMode, setIsWorkingMode] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);

  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const [failModalOpen, setFailModalOpen] = useState<boolean>(false);
  const [actionTYPE, setActionTYPE] = useState<string>('출근');
  const [workingTYPE, setWorkingTYPE] = useState<string>('QR');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);

  const storeKeepersStoreMenu = [
    {
      selection: '사업장현황',
      paging: 'DashBoardScreen',
      count: null,
      source: require(`../../../../assets/main/Invite.png`),
    },
    {
      selection: '직원초대',
      paging: 'InviteEmployeeScreen',
      count: null,
      source: require(`../../../../assets/main/Invite.png`),
    },
    {
      selection: '직원목록',
      paging: 'EmployeeListScreen',
      count: null,
      source: require(`../../../../assets/main/EmployeeList.png`),
    },
    {
      selection: '직원합류승인',
      paging: 'ManageInviteEmployeeScreen',
      count: invitedEmpCount,
      source: require(`../../../../assets/main/ManageInviteEmployee.png`),
    },
    {
      selection: '캘린더',
      paging: 'CalendarInfoScreen',
      count: null,
      source:
        STORE_DATA?.CalendarEdit == 1
          ? require('../../../../assets/main/CalendarInfo.png')
          : require('../../../../assets/main/CalendarInfoEmp.png'),
    },
    {
      selection: '급여정보',
      paging: 'PaymentInfoScreen',
      count: null,
      source: require(`../../../../assets/main/PaymentInfo.png`),
    },
    {
      selection: 'QR보기',
      paging: 'qrViewScreen',
      count: null,
      source: require(`../../../../assets/main/qrView.png`),
    },
  ];

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
      source: require(`../../../../assets/main/shelfLifeCheck.png`),
    },
    {
      selection: '조기경보',
      paging: 'HealthCertificateTypeScreen',
      count: null,
      source: require(`../../../../assets/main/HealthCertificateType.png`),
    },
  ];

  const managersStoreMenu = [
    {
      selection: '사업장현황',
      paging: 'DashBoardScreen',
      count: null,
      source: require(`../../../../assets/main/Invite.png`),
    },
    {
      selection: '직원초대',
      paging: 'InviteEmployeeScreen',
      count: null,
      source: require(`../../../../assets/main/Invite.png`),
    },
    {
      selection: '직원목록',
      paging: 'EmployeeListScreen',
      count: null,
      source: require(`../../../../assets/main/EmployeeList.png`),
    },
    {
      selection: '직원정보',
      paging: 'EmployeeInfoEMPScreen',
      count: null,
      source: require(`../../../../assets/main/EmployeeInfoEmp.png`),
    },
    {
      selection: '직원합류승인',
      paging: 'ManageInviteEmployeeScreen',
      count: invitedEmpCount,
      source: require(`../../../../assets/main/ManageInviteEmployee.png`),
    },
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
      selection: '급여정보',
      paging: 'PaymentInfoScreen',
      count: null,
      source: require(`../../../../assets/main/PaymentInfo.png`),
    },
    {
      selection: '급여정보',
      paging: 'EmpPayInfoScreen',
      count: null,
      source: require(`../../../../assets/main/PaymentInfo.png`),
    },
    {
      selection: 'QR보기',
      paging: 'qrViewScreen',
      count: null,
      source: require(`../../../../assets/main/qrView.png`),
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
      source: require(`../../../../assets/main/shelfLifeCheck.png`),
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
      source: require(`../../../../assets/main/shelfLifeCheck.png`),
    },
    {
      selection: '조기경보',
      paging: 'HealthCertificateTypeScreen',
      count: null,
      source: require(`../../../../assets/main/HealthCertificateType.png`),
    },
  ];

  const addCUSTOM_MENU_STORE_Fn = (CUSTOM_MENU_STORE) => {
    dispatch(addCUSTOM_MENU_STORE({STORE_SEQ, CUSTOM_MENU_STORE}));
  };
  const addCUSTOM_MENU_EMP_Fn = (CUSTOM_MENU_EMP) => {
    dispatch(addCUSTOM_MENU_EMP({STORE_SEQ, CUSTOM_MENU_EMP}));
  };
  const removeCUSTOM_MENU_STORE_Fn = (CUSTOM_MENU_STORE) => {
    dispatch(removeCUSTOM_MENU_STORE({STORE_SEQ, CUSTOM_MENU_STORE}));
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

  // VERSION
  const checkVersion = async () => {
    try {
      const {data} = await api.checkApp({
        appinfoversion: utils.appVersion,
        Dplatform: DEVICE_PLATFORM,
      });
      if (data.RESULT_CODE == '1') {
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
      setLoading(true);
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
        setLoading(false);
        setErrorMessage('정확한 사업장 QR코드가 아닙니다');
        setFailModalOpen(true);
      } else if (data.message === 'WORK_ON_SUCCESS') {
        setLoading(false);
        setSucessModalOpen(true);
      } else if (data.message === 'SCHEDULE_EMPTY') {
        setLoading(false);
        setErrorMessage('오늘은 근무일이 아닙니다');
        setFailModalOpen(true);
      } else if (data.message === 'SCHEDULE_EXIST') {
        setLoading(false);
        setErrorMessage('이미 출근처리를 완료했습니다');
        setFailModalOpen(true);
      } else if (data.message === 'ALREADY_SUCCESS') {
        setLoading(false);
        setErrorMessage('이미 출근처리를 완료했습니다');
        setFailModalOpen(true);
      } else if (data.message === 'FAIL') {
        setLoading(false);
        setErrorMessage(data.result);
        setFailModalOpen(true);
      } else {
        setLoading(false);
        setErrorMessage(data.result);
        setFailModalOpen(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // QR 퇴근하기
  const leaveWorkFn = async (TYPE) => {
    setActionTYPE('퇴근');
    try {
      setLoading(true);
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
        setErrorMessage('정확한 사업장 QR코드가 아닙니다');
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
      setLoading(false);
    }
  };

  // QR 스캔
  const handleBarCodeScanned = ({data}) => {
    if (isNaN(data) || STORE_SEQ != data) {
      setQrCameraModalOpen(false);
      setTimeout(() => {
        alertModal('', '정확한 사업장 QR코드가 아닙니다');
      }, 500);
    } else {
      setIsWorkingMode(true);
    }
  };

  const fetchData = async () => {
    setWorkingModalOpen(false);
    try {
      if (!STORE_DATA) {
        dispatch(setSplashVisible(true));
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
      dispatch(setSplashVisible(false));
    }
  };

  const locationPermission = async () => {
    try {
      if (utils.isAndroid()) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert(
            '위치정보 권한 거절',
            '앱을 사용하기 위해서는 반드시 위치정보 권한을 허용해야 합니다.\n거부시 설정에서 "샵솔" 앱의 위치권한 허용을 해야 합니다.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: () => {
                  utils.isAndroid()
                    ? openSettings()
                    : Linking.openURL('app-settings:');
                },
              },
            ],
          );
        }
      } else {
        const permission = await Geolocation.requestAuthorization('always');
        if (permission === 'granted') {
          getLocation();
        } else {
          Alert.alert(
            '위치정보 권한 거절',
            '앱을 사용하기 위해서는 반드시 위치정보 권한을 허용해야 합니다.\n거부시 설정에서 "샵솔" 앱의 위치권한 허용을 해야 합니다.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: () => {
                  utils.isAndroid()
                    ? openSettings()
                    : Linking.openURL('app-settings:');
                },
              },
            ],
          );
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (e) => {
        console.log(e);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  };

  const getDistance = () => {
    const prevLatInRad = toRad(Number(STORE_DATA.resultdata.LAT));
    const prevLongInRad = toRad(Number(STORE_DATA.resultdata.LONG));
    const latInRad = lat;
    const longInRad = long;
    // const latInRad = toRad(Number(STORE_DATA.resultdata.LAT) + 0.002);
    // const longInRad = toRad(Number(STORE_DATA.resultdata.LONG) + 0.002);

    return (
      6377830.272 *
      Math.acos(
        Math.sin(prevLatInRad) * Math.sin(latInRad) +
          Math.cos(prevLatInRad) *
            Math.cos(latInRad) *
            Math.cos(longInRad - prevLongInRad),
      )
    );
  };

  const toRad = (angle) => {
    return (angle * Math.PI) / 180;
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
    locationPermission();
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
      setShowPictureModal={setShowPictureModal}
      showPictureModal={showPictureModal}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      goWorkFn={goWorkFn}
      leaveWorkFn={leaveWorkFn}
      handleBarCodeScanned={handleBarCodeScanned}
      invitedEmpCount={invitedEmpCount}
      checklistCount={checklistCount}
      NOTICE_COUNT={NOTICE_COUNT}
      QR={QR}
      qrCameraModalOpen={qrCameraModalOpen}
      setQrCameraModalOpen={setQrCameraModalOpen}
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
      GENDER={GENDER}
      loading={loading}
      isWorkingMode={isWorkingMode}
      setIsWorkingMode={setIsWorkingMode}
      editMode={editMode}
      setEditMode={setEditMode}
      storeKeepersStoreMenu={storeKeepersStoreMenu}
      storeKeepersEMPMenu={storeKeepersEMPMenu}
      managersStoreMenu={managersStoreMenu}
      managersEMPMenu={managersEMPMenu}
      employeesMenu={employeesMenu}
      CUSTOM_MENU_STORE={CUSTOM_MENU_STORE}
      CUSTOM_MENU_EMP={CUSTOM_MENU_EMP}
      addCUSTOM_MENU_STORE_Fn={addCUSTOM_MENU_STORE_Fn}
      addCUSTOM_MENU_EMP_Fn={addCUSTOM_MENU_EMP_Fn}
      removeCUSTOM_MENU_STORE_Fn={removeCUSTOM_MENU_STORE_Fn}
      removeCUSTOM_MENU_EMP_Fn={removeCUSTOM_MENU_EMP_Fn}
    />
  );
};
