import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {RefreshControl, TouchableWithoutFeedback, Keyboard} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {BackIcon, ForwardIcon, EllipseIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const RenderDayListContainer = styled.View``;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
`;

const NameBox = styled.View`
  margin-left: 10px;
`;

const EmployeeBox = styled.View`
  width: ${wp('100%') - 80}px;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
`;

const InfoText = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  height: 15px;
  color: ${styleGuide.palette.greyColor};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SmallLine = styled.View`
  width: ${wp('50%')}px;
  height: 0.5px;
  margin: 10px 0;
  background-color: ${styleGuide.palette.borderColor};
`;

const WorkTypeAndSalaryInfoBox = styled.View`
  align-items: flex-end;
  padding: 10px 20px;
  margin: 10px 0;
`;

const DateBox = styled.TouchableOpacity`
  margin-left: 10px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.arrowColor};
`;

const GreyText = styled.Text`
  font-size: 14px;
  color: ${styleGuide.palette.greyColor};
`;

const FixedGreyText = styled(GreyText)`
  position: absolute;
  right: 100px;
`;

const FixTypeDayChangeButtonText = styled.Text`
  font-size: 14px;
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
  font-size: 14px;
  color: ${(props) => (props.substract && props.isSelected ? '#000' : '#ddd')};
`;

const RenderDuration = styled.View`
  margin-top: 10px;
  margin-left: 5px;
  width: 85px;
`;

const RenderDurationText = styled.Text<IsSelected>`
  font-size: 14px;
  color: ${(props) => (props.isSelected ? '#000' : '#ddd')};
`;

const RenderScheduleTitle = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const TimeListBox = styled.TouchableOpacity<IsSelected>`
  width: 100%;
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

const TimeListRow = styled(Row)`
  width: 100%;
  margin-bottom: 40px;
`;

const DateBoxText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

const TimeListBoxText = styled.Text<IsSelected>`
  margin-left: 10px;
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: ${styleGuide.palette.borderColor};
  height: 1px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export default ({
  originalDayList,
  timeTableIndex,
  timeListIndex,
  timeList,
  refreshing,
  onRefresh,
  EMPLOYEE_INFO_DATA,
  numberComma,
  isFreeWorkingType,
  timeTable,
  setTimeTableIndex,
  setTimeListIndex,
  setTimeList,
  getNumberToday,
  AVATAR,
  date,
  setDate,
  PAY,
  PAY_TYPE,
  calculateFn,
  MANAGER_CALLED,
}) => {
  const RenderDayList = () => {
    if (timeTable && timeTable.length !== 0) {
      return (
        <RenderDayListContainer>
          {originalDayList?.map((originalDay, index) => (
            <RenderDayListItem key={index} originalDay={originalDay} />
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
                      <DateBox
                        style={{position: 'absolute', left: 0, marginLeft: 0}}
                        onPress={() => {
                          const timeTableIndexed = timeTableIndex - 1;
                          setTimeTableIndex(timeTableIndexed);
                          setTimeListIndex(null);
                          setTimeList(timeTable[timeTableIndex].data);
                        }}>
                        <BackIcon
                          size={22}
                          color={styleGuide.palette.arrowColor}
                        />
                      </DateBox>
                    )}
                    <DateBoxText>
                      {moment(table.startDate).format('YYYY.MM.DD')}
                      &nbsp;~&nbsp;
                      {(table.endDate &&
                        moment(table.endDate).format('YYYY.MM.DD')) ||
                        (getNumberToday() < getNumberToday(table.startDate)
                          ? ''
                          : '현재')}
                    </DateBoxText>
                    {timeTableIndex < timeTable.length - 1 && (
                      <DateBox
                        style={{position: 'absolute', right: 0}}
                        onPress={() => {
                          const timeTableIndexed = timeTableIndex + 1;
                          setTimeTableIndex(timeTableIndexed);
                          setTimeListIndex(null);
                          setTimeList(timeTable[timeTableIndex].data);
                        }}>
                        <ForwardIcon
                          size={22}
                          color={styleGuide.palette.arrowColor}
                        />
                      </DateBox>
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
                      <Row style={{paddingLeft: 3}}>
                        <EllipseIcon
                          color={timeListIndex === index ? data.color : '#ddd'}
                        />
                        <TimeListBoxText
                          style={{paddingLeft: 17}}
                          isSelected={timeListIndex === index}
                          color={timeListIndex === index ? data.color : '#ddd'}>
                          {data.startTime}&nbsp;~&nbsp;{data.endTime}
                        </TimeListBoxText>
                      </Row>
                      <TimeListBoxText
                        isSelected={true}
                        color={timeListIndex === index ? data.color : '#ddd'}>
                        보기
                      </TimeListBoxText>
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Section>
              <EmployeeBox>
                <FastImage
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={{
                    uri: utils.getUriImage(AVATAR),
                    cache: FastImage.cacheControl.immutable,
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <NameBox>
                  <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
                    <NameText>{EMPLOYEE_INFO_DATA?.EMP_NAME}&nbsp;</NameText>
                    <NameText style={{fontSize: 12}}>
                      {EMPLOYEE_INFO_DATA?.IS_MANAGER === '1'
                        ? `[${MANAGER_CALLED}]`
                        : '[직원]'}
                    </NameText>
                  </Row>
                  {moment(EMPLOYEE_INFO_DATA?.START) < moment() ? (
                    <InfoText>
                      근무기간&nbsp;(
                      {moment().diff(
                        moment(EMPLOYEE_INFO_DATA?.START),
                        'month',
                      )}
                      개월)
                    </InfoText>
                  ) : (
                    <InfoText>근무기간&nbsp;(근무시작전)</InfoText>
                  )}
                  <InfoText>
                    {moment(EMPLOYEE_INFO_DATA?.START).format('YYYY.MM.DD')}
                    &nbsp; ~&nbsp;
                    {EMPLOYEE_INFO_DATA?.END
                      ? moment(EMPLOYEE_INFO_DATA?.END).format('YYYY.MM.DD')
                      : '계속'}
                  </InfoText>
                  {EMPLOYEE_INFO_DATA?.probationDATE?.length > 0 &&
                    EMPLOYEE_INFO_DATA?.probationPercent?.length > 0 && (
                      <InfoText>
                        수습기간&nbsp;
                        {moment() > moment(EMPLOYEE_INFO_DATA?.probationDATE)
                          ? `종료 (${
                              EMPLOYEE_INFO_DATA?.probationPercent ?? '0'
                            }%적용)`
                          : `${moment(EMPLOYEE_INFO_DATA?.probationDATE).format(
                              '~YYYY.MM.DD',
                            )}까지 (${
                              EMPLOYEE_INFO_DATA?.probationPercent ?? '0'
                            }%적용)`}
                      </InfoText>
                    )}
                </NameBox>
              </EmployeeBox>
            </Section>
            <Section>
              <TitleText>급여</TitleText>
              <GreyLine />
              <Row>
                <DateBox
                  style={{marginLeft: 0}}
                  onPress={() => {
                    setDate(
                      moment(date).subtract(1, 'month').format('YYYY-MM-DD'),
                    );
                    calculateFn(
                      moment(date).subtract(1, 'month').format('YYYY'),
                      moment(date).subtract(1, 'month').format('MM'),
                    );
                  }}>
                  <BackIcon size={22} color={styleGuide.palette.arrowColor} />
                </DateBox>
                <DateTextArea>
                  <DateText>{moment(date).format('YYYY년 M월')}</DateText>
                  <DateText
                    style={{
                      fontSize: styleGuide.fontSize.middle,
                    }}>
                    {moment(date).format('M월 D일')}&nbsp;~&nbsp;
                    {moment(date)
                      .add(1, 'month')
                      .subtract(1, 'day')
                      .format('M월 D일')}
                  </DateText>
                </DateTextArea>
                <DateBox
                  onPress={() => {
                    setDate(moment(date).add(1, 'month').format('YYYY-MM-DD'));
                    calculateFn(
                      moment(date).add(1, 'month').format('YYYY'),
                      moment(date).add(1, 'month').format('MM'),
                    );
                  }}>
                  <ForwardIcon
                    size={22}
                    color={styleGuide.palette.arrowColor}
                  />
                </DateBox>
              </Row>
              <WorkTypeAndSalaryInfoBox>
                <SmallLine />
                <Row>
                  <FixedGreyText style={{marginRight: 50}}>
                    {PAY_TYPE == '0'
                      ? '시급'
                      : PAY_TYPE == '1'
                      ? '일급'
                      : '월급'}
                  </FixedGreyText>
                  <GreyText style={{marginRight: 20}}>
                    {numberComma(PAY)}
                  </GreyText>
                  <GreyText>원</GreyText>
                </Row>
              </WorkTypeAndSalaryInfoBox>
            </Section>
            <Section>
              <TitleText>근무일정</TitleText>
              {isFreeWorkingType ? (
                <>
                  <GreyLine />
                  <FixTypeDayChangeButtonText
                    style={{
                      marginTop: 20,
                      textAlign: 'center',
                      color: '#393939',
                    }}>
                    자율출퇴근 근무 중
                  </FixTypeDayChangeButtonText>
                </>
              ) : (
                <>
                  <GreyLine />
                  <RenderScheduleList />
                  <RenderDayList />
                </>
              )}
            </Section>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </BackGround>
  );
};
