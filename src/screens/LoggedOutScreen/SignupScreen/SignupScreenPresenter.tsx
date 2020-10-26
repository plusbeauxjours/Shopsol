import React, {useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';

import DatePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';
import InputLine from '~/components/InputLine';
import {RadioBtnOnIcon, RadioBtnOffIcon} from '~/constants/Icons';

interface IsError {
  isError: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const NameText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const TextId = styled.Text`
  flex: 1;
  padding-left: 5px;
  margin: 10px 0;
  font-size: 15px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
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
  font-size: 12px;
  color: ${(props) => (props.isError ? 'red' : '#aaa')};
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
  border-color: #aaa;
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
            '정확한 가입 유형을 선택하셨나요?\n점장: 사업주(점장)\n직원: 매니저 또는 스태프',
          );
        }}>
        <Row>
          {positionTypeCheck[selection] ? (
            <RadioBtnOnIcon size={25} color="#e85356" />
          ) : (
            <RadioBtnOffIcon size={25} color="#CCCCCC" />
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
            <RadioBtnOnIcon size={25} color="#e85356" />
          ) : (
            <RadioBtnOffIcon size={25} color="#CCCCCC" />
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
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
                <TextId>
                  {birthDate !== '' && moment(birthDate).format('YYYY.MM.DD')}{' '}
                </TextId>
              </TextinputCase>
            </Touchable>
            <InputLine isBefore={birthDate == '' ? true : false} />
          </Case>
          <WhiteSpace />
          <DatePickerModal
            headerTextIOS={'생일을 선택하세요.'}
            cancelTextIOS={'취소'}
            confirmTextIOS={'확인'}
            isVisible={isBirthDateVisible}
            mode="date"
            maximumDate={moment().toDate()}
            locale="ko_KRus_EN"
            onConfirm={(date) => {
              setIsBirthDateVisible(false);
              setBirthDate(moment(date).format('YYYY-MM-DD'));
            }}
            onCancel={() => {
              setIsBirthDateVisible(false);
            }}
            display="default"
          />
          <Case>
            <NameText>가입유형</NameText>
            <TypeCheckCase>
              <View>{positionType(1, '점장')}</View>
              <View>{positionType(0, '직원')}</View>
            </TypeCheckCase>
          </Case>
          <WhiteSpace />
          {positionTypeCheck[1] == true && (
            <Case>
              <NameText>가입경로</NameText>
              <Touchable onPress={() => sheetRef.current.open()}>
                <TypeCheckCase style={{marginBottom: 10}}>
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
                selectionColor={'#999'}
                onFocus={() => {
                  setPassword('');
                  setPasswordCheck('');
                }}
                onChangeText={(text) => passwordCheckerFn(text, false)}
                value={password}
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
            <NameText>비밀번호 확인</NameText>
            <TextinputCase>
              <TextInput
                placeholder={'새 비밀번호 확인'}
                placeholderTextColor={'#E5E5E5'}
                selectionColor={'#999'}
                onChangeText={(text) => passwordCheckerFn(text, true)}
                value={passwordCheck}
                secureTextEntry={isPasswordCheckSeen ? false : true}
                onFocus={() => {}}
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
          <SubmitBtn
            text={'회원가입 완료'}
            onPress={() =>
              confirmModal(
                '정확한 가입유형을 선택하셨나요?',
                '점장: 사업주(점장)\n직원: 매니저 또는 스태프',
              )
            }
            isRegisted={
              mobileNo &&
              name.length > 0 &&
              birthDate.length > 0 &&
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
    </BackGround>
  );
};
