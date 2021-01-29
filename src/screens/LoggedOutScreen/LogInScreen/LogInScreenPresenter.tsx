import React from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import InputLine from '~/components/InputLine';
import RoundBtn from '~/components/Btn/RoundBtn';
import styleGuide from '~/constants/styleGuide';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Space = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 70px;
`;

const Touchable = styled.TouchableOpacity``;

const TextInput = styled.TextInput`
  padding: 0;
  width: 100%;
  font-size: ${styleGuide.fontSize.large}px;
  color: black;
  margin-left: 5px;
  margin-top: 10px;
`;

const UnderLineText = styled.Text`
  text-decoration-line: underline;
  font-size: ${styleGuide.fontSize.large}px;
`;

const GreyText = styled.Text`
  font-size: 18px;
  color: #212121;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const TextInputBox = styled.View`
  width: ${wp('100%') - 80}px;
`;

export default ({
  gotoFind,
  onChangeMobileNum,
  setPassword,
  mobileNo,
  password,
  logIn,
}) => {
  return (
    <BackGround>
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FastImage
            style={{height: 200, width: 200, marginVertical: 50}}
            source={require('../../../assets/images/shopSol.png')}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <TextInputBox>
            <TextInputContainer>
              <GreyText>ID</GreyText>
              <TextInput
                placeholder={'휴대폰번호'}
                placeholderTextColor={styleGuide.palette.greyColor}
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
                placeholderTextColor={styleGuide.palette.greyColor}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                clearButtonMode={'always'}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </TextInputContainer>
            <InputLine isBefore={password == '' ? true : false} />
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
              <Touchable
                onPress={() => {
                  Keyboard.dismiss;
                  gotoFind();
                }}>
                <UnderLineText>비밀번호 찾기</UnderLineText>
              </Touchable>
            </Space>
          </TextInputBox>
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
