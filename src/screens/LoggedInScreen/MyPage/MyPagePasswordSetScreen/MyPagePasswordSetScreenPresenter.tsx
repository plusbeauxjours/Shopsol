import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';

interface IsError {
  isError: boolean;
}
interface HasCheckedVerifyCode {
  hasCheckedVerifyCode: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Case = styled.View`
  width: 100%;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const NameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const TextinputCase = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: black;
`;

const TimeText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #ff3d3d;
  align-self: flex-start;
  margin-bottom: 5px;
`;

const CountText = styled(TimeText)`
  align-self: center;
  margin-right: 10px;
  margin-bottom: 0;
`;

const GreyText = styled.Text<IsError>`
  font-size: 12px;
  color: ${(props) => (props.isError ? 'red' : '#aaa')};
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
  border-width: 1px;
  border-color: ${(props) => (props.hasCheckedVerifyCode ? '#aaa' : '#642a8c')};
  border-radius: 20px;
`;

const RequestText = styled.Text`
  font-size: 14px;
  color: #642a8c;
`;

const MobileNoText = styled.Text`
  font-size: 16px;
`;

export default ({
  alertModal,
  password,
  passwordCheck,
  hasCheckedVerifyCode,
  verifyCode,
  mobileNo,
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
          <Case>
            <NameText>새 비밀번호</NameText>
            <TextinputCase>
              <TextInput
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={'#E5E5E5'}
                selectionColor={'#642A8C'}
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
            <NameText>새 비밀번호 확인</NameText>
            <TextinputCase>
              <TextInput
                placeholder={'새 비밀번호 확인'}
                placeholderTextColor={'#E5E5E5'}
                selectionColor={'#642A8C'}
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
            <NameText>휴대폰 번호</NameText>
            <TextinputCase>
              <MobileNoText>{mobileNo}</MobileNoText>
              <RequestButton
                hasCheckedVerifyCode={hasCheckedVerifyCode}
                onPress={() => requireVerifyCode()}
                disabled={hasCheckedVerifyCode}>
                {hasCheckedVerifyCode ? (
                  <RequestText style={{color: '#aaa'}}>요청완료</RequestText>
                ) : (
                  <RequestText>인증요청</RequestText>
                )}
              </RequestButton>
            </TextinputCase>
            <InputLine isBefore={mobileNo ? false : true} />
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
                <NameText>인증번호입력</NameText>
                <TextinputCase>
                  <TextInput
                    placeholder={'인증번호를 입력해주세요'}
                    placeholderTextColor={'#E5E5E5'}
                    selectionColor={'#642A8C'}
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
