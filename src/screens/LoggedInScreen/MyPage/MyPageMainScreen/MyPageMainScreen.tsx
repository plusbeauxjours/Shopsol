import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import {userLogout} from '~/redux/userSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {ForwardIcon, LogoutIcon} from '~/constants/Icons';
import utils from '~/constants/utils';

const BackGround = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const Text = styled.Text``;
const Info = styled.View`
  height: 100px;
  width: ${wp('100%')}px;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
`;

const BoxArea = styled.View`
  margin-top: 20px;
  background-color: white;
`;

const PersonInfo = styled.View`
  margin-left: 20px;
  height: 80px;
  justify-content: center;
`;

const Name = styled.View`
  flex-direction: row;
  height: 30px;
  align-items: center;
`;

const NameText = styled.Text`
  color: #7f7f7f;
  font-size: 16px;
`;

const PositionText = styled.Text`
  font-size: 13px;
  margin-left: 5px;
  color: #707070;
`;

const Phone = styled.View`
  height: 30px;
  justify-content: center;
`;

const PhoneText = styled.Text`
  font-size: 13px;
  color: #707070;
`;

const BoxTitle = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #212121;
  margin-left: 30px;
`;

const Arrow = styled.View`
  color: #5887f9;
  font-size: 20px;
`;

const Card = styled.TouchableOpacity`
  padding: ${hp('2%')}px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.Text`
  font-size: 15px;
  color: #212121;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, MEMBER_NAME, GENDER, MOBILE_NO} = useSelector(
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
      <ForwardIcon size={22} />
    </Arrow>
  );

  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Info>
          <FastImage
            style={{width: 60, height: 60, borderRadius: 30}}
            source={{
              uri: utils.avatarUrl(GENDER),
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <PersonInfo>
            <Name>
              <NameText>{MEMBER_NAME}</NameText>
              <PositionText>{STORE == 1 ? '[점장]' : '[직원]'}</PositionText>
            </Name>

            <Phone>
              <PhoneText>{MOBILE_NO}</PhoneText>
            </Phone>
          </PersonInfo>
        </Info>
        <BoxArea>
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
        </BoxArea>
      </ScrollView>
    </BackGround>
  );
};
