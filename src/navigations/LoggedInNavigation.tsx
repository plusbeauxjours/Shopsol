import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

// 직원관리 ========================================================
import HomeScreen from '../screens/LoggedInScreen/Home/HomeScreen';
// import AddStoreScreen from '../screens/LoggedInScreen/Home/AddStoreScreen';
// import UpdateStoreScreen from '../screens/LoggedInScreen/Home/UpdateStoreScreen';
// import SearchAddressScreen from '../screens/LoggedInScreen/Home/SearchAddressScreen';
// import SelectStoreScreen from '../screens/LoggedInScreen/Home/SelectStoreScreen';
// import SetEmployeeInfoScreen from '../screens/LoggedInScreen/Home/SetEmployeeInfoScreen';
// import ElectronicContractsScreen from '../screens/LoggedInScreen/Home/ElectronicContractsScreen';

// EmployeeScheduleScreen========================================================
// import EmployeeScheduleMainScreen from '../screens/LoggedInScreen/Home/EmployeeScheduleMainScreen';
// import EmployeeScheduleInfoScreen from '../screens/LoggedInScreen/Home/EmployeeScheduleInfoScreen';
// import EmployeeScheduleAddScreen from '../screens/LoggedInScreen/Home/EmployeeScheduleAddScreen';

// import InviteEmployeeScreen from '../screens/LoggedInScreen/Home/InviteEmployeeScreen';
// import EmployeeListScreen from '../screens/LoggedInScreen/Home/EmployeeListScreen';
// import PaymentInfoScreen from '../screens/LoggedInScreen/Home/PaymentInfoScreen';
// import EmpPayInfoScreen from '../screens/LoggedInScreen/Home/EmpPayInfoScreen';
// import ShelfLifeCheckScreen from '../screens/LoggedInScreen/Home/ShelfLifeCheckScreen';
// import ShelfLifeUpdateScreen from '../screens/LoggedInScreen/Home/ShelfLifeUpdateScreen';
// import AddShelfLifeScreen from '../screens/LoggedInScreen/Home/AddShelfLifeScreen';

// import ManageInviteEmployeeScreen from '../screens/LoggedInScreen/Home/ManageInviteEmployeeScreen';
// import EmployeeInfoScreen from '../screens/LoggedInScreen/Home/EmployeeInfoScreen';
// import EmployeeInfoEMPScreen from '../screens/LoggedInScreen/Home/EmployeeInfoEMPScreen';

// 캘린더========================================================
// import CalendarAddScreen from '../screens/LoggedInScreen/Calendar/CalendarAddScreen';
// import CalendarInfoScreen from '../screens/LoggedInScreen/Calendar/CalendarInfoScreen';
// import WorkTimeScreen from '../screens/LoggedInScreen/Calendar/WorkTimeScreen';
// import RealWorkTimeScreen from '../screens/LoggedInScreen/Calendar/RealWorkTimeScreen';
// import WorkDayScreen from '../screens/LoggedInScreen/Calendar/WorkDayScreen';
// import WorkDayRestTypeScreen from '../screens/LoggedInScreen/Calendar/WorkDayRestTypeScreen';
// import WorkDayRestTimeScreen from '../screens/LoggedInScreen/Calendar/WorkDayRestTimeScreen';

// 체크리스트========================================================
// import ChecklistAddScreen from '../screens/LoggedInScreen/Checklist/ChecklistAddScreen';
// import ChecklistItemsScreen from '../screens/LoggedInScreen/Checklist/ChecklistItemsScreen';
// import ChecklistSpecificationScreen from '../screens/LoggedInScreen/Checklist/ChecklistSpecificationScreen';
// import ChecklistDetailScreen from '../screens/LoggedInScreen/Checklist/ChecklistDetailScreen';

// 업무일지========================================================
// import ChecklistShareMainScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareMainScreen';
// import ChecklistShareItemScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareItemScreen';
// import ChecklistShareInsertScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareInsertScreen';
// import ChecklistShareUpdateScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareUpdateScreen';

// 교육컨텐츠========================================================
// import MyCuMonthlyListScreen from '../screens/LoggedInScreen/MyCu/MyCuMonthlyListScreen';
// import MyCuMonthlyDetailScreen from '../screens/LoggedInScreen/MyCu/MyCuMonthlyDetailScreen';
// import MyCuVideoListScreen from '../screens/LoggedInScreen/MyCu/MyCuVideoListScreen';
// import MyCuVideoDetailScreen from '../screens/LoggedInScreen/MyCu/MyCuVideoDetailScreen';
// import EducationVideoListScreen from '../screens/LoggedInScreen/MyCu/EducationVideoListScreen';
// import EducationVideoDetailScreen from '../screens/LoggedInScreen/MyCu/EducationVideoDetailScreen';

// 마이페이지========================================================
// import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPage/MyPageAlarmSetScreen';
// import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPage/MyPageAppointmentScreen';
// import MyPageMainScreen from '../screens/LoggedInScreen/MyPage/MyPageMainScreen';
// import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPage/MyPagePlaceSetScreen';

// import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPage/MyPageIdSetMainScreen';
// import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPage/MyPageDeleteSetScreen';
// import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPage/MyPageNameSetScreen';
// import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPage/MyPagePasswordSetScreen';

// 조기경보========================================================
// import HealthCertificateTypeScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateTypeScreen';
// import HealthCertificateEmpListScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpListScreen';
// import HealthCertificateEmpDetailScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpDetailScreen';
// import HealthCertificateEmpFormScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpFormScreen';
// import HealthCertificateStoreFormScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreFormScreen';
// import HealthCertificateStoreDetailScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreDetailScreen';
// import HealthCertificateEmpUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpUpdateScreen';
// import HealthCertificateStoreUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreUpdateScreen';

// Components========================================================
import SettingBtn from '../components/Header/SettingBtn';
import LogOutBtn from '../components/Header/LogOutBtn';
import RootModal from '../components/RootModal';
import BackBtn from '../components/Header/BackBtn';
import HomeBtn from '../components/Header/HomeBtn';
import CalendarInfoHeader from '../components/Header/CalendarInfoHeader';
import ShelfLifeCheckHeader from '../components/Header/ShelfLifeCheckHeader';

const LoggedInNavigation = createStackNavigator();
export default () => {
  const {visible} = useSelector((state: any) => state.alertReducer);
  return (
    <React.Fragment>
      <LoggedInNavigation.Navigator
        headerMode={'screen'}
        initialRouteName={'SelectStoreScreen'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#AACE36',
            borderColor: '#fff',
            borderWidth: 0,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackBtn />,
          headerRight: () => <HomeBtn />,
          headerLeftContainerStyle: {marginLeft: 10},
        }}>
        <LoggedInNavigation.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: '메인 페이지',
          }}
        />
        {/* 
        직원관리========================================================
        <LoggedInNavigation.Screen
          name="AddStoreScreen"
          component={AddStoreScreen}
          options={{
            headerTitle: '점포 등록',
            title: '사업장(점포) 등록',
          }}
        />
        <LoggedInNavigation.Screen
          name="UpdateStoreScreen"
          component={UpdateStoreScreen}
          options={{
            headerTitle: '점포 수정',
            title: '사업장(점포) 수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="SearchAddressScreen"
          component={SearchAddressScreen}
          options={{
            headerTitle: '점포 검색',
            title: '사업장(점포) 검색',
          }}
        />
        <LoggedInNavigation.Screen
          name="SelectStoreScreen"
          component={SelectStoreScreen}
          options={{
            headerLeft: () => <SettingBtn />,
            headerTitle: '점포 선택',
            title: '사업장(점포) 목록',
            headerRight: () => <LogOutBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeInfoScreen"
          component={EmployeeInfoScreen}
          options={{
            headerTitle: '직원 정보',
            title: '직원 정보 (점장)',
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeInfoEMPScreen"
          component={EmployeeInfoEMPScreen}
          options={{
            headerTitle: '직원 정보',
            title: '직원 정보 (직원)',
          }}
        />
        <LoggedInNavigation.Screen
          name="SetEmployeeInfoScreen"
          component={SetEmployeeInfoScreen}
          options={{
            headerTitle: '직원정보 입력',
            title: '직원 정보등록 & 정보수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="ElectronicContractsScreen"
          component={ElectronicContractsScreen}
          options={{
            headerTitle: '전자근로계약서 체결',
            title: '직원 전자근로계약서',
            headerRight: null,
          }}
        />

        EmployeeScheduleScreen========================================================
        <LoggedInNavigation.Screen
          name="EmployeeScheduleMainScreen"
          component={EmployeeScheduleMainScreen}
          options={{
            headerTitle: '직원 정보',
            title: '직원 근무유형 (최초 가입시)',
            headerRight: () => null,
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeScheduleInfoScreen"
          component={EmployeeScheduleInfoScreen}
          options={{
            headerTitle: '직원 정보',
            title: '직원 근무일정 (최초 가입시)',
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeScheduleAddScreen"
          component={EmployeeScheduleAddScreen}
          options={{
            headerTitle: '일정추가',
            title: '직원 급여유형 (최초 가입시)',
          }}
        />

        <LoggedInNavigation.Screen
          name="InviteEmployeeScreen"
          component={InviteEmployeeScreen}
          options={{
            headerTitle: '직원 초대',
            title: '직원 초대',
          }}
        />
        <LoggedInNavigation.Screen
          name="EmployeeListScreen"
          component={EmployeeListScreen}
          options={{
            headerTitle: '직원 목록',
            title: '직원 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="PaymentInfoScreen"
          component={PaymentInfoScreen}
          options={{
            headerTitle: '점포급여 정보',
            title: '사업장(점포) 급여정보',
          }}
        />
        <LoggedInNavigation.Screen
          name="EmpPayInfoScreen"
          component={EmpPayInfoScreen}
          options={{
            headerTitle: '직원급여 정보',
            title: '직원 급여정보',
          }}
        />
        <LoggedInNavigation.Screen
          name="ManageInviteEmployeeScreen"
          component={ManageInviteEmployeeScreen}
          options={{
            headerTitle: '직원 초대현황',
            title: '직원 초대현황',
          }}
        />

        유통기한========================================================
        <LoggedInNavigation.Screen
          name="ShelfLifeCheckScreen"
          component={ShelfLifeCheckScreen}
          options={{
            headerTitle: '유통기한 체크',
            title: '유통기한 목록',
            headerRight: () => <ShelfLifeCheckHeader />,
          }}
        />
        <LoggedInNavigation.Screen
          name="ShelfLifeUpdateScreen"
          component={ShelfLifeUpdateScreen}
          options={{
            headerTitle: '유통기한 체크 수정',
            title: '유통기한 수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="AddShelfLifeScreen"
          component={AddShelfLifeScreen}
          options={{
            headerTitle: '유통기한 체크 등록',
            title: '유통기한 등록',
          }}
        />

        캘린더========================================================
        <LoggedInNavigation.Screen
          name="CalendarAddScreen"
          component={CalendarAddScreen}
          options={{
            headerTitle: '일정추가',
            title: '일정관리 등록',
          }}
        />
        <LoggedInNavigation.Screen
          name="CalendarInfoScreen"
          component={CalendarInfoScreen}
          options={{
            headerTitle: '일정관리',
            title: '일정관리 목록',
            headerRight: () => <CalendarInfoHeader />,
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkTimeScreen"
          component={WorkTimeScreen}
          options={{
            headerTitle: '근무시간 수정하기',
            title: '일정관리 수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="RealWorkTimeScreen"
          component={RealWorkTimeScreen}
          options={{
            headerTitle: '출퇴근시간 수정하기',
            title: '일정관리 출퇴근 수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkDayScreen"
          component={WorkDayScreen}
          options={{
            headerTitle: '휴무/휴게시간 설정',
            title: '일정관리 기타 설정',
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkDayRestTypeScreen"
          component={WorkDayRestTypeScreen}
          options={{
            headerTitle: '휴무 설정',
            title: '일정관리 휴무 설정',
          }}
        />
        <LoggedInNavigation.Screen
          name="WorkDayRestTimeScreen"
          component={WorkDayRestTimeScreen}
          options={{
            headerTitle: '시간 설정',
            title: '일정관리 휴게시간 수정',
          }}
        />

        체크리스트========================================================
        <LoggedInNavigation.Screen
          name="ChecklistAddScreen"
          component={ChecklistAddScreen}
          options={{
            headerTitle: '체크리스트 입력',
            title: '체크리스트 등록 & 수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistItemsScreen"
          component={ChecklistItemsScreen}
          options={{
            headerTitle: '체크리스트',
            title: '체크리스트 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistSpecificationScreen"
          component={ChecklistSpecificationScreen}
          options={{
            headerTitle: '체크리스트 상세',
            title: '체크리스트 상세 (직원)',
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistDetailScreen"
          component={ChecklistDetailScreen}
          options={{
            headerTitle: '체크리스트 체크상세',
            title: '체크리스트 상세 (점장)',
          }}
        />

        업무일지========================================================
        <LoggedInNavigation.Screen
          name="ChecklistShareMainScreen"
          component={ChecklistShareMainScreen}
          options={{
            headerTitle: '업무일지',
            title: '업무일지 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="ChecklistShareItemScreen"
          component={ChecklistShareItemScreen}
          options={({route: {params}}: any) => ({
            headerTitle: `${params?.TITLE} 상세`,
          })}
        />
        <LoggedInNavigation.Screen
          name="ChecklistShareInsertScreen"
          component={ChecklistShareInsertScreen}
          options={({route: {params}}: any) => ({
            headerTitle: `${params?.TITLE} 등록`,
          })}
        />
        <LoggedInNavigation.Screen
          name="ChecklistShareUpdateScreen"
          component={ChecklistShareUpdateScreen}
          options={({route: {params}}: any) => ({
            headerTitle: `${params?.TITLE} 수정`,
          })}
        />

        교육컨텐츠========================================================
        <LoggedInNavigation.Screen
          name="MyCuMonthlyListScreen"
          component={MyCuMonthlyListScreen}
          options={{
            headerTitle: '노무 월간지',
            title: '노무 월간지 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyCuMonthlyDetailScreen"
          component={MyCuMonthlyDetailScreen}
          options={{
            headerTitle: '노무 월간지',
            title: '노무 월간지 상세',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyCuVideoListScreen"
          component={MyCuVideoListScreen}
          options={{
            headerTitle: '노무 교육 콘텐츠',
            title: '노무 교육콘텐츠 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyCuVideoDetailScreen"
          component={MyCuVideoDetailScreen}
          options={{
            headerTitle: '노무 교육 콘텐츠',
            title: '노무 교육콘텐츠 상세',
          }}
        />
        <LoggedInNavigation.Screen
          name="EducationVideoListScreen"
          component={EducationVideoListScreen}
          options={{
            headerTitle: '교육자료',
            title: '교육콘텐츠 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="EducationVideoDetailScreen"
          component={EducationVideoDetailScreen}
          options={{
            headerTitle: '교육자료',
            title: '교육콘텐츠 상세',
          }}
        />

        마이페이지========================================================
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
            headerTitle: '점포관리이력',
            title: '마이페이지 점포(사업장) 관리이력',
            headerRight: null,
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageIdSetMainScreen"
          component={MyPageIdSetMainScreen}
          options={{
            headerTitle: '마이페이지',
            title: '마이페이지 개인정보변경',
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

        조기경보========================================================
        <LoggedInNavigation.Screen
          name="HealthCertificateTypeScreen"
          component={HealthCertificateTypeScreen}
          options={{
            headerTitle: '조기경보시스템 타입 선택',
            title: '조기경보시스템 타입 선택',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpListScreen"
          component={HealthCertificateEmpListScreen}
          options={{
            headerTitle: '보건증 직원 목록',
            title: '조기경보시스템 직원 목록',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpDetailScreen"
          component={HealthCertificateEmpDetailScreen}
          options={{
            headerTitle: '보건증 상세',
            title: '조기경보시스템 직원 상세',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpFormScreen"
          component={HealthCertificateEmpFormScreen}
          options={{
            headerTitle: '보건증 입력',
            title: '조기경보시스템 직원 등록',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateStoreFormScreen"
          component={HealthCertificateStoreFormScreen}
          options={{
            headerTitle: '위생교육증 입력',
            title: '조기경보시스템 업체 등록',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateStoreDetailScreen"
          component={HealthCertificateStoreDetailScreen}
          options={{
            headerTitle: '위생교육증 상세',
            title: '조기경보시스템 업체 상세',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateEmpUpdateScreen"
          component={HealthCertificateEmpUpdateScreen}
          options={{
            headerTitle: '보건증 수정',
            title: '조기경보시스템 직원 수정',
          }}
        />
        <LoggedInNavigation.Screen
          name="HealthCertificateStoreUpdateScreen"
          component={HealthCertificateStoreUpdateScreen}
          options={{
            headerTitle: '위생교육증 수정',
            title: '조기경보시스템 업체 수정',
          }}
        /> */}
      </LoggedInNavigation.Navigator>
      {visible && <RootModal alert={alert} />}
    </React.Fragment>
  );
};
