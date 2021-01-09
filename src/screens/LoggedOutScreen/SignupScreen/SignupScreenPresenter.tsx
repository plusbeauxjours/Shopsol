import React, {useRef} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';
import InputLine from '~/components/InputLine';
import {RadioBtnOnIcon, RadioBtnOffIcon} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

interface IsError {
  isError?: boolean;
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

const Placeholder = styled(TextId)`
  color: #e5e5e5;
`;

const ScrollView = styled.ScrollView``;
const Touchable = styled.TouchableOpacity``;
const SheetTouchable = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-color: ${styleGuide.palette.greyColor};
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const DatePickerContainer = styled.View`
  width: 330px;
  height: 320px;
  border-radius: 20px;
  padding: 20px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const DatePickerRoundBtn = styled(Ripple)`
  position: absolute;
  width: 250px;
  height: 60px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: ${styleGuide.palette.greyColor};
  bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const DatePickerText = styled.Text`
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  text-align: center;
`;

export default ({
  alertModal,
  mobileNo,
  name,
  confirmModal,
  onChangeName,
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
  setBirthDate,
  isBirthDateVisible,
  setIsBirthDateVisible,
  birthDateSet,
  setBirthDateSet,
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
            '정확한 가입 유형을 선택하셨나요?\n사업주: 사업주\n직원: 매니저(관리자) 또는 직원',
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
                  onChangeText={(text) => onChangeName(text)}
                  value={name}
                />
              </TextinputCase>
              <InputLine isBefore={name == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>성별</NameText>
              <TypeCheckCase>
                <View>{genderType(0, '남자')}</View>
                <View>{genderType(1, '여자')}</View>
              </TypeCheckCase>
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>생일</NameText>
              <Touchable onPress={() => setIsBirthDateVisible(true)}>
                <TextinputCase>
                  {birthDateSet ? (
                    <TextId>{moment(birthDate).format('YYYY.MM.DD')}</TextId>
                  ) : (
                    <GreyText
                      style={{fontSize: 14, margin: 10, color: '#e5e5e5'}}>
                      탭하여 생일을 선택하세요
                    </GreyText>
                  )}
                </TextinputCase>
              </Touchable>
              <InputLine isBefore={!birthDateSet} />
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
              <Case>
                <NameText>가입경로</NameText>
                <Touchable onPress={() => sheetRef.current.open()}>
                  <TypeCheckCase style={{margin: 10}}>
                    {joinRoute === '가입경로' ? (
                      <Placeholder>가입경로</Placeholder>
                    ) : (
                      <TextId>{joinRoute}</TextId>
                    )}
                  </TypeCheckCase>
                </Touchable>
                <InputLine isBefore={joinRoute == '가입경로' ? true : false} />
              </Case>
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
              <NameText>비밀번호 확인</NameText>
              <TextinputCase>
                <TextInput
                  placeholder={'새 비밀번호 확인'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => passwordCheckerFn(text, true)}
                  value={passwordCheck}
                  secureTextEntry={isPasswordCheckSeen ? false : true}
                  onFocus={() => {}}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'email-address'}
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
          </Section>
          <SubmitBtn
            text={'회원가입 완료'}
            onPress={() =>
              confirmModal(
                '정확한 가입유형을 선택하셨나요?',
                '사업주: 사업주\n직원: 매니저(관리자) 또는 직원',
              )
            }
            isRegisted={
              mobileNo &&
              name.length > 0 &&
              birthDateSet &&
              password === passwordCheck &&
              passwordCheck.length > 6 &&
              password.search(/[0-9]/g) >= 0 &&
              password.search(/[a-z]/gi) >= 0 &&
              !/(\w)\1\1\1/.test(password)
            }
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
        onRequestClose={() => setIsBirthDateVisible(false)}
        onBackdropPress={() => setIsBirthDateVisible(false)}
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
              setBirthDateSet(true);
              setBirthDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setIsBirthDateVisible(false);
              setBirthDateSet(true);
            }}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
    </BackGround>
  );
};
