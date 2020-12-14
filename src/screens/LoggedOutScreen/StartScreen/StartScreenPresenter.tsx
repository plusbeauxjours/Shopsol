import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: white;
`;

const Logo = styled.View`
  height: ${hp('70%')}px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
`;

const BarButton = styled(Ripple)`
  width: ${wp('100%')}px;
  height: ${hp('8%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

const Text = styled.Text`
  color: #707070;
  font-size: 15px;
`;

const UnderLineText = styled(Text)`
  text-decoration-line: underline;
`;

const WhiteText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Footer = styled.View`
  background-color: white;
  bottom: 0;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const LoginButton = styled(Ripple)`
  margin-top: 30px;
  width: 200px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: transparent;
  border-width: 1px;
  border-color: grey;
`;

export default ({gotoLogin, gotoVerification}) => {
  return (
    <>
      <Container>
        <Logo>
          <FastImage
            style={{height: 100, width: 200}}
            source={require('../../../assets/images/shopSol.png')}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <WhiteSpace />
          <LoginButton
            onPress={() => gotoLogin()}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <UnderLineText>회원이신가요???????</UnderLineText>
          </LoginButton>
        </Logo>
      </Container>
      <Footer>
        <BarButton
          onPress={() => gotoVerification()}
          rippleColor={'#e39a9c'}
          rippleDuration={600}
          rippleSize={1200}
          rippleContainerBorderRadius={30}
          rippleOpacity={0.45}>
          <WhiteText>회원가입</WhiteText>
        </BarButton>
      </Footer>
    </>
  );
};
