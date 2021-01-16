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
import {RenderProbation2} from './SetEmployeeInfoScreenRender';
import {
  PayCheck,
  SalarySystem,
  Authority,
} from './SetEmployeeInfoScreenComponents';
import {HelpCircleIcon} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import utils from '~/constants/utils';
import {
  RadioBtnOnIcon,
  RadioBtnOffIcon,
  BackIcon,
  ForwardIcon,
} from '~/constants/Icons';
import Chevron from '~/components/Chevron';
import styleGuide from '~/constants/styleGuide';

interface IsFirst {
  height?: number;
  isFirst?: boolean;
}

interface IsChecked {
  isChecked?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

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
  width: ${wp('100%') - 80}px;
  border-bottom-width: 0.7px;
  border-color: #cccccc;
  margin: 20px 0 30px 0;
`;

const TextInput = styled.TextInput`
  font-size: ${styleGuide.fontSize.large}px;
  margin-left: 5px;
  text-align: center;
  margin-right: 5px;
  width: 128px;
  text-align: right;
  padding: 0;
  height: 18px;
`;

const TextInputText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  margin-left: 5px;
  text-align: center;
  margin-right: 5px;
  width: 125px;
  text-align: right;
`;

const RedText = styled.Text`
  color: ${styleGuide.palette.redColor};
`;

const GreyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
`;

const Bold = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const BoxTitle = styled.View`
  width: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

const BigText = styled.Text`
  font-size: 24px;
  color: ${styleGuide.palette.primary};
`;

const WhiteText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
`;
const NameText = styled(WhiteText)`
  color: ${styleGuide.palette.greyColor};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const ModalContainerRow = styled(Row)`
  justify-content: center;
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

const ColumnPayBox = styled.View`
  width: ${wp('100%') - 80}px;
  padding: 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: #cccccc;
  align-items: center;
  margin: 10px 0;
`;

const ModalContainer = styled.View`
  height: 200px;
  padding: 40px;
  background-color: white;
`;

const ModalBox = styled.View`
  border-color: ${styleGuide.palette.borderColor};
  border-width: 1px;
  margin: 20px 0;
`;

const SelectArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ModalFooter = styled(SelectArea)`
  width: ${wp('100%')}px;
`;

const ModalBarButton = styled.TouchableOpacity`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
`;

const ModalButton = styled(ModalBarButton)`
  width: ${wp('50%')}px;
  border-color: ${styleGuide.palette.primary};
  background-color: white;
`;

const ModalSelectBox = styled.View`
  height: 100%;
  justify-content: center;
  align-items: flex-start;
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
  border-color: ${styleGuide.palette.arrowColor};
`;

const DateBoxText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
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

const TopArea = styled.View`
  width: 100%;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

const EmployeeCardText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  height: 15px;
  font-size: ${styleGuide.fontSize.small}px;
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
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
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

const InputCaseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
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

export default ({
  submitFn,
  payDay,
  setPayDay,
  startDay,
  setStartDay,
  endDay,
  setEndDay,
  endDayCheck,
  setEndDayCheck,
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
  CALCULATE_DAY,
  MANAGER_CALLED,
  scrollRef,
}) => {
  const DEDUCTION_TYPE_INDEX_INSURANCE = 0;
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
                  {IS_MANAGER === '1' ? `[${MANAGER_CALLED}]` : '[직원]'}
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
      <Animated.ScrollView
        ref={scrollRef}
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
                  출퇴근정보
                </DateBoxText>
                <Chevron {...{transition: click1Transition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  click1Transition,
                  0,
                  100 + (endDayCheck ? 45 : 170),
                ),
              }}>
              <InputCase isFirst={true}>
                <InputCaseRow>
                  <Row>
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
                  <RequestBorderButton
                    isChecked={true}
                    onPress={() => setIsStartDayModalVisible(true)}>
                    <RequestBorderText isChecked={true}>
                      {startDaySet
                        ? moment(startDay).format('YYYY년 M월 D일')
                        : moment().format('YYYY년 M월 D일')}
                    </RequestBorderText>
                  </RequestBorderButton>
                </InputCaseRow>
              </InputCase>
              <InputCase height={160}>
                <Touchable
                  onPress={() => {
                    setEndDayCheck(!endDayCheck);
                    startDay
                      ? setEndDay(moment(startDay).add(1, 'days').toDate())
                      : setEndDay(moment().add(1, 'days').toDate());
                  }}>
                  <SideBox>
                    {endDayCheck ? (
                      <RadioBtnOnIcon size={22} />
                    ) : (
                      <RadioBtnOffIcon size={22} />
                    )}
                    <Row>
                      <Text style={{marginLeft: 5}}>퇴사일 미정</Text>
                      <Touchable
                        onPress={() => {
                          explainModal(
                            '정해진 근무종료일이 없다면 [퇴사일 미정]으로 선택해주세요.\n\n* 직원이 퇴사하였을 경우 [직원정보]에서 퇴사일을 설정하면 사업장에서 직원이 더 이상 표시되지 않습니다.',
                          );
                        }}>
                        <HelpCircleIcon />
                      </Touchable>
                    </Row>
                  </SideBox>
                </Touchable>
                {!endDayCheck && (
                  <>
                    <WhiteSpace />
                    <ColumnPayBox>
                      <Row
                        style={{
                          width: wp('100%') - 80,
                          paddingHorizontal: 20,
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                        }}>
                        <Text>퇴사일</Text>
                        <RequestBorderButton
                          isChecked={endDaySet}
                          onPress={() => setIsEndDayModalVisible(true)}>
                          <RequestBorderText isChecked={endDaySet}>
                            {endDaySet
                              ? moment(endDay).format('YYYY년 M월 D일')
                              : '퇴사일 설정'}
                          </RequestBorderText>
                        </RequestBorderButton>
                      </Row>
                    </ColumnPayBox>
                  </>
                )}
              </InputCase>
            </HiddenItems>
            <BorderFooter
              onPress={() => setClick1(!click1)}
              activeOpacity={1}
            />

            <ListTouchable onPress={() => setClick2(!click2)}>
              <ListContainer as={Animated.View}>
                <DateBoxText style={{fontWeight: '600'}}>
                  <RedText>(필수) </RedText>
                  급여정보
                </DateBoxText>
                <Chevron {...{transition: click2Transition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  click2Transition,
                  0,
                  410 +
                    (payCheck[0] ? 85 : 0) +
                    (payCheck[0] && probation ? 255 : 0) +
                    (deductionTypeCheck.indexOf(true) == 0 ? 480 : 260),
                ),
              }}>
              <InputCase style={{paddingTop: 40}} isFirst={true} height={410}>
                <SelectArea style={{paddingHorizontal: 40}}>
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
                    <WhiteSpace />
                    <ColumnPayBox>
                      <Row
                        style={{width: 200, justifyContent: 'space-between'}}>
                        <Text>시급</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요'}
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
                      </Row>
                    </ColumnPayBox>
                    <GreyText
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 160,
                      }}>
                      2021년 최저 시급은 {utils.miniPay}원 입니다.
                    </GreyText>
                  </>
                )}
                {payCheck[1] && (
                  <>
                    <WhiteSpace />
                    <ColumnPayBox>
                      <Row
                        style={{width: 200, justifyContent: 'space-between'}}>
                        <Text>일급</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요'}
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
                      </Row>
                    </ColumnPayBox>
                  </>
                )}
                {payCheck[2] && (
                  <>
                    <WhiteSpace />
                    <ColumnPayBox>
                      <BoxTitle>
                        <Text>기본급</Text>
                        <Row>
                          <TextInput
                            placeholder={'금액을 입력해주세요'}
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
                            placeholder={'금액을 입력해주세요'}
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
                            placeholder={'금액을 입력해주세요'}
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
                            placeholder={'금액을 입력해주세요'}
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
                            placeholder={'금액을 입력해주세요'}
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
                      <Line style={{marginBottom: 20}} />
                      <BoxTitle>
                        <Text>합계</Text>
                        <Row>
                          <TextInput editable={false}>{total()}</TextInput>
                          <Text>원</Text>
                        </Row>
                      </BoxTitle>
                    </ColumnPayBox>
                  </>
                )}
                {!payCheck[2] && (
                  <>
                    <Line />
                    <ColumnPayBox style={{padding: 20}}>
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
                      <WhiteSpace />
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
                      <WhiteSpace />
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
                    </ColumnPayBox>
                  </>
                )}
              </InputCase>
              {payCheck[0] && (
                <InputCase height={probation ? 340 : 85}>
                  <WhiteSpace style={{height: 10}} />
                  <Line />
                  <Touchable
                    onPress={() => {
                      if (probation) {
                        let periodvalue = JSON.parse(
                          JSON.stringify(periodCheck),
                        ).fill(false);
                        let percentvalue = JSON.parse(
                          JSON.stringify(percentCheck),
                        ).fill(false);
                        setProbationPeriod(moment());
                        setProbationPercent('');
                        setPeriodCheck(periodvalue);
                        setPercentCheck(percentvalue);
                        setPercentDirectInput('');
                      }
                      setProbation(!probation);
                    }}>
                    <SideBox>
                      {!probation ? (
                        <RadioBtnOnIcon size={22} />
                      ) : (
                        <RadioBtnOffIcon size={22} />
                      )}
                      <Text style={{marginLeft: 5}}>수습기간 없음</Text>
                    </SideBox>
                  </Touchable>
                  {probation && (
                    <>
                      <WhiteSpace />
                      <ColumnPayBox>
                        <Row
                          style={{
                            width: wp('100%') - 80,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                          }}>
                          <Row>
                            <Text>수습종료일</Text>
                            <Touchable
                              onPress={() =>
                                explainModal(
                                  "급여계산 : 입력하신 '입사일'부터 '수습종료일'까지의 기간동안 '급여비율'에 따라 일할계산 됩니다.",
                                )
                              }>
                              <HelpCircleIcon />
                            </Touchable>
                          </Row>
                          <RequestBorderButton
                            isChecked={probationPeriodSet}
                            onPress={() => {
                              setProbationPeriod(
                                moment(startDay).add(1, 'days').toDate(),
                              );
                              setIsProbationPeriodModalVisible(true);
                            }}>
                            <RequestBorderText isChecked={probationPeriodSet}>
                              {probationPeriodSet
                                ? moment(probationPeriod).format(
                                    'YYYY년 M월 D일',
                                  )
                                : '수습종료일 설정'}
                            </RequestBorderText>
                          </RequestBorderButton>
                        </Row>
                        <WhiteSpace />
                        <Row
                          style={{
                            width: wp('100%') - 80,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                          }}>
                          <Text>수습기간 급여비율</Text>
                          <RequestBorderButton
                            isChecked={probationPercent != ''}
                            onPress={() =>
                              setIsProbationPercentModalVisible(true)
                            }>
                            <RequestBorderText
                              isChecked={probationPercent != ''}>
                              {probationPercent
                                ? `${probationPercent}%`
                                : '설정'}
                            </RequestBorderText>
                          </RequestBorderButton>
                        </Row>
                        <WhiteSpace />
                        <GreyText style={{marginTop: 10, textAlign: 'center'}}>
                          * 수습기간은 [입사일]인&nbsp;
                          <Bold>
                            {moment(startDay).format('YYYY년 M월 D일')}
                          </Bold>
                          부터
                        </GreyText>
                        <GreyText style={{marginTop: 10, textAlign: 'center'}}>
                          [수습종료일]까지 적용됩니다.
                        </GreyText>
                      </ColumnPayBox>
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
                          let value = JSON.parse(JSON.stringify(percentCheck));
                          value.fill(false);
                          setIsProbationPercentModalVisible(false);
                          setPercentCheck(value);
                          setPercentDirectInput('');
                        }}>
                        <NameText style={{color: styleGuide.palette.primary}}>
                          닫기
                        </NameText>
                      </ModalButton>
                      <ModalButton
                        style={{backgroundColor: styleGuide.palette.primary}}
                        onPress={() => checkDirectInput2()}>
                        <NameText style={{color: 'white'}}>확인</NameText>
                      </ModalButton>
                    </ModalFooter>
                  </Modal>
                </InputCase>
              )}
              <InputCase
                style={{paddingTop: 10}}
                isFirst={true}
                height={deductionTypeCheck.indexOf(true) == 0 ? 480 : 260}>
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
                <WhiteSpace />
                {deductionTypeCheck[DEDUCTION_TYPE_INDEX_INSURANCE] && (
                  <ColumnPayBox style={{alignItems: 'flex-start'}}>
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
                  </ColumnPayBox>
                )}

                <GreyText
                  style={{marginTop: 15, marginBottom: 5, textAlign: 'center'}}>
                  급여정산일은&nbsp;
                  <Bold>
                    {CALCULATE_DAY == 1
                      ? '매월 말일'
                      : `${CALCULATE_DAY - 1}일`}
                  </Bold>
                  입니다.
                </GreyText>
                <GreyText style={{marginBottom: 15, textAlign: 'center'}}>
                  <Bold>
                    {moment(payDay).format('YYYY년 M월')} {CALCULATE_DAY}
                  </Bold>
                  일부터 급여에 적용됩니다
                </GreyText>
                <Row style={{justifyContent: 'center', marginVertical: 10}}>
                  <DateBox
                    onPress={() =>
                      setPayDay(
                        moment(payDay)
                          .subtract(1, 'months')
                          .format('YYYY-MM-01'),
                      )
                    }>
                    <BackIcon size={22} color={styleGuide.palette.arrowColor} />
                  </DateBox>
                  <DateBoxText>
                    {moment(payDay).format('YYYY년 M월')}
                  </DateBoxText>
                  <DateBox
                    onPress={() =>
                      setPayDay(
                        moment(payDay).add(1, 'months').format('YYYY-MM-01'),
                      )
                    }>
                    <ForwardIcon
                      size={22}
                      color={styleGuide.palette.arrowColor}
                    />
                  </DateBox>
                </Row>
                <Row style={{marginTop: 10, justifyContent: 'center'}}>
                  <GreyText style={{textAlign: 'center'}}>
                    급여 적용 시작월은&nbsp;
                    <Bold>{moment(payDay).format('M월')}</Bold>입니다.
                  </GreyText>
                  <Touchable
                    onPress={() => {
                      explainModal(
                        '[ 급여 적용 시작월 이란? ]\n\n설정한 급여가 적용되는 월이며, 7월로 설정할 경우 정산일 기준 7월에 시작하는 날부터 적용됩니다.\nEx) 적용시작월 7월, 정산일 15일\n= 급여 계산 시작일: 7월16일\n\n[ 급여가 변경되었을 경우? ]\n\n기존 직원의 급여가 변경된 경우 [직원설정]에서 변경된 직원의 급여를 입력 후 변경이 시작되는 월을 설정해놓으면 해당 월부터 자동으로 급여 변경이 적용됩니다.',
                      );
                    }}>
                    <HelpCircleIcon />
                  </Touchable>
                </Row>
              </InputCase>
            </HiddenItems>
            <BorderFooter
              onPress={() => setClick2(!click2)}
              activeOpacity={1}
            />
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
                <Text
                  style={{fontSize: styleGuide.fontSize.large, color: 'white'}}>
                  확인
                </Text>
              </ModalBarButton>
            </Modal>

            <ListTouchable onPress={() => setClick4(!click4)}>
              <ListContainer as={Animated.View}>
                <DateBoxText style={{fontWeight: '600'}}>
                  (선택) 연차
                </DateBoxText>
                <Chevron {...{transition: click4Transition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{height: mix(click4Transition, 0, 200 + 80)}}>
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
                            alertModal('총연차보다 낮게 입력해주세요');
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
              <InputCase height={80}>
                <Row style={{justifyContent: 'center', marginVertical: 10}}>
                  <DateBox
                    onPress={() =>
                      setAnnual_START(
                        moment(annual_START).subtract(1, 'year').format('YYYY'),
                      )
                    }>
                    <BackIcon size={22} color={styleGuide.palette.arrowColor} />
                  </DateBox>
                  <DateBoxText>{annual_START}년</DateBoxText>
                  <DateBox
                    onPress={() =>
                      setAnnual_START(
                        moment(annual_START).add(1, 'year').format('YYYY'),
                      )
                    }>
                    <ForwardIcon
                      size={22}
                      color={styleGuide.palette.arrowColor}
                    />
                  </DateBox>
                </Row>
                <GreyText style={{marginTop: 10, textAlign: 'center'}}>
                  <Bold>{annual_START}년</Bold>에 연차가 적용됩니다.
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
                  (선택) 직책 / 권한 , 급여보기
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
                  positionCheck[1] ? 65 + 340 : 65 + 115,
                ),
              }}>
              <InputCase style={{paddingTop: 40}} isFirst={true} height={65}>
                <SelectArea style={{paddingHorizontal: 50}}>
                  <PositionType
                    selection={0}
                    text={'직원'}
                    positionCheck={positionCheck}
                    setPositionCheck={setPositionCheck}
                    authorityCheck={authorityCheck}
                    setAuthorityCheck={setAuthorityCheck}
                    explainModal={explainModal}
                    MANAGER_CALLED={MANAGER_CALLED}
                  />
                  <PositionType
                    selection={1}
                    text={MANAGER_CALLED}
                    positionCheck={positionCheck}
                    setPositionCheck={setPositionCheck}
                    authorityCheck={authorityCheck}
                    setAuthorityCheck={setAuthorityCheck}
                    explainModal={explainModal}
                    MANAGER_CALLED={MANAGER_CALLED}
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
                      text={`[${MANAGER_CALLED}] 직원급여/일정 수정 가능`}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      alertModal={alertModal}
                      explainModal={explainModal}
                    />
                    <WhiteSpace />
                    <Authority
                      selection={2}
                      text={`[${MANAGER_CALLED}] 직원 캘린더 수정 가능`}
                      authorityCheck={authorityCheck}
                      setAuthorityCheck={setAuthorityCheck}
                      alertModal={alertModal}
                      explainModal={explainModal}
                    />
                    <WhiteSpace />
                    <Authority
                      selection={3}
                      text={`[${MANAGER_CALLED}] 타 직원 출퇴근 알람 받기`}
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
      </Animated.ScrollView>
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
            maximumDate={endDay && moment(endDay).toDate()}
            onDateChange={(date) => {
              setStartDaySet(true);
              setStartDay(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setIsStartDayModalVisible(false);
              setStartDaySet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
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
            minimumDate={startDay && moment(startDay).add(1, 'days').toDate()}
            onDateChange={(date) => {
              setEndDaySet(true);
              setEndDay(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setIsEndDayModalVisible(false);
              setEndDayCheck(false);
              setEndDaySet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
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
            minimumDate={startDay && moment(startDay).add(1, 'days').toDate()}
            maximumDate={endDay && moment(endDay).toDate()}
            onDateChange={(date) => {
              setProbationPeriodSet(true);
              setProbationPeriod(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setIsProbationPeriodModalVisible(false);
              setProbationPeriodSet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
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
