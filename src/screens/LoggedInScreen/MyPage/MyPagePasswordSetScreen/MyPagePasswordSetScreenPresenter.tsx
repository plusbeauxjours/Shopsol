import React from 'react';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';
import styleGuide from '~/constants/styleGuide';

interface IsError {
  isError: boolean;
}
interface HasCheckedVerifyCode {
  hasPassword: boolean;
  hasCheckedVerifyCode: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary}; ;
`;

const Case = styled.View`
  width: 100%;
`;

const Container = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
  margin-bottom: 10px;
`;

const TextinputCase = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${styleGuide.fontSize.large}px;
  color: black;
`;

const TimeText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.redColor};
  align-self: flex-start;
  margin-bottom: 5px;
`;

const CountText = styled(TimeText)`
  align-self: center;
  margin-right: 10px;
  margin-bottom: 0;
`;

const GreyText = styled.Text<IsError>`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${(props) => (props.isError ? 'red' : styleGuide.palette.greyColor)};
  margin-top: 5px;
`;

const VerifyContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const RequestButton = styled.TouchableOpacity<HasCheckedVerifyCode>`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) =>
    props.hasPassword
      ? props.hasCheckedVerifyCode
        ? styleGuide.palette.primary
        : 'transparent'
      : 'grey'};
  border-width: ${(props) =>
    props.hasPassword ? (props.hasCheckedVerifyCode ? 1 : 0) : 1}px;
  background-color: ${(props) =>
    props.hasPassword
      ? props.hasCheckedVerifyCode
        ? 'transparent'
        : styleGuide.palette.primary
      : 'transparent'};
  border-radius: 20px;
`;

const RequestText = styled.Text<HasCheckedVerifyCode>`
  color: ${(props) =>
    props.hasPassword
      ? props.hasCheckedVerifyCode
        ? styleGuide.palette.primary
        : 'white'
      : 'grey'};
`;

const MobileNoText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

export default ({
  password,
  passwordCheck,
  hasCheckedVerifyCode,
  verifyCode,
  MOBILE_NO,
  requireVerifyCode,
  onChangeVerifyCode,
  submitFn,
  countdown,
  isCountDownStarted,
  hasCheckedTimeOut,
  isPasswordSeen,
  setIsPasswordSeen,
  isPasswordCheckSeen,
  setIsPasswordCheckSeen,
  setPassword,
  setPasswordCheck,
  isPasswordError,
  isPasswordCheckError,
  passwordCheckerFn,
}) => {
  return (
    <BackGround>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Container>
          <Section>
            <Case>
              <TitleText>새 비밀번호</TitleText>
              <TextinputCase>
                <TextInput
                  placeholder={'영문, 숫자 조합 6자 이상'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={styleGuide.palette.greyColor}
                  onFocus={() => {
                    setPassword('');
                    setPasswordCheck('');
                  }}
                  onChangeText={(text) => passwordCheckerFn(text, false)}
                  value={password}
                  editable={!hasCheckedVerifyCode}
                  secureTextEntry={isPasswordSeen ? false : true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <CheckPasswordBtn
                  onPress={() => setIsPasswordSeen(!isPasswordSeen)}
                  isPasswordSeen={isPasswordSeen}
                />
              </TextinputCase>
              <InputLine isBefore={password == '' ? true : false} />
              {password.length > 0 && /(\w)\1\1\1/.test(password) ? (
                <GreyText isError={true}>
                  * 444같은 문자를 4번 이상 사용하실 수 없습니다.
                </GreyText>
              ) : password.length > 15 ? (
                <GreyText isError={true}>
                  * 영문, 숫자 조합하여 15자 이하 입력해주세요.
                </GreyText>
              ) : (
                <GreyText isError={isPasswordError}>
                  * 영문, 숫자 조합하여 6자 이상 입력해주세요.
                </GreyText>
              )}
            </Case>
            <WhiteSpace />
            <Case>
              <TitleText>새 비밀번호 확인</TitleText>
              <TextinputCase>
                <TextInput
                  placeholder={'새 비밀번호 확인'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => passwordCheckerFn(text, true)}
                  value={passwordCheck}
                  editable={!hasCheckedVerifyCode}
                  secureTextEntry={isPasswordCheckSeen ? false : true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <CheckPasswordBtn
                  onPress={() => setIsPasswordCheckSeen(!isPasswordCheckSeen)}
                  isPasswordSeen={isPasswordCheckSeen}
                />
              </TextinputCase>
              <InputLine isBefore={passwordCheck == '' ? true : false} />
              {passwordCheck.length > 6 && password !== passwordCheck ? (
                <GreyText isError={true}>
                  * 비밀번호가 일치하지 않습니다.
                </GreyText>
              ) : (
                <GreyText isError={isPasswordCheckError}>
                  * 영문, 숫자 조합하여 6자 이상 입력해주세요.
                </GreyText>
              )}
            </Case>
            <WhiteSpace />
            <Case>
              <TitleText>휴대폰 번호</TitleText>
              <TextinputCase>
                <MobileNoText>{MOBILE_NO}</MobileNoText>
                <RequestButton
                  hasPassword={passwordCheck != '' && password != ''}
                  hasCheckedVerifyCode={hasCheckedVerifyCode}
                  onPress={() => requireVerifyCode()}
                  disabled={
                    hasCheckedVerifyCode ||
                    passwordCheck == '' ||
                    password == ''
                  }>
                  <RequestText
                    hasPassword={passwordCheck != '' && password != ''}
                    hasCheckedVerifyCode={hasCheckedVerifyCode}>
                    {hasCheckedVerifyCode ? '요청완료' : '인증요청'}
                  </RequestText>
                </RequestButton>
              </TextinputCase>
              <InputLine isBefore={MOBILE_NO ? false : true} />
            </Case>
            {hasCheckedTimeOut && (
              <TimeText>
                인증시간이 초과되었습니다. 인증을 다시 시도해주세요
              </TimeText>
            )}
            {hasCheckedVerifyCode && (
              <>
                <WhiteSpace />
                <Case>
                  <TitleText>인증번호입력</TitleText>
                  <TextinputCase>
                    <TextInput
                      placeholder={'인증번호를 입력해주세요'}
                      placeholderTextColor={'#E5E5E5'}
                      selectionColor={styleGuide.palette.greyColor}
                      onChangeText={(text) => {
                        onChangeVerifyCode(text);
                      }}
                      value={verifyCode}
                      keyboardType={'number-pad'}
                      maxLength={6}
                    />
                  </TextinputCase>
                  <InputLine isBefore={verifyCode == '' ? true : false} />
                  <VerifyContainer>
                    {isCountDownStarted && <CountText>{countdown}초</CountText>}
                  </VerifyContainer>
                </Case>
              </>
            )}
          </Section>
          <SubmitBtn
            text={'설정 완료'}
            onPress={() => submitFn()}
            isRegisted={
              password === passwordCheck &&
              passwordCheck.length > 6 &&
              password.search(/[0-9]/g) >= 0 &&
              password.search(/[a-z]/gi) >= 0 &&
              !/(\w)\1\1\1/.test(password)
            }
          />
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
