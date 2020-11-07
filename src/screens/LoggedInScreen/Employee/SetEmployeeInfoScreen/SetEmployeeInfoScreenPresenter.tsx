import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import DatePickerModal from 'react-native-modal-datetime-picker';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import {
  WeekType,
  DeductionType,
  InsuranceType,
  PositionType,
  RestType,
} from './SetEmployeeInfoScreenType';
import {
  RenderProbation2,
  RenderPayYear,
  RenderPayMonth,
} from './SetEmployeeInfoScreenRender';
import {
  PayCheck,
  SalarySystem,
  Authority,
} from './SetEmployeeInfoScreenComponents';
import {
  CheckBoxIcon,
  UpIcon,
  DownIcon,
  HelpCircleIcon,
} from '~/constants/Icons';
import InputLine from '~/components/InputLine';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import utils from '~/constants/utils';
import {BackIcon, ForwardIcon} from '~/constants/Icons';

interface IBox {
  isBold: boolean;
}
interface IsBefore {
  isBefore: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 25px;
`;

const Line = styled.View`
  width: ${wp('90%') - 60}px;
  border-bottom-width: 2px;
  border-color: #e5e5e5;
  margin: 20px 0;
`;
const DivideLine = styled(Line)`
  width: 100%;
`;

const TextInput = styled.TextInput`
  font-size: 15px;
  margin-left: 5px;
  text-align: center;
  margin-right: 20px;
`;

const TextInputText = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  text-align: center;
  margin-right: 20px;
`;

const EmployeeBox = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const EmployeeText = styled.Text`
  margin-left: 10px;
  color: #707070;
  font-size: 20px;
`;

const RedText = styled.Text`
  color: #ff3d3d;
`;

const GreyText = styled.Text`
  color: #aaa;
  font-size: 13px;
`;

const Box = styled.TouchableOpacity<IBox>`
  width: 100%;
  height: 60px;
  margin: 10px 0;
  border-width: ${(props) => (props.isBold ? 2 : 1)};
  border-color: #999;
  border-radius: 10px;
  background-color: #f7f5f5;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const BoxTitle = styled.View`
  width: 100%;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WorkTypeRow = styled(BoxTitle)`
  margin-top: 20px;
  padding: 0;
`;

const InsuranceBox = styled.View`
  margin-top: 20px;
  border-width: 1px;
  border-radius: 10px;
  border-color: #cccccc;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #999;
`;

const DateTouchable = styled.TouchableOpacity`
  justify-content: flex-end;
  padding-bottom: 5px;
  height: 40px;
`;

const AuthorityBox = styled.View`
  margin: 0 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: #e5e5e5;
  border-width: 2px;
  align-items: flex-start;
`;

const BigText = styled.Text`
  font-size: 24px;
  color: #e85356;
`;

const WhiteText = styled.Text`
  font-size: 16px;
  color: white;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const ModalContainerRow = styled(Row)`
  justify-content: center;
`;
const NameText = styled.Text`
  font-size: 18px;
`;
const Bold = styled(NameText)`
  font-weight: bold;
`;
const SmallBold = styled(Text)`
  font-weight: bold;
`;
const SideBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const InputCase = styled.View`
  margin: 10px;
`;

const ContentsBox = styled.View`
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-around;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: #212121;
`;

const PayBox = styled.View`
  width: 100%;
  padding: 30px 50px;
  border-width: 1px;
  border-radius: 20px;
  border-color: #cccccc;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
`;

const ColumnPayBox = styled.View`
  width: 100%;
  padding: 30px 50px;
  border-width: 1px;
  border-radius: 20px;
  border-color: #cccccc;
  align-items: center;
  margin: 10px 0;
`;

const FlexEndBox = styled.View`
  align-items: flex-end;
  margin-top: 15px;
`;

const ProbationText = styled.Text`
  text-align: right;
  font-size: 15px;
  width: ${wp('60%') - 10};
`;

const ModalContainer = styled.View`
  height: 200px;
  padding: 40px;
  background-color: white;
`;

const ModalBox = styled.View`
  border-color: #f2f2f2;
  border-width: 1px;
  margin: 20px 0;
`;

const SelectArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ModalFooter = styled(SelectArea)`
  width: ${wp('100%')}px;
`;

const ModalBarButton = styled.TouchableOpacity`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

const ModalButton = styled(ModalBarButton)`
  width: ${wp('50%')}px;
  border-color: #e85356;
  background-color: white;
`;

const SalarySystemBox = styled.View`
  margin-bottom: 10px;
  align-items: flex-start;
`;

const DateInputCase = styled.TouchableOpacity<IsBefore>`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  border-color: ${(props) => (props.isBefore ? '#E5E5E5' : '#e85356')};
  border-width: 2px;
  margin-left: 20px;
`;

const ModalSelectBox = styled.View`
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const ProbationTouchable = styled(Touchable)`
  width: 120px;
  height: 30px;
  border-width: 1px;
  border-color: #999;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const DateBox = styled.TouchableOpacity`
  margin: 0 20px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #eee;
`;

export default ({
  submitFn,
  payDay,
  payMonth,
  payYear,
  payYearModal,
  setPayYearModal,
  payMonthModal,
  setPayMonthModal,
  startDay,
  setStartDay,
  endDay,
  setEndDay,
  endDayCheck,
  setEndDayCheck,
  setPayDay,
  setPayMonth,
  name,
  click1,
  setClick1,
  click2,
  setClick2,
  click4,
  setClick4,
  click5,
  setClick5,
  authorityCheck,
  setAuthorityCheck,
  alertModal,
  explainModal,
  positionCheck,
  setPositionCheck,
  restTypeCheck,
  setRestTypeCheck,
  restTime,
  setRestTime,
  isStartDayModalVisible,
  setIsStartDayModalVisible,
  isEndDayModalVisible,
  setIsEndDayModalVisible,
  isProbationPeriodModalVisible,
  setIsProbationPeriodModalVisible,
  isProbationPercentModalVisible,
  setIsProbationPercentModalVisible,
  isSalaryModalVisible2,
  setIsSalaryModalVisible2,
  payCheck,
  pay,
  setPay,
  pay2,
  setPay2,
  pay3,
  setPay3,
  pay4,
  setPay4,
  pay5,
  setPay5,
  setPayCheck,
  total,
  probation,
  setProbation,
  probationPeriod,
  setProbationPeriod,
  probationPercent,
  setProbationPercent,
  periodCheck,
  setPeriodCheck,
  percentCheck,
  setPercentCheck,
  percentDirectInput,
  setPercentDirectInput,
  checkDirectInput2,
  setWeekTypeCheck,
  setWeekTime,
  salarySystemCheck,
  setSalarySystemCheck,
  isSalaryModalVisible1,
  setIsSalaryModalVisible1,
  isHelpModalVisible,
  setIsHelpModalVisible,
  deductionTypeCheck,
  setDeductionTypeCheck,
  insuranceCheck,
  setInsuranceCheck,
  getPeriod,
  payYearCheck,
  setPayYearCheck,
  payMonthCheck,
  setPayMonthCheck,
  payYearDirectInput,
  setPayYearDirectInput,
  PYcheckDirectInput,
  weekTypeCheck,
  weekTime,
  isEditMode,
  totalVacation,
  setTotalVacation,
  useVacation,
  setUseVacation,
  remainderVacation,
  setRemainderVacation,
  annual_START,
  setAnnual_START,
  IMAGE,
}) => {
  const DEDUCTION_TYPE_INDEX_INSURANCE = 0;
  const py = Number(moment().format('YY'));
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <EmployeeBox>
              <FastImage
                style={{width: 60, height: 60, borderRadius: 30}}
                source={{
                  uri: `http://133.186.210.223/uploads/${IMAGE}`,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <EmployeeText>{name}</EmployeeText>
            </EmployeeBox>
            <Box isBold={click1} onPress={() => setClick1(!click1)}>
              <BoxTitle>
                <TitleText>
                  <RedText>(필수) </RedText>
                  출퇴근정보 입력
                </TitleText>
                {click1 ? <UpIcon color="#999" /> : <DownIcon color="#999" />}
              </BoxTitle>
            </Box>
            {click1 && (
              <ContentsBox>
                <InputCase>
                  <Row>
                    <Text>입사일</Text>
                    <RedText>*</RedText>
                    <Touchable
                      onPress={() => {
                        explainModal(
                          '직원의 출퇴근관리가 시작되는 날입니다.\n\n기존 직원은 앱 설치 당일로 설정하시길 권장드립니다.\n신규 직원일 경우에는 근로계약서 상 근무시작일로 입력해 주세요.',
                        );
                      }}>
                      <HelpCircleIcon />
                    </Touchable>
                  </Row>
                  <DatePickerModal
                    headerTextIOS={'시작일을 선택하세요.'}
                    cancelTextIOS={'취소'}
                    confirmTextIOS={'확인'}
                    isVisible={isStartDayModalVisible}
                    mode="date"
                    locale="ko_KRus_EN"
                    onConfirm={(date) => {
                      setStartDay(moment(date).format('YYYY-MM-DD'));
                      setEndDayCheck(false);
                      setIsStartDayModalVisible(false);
                    }}
                    onCancel={() => {
                      setIsStartDayModalVisible(false);
                    }}
                    display="default"
                  />
                  <DateTouchable
                    onPress={() => setIsStartDayModalVisible(true)}>
                    <Text>
                      {startDay ? moment(startDay).format('YYYY.MM.DD') : ''}
                    </Text>
                  </DateTouchable>
                  <InputLine isBefore={startDay === ''} />
                </InputCase>
                <InputCase>
                  <Row>
                    <Text>퇴사일</Text>
                    <RedText>*</RedText>
                    <Touchable
                      onPress={() => {
                        explainModal(
                          '정해진 근무종료일이 없다면 [퇴사일 없음]으로 선택해주세요.\n\n* 직원이 퇴사하였을 경우 [직원정보]에서 퇴사일을 설정하면 사업장에서 직원이 더 이상 표시되지 않습니다.',
                        );
                      }}>
                      <HelpCircleIcon />
                    </Touchable>
                  </Row>
                  <DatePickerModal
                    headerTextIOS={'퇴사일을 선택하세요.'}
                    cancelTextIOS={'취소'}
                    confirmTextIOS={'확인'}
                    isVisible={isEndDayModalVisible}
                    mode="date"
                    minimumDate={moment(startDay).add(1, 'days').toDate()}
                    locale="ko_KRus_EN"
                    onConfirm={(date) => {
                      setEndDay(moment(date).format('YYYY-MM-DD'));
                      setEndDayCheck(false);
                      setIsEndDayModalVisible(false);
                    }}
                    onCancel={() => {
                      setEndDayCheck(false), setIsEndDayModalVisible(false);
                    }}
                    display="default"
                  />
                  <DateTouchable
                    onPress={() => setIsEndDayModalVisible(true)}
                    disabled={endDayCheck}>
                    <Text>
                      {endDay ? moment(endDay).format('YYYY.MM.DD') : ''}
                    </Text>
                  </DateTouchable>
                  <InputLine isBefore={endDay === ''} />
                  <Touchable
                    style={{marginTop: 20}}
                    onPress={() => {
                      setEndDayCheck(!endDayCheck);
                      setEndDay('');
                    }}>
                    <SideBox>
                      {endDayCheck ? (
                        <CheckBoxIcon size={25} color="#e85356" />
                      ) : (
                        <CheckBoxIcon size={25} color="#CCCCCC" />
                      )}
                      <SideText>퇴사일 없음</SideText>
                    </SideBox>
                  </Touchable>
                </InputCase>
              </ContentsBox>
            )}
            <Box
              isBold={click2}
              onPress={() => {
                setClick2(!click2), setPayMonth(moment(payDay).format('MM'));
              }}>
              <BoxTitle>
                <TitleText>
                  <RedText>(필수) </RedText>
                  급여정보 입력
                </TitleText>
                {click2 ? <UpIcon color="#999" /> : <DownIcon color="#999" />}
              </BoxTitle>
            </Box>
            {click2 && (
              <ContentsBox>
                <InputCase>
                  <Row>
                    <Text>급여 유형&nbsp;</Text>
                    <RedText>*</RedText>
                  </Row>
                  <Line />
                  <SelectArea>
                    <PayCheck
                      selection={0}
                      text={'시급'}
                      payCheck={payCheck}
                      setPay2={setPay2}
                      setPay3={setPay3}
                      setPay4={setPay4}
                      setPay5={setPay5}
                      setPayCheck={setPayCheck}
                    />
                    <PayCheck
                      selection={1}
                      text={'일급'}
                      payCheck={payCheck}
                      setPay2={setPay2}
                      setPay3={setPay3}
                      setPay4={setPay4}
                      setPay5={setPay5}
                      setPayCheck={setPayCheck}
                    />
                    <PayCheck
                      selection={2}
                      text={'월급'}
                      payCheck={payCheck}
                      setPay2={setPay2}
                      setPay3={setPay3}
                      setPay4={setPay4}
                      setPay5={setPay5}
                      setPayCheck={setPayCheck}
                    />
                  </SelectArea>
                  {payCheck[0] && (
                    <>
                      <PayBox>
                        <Text>시급</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              setPay(text.replace(/,/g, ''));
                            }}
                            value={pay
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text>원</Text>
                        </Row>
                      </PayBox>
                      <GreyText>
                        *2020년 최저 시급은 {utils.miniPay}원 입니다.
                      </GreyText>
                    </>
                  )}
                  {payCheck[1] && (
                    <PayBox>
                      <Text>일급</Text>
                      <Row>
                        <TextInput
                          placeholder={'금액을 입력해주세요.'}
                          placeholderTextColor={'#E5E5E5'}
                          onChangeText={(text) => {
                            setPay(text.replace(/,/g, ''));
                          }}
                          value={pay
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          keyboardType={'number-pad'}
                        />
                        <Text>원</Text>
                      </Row>
                    </PayBox>
                  )}
                  {payCheck[2] && (
                    <ColumnPayBox>
                      <BoxTitle>
                        <Text>기본급</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              setPay(text.replace(/,/g, ''));
                            }}
                            value={pay
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                      <WhiteSpace />
                      <BoxTitle>
                        <Text>식대</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              setPay2(text.replace(/,/g, ''));
                            }}
                            onFocus={() => setPay2('')}
                            onBlur={() => pay2 === '' && setPay2('0')}
                            value={pay2
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                      <WhiteSpace />
                      <BoxTitle>
                        <Text>자가운전</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              setPay3(text.replace(/,/g, ''));
                            }}
                            onFocus={() => setPay3('')}
                            onBlur={() => pay3 === '' && setPay3('0')}
                            value={pay3
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                      <WhiteSpace />
                      <BoxTitle>
                        <Text>상여</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              setPay4(text.replace(/,/g, ''));
                            }}
                            onFocus={() => setPay4('')}
                            onBlur={() => pay4 === '' && setPay4('0')}
                            value={pay4
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                      <WhiteSpace />
                      <BoxTitle>
                        <Text>성과급</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              setPay5(text.replace(/,/g, ''));
                            }}
                            onFocus={() => setPay5('')}
                            onBlur={() => pay5 === '' && setPay5('0')}
                            value={pay5
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                      <Line />
                      <BoxTitle>
                        <Text>합계</Text>
                        <Row>
                          <TextInput editable={false}>{total()}</TextInput>
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                    </ColumnPayBox>
                  )}
                  {payCheck[0] && (
                    <>
                      <WorkTypeRow>
                        <Row>
                          <Text>수습기간 설정</Text>
                          <Touchable
                            onPress={() =>
                              explainModal(
                                "급여계산 : 입력하신 '입사일'부터 '수습종료일'까지의 기간동안 '급여비율'에 따라 일할계산 됩니다.",
                              )
                            }>
                            <HelpCircleIcon />
                          </Touchable>
                        </Row>
                        <Touchable
                          onPress={() => {
                            if (probation) {
                              let periodvalue = JSON.parse(
                                JSON.stringify(periodCheck),
                              ).fill(false);
                              let percentvalue = JSON.parse(
                                JSON.stringify(percentCheck),
                              ).fill(false);
                              setProbationPeriod('');
                              setProbationPercent('');
                              setPeriodCheck(periodvalue);
                              setPercentCheck(percentvalue);
                              setPercentDirectInput('');
                            }
                            setProbation(!probation);
                          }}>
                          {probation ? (
                            <CheckBoxIcon size={25} color="#e85356" />
                          ) : (
                            <CheckBoxIcon size={25} color="#CCCCCC" />
                          )}
                        </Touchable>
                      </WorkTypeRow>
                      <DivideLine />
                      {probation && (
                        <>
                          <GreyText>
                            * 수습기간은 [입사일]인&nbsp;
                            {startDay.substr(0, 4)}년&nbsp;
                            {startDay.substr(5, 2)}월&nbsp;
                            {startDay.substr(8, 2)}일부터 [수습종료일]까지
                            적용됩니다.
                          </GreyText>
                          <FlexEndBox>
                            <Row>
                              <ProbationText>수습종료일</ProbationText>
                              <ProbationTouchable
                                onPress={() =>
                                  setIsProbationPeriodModalVisible(true)
                                }>
                                <Text>{probationPeriod}</Text>
                              </ProbationTouchable>
                              <DatePickerModal
                                headerTextIOS={'종료일을 선택하세요.'}
                                cancelTextIOS={'취소'}
                                confirmTextIOS={'확인'}
                                isVisible={isProbationPeriodModalVisible}
                                mode="date"
                                minimumDate={moment(startDay)
                                  .add(1, 'days')
                                  .toDate()}
                                locale="ko_KRus_EN"
                                onConfirm={(date) => {
                                  setIsProbationPeriodModalVisible(false);
                                  setProbationPeriod(
                                    moment(date).format('YYYY-MM-DD'),
                                  );
                                }}
                                onCancel={() => {
                                  setIsProbationPeriodModalVisible(false);
                                }}
                                display="default"
                              />
                            </Row>
                            <Row>
                              <ProbationText>급여비율</ProbationText>
                              <ProbationTouchable
                                onPress={() => {
                                  setIsProbationPercentModalVisible(true);
                                }}>
                                <Text>
                                  {probationPercent}
                                  {probationPercent && '%'}
                                </Text>
                              </ProbationTouchable>
                            </Row>
                          </FlexEndBox>
                        </>
                      )}
                      <Modal
                        onRequestClose={() => {
                          let value = JSON.parse(JSON.stringify(percentCheck));
                          value.fill(false);
                          setIsProbationPercentModalVisible(false);
                          setPercentCheck(value);
                          setPercentDirectInput('');
                        }}
                        onBackdropPress={() => {
                          let value = JSON.parse(JSON.stringify(percentCheck));
                          value.fill(false);
                          setIsProbationPercentModalVisible(false);
                          setPercentCheck(value);
                          setPercentDirectInput('');
                        }}
                        isVisible={isProbationPercentModalVisible}
                        style={{margin: 0, justifyContent: 'flex-end'}}
                        avoidKeyboard={true}>
                        <ModalContainer>
                          <TitleText>급여비율 선택(%)</TitleText>
                          <ModalBox>
                            <RenderProbation2
                              rowData={[100, 90, 80, 70]}
                              rowNum={1}
                              percentCheck={percentCheck}
                              setPercentCheck={setPercentCheck}
                              percentDirectInput={percentDirectInput}
                              setPercentDirectInput={setPercentDirectInput}
                            />
                            <RenderProbation2
                              rowData={[60, 50, 'directInput']}
                              rowNum={2}
                              percentCheck={percentCheck}
                              setPercentCheck={setPercentCheck}
                              percentDirectInput={percentDirectInput}
                              setPercentDirectInput={setPercentDirectInput}
                            />
                          </ModalBox>
                        </ModalContainer>
                        <ModalFooter>
                          <ModalButton
                            onPress={() => {
                              let value = JSON.parse(
                                JSON.stringify(percentCheck),
                              );
                              value.fill(false);
                              setIsProbationPercentModalVisible(false);
                              setPercentCheck(value);
                              setPercentDirectInput('');
                            }}>
                            <NameText style={{color: '#e85356'}}>닫기</NameText>
                          </ModalButton>
                          <ModalButton
                            style={{backgroundColor: '#e85356'}}
                            onPress={() => checkDirectInput2()}>
                            <NameText style={{color: 'white'}}>확인</NameText>
                          </ModalButton>
                        </ModalFooter>
                      </Modal>
                    </>
                  )}
                  {!payCheck[2] && (
                    <SalarySystemBox>
                      <Text>항목 선택</Text>
                      <DivideLine />
                      <SalarySystem
                        selection={1}
                        weekTime={weekTime}
                        restTime={restTime}
                        text={'주휴수당 자동 가산'}
                        setRestTypeCheck={setRestTypeCheck}
                        setRestTime={setRestTime}
                        setWeekTypeCheck={setWeekTypeCheck}
                        setWeekTime={setWeekTime}
                        salarySystemCheck={salarySystemCheck}
                        setSalarySystemCheck={setSalarySystemCheck}
                        explainModal={explainModal}
                        isSalaryModalVisible1={isSalaryModalVisible1}
                        setIsSalaryModalVisible1={setIsSalaryModalVisible1}
                        isSalaryModalVisible2={isSalaryModalVisible2}
                        setIsSalaryModalVisible2={setIsSalaryModalVisible2}
                        isHelpModalVisible={isHelpModalVisible}
                        setIsHelpModalVisible={setIsHelpModalVisible}
                      />
                      <SalarySystem
                        selection={2}
                        weekTime={weekTime}
                        restTime={restTime}
                        text={'휴게시간 자동 차감'}
                        setRestTypeCheck={setRestTypeCheck}
                        setRestTime={setRestTime}
                        setWeekTypeCheck={setWeekTypeCheck}
                        setWeekTime={setWeekTime}
                        salarySystemCheck={salarySystemCheck}
                        setSalarySystemCheck={setSalarySystemCheck}
                        explainModal={explainModal}
                        isSalaryModalVisible1={isSalaryModalVisible1}
                        setIsSalaryModalVisible1={setIsSalaryModalVisible1}
                        isSalaryModalVisible2={isSalaryModalVisible2}
                        setIsSalaryModalVisible2={setIsSalaryModalVisible2}
                        isHelpModalVisible={isHelpModalVisible}
                        setIsHelpModalVisible={setIsHelpModalVisible}
                      />
                      <SalarySystem
                        selection={0}
                        weekTime={weekTime}
                        restTime={restTime}
                        text={'추가, 야간, 휴일수당 50% 자동 가산'}
                        setRestTypeCheck={setRestTypeCheck}
                        setRestTime={setRestTime}
                        setWeekTypeCheck={setWeekTypeCheck}
                        setWeekTime={setWeekTime}
                        salarySystemCheck={salarySystemCheck}
                        setSalarySystemCheck={setSalarySystemCheck}
                        explainModal={explainModal}
                        isSalaryModalVisible1={isSalaryModalVisible1}
                        setIsSalaryModalVisible1={setIsSalaryModalVisible1}
                        isSalaryModalVisible2={isSalaryModalVisible2}
                        setIsSalaryModalVisible2={setIsSalaryModalVisible2}
                        isHelpModalVisible={isHelpModalVisible}
                        setIsHelpModalVisible={setIsHelpModalVisible}
                      />
                    </SalarySystemBox>
                  )}
                  <ContentsBox>
                    <Row>
                      <Text>공제 유형 선택&nbsp;</Text>
                      <RedText>*</RedText>
                    </Row>
                    <Line />
                    <SelectArea>
                      <DeductionType
                        selection={0}
                        text={'4대보험'}
                        deductionTypeCheck={deductionTypeCheck}
                        setDeductionTypeCheck={setDeductionTypeCheck}
                      />
                      <DeductionType
                        selection={1}
                        text={'프리랜서(3.3%)'}
                        deductionTypeCheck={deductionTypeCheck}
                        setDeductionTypeCheck={setDeductionTypeCheck}
                      />
                      <DeductionType
                        selection={2}
                        text={'적용안함'}
                        deductionTypeCheck={deductionTypeCheck}
                        setDeductionTypeCheck={setDeductionTypeCheck}
                      />
                    </SelectArea>
                    {deductionTypeCheck[DEDUCTION_TYPE_INDEX_INSURANCE] && (
                      <InsuranceBox>
                        <InsuranceType
                          selection={0}
                          text={'국민연금'}
                          insuranceCheck={insuranceCheck}
                          setInsuranceCheck={setInsuranceCheck}
                        />
                        <WhiteSpace />
                        <InsuranceType
                          selection={1}
                          text={'건강보험'}
                          insuranceCheck={insuranceCheck}
                          setInsuranceCheck={setInsuranceCheck}
                        />
                        <WhiteSpace />
                        <InsuranceType
                          selection={2}
                          text={'고용보험'}
                          insuranceCheck={insuranceCheck}
                          setInsuranceCheck={setInsuranceCheck}
                        />
                        <WhiteSpace />
                        <InsuranceType
                          selection={3}
                          text={'산재보험'}
                          insuranceCheck={insuranceCheck}
                          setInsuranceCheck={setInsuranceCheck}
                        />
                      </InsuranceBox>
                    )}
                  </ContentsBox>
                  <Row>
                    <Text>적용 시작 월 설정</Text>
                    <RedText>*</RedText>
                    <Touchable
                      onPress={() => {
                        explainModal(
                          '[ 급여 적용 시작월 이란? ]\n\n설정한 급여가 적용되는 월이며, 7월로 설정할 경우 정산일 기준 7월에 시작하는 날부터 적용됩니다.\nEx) 적용시작월 7월, 정산일 15일\n= 급여 계산 시작일: 7월16일\n\n[ 급여가 변경되었을 경우? ]\n\n기존 직원의 급여가 변경된 경우 [직원설정]에서 변경된 직원의 급여를 입력 후 변경이 시작되는 월을 설정해놓으면 해당 월부터 자동으로 급여 변경이 적용됩니다.',
                        );
                      }}>
                      <HelpCircleIcon />
                    </Touchable>
                  </Row>
                  <Line />
                  <Row style={{marginBottom: 5}}>
                    <SmallBold>급여정산일:&nbsp;</SmallBold>
                    <Text>
                      {utils.calculateDay == 1
                        ? '매월 말일'
                        : `${utils.calculateDay - 1}일`}
                    </Text>
                  </Row>
                  <Row>
                    <SmallBold>{getPeriod(utils.calculateDay)}</SmallBold>
                    <Text>부터 급여에 적용됩니다</Text>
                  </Row>
                  <WhiteSpace />
                  <FlexEndBox>
                    <Row>
                      <Text>20</Text>
                      <DateInputCase
                        style={{marginLeft: 5}}
                        onPress={() => setPayYearModal(true)}
                        isBefore={payMonth === ''}>
                        <Bold>{payYear}</Bold>
                      </DateInputCase>
                      <Text>&nbsp;년</Text>
                      <DateInputCase
                        onPress={() => setPayMonthModal(true)}
                        isBefore={payMonth === ''}>
                        <Bold>{payMonth}</Bold>
                      </DateInputCase>
                      <Text>&nbsp;월</Text>
                    </Row>
                  </FlexEndBox>
                </InputCase>
              </ContentsBox>
            )}
            <Modal
              onRequestClose={() => {
                let value = JSON.parse(JSON.stringify(payYearCheck));
                value.fill(false);
                setPayYearModal(false);
                setPayYearCheck(value);
              }}
              onBackdropPress={() => {
                let value = JSON.parse(JSON.stringify(payYearCheck));
                value.fill(false);
                setPayYearModal(false);
                setPayYearCheck(value);
              }}
              isVisible={payYearModal}
              style={{margin: 0, justifyContent: 'flex-end'}}
              avoidKeyboard={true}>
              <ModalContainer>
                <TitleText>년도 선택</TitleText>
                <ModalBox>
                  <RenderPayYear
                    rowData={[py - 3, py - 2, py - 1, py]}
                    rowNum={1}
                    payYearCheck={payYearCheck}
                    setPayYearCheck={setPayYearCheck}
                    payYearDirectInput={payYearDirectInput}
                    setPayYearDirectInput={setPayYearDirectInput}
                  />
                  <RenderPayYear
                    rowData={[Number(py) + 1, Number(py) + 2, 'directInput']}
                    rowNum={2}
                    payYearCheck={payYearCheck}
                    setPayYearCheck={setPayYearCheck}
                    payYearDirectInput={payYearDirectInput}
                    setPayYearDirectInput={setPayYearDirectInput}
                  />
                </ModalBox>
              </ModalContainer>
              <ModalFooter>
                <ModalButton
                  onPress={() => {
                    let value = JSON.parse(JSON.stringify(payYearCheck));
                    value.fill(false);
                    setPayYearModal(false);
                    setPayYearCheck(value);
                  }}>
                  <NameText style={{color: '#e85356'}}>닫기</NameText>
                </ModalButton>
                <ModalButton
                  style={{backgroundColor: '#e85356'}}
                  onPress={() => {
                    PYcheckDirectInput();
                  }}>
                  <NameText style={{color: 'white'}}>확인</NameText>
                </ModalButton>
              </ModalFooter>
            </Modal>
            <Modal
              onRequestClose={() => {
                let value = JSON.parse(JSON.stringify(payMonthCheck));
                value.fill(false);
                setPayMonthModal(false);
                setPayMonthCheck(value);
              }}
              onBackdropPress={() => {
                let value = JSON.parse(JSON.stringify(payMonthCheck));
                value.fill(false);
                setPayMonthModal(false);
                setPayMonthCheck(value);
              }}
              isVisible={payMonthModal}
              style={{margin: 0, justifyContent: 'flex-end'}}
              avoidKeyboard={true}>
              <ModalContainer style={{height: 250}}>
                <TitleText>월 선택</TitleText>
                <ModalBox>
                  <RenderPayMonth
                    rowData={[1, 2, 3, 4]}
                    rowNum={1}
                    payMonthCheck={payMonthCheck}
                    setPayMonthCheck={setPayMonthCheck}
                  />
                  <RenderPayMonth
                    rowData={[5, 6, 7, 8]}
                    rowNum={2}
                    payMonthCheck={payMonthCheck}
                    setPayMonthCheck={setPayMonthCheck}
                  />
                  <RenderPayMonth
                    rowData={[9, 10, 11, 12]}
                    rowNum={3}
                    payMonthCheck={payMonthCheck}
                    setPayMonthCheck={setPayMonthCheck}
                  />
                </ModalBox>
              </ModalContainer>
              <ModalFooter>
                <ModalButton
                  onPress={() => {
                    let value = JSON.parse(JSON.stringify(payMonthCheck));
                    value.fill(false);
                    setPayMonthModal(false);
                    setPayMonthCheck(value);
                  }}>
                  <NameText style={{color: '#e85356'}}>닫기</NameText>
                </ModalButton>
                <ModalButton
                  style={{backgroundColor: '#e85356'}}
                  onPress={() => {
                    let value = JSON.parse(JSON.stringify(payMonthCheck));
                    value.fill(false);
                    if (!payMonthCheck.includes(true)) {
                      return;
                    }
                    let payMonth = payMonthCheck.indexOf(true) + 1;
                    let payMonthFormat = payMonth;
                    payMonthFormat < 10
                      ? (payMonthFormat = '0' + payMonthFormat)
                      : payMonthFormat;
                    setPayMonthModal(false);
                    setPayMonth(payMonth);
                    setPayDay(`20${payYear}-${payMonthFormat}-01`);
                    setPayMonthCheck(value);
                  }}>
                  <NameText style={{color: 'white'}}>확인</NameText>
                </ModalButton>
              </ModalFooter>
            </Modal>
            <Modal
              isVisible={isSalaryModalVisible1}
              onRequestClose={() => setIsSalaryModalVisible1(false)}
              onBackdropPress={() => setIsSalaryModalVisible1(false)}
              style={{margin: 0, justifyContent: 'flex-end'}}
              avoidKeyboard={true}>
              <ModalContainer>
                <ModalContainerRow>
                  <BigText>주휴수당 계산 방법 선택</BigText>
                </ModalContainerRow>
                <ModalSelectBox>
                  <WeekType
                    selection={1}
                    text={'(자동) 근로기준법 기준'}
                    weekTypeCheck={weekTypeCheck}
                    setWeekTypeCheck={setWeekTypeCheck}
                    weekTime={weekTime}
                    setWeekTime={setWeekTime}
                  />
                  <WhiteSpace />
                  <WeekType
                    selection={0}
                    text={'(수동) 월 근무시간 입력'}
                    weekTypeCheck={weekTypeCheck}
                    setWeekTypeCheck={setWeekTypeCheck}
                    weekTime={weekTime}
                    setWeekTime={setWeekTime}
                  />
                </ModalSelectBox>
              </ModalContainer>
              <ModalBarButton
                onPress={() => {
                  if (weekTypeCheck[0]) {
                    if (weekTime === '') {
                      alertModal(
                        '수동 선택시 월 근무시간을 반드시 입력해주세요',
                      );
                      return;
                    } else if (isNaN(Number(weekTime))) {
                      alertModal('근무시간에 숫자만 입력 가능합니다.');
                      return;
                    } else if (Number(weekTime) < 0) {
                      alertModal('근무시간에 음수를 입력할 수 없습니다');
                      return;
                    }
                  }
                  setIsSalaryModalVisible1(false);
                }}>
                <WhiteText>확인</WhiteText>
              </ModalBarButton>
            </Modal>
            <Modal
              isVisible={isSalaryModalVisible2}
              onRequestClose={() => setIsSalaryModalVisible2(false)}
              onBackdropPress={() => setIsSalaryModalVisible2(false)}
              style={{margin: 0, justifyContent: 'flex-end'}}
              avoidKeyboard={true}>
              <ModalContainer>
                <ModalContainerRow>
                  <BigText>휴게시간 계산 방법 선택</BigText>
                </ModalContainerRow>
                <ModalSelectBox>
                  <RestType
                    selection={1}
                    text={'(자동) 근로기준법 기준'}
                    restTypeCheck={restTypeCheck}
                    setRestTypeCheck={setRestTypeCheck}
                    restTime={restTime}
                    setRestTime={setRestTime}
                  />
                  <WhiteSpace />
                  <RestType
                    selection={0}
                    text={'(수동) 일 휴게시간 입력'}
                    restTypeCheck={restTypeCheck}
                    setRestTypeCheck={setRestTypeCheck}
                    restTime={restTime}
                    setRestTime={setRestTime}
                  />
                </ModalSelectBox>
              </ModalContainer>
              <ModalBarButton
                onPress={() => {
                  if (restTypeCheck[0]) {
                    if (restTime === '') {
                      return alertModal(
                        '수동 선택시 일 휴게시간을 반드시 입력해주세요',
                      );
                    } else if (isNaN(Number(restTime))) {
                      return alertModal('휴게시간에 숫자만 입력 가능합니다.');
                    } else if (Number(restTime) < 0) {
                      return alertModal('휴게시간에 음수를 입력할 수 없습니다');
                    }
                  }
                  setIsSalaryModalVisible2(false);
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
              </ModalBarButton>
            </Modal>
            <Box isBold={click4} onPress={() => setClick4(!click4)}>
              <BoxTitle>
                <TitleText>(선택) 연차 설정</TitleText>
                {click4 ? <UpIcon color="#999" /> : <DownIcon color="#999" />}
              </BoxTitle>
            </Box>
            {click4 && (
              <ContentsBox>
                <InputCase>
                  <Row>
                    <Text>연차 입력</Text>
                    <RedText>*</RedText>
                  </Row>
                  <Line />
                </InputCase>
                <ColumnPayBox>
                  <BoxTitle>
                    <Text>총 연차</Text>
                    <Row>
                      <TextInput
                        placeholder={'0'}
                        placeholderTextColor={'#E5E5E5'}
                        onChangeText={(text) => {
                          setRemainderVacation(
                            Number(text) - Number(useVacation),
                          );
                          setTotalVacation(text.replace(/,/g, ''));
                        }}
                        value={totalVacation
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        keyboardType={'number-pad'}
                        maxLength={3}
                        style={{
                          width: 100,
                          textAlign: 'right',
                        }}
                      />
                      <Text>일</Text>
                    </Row>
                  </BoxTitle>
                  <WhiteSpace />
                  <BoxTitle>
                    <Text>사용 연차</Text>
                    <Row>
                      <TextInput
                        placeholder={'0'}
                        placeholderTextColor={'#E5E5E5'}
                        onChangeText={(text) => {
                          setRemainderVacation(
                            Number(totalVacation) - Number(text),
                          );
                          setUseVacation(text.replace(/,/g, ''));
                        }}
                        value={useVacation
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        keyboardType={'number-pad'}
                        maxLength={3}
                        style={{
                          width: 100,
                          textAlign: 'right',
                        }}
                      />
                      <Text>일</Text>
                    </Row>
                  </BoxTitle>
                  <WhiteSpace />
                  <BoxTitle>
                    <Text>남은 연차</Text>
                    <Row>
                      <TextInputText>{remainderVacation}</TextInputText>
                      <Text>일</Text>
                    </Row>
                  </BoxTitle>
                </ColumnPayBox>
                <InputCase>
                  <Row>
                    <Text>연차적용 연도</Text>
                    <RedText>*</RedText>
                  </Row>
                  <Line />
                  <Row style={{justifyContent: 'center'}}>
                    <DateBox
                      onPress={() =>
                        setAnnual_START(
                          moment(annual_START)
                            .subtract(1, 'year')
                            .format('YYYY'),
                        )
                      }>
                      <BackIcon size={16} color={'#000'} />
                    </DateBox>
                    <NameText>{annual_START}년</NameText>
                    <DateBox
                      onPress={() =>
                        setAnnual_START(
                          moment(annual_START).add(1, 'year').format('YYYY'),
                        )
                      }>
                      <ForwardIcon size={16} color={'#000'} />
                    </DateBox>
                  </Row>
                </InputCase>
              </ContentsBox>
            )}
            <Box isBold={click5} onPress={() => setClick5(!click5)}>
              <BoxTitle>
                <TitleText>(선택) 직책/권한 설정, 급여보기 설정</TitleText>
                {click5 ? <UpIcon color="#999" /> : <DownIcon color="#999" />}
              </BoxTitle>
            </Box>
            {click5 && (
              <ContentsBox>
                <InputCase>
                  <Row>
                    <Text>직책 선택</Text>
                    <RedText>*</RedText>
                  </Row>
                  <Line />
                  <SelectArea>
                    <PositionType
                      selection={0}
                      text={'스태프'}
                      positionCheck={positionCheck}
                      setPositionCheck={setPositionCheck}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      explainModal={explainModal}
                    />
                    <PositionType
                      selection={1}
                      text={'매니저'}
                      positionCheck={positionCheck}
                      setPositionCheck={setPositionCheck}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      explainModal={explainModal}
                    />
                  </SelectArea>
                </InputCase>
                {positionCheck.includes(true) && (
                  <AuthorityBox>
                    <Authority
                      selection={0}
                      text={'선택 시 본인급여 확인 가능'}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      alertModal={alertModal}
                      explainModal={explainModal}
                    />
                    {positionCheck[1] && (
                      <>
                        <WhiteSpace />
                        <Authority
                          selection={4}
                          text={'선택 시 사업장 급여 확인 가능'}
                          authorityCheck={authorityCheck}
                          setAuthorityCheck={setAuthorityCheck}
                          alertModal={alertModal}
                          explainModal={explainModal}
                        />
                        <Line />
                        <Authority
                          selection={1}
                          text={'[매니저] 직원급여/일정 수정 가능'}
                          authorityCheck={authorityCheck}
                          setAuthorityCheck={setAuthorityCheck}
                          alertModal={alertModal}
                          explainModal={explainModal}
                        />
                        <WhiteSpace />
                        <Authority
                          selection={2}
                          text={'[매니저] 직원 캘린더 수정 가능'}
                          authorityCheck={authorityCheck}
                          setAuthorityCheck={setAuthorityCheck}
                          alertModal={alertModal}
                          explainModal={explainModal}
                        />
                        <WhiteSpace />
                        <Authority
                          selection={3}
                          text={'[매니저] 타 직원 출퇴근 알람 받기'}
                          authorityCheck={authorityCheck}
                          setAuthorityCheck={setAuthorityCheck}
                          alertModal={alertModal}
                          explainModal={explainModal}
                        />
                      </>
                    )}
                  </AuthorityBox>
                )}
              </ContentsBox>
            )}
            <SubmitBtn
              isRegisted={true}
              onPress={() => submitFn()}
              text={isEditMode ? '수정완료' : '입력완료'}
            />
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </BackGround>
  );
};
