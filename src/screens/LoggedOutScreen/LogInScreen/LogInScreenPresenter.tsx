import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

import InputLine from '~/components/InputLine';
import RoundBtn from '~/components/Btn/RoundBtn';
import FcmContainer from '~/components/FcmContainer';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  padding: ${hp('5%')}px 0;
  align-items: center;
  justify-content: center;
`;

const Space = styled.View`
  justify-content: flex-end;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 17px;
  color: black;
  margin-left: 5px;
  margin-top: 10px;
`;

const UnderLineText = styled.Text`
  text-decoration-line: underline;
  font-size: 16px;
`;

const GreyText = styled.Text`
  font-size: 18px;
  color: #212121;
  font-weight: bold;
`;

const WhiteSpace = styled.View`
  height: ${hp('3%')}px;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const TextInputBox = styled.View`
  width: ${wp('80%')}px;
`;

const LogoText = styled.View<ILogoText>`
  width: ${wp('100%')}px;
  margin-bottom: ${hp('6%')}px;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

interface ILogoText {
  isIphoneX: boolean;
}

export default ({
  gotoFind,
  onChangeMobileNum,
  setPassword,
  mobileNo,
  password,
  logIn,
}) => {
  return (
    // <FcmContainer>
    <BackGround>
      <KeyboardAwareScrollView>
        <Container>
          <LogoText isIphoneX={isIphoneX()}>
            <FastImage
              style={{height: 100, width: 200}}
              source={require('../../../assets/images/shopSol.png')}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </LogoText>
          <WhiteSpace />
          <TextInputBox>
            <TextInputContainer>
              <GreyText>ID</GreyText>
              <TextInput
                placeholder={'휴대폰번호'}
                placeholderTextColor={'#999'}
                onChangeText={(text) => onChangeMobileNum(text)}
                value={mobileNo}
                keyboardType={'number-pad'}
                maxLength={11}
                clearButtonMode={'always'}
              />
            </TextInputContainer>
            <InputLine isBefore={mobileNo == '' ? true : false} />
            <WhiteSpace />
            <TextInputContainer>
              <GreyText>Password</GreyText>
              <TextInput
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={'#999'}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                clearButtonMode={'always'}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </TextInputContainer>
            <InputLine isBefore={password == '' ? true : false} />
          </TextInputBox>
          <WhiteSpace />
          <RoundBtn
            isInSection={true}
            isWhiteBack={false}
            text={'로그인'}
            onPress={() => logIn()}
            isRegisted={mobileNo || password}
          />
          <WhiteSpace />
          <Space>
            <Touchable onPress={() => gotoFind()}>
              <UnderLineText>비밀번호 찾기기</UnderLineText>
            </Touchable>
          </Space>
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
    // </FcmContainer>
  );
};
