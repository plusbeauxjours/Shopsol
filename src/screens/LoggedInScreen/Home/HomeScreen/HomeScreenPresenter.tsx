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

import {HelpIcon, SettingIcon, EyeOffIcon, CloseIcon} from '~/constants/Icons';
import GoWorkingSuccessAnimation from '~/components/GoWorkingSuccessAnimation';
import GoWorkingFailAnimation from '~/components/GoWorkingFailAnimation';
import Ripple from 'react-native-material-ripple';
import styleGuide from '~/constants/styleGuide';

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
  background-color: white;
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
  background-color: ${styleGuide.palette.tertiary};
  border-radius: 20px;
`;

const MenuCnt = styled(Ripple)`
  z-index: 10;
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
  background-color: ${styleGuide.palette.tertiary}; ;
`;

const EyeIconContainer = styled(NewCnt)`
  background-color: white;
  border-color: ${styleGuide.palette.tertiary};
  border-width: 0.7px;
`;

const NewCntText = styled.Text`
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const MenuBox = styled.View`
  padding: 10px;
  background-color: white;
  flex: 1;
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
  margin-top: 70px;
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
  justify-content: center;
  width: 80px
  height: 35px;
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
  background-color: ${styleGuide.palette.tertiary};
`;

const MenuTitle = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const Bold = styled(MenuTitle)`
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const ShowPictureModalTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
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
  background-color: ${styleGuide.palette.primary};
`;

const WorkText = styled.Text`
  color: #ffffff;
  font-size: 14px;
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
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BoxText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
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
  font-size: ${styleGuide.fontSize.small}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const IconCover = styled.View`
  position: absolute;
  z-index: 11;
  width: ${(wp('100%') - 20) / 3 - 12}px;
  height: ${wp('40%') - 12}px;
  background-color: white;
`;

export default ({
  STORE_DATA,
  MEMBER_NAME,
  STORE,
  STORE_SEQ,
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
  isWorkingMode,
  setIsWorkingMode,
  editMode,
  setEditMode,
  storeKeepersStoreMenu,
  storeKeepersEMPMenu,
  managersStoreMenu,
  managersEMPMenu,
  employeesMenu,
  CUSTOM_MENU_STORE,
  CUSTOM_MENU_EMP,
  addCUSTOM_MENU_STORE_Fn,
  addCUSTOM_MENU_EMP_Fn,
  removeCUSTOM_MENU_STORE_Fn,
  removeCUSTOM_MENU_EMP_Fn,
  AVATAR,
  initLoading,
}) => {
  const navigation = useNavigation();
  const MenuCntContainer = ({
    type,
    index,
    selection,
    paging,
    source,
    count = 0,
  }) => (
    <MenuCnt
      rippleColor={'white'}
      rippleDuration={300}
      rippleSize={200}
      rippleContainerBorderRadius={0}
      rippleOpacity={0.9}
      style={{zIndex: 4}}
      activeOpacity={0.3}
      onPress={() => {
        editMode && type == 'store'
          ? addCUSTOM_MENU_STORE_Fn(index)
          : editMode && type == 'emp'
          ? addCUSTOM_MENU_EMP_Fn(index)
          : selection == 'QR보기'
          ? setShowPictureModal(true)
          : navigation.navigate(`${paging}`);
      }}>
      {(selection == '직원합류승인' || selection == '업무일지') &&
        !initLoading &&
        count !== 0 &&
        count && (
          <NewCnt style={{zIndex: 15}}>
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

  const HiddenMenuCntContainer = ({type, index, selection, paging, source}) => (
    <MenuCnt
      rippleColor={'white'}
      rippleDuration={300}
      rippleSize={200}
      rippleContainerBorderRadius={0}
      rippleOpacity={0.9}
      style={{zIndex: 4}}
      activeOpacity={0.3}
      onPress={() => {
        editMode && type == 'store'
          ? removeCUSTOM_MENU_STORE_Fn(
              CUSTOM_MENU_STORE[STORE_SEQ]?.filter((i) => i !== index),
            )
          : editMode && type == 'emp'
          ? removeCUSTOM_MENU_EMP_Fn(
              CUSTOM_MENU_EMP[STORE_SEQ]?.filter((i) => i !== index),
            )
          : selection == 'QR보기'
          ? setShowPictureModal(true)
          : navigation.navigate(`${paging}`);
      }}>
      <EyeIconContainer style={{zIndex: 5}}>
        <EyeOffIcon color={styleGuide.palette.tertiary} />
      </EyeIconContainer>
      <FastImage
        style={{width: '100%', height: '100%', opacity: 0.3}}
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
          {STORE_DATA.resultdata.JULI == -1 ? (
            <MarkerText>출퇴근 거리 제한 없음</MarkerText>
          ) : (
            <>
              <MarkerText>출퇴근 허용거리: </MarkerText>
              <MarkerText style={{fontWeight: '600'}}>
                {Number(STORE_DATA.resultdata.JULI) < 1000
                  ? Number(STORE_DATA.resultdata.JULI) + 'm'
                  : Number(STORE_DATA.resultdata.JULI) / 1000 + 'km'}
              </MarkerText>
            </>
          )}
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
              uri: `http://133.186.210.223/uploads/${AVATAR}`,
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
                  fontWeight: '600',
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
                    fontSize: 14,
                    alignSelf: 'flex-end',
                  }}>
                  <WhiteText>{TOTAL_COUNT}</WhiteText>명 중&nbsp;
                  <WhiteText>{WORKING_COUNT}</WhiteText>명 근무중
                </Text>
              ) : (
                <Text style={{color: 'white', fontSize: 14}}>
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
                <WhiteText>사업장 전환</WhiteText>
              </StoreUpdateBtn>
              {STORE === '1' && (
                <StoreUpdateBtn
                  onPress={() => {
                    navigation.navigate('UpdateStoreScreen');
                  }}>
                  <WhiteText>사업장 정보</WhiteText>
                </StoreUpdateBtn>
              )}
              <StoreUpdateBtn
                onPress={() => {
                  navigation.navigate('MyPageMainScreen');
                }}>
                <WhiteText>마이 페이지</WhiteText>
              </StoreUpdateBtn>
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
                      setIsWorkingMode(false);
                      setSucessModalOpen(false);
                      setFailModalOpen(false);
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
                    (STORE_DATA.resultdata.JULI >
                      Math.round(getDistance() * 10) / 10 ||
                      STORE_DATA.resultdata.JULI == -1) &&
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
          {STORE == '1' ? ( // 사업주 ============================
            <>
              <SpaceRow style={{width: '100%', alignItems: 'center'}}>
                <MenuTitleArea style={{zIndex: 3}}>
                  <MenuTitle>더욱 쉬워진,</MenuTitle>
                  <Bold> 직원관리</Bold>
                </MenuTitleArea>
                <Row>
                  <IconContainer
                    onPress={() => {
                      navigation.navigate('HelpModalScreen');
                    }}>
                    <HelpIcon size={22} />
                  </IconContainer>
                  <IconContainer onPress={() => setEditMode(!editMode)}>
                    {editMode ? (
                      <CloseIcon size={24} color={'white'} />
                    ) : (
                      <SettingIcon size={20} color={'white'} />
                    )}
                  </IconContainer>
                </Row>
              </SpaceRow>
              <Container>
                {storeKeepersStoreMenu?.map((menu, index) => {
                  if (
                    CUSTOM_MENU_STORE &&
                    !CUSTOM_MENU_STORE[STORE_SEQ]?.includes(index)
                  ) {
                    if (
                      menu.paging == 'EmployeeListScreen' ||
                      menu.paging == 'CalendarInfoScreen' ||
                      menu.paging == 'PaymentInfoScreen' ||
                      menu.paging == 'qrViewScreen'
                    ) {
                      if (TOTAL_COUNT !== 0) {
                        return (
                          <MenuCntContainer
                            key={index}
                            type={'store'}
                            index={index}
                            selection={menu.selection}
                            paging={menu.paging}
                            count={menu.count}
                            source={menu.source}
                          />
                        );
                      }
                    } else if (
                      menu.paging == 'DashBoardScreen' ||
                      menu.paging == 'InviteEmployeeScreen' ||
                      menu.paging == 'ManageInviteEmployeeScreen'
                    ) {
                      return (
                        <MenuCntContainer
                          key={index}
                          type={'store'}
                          index={index}
                          selection={menu.selection}
                          paging={menu.paging}
                          count={menu.count}
                          source={menu.source}
                        />
                      );
                    } else {
                      return null;
                    }
                  }
                })}
                {editMode &&
                  storeKeepersStoreMenu?.map((menu, index) => {
                    if (
                      CUSTOM_MENU_STORE &&
                      CUSTOM_MENU_STORE[STORE_SEQ]?.includes(index)
                    ) {
                      if (
                        menu.paging == 'EmployeeListScreen' ||
                        menu.paging == 'CalendarInfoScreen' ||
                        menu.paging == 'PaymentInfoScreen' ||
                        menu.paging == 'qrViewScreen'
                      ) {
                        if (TOTAL_COUNT !== 0) {
                          return (
                            <HiddenMenuCntContainer
                              key={index}
                              type={'store'}
                              index={index}
                              selection={menu.selection}
                              paging={menu.paging}
                              source={menu.source}
                            />
                          );
                        }
                      } else if (
                        menu.paging == 'DashBoardScreen' ||
                        menu.paging == 'InviteEmployeeScreen' ||
                        menu.paging == 'ManageInviteEmployeeScreen'
                      ) {
                        return (
                          <HiddenMenuCntContainer
                            key={index}
                            type={'store'}
                            index={index}
                            selection={menu.selection}
                            paging={menu.paging}
                            source={menu.source}
                          />
                        );
                      } else {
                        return null;
                      }
                    }
                  })}
              </Container>
              <MenuTitleArea style={{zIndex: 3}}>
                <MenuTitle>정확한,</MenuTitle>
                <Bold> 업무관리</Bold>
              </MenuTitleArea>
              <Container>
                {storeKeepersEMPMenu.map((menu, index) => {
                  if (
                    CUSTOM_MENU_EMP &&
                    !CUSTOM_MENU_EMP[STORE_SEQ]?.includes(index)
                  ) {
                    return (
                      <MenuCntContainer
                        key={index}
                        index={index}
                        type={'emp'}
                        selection={menu.selection}
                        paging={menu.paging}
                        count={menu.count}
                        source={menu.source}
                      />
                    );
                  }
                })}
                {editMode &&
                  storeKeepersEMPMenu.map((menu, index) => {
                    if (
                      CUSTOM_MENU_EMP &&
                      CUSTOM_MENU_EMP[STORE_SEQ]?.includes(index)
                    ) {
                      return (
                        <HiddenMenuCntContainer
                          key={index}
                          index={index}
                          type={'emp'}
                          selection={menu.selection}
                          paging={menu.paging}
                          source={menu.source}
                        />
                      );
                    }
                  })}
              </Container>
            </>
          ) : (
            <>
              {STORE_DATA?.IS_MANAGER == '1' ? (
                <>
                  <SpaceRow style={{width: '100%', alignItems: 'center'}}>
                    <MenuTitleArea style={{zIndex: 3}}>
                      <MenuTitle>더욱 쉬워진,</MenuTitle>
                      <Bold> 직원관리</Bold>
                    </MenuTitleArea>
                    <Row>
                      <IconContainer onPress={() => setEditMode(!editMode)}>
                        {editMode ? (
                          <CloseIcon size={24} color={'white'} />
                        ) : (
                          <SettingIcon size={20} color={'white'} />
                        )}
                      </IconContainer>
                    </Row>
                  </SpaceRow>
                  {initLoading ? (
                    <Container style={{justifyContent: 'center'}}>
                      <LottieView
                        style={{
                          marginTop: 20,
                          width: 160,
                          height: 160,
                        }}
                        source={require('../../../../assets/animations/dashBoardLoader.json')}
                        loop
                        autoPlay
                      />
                    </Container>
                  ) : (
                    <>
                      <Container>
                        {managersStoreMenu?.map((menu, index) => {
                          if (
                            CUSTOM_MENU_STORE &&
                            !CUSTOM_MENU_STORE[STORE_SEQ]?.includes(index)
                          ) {
                            if (
                              menu.paging == 'EmployeeListScreen' &&
                              TOTAL_COUNT !== 0 &&
                              STORE_DATA?.OTHERPAY_SHOW == 1
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else if (
                              menu.paging == 'EmployeeInfoEMPScreen' &&
                              TOTAL_COUNT !== 0 &&
                              STORE_DATA?.OTHERPAY_SHOW !== 1
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else if (
                              menu.paging == 'CalendarInfoScreen' &&
                              TOTAL_COUNT !== 0 &&
                              STORE_DATA?.CalendarEdit == '1'
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else if (
                              menu.paging == 'PaymentInfoScreen' &&
                              TOTAL_COUNT !== 0 &&
                              STORE_DATA?.STOREPAY_SHOW == '1'
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else if (
                              menu.paging == 'EmpPayInfoScreen' &&
                              TOTAL_COUNT !== 0 &&
                              STORE_DATA?.STOREPAY_SHOW !== '1' &&
                              STORE_DATA?.PAY_SHOW == 1
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else if (menu.paging == 'qrViewScreen') {
                              if (TOTAL_COUNT !== 0) {
                                return (
                                  <MenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              }
                            } else if (
                              menu.paging == 'DashBoardScreen' ||
                              menu.paging == 'InviteEmployeeScreen' ||
                              menu.paging == 'ManageInviteEmployeeScreen'
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else {
                              return null;
                            }
                          }
                        })}
                        {editMode &&
                          managersStoreMenu?.map((menu, index) => {
                            if (
                              CUSTOM_MENU_STORE &&
                              CUSTOM_MENU_STORE[STORE_SEQ]?.includes(index)
                            ) {
                              if (
                                menu.paging == 'EmployeeListScreen' &&
                                TOTAL_COUNT !== 0 &&
                                STORE_DATA?.OTHERPAY_SHOW == 1
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else if (
                                menu.paging == 'EmployeeInfoEMPScreen' &&
                                TOTAL_COUNT !== 0 &&
                                STORE_DATA?.OTHERPAY_SHOW !== 1
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else if (
                                menu.paging == 'CalendarInfoScreen' &&
                                TOTAL_COUNT !== 0 &&
                                STORE_DATA?.CalendarEdit == '1'
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else if (
                                menu.paging == 'PaymentInfoScreen' &&
                                TOTAL_COUNT !== 0 &&
                                STORE_DATA?.STOREPAY_SHOW == '1'
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else if (
                                menu.paging == 'EmpPayInfoScreen' &&
                                TOTAL_COUNT !== 0 &&
                                STORE_DATA?.STOREPAY_SHOW !== '1' &&
                                STORE_DATA?.PAY_SHOW == 1
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else if (menu.paging == 'qrViewScreen') {
                                if (TOTAL_COUNT !== 0) {
                                  return (
                                    <HiddenMenuCntContainer
                                      key={index}
                                      type={'store'}
                                      index={index}
                                      selection={menu.selection}
                                      paging={menu.paging}
                                      count={menu.count}
                                      source={menu.source}
                                    />
                                  );
                                }
                              } else if (
                                menu.paging == 'DashBoardScreen' ||
                                menu.paging == 'InviteEmployeeScreen' ||
                                menu.paging == 'ManageInviteEmployeeScreen'
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else {
                                return null;
                              }
                            }
                          })}
                      </Container>
                      <MenuTitleArea style={{zIndex: 3}}>
                        <MenuTitle>정확한,</MenuTitle>
                        <Bold> 업무관리</Bold>
                      </MenuTitleArea>
                      <Container>
                        {managersEMPMenu.map((menu, index) => {
                          if (
                            CUSTOM_MENU_EMP &&
                            !CUSTOM_MENU_EMP[STORE_SEQ]?.includes(index)
                          ) {
                            return (
                              <MenuCntContainer
                                key={index}
                                index={index}
                                type={'emp'}
                                selection={menu.selection}
                                paging={menu.paging}
                                count={menu.count}
                                source={menu.source}
                              />
                            );
                          }
                        })}
                        {editMode &&
                          managersEMPMenu.map((menu, index) => {
                            if (
                              CUSTOM_MENU_EMP &&
                              CUSTOM_MENU_EMP[STORE_SEQ]?.includes(index)
                            ) {
                              return (
                                <HiddenMenuCntContainer
                                  key={index}
                                  index={index}
                                  type={'emp'}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  source={menu.source}
                                />
                              );
                            }
                          })}
                      </Container>
                    </>
                  )}
                </>
              ) : (
                // 직원 ============================
                <>
                  <SpaceRow style={{width: '100%', alignItems: 'center'}}>
                    <MenuTitleArea style={{zIndex: 3}}>
                      <MenuTitle>더욱 쉬워진,</MenuTitle>
                      <Bold> 일터관리</Bold>
                    </MenuTitleArea>
                    <Row>
                      <IconContainer onPress={() => setEditMode(!editMode)}>
                        {editMode ? (
                          <CloseIcon size={24} color={'white'} />
                        ) : (
                          <SettingIcon size={20} color={'white'} />
                        )}
                      </IconContainer>
                    </Row>
                  </SpaceRow>
                  {initLoading ? (
                    <Container style={{justifyContent: 'center'}}>
                      <LottieView
                        style={{
                          marginTop: 20,
                          width: 160,
                          height: 160,
                        }}
                        source={require('../../../../assets/animations/dashBoardLoader.json')}
                        loop
                        autoPlay
                      />
                    </Container>
                  ) : (
                    <>
                      <Container>
                        {employeesMenu.map((menu, index) => {
                          if (
                            CUSTOM_MENU_EMP &&
                            !CUSTOM_MENU_EMP[STORE_SEQ]?.includes(index)
                          ) {
                            if (
                              menu.paging == 'EmpPayInfoScreen' &&
                              STORE_DATA?.PAY_SHOW == 1
                            ) {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  type={'store'}
                                  index={index}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            } else {
                              return (
                                <MenuCntContainer
                                  key={index}
                                  index={index}
                                  type={'emp'}
                                  selection={menu.selection}
                                  paging={menu.paging}
                                  count={menu.count}
                                  source={menu.source}
                                />
                              );
                            }
                          }
                        })}
                        {editMode &&
                          employeesMenu.map((menu, index) => {
                            if (
                              CUSTOM_MENU_EMP &&
                              CUSTOM_MENU_EMP[STORE_SEQ]?.includes(index)
                            ) {
                              if (
                                menu.paging == 'EmpPayInfoScreen' &&
                                STORE_DATA?.PAY_SHOW == 1
                              ) {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    type={'store'}
                                    index={index}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              } else {
                                return (
                                  <HiddenMenuCntContainer
                                    key={index}
                                    index={index}
                                    type={'emp'}
                                    selection={menu.selection}
                                    paging={menu.paging}
                                    count={menu.count}
                                    source={menu.source}
                                  />
                                );
                              }
                            }
                          })}
                      </Container>
                    </>
                  )}
                </>
              )}
            </>
          )}
          <GrayLinearGradient
            colors={['#222', 'white']}
            hasHeight={STORE == '1'}
          />
        </MenuBox>
      </ScrollView>
      <Modal
        isVisible={qrCameraModalOpen}
        onBackdropPress={() => {
          setQrCameraModalOpen(false);
          setSucessModalOpen(false);
          setFailModalOpen(false);
          setIsWorkingMode(false);
        }}
        onRequestClose={() => {
          setQrCameraModalOpen(false);
          setSucessModalOpen(false);
          setFailModalOpen(false);
          setIsWorkingMode(false);
        }}
        avoidKeyboard={true}
        style={{
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
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
            AVATAR={AVATAR}
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
        ) : isWorkingMode ? (
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
        ) : (
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
              <GoWork
                onPress={() => {
                  setQrCameraModalOpen(false);
                  setSucessModalOpen(false);
                  setFailModalOpen(false);
                  setIsWorkingMode(false);
                }}>
                <WorkText>닫기</WorkText>
              </GoWork>
            }
          />
        )}
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
