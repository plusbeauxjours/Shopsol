import React, {useRef} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';
import InputLine from '~/components/InputLine';
import {RadioBtnOnIcon, RadioBtnOffIcon} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

interface IsError {
  isError?: boolean;
}

interface IsChecked {
  isChecked?: boolean;
}

interface IIsCancel {
  isCancelBtn?: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 14px;
`;

const Container = styled.View`
  padding: 20px;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const TextId = styled.Text`
  flex: 1;
  padding-left: 5px;
  margin: 10px 0;
  font-size: 14px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: black;
  padding-left: 5px;
`;

const TypeCheckCase = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const SpaceRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

const GreyText = styled.Text<IsError>`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${(props) => (props.isError ? 'red' : styleGuide.palette.greyColor)};
  margin-top: 5px;
`;

const ScrollView = styled.ScrollView``;
const SheetTouchable = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-color: ${styleGuide.palette.lightGreyColor};
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const RequestBorderButton = styled.TouchableOpacity<IsChecked>`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) =>
    props.isChecked ? styleGuide.palette.primary : 'transparent'};
  border-width: ${(props) => (props.isChecked ? 1 : 0)}px;
  background-color: ${(props) =>
    props.isChecked ? 'transparent' : styleGuide.palette.primary};
  border-radius: 20px;
`;

const RequestBorderText = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? styleGuide.palette.primary : 'white')};
`;

const DatePickerContainer = styled.View`
  width: 330px;
  height: 370px;
  border-radius: 20px;
  padding: 20px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const DatePickerRoundBtn = styled(Ripple)<IIsCancel>`
  width: 250px;
  height: 40px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: ${styleGuide.palette.greyColor};
  background-color: ${(props) =>
    props.isCancelBtn ? 'transparent' : styleGuide.palette.primary};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const DatePickerText = styled.Text<IIsCancel>`
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.large}px;
  color: ${(props) =>
    props.isCancelBtn ? styleGuide.palette.greyColor : 'white'};
  text-align: center;
`;

export default ({
  alertModal,
  mobileNo,
  name,
  confirmModal,
  password,
  passwordCheck,
  positionTypeCheck,
  setPositionTypeCheck,
  genderTypeCheck,
  setGenderTypeCheck,
  helparr,
  joinRoute,
  setJoinRoute,
  otherJoinRoute,
  setOtherJoinRoute,
  setPassword,
  setPasswordCheck,
  isPasswordSeen,
  setIsPasswordSeen,
  isPasswordCheckSeen,
  setIsPasswordCheckSeen,
  passwordCheckerFn,
  isPasswordError,
  isPasswordCheckError,
  birthDate,
  initBirthDate,
  setBirthDate,
  setInitBirthDate,
  isBirthDateVisible,
  setIsBirthDateVisible,
  birthDateSet,
  setBirthDateSet,
  setName,
}) => {
  const sheetRef = useRef(null);
  const positionType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(positionTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setPositionTypeCheck(value);
          alertModal(
            '정확한 가입 유형을 선택하셨나요?\n사업주: 사업장 등록 및 관리자\n직원: 사업장에 소속되어 있는 직원',
          );
        }}>
        <Row>
          {positionTypeCheck[selection] ? (
            <RadioBtnOnIcon size={22} />
          ) : (
            <RadioBtnOffIcon size={22} />
          )}
        </Row>
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };
  const genderType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(genderTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setGenderTypeCheck(value);
        }}>
        <Row>
          {genderTypeCheck[selection] ? (
            <RadioBtnOnIcon size={22} />
          ) : (
            <RadioBtnOffIcon size={22} />
          )}
        </Row>
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };
  return (
    <BackGround>
      <KeyboardAwareScrollView
        extraScrollHeight={140}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <Case>
              <NameText>ID</NameText>
              <TextinputCase>
                <TextId>{mobileNo}</TextId>
              </TextinputCase>
              <InputLine isBefore={false} />
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>이름</NameText>
              <TextinputCase>
                <TextInput
                  placeholder={'이름'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
              </TextinputCase>
              <InputLine isBefore={name == '' ? true : false} />
              <GreyText isError={name?.length > 6}>
                * 이름은 6자 이하로 입력해주세요.
              </GreyText>
            </Case>
            <WhiteSpace />
            <SpaceRow>
              <NameText>생일</NameText>
              <RequestBorderButton
                isChecked={birthDateSet}
                onPress={() => setIsBirthDateVisible(true)}>
                <RequestBorderText isChecked={birthDateSet}>
                  {birthDateSet
                    ? moment(birthDate).format('YYYY년 M월 D일')
                    : '생일 선택'}
                </RequestBorderText>
              </RequestBorderButton>
            </SpaceRow>
            <WhiteSpace />
            <Case>
              <NameText>성별</NameText>
              <TypeCheckCase>
                <View>{genderType(1, '남자')}</View>
                <View>{genderType(0, '여자')}</View>
              </TypeCheckCase>
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>가입유형</NameText>
              <TypeCheckCase>
                <View>{positionType(1, '사업주')}</View>
                <View>{positionType(0, '직원')}</View>
              </TypeCheckCase>
            </Case>
            <WhiteSpace />
            {positionTypeCheck[1] == true && (
              <SpaceRow>
                <NameText>가입경로</NameText>
                <RequestBorderButton
                  isChecked={joinRoute != '가입경로'}
                  onPress={() => sheetRef.current.open()}>
                  <RequestBorderText isChecked={joinRoute != '가입경로'}>
                    {joinRoute == '가입경로' ? '가입경로' : joinRoute}
                  </RequestBorderText>
                </RequestBorderButton>
              </SpaceRow>
            )}
            {positionTypeCheck[1] == true && joinRoute == '기타' && (
              <Case>
                <TextinputCase>
                  <TextInput
                    placeholder={'기타사항을 입력해주세요.'}
                    placeholderTextColor={'#E5E5E5'}
                    onChangeText={(text) => setOtherJoinRoute(text)}
                    value={otherJoinRoute}
                  />
                </TextinputCase>
                <InputLine isBefore={otherJoinRoute == '' ? true : false} />
              </Case>
            )}
            <WhiteSpace />
            <Case>
              <NameText>비밀번호</NameText>
              <TextinputCase>
                <TextInput
                  clearTextOnFocus={true}
                  placeholder={'영문, 숫자 조합 6자 이상'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={styleGuide.palette.greyColor}
                  onFocus={() => {
                    setPassword('');
                    setPasswordCheck('');
                  }}
                  onChangeText={(text) => {
                    if (!/^[A-Za-z0-9]*$/.test(text)) {
                      setIsPasswordSeen(true);
                    } else {
                      if (isPasswordSeen && password.length == 0) {
                        setIsPasswordSeen(false);
                      } else {
                        passwordCheckerFn(text, false);
                      }
                    }
                  }}
                  value={password}
                  secureTextEntry={isPasswordSeen ? false : true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <CheckPasswordBtn
                  onPress={() => setIsPasswordSeen(!isPasswordSeen)}
                  isEmpty={password.length == 0}
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
              <NameText>비밀번호 확인</NameText>
              <TextinputCase>
                <TextInput
                  clearTextOnFocus={true}
                  placeholder={'새 비밀번호 확인'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={styleGuide.palette.greyColor}
                  onFocus={() => {
                    setPasswordCheck('');
                  }}
                  onChangeText={(text) => {
                    if (!/^[A-Za-z0-9]*$/.test(text)) {
                      setIsPasswordCheckSeen(true);
                    } else {
                      if (isPasswordCheckSeen && passwordCheck.length == 0) {
                        setIsPasswordCheckSeen(false);
                      } else {
                        passwordCheckerFn(text, true);
                      }
                    }
                  }}
                  value={passwordCheck}
                  secureTextEntry={isPasswordCheckSeen ? false : true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <CheckPasswordBtn
                  onPress={() => setIsPasswordCheckSeen(!isPasswordCheckSeen)}
                  isEmpty={isPasswordCheckSeen.length == 0}
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
          </Section>
          <SubmitBtn
            text={'회원가입 완료'}
            onPress={() =>
              confirmModal(
                '정확한 가입유형을 선택하셨나요?',
                '사업주: 사업장 등록 및 관리자\n직원: 사업장에 소속되어 있는 직원',
              )
            }
            isRegisted={true}
          />
          <WhiteSpace />
          <RBSheet
            ref={sheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={350}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <ScrollView
              persistentScrollbar={true}
              contentContainerStyle={{
                width: wp('100%'),
                alignItems: 'center',
                paddingBottom: 30,
              }}>
              {helparr.map((data, index) => {
                return (
                  <SheetTouchable
                    key={index}
                    onPress={() => {
                      sheetRef.current.close();
                      setJoinRoute(data.TITLE);
                    }}>
                    <NameText>{data.TITLE}</NameText>
                  </SheetTouchable>
                );
              })}
            </ScrollView>
          </RBSheet>
        </Container>
      </KeyboardAwareScrollView>
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
        isVisible={isBirthDateVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          <DatePicker
            style={{width: utils.isAndroid() ? 200 : 230}}
            locale="ko"
            date={moment(birthDate).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            maximumDate={moment().toDate()}
            onDateChange={(date) => {
              setBirthDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setInitBirthDate(moment(birthDate).format('YYYY-MM-DD'));
              setIsBirthDateVisible(false);
              setBirthDateSet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setIsBirthDateVisible(false);
              setBirthDate(moment(initBirthDate).format('YYYY-MM-DD'));
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText isCancelBtn={true}>취소</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
    </BackGround>
  );
};
