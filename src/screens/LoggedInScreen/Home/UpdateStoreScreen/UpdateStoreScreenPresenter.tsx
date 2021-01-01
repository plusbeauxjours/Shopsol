import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputLine from '~/components/InputLine';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  RadioBtnOnIcon,
  RadioBtnOffIcon,
  HelpCircleIcon,
} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

interface IIsPerple {
  isPerple: boolean;
}
interface IColor {
  color: string;
}
interface IIsBefore {
  isBefore?: boolean;
}

interface IsError {
  isError: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Text = styled.Text``;
const ScrollView = styled.ScrollView``;
const Container = styled.View`
  width: ${wp('100%')}px;
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const ModalContainer = styled.View`
  background-color: white;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const InputCaseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
  border-radius: 20px;
`;

const RequestBorderButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-color: ${styleGuide.palette.primary};
  border-width: 1px;
  border-radius: 20px;
`;

const RequestText = styled.Text`
  font-size: 12px;
  color: white;
`;

const RequestBorderText = styled.Text`
  color: ${styleGuide.palette.primary};
`;

const Column = styled.View`
  flex-direction: column;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding: 0;
  margin-left: 5px;
  color: black;
  height: 24px;
  font-size: 16px;
  margin-top: 10px;
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 10px 0 20px 0;
  background-color: #${styleGuide.palette.borderColor};
  height: 1px;
`;

const CheckDay = styled.TouchableOpacity<IIsPerple>`
  width: 20%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isPerple
      ? styleGuide.palette.primary
      : styleGuide.palette.borderColor};
  align-items: center;
  justify-content: center;
`;

const CheckDayText = styled.Text<IIsPerple>`
  color: ${(props) =>
    props.isPerple
      ? styleGuide.palette.primary
      : styleGuide.palette.borderColor};
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
  font-weight: 300;
`;

const GreyText = styled.Text<IsError>`
  font-size: 12px;
  color: ${(props) => (props.isError ? 'red' : '#aaa')};
  margin-top: 5px;
  margin-left: 5px;
`;

const TitleText = styled.Text`
  font-size: 16px;
  color: #999;
  font-weight: bold;
`;

const TypeCheckCase = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 8px;
`;

const WhiteSpace = styled.View`
  height: 20px;
`;

const ModalList = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  border-bottom-width: 1px;
  border-color: #ddd;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ModalText = styled.Text`
  font-size: 15px;
`;

const ModalConfirmArea = styled.View`
  width: ${wp('100%')}px;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
`;

const ModalConfirm = styled.TouchableOpacity<IColor>`
  height: ${hp('7%')}px;
  width: ${wp('50%')}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const ModalConfirmText = styled.Text<IColor>`
  font-size: 18px;
  color: ${(props) => props.color};
`;

const ModalTitle = styled.Text`
  font-size: 17px;
  color: ${styleGuide.palette.primary};
  padding: 0 20px;
  margin-top: 20px;
`;

const ModalInfoText = styled.Text`
  font-size: 13px;
  padding: 0 20px;
  margin-top: 5px;
`;

const ModalCalendar = styled.View`
  background-color: white;
  border-color: #${styleGuide.palette.borderColor};
  border-width: 1px;
  margin: 20px 0;
`;

const SubmitBtnContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${hp('7%')}px;
  background-color: ${styleGuide.palette.primary};
  justify-content: center;
  align-items: center;
`;

const SubmitBtnText = styled.Text`
  font-size: 15px;
  color: white;
  margin-left: 10px;
  padding-top: 5px;
`;

const InputCase = styled.View`
  margin-top: 20px;
`;

const DeleteBtn = styled.TouchableOpacity`
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const DeleteBtnText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ff3d3d;
  text-decoration-line: underline;
`;

export default ({
  days,
  sizeTypeCheck,
  setTYPE,
  setDays,
  CALCULATE_DAY,
  onPressLate,
  onPressEarly,
  onPressDistance,
  onPressCategory,
  modalVisible1,
  setModalVisible1,
  modalVisible2,
  setModalVisible2,
  modalVisible3,
  setModalVisible3,
  modalVisible4,
  setModalVisible4,
  modalVisible5,
  setModalVisible5,
  checkDirectInput,
  EARLY_TIME,
  LATE_TIME,
  timeCheck,
  EARLYtimeCheck,
  distance,
  distanceCheck,
  explainModal,
  dayCheck,
  gotoSearchAddress,
  setADDR1,
  ADDR1,
  setADDR2,
  ADDR2,
  setSizeTypeCheck,
  NAME,
  setNAME,
  submit,
  helparr,
  commuteType,
  setCommuteType,
  commuteTypeCheck,
  setCommuteTypeCheck,
  storeCategoryType,
  categoryCheck,
  setStoreCategoryTypeEtc,
  storeCategoryTypeEtc,
  STORE,
  confirmModal,
}) => {
  const RenderDayRowData = ({rowData, rowNum}) => {
    let value = JSON.parse(JSON.stringify(days));
    return rowData.map((data, index) => {
      index = index + 5 * (rowNum - 1);
      return (
        <CheckDay
          key={index}
          isPerple={value[index] === true}
          onPress={() => {
            value.fill(false);
            value[index] = true;
            setDays(value);
          }}>
          <CheckDayText isPerple={value[index] === true}>{data}</CheckDayText>
        </CheckDay>
      );
    });
  };

  const renderDayRow = (rowData, rowNum) => {
    return (
      <Row>
        <RenderDayRowData rowData={rowData} rowNum={rowNum} />
      </Row>
    );
  };

  const SizeType = ({selection, text}) => {
    let value = JSON.parse(JSON.stringify(sizeTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setSizeTypeCheck(value);
          setTYPE(selection);
        }}>
        {sizeTypeCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  const CommuteType = ({selection, text}) => {
    let value = JSON.parse(JSON.stringify(commuteTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setCommuteTypeCheck(value);
          setCommuteType(selection == 0 ? '1' : '0');
        }}>
        {commuteTypeCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <TitleText>사업장 정보</TitleText>
            <GreyLine />
            <Text>사업장명</Text>
            <Row>
              <TextInput
                placeholder={'ex) OOO점'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setNAME(text);
                }}
                value={NAME}
              />
            </Row>
            <InputLine isBefore={NAME === ''} />
            <GreyText isError={NAME?.length > 10}>
              사업장명은 10자 이하로 입력해주세요.
            </GreyText>
            <WhiteSpace />
            <InputCaseRow style={{alignItems: 'flex-end'}}>
              <RowTouchable
                onPress={() => {
                  explainModal(
                    '',
                    '입력하신 주소로 출퇴근관리 QR키트를 발송해 드립니다. 일반우편으로 발송되며, 원활한 수령을 위하여 정확한 주소 입력 부탁드립니다.',
                  );
                }}>
                <Text>기본주소</Text>
                <HelpCircleIcon />
              </RowTouchable>
              <RequestButton onPress={() => gotoSearchAddress()}>
                <RequestText>주소 검색</RequestText>
              </RequestButton>
            </InputCaseRow>
            <TextInput
              placeholder={'서울시 성동구'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setADDR1(text)}
              value={ADDR1}
              editable={false}
            />
            <InputLine isBefore={ADDR1 === ''} />
            <WhiteSpace style={{height: 30}} />
            <Text>상세주소</Text>
            <TextInput
              placeholder={'1층 102호'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => {
                setADDR2(text);
              }}
              value={ADDR2}
            />
            <InputLine isBefore={ADDR2 === ''} />
            <WhiteSpace style={{height: 30}} />
            <InputCaseRow>
              <Text>사업장분류</Text>
              <RequestBorderButton onPress={() => setModalVisible5(true)}>
                <RequestBorderText> {storeCategoryType}</RequestBorderText>
              </RequestBorderButton>
            </InputCaseRow>
            {storeCategoryType == '기타' && (
              <>
                <WhiteSpace />
                <TextInput
                  placeholder={'기타 사업장 분류를 입력해주세요.'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => setStoreCategoryTypeEtc(text)}
                  value={storeCategoryTypeEtc}
                />
                <InputLine isBefore={storeCategoryTypeEtc === ''} />
              </>
            )}
          </Section>
          <Section>
            <TitleText>출퇴근정보 설정</TitleText>
            <GreyLine />
            <RowTouchable
              onPress={() => {
                explainModal(
                  '출퇴근방법 설정',
                  '-QR코드 출퇴근 : 샵솔에서 제공한 QR로만 출퇴근이 가능합니다.\n-GPS출퇴근 : 직원앱에서 GPS를 이용하여 바로 출퇴근 할 수 있습니다. 또한 QR코드 출퇴근 기능도 함께 사용할 수 있습니다.\n* 추후에 변경 가능합니다.',
                );
              }}>
              <Text>출퇴근방법 설정</Text>
              <HelpCircleIcon />
            </RowTouchable>
            <TypeCheckCase>
              <CommuteType selection={0} text={'GPS 출퇴근'} />
              <CommuteType selection={1} text={'QR코드 출퇴근'} />
            </TypeCheckCase>
            <WhiteSpace />
            <InputCaseRow>
              <RowTouchable
                style={{alignItems: 'flex-end'}}
                onPress={() =>
                  explainModal(
                    '출퇴근 허용거리',
                    '설정하신 거리 이내에서 출퇴근이 가능합니다.',
                  )
                }>
                <Text>출퇴근 허용거리</Text>
                <HelpCircleIcon />
              </RowTouchable>
              <RequestBorderButton onPress={() => setModalVisible4(true)}>
                <RequestBorderText>
                  {distance == '-1'
                    ? '거리 제한 없음'
                    : Number(distance) < 1000
                    ? distance + 'm'
                    : Number(distance) / 1000 + 'km'}
                </RequestBorderText>
              </RequestBorderButton>
            </InputCaseRow>
            <WhiteSpace />
            <InputCaseRow>
              <RowTouchable
                onPress={() => {
                  explainModal(
                    '지각 허용시간',
                    '설정한 시간까지는 지각을 하여도 급여에서 차감되지 않습니다. 단, 지각 허용시간을 초과할 경우에는 지각시간(허용시간+초과시간)이 차감됩니다.\nEx) 10분 설정 후 5분 지각 시 : 미차감\nEx) 10분 설정 후 15분 지각 시 : 15분 차감',
                  );
                }}>
                <Text>지각 허용시간</Text>
                <HelpCircleIcon />
              </RowTouchable>
              <RequestBorderButton onPress={() => setModalVisible2(true)}>
                <RequestBorderText>{LATE_TIME}분</RequestBorderText>
              </RequestBorderButton>
            </InputCaseRow>
            <WhiteSpace />
            <InputCaseRow>
              <RowTouchable
                onPress={() => {
                  explainModal(
                    '조퇴 허용시간',
                    '설정한 시간까지는 지각을 하여도 급여에서 차감되지 않습니다. 단, 조퇴 허용시간을 초과할 경우에는 조퇴시간(허용시간+초과시간)이 차감됩니다.\nEx) 10분 설정 후 5분 조퇴 시 : 미차감\nEx) 10분 설정 후 15분 조퇴 시 : 15분 차감',
                  );
                }}>
                <Text>조퇴 허용시간</Text>
                <HelpCircleIcon />
              </RowTouchable>
              <RequestBorderButton onPress={() => setModalVisible1(true)}>
                <RequestBorderText>{EARLY_TIME}분</RequestBorderText>
              </RequestBorderButton>
            </InputCaseRow>
          </Section>
          <Section>
            <TitleText>급여정보 설정</TitleText>
            <GreyLine />
            <RowTouchable
              onPress={() => {
                explainModal(
                  '사업장 규모',
                  '5인 이상 사업장 선택 시 추가근무, 야간근무 수당이 자동으로 가산됩니다. 자세한 설명은 [도움말 전체보기]에서 확인하세요.',
                );
              }}>
              <Text>사업장 규모</Text>
              <HelpCircleIcon />
            </RowTouchable>
            <TypeCheckCase>
              <SizeType selection={0} text={'5인 미만'} />
              <SizeType selection={1} text={'5인 이상'} />
            </TypeCheckCase>
            <WhiteSpace />
            <InputCaseRow>
              <Column>
                <RowTouchable
                  onPress={() => {
                    explainModal(
                      '급여정산일',
                      '급여가 계산되는 기간 설정입니다.\n(급여지급일과 혼동하지 마세요.)\nEx1) 25일 설정 : 전월 26일 ~ 당월 25일 기간동안의 급여계산\nEx2) 말일 설정 : 당월 1일 ~ 당월 말일 기간동안의 급여계산',
                    );
                  }}>
                  <Text>급여정산일</Text>
                  <HelpCircleIcon />
                </RowTouchable>
                <GreyText isError={false}>
                  급여산정 기간 설정으로 급여지급일과 혼동하지 마세요
                </GreyText>
              </Column>
              <RequestBorderButton
                onPress={() => {
                  let value = JSON.parse(JSON.stringify(days));
                  value.fill(false);
                  if (dayCheck) {
                    if (CALCULATE_DAY == '1') {
                      value[29] = true;
                    } else {
                      value[Number(CALCULATE_DAY) - 2] = true;
                    }
                  }
                  setModalVisible3(!modalVisible3);
                  setDays(value);
                }}>
                <RequestBorderText>
                  {CALCULATE_DAY == 1 ? '말일' : `${CALCULATE_DAY - 1}일`}
                </RequestBorderText>
              </RequestBorderButton>
            </InputCaseRow>
          </Section>
          <Modal
            isVisible={modalVisible1}
            onRequestClose={() => setModalVisible1(false)}
            onBackdropPress={() => setModalVisible1(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalList onPress={() => onPressEarly(0, '0')}>
                <ModalText>0분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(5, '1')}>
                <ModalText>5분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(10, '1')}>
                <ModalText>10분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(15, '1')}>
                <ModalText>15분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(30, '1')}>
                <ModalText>30분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(60, '1')}>
                <ModalText>60분</ModalText>
              </ModalList>
              <SubmitBtnContainer onPress={() => setModalVisible1(false)}>
                <SubmitBtnText>닫기</SubmitBtnText>
              </SubmitBtnContainer>
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={modalVisible2}
            onRequestClose={() => setModalVisible2(false)}
            onBackdropPress={() => setModalVisible2(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalList onPress={() => onPressLate(0, '0')}>
                <ModalText>0분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(5, '1')}>
                <ModalText>5분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(10, '1')}>
                <ModalText>10분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(15, '1')}>
                <ModalText>15분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(30, '1')}>
                <ModalText>30분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(60, '1')}>
                <ModalText>60분</ModalText>
              </ModalList>
              <SubmitBtnContainer onPress={() => setModalVisible2(false)}>
                <SubmitBtnText>닫기</SubmitBtnText>
              </SubmitBtnContainer>
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={modalVisible3}
            onRequestClose={() => setModalVisible3(false)}
            onBackdropPress={() => setModalVisible3(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalTitle>정산일 선택</ModalTitle>
              <ModalInfoText>
                * 30일, 31일은 '말일'로 선택해주세요.
              </ModalInfoText>
              <ModalCalendar>
                {renderDayRow([1, 2, 3, 4, 5], 1)}
                {renderDayRow([6, 7, 8, 9, 10], 2)}
                {renderDayRow([11, 12, 13, 14, 15], 3)}
                {renderDayRow([16, 17, 18, 19, 20], 4)}
                {renderDayRow([21, 22, 23, 24, 25], 5)}
                {renderDayRow([26, 27, 28, 29, '말일'], 6)}
              </ModalCalendar>
              <ModalConfirmArea>
                <ModalConfirm
                  color={'white'}
                  onPress={() => {
                    setModalVisible3(!modalVisible3);
                  }}>
                  <ModalConfirmText color={styleGuide.palette.primary}>
                    닫기
                  </ModalConfirmText>
                </ModalConfirm>
                <ModalConfirm
                  color={styleGuide.palette.primary}
                  onPress={() => checkDirectInput()}>
                  <ModalConfirmText color={'white'}>확인</ModalConfirmText>
                </ModalConfirm>
              </ModalConfirmArea>
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={modalVisible4}
            onRequestClose={() => setModalVisible4(false)}
            onBackdropPress={() => setModalVisible4(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalList onPress={() => onPressDistance('150')}>
                <ModalText>150m</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('200')}>
                <ModalText>200m</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('500')}>
                <ModalText>500m</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('1000')}>
                <ModalText>1km</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('1500')}>
                <ModalText>1.5km</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('2000')}>
                <ModalText>2km</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('4000')}>
                <ModalText>4km</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressDistance('-1')}>
                <ModalText>거리 제한 없음</ModalText>
              </ModalList>
              <SubmitBtnContainer onPress={() => setModalVisible4(false)}>
                <SubmitBtnText>닫기</SubmitBtnText>
              </SubmitBtnContainer>
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={modalVisible5}
            onRequestClose={() => setModalVisible5(false)}
            onBackdropPress={() => setModalVisible5(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              {helparr.map((data, index) => (
                <ModalList
                  key={index}
                  onPress={() => onPressCategory(data.TITLE)}>
                  <ModalText>{data.TITLE}</ModalText>
                </ModalList>
              ))}
              <SubmitBtnContainer onPress={() => setModalVisible5(false)}>
                <SubmitBtnText>닫기</SubmitBtnText>
              </SubmitBtnContainer>
            </ModalContainer>
          </Modal>
          {STORE == '1' && (
            <>
              <SubmitBtn
                text={'수정하기'}
                onPress={() => submit()}
                isRegisted={
                  NAME !== '' &&
                  NAME?.length < 11 &&
                  ADDR1 !== '' &&
                  ADDR2 !== '' &&
                  timeCheck == true &&
                  EARLYtimeCheck == true &&
                  dayCheck == true &&
                  storeCategoryType !== '분류 선택'
                }
              />
              <InputCase>
                <DeleteBtn
                  onPress={() =>
                    confirmModal('매장을 폐업상태로 변경하시겠습니까?')
                  }>
                  <DeleteBtnText>매장 폐업하기</DeleteBtnText>
                </DeleteBtn>
              </InputCase>
              <WhiteSpace />
            </>
          )}
        </Container>
      </ScrollView>
    </BackGround>
  );
};
