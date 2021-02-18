import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {removeAddWork} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import {
  ForwardIcon,
  TimerIcon,
  CalendarTimesIcon,
  LocationIcon,
} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import {NavigateIcon} from '~/constants/Icons';
import FastImage from 'react-native-fast-image';
import utils from '~/constants/utils';

interface ITheme {
  distance?: string | number;
  current?: string | number;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const IconContainer = styled.View`
  width: 20px;
  justify-content: center;
  margin-right: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Card = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
`;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px 0;
  background-color: white;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 100px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;

const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.tertiary};
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
`;

const Footer = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${styleGuide.palette.primary};
`;

const FooterText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 15px;
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

const MenuTitle = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const Column = styled.View`
  flex-direction: column;
`;

export default ({route: {params}}) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);

  const [workOnMapModalOpen, setWorkOnMapModalOpen] = useState<boolean>(false);
  const [workOffMapModalOpen, setWorkOffMapModalOpen] = useState<boolean>(
    false,
  );

  const {
    data: {SCH_ID = null, MEMBER_SEQ = null} = {},
    date = null,
    addWork = null,
  } = params;
  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        deleteAddWorkFn();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteAddWorkFn = async () => {
    try {
      dispatch(
        removeAddWork({
          MEMBER_SEQ,
          DATE: date,
        }),
      );
      navigation.goBack();
      alertModal('추가일정 삭제완료');
      await api.deleteSchedule({SCH_ID});
    } catch (e) {
      console.log(e);
    }
  };

  const moveMap = (lat, long) => {
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

  const getDistance = (lat, long) => {
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

  const ShopMarker = () => (
    <MarkerWrapper style={{zIndex: 10}}>
      <ShopMarkerContainer>
        <MenuTitle style={{marginBottom: 5}}>
          {STORE_DATA.resultdata.NAME}점
        </MenuTitle>
        <SpaceRow>
          {STORE_DATA?.resultdata?.JULI == -1 ? (
            <MarkerText>출퇴근 거리 제한 없음</MarkerText>
          ) : STORE_DATA?.resultdata?.JULI == -2 ? (
            <MarkerText>재택근무</MarkerText>
          ) : (
            <>
              <MarkerText>출퇴근 허용거리: </MarkerText>
              <MarkerText style={{fontWeight: '600'}}>
                {Number(STORE_DATA?.resultdata?.JULI) < 1000
                  ? Number(STORE_DATA?.resultdata?.JULI) + 'm'
                  : Number(STORE_DATA?.resultdata?.JULI) / 1000 + 'km'}
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

  const UserMarker = ({distance, current, time}) => (
    <MarkerWrapper style={{zIndex: 50}}>
      <UserMarkerContainer distance={distance} current={current}>
        <Row style={{alignItems: 'flex-start'}}>
          <FastImage
            style={{
              top: 0,
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
            }}
            source={{
              uri: utils.getUriImage(params?.data.IMAGE),
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Column>
            <MarkerText
              style={{fontSize: 16, fontWeight: '400', textAlign: 'right'}}>
              {params?.data.NAME}님
            </MarkerText>
            <MarkerText style={{marginTop: 10}}>
              {STORE_DATA.resultdata.NAME}점까지 거리
            </MarkerText>
            <MarkerText style={{textAlign: 'right'}}>
              {Number(
                Math.round(
                  getDistance(
                    params?.data.WORK_ON_LAT,
                    params?.data.WORK_ON_LON,
                  ) * 10,
                ) / 10,
              ) < 1000
                ? Math.round(
                    getDistance(
                      params?.data.WORK_ON_LAT,
                      params?.data.WORK_ON_LON,
                    ) * 10,
                  ) /
                    10 +
                  'm'
                : Math.round(
                    getDistance(
                      params?.data.WORK_ON_LAT,
                      params?.data.WORK_ON_LON,
                    ) * 10,
                  ) /
                    10000 +
                  'km'}
            </MarkerText>
            <MarkerText style={{marginTop: 10, textAlign: 'right'}}>
              출근 시간
            </MarkerText>
            <MarkerText style={{textAlign: 'right'}}>{time}</MarkerText>
          </Column>
        </Row>
      </UserMarkerContainer>
      <UserMarkerTriangle distance={distance} current={current} />
    </MarkerWrapper>
  );

  return (
    <>
      <BackGround>
        <Container>
          <Section>
            <Card
              onPress={() =>
                navigation.navigate('WorkDayRestTypeScreen', {
                  data: params?.data,
                  date,
                })
              }>
              <Row>
                <IconContainer>
                  <CalendarTimesIcon color={styleGuide.palette.secondary} />
                </IconContainer>
                <Text>휴무 설정</Text>
              </Row>
              <ForwardIcon color={styleGuide.palette.primary} />
            </Card>
            <Card
              onPress={() =>
                navigation.navigate('WorkDayRestTimeScreen', {
                  data: params?.data,
                  date,
                })
              }>
              <Row>
                <IconContainer>
                  <TimerIcon color={styleGuide.palette.secondary} />
                </IconContainer>
                <Text>휴게시간 설정</Text>
              </Row>
              <ForwardIcon color={styleGuide.palette.primary} />
            </Card>
            {params?.data.WORK_ON_LAT && params?.data.WORK_ON_LAT !== '0' && (
              <Card onPress={() => setWorkOnMapModalOpen(true)}>
                <Row>
                  <IconContainer>
                    <LocationIcon
                      color={styleGuide.palette.secondary}
                      size={22}
                    />
                  </IconContainer>
                  <Text>출근위치 확인</Text>
                </Row>
                <ForwardIcon color={styleGuide.palette.primary} />
              </Card>
            )}
            {params?.data.WORK_OFF_LAT && params?.data.WORK_OFF_LAT !== '0' && (
              <Card onPress={() => setWorkOffMapModalOpen(true)}>
                <Row>
                  <IconContainer>
                    <LocationIcon
                      color={styleGuide.palette.secondary}
                      size={22}
                    />
                  </IconContainer>
                  <Text>퇴근위치 확인</Text>
                </Row>
                <ForwardIcon color={styleGuide.palette.primary} />
              </Card>
            )}
            {addWork == 'addWork' && (
              <Card
                onPress={() =>
                  confirmModal('', `추가일정을 삭제합니다`, '취소', '삭제')
                }>
                <Text style={{marginLeft: 40}}>추가일정 삭제</Text>
                <ForwardIcon color={styleGuide.palette.primary} />
              </Card>
            )}
          </Section>
        </Container>
      </BackGround>
      <Modal
        isVisible={workOnMapModalOpen}
        onBackdropPress={() => setWorkOnMapModalOpen(false)}
        onRequestClose={() => setWorkOnMapModalOpen(false)}
        avoidKeyboard={true}
        style={{margin: 0}}>
        <MapView
          ref={mapRef}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: parseFloat(params?.data.WORK_ON_LAT),
            longitude: parseFloat(params?.data.WORK_ON_LON),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {STORE_DATA?.resultdata?.JULI !== -1 && (
            <Circle
              zIndex={0}
              radius={STORE_DATA?.resultdata?.JULI}
              strokeWidth={0}
              fillColor={
                getDistance(
                  params?.data.WORK_ON_LAT,
                  params?.data.WORK_ON_LON,
                ) < STORE_DATA?.resultdata?.JULI
                  ? 'rgba(0, 230, 64, 0.2)'
                  : 'rgba(240, 52, 52, 0.2)'
              }
              strokeColor={
                getDistance(
                  params?.data.WORK_ON_LAT,
                  params?.data.WORK_ON_LON,
                ) < STORE_DATA?.resultdata?.JULI
                  ? 'rgba(0, 230, 64, 1)'
                  : 'rgba(240, 52, 52, 1)'
              }
              center={{
                latitude: parseFloat(STORE_DATA.resultdata.LAT),
                longitude: parseFloat(STORE_DATA.resultdata.LONG),
              }}
            />
          )}
          <Marker
            coordinate={{
              latitude: parseFloat(params?.data.WORK_ON_LAT),
              longitude: parseFloat(params?.data.WORK_ON_LON),
            }}>
            <UserMarker
              distance={
                STORE_DATA?.resultdata?.JULI == '-1'
                  ? '제한 없음'
                  : STORE_DATA?.resultdata?.JULI
              }
              current={
                Math.round(
                  getDistance(
                    params?.data.WORK_ON_LAT,
                    params?.data.WORK_ON_LON,
                  ) * 10,
                ) / 10
              }
              time={params?.data.START_TIME}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: parseFloat(STORE_DATA.resultdata.LAT),
              longitude: parseFloat(STORE_DATA.resultdata.LONG),
            }}>
            <ShopMarker />
          </Marker>
        </MapView>
        <AddButtonContainer>
          <AddButton
            onPress={() =>
              moveMap(params?.data.WORK_ON_LAT, params?.data.WORK_ON_LON)
            }>
            <NavigateIcon />
          </AddButton>
        </AddButtonContainer>
        <Footer onPress={() => setWorkOnMapModalOpen(false)}>
          <FooterText>닫기</FooterText>
        </Footer>
      </Modal>
      <Modal
        isVisible={workOffMapModalOpen}
        onBackdropPress={() => setWorkOffMapModalOpen(false)}
        onRequestClose={() => setWorkOffMapModalOpen(false)}
        avoidKeyboard={true}
        style={{
          margin: 0,
        }}>
        <MapView
          ref={mapRef}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: parseFloat(params?.data.WORK_OFF_LAT),
            longitude: parseFloat(params?.data.WORK_OFF_LON),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {STORE_DATA?.resultdata?.JULI !== -1 && (
            <Circle
              zIndex={0}
              radius={STORE_DATA?.resultdata?.JULI}
              strokeWidth={0}
              fillColor={
                getDistance(
                  params?.data.WORK_OFF_LAT,
                  params?.data.WORK_OFF_LON,
                ) < STORE_DATA?.resultdata?.JULI
                  ? 'rgba(0, 230, 64, 0.2)'
                  : 'rgba(240, 52, 52, 0.2)'
              }
              strokeColor={
                getDistance(
                  params?.data.WORK_OFF_LAT,
                  params?.data.WORK_OFF_LON,
                ) < STORE_DATA?.resultdata?.JULI
                  ? 'rgba(0, 230, 64, 1)'
                  : 'rgba(240, 52, 52, 1)'
              }
              center={{
                latitude: parseFloat(STORE_DATA.resultdata.LAT),
                longitude: parseFloat(STORE_DATA.resultdata.LONG),
              }}
            />
          )}
          <Marker
            coordinate={{
              latitude: parseFloat(params?.data.WORK_OFF_LAT),
              longitude: parseFloat(params?.data.WORK_OFF_LON),
            }}>
            <UserMarker
              distance={
                STORE_DATA?.resultdata?.JULI == '-1'
                  ? '제한 없음'
                  : STORE_DATA?.resultdata?.JULI
              }
              current={
                Math.round(
                  getDistance(
                    params?.data.WORK_OFF_LAT,
                    params?.data.WORK_OFF_LON,
                  ) * 10,
                ) / 10
              }
              time={params?.data.START_TIME}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: parseFloat(STORE_DATA.resultdata.LAT),
              longitude: parseFloat(STORE_DATA.resultdata.LONG),
            }}>
            <ShopMarker />
          </Marker>
        </MapView>
        <AddButtonContainer>
          <AddButton
            onPress={() =>
              moveMap(params?.data.WORK_OFF_LAT, params?.data.WORK_OFF_LON)
            }>
            <NavigateIcon />
          </AddButton>
        </AddButtonContainer>
        <Footer onPress={() => setWorkOffMapModalOpen(false)}>
          <FooterText>닫기</FooterText>
        </Footer>
      </Modal>
    </>
  );
};
