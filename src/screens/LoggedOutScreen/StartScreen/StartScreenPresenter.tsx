import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

import {getText1, getText2, getText3} from '~/constants/getText';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: white;
`;

const ButtonAfter = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;

const Logo = styled.View`
  height: ${hp('70%')}px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.View`
  margin-bottom: 10px;
  justify-content: center;
  flex-direction: row;
  background-color: white;
`;

const BarButton = styled(Ripple)`
  width: ${wp('100%')}px;
  height: ${hp('8%')}px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;

const Text = styled.Text`
  color: #707070;
  font-size: 15px;
`;

const UnderLineText = styled(Text)`
  text-decoration-line: underline;
`;

const SmallText = styled.Text`
  font-size: 9px;
`;

const UnderLineSmallText = styled.Text`
  font-size: 10px;
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
  const RBSheet1 = useRef(null);
  const RBSheet2 = useRef(null);
  const RBSheet3 = useRef(null);

  const Comma = () => <SmallText>, </SmallText>;
  const Modal = ({sheetRef, text}) => (
    <UnderLineSmallText
      onPress={() => {
        sheetRef.current.open();
      }}>
      {text}
    </UnderLineSmallText>
  );
  const Sheet = ({sheetRef, getText}) => (
    <RBSheet
      ref={sheetRef}
      closeOnPressMask={true}
      height={600}
      openDuration={250}
      customStyles={{
        container: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <ScrollView
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        style={{flex: 1, paddingVertical: 16, paddingHorizontal: 16}}>
        <Text>{getText}</Text>
      </ScrollView>

      <ButtonAfter onPress={() => sheetRef.current.close()}>
        <WhiteText>닫기</WhiteText>
      </ButtonAfter>
    </RBSheet>
  );
  return (
    <>
      <Container>
        <Logo>
          <FastImage
            style={{height: 175, width: 350}}
            source={require('../../../assets/images/logo_cu.png')}
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
            <UnderLineText>회원이신가요?</UnderLineText>
          </LoginButton>
        </Logo>

        <Sheet sheetRef={RBSheet1} getText={getText1()} />
        <Sheet sheetRef={RBSheet2} getText={getText2()} />
        <Sheet sheetRef={RBSheet3} getText={getText3()} />
      </Container>
      <Footer>
        <TextBox>
          <SmallText>'회원가입' 버튼을 눌러 서비스 </SmallText>
          <Modal sheetRef={RBSheet1} text={'이용약관'} />
          <Comma />
          <Modal sheetRef={RBSheet2} text={'개인정보처리방침'} />
          <Comma />
          <Modal sheetRef={RBSheet3} text={'위치정보'} />
          <SmallText>제공에 동의합니다.</SmallText>
        </TextBox>
        <BarButton
          onPress={() => gotoVerification()}
          rippleColor={'#ac52eb'}
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
