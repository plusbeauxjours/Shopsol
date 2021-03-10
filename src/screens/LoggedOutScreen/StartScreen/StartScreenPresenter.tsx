import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import Swiper from 'react-native-swiper';

import styleGuide from '~/constants/styleGuide';
import * as Animatable from 'react-native-animatable';
import RoundBtn from '~/components/Btn/RoundBtn';
import Loader from '~/components/Loader';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: white;
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
`;

const GuideContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const GuideMainText = styled.Text`
  font-size: 26px;
  font-weight: ${styleGuide.fontWeight.bold};
  margin-bottom: 30px;
`;

const GuideText = styled.Text`
  font-size: 14px;
  font-weight: 200;
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

const WhiteSpace = styled.View`
  height: 150px;
`;

const SubmitButton = styled(Ripple)`
  position: absolute;
  bottom: 80px;
  width: ${wp('100%') - 120}px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: transparent;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
`;

const SubmitButtonText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.primary};
`;

export default ({
  loading,
  gotoLogin,
  gotoVerification,
  SHOWN_APP_GUIDE_SCREEN,
  setAsyncStorage,
  removeAsyncStorage,
}) => {
  if (!loading) {
    if (SHOWN_APP_GUIDE_SCREEN) {
      return (
        <Swiper
          loop={false}
          activeDot={
            <View
              style={{
                backgroundColor: styleGuide.palette.primary,
                width: 12,
                height: 12,
                borderRadius: 6,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }>
          <GuideContainer>
            <GuideMainText>출퇴근기록</GuideMainText>
            <GuideText>언제, 어디서나 실시간 근무현황을 확인하세요.</GuideText>
            <Animatable.Image
              animation={{
                from: {opacity: 0},
                to: {opacity: 1},
              }}
              duration={800}
              style={{marginTop: 30, height: 200, width: 220}}
              resizeMode={'contain'}
              source={require('../../../assets/images/img1.png')}
            />
            <WhiteSpace />
          </GuideContainer>
          <GuideContainer>
            <GuideMainText>자동급여계산</GuideMainText>
            <GuideText>세무사와 노무사가 만들어서 믿을 수 있어요.</GuideText>
            <Animatable.Image
              animation={{
                from: {opacity: 0},
                to: {opacity: 1},
              }}
              duration={800}
              style={{marginTop: 30, height: 200, width: 220}}
              resizeMode={'contain'}
              source={require('../../../assets/images/img2.png')}
            />
            <WhiteSpace />
          </GuideContainer>
          <GuideContainer>
            <GuideMainText>체크리스트</GuideMainText>
            <GuideText>사업장의 중요내용을 체크리스트로 관리하세요.</GuideText>
            <Animatable.Image
              animation={{
                from: {opacity: 0},
                to: {opacity: 1},
              }}
              duration={800}
              style={{marginTop: 30, height: 200, width: 220}}
              resizeMode={'contain'}
              source={require('../../../assets/images/img3.png')}
            />
            <WhiteSpace />
          </GuideContainer>
          <GuideContainer>
            <GuideMainText>오늘 업무 알림</GuideMainText>
            <GuideText>
              출근과 동시에 처리해야 할 업무를 알려드릴게요.
            </GuideText>
            <Animatable.Image
              animation={{
                from: {opacity: 0},
                to: {opacity: 1},
              }}
              duration={800}
              style={{marginTop: 30, height: 200, width: 220}}
              resizeMode={'contain'}
              source={require('../../../assets/images/img4.png')}
            />
            <WhiteSpace />
            <SubmitButton
              onPress={() => setAsyncStorage()}
              rippleColor={styleGuide.palette.rippleColor}
              rippleDuration={600}
              rippleSize={1200}
              rippleContainerBorderRadius={30}
              rippleOpacity={0.45}>
              <SubmitButtonText>시작하기</SubmitButtonText>
            </SubmitButton>
          </GuideContainer>
        </Swiper>
      );
    } else {
      return (
        <>
          <Container>
            <Logo>
              <Animatable.Image
                animation={{
                  from: {opacity: 0},
                  to: {opacity: 1},
                }}
                duration={800}
                style={{height: 200, width: 200}}
                source={require('../../../assets/images/shopSol.png')}
              />
              <ButtonContainer
                as={Animatable.View}
                animation={{
                  from: {height: 20, opacity: 0},
                  to: {height: 150, opacity: 1},
                }}
                delay={1400}
                duration={500}>
                <LoginButton
                  onPress={() => gotoLogin()}
                  rippleColor={styleGuide.palette.rippleGreyColor}
                  rippleDuration={600}
                  rippleSize={1200}
                  rippleContainerBorderRadius={30}
                  rippleOpacity={0.1}>
                  <UnderLineText>회원이신가요?</UnderLineText>
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
    }
  } else {
    return null;
  }
};
