import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';
import styleGuide from '~/constants/styleGuide';

interface IIsBefore {
  isBefore: boolean;
}

interface IsError {
  isError: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Container = styled.View`
  padding: 20px;
`;

const RequestText = styled.Text`
  font-size: 14px;
  color: ${styleGuide.palette.primary};
`;

const VerifyText = styled.Text`
  font-size: 14px;
  color: white;
`;

const GreyText = styled.Text<IsError>`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${(props) => (props.isError ? 'red' : styleGuide.palette.greyColor)};
  margin-top: 5px;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
  border-radius: 20px;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const Case = styled.View`
  width: 100%;
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
  padding-left: 5px;
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

const VerifyButton = styled.TouchableOpacity<IIsBefore>`
  padding: 8px 14px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isBefore ? '#CCCCCC' : styleGuide.palette.primary};
  border-radius: 20px;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: ${styleGuide.marginSpacing}px;
  background-color: white;
`;

export default ({
  isCountDownStarted,
  hasCheckedVerifyCode,
  requireVerifyCode,
  verifyCode,
  onChangeMobileNum,
  onChangeVerifyCode,
  isVerified,
  passwordCheck,
  mobileNo,
  submitFn,
  hasCheckedTimeOut,
  onVerifyCode,
  countdown,
  password,
  isPasswordSeen,
  setIsPasswordSeen,
  isPasswordCheckSeen,
  setIsPasswordCheckSeen,
  passwordCheckerFn,
  isPasswordError,
  isPasswordCheckError,
  setPassword,
  setPasswordCheck,
}) => {
  const scrollRef = useRef(null);
  return (
    <BackGround>
      <KeyboardAwareScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <Case>
              <NameText>휴대폰 번호</NameText>
              <TextinputCase>
                <TextInput
                  placeholder={'휴대폰번호를 입력해주세요'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => {
                    onChangeMobileNum(text);
                  }}
                  value={mobileNo}
                  keyboardType={'number-pad'}
                  maxLength={11}
                />
                <RequestButton
                  onPress={() => requireVerifyCode()}
                  disabled={hasCheckedVerifyCode}>
                  <RequestText>인증요청</RequestText>
                </RequestButton>
              </TextinputCase>
              <InputLine isBefore={mobileNo == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>인증번호입력</NameText>
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
                {isCountDownStarted && <CountText>{countdown}초</CountText>}
                <VerifyButton
                  onPress={() => {
                    verifyCode !== onVerifyCode();
                  }}
                  isBefore={verifyCode ? false : true}>
                  <VerifyText>인증확인</VerifyText>
                </VerifyButton>
              </TextinputCase>
              <InputLine isBefore={verifyCode == '' ? true : false} />
            </Case>
            {hasCheckedTimeOut && (
              <TimeText>
                인증시간이 초과되었습니다. 인증을 다시 시도해주세요
              </TimeText>
            )}
            {isVerified && (
              <>
                <WhiteSpace />
                <Case>
                  <NameText>새 비밀번호</NameText>
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
                      secureTextEntry={isPasswordSeen ? false : true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'email-address'}
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
                  <NameText>새 비밀번호 확인</NameText>
                  <TextinputCase>
                    <TextInput
                      placeholder={'새 비밀번호 확인'}
                      placeholderTextColor={'#E5E5E5'}
                      selectionColor={styleGuide.palette.greyColor}
                      onChangeText={(text) => passwordCheckerFn(text, true)}
                      value={passwordCheck}
                      secureTextEntry={isPasswordCheckSeen ? false : true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'email-address'}
                    />
                    <CheckPasswordBtn
                      onPress={() =>
                        setIsPasswordCheckSeen(!isPasswordCheckSeen)
                      }
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
              </>
            )}
          </Section>
          <SubmitBtn
            text={'비밀번호 변경'}
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
