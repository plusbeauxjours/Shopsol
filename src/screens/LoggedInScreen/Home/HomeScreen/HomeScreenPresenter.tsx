import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

import {ForwardIcon, HelpIcon, SettingIcon} from '~/constants/Icons';
import GoWorkingSuccessAnimation from '~/components/GoWorkingSuccessAnimation';
import GoWorkingFailAnimation from '~/components/GoWorkingFailAnimation';
import utils from '~/constants/utils';
import Ripple from 'react-native-material-ripple';

interface IHasHeight {
  hasHeight: boolean;
}

interface ITheme {
  distance?: string | number;
  current?: string | number;
}

interface IBox {
  hasGPS?: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: #222;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const IconContainer = styled.TouchableOpacity`
  margin-top: 20px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 30px;
`;

const MyPage = styled.View`
  flex-direction: row;
  margin-right: 10px;
  margin-top: 20px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MenuCnt = styled(Ripple)`
  width: ${(wp('100%') - 20) / 3}px;
  height: ${wp('40%')}px;
  justify-content: center;
  align-items: center;
`;

const NewCnt = styled.View`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -5px;
  right: 0;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: red;
`;

const NewCntText = styled.Text`
  color: white;
  font-weight: bold;
`;

const MenuBox = styled.View`
  padding: 10px;
  background-color: white;
  flex: 1;
  align-items: center;
`;

const Qr = styled.TouchableOpacity`
  width: ${wp('100%') - 40}px;
  border-width: 1px;
  border-color: #e85356;
  padding: ${hp('2%')}px ${wp('10%')}px;
  flex-direction: row;
  margin-top: 30px;
  border-radius: 5px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Column = styled.View`
  flex-direction: column;
`;

const StoreName = styled.View`
  padding: 0 ${wp('5%')}px;
  justify-content: center;
  align-items: flex-start;
`;

const StoreText = styled.Text`
  color: white;
  font-size: 24px;
  line-height: ${wp('8%')}px;
`;

const StoreSubText = styled.Text`
  color: #ddd;
  font-size: 22px;
`;

const StoreUpdate = styled.View`
  flex: 1;
  padding: 0 ${wp('5%')}px 15px ${wp('5%')}px;
  padding-bottom: 15px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StoreUpdateBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${hp('0.5%')}px 15px ${hp('0.5%')}px 20px;
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const WhiteText = styled.Text`
  color: white;
`;

const MenuTitleArea = styled.View`
  flex-direction: row;
  align-self: flex-start;
  margin-top: 20px;
  border-radius: 30px;
  padding: 10px 20px;
  background-color: #e85356;
`;

const MenuTitle = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const Bold = styled(MenuTitle)`
  color: white;
  font-weight: 600;
`;

const ShowPictureModalTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ShowPictureModalText = styled.Text`
  padding: 10px 0;
  font-size: 30px;
  color: white;
`;

const ShowPictureModalImage = styled.View`
  width: ${wp('90%')}px;
  height: ${wp('90%')}px;
`;

const GoWork = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: #e85356;
`;

const WorkText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const WhiteSpace = styled.View`
  height: 20px;
`;

const GrayLinearGradient = styled(LinearGradient)<IHasHeight>`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${hp('30%')}px;
  background-color: gray;
  height: ${hp('30%')}px};
`;

const BlackLinearGradient = styled(LinearGradient)<IHasHeight>`
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${hp('15%')}px;
  background-color: #000;
  height: ${hp('10%')}px};
`;

const Box = styled.TouchableOpacity<IBox>`
  width: ${(props) => (props.hasGPS ? (wp('100%') - 60) / 2 : wp('100%') - 40)};
  height: 60px;
  border-width: 1px;
  border-color: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BoxText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

const BoxContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin: 20px 0;
`;

const MarkerWrapper = styled.View`
  align-items: center;
`;

const ShopMarkerContainer = styled.View<ITheme>`
  background-color: rgba(0, 0, 0, 0.8)
  padding: 10px;
  border-radius: 10px;
  position: relative;
`;

const ShopMarkerTriangle = styled.View<ITheme>`
  border: 10px solid transparent;
  width: 10px;
  border-top-color: rgba(0, 0, 0, 0.8);
`;

const UserMarkerContainer = styled.View<ITheme>`
  background-color: ${(props) =>
    props.distance === '제한 없음'
      ? 'rgba(28, 182, 44, 0.9)'
      : props.distance > props.current
      ? 'rgba(28, 182, 44, 0.9)'
      : 'rgba(240, 52, 52, 0.9)'};
  padding: 10px;
  border-radius: 10px;
  position: relative;
`;

const UserMarkerTriangle = styled.View<ITheme>`
  border: 10px solid transparent;
  width: 10px;
  border-top-color: ${(props) =>
    props.distance === '제한 없음'
      ? 'rgba(28, 182, 44, 0.9)'
      : props.distance > props.current
      ? 'rgba(28, 182, 44, 0.9)'
      : 'rgba(240, 52, 52, 0.9)'};
`;

const SpaceRow = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const MarkerText = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: 600;
`;

export default ({
  STORE_DATA,
  MEMBER_NAME,
  STORE,
  STORE_NAME,
  TOTAL_COUNT,
  WORKING_COUNT,
  qrCameraModalOpen,
  setQrCameraModalOpen,
  workingModalOpen,
  setWorkingModalOpen,
  setShowPictureModal,
  showPictureModal,
  goWorkFn,
  leaveWorkFn,
  handleBarCodeScanned,
  invitedEmpCount,
  checklistCount,
  NOTICE_COUNT,
  QR,
  isGpsVisible,
  setIsGpsVisible,
  lat,
  long,
  getDistance,
  GPS,
  sucessModalOpen,
  setSucessModalOpen,
  failModalOpen,
  setFailModalOpen,
  actionTYPE,
  workingTYPE,
  setWorkingTYPE,
  errorMessage,
  GENDER,
  loading,
}) => {
  const navigation = useNavigation();
  const MenuCntContainer = ({selection, paging, source, count = 0}) => (
    <MenuCnt
      rippleColor={'#fff'}
      rippleDuration={300}
      rippleSize={200}
      rippleContainerBorderRadius={0}
      rippleOpacity={0.9}
      style={{zIndex: 4}}
      activeOpacity={0.3}
      onPress={() => {
        selection == 'QR보기'
          ? setShowPictureModal(true)
          : navigation.navigate(`${paging}`);
      }}>
      {(selection == '직원합류승인' || selection == '업무일지') &&
        count !== 0 &&
        count && (
          <NewCnt style={{zIndex: 5}}>
            <NewCntText>{count < 10 ? count : '9+'}</NewCntText>
          </NewCnt>
        )}
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={source}
        resizeMode={FastImage.resizeMode.contain}
      />
    </MenuCnt>
  );

  const ShopMarker = () => (
    <MarkerWrapper style={{zIndex: 10}}>
      <ShopMarkerContainer>
        <MenuTitle style={{marginBottom: 5}}>{STORE_NAME}점</MenuTitle>
        <SpaceRow>
          <MarkerText>출퇴근 허용거리: </MarkerText>
          <MarkerText style={{fontWeight: '600'}}>
            {Number(STORE_DATA.resultdata.JULI) < 1000
              ? Number(STORE_DATA.resultdata.JULI) + 'm'
              : Number(STORE_DATA.resultdata.JULI) / 1000 + 'km'}
          </MarkerText>
        </SpaceRow>
        {STORE_DATA.resultdata.LATE_FLAG === '1' && (
          <SpaceRow>
            <MarkerText>지각 허용시간:</MarkerText>
            <MarkerText style={{fontWeight: '600'}}>
              {STORE_DATA.resultdata.LATE_TIME}분
            </MarkerText>
          </SpaceRow>
        )}
        {STORE_DATA.resultdata.EARLY_FLAG === '1' && (
          <SpaceRow>
            <MarkerText>조퇴 허용시간:</MarkerText>
            <MarkerText style={{fontWeight: '600'}}>
              {STORE_DATA.resultdata.EARLY_TIME}분
            </MarkerText>
          </SpaceRow>
        )}
      </ShopMarkerContainer>
      <ShopMarkerTriangle />
    </MarkerWrapper>
  );

  const UserMarker = ({distance, current}) => (
    <MarkerWrapper style={{zIndex: 50}}>
      <UserMarkerContainer distance={distance} current={current}>
        <Row>
          <FastImage
            style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
            source={{
              uri: utils.avatarUrl(GENDER),
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          {distance < current ? (
            <Column>
              <MarkerText style={{textAlign: 'right'}}>
                {MEMBER_NAME}님
              </MarkerText>
              <MarkerText>
                {STORE_DATA.resultdata.NAME}점까지 남은거리
              </MarkerText>
              <MarkerText style={{textAlign: 'right'}}>
                {Number(Math.round(getDistance() * 10) / 10) < 1000
                  ? Number(Math.round(getDistance() * 10) / 10) + 'm'
                  : Number(Math.round(getDistance() * 10) / 10) / 1000 + 'km'}
              </MarkerText>
            </Column>
          ) : (
            <MenuTitle>탭하여 출퇴근하기</MenuTitle>
          )}
        </Row>
      </UserMarkerContainer>
      <UserMarkerTriangle distance={distance} current={current} />
    </MarkerWrapper>
  );

  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          style={{width: wp('100%'), height: hp('30%')}}
          source={require('../../../../assets/main/mainTopBg.png')}
          resizeMode={FastImage.resizeMode.cover}>
          <MyPage>
            {STORE === '1' && (
              <IconContainer
                onPress={() => {
                  navigation.navigate('HelpModalScreen');
                }}>
                <HelpIcon />
              </IconContainer>
            )}
            <IconContainer
              onPress={() => {
                navigation.navigate('MyPageMainScreen');
              }}>
              <SettingIcon />
            </IconContainer>
          </MyPage>
          <StoreName>
            <StoreText>안녕하세요.</StoreText>
            <Row>
              <StoreText>{MEMBER_NAME}</StoreText>
              <StoreSubText>님</StoreSubText>
            </Row>
          </StoreName>
          <StoreUpdate>
            <Row>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {STORE_NAME}
              </Text>
            </Row>
            <Row>
              {TOTAL_COUNT > 0 ? (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    alignSelf: 'flex-end',
                  }}>
                  <WhiteText>{TOTAL_COUNT}</WhiteText>명 중&nbsp;
                  <WhiteText>{WORKING_COUNT}</WhiteText>명 근무중
                </Text>
              ) : (
                <Text style={{color: 'white', fontSize: 15}}>
                  합류된 직원이 없습니다 직원을 초대하세요
                </Text>
              )}
            </Row>
            <WhiteSpace />
            <Row>
              <StoreUpdateBtn
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SelectStoreScreen'}],
                  });
                }}>
                <WhiteText>사업장전환</WhiteText>
                <ForwardIcon size={18} color={'white'} />
              </StoreUpdateBtn>
              {STORE === '1' && (
                <StoreUpdateBtn
                  onPress={() => {
                    navigation.navigate('UpdateStoreScreen');
                  }}>
                  <WhiteText>사업장정보</WhiteText>
                  <ForwardIcon size={18} color={'white'} />
                </StoreUpdateBtn>
              )}
            </Row>
          </StoreUpdate>
        </FastImage>
        <MenuBox style={{zIndex: 1}}>
          {STORE == 0 && (
            <>
              {GPS == '0' ? (
                <BoxContainer>
                  <Box
                    onPress={() => {
                      setQrCameraModalOpen(true);
                      setWorkingTYPE('QR');
                    }}
                    hasGPS={GPS !== '0'}>
                    <BoxText>QR출퇴근하기</BoxText>
                  </Box>
                </BoxContainer>
              ) : (
                <BoxContainer>
                  <Box
                    onPress={() => {
                      setQrCameraModalOpen(true);
                      setWorkingTYPE('QR');
                    }}
                    hasGPS={GPS !== '0'}>
                    <BoxText>QR출퇴근하기</BoxText>
                  </Box>
                  <Box
                    onPress={() => {
                      setIsGpsVisible(!isGpsVisible);
                      setWorkingTYPE('GPS');
                    }}
                    hasGPS={GPS !== '0'}>
                    <BoxText>
                      {isGpsVisible ? 'GPS닫기' : 'GPS출퇴근하기'}
                    </BoxText>
                  </Box>
                </BoxContainer>
              )}
            </>
          )}
          {isGpsVisible && (
            <>
              <MapView
                style={{width: wp('100%') - 40, height: 300}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: lat,
                  longitude: long,
                  // latitude: Number(STORE_DATA.resultdata.LAT) + 0.002,
                  // longitude: Number(STORE_DATA.resultdata.LONG) + 0.002,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>
                {STORE_DATA?.resultdata.JULI !== -1 && (
                  <Circle
                    zIndex={0}
                    radius={STORE_DATA.resultdata.JULI}
                    strokeWidth={0}
                    fillColor={
                      getDistance() < STORE_DATA.resultdata.JULI
                        ? 'rgba(0, 230, 64, 0.2)'
                        : 'rgba(240, 52, 52, 0.2)'
                    }
                    strokeColor={
                      getDistance() < STORE_DATA.resultdata.JULI
                        ? 'rgba(0, 230, 64, 1)'
                        : 'rgba(240, 52, 52, 1)'
                    }
                    center={{
                      latitude: Number(STORE_DATA.resultdata.LAT),
                      longitude: Number(STORE_DATA.resultdata.LONG),
                    }}
                  />
                )}
                <Marker
                  onPress={() =>
                    STORE_DATA.resultdata.JULI >
                      Math.round(getDistance() * 10) / 10 &&
                    setWorkingModalOpen(true)
                  }
                  coordinate={{
                    latitude: lat,
                    longitude: long,
                    // latitude: Number(STORE_DATA.resultdata.LAT) + 0.002,
                    // longitude: Number(STORE_DATA.resultdata.LONG) + 0.002,
                  }}>
                  <UserMarker
                    distance={
                      STORE_DATA.resultdata.JULI == '-1'
                        ? '제한 없음'
                        : STORE_DATA.resultdata.JULI
                    }
                    current={Math.round(getDistance() * 10) / 10}
                  />
                </Marker>
                <Marker
                  coordinate={{
                    latitude: Number(STORE_DATA.resultdata.LAT),
                    longitude: Number(STORE_DATA.resultdata.LONG),
                  }}>
                  <ShopMarker />
                </Marker>
              </MapView>
            </>
          )}
          {STORE == '1' ? ( // 점장 ============================
            <>
              <MenuTitleArea style={{zIndex: 3}}>
                <MenuTitle>더욱 쉬워진,</MenuTitle>
                <Bold> 직원관리</Bold>
              </MenuTitleArea>
              <Container>
                <MenuCntContainer
                  selection={'사업장현황'}
                  paging={'DashBoardScreen'}
                  source={require(`../../../../assets/main/Invite.png`)}
                />
                <MenuCntContainer
                  selection={'직원초대'}
                  paging={'InviteEmployeeScreen'}
                  source={require(`../../../../assets/main/Invite.png`)}
                />
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'직원목록'}
                    paging={'EmployeeListScreen'}
                    source={require(`../../../../assets/main/EmployeeList.png`)}
                  />
                )}
                <MenuCntContainer
                  selection={'직원합류승인'}
                  paging={'ManageInviteEmployeeScreen'}
                  count={invitedEmpCount}
                  source={require(`../../../../assets/main/ManageInviteEmployee.png`)}
                />
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'캘린더'}
                    paging={'CalendarInfoScreen'}
                    source={
                      STORE_DATA?.CalendarEdit == 1
                        ? require('../../../../assets/main/CalendarInfo.png')
                        : require('../../../../assets/main/CalendarInfoEmp.png')
                    }
                  />
                )}
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'급여정보'}
                    paging={'PaymentInfoScreen'}
                    source={require(`../../../../assets/main/PaymentInfo.png`)}
                  />
                )}
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'QR보기'}
                    paging={'qrViewScreen'}
                    source={require(`../../../../assets/main/qrView.png`)}
                  />
                )}
              </Container>
              <MenuTitleArea style={{zIndex: 3}}>
                <MenuTitle>정확한,</MenuTitle>
                <Bold> 업무관리</Bold>
              </MenuTitleArea>
              <Container>
                <MenuCntContainer
                  selection={'체크리스트'}
                  paging={'ChecklistItemsScreen'}
                  count={checklistCount}
                  source={require(`../../../../assets/main/ChecklistItems.png`)}
                />
                <MenuCntContainer
                  selection={'업무일지'}
                  paging={'ChecklistShareMainScreen'}
                  count={NOTICE_COUNT}
                  source={require(`../../../../assets/main/ChecklistShareMain.png`)}
                />
                <MenuCntContainer
                  selection={'유통기한'}
                  paging={'ShelfLifeCheckScreen'}
                  source={require(`../../../../assets/main/shelfLifeCheck.png`)}
                />
                <MenuCntContainer
                  selection={'조기경보'}
                  paging={'HealthCertificateTypeScreen'}
                  source={require(`../../../../assets/main/HealthCertificateType.png`)}
                />
              </Container>
            </>
          ) : (
            <>
              {STORE_DATA?.IS_MANAGER == '1' ? ( // 매니저 ============================
                <>
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>더욱 쉬워진,</MenuTitle>
                    <Bold> 직원관리</Bold>
                  </MenuTitleArea>
                  <Container>
                    <MenuCntContainer
                      selection={'직원초대'}
                      paging={'InviteEmployeeScreen'}
                      source={require(`../../../../assets/main/Invite.png`)}
                    />
                    {TOTAL_COUNT !== 0 &&
                      (STORE_DATA?.OTHERPAY_SHOW == 1 ? (
                        <MenuCntContainer
                          selection={'직원목록'}
                          paging={'EmployeeListScreen'}
                          source={require(`../../../../assets/main/EmployeeList.png`)}
                        />
                      ) : (
                        <MenuCntContainer
                          selection={'직원정보'}
                          paging={'EmployeeInfoEMPScreen'}
                          source={require(`../../../../assets/main/EmployeeInfoEmp.png`)}
                        />
                      ))}
                    <MenuCntContainer
                      selection={'직원합류승인'}
                      paging={'ManageInviteEmployeeScreen'}
                      count={invitedEmpCount}
                      source={require(`../../../../assets/main/ManageInviteEmployee.png`)}
                    />
                    {TOTAL_COUNT !== 0 && STORE_DATA?.CalendarEdit == '1' && (
                      <MenuCntContainer
                        selection={'캘린더'}
                        paging={'CalendarInfoScreen'}
                        source={
                          STORE_DATA?.CalendarEdit == 1
                            ? require(`../../../../assets/main/CalendarInfo.png`)
                            : require(`../../../../assets/main/CalendarInfoEmp.png`)
                        }
                      />
                    )}
                    {TOTAL_COUNT !== 0 && STORE_DATA?.STOREPAY_SHOW == '1' ? (
                      <MenuCntContainer
                        selection={'급여정보'}
                        paging={'PaymentInfoScreen'}
                        source={require(`../../../../assets/main/PaymentInfo.png`)}
                      />
                    ) : (
                      STORE_DATA?.PAY_SHOW == 1 && (
                        <MenuCntContainer
                          selection={'급여정보'}
                          paging={'EmpPayInfoScreen'}
                          source={require(`../../../../assets/main/PaymentInfo.png`)}
                        />
                      )
                    )}
                    {TOTAL_COUNT !== 0 && (
                      <MenuCntContainer
                        selection={'QR보기'}
                        paging={'qrViewScreen'}
                        source={require(`../../../../assets/main/qrView.png`)}
                      />
                    )}
                  </Container>
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>정확한,</MenuTitle>
                    <Bold> 업무관리</Bold>
                  </MenuTitleArea>
                  <Container>
                    <MenuCntContainer
                      selection={'체크리스트'}
                      paging={'ChecklistItemsScreen'}
                      count={checklistCount}
                      source={require(`../../../../assets/main/ChecklistItems.png`)}
                    />
                    <MenuCntContainer
                      selection={'업무일지'}
                      paging={'ChecklistShareMainScreen'}
                      count={NOTICE_COUNT}
                      source={require(`../../../../assets/main/ChecklistShareMain.png`)}
                    />
                    <MenuCntContainer
                      selection={'유통기한'}
                      paging={'ShelfLifeCheckScreen'}
                      source={require(`../../../../assets/main/shelfLifeCheck.png`)}
                    />
                    <MenuCntContainer
                      selection={'조기경보'}
                      paging={'HealthCertificateTypeScreen'}
                      source={require(`../../../../assets/main/HealthCertificateType.png`)}
                    />
                  </Container>
                </>
              ) : (
                // 스태프 ============================
                <>
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>더욱 쉬워진,</MenuTitle>
                    <Bold> 일터관리</Bold>
                  </MenuTitleArea>
                  <Container>
                    <MenuCntContainer
                      selection={'캘린더'}
                      paging={'CalendarInfoScreen'}
                      source={
                        STORE_DATA?.CalendarEdit == 1
                          ? require(`../../../../assets/main/CalendarInfo.png`)
                          : require(`../../../../assets/main/CalendarInfoEmp.png`)
                      }
                    />
                    <MenuCntContainer
                      selection={'직원정보'}
                      paging={'EmployeeInfoEMPScreen'}
                      source={require(`../../../../assets/main/EmployeeInfoEmp.png`)}
                    />
                    {STORE_DATA?.PAY_SHOW == 1 && (
                      <MenuCntContainer
                        selection={'급여정보'}
                        paging={'EmpPayInfoScreen'}
                        source={require(`../../../../assets/main/PaymentInfo.png`)}
                      />
                    )}
                    <MenuCntContainer
                      selection={'체크리스트'}
                      paging={'ChecklistItemsScreen'}
                      count={checklistCount}
                      source={require(`../../../../assets/main/ChecklistItems.png`)}
                    />
                    <MenuCntContainer
                      selection={'업무일지'}
                      paging={'ChecklistShareMainScreen'}
                      count={NOTICE_COUNT}
                      source={require(`../../../../assets/main/ChecklistShareMain.png`)}
                    />
                    <MenuCntContainer
                      selection={'유통기한'}
                      paging={'ShelfLifeCheckScreen'}
                      source={require(`../../../../assets/main/shelfLifeCheck.png`)}
                    />
                    <MenuCntContainer
                      selection={'조기경보'}
                      paging={'HealthCertificateTypeScreen'}
                      source={require(`../../../../assets/main/HealthCertificateType.png`)}
                    />
                  </Container>
                </>
              )}
            </>
          )}
          <GrayLinearGradient
            colors={['#222', '#fff']}
            hasHeight={STORE == '1'}
          />
          <BlackLinearGradient
            colors={['#fff', '#222']}
            hasHeight={STORE_DATA?.IS_MANAGER == '0'}
          />
        </MenuBox>
      </ScrollView>
      <Modal
        isVisible={qrCameraModalOpen}
        onBackdropPress={() => setQrCameraModalOpen(false)}
        onRequestClose={() => setQrCameraModalOpen(false)}
        style={{margin: 0}}
        avoidKeyboard={true}>
        <QRCodeScanner
          topViewStyle={{height: 0, flex: 0}}
          reactivate={true}
          reactivateTimeout={1500}
          cameraStyle={{width: wp('100%'), height: hp('100%')}}
          onRead={handleBarCodeScanned}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: '카메라 권한 설정',
            message:
              '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "샵솔" 앱의 권한 허용을 해야 합니다.',
            buttonPositive: '확인',
            buttonNegative: '취소',
          }}
          permissionDialogTitle={''}
          permissionDialogMessage={''}
          bottomContent={
            <GoWork onPress={() => setQrCameraModalOpen(false)}>
              <WorkText>닫기</WorkText>
            </GoWork>
          }
        />
      </Modal>

      <Modal
        isVisible={workingModalOpen}
        animationOutTiming={1}
        onBackdropPress={() => setWorkingModalOpen(false)}
        onRequestClose={() => setWorkingModalOpen(false)}
        style={{
          marginLeft: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: wp('100%'),
          height: '100%',
        }}>
        {loading ? (
          <LottieView
            style={{width: 200, height: 200}}
            source={require('../../../../assets/animations/loader.json')}
            loop
            autoPlay
          />
        ) : sucessModalOpen ? (
          <GoWorkingSuccessAnimation
            GENDER={GENDER}
            STORE_NAME={STORE_NAME}
            MEMBER_NAME={MEMBER_NAME}
            setSucessModalOpen={setSucessModalOpen}
            actionTYPE={actionTYPE}
          />
        ) : failModalOpen ? (
          <GoWorkingFailAnimation
            STORE_NAME={STORE_NAME}
            MEMBER_NAME={MEMBER_NAME}
            setFailModalOpen={setFailModalOpen}
            actionTYPE={actionTYPE}
            errorMessage={errorMessage}
          />
        ) : (
          <BoxContainer>
            <Box
              style={{
                width: (wp('100%') - 60) / 2,
                height: (wp('100%') - 60) / 2,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}
              onPress={() => goWorkFn(workingTYPE)}>
              <BoxText style={{fontSize: 30}}>출근</BoxText>
            </Box>
            <Box
              style={{
                width: (wp('100%') - 60) / 2,
                height: (wp('100%') - 60) / 2,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}
              onPress={() => leaveWorkFn(workingTYPE)}>
              <BoxText style={{fontSize: 30}}>퇴근</BoxText>
            </Box>
          </BoxContainer>
        )}
      </Modal>

      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={showPictureModal}
        style={{position: 'relative', marginVertical: 20}}
        onBackdropPress={() => setShowPictureModal(false)}
        onRequestClose={() => setShowPictureModal(false)}>
        <ShowPictureModalTouchable
          onPress={() => {
            setShowPictureModal(false);
          }}>
          <ShowPictureModalImage>
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{uri: 'http://133.186.210.223/' + QR}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ShowPictureModalImage>
        </ShowPictureModalTouchable>
      </Modal>
    </BackGround>
  );
};
