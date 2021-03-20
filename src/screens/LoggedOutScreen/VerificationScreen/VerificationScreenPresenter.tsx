import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import {CheckMarkIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import Ripple from 'react-native-material-ripple';

interface IsBefore {
  isBefore: boolean;
}

interface IPolicyCheck {
  policyCheck?: boolean;
}

const Container = styled.View`
  padding: 20px;
`;

const BackGround = styled.View`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const RequestText = styled.Text`
  color: white;
`;

const VerifyText = styled.Text<IsBefore>`
  color: ${(props) => (props.isBefore ? 'grey' : styleGuide.palette.primary)};
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
  border-radius: 20px;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const WhiteSpace = styled.View`
  height: ${hp('3%')}px;
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
  padding: 0;
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

const VerifyButton = styled.TouchableOpacity<IsBefore>`
  padding: 8px 14px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) =>
    props.isBefore ? 'grey' : styleGuide.palette.primary};
  border-width: 1px;
  border-radius: 20px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const PolicyText = styled.Text<IPolicyCheck>`
  flex: 1;
  margin-left: 5px;
  color: ${(props) =>
    props.policyCheck ? 'black' : styleGuide.palette.greyColor};
  font-size: 20px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const BoxText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
`;

const IconContainer = styled.View<IPolicyCheck>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border-width: 2px;
  margin-right: 10px;
  border-color: ${(props) =>
    props.policyCheck ? '#ef5356' : styleGuide.palette.greyColor};
  align-items: center;
  justify-content: center;
`;

const BoxTouchable = styled(Ripple)`
  margin-top: 10px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: transparent;
  border-width: 1px;
  border-color: grey;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

export default ({
  verifyCode,
  mobileNo,
  gotoSignup,
  gotoPolicy,
  onChangeMobileNum,
  onChangeVerifyNum,
  requireVerifyCode,
  onVerifyCode,
  countdown,
  isCountDownStarted,
  hasCheckedVerifyCode,
  hasCheckTimeOut,
  isVerified,
  policyCheck,
  togglePolicyCheck,
}) => {
  return (
    <BackGround>
      <KeyboardAwareScrollView
        extraScrollHeight={140}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Row onPress={() => togglePolicyCheck()}>
            <IconContainer policyCheck={policyCheck}>
              <CheckMarkIcon
                size={20}
                color={policyCheck ? '#ef5356' : styleGuide.palette.greyColor}
              />
            </IconContainer>
            <PolicyText policyCheck={policyCheck}>
              샵솔의 이용약관, 개인정보처리방침, 위치정보에 모두 동의합니다.
            </PolicyText>
          </Row>
          {policyCheck ? (
            <>
              <Section>
                <Case>
                  <NameText>휴대폰 번호</NameText>
                  <TextinputCase>
                    <TextInput
                      placeholder={'휴대폰번호를 입력해주세요'}
                      placeholderTextColor={'#CCCCCC'}
                      selectionColor={styleGuide.palette.greyColor}
                      onChangeText={(text) => onChangeMobileNum(text)}
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
                      placeholder={'인증번호 6자리 입력'}
                      placeholderTextColor={'#CCCCCC'}
                      selectionColor={styleGuide.palette.greyColor}
                      onChangeText={(text) => onChangeVerifyNum(text)}
                      value={verifyCode}
                      keyboardType={'number-pad'}
                      maxLength={6}
                    />
                    {isCountDownStarted && <CountText>{countdown}초</CountText>}
                    <VerifyButton
                      onPress={() => onVerifyCode()}
                      disabled={verifyCode == ''}
                      isBefore={verifyCode == '' ? true : false}>
                      <VerifyText isBefore={verifyCode == '' ? true : false}>
                        인증확인
                      </VerifyText>
                    </VerifyButton>
                  </TextinputCase>
                  <InputLine isBefore={verifyCode == '' ? true : false} />
                </Case>
                {hasCheckTimeOut && (
                  <TimeText>
                    인증시간이 초과되었습니다. 인증을 다시 시도해주세요
                  </TimeText>
                )}
              </Section>
              <SubmitBtn
                text={'다음단계로'}
                onPress={() => gotoSignup()}
                isRegisted={isVerified}
              />
            </>
          ) : (
            <BoxTouchable
              onPress={() => gotoPolicy()}
              rippleColor={styleGuide.palette.rippleGreyColor}
              rippleDuration={600}
              rippleSize={1200}
              rippleContainerBorderRadius={30}
              rippleOpacity={0.1}>
              <BoxText>이용약관 보기</BoxText>
            </BoxTouchable>
          )}
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
