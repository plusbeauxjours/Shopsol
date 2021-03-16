import React from 'react';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import {
  EllipseIcon,
  RemoveCircleIcon,
  HelpCircleIcon,
  CheckBoxOnIcon,
  CheckBoxOffIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import EmployeeScheduleAddScreenRenderDayPicker from './EmployeeScheduleAddScreenRenderDayPicker';
import EmployeeScheduleAddScreenRenderWorkDay from './EmployeeScheduleAddScreenRenderWorkDay';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
}

interface IIsBefore {
  isBefore: boolean;
}

interface IIsCancel {
  isCancelBtn?: boolean;
}

interface IsChecked {
  isChecked?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

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
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: ${styleGuide.palette.borderColor};
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
`;

const WorkTypeCheckSection = styled.View``;

const InputCase = styled.View`
  margin-bottom: 20px;
`;

const SideBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: #212121;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const TimePickBoxTimeText = styled.Text<IsSelected>`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${(props) =>
    props.isSelected ? styleGuide.palette.primary : '#cccccc'};
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
  width: 300px;
  height: ${utils.isAndroid() ? 330 : 370}px;
  border-radius: 20px;
  padding: 20px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const DatePickerRoundBtn = styled(Ripple)<IIsCancel>`
  width: 250px;
  height: 40px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: ${styleGuide.palette.greyColor};
  background-color: ${(props) =>
    props.isCancelBtn ? 'transparent' : styleGuide.palette.primary};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const DatePickerText = styled.Text<IIsCancel>`
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.large}px;
  color: ${(props) =>
    props.isCancelBtn ? styleGuide.palette.greyColor : 'white'};
  text-align: center;
`;

const DatePickerRoundView = styled.View<IIsCancel>`
  width: 250px;
  height: 40px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: #ddd;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ColumnPayBox = styled.View`
  width: ${wp('100%') - 80}px;
  padding: 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: #cccccc;
  align-items: center;
`;

const InputCaseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
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

const SmallTextContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const SmallText = styled.Text`
  text-align: center;
  font-size: ${styleGuide.fontSize.small}px;
  color: ${styleGuide.palette.greyColor};
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
  initStartDate,
  setInitStartDate,
  initEndDate,
  setInitEndDate,
  initStartTime,
  setInitStartTime,
  initEndTime,
  setInitEndTime,
  endDaySet,
  setEndDaySet,
  scrollRef,
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
      <Animated.ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <InputCase>
              <TitleText>일정 정보</TitleText>
              <GreyLine />
              <InputCaseRow>
                <Row
                  style={{
                    justifyContent: 'flex-start',
                  }}>
                  <Text>일정 시작일</Text>
                  <Touchable
                    onPress={() => {
                      explainModal('샵솔 출퇴근관리가 시작되는 일자입니다.');
                    }}>
                    <HelpCircleIcon />
                  </Touchable>
                </Row>

                <RequestBorderButton
                  isChecked={true}
                  onPress={() => setIsStartDayModalVisible(true)}>
                  <RequestBorderText isChecked={true}>
                    {moment(startDate).format('YYYY년 M월 D일') ?? ''}
                  </RequestBorderText>
                </RequestBorderButton>
              </InputCaseRow>
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
                    <CheckBoxOnIcon size={22} />
                  ) : (
                    <CheckBoxOffIcon size={22} />
                  )}
                  <Text style={{marginLeft: 5}}>일정 종료일 없음</Text>
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
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}>
                      <Row>
                        <Text>일정종료일</Text>
                      </Row>
                      <RequestBorderButton
                        isChecked={endDaySet}
                        onPress={() => {
                          setIsEndDayModalVisible(true);
                        }}>
                        <RequestBorderText isChecked={endDaySet}>
                          {endDaySet
                            ? moment(endDate).format('YYYY년 M월 D일')
                            : '일정종료일 설정'}
                        </RequestBorderText>
                      </RequestBorderButton>
                    </Row>
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
            <DayPickRowBox style={{marginBottom: TYPE == '수정' ? 10 : 20}}>
              <RenderDayPicker />
            </DayPickRowBox>
            {TYPE == '수정' && (
              <SmallTextContainer>
                <SmallText>
                  하단에서 수정하고자 하는 요일의 일정을 먼저 삭제한 후
                  진행해주세요.
                </SmallText>
              </SmallTextContainer>
            )}
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
                  <Row style={{paddingLeft: 3}}>
                    <EllipseIcon
                      color={timeListIndex === index ? data.color : '#ddd'}
                    />
                    <SelectedText
                      style={{paddingLeft: 17}}
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
                        <RemoveCircleIcon />
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
      </Animated.ScrollView>
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
        isVisible={isStartTimeModalVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          {!startTimeSet && (
            <LottieView
              style={{
                width: 150,
                top: 23,
                right: 0,
                position: 'absolute',
              }}
              source={require('../../../../assets/animations/rowlett.json')}
              loop={true}
              autoPlay
            />
          )}
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
            minuteInterval={5}
          />
          {startTimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setInitStartTime(moment(startTime));
                setIsStartTimeModalVisible(false);
                setStartTimeSet(true);
              }}
              rippleColor={styleGuide.palette.rippleGreyColor}
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
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setStartTime(moment(initStartTime));
              setStartTimeSet(false);
              setIsStartTimeModalVisible(false);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText isCancelBtn={true}>취소</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
        isVisible={isEndTimeModalVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          {!endTimeSet && (
            <LottieView
              style={{
                width: 150,
                top: 23,
                right: 0,
                position: 'absolute',
              }}
              source={require('../../../../assets/animations/rowlett.json')}
              loop={true}
              autoPlay
            />
          )}
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
            minuteInterval={5}
          />
          {endTimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setInitEndTime(moment(endTime));
                setIsEndTimeModalVisible(false);
                setEndTimeSet(true);
              }}
              rippleColor={styleGuide.palette.rippleGreyColor}
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
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setEndTime(moment(initEndTime));
              setEndTimeSet(false);
              setIsEndTimeModalVisible(false);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText isCancelBtn={true}>취소</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
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
            onDateChange={(date) =>
              setStartDate(moment(date).format('YYYY-MM-DD'))
            }
          />
          <DatePickerRoundBtn
            onPress={() => {
              setInitStartDate(moment(startDate).format('YYYY-MM-DD'));
              setIsStartDayModalVisible(false);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setIsStartDayModalVisible(false);
              setStartDate(moment(initStartDate).format('YYYY-MM-DD'));
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText isCancelBtn={true}>취소</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
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
            onDateChange={(date) =>
              setEndDate(moment(date).format('YYYY-MM-DD'))
            }
          />
          <DatePickerRoundBtn
            onPress={() => {
              setInitEndDate(moment(endDate).format('YYYY-MM-DD'));
              setIsEndDayModalVisible(false);
              setEndDaySet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setIsEndDayModalVisible(false);
              setEndDate(moment(initEndDate).format('YYYY-MM-DD'));
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText isCancelBtn={true}>취소</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
    </BackGround>
  );
};
