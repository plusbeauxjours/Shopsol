import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {ForwardIcon} from '~/constants/Icons';
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

const ButtonAfter = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
`;

const Text = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: 14px;
`;

const WhiteText = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.large}px;
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

const Arrow = styled.View`
  color: #5887f9;
  font-size: 20px;
`;

export default () => {
  const ArrowIcon = () => (
    <Arrow>
      <ForwardIcon color={styleGuide.palette.primary} />
    </Arrow>
  );
  return (
    <BackGround>
      <Container>
        <Section>
          <Card
            onPress={() => {
              RBSheet1.current.open();
            }}>
            <CardText>서비스 이용약관</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              RBSheet2.current.open();
            }}>
            <CardText>개인정보 수집</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              RBSheet3.current.open();
            }}>
            <CardText>위치정보 수집</CardText>
            <ArrowIcon />
          </Card>
        </Section>
      </Container>
    </BackGround>
  );
};
