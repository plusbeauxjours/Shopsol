import React, {useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import {getText1, getText2, getText3} from '~/constants/getText';
import {CheckMarkIcon} from '~/constants/Icons';

interface IIsBefore {
  isBefore: boolean;
}

interface IPolicyCheck {
  policyCheck?: boolean;
}

const ScrollView = styled.ScrollView``;
const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const RequestText = styled.Text`
  font-size: 14px;
  color: #e85356;
`;

const VerifyText = styled.Text`
  font-size: 14px;
  color: white;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #e85356;
  border-radius: 20px;
`;

const NameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
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

const VerifyButton = styled.TouchableOpacity<IIsBefore>`
  padding: 8px 14px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#e85356')};
  border-radius: 20px;
`;

const WhiteText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Text = styled.Text`
  color: #707070;
  font-size: 15px;
`;

const ButtonAfter = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const PolicyText = styled.Text<IPolicyCheck>`
  flex: 1;
  margin-left: 5px;
  color: ${(props) => (props.policyCheck ? '#000' : '#aaa')};
  font-size: 20px;
  font-weight: bold;
`;

const GreyText = styled.Text`
color: #999
font-size: 14px;
`;

const BoxText = styled.Text`
  font-size: 16px;
`;

const UnderlineText = styled(PolicyText)`
  text-decoration-line: underline;
`;

const IconContainer = styled.View<IPolicyCheck>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border-width: 2px;
  margin-right: 10px;
  border-color: ${(props) => (props.policyCheck ? '#ef5356' : '#aaa')};
  align-items: center;
  justify-content: center;
`;

const BoxTouchable = styled.TouchableOpacity`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px 0;
  border-width: 1px;
  border-color: #333;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export default ({
  verifyCode,
  mobileNo,
  gotoSignup,
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
  const RBSheet1 = useRef(null);
  const RBSheet2 = useRef(null);
  const RBSheet3 = useRef(null);
  const Comma = () => <PolicyText>, </PolicyText>;
  const Modal = ({sheetRef, text}) => (
    <UnderlineText
      policyCheck={policyCheck}
      onPress={() => sheetRef.current.open()}>
      {text}
    </UnderlineText>
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
    <BackGround>
      <KeyboardAwareScrollView>
        <Container>
          <Sheet sheetRef={RBSheet1} getText={getText1()} />
          <Sheet sheetRef={RBSheet2} getText={getText2()} />
          <Sheet sheetRef={RBSheet3} getText={getText3()} />
          <Row onPress={() => togglePolicyCheck()}>
            <IconContainer policyCheck={policyCheck}>
              <CheckMarkIcon
                size={20}
                color={policyCheck ? '#ef5356' : '#aaa'}
              />
            </IconContainer>
            <PolicyText policyCheck={policyCheck}>
              샵솔의&nbsp;
              <Modal sheetRef={RBSheet1} text={'이용약관'} />
              <Comma />
              <Modal sheetRef={RBSheet2} text={'개인정보처리방침'} />
              <Comma />
              <Modal sheetRef={RBSheet3} text={'위치정보'} />에 모두 동의합니다.
            </PolicyText>
          </Row>
          {policyCheck ? (
            <>
              <Case>
                <NameText>휴대폰 번호</NameText>
                <TextinputCase>
                  <TextInput
                    placeholder={'휴대폰번호를 입력해주세요'}
                    placeholderTextColor={'#CCCCCC'}
                    selectionColor={'#999'}
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
                    placeholderTextColor={'#CCCCCC'}
                    selectionColor={'#999'}
                    onChangeText={(text) => {
                      onChangeVerifyNum(text);
                    }}
                    value={verifyCode}
                    keyboardType={'number-pad'}
                    maxLength={6}
                  />
                  {isCountDownStarted && <CountText>{countdown}초</CountText>}
                  <VerifyButton
                    onPress={() => onVerifyCode()}
                    isBefore={verifyCode == '' ? true : false}>
                    <VerifyText>인증확인</VerifyText>
                  </VerifyButton>
                </TextinputCase>
                <InputLine isBefore={verifyCode == '' ? true : false} />
              </Case>
              {hasCheckTimeOut && (
                <TimeText>
                  인증시간이 초과되었습니다. 인증을 다시 시도해주세요
                </TimeText>
              )}
              <SubmitBtn
                text={'다음단계로'}
                onPress={() => gotoSignup()}
                isRegisted={isVerified}
              />
            </>
          ) : (
            <>
              <BoxTouchable onPress={() => RBSheet1.current.open()}>
                <BoxText>
                  이용약관&nbsp;
                  <GreyText>(보기)</GreyText>
                </BoxText>
              </BoxTouchable>
              <BoxTouchable onPress={() => RBSheet2.current.open()}>
                <BoxText>
                  개인정보처리방침&nbsp;
                  <GreyText>(보기)</GreyText>
                </BoxText>
              </BoxTouchable>
              <BoxTouchable onPress={() => RBSheet3.current.open()}>
                <BoxText>
                  위치정보 제공&nbsp;
                  <GreyText>(보기)</GreyText>
                </BoxText>
              </BoxTouchable>
            </>
          )}
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};