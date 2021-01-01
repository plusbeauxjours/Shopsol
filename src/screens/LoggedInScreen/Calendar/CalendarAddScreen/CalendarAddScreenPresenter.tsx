import React, {useRef} from 'react';
import styled from 'styled-components/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Calendar} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {mix, useTransition} from 'react-native-redash';
import Animated from 'react-native-reanimated';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  RadioBtnOffIcon,
  RadioBtnOnIcon,
  AddCircleIcon,
  RemoveCircleIcon,
  EllipseIcon,
} from '~/constants/Icons';
import CalendarAddScreenCard from './CalendarAddScreenCard';
import RoundBtn from '~/components/Btn/RoundBtn';
import {} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';
import Chevron from '~/components/Chevron';

interface IsFirst {
  isFirst?: boolean;
}
interface IsSelected {
  isSelected: boolean;
  color?: string;
}

interface IColor {
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text<IColor>`
  color: ${(props) => (props.color ? styleGuide.palette.primary : 'black')};
`;

const SelectedText = styled.Text<IsSelected>`
  margin-left: 10px;
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowTouchable = styled.TouchableOpacity<IsSelected>`
  padding: 10px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-width: 0.7px;
  border-radius: 15px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
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

const TimePickBox = styled.View`
  padding: 20px;
`;

const ChecktimeButton = styled.TouchableOpacity`
  padding: 5px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${styleGuide.palette.primary};
`;

const ChecktimeButtonText = styled.Text`
  color: ${styleGuide.palette.primary};
  font-weight: 400;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const RenderWorkDayTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  z-index: 2;
`;

const IncentiveText = styled.Text`
  margin-left: 10;
  font-size: 15px;
`;

const EmptySpace = styled.View`
  width: 45px;
`;

const TimeRowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TimeRowSpaceTouchable = styled(TimeRowTouchable)`
  justify-content: space-around;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: #212121;
`;

const TimePickBoxTimeText = styled.Text<IsSelected>`
  font-size: 17px;
  color: ${(props) =>
    props.isSelected ? styleGuide.palette.primary : '#cccccc'};
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
  background-color: ${utils.isAndroid
    ? styleGuide.palette.greyColor
    : 'rgba(0,0,0,0.7)'};
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
  color: ${styleGuide.palette.greyColor};
  text-align: center;
`;

const TitleText = styled.Text`
  font-size: 16px;
  color: #999;
  font-weight: bold;
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: #${styleGuide.palette.borderColor};
  height: 1px;
`;

const ListTouchable = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const DateBoxText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${styleGuide.palette.greyColor};
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
  align-items: flex-start;
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

const MainItemContainer = styled.TouchableOpacity<IsFirst>`
  width: ${wp('100%') - 40}px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-top: ${(props) => (props.isFirst ? 20 : 0)}px;
  height: ${(props) => (props.isFirst ? 60 : 40)}px;
`;

export default ({
  alertModal,
  markedDates,
  setMarkedDates,
  emplist,
  timeCheck,
  registerFn,
  addEmpFn,
  deleteEmpFn,
  checkAddTimeFn,
  deleteColorFn,
  choiceEmp,
  startTime,
  endTime,
  timeSelected,
  setTimeSelected,
  stepFourClick,
  setStepFourClick,
  incentiveCheck,
  setIncentiveCheck,
  isStartTimeModalVisible,
  setIsStartTimeModalVisible,
  isEndTimeModalVisible,
  setIsEndTimeModalVisible,
  setStartTime,
  setEndTime,
  toastFn,
  isToastVisible,
  startTimeSet,
  setStartTimeSet,
  endTimeSet,
  setEndTimeSet,
}) => {
  const RBSheetRef = useRef(null);
  const stepFourClickTransition = useTransition(stepFourClick);

  const FixScheduleStepOne = () => (
    <Section>
      <RowTitle>
        <TitleText>직원 선택</TitleText>
        <ChecktimeButton onPress={() => RBSheetRef.current.open()}>
          <ChecktimeButtonText>직원 선택하기</ChecktimeButtonText>
        </ChecktimeButton>
      </RowTitle>
      {choiceEmp?.length !== 0 && (
        <>
          <GreyLine />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginTop: 10}}>
            {choiceEmp?.map((data, index) => (
              <Touchable key={index} onPress={() => deleteEmpFn(data.MobileNo)}>
                <CalendarAddScreenCard name={data.NAME} image={data.IMAGE} />
              </Touchable>
            ))}
          </ScrollView>
        </>
      )}
    </Section>
  );

  const FixScheduleStepTwo = () => (
    <Section>
      <TitleText>출퇴근 시간 입력</TitleText>
      <GreyLine />
      <TimePickBox>
        <TimeRowSpaceTouchable onPress={() => setIsStartTimeModalVisible(true)}>
          <SideText>출근시간</SideText>
          <TimePickBoxTimeText isSelected={!!moment(startTime).format('HH:mm')}>
            {startTimeSet ? moment(startTime).format('HH:mm') : '00:00'}
          </TimePickBoxTimeText>
        </TimeRowSpaceTouchable>
        <WhiteSpace />
        <TimeRowSpaceTouchable onPress={() => setIsEndTimeModalVisible(true)}>
          <SideText>퇴근시간</SideText>
          <TimePickBoxTimeText isSelected={!!moment(endTime).format('HH:mm')}>
            {endTimeSet ? moment(endTime).format('HH:mm') : '00:00'}
          </TimePickBoxTimeText>
        </TimeRowSpaceTouchable>
      </TimePickBox>
      <WhiteSpace />
      <RoundBtn
        isInSection={true}
        text={'출퇴근 목록에 추가'}
        onPress={() => checkAddTimeFn()}
        isRegisted={true}
      />
      <WhiteSpace />
      {timeCheck?.length > 0 && <GreyLine />}
      {timeCheck?.map((data, index) => (
        <RowTouchable
          key={index}
          isSelected={timeSelected === index}
          color={data.color}
          onPress={() => setTimeSelected(index)}>
          <Row>
            <EllipseIcon color={data.color} />
            <SelectedText
              isSelected={timeSelected === index}
              color={data.color}>
              {data.start} ~ {data.end}
            </SelectedText>
          </Row>
          <Row>
            <SelectedText
              isSelected={timeSelected === index}
              color={data.color}>
              선택
            </SelectedText>
            {timeSelected === index ? (
              <RenderWorkDayTouchable onPress={() => deleteColorFn(index)}>
                <RemoveCircleIcon size={30} />
              </RenderWorkDayTouchable>
            ) : (
              <EmptySpace />
            )}
          </Row>
        </RowTouchable>
      ))}
    </Section>
  );

  const FixScheduleStepThree = () => (
    <Section>
      <TitleText>근무일 입력</TitleText>
      <GreyLine />
      <Calendar
        theme={{
          arrowColor: 'black',
          todayTextColor: styleGuide.palette.primary,
        }}
        monthFormat={'yyyy년 M월'}
        hideExtraDays={true}
        onDayPress={(day) => {
          if (timeSelected === null) {
            return alertModal('추가하신 출퇴근 시간을 먼저 선택해주세요.');
          }
          let temp = {
            key: timeCheck[timeSelected].color,
            color: timeCheck[timeSelected].color,
          };
          let value = JSON.parse(JSON.stringify(markedDates));
          let testIndex;
          if (value[day.dateString]) {
            testIndex = value[day.dateString].dots.findIndex(
              (element) => element.key === temp.key,
            );
            if (testIndex === -1) {
              value[day.dateString] = {
                dots: [temp],
              };
            } else {
              value[day.dateString].dots.splice(testIndex, 1);
            }
          } else {
            value[day.dateString] = {
              dots: [temp],
            };
          }
          setMarkedDates(value);
        }}
        markedDates={markedDates}
        markingType={'multi-dot'}
        locale="ko"
      />
    </Section>
  );

  const FixScheduleStepFour = () => (
    <>
      <ListTouchable onPress={() => setStepFourClick(!stepFourClick)}>
        <ListContainer as={Animated.View}>
          <DateBoxText>(선택) 수당 포함여부</DateBoxText>
          <Chevron {...{transition: stepFourClickTransition}} />
        </ListContainer>
      </ListTouchable>
      <HiddenItems
        as={Animated.View}
        style={{
          height: mix(stepFourClickTransition, 0, 60 + 40 + 40),
        }}>
        <Incentive selection={0} text={'적용(1배)'} isFirst={true} />
        <Incentive selection={1} text={'초과, 야간근무수당 적용(1.5배)'} />
        <Incentive selection={2} text={'초과, 야간근무수당 중복적용(2배)'} />
      </HiddenItems>
      <BorderFooter
        onPress={() => setStepFourClick(!stepFourClick)}
        activeOpacity={1}
      />
    </>
  );

  const Incentive = ({isFirst = false, selection, text}) => {
    let valueI = JSON.parse(JSON.stringify(incentiveCheck));
    return (
      <MainItemContainer
        isFirst={isFirst}
        onPress={() => {
          valueI.fill(false);
          valueI[selection] = true;
          setIncentiveCheck(valueI);
        }}>
        <Row>
          {incentiveCheck[selection] ? (
            <RadioBtnOnIcon size={22} />
          ) : (
            <RadioBtnOffIcon size={22} />
          )}
          <IncentiveText>{text}</IncentiveText>
        </Row>
      </MainItemContainer>
    );
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FixScheduleStepOne />
          <FixScheduleStepTwo />
          <FixScheduleStepThree />
          <FixScheduleStepFour />
          <SubmitBtn
            text={'일정추가완료'}
            isRegisted={true}
            onPress={() => registerFn()}
          />
        </Container>
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
                addEmpFn(data);
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
      <Modal
        onRequestClose={() => setIsStartTimeModalVisible(false)}
        onBackdropPress={() => setIsStartTimeModalVisible(false)}
        isVisible={isStartTimeModalVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          <DatePicker
            date={moment(startTime).toDate()}
            mode={'time'}
            androidVariant="iosClone"
            onDateChange={(time) => {
              setStartTimeSet(true);
              setStartTime(time);
            }}
            locale="fr"
            is24hourSource="locale"
            minuteInterval={10}
          />
          {startTimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsStartTimeModalVisible(false);
                setStartTimeSet(true);
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
        onRequestClose={() => setIsEndTimeModalVisible(false)}
        onBackdropPress={() => setIsEndTimeModalVisible(false)}
        isVisible={isEndTimeModalVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          <DatePicker
            date={moment(endTime).toDate()}
            mode={'time'}
            androidVariant="iosClone"
            onDateChange={(time) => {
              setEndTimeSet(true);
              setEndTime(time);
            }}
            locale="fr"
            is24hourSource="locale"
            minuteInterval={10}
          />
          {endTimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsEndTimeModalVisible(false);
                setEndTimeSet(true);
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
