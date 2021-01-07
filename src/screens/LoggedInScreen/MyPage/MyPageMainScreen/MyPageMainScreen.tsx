import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';

import {userLogout} from '~/redux/userSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {ForwardIcon, LogoutIcon} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.View`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
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

const EmployeeBox = styled.View`
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const NameBox = styled.View`
  margin-left: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
`;

const InfoText = styled(DateText)`
  font-size: ${styleGuide.fontSize.small}px;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const BoxTitle = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
  font-size: 14px;
  color: ${styleGuide.palette.greyColor};
  margin-left: 30px;
`;

const Arrow = styled.View`
  color: #5887f9;
  font-size: 20px;
`;

const Card = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.Text`
  font-size: 14px;
  color: ${styleGuide.palette.greyColor};
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, MEMBER_NAME, MOBILE_NO, AVATAR} = useSelector(
    (state: any) => state.userReducer,
  );

  const logOut = () => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '로그아웃 하시겠습니까?',
      okCallback: () => {
        dispatch(userLogout());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoggedOutNavigation',
              state: {routes: [{name: 'StartScreen'}]},
            },
          ],
        });
      },
      okButtonText: '로그아웃',
      cancelButtonText: '취소',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const ArrowIcon = () => (
    <Arrow>
      <ForwardIcon />
    </Arrow>
  );

  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <EmployeeBox>
              <FastImage
                style={{width: 60, height: 60, borderRadius: 30}}
                source={{
                  uri: `http://133.186.210.223/uploads/${AVATAR}`,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <NameBox>
                <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
                  <NameText>{MEMBER_NAME}&nbsp;</NameText>
                  <DateText>{STORE == 1 ? '[사업주]' : '[직원]'}</DateText>
                </Row>
                <InfoText>{MOBILE_NO}</InfoText>
              </NameBox>
            </EmployeeBox>
          </Section>
          <Section>
            <Card
              onPress={() => {
                navigation.navigate('MyPageAlarmSetScreen');
              }}>
              <CardText>알림 설정</CardText>
              <ArrowIcon />
            </Card>
            <Card
              onPress={() => {
                navigation.navigate('MyPagePlaceSetScreen');
              }}>
              <CardText>
                {STORE == 1 ? '사업장관리 이력' : '근무종료 사업장'}
              </CardText>
              <ArrowIcon />
            </Card>
            <Card
              onPress={() => {
                navigation.navigate('MyPageAppointmentScreen');
              }}>
              <CardText>약관보기</CardText>
              <ArrowIcon />
            </Card>
            <Card
              onPress={() => {
                navigation.navigate('MyPageIdSetMainScreen');
              }}>
              <CardText>계정관리</CardText>
              <ArrowIcon />
            </Card>
            <Card disabled={true}>
              <CardText>앱버전</CardText>
              <Arrow>
                <BoxTitle>{utils.appVersion}</BoxTitle>
              </Arrow>
            </Card>
            <Card onPress={() => logOut()}>
              <CardText>로그 아웃</CardText>
              <Arrow>
                <LogoutIcon size={24} />
              </Arrow>
            </Card>
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
