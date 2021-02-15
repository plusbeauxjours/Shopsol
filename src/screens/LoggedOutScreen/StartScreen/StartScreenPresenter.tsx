import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

import styleGuide from '~/constants/styleGuide';
import * as Animatable from 'react-native-animatable';

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
  background-color: ${styleGuide.palette.primary};
`;

const Text = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
`;

const UnderLineText = styled(Text)`
  text-decoration-line: underline;
`;

const WhiteText = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.large}px;
`;

const Footer = styled.View`
  background-color: white;
  bottom: 0;
`;

const ButtonContainer = styled.View``;

const LoginButton = styled(Ripple)`
  margin-top: 10px;
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
          <Animatable.Image
            animation={{
              from: {opacity: 0},
              to: {opacity: 1},
            }}
            duration={2000}
            style={{height: 200, width: 200}}
            source={require('../../../assets/images/shopSol.png')}
          />
          <ButtonContainer
            as={Animatable.View}
            animation={{
              from: {height: 20, opacity: 0},
              to: {height: 150, opacity: 1},
            }}
            delay={2500}
            duration={800}>
            <LoginButton
              onPress={() => gotoLogin()}
              rippleColor={styleGuide.palette.rippleGreyColor}
              rippleDuration={600}
              rippleSize={1200}
              rippleContainerBorderRadius={30}
              rippleOpacity={0.1}>
              <UnderLineText>회원이신가요??</UnderLineText>
            </LoginButton>
          </ButtonContainer>
        </Logo>
      </Container>
      <Footer
        as={Animatable.View}
        animation={{
          from: {opacity: 0},
          to: {opacity: 1},
        }}
        duration={2000}>
        <BarButton
          onPress={() => gotoVerification()}
          rippleColor={styleGuide.palette.rippleColor}
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

// const hello = {
//   from: { height: 20, opacity: 0 },
//   to: { height: 100, opacity: 1 },
// };
// const hello1 = {
//   from: { opacity: 0 },
//   to: { opacity: 1 },
// };

// <Animatable.Image
// animation={hello1}
// duration={2000}
// source={require('src/assets/logo_splash.png')}
// style={{
//     width: 133,
//     height: 82.25,
//     alignSelf: 'center',
// }}
// />
// <View>
// <Animatable.View
//     animation={hello}
//     iterationCount={1}
//     direction="normal"
//     ref={AnimationRef}
//     delay={2000}
//     duration={1000}>
//     {region === 'SINGAPORE' ? (
//         <BrandText
//             style={{
//                 textAlign: 'center',
//                 fontFamily: 'CarmenSans-SemiBold',
//                 marginTop: 20,
//                 fontSize: 15,
//             }}>
//             All Things Fashion in SG
//         </BrandText>
//     ) : (
//         <BrandText
//             style={{
//                 textAlign: 'center',
//                 fontFamily: 'CarmenSans-SemiBold',
//                 marginTop: 20,
//                 fontSize: 15,
//             }}>
//             All Things Fashion in INDO
//         </BrandText>
//     )}
// </Animatable.View>
