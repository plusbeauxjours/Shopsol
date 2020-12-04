import React, {useRef} from 'react';
import styled from 'styled-components/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Calendar} from 'react-native-calendars';
import DatePickerModal from 'react-native-modal-datetime-picker';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {AddCircleIcon, RemoveCircleIcon, EllipseIcon} from '~/constants/Icons';
import CalendarAddScreenCard from './CalendarAddScreenCard';
import RoundBtn from '~/components/Btn/RoundBtn';
import moment from 'moment';
import {
  DownIcon,
  UpIcon,
  RadioBtnOffIcon,
  RadioBtnOnIcon,
} from '~/constants/Icons';
import utils from '~/constants/utils';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

interface IColor {
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text<IColor>`
  color: ${(props) => (props.color ? '#e85356' : 'black')};
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
  border-width: 1px;
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
  margin-top: 20px;
  padding: 20px;
  border-color: #f2f2f2;
  border-top-width: 1px;
`;

const EmptyBoxText = styled.Text`
  font-size: 15px;
  color: #cccccc;
  margin: 20px 0;
`;
const GreyText = styled.Text`
  font-size: 13px;
  color: #999;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-right: 5px;
`;

const ChecktimeButton = styled.TouchableOpacity`
  padding: 5px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: #e85356;
`;

const ChecktimeButtonText = styled.Text`
  color: #e85356;
  font-weight: 400;
`;

const SubText = styled.Text`
  margin-top: 5px;
  margin-left: 21px;
  font-size: 13px;
  color: #aaa;
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
  color: ${(props) => (props.isSelected ? '#e85356' : '#cccccc')};
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
}) => {
  const RBSheetRef = useRef(null);
  const FixScheduleStepOne = () => (
    <Section>
      <RowTitle>
        <TitleText>(STEP 1) 직원 선택</TitleText>
        <ChecktimeButton onPress={() => RBSheetRef.current.open()}>
          <ChecktimeButtonText>직원 선택하기</ChecktimeButtonText>
        </ChecktimeButton>
      </RowTitle>
      {choiceEmp?.length !== 0 && (
        <>
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
          <SubText>* 직원 이미지를 클릭하면 목록에서 제외됩니다.</SubText>
        </>
      )}
    </Section>
  );

  const FixScheduleStepTwo = () => (
    <Section>
      <RowTitle>
        <TitleText>(STEP 2) 출퇴근 시간 입력</TitleText>
      </RowTitle>
      <TimePickBox>
        <TimeRowSpaceTouchable onPress={() => setIsStartTimeModalVisible(true)}>
          <SideText>출근시간</SideText>
          <TimePickBoxTimeText isSelected={!!startTime}>
            {startTime || '00:00'}
          </TimePickBoxTimeText>
        </TimeRowSpaceTouchable>
        <WhiteSpace />
        <TimeRowSpaceTouchable onPress={() => setIsEndTimeModalVisible(true)}>
          <SideText>퇴근시간</SideText>
          <TimePickBoxTimeText isSelected={!!endTime}>
            {endTime || '00:00'}
          </TimePickBoxTimeText>
        </TimeRowSpaceTouchable>
      </TimePickBox>
      <RoundBtn
        isInSection={true}
        text={'출퇴근 목록에 추가'}
        onPress={() => checkAddTimeFn()}
        isRegisted={true}
      />
      {timeCheck.length === 0 && (
        <TimePickBox>
          <EmptyBoxText>
            출근, 퇴근시간 입력 후 추가하기를 눌러주세2요
          </EmptyBoxText>
        </TimePickBox>
      )}
      <WhiteSpace />
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
      <RowTitle>
        <TitleText>(STEP 3) 근무일 입력</TitleText>
      </RowTitle>
      <GreyText>
        출퇴근목록의 시간을 클릭하여 선택한 후 캘린더에서 일정을 선택하세요.
      </GreyText>
      <Calendar
        theme={{
          arrowColor: 'black',
          todayTextColor: '#AACE36',
        }}
        monthFormat={'yyyy년 M월'}
        style={{borderColor: '#F2F2F2', borderTopWidth: 1}}
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
      />
    </Section>
  );

  const FixScheduleStepFour = () => (
    <Section>
      <Touchable onPress={() => setStepFourClick(!stepFourClick)}>
        <RowTitle>
          <RowTitle>
            <TitleText>(선택) 수당 포함여부</TitleText>
          </RowTitle>
          {stepFourClick ? (
            <UpIcon color={'#BCC5D3'} />
          ) : (
            <DownIcon color={'#000'} />
          )}
        </RowTitle>
      </Touchable>

      {stepFourClick && (
        <>
          <Incentive selection={0} text={'적용(1배)'} />
          <Incentive selection={1} text={'초과, 야간근무수당 적용(1.5배)'} />
          <Incentive selection={2} text={'초과, 야간근무수당 중복적용(2배)'} />
        </>
      )}
    </Section>
  );

  const Incentive = ({selection, text}) => {
    let valueI = JSON.parse(JSON.stringify(incentiveCheck));
    return (
      <Touchable
        style={{flexDirection: 'row', margin: 10}}
        onPress={() => {
          valueI.fill(false);
          valueI[selection] = true;
          setIncentiveCheck(valueI);
        }}>
        <Row>
          {incentiveCheck[selection] ? (
            <RadioBtnOnIcon size={25} color="#e85356" />
          ) : (
            <RadioBtnOffIcon size={25} color="#CCCCCC" />
          )}
          <IncentiveText>{text}</IncentiveText>
        </Row>
      </Touchable>
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
      <DatePickerModal
        isDarkModeEnabled={false}
        headerTextIOS={'출근시간을 선택하세요.'}
        cancelTextIOS={'취소'}
        confirmTextIOS={'선택'}
        isVisible={isStartTimeModalVisible}
        minuteInterval={10}
        date={new Date().setHours(9, [0])}
        mode="time"
        locale="ko_KRus_EN"
        onConfirm={(time) => {
          setStartTime(moment(time).format('HH:mm'));
          setIsStartTimeModalVisible(false);
        }}
        is24Hour={true}
        onCancel={() => setIsStartTimeModalVisible(false)}
      />
      <DatePickerModal
        isDarkModeEnabled={false}
        headerTextIOS={'퇴근시간을 선택하세요.'}
        cancelTextIOS={'취소'}
        confirmTextIOS={'선택'}
        isVisible={isEndTimeModalVisible}
        minuteInterval={10}
        date={new Date().setHours(18, [0])}
        mode="time"
        locale="ko_KRus_EN"
        onConfirm={(time) => {
          setEndTime(moment(time).format('HH:mm'));
          setIsEndTimeModalVisible(false);
        }}
        is24Hour={true}
        onCancel={() => setIsEndTimeModalVisible(false)}
      />
    </BackGround>
  );
};
