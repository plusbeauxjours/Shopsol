import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';

import {
  RadioBtnOffIcon,
  RadioBtnOnIcon,
  AddCircleIcon,
  RemoveCircleIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import ChecklistAddScreenCard from './ChecklistAddScreenCard';
import DatePickerModal from 'react-native-modal-datetime-picker';
import utils from '~/constants/utils';

interface IsSelected {
  isSelected?: boolean;
}

interface IsError {
  isError: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
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
  margin-top: 20px;
  padding: 20px;
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
  width: 100%;
  flex-wrap: wrap;
  font-size: 15px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const RedText = styled.Text`
  color: #b91c1b;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 20px 0;
`;

const ChecktimeButton = styled.TouchableOpacity`
  padding: 5px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: #e85356;
`;

const ChecktimeButtonText = styled.Text<IsSelected>`
  color: #e85356;
  font-weight: ${(props) => (props.isSelected ? 'bold' : '400')};
`;

const SubTitleText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
`;

const SubText = styled.Text`
  margin-top: 5px;
  margin-left: 21px;
  font-size: 13px;
  color: #aaa;
`;

const DeleteButton = styled.TouchableOpacity`
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ff3d3d;
  text-decoration-line: underline;
`;

const ModalCheckEmpList = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 25px 10px;
  width: ${wp('100%')}px;
  background-color: white;
  border-color: #e5e5e5;
  border-bottom-width: 1px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const ChecklistItem = styled.View`
  padding: 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChecklistBox = styled.View`
  margin-top: 20px;
  min-height: 200px;
  border-width: 1px;
  border-color: #e5e5e5;
  padding: 10px;
`;

const WhiteSpace = styled.View`
  height: 30px;
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
  background-color: ${utils.isAndroid ? '#888' : 'rgba(0,0,0,0.7)'};
`;

const GreyText = styled.Text<IsError>`
  font-size: 12px;
  color: ${(props) => (props.isError ? 'red' : '#aaa')};
  width: ${wp('100%') - 140}px;
  flex-wrap: wrap;
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
            <Row>
              <TitleText>체크항목</TitleText>
              <RedText>*</RedText>
            </Row>
            <TextInput
              placeholder={'ex. 주방'}
              selectionColor={'#999'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setTITLE(text)}
              value={TITLE}
            />
            {TITLE?.length > 16 ? (
              <GreyText isError={true}>
                * 체크항목은 16자 이하로 입력해주세요.
              </GreyText>
            ) : (
              <GreyText isError={false}>
                * 체크항목은 16자 이하로 입력해주세요.
              </GreyText>
            )}
          </Section>
          <Section>
            <Row>
              <TitleText>체크리스트</TitleText>
              <RedText>*</RedText>
            </Row>
            <TextInput
              placeholder={'ex. 가스벨브 잠그기'}
              selectionColor={'#999'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setChecklistInput(text)}
              value={checklistInput}
            />
            {checklistInput?.length > 50 ? (
              <GreyText isError={true}>
                * 체크리스트는 50자 이하로 입력해주세요.
              </GreyText>
            ) : (
              <GreyText isError={false}>
                * 체크리스트는 50자 이하로 입력해주세요.
              </GreyText>
            )}
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
                  <GreyText isError={false}>{data}</GreyText>
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
              <Row>
                <TitleText>체크예정시간</TitleText>
                <RedText>*</RedText>
              </Row>
              {!isNoCheckedtime && (
                <ChecktimeButton onPress={() => setIsCustomModalVisible(true)}>
                  <ChecktimeButtonText isSelected={customChecktime}>
                    {customChecktime ? customChecktime : '선택'}
                  </ChecktimeButtonText>
                </ChecktimeButton>
              )}
            </RowTitle>
            <Line />
            <Touchable
              onPress={() => {
                setIsNoCheckedtime(!isNoCheckedtime);
                setCustomChecktime('');
              }}>
              <Row>
                {isNoCheckedtime ? (
                  <RadioBtnOnIcon size={22} />
                ) : (
                  <RadioBtnOffIcon size={22} />
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
              <Row>
                <TitleText>체크리스트 사진촬영</TitleText>
              </Row>
            </RowTitle>
            <Line />
            <Touchable onPress={() => setIsCheckedCamera(!isCheckedCamera)}>
              <Row>
                {isCheckedCamera ? (
                  <RadioBtnOnIcon size={22} />
                ) : (
                  <RadioBtnOffIcon size={22} />
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
              <Row>
                <TitleText>체크리스트 담당자</TitleText>
                <RedText>*</RedText>
              </Row>
              {isCheckedEmpChoise && (
                <ChecktimeButton onPress={() => RBSheetRef.current.open()}>
                  <ChecktimeButtonText>직원 선택하기</ChecktimeButtonText>
                </ChecktimeButton>
              )}
            </RowTitle>
            <Line />
            <Touchable
              onPress={() => setIsCheckedEmpChoise(!isCheckedEmpChoise)}>
              <Row>
                {isCheckedEmpChoise ? (
                  <RadioBtnOnIcon size={22} />
                ) : (
                  <RadioBtnOffIcon size={22} />
                )}
                <SubTitleText>
                  담당직원만 체크할 수 있도록 설정합니다.
                </SubTitleText>
              </Row>
              <SubText>미선택시 전 직원이 체크할 수 있습니다.</SubText>
            </Touchable>
            <WhiteSpace />
            {isCheckedEmpChoise && (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{marginTop: 10}}>
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
            {choiceEmp?.length !== 0 && (
              <SubText>* 직원 이미지를 클릭하면 목록에서 제외됩니다.</SubText>
            )}
          </Section>
          <SubmitBtn
            text={`${type}완료`}
            onPress={() => submitFn()}
            isRegisted={
              (TITLE?.length < 17 && LIST?.length !== 0 && isNoCheckedtime) ||
              customChecktime
            }
          />
        </Container>
        {type == '수정' && (
          <DeleteButton
            onPress={() =>
              confirmModal('', '체크리스트를 삭제하시겠습니까?', '취소', '삭제')
            }>
            <DeleteButtonText>체크리스트 삭제하기</DeleteButtonText>
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
          {emplist?.map((data, index) => (
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
          ))}
        </ScrollView>
        {isToastVisible && (
          <ModalPopupArea>
            <ModalPopup>
              <ModalPopupText>직원을 목록에 추가하였습니다</ModalPopupText>
            </ModalPopup>
          </ModalPopupArea>
        )}
      </RBSheet>
      <DatePickerModal
        headerTextIOS={'시간을 선택하세요.'}
        cancelTextIOS={'취소'}
        confirmTextIOS={'선택'}
        isVisible={isCustomModalVisible}
        mode="time"
        locale="ko_KRus_EN"
        onConfirm={(time) => {
          setCustomChecktime(moment(time).format('HH:mm'));
          setIsCustomModalVisible(false);
        }}
        is24Hour={true}
        onCancel={() => setIsCustomModalVisible(false)}
        display="default"
      />
    </BackGround>
  );
};
