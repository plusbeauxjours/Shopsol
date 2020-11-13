import React from 'react';
import styled from 'styled-components/native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
  EllipseIcon,
  RemoveCircleIcon,
  HelpCircleIcon,
  CheckBoxIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import InputLine from '~/components/InputLine';
import EmployeeScheduleAddScreenRenderDayPicker from './EmployeeScheduleAddScreenRenderDayPicker';
import EmployeeScheduleAddScreenRenderWorkDay from './EmployeeScheduleAddScreenRenderWorkDay';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
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

const NameText = styled.Text`
  font-size: 18px;
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

const StepTitle = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #000;
  margin-bottom: 20px;
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
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
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
              <Row>
                <RowTouchable
                  onPress={() =>
                    explainModal('샵솔 출퇴근관리가 시작되는 일자입니다.')
                  }>
                  <NameText>일정 시작일</NameText>
                  <HelpCircleIcon />
                </RowTouchable>
              </Row>
              <DatePickerModal
                isDarkModeEnabled={false}
                headerTextIOS={'시작일을 선택하세요.'}
                cancelTextIOS={'취소'}
                confirmTextIOS={'확인'}
                isVisible={isStartDayModalVisible}
                mode="date"
                locale="ko_KRus_EN"
                onConfirm={(date) => {
                  setStartDate(date), setIsStartDayModalVisible(false);
                }}
                onCancel={() => {
                  setIsStartDayModalVisible(false);
                }}
                display="default"
              />
              <DateTouchable onPress={() => setIsStartDayModalVisible(true)}>
                <Text>{startDate ?? ''}</Text>
              </DateTouchable>
              <InputLine isBefore={startDate === ''} />
            </InputCase>
            <InputCase>
              <Row>
                <RowTouchable
                  onPress={() => {
                    explainModal(
                      '',
                      '정해진 근무종료일이 없다면 [퇴사일 없음]으로 선택해주세요.\n\n* 직원이 퇴사하였을 경우 [직원정보]에서 퇴사일을 설정하면 사업장에서 직원이 더 이상 표시되지 않습니다.',
                    );
                  }}>
                  <NameText>일정 종료일</NameText>
                  <HelpCircleIcon />
                </RowTouchable>
              </Row>
              <DatePickerModal
                isDarkModeEnabled={false}
                headerTextIOS={'종료일을 선택하세요.'}
                cancelTextIOS={'취소'}
                confirmTextIOS={'확인'}
                isVisible={isEndDayModalVisible}
                mode="date"
                minimumDate={moment(startDate).add(1, 'days').toDate()}
                locale="ko_KRus_EN"
                onConfirm={(date) => {
                  setEndDate(moment(date).format('YYYY-MM-DD'));
                  setIsEndDayModalVisible(false);
                }}
                onCancel={() => {
                  setIsEndDayModalVisible(false);
                }}
                display="default"
              />
              <DateTouchable
                disabled={checkNoEndDate}
                onPress={() => setIsEndDayModalVisible(true)}>
                <Text>
                  {endDate ? moment(endDate).format('YYYY.MM.DD') : ''}
                </Text>
              </DateTouchable>
              <InputLine isBefore={endDate === null} />
              <RowTouchable
                style={{marginTop: 20}}
                onPress={() => {
                  setCheckNoEndDate(!checkNoEndDate);
                  setEndDate(null);
                }}>
                <SideBox>
                  {checkNoEndDate ? (
                    <CheckBoxIcon size={25} color="#e85356" />
                  ) : (
                    <CheckBoxIcon size={25} color="#CCCCCC" />
                  )}
                  <SideText>일정 종료일 없음</SideText>
                </SideBox>
              </RowTouchable>
            </InputCase>
          </Section>
          <Section>
            <StepTitle>(STEP 1) 출퇴근 시간 입력</StepTitle>
            <RowSpaceTouchable onPress={() => setIsStartTimeModalVisible(true)}>
              <SideText>출근시간</SideText>
              <TimePickBoxTimeText isSelected={!!startTime}>
                {startTime || '00:00'}
              </TimePickBoxTimeText>
            </RowSpaceTouchable>
            <WhiteSpace />
            <RowSpaceTouchable onPress={() => setIsEndTimeModalVisible(true)}>
              <SideText>퇴근시간</SideText>
              <TimePickBoxTimeText isSelected={!!endTime}>
                {endTime || '00:00'}
              </TimePickBoxTimeText>
            </RowSpaceTouchable>
          </Section>
          <Section>
            <StepTitle>(STEP 2) 출퇴근 요일 선택</StepTitle>
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
              <StepTitle>(STEP 3) 근무일정 확인</StepTitle>
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
      <DatePickerModal
        isDarkModeEnabled={false}
        headerTextIOS={'시간을 선택하세요.'}
        cancelTextIOS={'취소'}
        confirmTextIOS={'선택'}
        isVisible={isStartTimeModalVisible}
        mode="time"
        locale="ko_KRus_EN"
        onConfirm={(time) => {
          setStartTime(moment(time).format('HH:mm'));
          setIsStartTimeModalVisible(false);
        }}
        is24Hour={true}
        onCancel={() => setIsStartTimeModalVisible(false)}
        display="default"
      />
      <DatePickerModal
        isDarkModeEnabled={false}
        headerTextIOS={'시간을 선택하세요.'}
        cancelTextIOS={'취소'}
        confirmTextIOS={'선택'}
        isVisible={isEndTimeModalVisible}
        mode="time"
        locale="ko_KRus_EN"
        onConfirm={(time) => {
          setEndTime(moment(time).format('HH:mm'));
          setIsEndTimeModalVisible(false);
        }}
        is24Hour={true}
        onCancel={() => setIsEndTimeModalVisible(false)}
        display="default"
      />
    </BackGround>
  );
};
