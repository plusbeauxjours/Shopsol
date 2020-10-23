import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

import {
  ForwardIcon,
  HelpIcon,
  SettingIcon,
  QrCodeIcon,
} from '~/constants/Icons';
import GoWorkingSuccessAnimation from '~/components/GoWorkingSuccessAnimation';
import GoWorkingFailAnimation from '~/components/GoWorkingFailAnimation';

interface IHasHeight {
  hasHeight: boolean;
}

interface ITheme {
  distance?: string | number;
  current?: string | number;
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

const MenuCnt = styled.TouchableOpacity`
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
  padding: 0 10px;
  padding-bottom: 15px;
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

const QrText = styled.Text`
  margin-right: 15px;
  font-weight: bold;
  font-size: 22px;
  color: #e85356;
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

const WorkingModalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
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

const WorkStartButton = styled.TouchableOpacity`
  height: ${hp('20%')}px;
  width: ${wp('50%')}px;
  align-items: center;
  justify-content: center;
`;

const WorkEndButton = styled(WorkStartButton)`
  border-left-width: 1px;
`;

const WorkStartBtnText = styled.Text`
  font-size: 24px;
  color: #e85356;
`;

const WorkEndBtnText = styled(WorkStartBtnText)`
  color: #e85356;
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

const Box = styled.TouchableOpacity`
  width: 160px;
  height: 70px;
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
  qrWorkingModalOpen,
  setShowPictureModal,
  showPictureModal,
  goWorkFn,
  leaveWorkFn,
  handleBarCodeScanned,
  invitedEmpCount,
  checklistCount,
  noticeCount,
  QR,
  isGpsVisible,
  setIsGpsVisible,
  lat,
  long,
  getDistance,
  GPS,
  mapWorkingModalOpen,
  setMapWorkingModalOpen,
  sucessModalOpen,
  setSucessModalOpen,
  failModalOpen,
  setFailModalOpen,
  actionTYPE,
  errorMessage,
}) => {
  const navigation = useNavigation();
  const MenuCntContainer = ({selection, paging, count = 0}) => (
    <MenuCnt
      style={{zIndex: 4}}
      activeOpacity={0.6}
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
      <AdrChange paging={paging} />
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
              uri: 'http://133.186.210.223/uploads/3.png',
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

  const AdrChange = ({paging}) => {
    let source;
    if (paging == 'InviteEmployeeScreen') {
      source = require(`../../../../assets/main/Invite.png`);
    } else if (paging == 'EmployeeListScreen') {
      source = require(`../../../../assets/main/EmployeeList.png`);
    } else if (paging == 'ManageInviteEmployeeScreen') {
      source = require(`../../../../assets/main/ManageInviteEmployee.png`);
    } else if (
      paging == 'CalendarInfoScreen' &&
      STORE_DATA?.CalendarEdit == 1
    ) {
      source = require(`../../../../assets/main/CalendarInfo.png`);
    } else if (
      paging == 'CalendarInfoScreen' &&
      STORE_DATA?.CalendarEdit !== 1
    ) {
      source = require(`../../../../assets/main/CalendarInfoEmp.png`);
    } else if (paging == 'PaymentInfoScreen') {
      source = require(`../../../../assets/main/PaymentInfo.png`);
    } else if (paging == 'EmpPaymentInfoScreen') {
      source = require(`../../../../assets/main/PaymentInfo.png`);
    } else if (paging == 'EmployeeInfoEMPScreen') {
      source = require(`../../../../assets/main/EmployeeInfoEmp.png`);
    } else if (paging == 'qrViewScreen') {
      source = require(`../../../../assets/main/qrView.png`);
    } else if (paging == 'ChecklistItemsScreen') {
      source = require(`../../../../assets/main/ChecklistItems.png`);
    } else if (paging == 'ChecklistShareMainScreen') {
      source = require(`../../../../assets/main/ChecklistShareMain.png`);
    } else if (paging == 'ShelfLifeCheckScreen') {
      source = require(`../../../../assets/main/shelfLifeCheck.png`);
    } else if (paging == 'HealthCertificateTypeScreen') {
      source = require(`../../../../assets/main/HealthCertificateType.png`);
    }
    return (
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={source}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  };
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
                <Qr onPress={() => setQrCameraModalOpen(true)}>
                  <QrText>출퇴근하기</QrText>
                  <QrCodeIcon />
                </Qr>
              ) : (
                <BoxContainer>
                  <Box onPress={() => setQrCameraModalOpen(true)}>
                    <BoxText>QR출퇴근하기</BoxText>
                  </Box>
                  <Box onPress={() => setIsGpsVisible(!isGpsVisible)}>
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
                  // latitude: lat,
                  // longitude: long,
                  latitude: Number(STORE_DATA.resultdata.LAT) + 0.002,
                  longitude: Number(STORE_DATA.resultdata.LONG) + 0.002,
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
                    Math.round(getDistance() * 10) / 10
                      ? setMapWorkingModalOpen(true)
                      : {}
                  }
                  coordinate={{
                    // latitude: lat,
                    // longitude: long,
                    latitude: Number(STORE_DATA.resultdata.LAT) + 0.002,
                    longitude: Number(STORE_DATA.resultdata.LONG) + 0.002,
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
          {STORE == '1' ? ( // 점주 ============================
            <>
              <MenuTitleArea style={{zIndex: 3}}>
                <MenuTitle>더욱 쉬워진,</MenuTitle>
                <Bold> 직원관리</Bold>
              </MenuTitleArea>
              <Container>
                <MenuCntContainer
                  selection={'직원초대'}
                  paging={'InviteEmployeeScreen'}
                />
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'직원목록'}
                    paging={'EmployeeListScreen'}
                  />
                )}
                <MenuCntContainer
                  selection={'직원합류승인'}
                  paging={'ManageInviteEmployeeScreen'}
                  count={invitedEmpCount}
                />
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'캘린더'}
                    paging={'CalendarInfoScreen'}
                  />
                )}
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'급여정보'}
                    paging={'PaymentInfoScreen'}
                  />
                )}
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'QR보기'}
                    paging={'qrViewScreen'}
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
                />
                <MenuCntContainer
                  selection={'업무일지'}
                  paging={'ChecklistShareMainScreen'}
                  count={noticeCount}
                />
                <MenuCntContainer
                  selection={'유통기한'}
                  paging={'ShelfLifeCheckScreen'}
                />
                <MenuCntContainer
                  selection={'조기경보'}
                  paging={'HealthCertificateTypeScreen'}
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
                    />
                    {TOTAL_COUNT !== 0 &&
                      (STORE_DATA?.OTHERPAY_SHOW == 1 ? (
                        <MenuCntContainer
                          selection={'직원목록'}
                          paging={'EmployeeListScreen'}
                        />
                      ) : (
                        <MenuCntContainer
                          selection={'직원정보'}
                          paging={'EmployeeInfoEMPScreen'}
                        />
                      ))}
                    <MenuCntContainer
                      selection={'직원합류승인'}
                      paging={'ManageInviteEmployeeScreen'}
                      count={invitedEmpCount}
                    />
                    {TOTAL_COUNT !== 0 && STORE_DATA?.CalendarEdit == '1' && (
                      <MenuCntContainer
                        selection={'캘린더'}
                        paging={'CalendarInfoScreen'}
                      />
                    )}
                    {TOTAL_COUNT !== 0 && STORE_DATA?.STOREPAY_SHOW == '1' ? (
                      <MenuCntContainer
                        selection={'급여정보'}
                        paging={'PaymentInfoScreen'}
                      />
                    ) : (
                      STORE_DATA?.PAY_SHOW == 1 && (
                        <MenuCntContainer
                          selection={'급여정보'}
                          paging={'EmpPaymentInfoScreen'}
                        />
                      )
                    )}
                    {TOTAL_COUNT !== 0 && (
                      <MenuCntContainer
                        selection={'QR보기'}
                        paging={'qrViewScreen'}
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
                    />
                    <MenuCntContainer
                      selection={'업무일지'}
                      paging={'ChecklistShareMainScreen'}
                      count={noticeCount}
                    />
                    <MenuCntContainer
                      selection={'유통기한'}
                      paging={'ShelfLifeCheckScreen'}
                    />
                    <MenuCntContainer
                      selection={'조기경보'}
                      paging={'HealthCertificateTypeScreen'}
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
                    />
                    <MenuCntContainer
                      selection={'직원정보'}
                      paging={'EmployeeInfoEMPScreen'}
                    />
                    {STORE_DATA?.PAY_SHOW == 1 && (
                      <MenuCntContainer
                        selection={'급여정보'}
                        paging={'EmpPaymentInfoScreen'}
                      />
                    )}
                    <MenuCntContainer
                      selection={'체크리스트'}
                      paging={'ChecklistItemsScreen'}
                      count={checklistCount}
                    />
                    <MenuCntContainer
                      selection={'업무일지'}
                      paging={'ChecklistShareMainScreen'}
                      count={noticeCount}
                    />
                    <MenuCntContainer
                      selection={'유통기한'}
                      paging={'ShelfLifeCheckScreen'}
                    />
                    <MenuCntContainer
                      selection={'조기경보'}
                      paging={'HealthCertificateTypeScreen'}
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
        isVisible={qrWorkingModalOpen}
        animationOutTiming={1}
        onRequestClose={() => setQrCameraModalOpen(false)}
        onBackdropPress={() => setQrCameraModalOpen(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <WorkingModalContainer>
          <WorkStartButton onPress={() => goWorkFn('QR')}>
            <WorkStartBtnText>출근</WorkStartBtnText>
          </WorkStartButton>
          <WorkEndButton onPress={() => leaveWorkFn('QR')}>
            <WorkEndBtnText>퇴근</WorkEndBtnText>
          </WorkEndButton>
        </WorkingModalContainer>
      </Modal>
      <Modal
        isVisible={mapWorkingModalOpen}
        animationOutTiming={1}
        onRequestClose={() => setMapWorkingModalOpen(false)}
        onBackdropPress={() => setMapWorkingModalOpen(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <WorkingModalContainer>
          <WorkStartButton onPress={() => goWorkFn('GPS')}>
            <WorkStartBtnText>출근</WorkStartBtnText>
          </WorkStartButton>
          <WorkEndButton onPress={() => leaveWorkFn('GPS')}>
            <WorkEndBtnText>퇴근</WorkEndBtnText>
          </WorkEndButton>
        </WorkingModalContainer>
      </Modal>
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
              '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
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
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={showPictureModal}
        style={{position: 'relative', marginVertical: hp('5%')}}
        onBackdropPress={() => setShowPictureModal(false)}
        onRequestClose={() => setShowPictureModal(false)}>
        <ShowPictureModalTouchable
          onPress={() => {
            setShowPictureModal(false);
          }}>
          <ShowPictureModalText>출퇴근 QR</ShowPictureModalText>
          <ShowPictureModalImage>
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{uri: 'http://133.186.210.223/' + QR}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ShowPictureModalImage>
        </ShowPictureModalTouchable>
      </Modal>
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={sucessModalOpen}
        style={{
          position: 'relative',
          marginVertical: hp('5%'),
          alignItems: 'center',
        }}
        onBackdropPress={() => setSucessModalOpen(false)}
        onRequestClose={() => setSucessModalOpen(false)}>
        <GoWorkingSuccessAnimation
          STORE_NAME={STORE_NAME}
          MEMBER_NAME={MEMBER_NAME}
          setSucessModalOpen={setSucessModalOpen}
          actionTYPE={actionTYPE}
        />
      </Modal>
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={failModalOpen}
        style={{
          position: 'relative',
          marginVertical: hp('5%'),
          alignItems: 'center',
        }}
        onBackdropPress={() => setFailModalOpen(false)}
        onRequestClose={() => setFailModalOpen(false)}>
        <GoWorkingFailAnimation
          STORE_NAME={STORE_NAME}
          MEMBER_NAME={MEMBER_NAME}
          setFailModalOpen={setFailModalOpen}
          actionTYPE={actionTYPE}
          errorMessage={errorMessage}
        />
      </Modal>
    </BackGround>
  );
};
