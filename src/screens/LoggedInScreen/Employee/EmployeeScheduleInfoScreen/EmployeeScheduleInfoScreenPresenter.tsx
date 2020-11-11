import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {EllipseIcon} from '~/constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import {BackIcon, ForwardIcon, HelpCircleIcon} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import moment from 'moment';
import utils from '~/constants/utils';
import {ActivityIndicator} from 'react-native';

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

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const RenderDayListContainer = styled.View``;

const WhiteText = styled.Text`
  font-size: 12px;
  color: white;
`;
const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px 0;
  background-color: white;
`;

const NameBox = styled.View``;
const EmployeeBox = styled.View`
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const NameText = styled.Text`
  margin-right: 10px;
  color: #707070;
  font-size: 17px;
  margin-bottom: 5px;
`;

const DateText = styled.Text`
  color: #707070;
  font-size: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SmallLine = styled.View`
  width: ${wp('50%')}px;
  height: 0.5px;
  margin: 10px 0;
  background-color: #f2f2f2;
`;

const WorkTypeAndSalaryBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px 0 20px;
`;

const WorkTypeAndSalaryInfoBox = styled.View`
  align-items: flex-end;
  border-color: #f2f2f2;
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: 10px 20px;
  margin: 10px 0;
`;

const WorkTypeAndSalaryBoxTitle = styled.Text`
  font-size: 17px;
  color: #e85356;
`;

const WorkTypeCheckSection = styled.View`
  padding: 0 20px;
`;

const WorkScheduleBox = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 10px;
  border-radius: 20px;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  background-color: #e85356;
`;

const GreyText = styled.Text`
  font-size: 15px;
  color: #7e7c7c;
`;

const FixedGreyText = styled(GreyText)`
  position: absolute;
  right: 100px;
`;

const FixTypeDayChangeBox = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
`;
const FixTypeDayChangeButton = styled.TouchableOpacity`
  width: 30%;
  height: 40px;
  border-radius: 5px;
  border-width: 1;
  align-items: center;
  justify-content: center;
`;

const FixTypeDayChangeButtonText = styled.Text`
  font-size: 15px;
`;

const RenderDayRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding: 10px 0;
  width: 100%;
`;

const RenderDayBox = styled.View<IsSelected>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
  background-color: ${(props) =>
    props.isSelected ? `${props.color}` : 'transparent'};
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const RenderDayBoxText = styled.Text<IsSelected>`
  color: ${(props) => (props.isSelected ? 'white' : '#CCCCCC')};
`;

const RenderDayTime = styled.View`
  margin-top: 10px;
  margin-left: 15px;
  width: 115px;
`;

const RenderDayTimeText = styled.Text<IsSelected>`
  font-size: 15px;
  color: ${(props) => (props.substract && props.isSelected ? '#000' : '#ddd')};
`;

const RenderDuration = styled.View`
  margin-top: 10px;
  margin-left: 5px;
  width: 85px;
`;

const RenderDurationText = styled.Text<IsSelected>`
  font-size: 15px;
  color: ${(props) => (props.isSelected ? '#000' : '#ddd')};
`;

const RenderScheduleTitle = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const TimeListBox = styled.TouchableOpacity<IsSelected>`
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
  border-width: 0.6px;
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TimeListRow = styled(Row)`
  margin: 20px;
`;

const TimeListBoxText = styled.Text<IsSelected>`
  font-weight: ${(props) => (props.isSelected ? '600' : '300')};
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const TimeListBold = styled.Text`
  font-weight: bold;
  font-size: 15px;
  margin-left: 15px;
  margin: 0 20px;
`;

export default ({
  originalDayList,
  timeTableIndex,
  timeListIndex,
  timeList,
  refreshing,
  onRefresh,
  data,
  getPeriod,
  CALCULATE_DAY,
  PAY_TYPE,
  numberComma,
  PAY,
  toggleWorkScheduleFn,
  isFreeWorkingType,
  timeTable,
  registerScheduleFn,
  modifyScheduleFn,
  removeScheduleFn,
  explainModal,
  setTimeTableIndex,
  setTimeListIndex,
  setTimeList,
  getNumberToday,
  alertModal,
  joinModal,
  IMAGE,
}) => {
  const RenderDayList = () => {
    if (timeTable && timeTable.length !== 0) {
      return (
        <RenderDayListContainer>
          {originalDayList?.map((originalDay) => (
            <RenderDayListItem
              key={originalDay.day}
              originalDay={originalDay}
            />
          ))}
        </RenderDayListContainer>
      );
    } else {
      return null;
    }
  };

  const RenderDayListItem = ({originalDay, key}) => {
    const substractHour = (startTime, endTime) => {
      const startTimeArray = startTime.split(':');
      let startTimeHour = Number(startTimeArray[0]);
      let startTimeMinute = Number(startTimeArray[1]);
      const endTimeArray = endTime.split(':');
      let endTimeHour = Number(endTimeArray[0]);
      let endTimeMinute = Number(endTimeArray[1]);
      let resultTimeHour = 0;
      let resultTimeMinute = 0;
      if (
        startTimeHour > endTimeHour ||
        (startTimeHour === endTimeHour && startTimeMinute > endTimeMinute)
      ) {
        endTimeHour += 24;
      }
      if (startTimeMinute > endTimeMinute) {
        endTimeHour--;
        endTimeMinute += 60;
      }
      resultTimeMinute = endTimeMinute - startTimeMinute;
      resultTimeHour = endTimeHour - startTimeHour;
      return `(${resultTimeHour}h ${resultTimeMinute}m)`;
    };
    let startTime = '00:00';
    let endTime = '00:00';
    let flag = false;
    let color = null;
    if (timeTableIndex !== null) {
      const timeListed = timeList;
      for (let i = 0; i < timeListed.length; i++) {
        const time = timeListed[i];
        for (const day of time.dayList) {
          if (day.isChecked && originalDay.day === day.day) {
            startTime = time.startTime;
            endTime = time.endTime;
            flag = true;
            if (timeListIndex !== null && timeListIndex === i) {
              color = time.color;
            }
          }
        }
      }
    }
    const substract = flag ? substractHour(startTime, endTime) : '';
    const isSelected = color && flag;
    return (
      <RenderDayRow key={key}>
        <RenderDayBox isSelected={isSelected} color={color}>
          <RenderDayBoxText isSelected={isSelected}>
            {originalDay.text}
          </RenderDayBoxText>
        </RenderDayBox>
        <RenderDayTime>
          <RenderDayTimeText isSelected={isSelected} substract={substract}>
            {isSelected ? startTime : '00:00'} ~{' '}
            {isSelected ? endTime : '00:00'}
          </RenderDayTimeText>
        </RenderDayTime>
        <RenderDuration>
          <RenderDurationText isSelected={isSelected}>
            {isSelected && substract}
          </RenderDurationText>
        </RenderDuration>
      </RenderDayRow>
    );
  };

  const RenderScheduleList = () => {
    if (timeTable.length == 0) {
      return (
        <RenderScheduleTitle style={{alignItems: 'center', marginTop: 20}}>
          <GreyText>등록된 일정이 없습니다</GreyText>
          <GreyText>일정을 추가해주세요</GreyText>
        </RenderScheduleTitle>
      );
    } else {
      return (
        <RenderScheduleTitle>
          {timeTable?.map((table, index) => (
            <React.Fragment key={index}>
              {timeTableIndex === index && (
                <>
                  <TimeListRow>
                    {timeTableIndex > 0 && (
                      <TouchableHighlight
                        onPress={() => {
                          const timeTableIndexed = timeTableIndex - 1;
                          setTimeTableIndex(timeTableIndexed);
                          setTimeListIndex(null);
                          setTimeList(timeTable[timeTableIndex].data);
                        }}>
                        <BackIcon size={22} color={'#999'} />
                      </TouchableHighlight>
                    )}
                    <TimeListBold>
                      {moment(table.startDate).format('YYYY.MM.DD')}
                      &nbsp;~&nbsp;
                      {(table.endDate &&
                        moment(table.endDate).format('YYYY.MM.DD')) ||
                        (getNumberToday() < getNumberToday(table.startDate)
                          ? ''
                          : '현재')}
                    </TimeListBold>
                    {timeTableIndex < timeTable.length - 1 && (
                      <TouchableHighlight
                        onPress={() => {
                          const timeTableIndexed = timeTableIndex + 1;
                          setTimeTableIndex(timeTableIndexed);
                          setTimeListIndex(null);
                          setTimeList(timeTable[timeTableIndex].data);
                        }}>
                        <ForwardIcon size={22} color={'#999'} />
                      </TouchableHighlight>
                    )}
                  </TimeListRow>
                  {table?.data?.map((data, index) => (
                    <TimeListBox
                      isSelected={timeListIndex === index}
                      color={data.color}
                      key={index}
                      onPress={() => {
                        if (timeListIndex === index) {
                          setTimeListIndex(null);
                        } else {
                          setTimeListIndex(index);
                        }
                      }}>
                      <TimeListBoxText isSelected={timeListIndex === index}>
                        <EllipseIcon
                          color={timeListIndex === index ? data.color : '#ddd'}
                        />
                        &nbsp;&nbsp;{data.startTime} ~ {data.endTime}
                      </TimeListBoxText>
                      <TimeListBoxText isSelected={true}>보기</TimeListBoxText>
                    </TimeListBox>
                  ))}
                </>
              )}
            </React.Fragment>
          ))}
        </RenderScheduleTitle>
      );
    }
  };
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Section>
              <EmployeeBox>
                <FastImage
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginRight: 10,
                  }}
                  source={{
                    uri: `http://133.186.210.223/uploads/${IMAGE}`,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <NameBox>
                  <Row>
                    <NameText>{data.EMP_NAME}</NameText>
                    <DateText>
                      {data.IS_MANAGER === '1' ? '[매니저]' : '[스태프]'}
                    </DateText>
                  </Row>
                  <Row>
                    <DateText>근무기간&nbsp;</DateText>
                    <DateText>
                      {data.START} ~ {data.END ? data.END : '계속'}
                    </DateText>
                  </Row>
                </NameBox>
              </EmployeeBox>
            </Section>
            <Section>
              <WorkTypeAndSalaryBox>
                <WorkTypeAndSalaryBoxTitle>급여</WorkTypeAndSalaryBoxTitle>
              </WorkTypeAndSalaryBox>
              <WorkTypeAndSalaryInfoBox>
                <GreyText style={{fontSize: 12}}>
                  {getPeriod(CALCULATE_DAY)}
                </GreyText>
                <SmallLine />
                <Row>
                  <FixedGreyText style={{marginRight: 50}}>
                    {PAY_TYPE === '0' && '시급'}
                    {PAY_TYPE === '1' && '일급'}
                    {PAY_TYPE === '2' && '월급'}
                  </FixedGreyText>
                  <GreyText style={{marginRight: 20}}>
                    {numberComma(PAY)}
                  </GreyText>
                  <GreyText>원</GreyText>
                </Row>
              </WorkTypeAndSalaryInfoBox>
            </Section>
            <Section>
              <WorkTypeAndSalaryBox>
                <RowSpace>
                  <Touchable
                    onPress={() => {
                      if (isFreeWorkingType) {
                        explainModal(
                          '일정근무로 설정하면 정확한 급여계산이 가능합니다.\n\n일정관련하여 다양한 케이스별 설정이 가능합니다.\n자세한 설명은 [도움말 전체보기]에서 확인하세요.\n\nEx.) 직원 스케쥴 변경, 주단위 일정입력 등',
                        );
                      } else {
                        explainModal(
                          '자율출퇴근으로 설정하면 등록된 근무일정이 없어도 직원이 출/퇴근을 기록할 수 있습니다.\n- 급여계산 목적 보다는 직원 출퇴근 시간관리로 사용하기를 권장합니다.\n\n일정관련하여 다양한 케이스별 설정이 가능합니다.\n자세한 설명은 [도움말 전체보기]에서 확인하세요.\n\nEx.) 직원 스케쥴 변경, 주단위 일정입력 등',
                        );
                      }
                    }}>
                    <WorkTypeAndSalaryBoxTitle>
                      근무일정
                    </WorkTypeAndSalaryBoxTitle>
                    <HelpCircleIcon />
                  </Touchable>
                  <WorkScheduleBox onPress={() => toggleWorkScheduleFn()}>
                    {isFreeWorkingType ? (
                      <WhiteText>일정출퇴근으로 전환하기</WhiteText>
                    ) : (
                      <WhiteText>자율출퇴근으로 전환하기</WhiteText>
                    )}
                  </WorkScheduleBox>
                </RowSpace>
              </WorkTypeAndSalaryBox>
              {isFreeWorkingType && (
                <FixTypeDayChangeBox>
                  <FixTypeDayChangeButton
                    style={{borderColor: '#999', width: '100%'}}
                    disabled={true}>
                    <FixTypeDayChangeButtonText style={{color: '#999'}}>
                      자율출퇴근 근무 중
                    </FixTypeDayChangeButtonText>
                  </FixTypeDayChangeButton>
                </FixTypeDayChangeBox>
              )}
              <Row>
                {!isFreeWorkingType &&
                  timeTable.length == 0 && ( // 자율출퇴근★
                    <FixTypeDayChangeBox>
                      <FixTypeDayChangeButton
                        style={{borderColor: '#393939', width: '100%'}}
                        onPress={() => registerScheduleFn()}>
                        <FixTypeDayChangeButtonText style={{color: '#393939'}}>
                          일정 추가
                        </FixTypeDayChangeButtonText>
                      </FixTypeDayChangeButton>
                    </FixTypeDayChangeBox>
                  )}
                {!isFreeWorkingType && timeTable.length > 0 && (
                  <FixTypeDayChangeBox>
                    <FixTypeDayChangeButton
                      style={{borderColor: '#393939'}}
                      onPress={() => registerScheduleFn()}>
                      <FixTypeDayChangeButtonText style={{color: '#393939'}}>
                        추가
                      </FixTypeDayChangeButtonText>
                    </FixTypeDayChangeButton>
                    <FixTypeDayChangeButton
                      style={{borderColor: '#393939'}}
                      onPress={() => modifyScheduleFn()}>
                      <FixTypeDayChangeButtonText style={{color: '#393939'}}>
                        수정
                      </FixTypeDayChangeButtonText>
                    </FixTypeDayChangeButton>
                    <FixTypeDayChangeButton
                      style={{borderColor: '#B91C1B'}}
                      onPress={() => removeScheduleFn()}>
                      <FixTypeDayChangeButtonText style={{color: '#B91C1B'}}>
                        삭제
                      </FixTypeDayChangeButtonText>
                    </FixTypeDayChangeButton>
                  </FixTypeDayChangeBox>
                )}
              </Row>
              {!isFreeWorkingType && (
                <WorkTypeCheckSection>
                  <RenderScheduleList />
                  <RenderDayList />
                </WorkTypeCheckSection>
              )}
            </Section>
            <SubmitBtn
              text={'합류 완료'}
              onPress={() => {
                if (!isFreeWorkingType && !timeTable) {
                  alertModal(
                    '일정을 추가한 후에 직원 합류를 완료해주세요.\n정해진 일정없이 출퇴근을 진행하시려면 자율출퇴근으로 전환하기 버튼을 눌러주세요.',
                  );
                } else {
                  joinModal('직원이 합류되었습니다.');
                }
              }}
              isRegisted={isFreeWorkingType || timeTable}
            />
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </BackGround>
  );
};
