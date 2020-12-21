import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {mix, useTransition} from 'react-native-redash';
import Animated from 'react-native-reanimated';

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
import Chevron from '~/components/Chevron';

interface IBox {
  isBold: boolean;
}
interface IsBefore {
  isBefore: boolean;
}

interface IsFirst {
  height?: number;
  isFirst?: boolean;
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

const RedText = styled.Text`
  color: #ff3d3d;
`;

const GreyText = styled.Text`
  color: #7c7c7c;
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
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

const DateTouchable = styled.TouchableOpacity`
  justify-content: flex-end;
  padding-bottom: 5px;
  height: 35px;
`;

const BigText = styled.Text`
  font-size: 24px;
  color: #e85356;
`;

const WhiteText = styled.Text`
  font-size: 16px;
  color: white;
`;
const NameText = styled(WhiteText)`
  color: #7f7f7f;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const ModalContainerRow = styled(Row)`
  justify-content: center;
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

const InputCase = styled.View<IsFirst>`
  width: ${wp('100%') - 40}px;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${(props) => (props.isFirst ? 25 : 0)}px;
  height: ${(props) =>
    props.height ? props.height : props.isFirst ? 110 : 70}px;
`;

const ContentsBox = styled.View`
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-around;
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
  width: ${wp('100%') - 80}px;
  padding: 20px;
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
  background-color: transparent;
  border-width: 2px;
  border-color: #f4aaab;
`;

const DateBoxText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #7f7f7f;
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
  border-color: #888;
  bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const DatePickerRoundView = styled.View`
  position: absolute;
  width: 250px;
  height: 60px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: #ddd;
  bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const DatePickerText = styled.Text`
  font-weight: 200;
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const TopArea = styled.View`
  width: 100%;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

const EmployeeCardText = styled.Text`
  color: #7f7f7f;
  height: 15px;
  font-size: 10px;
`;

const EmployeeCardContainer = styled.View`
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NameBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const DateText = styled.Text`
  color: #7f7f7f;
  font-size: 12px;
`;

const ListTouchable = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const ListContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${wp('100%') - 40}px;
  padding: 25px 20px 0 20px;
`;

const HiddenItems = styled.View`
  overflow: hidden;
  align-items: center;
`;

const BorderFooter = styled.TouchableOpacity`
  width: ${wp('100%') - 40}px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: white;
  height: 25px;
  margin-bottom: 20px;
  overflow: hidden;
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
  startDaySet,
  setStartDaySet,
  endDaySet,
  setEndDaySet,
  probationPeriodSet,
  setProbationPeriodSet,
  IS_MANAGER,
  EMP_PAY_TYPE,
  START,
  END,
  PAY,
  mobileNo,
}) => {
  const DEDUCTION_TYPE_INDEX_INSURANCE = 0;
  const py = Number(moment().format('YY'));
  const click1Transition = useTransition(click1);
  const click2Transition = useTransition(click2);
  const click4Transition = useTransition(click4);
  const click5Transition = useTransition(click5);

  const EmployeeCard = () => {
    return (
      <TopArea>
        <EmployeeCardContainer>
          <FastImage
            style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
            source={{
              uri: `http://133.186.210.223/uploads/${IMAGE}`,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <NameBox>
            <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
              <NameText style={{marginRight: 10}}>{name}</NameText>
              {IS_MANAGER && (
                <DateText>
                  {IS_MANAGER === '1' ? '[매니저]' : '[스태프]'}
                </DateText>
              )}
            </Row>
            {mobileNo && <EmployeeCardText>{mobileNo}</EmployeeCardText>}
            {EMP_PAY_TYPE && PAY && (
              <EmployeeCardText>
                {EMP_PAY_TYPE === '0' && '시급'}
                {EMP_PAY_TYPE === '1' && '일급'}
                {EMP_PAY_TYPE === '2' && '월급'}&nbsp;
                {PAY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </EmployeeCardText>
            )}
            {START && (
              <>
                <EmployeeCardText>
                  근무기간&nbsp;({moment().diff(moment(START), 'month')}개월)
                </EmployeeCardText>
                <EmployeeCardText>
                  {moment(START).format('YYYY.MM.DD')} ~&nbsp;
                  {END ? moment(END).format('YYYY.MM.DD') : '계속'}
                </EmployeeCardText>
              </>
            )}
          </NameBox>
        </EmployeeCardContainer>
      </TopArea>
    );
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <EmployeeCard />

            <ListTouchable onPress={() => setClick1(!click1)}>
              <ListContainer as={Animated.View}>
                <DateBoxText style={{fontWeight: '600'}}>
                  <RedText>(필수) </RedText>
                  출퇴근정보 입력
                </DateBoxText>
                <Chevron {...{transition: click1Transition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{height: mix(click1Transition, 0, 100 * 2 + 10)}}>
              <InputCase isFirst={true}>
                <Row>
                  <RedText>*</RedText>
                  <Text>입사일</Text>
                  <Touchable
                    onPress={() => {
                      explainModal(
                        '직원의 출퇴근관리가 시작되는 날입니다.\n\n기존 직원은 앱 설치 당일로 설정하시길 권장드립니다.\n신규 직원일 경우에는 근로계약서 상 근무시작일로 입력해 주세요.',
                      );
                    }}>
                    <HelpCircleIcon />
                  </Touchable>
                </Row>
                <DateTouchable onPress={() => setIsStartDayModalVisible(true)}>
                  <Text>{moment(startDay).format('YYYY.MM.DD')}</Text>
                </DateTouchable>
                <InputLine isBefore={false} />
              </InputCase>
              <InputCase height={150}>
                <Row>
                  <RedText>*</RedText>
                  <Text>퇴사일</Text>
                  <Touchable
                    onPress={() => {
                      explainModal(
                        '정해진 근무종료일이 없다면 [퇴사일 없음]으로 선택해주세요.\n\n* 직원이 퇴사하였을 경우 [직원정보]에서 퇴사일을 설정하면 사업장에서 직원이 더 이상 표시되지 않습니다.',
                      );
                    }}>
                    <HelpCircleIcon />
                  </Touchable>
                </Row>
                <DateTouchable
                  onPress={() => setIsEndDayModalVisible(true)}
                  disabled={endDayCheck}>
                  <Text>
                    {!endDayCheck ? moment(endDay).format('YYYY.MM.DD') : ''}
                  </Text>
                </DateTouchable>
                <InputLine isBefore={endDayCheck} />
                <Touchable
                  style={{marginTop: 10}}
                  onPress={() => {
                    setEndDayCheck(!endDayCheck);
                    setEndDay(moment());
                  }}>
                  <SideBox>
                    {endDayCheck ? (
                      <CheckBoxIcon size={25} color="#e85356" />
                    ) : (
                      <CheckBoxIcon size={25} color="#CCCCCC" />
                    )}
                    <GreyText style={{marginLeft: 10}}>퇴사일 없음</GreyText>
                  </SideBox>
                </Touchable>
              </InputCase>
            </HiddenItems>
            <BorderFooter
              onPress={() => setClick1(!click1)}
              activeOpacity={1}
            />

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
                    <RedText>*</RedText>
                    <Text>급여 유형&nbsp;</Text>
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
                            {moment(startDay).format('YYYY년 M월 D일')}부터
                            [수습종료일]까지 적용됩니다.
                          </GreyText>
                          <FlexEndBox>
                            <Row>
                              <ProbationText>수습종료일</ProbationText>
                              <ProbationTouchable
                                onPress={() =>
                                  setIsProbationPeriodModalVisible(true)
                                }>
                                <Text>
                                  {moment(probationPeriod).format(
                                    'YYYY년 M월 D일',
                                  )}
                                </Text>
                              </ProbationTouchable>
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
                      <RedText>*</RedText>
                      <Text>공제 유형 선택&nbsp;</Text>
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
                    <RedText>*</RedText>
                    <Text>적용 시작 월 설정</Text>
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

            <ListTouchable onPress={() => setClick4(!click4)}>
              <ListContainer as={Animated.View}>
                <DateBoxText style={{fontWeight: '600'}}>
                  (선택) 연차 설정
                </DateBoxText>
                <Chevron {...{transition: click4Transition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{height: mix(click4Transition, 0, 200 + 70)}}>
              <InputCase isFirst={true} height={200}>
                <ColumnPayBox>
                  <BoxTitle>
                    <Text>총 연차</Text>
                    <Row>
                      <TextInput
                        placeholder={'연차를 입력해주세요'}
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
                          width: 130,
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
                        placeholder={'연차를 입력해주세요'}
                        placeholderTextColor={'#E5E5E5'}
                        onChangeText={(text) => {
                          if (Number(totalVacation) - Number(text) < 0) {
                            alertModal('총연차보다 낮게 입력해주세요.');
                            setUseVacation('0');
                            setRemainderVacation(
                              Number(totalVacation) - Number('0'),
                            );
                          } else {
                            setRemainderVacation(
                              Number(totalVacation) - Number(text),
                            );
                            setUseVacation(text.replace(/,/g, ''));
                          }
                        }}
                        value={useVacation
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        keyboardType={'number-pad'}
                        maxLength={3}
                        style={{
                          width: 130,
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
              </InputCase>
              <InputCase>
                <Row style={{justifyContent: 'center', marginVertical: 10}}>
                  <DateBox
                    onPress={() =>
                      setAnnual_START(
                        moment(annual_START).subtract(1, 'year').format('YYYY'),
                      )
                    }>
                    <BackIcon size={22} color={'#f4aaab'} />
                  </DateBox>
                  <DateBoxText>{annual_START}년</DateBoxText>
                  <DateBox
                    onPress={() =>
                      setAnnual_START(
                        moment(annual_START).add(1, 'year').format('YYYY'),
                      )
                    }>
                    <ForwardIcon size={22} color={'#f4aaab'} />
                  </DateBox>
                </Row>
                <GreyText style={{textAlign: 'center'}}>
                  {annual_START}년에 연차가 적용됩니다.
                </GreyText>
              </InputCase>
            </HiddenItems>
            <BorderFooter
              onPress={() => setClick4(!click4)}
              activeOpacity={1}
            />

            <ListTouchable onPress={() => setClick5(!click5)}>
              <ListContainer as={Animated.View}>
                <DateBoxText style={{fontWeight: '600'}}>
                  (선택) 직책/권한 설정, 급여보기 설정
                </DateBoxText>
                <Chevron {...{transition: click5Transition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  click5Transition,
                  0,
                  positionCheck[1] ? 50 + 340 : 50 + 115,
                ),
              }}>
              <InputCase isFirst={true} height={50}>
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

              {positionCheck[1] ? (
                <InputCase isFirst={true} height={340}>
                  <ColumnPayBox>
                    <Authority
                      selection={0}
                      text={'선택 시 본인급여 확인 가능'}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      alertModal={alertModal}
                      explainModal={explainModal}
                    />
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
                  </ColumnPayBox>
                </InputCase>
              ) : (
                <InputCase isFirst={true} height={115}>
                  <ColumnPayBox>
                    <Authority
                      selection={0}
                      text={'선택 시 본인급여 확인 가능'}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      alertModal={alertModal}
                      explainModal={explainModal}
                    />
                  </ColumnPayBox>
                </InputCase>
              )}
            </HiddenItems>
            <BorderFooter
              onPress={() => setClick5(!click5)}
              activeOpacity={1}
            />

            <WhiteSpace />
            <SubmitBtn
              isRegisted={true}
              onPress={() => submitFn()}
              text={isEditMode ? '수정완료' : '입력완료'}
            />
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Modal
        onRequestClose={() => setIsStartDayModalVisible(false)}
        onBackdropPress={() => setIsStartDayModalVisible(false)}
        isVisible={isStartDayModalVisible}
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
            date={moment(startDay).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            onDateChange={(date) => {
              setStartDaySet(true);
              setStartDay(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {startDaySet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsStartDayModalVisible(false);
                setStartDaySet(true);
              }}
              rippleColor={'#666'}
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
        </DatePickerContainer>
      </Modal>
      <Modal
        onRequestClose={() => setIsEndDayModalVisible(false)}
        onBackdropPress={() => setIsEndDayModalVisible(false)}
        isVisible={isEndDayModalVisible}
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
            date={moment(endDay).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            minimumDate={moment(startDay).add(1, 'days').toDate()}
            onDateChange={(date) => {
              setEndDaySet(true);
              setEndDay(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {endDaySet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsEndDayModalVisible(false);
                setEndDayCheck(false);
                setEndDaySet(true);
              }}
              rippleColor={'#666'}
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
        </DatePickerContainer>
      </Modal>
      <Modal
        onRequestClose={() => setIsProbationPeriodModalVisible(false)}
        onBackdropPress={() => setIsProbationPeriodModalVisible(false)}
        isVisible={isProbationPeriodModalVisible}
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
            date={moment(probationPeriod).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            minimumDate={moment(startDay).add(1, 'days').toDate()}
            onDateChange={(date) => {
              setProbationPeriodSet(true);
              setProbationPeriod(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {probationPeriodSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsProbationPeriodModalVisible(false);
                setProbationPeriodSet(true);
              }}
              rippleColor={'#666'}
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
        </DatePickerContainer>
      </Modal>
    </BackGround>
  );
};
