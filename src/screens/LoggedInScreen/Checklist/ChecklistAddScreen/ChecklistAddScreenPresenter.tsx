import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import LottieView from 'lottie-react-native';

import {
  CheckBoxOffIcon,
  CheckBoxOnIcon,
  AddCircleIcon,
  RemoveCircleIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import ChecklistAddScreenCard from './ChecklistAddScreenCard';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

interface IsError {
  isError: boolean;
}
interface IIsChecked {
  isChecked?: boolean;
}

interface IIsCancel {
  isCancelBtn?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
`;

const TextInput = styled.TextInput`
  padding: 0;
  width: 100%;
  flex-wrap: wrap;
  font-size: ${styleGuide.fontSize.large}px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  height: 30px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: ${styleGuide.palette.borderColor};
  height: 1px;
`;

const ChecktimeButton = styled.TouchableOpacity<IIsChecked>`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isChecked ? 'white' : styleGuide.palette.primary};
  border-color: ${(props) =>
    props.isChecked ? styleGuide.palette.primary : 'white'};
  border-width: ${(props) => (props.isChecked ? 1 : 0)}px;
  border-radius: 20px;
`;

const ChecktimeButtonText = styled.Text<IIsChecked>`
  color: ${(props) => (props.isChecked ? styleGuide.palette.primary : 'white')};
`;

const SubTitleText = styled.Text`
  margin-left: 5px;
  font-size: ${styleGuide.fontSize.middle}px;
`;

const SubText = styled.Text`
  margin-top: 5px;
  margin-left: 25px;
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.greyColor};
`;

const DeleteButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 70px;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.redColor};
  text-decoration-line: underline;
`;

const ModalCheckEmpList = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 25px 10px;
  width: ${wp('100%')}px;
  background-color: white;
  border-color: #e5e5e5;
  border-bottom-width: 1px;
`;

const Bold = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const ChecklistItem = styled.View`
  padding: 6px 0px 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChecklistBox = styled.View`
  margin-top: 20px;
  min-height: 200px;
  border-width: 1px;
  border-color: #cccccc;
  padding: 10px;
  border-radius: 10px;
`;

const SmallWhiteSpace = styled.View`
  height: 10px;
`;

const WhiteSpace = styled.View`
  height: 20px;
`;

const ModalPopupArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  align-items: center;
`;

const ModalPopupText = styled.Text`
  color: white;
`;

const ModalPopup = styled.View`
  padding: 15px;
  border-radius: 10px;
  elevation: 6;
  shadow-color: grey;
  shadow-offset: 3px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 3px;
  background-color: ${utils.isAndroid()
    ? styleGuide.palette.greyColor
    : 'rgba(0,0,0,0.7)'};
`;

const GreyText = styled.Text<IsError>`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${(props) => (props.isError ? 'red' : styleGuide.palette.greyColor)};
  width: ${wp('100%') - 140}px;
  flex-wrap: wrap;
`;

const DatePickerContainer = styled.View`
  width: 300px;
  height: ${utils.isAndroid() ? 330 : 370}px;
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

const DatePickerRoundView = styled.View<IIsCancel>`
  width: 250px;
  height: 40px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: #ddd;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const EmpModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export default ({
  TITLE,
  setTITLE,
  deleteEmpFn,
  isNoCheckedtime,
  setIsNoCheckedtime,
  isCheckedCamera,
  setIsCheckedCamera,
  customChecktime,
  setCustomChecktime,
  isCheckedEmpChoise,
  setIsCheckedEmpChoise,
  checklistInput,
  choiseEmpFn,
  emplist,
  choiceEmp,
  submitFn,
  LIST,
  type,
  confirmModal,
  setChecklistInput,
  setLIST,
  isCustomModalVisible,
  setIsCustomModalVisible,
  toastFn,
  isToastVisible,
  alertModal,
  customChecktimeSet,
  setCustomChecktimeSet,
  initCustomChecktime,
  setInitCustomChecktime,
}) => {
  const RBSheetRef = useRef(null);

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <TitleText>체크항목</TitleText>
            <WhiteSpace style={{height: 10}} />
            <TextInput
              placeholder={'ex. 주방'}
              selectionColor={styleGuide.palette.greyColor}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setTITLE(text)}
              value={TITLE}
            />
            <GreyText isError={TITLE?.length > 15}>
              * 체크항목은 15자 이하로 입력해주세요.
            </GreyText>
          </Section>
          <Section>
            <TitleText>체크리스트</TitleText>
            <WhiteSpace style={{height: 10}} />
            <TextInput
              placeholder={'ex. 가스벨브 잠그기'}
              selectionColor={styleGuide.palette.greyColor}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setChecklistInput(text)}
              value={checklistInput}
            />
            <GreyText isError={checklistInput?.length > 50}>
              * 체크리스트는 50자 이하로 입력해주세요.
            </GreyText>
            <WhiteSpace />
            <RoundBtn
              isInSection={true}
              text={'목록에 추가하기'}
              onPress={() => {
                let value = JSON.parse(JSON.stringify(LIST));
                Keyboard.dismiss();
                value.push(checklistInput);
                setChecklistInput('');
                setLIST(value);
              }}
              isRegisted={checklistInput !== '' && checklistInput?.length < 51}
            />
            <ChecklistBox>
              {LIST?.length === 0 && (
                <ChecklistItem>
                  <GreyText isError={false}>ex. 가스벨브 잠그기</GreyText>
                </ChecklistItem>
              )}
              {LIST?.map((data, index) => (
                <ChecklistItem key={index}>
                  <Text style={{maxWidth: wp('100%') - 140}}>{data}</Text>
                  <Touchable
                    onPress={() => {
                      let value = JSON.parse(JSON.stringify(LIST));
                      value.splice(index, 1);
                      setLIST(value);
                    }}>
                    <RemoveCircleIcon />
                  </Touchable>
                </ChecklistItem>
              ))}
            </ChecklistBox>
          </Section>
          <Section>
            <RowTitle>
              <TitleText>체크예정시간</TitleText>
              {!isNoCheckedtime && (
                <ChecktimeButton
                  isChecked={customChecktimeSet}
                  onPress={() => setIsCustomModalVisible(true)}>
                  <ChecktimeButtonText isChecked={customChecktimeSet}>
                    {customChecktimeSet
                      ? moment(customChecktime).format('kk:mm')
                      : '선택'}
                  </ChecktimeButtonText>
                </ChecktimeButton>
              )}
            </RowTitle>
            <GreyLine />
            <SmallWhiteSpace />
            <Touchable onPress={() => setIsNoCheckedtime(!isNoCheckedtime)}>
              <Row>
                {isNoCheckedtime ? (
                  <CheckBoxOnIcon size={22} />
                ) : (
                  <CheckBoxOffIcon size={22} />
                )}
                <SubTitleText>체크예정시간 미입력</SubTitleText>
              </Row>
              <SubText>
                미입력 선택시 정해진 시간없이 체크할 수 있으며 근무중인 직원에게
                알람을 보내지 않습니다.
              </SubText>
            </Touchable>
          </Section>
          <Section>
            <RowTitle>
              <TitleText>체크리스트 사진촬영</TitleText>
            </RowTitle>
            <GreyLine />
            <SmallWhiteSpace />
            <Touchable onPress={() => setIsCheckedCamera(!isCheckedCamera)}>
              <Row>
                {isCheckedCamera ? (
                  <CheckBoxOnIcon size={22} />
                ) : (
                  <CheckBoxOffIcon size={22} />
                )}
                <SubTitleText>체크리스트 관련내용 사진촬영 필수</SubTitleText>
              </Row>
              <SubText>
                선택시 체크리스트 관련 사진을 등록해야만 체크완료 가능합니다.
              </SubText>
            </Touchable>
          </Section>
          <Section>
            <RowTitle>
              <TitleText>체크리스트 담당자</TitleText>
              {isCheckedEmpChoise && (
                <ChecktimeButton
                  onPress={() =>
                    emplist.length === 0
                      ? alertModal(
                          '선택 할 수 있는 직원이 없습니다. 직원 합류 후 진행해주세요.',
                        )
                      : RBSheetRef.current.open()
                  }>
                  <ChecktimeButtonText>직원 선택하기</ChecktimeButtonText>
                </ChecktimeButton>
              )}
            </RowTitle>
            <GreyLine />
            <SmallWhiteSpace />
            <Touchable
              onPress={() => setIsCheckedEmpChoise(!isCheckedEmpChoise)}>
              <Row>
                {isCheckedEmpChoise ? (
                  <CheckBoxOnIcon size={22} />
                ) : (
                  <CheckBoxOffIcon size={22} />
                )}
                <SubTitleText>
                  담당직원만 체크할 수 있도록 설정합니다.
                </SubTitleText>
              </Row>
              <SubText>미선택시 전 직원이 체크할 수 있습니다.</SubText>
            </Touchable>
            <WhiteSpace />
            {isCheckedEmpChoise && (
              <ScrollView horizontal={true}>
                {choiceEmp?.map((data, index) => (
                  <Touchable
                    key={index}
                    onPress={() => deleteEmpFn(data.EMP_SEQ)}>
                    <ChecklistAddScreenCard
                      name={data.NAME}
                      image={data.IMAGE}
                    />
                  </Touchable>
                ))}
              </ScrollView>
            )}
          </Section>
          <SubmitBtn
            text={`${type}완료`}
            onPress={() => submitFn()}
            isRegisted={
              (TITLE?.length < 16 && LIST?.length !== 0 && isNoCheckedtime) ||
              (TITLE?.length < 16 &&
                LIST?.length !== 0 &&
                !isNoCheckedtime &&
                customChecktimeSet)
            }
          />
        </Container>
        {type == '수정' && (
          <DeleteButton
            onPress={() =>
              confirmModal('', '체크리스트를 삭제하시겠습니까?', '취소', '삭제')
            }>
            <Text
              style={{
                fontSize: styleGuide.fontSize.large,
                fontWeight: '600',
                color: '#FF3D3D',
                textDecorationLine: 'underline',
              }}>
              체크리스트 삭제하기
            </Text>
          </DeleteButton>
        )}
      </ScrollView>
      <RBSheet
        ref={RBSheetRef}
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          {emplist?.length > 0 ? (
            emplist?.map((data, index) => (
              <Touchable
                key={index}
                onPress={() => {
                  toastFn();
                  choiseEmpFn(data);
                }}>
                <ModalCheckEmpList>
                  <Bold>{data.NAME}</Bold>
                  <Text>{data.MobileNo}</Text>
                  <AddCircleIcon size={20} />
                </ModalCheckEmpList>
              </Touchable>
            ))
          ) : (
            <EmpModalContainer>
              <Text>선택가능한 직원이 없습니다.</Text>
            </EmpModalContainer>
          )}
        </ScrollView>
        {isToastVisible && (
          <ModalPopupArea>
            <ModalPopup>
              <ModalPopupText>직원을 목록에 추가하였습니다</ModalPopupText>
            </ModalPopup>
          </ModalPopupArea>
        )}
      </RBSheet>
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
        isVisible={isCustomModalVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          {!customChecktimeSet && (
            <LottieView
              style={{
                width: 150,
                top: 23,
                right: 0,
                position: 'absolute',
              }}
              source={require('../../../../assets/animations/rowlett.json')}
              loop={true}
              autoPlay
            />
          )}
          <DatePicker
            date={moment(customChecktime).toDate()}
            mode={'time'}
            androidVariant="iosClone"
            onDateChange={(time) => {
              setCustomChecktimeSet(true);
              setCustomChecktime(time);
            }}
            locale="fr"
            is24hourSource="locale"
            minuteInterval={5}
          />
          {customChecktimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setInitCustomChecktime(moment(customChecktime));
                setIsCustomModalVisible(false);
                setCustomChecktimeSet(true);
              }}
              rippleColor={styleGuide.palette.rippleGreyColor}
              rippleDuration={600}
              rippleSize={1200}
              rippleContainerBorderRadius={30}
              rippleOpacity={0.1}>
              <DatePickerText>확인</DatePickerText>
            </DatePickerRoundBtn>
          ) : (
            <DatePickerRoundView>
              <DatePickerText style={{color: '#ddd'}}>확인</DatePickerText>
            </DatePickerRoundView>
          )}
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setCustomChecktime(moment(initCustomChecktime));
              setCustomChecktimeSet(false);
              setIsCustomModalVisible(false);
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
