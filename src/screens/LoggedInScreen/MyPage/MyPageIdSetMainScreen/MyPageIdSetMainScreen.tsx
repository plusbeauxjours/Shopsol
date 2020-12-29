import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ForwardIcon} from '~/constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6; ;
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
  const navigation = useNavigation();
  const ArrowIcon = () => (
    <Arrow>
      <ForwardIcon size={22} />
    </Arrow>
  );
  return (
    <BackGround>
      <Container>
        <Section>
          <Card
            onPress={() => {
              navigation.navigate('MyPageNameSetScreen');
            }}>
            <CardText>이름 변경</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('MyPagePositionSetScreen');
            }}>
            <CardText>점장 - 직원 전환</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('MyPagePasswordSetScreen');
            }}>
            <CardText>비밀번호 재설정</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('MyPageDeleteSetScreen');
            }}>
            <CardText>회원 탈퇴</CardText>
            <ArrowIcon />
          </Card>
        </Section>
      </Container>
    </BackGround>
  );
};
