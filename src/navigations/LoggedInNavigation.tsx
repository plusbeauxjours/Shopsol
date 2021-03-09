import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createStackNavigator} from '@react-navigation/stack';

// 직원관리 ========================================================
import HomeScreen from '~/screens/LoggedInScreen/Home/HomeScreen';
import SelectStoreScreen from '~/screens/LoggedInScreen/Home/SelectStoreScreen';
import AddStoreScreen from '~/screens/LoggedInScreen/Home/AddStoreScreen';
import SearchAddressScreen from '~/screens/LoggedInScreen/Home/SearchAddressScreen';
import UpdateStoreScreen from '~/screens/LoggedInScreen/Home/UpdateStoreScreen';
import DashBoardScreen from '~/screens/LoggedInScreen/DashBoard';

// 유통기한========================================================
import ShelfLifeCheckScreen from '~/screens/LoggedInScreen/ShelfLife/ShelfLifeCheckScreen';
import ShelfLifeUpdateScreen from '~/screens/LoggedInScreen/ShelfLife/ShelfLifeUpdateScreen';
import AddShelfLifeScreen from '~/screens/LoggedInScreen/ShelfLife/AddShelfLifeScreen';

// 유통기한========================================================
import TaskCheckScreen from '~/screens/LoggedInScreen/Task/TaskCheckScreen';
import TaskUpdateScreen from '~/screens/LoggedInScreen/Task/TaskUpdateScreen';
import AddTaskScreen from '~/screens/LoggedInScreen/Task/AddTaskScreen';

// 직원관리========================================================
import InviteEmployeeScreen from '~/screens/LoggedInScreen/Employee/InviteEmployeeScreen';
import ManageInviteEmployeeScreen from '~/screens/LoggedInScreen/Employee/ManageInviteEmployeeScreen';
import EmployeeListScreen from '~/screens/LoggedInScreen/Employee/EmployeeListScreen';
import EmployeeInfoScreen from '~/screens/LoggedInScreen/Employee/EmployeeInfoScreen';
import EmployeeInfoEMPScreen from '~/screens/LoggedInScreen/Employee/EmployeeInfoEMPScreen';
import PaymentInfoScreen from '~/screens/LoggedInScreen/Employee/PaymentInfoScreen';
import EmpPayInfoScreen from '~/screens/LoggedInScreen/Employee/EmpPayInfoScreen';
import SetEmployeeInfoScreen from '~/screens/LoggedInScreen/Employee/SetEmployeeInfoScreen';
import EmployeeScheduleMainScreen from '~/screens/LoggedInScreen/Employee/EmployeeScheduleMainScreen';
import EmployeeScheduleInfoScreen from '~/screens/LoggedInScreen/Employee/EmployeeScheduleInfoScreen';
import EmployeeScheduleAddScreen from '~/screens/LoggedInScreen/Employee/EmployeeScheduleAddScreen';

// 캘린더========================================================
import CalendarInfoScreen from '~/screens/LoggedInScreen/Calendar/CalendarInfoScreen';
import CalendarAddScreen from '~/screens/LoggedInScreen/Calendar/CalendarAddScreen';
import WorkTimeScreen from '~/screens/LoggedInScreen/Calendar/WorkTimeScreen';
import RealWorkTimeScreen from '~/screens/LoggedInScreen/Calendar/RealWorkTimeScreen';
import WorkDayScreen from '~/screens/LoggedInScreen/Calendar/WorkDayScreen';
import WorkDayRestTypeScreen from '~/screens/LoggedInScreen/Calendar/WorkDayRestTypeScreen';
import WorkDayRestTimeScreen from '~/screens/LoggedInScreen/Calendar/WorkDayRestTimeScreen';

// 체크리스트========================================================
import ChecklistAddScreen from '~/screens/LoggedInScreen/Checklist/ChecklistAddScreen';
import ChecklistItemsScreen from '~/screens/LoggedInScreen/Checklist/ChecklistItemsScreen';
import ChecklistSpecificationScreen from '~/screens/LoggedInScreen/Checklist/ChecklistSpecificationScreen';
import ChecklistDetailScreen from '~/screens/LoggedInScreen/Checklist/ChecklistDetailScreen';

// 업무일지========================================================
import ChecklistShareMainScreen from '~/screens/LoggedInScreen/ChecklistShare/ChecklistShareMainScreen';
import ChecklistShareItemScreen from '~/screens/LoggedInScreen/ChecklistShare/ChecklistShareItemScreen';
import ChecklistShareInsertScreen from '~/screens/LoggedInScreen/ChecklistShare/ChecklistShareInsertScreen';
import ChecklistShareUpdateScreen from '~/screens/LoggedInScreen/ChecklistShare/ChecklistShareUpdateScreen';

// 마이페이지========================================================
import MyPageAlarmSetScreen from '~/screens/LoggedInScreen/MyPage/MyPageAlarmSetScreen';
import MyPageAppointmentScreen from '~/screens/LoggedInScreen/MyPage/MyPageAppointmentScreen';
import MyPageMainScreen from '~/screens/LoggedInScreen/MyPage/MyPageMainScreen';
import MyPagePlaceSetScreen from '~/screens/LoggedInScreen/MyPage/MyPagePlaceSetScreen';
import MyPageDeleteSetScreen from '~/screens/LoggedInScreen/MyPage/MyPageDeleteSetScreen';
import MyPageIdSetMainScreen from '~/screens/LoggedInScreen/MyPage/MyPageIdSetMainScreen';
import MyPageNameSetScreen from '~/screens/LoggedInScreen/MyPage/MyPageNameSetScreen';
import MyPagePasswordSetScreen from '~/screens/LoggedInScreen/MyPage/MyPagePasswordSetScreen';
import MyPagePositionSetScreen from '~/screens/LoggedInScreen/MyPage/MyPagePositionSetScreen';

// 조기경보========================================================
import HealthCertificateTypeScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateTypeScreen';
import HealthCertificateStoreFormScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreFormScreen';
import HealthCertificateStoreDetailScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreDetailScreen';
import HealthCertificateEmpUpdateScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpUpdateScreen';
import HealthCertificateStoreUpdateScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreUpdateScreen';
import HealthCertificateEmpListScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpListScreen';
import HealthCertificateEmpDetailScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpDetailScreen';
import HealthCertificateEmpFormScreen from '~/screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpFormScreen';

// Components========================================================
import SplashScreen from '~/components/SplashScreen';
import SettingBtn from '~/components/Header/SettingBtn';
import LogOutBtn from '~/components/Header/LogOutBtn';
import RootModal from '~/components/RootModal';
import BackBtn from '~/components/Header/BackBtn';
import HomeBtn from '~/components/Header/HomeBtn';
import ConfirmBackBtn from '~/components/Header/ConfirmBackBtn';
import ChecklistShareBtn from '~/components/Header/ChecklistShareBtn';

import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';
import {resetCALENDAR_DATA} from '~/redux/calendarSlice';
import {setSTORE_DATA} from '~/redux/storeSlice';
import api from '~/constants/LoggedInApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoggedInNavigation = createStackNavigator();
export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const alert = useSelector((state: any) => state.alertReducer);

  const headerStyle = utils.isAndroid() &&
    !isIphoneX() && {
      height: 56,
    };

  const gotoSelectStoreFn = () => {
    dispatch(resetCALENDAR_DATA());
    dispatch(setSTORE_DATA({STORE_DATA: {}}));
    navigation.reset({
      index: 0,
      routes: [{name: 'SelectStoreScreen'}],
    });
  };

  const handleAppStateChange = async () => {
    console.log('AppState.currentState', AppState.currentState);
    const STORE = await AsyncStorage.getItem('STORE');
    const STORE_SEQ = await AsyncStorage.getItem('STORE_SEQ');
    const MEMBER_SEQ = await AsyncStorage.getItem('MEMBER_SEQ');
    if (
      AppState.currentState === 'active' &&
      STORE_SEQ &&
      MEMBER_SEQ &&
      STORE &&
      STORE === '0'
    ) {
      console.log(STORE, STORE_SEQ, MEMBER_SEQ);
      try {
        const {data} = await api.getIsRetiree(STORE_SEQ, MEMBER_SEQ);
        console.log(data);
        if (!data?.WORKFLAG) {
          gotoSelectStoreFn();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  return (
    <React.Fragment>
      <LoggedInNavigation.Navigator
        headerMode={'screen'}
        initialRouteName={'SplashScreen'}
        // initialRouteName={'ChecklistItemsScreen'}
        screenOptions={{
          animationEnabled: utils.isAndroid() ? false : true,
          headerStyle: {
            backgroundColor: styleGuide.palette.headerColor,
            borderColor: 'white',
            borderWidth: 0,
            ...headerStyle,
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackBtn />,
          headerLeftContainerStyle: {marginLeft: 10},
        }}>
        <LoggedInNavigation.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <LoggedInNavigation.Screen
          name="SelectStoreScreen"
          component={SelectStoreScreen}
          options={{
            headerLeft: () => <SettingBtn />,
            headerTitle: '사업장 선택',
            title: '사업장 목록',
            headerRight: () => <LogOutBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="DashBoardScreen"
          component={DashBoardScreen}
          options={{
            headerTitle: '사업장 현황',
            title: '사업장 현황',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: '메인 페이지',
          }}
        />
        <LoggedInNavigation.Screen
          name="AddStoreScreen"
          component={AddStoreScreen}
          options={{
            headerTitle: '사업장 등록',
            title: '사업장 등록',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="SearchAddressScreen"
          component={SearchAddressScreen}
          options={{
            headerTitle: '사업장 검색',
            title: '사업장 검색',
          }}
        />
        {/* 마이페이지======================================================== */}
        <LoggedInNavigation.Screen
          name="MyPageAlarmSetScreen"
          component={MyPageAlarmSetScreen}
          options={{
            headerTitle: '알림설정',
            title: '마이페이지 알림설정',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageAppointmentScreen"
          component={MyPageAppointmentScreen}
          options={{
            headerTitle: '약관보기',
            title: '마이페이지 약관보기',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageMainScreen"
          component={MyPageMainScreen}
          options={{
            headerTitle: '마이페이지',
            title: '마이페이지',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPagePlaceSetScreen"
          component={MyPagePlaceSetScreen}
          options={{
            headerTitle: '사업장관리이력',
            title: '마이페이지 사업장 관리이력',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageDeleteSetScreen"
          component={MyPageDeleteSetScreen}
          options={{
            headerTitle: '회원탈퇴',
            title: '마이페이지 회원탈퇴',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageIdSetMainScreen"
          component={MyPageIdSetMainScreen}
          options={{
            headerTitle: '계정관리',
            title: '마이페이지 개인정보변경',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageNameSetScreen"
          component={MyPageNameSetScreen}
          options={{
            headerTitle: '이름 변경',
            title: '마이페이지 이름변경',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPagePasswordSetScreen"
          component={MyPagePasswordSetScreen}
          options={{
            headerTitle: '비밀번호 재설정',
            title: '마이페이지 비밀번호 재설정',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPagePositionSetScreen"
          component={MyPagePositionSetScreen}
          options={{
            headerTitle: '가입유형 재설정',
            title: '마이페이지 가입유형 재설정',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="UpdateStoreScreen"
          component={UpdateStoreScreen}
          options={{
            headerTitle: '사업장 수정',
            title: '사업장 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        {/* 유통기한======================================================== */}
        <LoggedInNavigation.Screen
          name="ShelfLifeCheckScreen"
          component={ShelfLifeCheckScreen}
          options={{
            headerTitle: '유통기한 체크',
            title: '유통기한 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ShelfLifeUpdateScreen"
          component={ShelfLifeUpdateScreen}
          options={{
            headerTitle: '유통기한 체크 수정',
            title: '유통기한 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="AddShelfLifeScreen"
          component={AddShelfLifeScreen}
          options={{
            headerTitle: '유통기한 체크 등록',
            title: '유통기한 등록',
            headerRight: () => <HomeBtn />,
          }}
        />
        {/* 업무캘린더======================================================== */}
        <LoggedInNavigation.Screen
          name="TaskCheckScreen"
          component={TaskCheckScreen}
          options={{
            headerTitle: '업무캘린더 체크',
            title: '업무캘린더 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="TaskUpdateScreen"
          component={TaskUpdateScreen}
          options={{
            headerTitle: '업무캘린더 체크 수정',
            title: '업무캘린더 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="AddTaskScreen"
          component={AddTaskScreen}
          options={{
            headerTitle: '업무캘린더 체크 등록',
            title: '업무캘린더 등록',
            headerRight: () => <HomeBtn />,
          }}
        />
        {/* 체크리스트======================================================== */}
        <LoggedInNavigation.Screen
          name="ChecklistAddScreen"
          component={ChecklistAddScreen}
          options={{
            headerTitle: '체크리스트 입력',
            title: '체크리스트 등록 & 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistItemsScreen"
          component={ChecklistItemsScreen}
          options={{
            headerTitle: '체크리스트',
            title: '체크리스트 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistSpecificationScreen"
          component={ChecklistSpecificationScreen}
          options={{
            headerTitle: '체크리스트 상세',
            title: '체크리스트 상세 (직원)',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistDetailScreen"
          component={ChecklistDetailScreen}
          options={{
            headerTitle: '체크리스트 상세',
            title: '체크리스트 상세 (사업주)',
            headerRight: () => <HomeBtn />,
          }}
        />
        {/* 업무일지======================================================== */}
        <LoggedInNavigation.Screen
          name="ChecklistShareMainScreen"
          component={ChecklistShareMainScreen}
          options={{
            headerTitle: '업무일지',
            title: '업무일지 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistShareItemScreen"
          component={ChecklistShareItemScreen}
          options={({route: {params}}: any) => ({
            headerTitle: `${params?.TITLE} 상세`,
            headerRight: () => <ChecklistShareBtn />,
          })}
        />
        <LoggedInNavigation.Screen
          name="ChecklistShareInsertScreen"
          component={ChecklistShareInsertScreen}
          options={({route: {params}}: any) => ({
            headerTitle: `${params?.TITLE} 등록`,
            headerRight: () => <HomeBtn />,
          })}
        />
        <LoggedInNavigation.Screen
          name="ChecklistShareUpdateScreen"
          component={ChecklistShareUpdateScreen}
          options={({route: {params}}: any) => ({
            headerTitle: `${params?.TITLE} 수정`,
            headerRight: () => <HomeBtn />,
          })}
        />
        {/* 캘린더======================================================== */}
        <LoggedInNavigation.Screen
          name="CalendarInfoScreen"
          component={CalendarInfoScreen}
          options={{
            headerTitle: '일정관리',
            title: '일정관리 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="CalendarAddScreen"
          component={CalendarAddScreen}
          options={{
            headerTitle: '일정추가',
            title: '일정관리 등록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkTimeScreen"
          component={WorkTimeScreen}
          options={{
            headerTitle: '근무시간 수정하기',
            title: '일정관리 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="RealWorkTimeScreen"
          component={RealWorkTimeScreen}
          options={{
            headerTitle: '출퇴근시간 수정하기',
            title: '일정관리 출퇴근 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkDayScreen"
          component={WorkDayScreen}
          options={{
            headerTitle: '휴무/휴게시간 설정',
            title: '일정관리 기타 설정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkDayRestTypeScreen"
          component={WorkDayRestTypeScreen}
          options={{
            headerTitle: '휴무 설정',
            title: '일정관리 휴무 설정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkDayRestTimeScreen"
          component={WorkDayRestTimeScreen}
          options={{
            headerTitle: '시간 설정',
            title: '일정관리 휴게시간 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        {/* 직원관리======================================================== */}
        <LoggedInNavigation.Screen
          name="InviteEmployeeScreen"
          component={InviteEmployeeScreen}
          options={{
            headerTitle: '직원 초대',
            title: '직원 초대',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ManageInviteEmployeeScreen"
          component={ManageInviteEmployeeScreen}
          options={{
            headerTitle: '직원 초대현황',
            title: '직원 초대현황',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeListScreen"
          component={EmployeeListScreen}
          options={{
            headerTitle: '직원 목록',
            title: '직원 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeInfoScreen"
          component={EmployeeInfoScreen}
          options={{
            headerTitle: '직원 정보',
            title: '직원 정보 (사업주)',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeInfoEMPScreen"
          component={EmployeeInfoEMPScreen}
          options={{
            headerTitle: '직원 정보',
            title: '직원 정보 (직원)',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="PaymentInfoScreen"
          component={PaymentInfoScreen}
          options={{
            headerTitle: '사업장 급여 정보',
            title: '사업장 급여정보',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmpPayInfoScreen"
          component={EmpPayInfoScreen}
          options={{
            headerTitle: '직원 급여 정보',
            title: '직원 급여정보',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="SetEmployeeInfoScreen"
          component={SetEmployeeInfoScreen}
          options={{
            headerBackImage: () => <ConfirmBackBtn />,
            headerTitle: '직원 정보 입력',
            title: '직원 정보등록 & 정보수정',
            headerRight: () => <HomeBtn from={'SetEmployeeInfoScreen'} />,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeScheduleMainScreen"
          component={EmployeeScheduleMainScreen}
          options={{
            headerTitle: '직원 근무 유형',
            title: '직원 근무유형 (최초 가입시)',
            headerRight: () => null,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeScheduleInfoScreen"
          component={EmployeeScheduleInfoScreen}
          options={{
            headerBackImage: () => <ConfirmBackBtn />,
            headerTitle: '직원 정보 입력',
            title: '직원 근무일정 (최초 가입시)',
            headerRight: () => null,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeScheduleAddScreen"
          component={EmployeeScheduleAddScreen}
          options={{
            headerTitle: '일정 추가',
            title: '직원 급여유형 (최초 가입시)',
            headerRight: () => null,
          }}
        />
        {/* 조기경보======================================================== */}
        <LoggedInNavigation.Screen
          name="HealthCertificateTypeScreen"
          component={HealthCertificateTypeScreen}
          options={{
            headerTitle: '조기경보시스템 타입 선택',
            title: '조기경보시스템 타입 선택',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateStoreDetailScreen"
          component={HealthCertificateStoreDetailScreen}
          options={{
            headerTitle: '위생교육증 상세',
            title: '조기경보시스템 업체 상세',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateStoreFormScreen"
          component={HealthCertificateStoreFormScreen}
          options={{
            headerTitle: '위생교육증 입력',
            title: '조기경보시스템 업체 등록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateStoreUpdateScreen"
          component={HealthCertificateStoreUpdateScreen}
          options={{
            headerTitle: '위생교육증 수정',
            title: '조기경보시스템 업체 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpListScreen"
          component={HealthCertificateEmpListScreen}
          options={{
            headerTitle: '보건증 직원 목록',
            title: '조기경보시스템 직원 목록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpDetailScreen"
          component={HealthCertificateEmpDetailScreen}
          options={{
            headerTitle: '보건증 상세',
            title: '조기경보시스템 직원 상세',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpFormScreen"
          component={HealthCertificateEmpFormScreen}
          options={{
            headerTitle: '보건증 입력',
            title: '조기경보시스템 직원 등록',
            headerRight: () => <HomeBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpUpdateScreen"
          component={HealthCertificateEmpUpdateScreen}
          options={{
            headerTitle: '보건증 수정',
            title: '조기경보시스템 직원 수정',
            headerRight: () => <HomeBtn />,
          }}
        />
      </LoggedInNavigation.Navigator>
      {alert.visible && <RootModal alert={alert} />}
    </React.Fragment>
  );
};
