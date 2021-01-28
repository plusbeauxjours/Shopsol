import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Keyboard, Linking} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import {EllipseIcon, PhoneIcon} from '~/constants/Icons';
import {BackIcon, ForwardIcon, HelpCircleIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

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

const Touchable = styled.TouchableOpacity``;
const TouchableRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const RenderDayListContainer = styled.View``;

const WhiteText = styled.Text`
  color: white;
`;

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
  font-weight: ${styleGuide.fontWeight.bold};
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

const WorkScheduleBox = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
  border-radius: 20px;
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

const FixTypeDayChangeBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const FixTypeDayChangeButton = styled.TouchableOpacity`
  width: ${(wp('100') - 100) / 3}px;
  height: 40px;
  border-radius: 15px;
  border-width: 0.7px;
  align-items: center;
  justify-content: center;
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

const NavigationButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
  border-radius: 6px;
`;

const Bold = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.primary};
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

const SpaceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const PhoneIconContainer = styled.View`
  justify-content: center;
  margin-bottom: 5px;
`;

export default ({
  STORE,
  originalDayList,
  timeTableIndex,
  timeListIndex,
  timeList,
  setDate,
  calculateFn,
  EMP_SEQ,
  date,
  data,
  IMAGE,
  PAY_TYPE,
  numberComma,
  PAY,
  toggleWorkSchedule,
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
  gotoSetInfo,
  mobileNo,
  MANAGER_CALLED,
  START,
  END,
  EMP_PAY_TYPE,
  EMP_PAY,
  probationDATE,
  probationPercent,
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
            {isSelected ? startTime : '00:00'}&nbsp;~&nbsp;
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
                          style={{paddingLeft: 27}}
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
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Section>
              <EmployeeBox>
                <FastImage
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={{
                    uri: `http://shopsolapi.shop-sol.com/uploads/${IMAGE}`,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <NameBox>
                  <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
                    <NameText>{data?.EMP_NAME}&nbsp;</NameText>
                    <NameText style={{fontSize: 10}}>
                      {data?.IS_MANAGER === '1'
                        ? `[${MANAGER_CALLED}]`
                        : '[직원]'}
                    </NameText>
                  </Row>
                  <Touchable onPress={() => Linking.openURL(`tel:${mobileNo}`)}>
                    <Row style={{justifyContent: 'flex-start'}}>
                      <PhoneIconContainer>
                        <PhoneIcon color={styleGuide.palette.greyColor} />
                      </PhoneIconContainer>
                      <InfoText
                        style={{
                          marginLeft: 5,
                          color: styleGuide.palette.primary,
                          fontWeight: '600',
                        }}>
                        전화걸기
                      </InfoText>
                    </Row>
                  </Touchable>
                  <InfoText>
                    근무기간&nbsp;({moment().diff(moment(START), 'month')}
                    개월)
                  </InfoText>
                  <InfoText>
                    {moment(START).format('YYYY.MM.DD')} ~&nbsp;
                    {END ? moment(END).format('YYYY.MM.DD') : '계속'}
                  </InfoText>
                  {probationDATE && probationPercent && (
                    <InfoText>
                      수습기간&nbsp;
                      {moment() > moment(probationDATE)
                        ? `종료 (${probationPercent}%적용)`
                        : `${moment(probationDATE).format(
                            '~YYYY.MM.DD',
                          )}까지 (${probationPercent}%적용)`}
                    </InfoText>
                  )}
                </NameBox>
                <NavigationButton onPress={() => gotoSetInfo(data, IMAGE)}>
                  <Bold>정보수정</Bold>
                </NavigationButton>
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
                      EMP_SEQ,
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
                      fontWeight: '300',
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
                      EMP_SEQ,
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
              <SpaceRow>
                <Row>
                  <TitleText>근무일정</TitleText>
                  {STORE == '1' && (
                    <TouchableRow
                      onPress={() => {
                        if (isFreeWorkingType) {
                          explainModal(
                            '',
                            '일정근무로 설정하면 정확한 급여계산이 가능합니다.\n\n일정관련하여 다양한 케이스별 설정이 가능합니다.\n자세한 설명은 [도움말 전체보기]에서 확인하세요.\n\nEx.) 직원 스케쥴 변경, 주단위 일정입력 등',
                          );
                        } else {
                          explainModal(
                            '',
                            '자율출퇴근으로 설정하면 등록된 근무일정이 없어도 직원이 출/퇴근을 기록할 수 있습니다.\n- 급여계산 목적 보다는 직원 출퇴근 시간관리로 사용하기를 권장합니다.\n\n일정관련하여 다양한 케이스별 설정이 가능합니다.\n자세한 설명은 [도움말 전체보기]에서 확인하세요.\n\nEx.) 직원 스케쥴 변경, 주단위 일정입력 등',
                          );
                        }
                      }}>
                      <HelpCircleIcon />
                    </TouchableRow>
                  )}
                </Row>
                <Row>
                  <WorkScheduleBox onPress={() => toggleWorkSchedule()}>
                    {isFreeWorkingType ? (
                      <WhiteText>일정출퇴근으로 전환하기</WhiteText>
                    ) : (
                      <WhiteText>자율출퇴근으로 전환하기</WhiteText>
                    )}
                  </WorkScheduleBox>
                </Row>
              </SpaceRow>
              {isFreeWorkingType && (
                <>
                  <GreyLine />
                  <FixTypeDayChangeBox>
                    <FixTypeDayChangeButton
                      style={{
                        borderColor: styleGuide.palette.greyColor,
                        width: '100%',
                      }}
                      disabled={true}>
                      <FixTypeDayChangeButtonText
                        style={{color: styleGuide.palette.greyColor}}>
                        자율출퇴근 근무 중
                      </FixTypeDayChangeButtonText>
                    </FixTypeDayChangeButton>
                  </FixTypeDayChangeBox>
                </>
              )}
              {!isFreeWorkingType &&
                timeTable.length == 0 && ( // 자율출퇴근★
                  <>
                    <GreyLine />
                    <FixTypeDayChangeButton
                      style={{
                        borderColor: styleGuide.palette.greyColor,
                        width: '100%',
                      }}
                      onPress={() => registerScheduleFn()}>
                      <FixTypeDayChangeButtonText
                        style={{color: styleGuide.palette.greyColor}}>
                        일정 추가
                      </FixTypeDayChangeButtonText>
                    </FixTypeDayChangeButton>
                  </>
                )}
              {!isFreeWorkingType && timeTable.length > 0 && (
                <>
                  <GreyLine />
                  <SpaceRow>
                    <FixTypeDayChangeButton
                      style={{borderColor: styleGuide.palette.greyColor}}
                      onPress={() => registerScheduleFn()}>
                      <FixTypeDayChangeButtonText
                        style={{color: styleGuide.palette.greyColor}}>
                        추가
                      </FixTypeDayChangeButtonText>
                    </FixTypeDayChangeButton>
                    <FixTypeDayChangeButton
                      style={{borderColor: styleGuide.palette.greyColor}}
                      onPress={() => modifyScheduleFn()}>
                      <FixTypeDayChangeButtonText
                        style={{color: styleGuide.palette.greyColor}}>
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
                  </SpaceRow>
                </>
              )}
              {!isFreeWorkingType && (
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
