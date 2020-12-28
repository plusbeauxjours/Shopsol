import React from 'react';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {
  EllipseIcon,
  RemoveCircleIcon,
  HelpCircleIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import InputLine from '~/components/InputLine';
import EmployeeScheduleAddScreenRenderDayPicker from './EmployeeScheduleAddScreenRenderDayPicker';
import EmployeeScheduleAddScreenRenderWorkDay from './EmployeeScheduleAddScreenRenderWorkDay';
import utils from '~/constants/utils';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
}

interface IIsBefore {
  isBefore: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 16px;
  color: #999;
  font-weight: bold;
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: #f2f2f2;
  height: 1px;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RowSpaceTouchable = styled(RowTouchable)`
  justify-content: space-around;
`;

const RenderWorkDayTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

const DayPickRowBox = styled.View`
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const WorkTypeCheckSection = styled.View``;

const InputCase = styled.View`
  margin-bottom: 20px;
`;

const DateTouchable = styled.TouchableOpacity`
  justify-content: flex-end;
  padding-bottom: 5px;
  height: 40px;
  width: 100%;
`;

const SideBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: #212121;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const TimePickBoxTimeText = styled.Text<IsSelected>`
  font-size: 17px;
  color: ${(props) => (props.isSelected ? '#e85356' : '#cccccc')};
`;

const EmptySpace = styled.View`
  width: 45px;
`;

const SelectedText = styled.Text<IsSelected>`
  margin-left: 10px;
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const TimeListRowTouchable = styled.TouchableOpacity<IsSelected>`
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

const TextInputLine = styled.View<IIsBefore>`
  width: ${wp('100%') - 120}px;
  height: 0.7px;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#e85356')};
`;

const ColumnPayBox = styled.View`
  width: ${wp('100%') - 80}px;
  padding: 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: #cccccc;
  align-items: center;
`;

export default ({
  timeList,
  timeListIndex,
  setTimeListIndex,
  originalDayList,
  removeDayFn,
  dayList,
  startTime,
  endTime,
  alertModal,
  submitFn,
  TYPE,
  checkAddTimeFn,
  explainModal,
  startDate,
  setStartDate,
  isStartDayModalVisible,
  setIsStartDayModalVisible,
  endDate,
  setEndDate,
  isEndDayModalVisible,
  setIsEndDayModalVisible,
  setCheckNoEndDate,
  checkNoEndDate,
  onDayPress,
  removeTimeFn,
  isStartTimeModalVisible,
  setIsStartTimeModalVisible,
  isEndTimeModalVisible,
  setIsEndTimeModalVisible,
  setStartTime,
  setEndTime,
  startTimeSet,
  setStartTimeSet,
  endTimeSet,
  setEndTimeSet,
  startDateSet,
  setStartDateSet,
  setEndDateSet,
  endDateSet,
}) => {
  const RenderWorkDayList = () => (
    <WorkTypeCheckSection>
      {originalDayList?.map((originalDay, index) => (
        <EmployeeScheduleAddScreenRenderWorkDay
          index={index}
          removeDayFn={removeDayFn}
          timeList={timeList}
          timeListIndex={timeListIndex}
          originalDay={originalDay}
        />
      ))}
    </WorkTypeCheckSection>
  );

  const RenderDayPicker = () => (
    <>
      {dayList?.map((day, index) => (
        <EmployeeScheduleAddScreenRenderDayPicker
          day={day}
          index={index}
          dayList={dayList}
          timeList={timeList}
          startTime={startTime}
          endTime={endTime}
          alertModal={alertModal}
          onDayPress={onDayPress}
        />
      ))}
    </>
  );

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <InputCase>
              <TitleText>일정 정보</TitleText>
              <GreyLine />
              <Row>
                <RowTouchable
                  onPress={() =>
                    explainModal('샵솔 출퇴근관리가 시작되는 일자입니다.')
                  }>
                  <Text>일정 시작일</Text>
                  <HelpCircleIcon />
                </RowTouchable>
              </Row>

              <DateTouchable onPress={() => setIsStartDayModalVisible(true)}>
                <Text>{moment(startDate).format('YYYY년 M월 D일') ?? ''}</Text>
              </DateTouchable>
              <InputLine isBefore={startDate === ''} />
            </InputCase>
            <InputCase>
              <RowTouchable
                style={{marginTop: 20}}
                onPress={() => {
                  setCheckNoEndDate(!checkNoEndDate);
                  setEndDate(moment());
                }}>
                <SideBox>
                  {checkNoEndDate ? (
                    <RadioBtnOnIcon size={22} />
                  ) : (
                    <RadioBtnOffIcon size={22} />
                  )}
                  <Text>일정 종료일 없음</Text>
                </SideBox>
              </RowTouchable>
              {!checkNoEndDate && (
                <>
                  <WhiteSpace />
                  <ColumnPayBox>
                    <Row
                      style={{
                        width: wp('100%') - 80,
                        paddingHorizontal: 20,
                      }}>
                      <Text>일정 종료일</Text>
                    </Row>
                    <DateTouchable
                      style={{
                        paddingHorizontal: 20,
                        alignItems: 'flex-start',
                        width: wp('100%') - 80,
                      }}
                      onPress={() => setIsEndDayModalVisible(true)}
                      disabled={checkNoEndDate}>
                      <Text>
                        {!checkNoEndDate
                          ? moment(endDate).format('YYYY년 M월 D일')
                          : ''}
                      </Text>
                    </DateTouchable>
                    <TextInputLine isBefore={checkNoEndDate} />
                  </ColumnPayBox>
                </>
              )}
            </InputCase>
          </Section>
          <Section>
            <TitleText>출퇴근 시간 입력</TitleText>
            <GreyLine />
            <RowSpaceTouchable onPress={() => setIsStartTimeModalVisible(true)}>
              <SideText>출근시간</SideText>
              <TimePickBoxTimeText
                isSelected={!!moment(startTime).format('HH:mm')}>
                {startTimeSet ? moment(startTime).format('HH:mm') : '00:00'}
              </TimePickBoxTimeText>
            </RowSpaceTouchable>
            <WhiteSpace />
            <RowSpaceTouchable onPress={() => setIsEndTimeModalVisible(true)}>
              <SideText>퇴근시간</SideText>
              <TimePickBoxTimeText
                isSelected={!!moment(endTime).format('HH:mm')}>
                {endTimeSet ? moment(endTime).format('HH:mm') : '00:00'}
              </TimePickBoxTimeText>
            </RowSpaceTouchable>
          </Section>
          <Section>
            <TitleText>출퇴근 요일 선택</TitleText>
            <GreyLine />
            <DayPickRowBox>
              <RenderDayPicker />
            </DayPickRowBox>
            <RoundBtn
              isInSection={true}
              text={'추가하기'}
              onPress={() => checkAddTimeFn()}
              isRegisted={true}
            />
          </Section>
          {timeList && timeList.length !== 0 && (
            <Section>
              <TitleText>근무일정 확인</TitleText>
              <GreyLine />
              {timeList.map((data, index) => (
                <TimeListRowTouchable
                  key={index}
                  isSelected={timeListIndex === index}
                  color={data.color}
                  onPress={() => {
                    if (timeListIndex === index) {
                      setTimeListIndex(null);
                    } else {
                      setTimeListIndex(index);
                    }
                  }}>
                  <Row>
                    <EllipseIcon
                      color={timeListIndex === index ? data.color : '#ddd'}
                    />
                    <SelectedText
                      isSelected={timeListIndex === index}
                      color={data.color}>
                      {data.startTime} ~ {data.endTime}
                    </SelectedText>
                  </Row>
                  <Row>
                    <SelectedText
                      isSelected={timeListIndex === index}
                      color={data.color}>
                      보기
                    </SelectedText>
                    {timeListIndex === index ? (
                      <RenderWorkDayTouchable
                        onPress={() => removeTimeFn(index)}>
                        <RemoveCircleIcon size={30} />
                      </RenderWorkDayTouchable>
                    ) : (
                      <EmptySpace />
                    )}
                  </Row>
                </TimeListRowTouchable>
              ))}
              <RenderWorkDayList />
            </Section>
          )}
          <SubmitBtn
            text={`일정${TYPE} 완료`}
            onPress={() => submitFn()}
            isRegisted={timeList.length > 0}
          />
        </Container>
      </ScrollView>
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
            date={moment(startDate).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            onDateChange={(date) => {
              setStartDateSet(true);
              setStartDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {startDateSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsStartDayModalVisible(false);
                setStartDateSet(true);
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
            date={moment(endDate).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            onDateChange={(date) => {
              setEndDateSet(true);
              setEndDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {endDateSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsEndDayModalVisible(false);
                setEndDateSet(true);
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
