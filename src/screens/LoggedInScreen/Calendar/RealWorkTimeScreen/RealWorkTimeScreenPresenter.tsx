import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import LottieView from 'lottie-react-native';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {ForwardArrowIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

interface IsChecked {
  isChecked?: boolean;
}

interface IIsCancel {
  isCancelBtn?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

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

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
`;

const NameText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: #333;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 10px 0 20px 0;
  background-color: ${styleGuide.palette.borderColor};
  height: 1px;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const WorkTime = styled.View`
  height: 15px;
  flex-direction: row;
  justify-content: flex-start;
`;

const WorkTitleText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.small}px;
  margin-left: 5px;
  width: 60px;
`;

const WorkTimeText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.small}px;
`;

const CntArea = styled.View`
  flex: 1;
  padding-left: 15px;
`;

const RowSpaceTouchable = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  align-items: center;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: #212121;
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

const ForwardArrowIconContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  height: 10px;
`;

const RequestBorderButton = styled.TouchableOpacity<IsChecked>`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) =>
    props.isChecked ? 'transparent' : styleGuide.palette.primary};
  border-width: ${(props) => (props.isChecked ? 0 : 1)}px;
  background-color: ${(props) =>
    props.isChecked ? styleGuide.palette.primary : 'transparent'};
  border-radius: 20px;
  height: 32px;
`;

const RequestBorderText = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? 'white' : styleGuide.palette.primary)};
`;

export default ({
  startTime,
  endTime,
  NAME,
  START,
  END,
  IMAGE,
  ATTENDANCE_TIME,
  WORK_OFF_TIME,
  CHANGE_START,
  CHANGE_END,
  START_TIME,
  END_TIME,
  UPDATED_START,
  UPDATED_END,
  registerFn,
  nomalTimeFn,
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
  noStart,
  noEnd,
  AUTOWORKOFF,
  REST_TIME,
  initStartTime,
  setInitStartTime,
  initEndTime,
  setInitEndTime,
  setNoStart,
  setNoEnd,
  initAttendanceTime,
  initWorkOffTime,
  workingStartTime,
  workingEndTime,
}) => {
  const isNextDay1 = (ATTENDANCE_TIME || START) > (WORK_OFF_TIME || END);
  const isNextDay2 = CHANGE_START > CHANGE_END;
  const isNextDay3 = START_TIME > END_TIME;
  const isNextDay4 = UPDATED_START > UPDATED_END;
  const FixScheduleStepOne = () => (
    <Section>
      <Row>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30}}
          source={{
            uri: utils.getUriImage(IMAGE),
            cache: FastImage.cacheControl.immutable,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <CntArea>
          <NameText>{NAME}</NameText>
          {(ATTENDANCE_TIME
            ? ATTENDANCE_TIME?.substring(0, 5) == CHANGE_START?.substring(0, 5)
            : START?.substring(0, 5) == CHANGE_START?.substring(0, 5)) &&
          (WORK_OFF_TIME
            ? WORK_OFF_TIME?.substring(0, 5) == CHANGE_END?.substring(0, 5)
            : END?.substring(0, 5) == CHANGE_END?.substring(0, 5)) &&
          CHANGE_START != 'undefined' &&
          CHANGE_END != 'undefined' ? (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              <WorkTimeText>
                {(ATTENDANCE_TIME || START)?.substring(0, 5)}
                &nbsp;~&nbsp;{isNextDay1 && '익일 '}
                {(WORK_OFF_TIME || END)?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              <WorkTimeText>
                {(ATTENDANCE_TIME || START)?.substring(0, 5)}&nbsp;~&nbsp;
                {isNextDay1 && '익일 '}
                {(WORK_OFF_TIME || END)?.substring(0, 5)}
                {CHANGE_START && CHANGE_END && (
                  <ForwardArrowIconContainer>
                    <ForwardArrowIcon />
                  </ForwardArrowIconContainer>
                )}
                {CHANGE_START && CHANGE_START?.substring(0, 5)}
                {CHANGE_START && CHANGE_END && ' ~ '}
                {isNextDay2 && '익일 '}
                {CHANGE_END && CHANGE_END?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          )}
          {(START_TIME?.substring(0, 5) == UPDATED_START?.substring(0, 5) &&
            END_TIME?.substring(0, 5) == UPDATED_END?.substring(0, 5)) ||
          (!UPDATED_START && !UPDATED_END) ? (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)}&nbsp;~&nbsp;
                {START_TIME && AUTOWORKOFF == '1' && !END_TIME
                  ? '퇴근미체크'
                  : isNextDay3
                  ? `익일 ${END_TIME?.substring(0, 5)}`
                  : END_TIME
                  ? END_TIME?.substring(0, 5)
                  : '미퇴근'}
              </WorkTimeText>
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)}&nbsp;~&nbsp;
                {START_TIME && AUTOWORKOFF == '1' && !END_TIME
                  ? '퇴근미체크'
                  : isNextDay3
                  ? `익일 ${END_TIME?.substring(0, 5)}`
                  : END_TIME
                  ? END_TIME?.substring(0, 5)
                  : '미퇴근'}
              </WorkTimeText>
              <ForwardArrowIconContainer>
                <ForwardArrowIcon />
              </ForwardArrowIconContainer>
              <WorkTimeText>
                {!UPDATED_START ? '미출근' : UPDATED_START.substring(0, 5)}
                &nbsp;~&nbsp;
                {UPDATED_START && AUTOWORKOFF == '1' && !UPDATED_END
                  ? '퇴근미체크'
                  : isNextDay4
                  ? `익일 ${UPDATED_END?.substring(0, 5)}`
                  : UPDATED_END
                  ? UPDATED_END?.substring(0, 5)
                  : '미퇴근'}
              </WorkTimeText>
            </WorkTime>
          )}
          <WorkTime>
            <WorkTitleText>휴게시간 </WorkTitleText>
            <WorkTitleText style={{marginLeft: 0}}>{REST_TIME}분</WorkTitleText>
          </WorkTime>
        </CntArea>
      </Row>
    </Section>
  );

  const FixScheduleStepTwo = () => (
    <Section>
      <RowTitle>
        <TitleText>변경할 출퇴근시간</TitleText>
      </RowTitle>
      <GreyLine />
      <RowSpaceTouchable>
        <SideText>출근시간</SideText>
        <RequestBorderButton
          isChecked={
            noStart || (!START_TIME && !UPDATED_START && !startTimeSet)
          }
          onPress={() => setIsStartTimeModalVisible(true)}>
          <RequestBorderText
            isChecked={
              noStart || (!START_TIME && !UPDATED_START && !startTimeSet)
            }>
            {noStart || (!START_TIME && !UPDATED_START && !startTimeSet)
              ? '미출근'
              : moment(startTime).format('kk:mm')}
          </RequestBorderText>
        </RequestBorderButton>
      </RowSpaceTouchable>
      <WhiteSpace />
      <RowSpaceTouchable>
        <SideText>퇴근시간</SideText>
        <RequestBorderButton
          isChecked={noEnd || (!END_TIME && !UPDATED_END && !endTimeSet)}
          onPress={() => setIsEndTimeModalVisible(true)}>
          <RequestBorderText
            isChecked={noEnd || (!END_TIME && !UPDATED_END && !endTimeSet)}>
            {noEnd || (!END_TIME && !UPDATED_END && !endTimeSet)
              ? '미퇴근'
              : moment(endTime).format('kk:mm')}
          </RequestBorderText>
        </RequestBorderButton>
      </RowSpaceTouchable>
    </Section>
  );

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FixScheduleStepOne />
          <FixScheduleStepTwo />
          <SubmitBtn
            text={'수정완료'}
            isRegisted={true}
            onPress={() => registerFn()}
          />
        </Container>
      </ScrollView>
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
        <DatePickerContainer style={{height: utils.isAndroid() ? 450 : 490}}>
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
          <DatePickerRoundBtn
            isCancelBtn={true}
            style={{
              borderColor: styleGuide.palette.primary,
            }}
            onPress={() => {
              nomalTimeFn('start');
              setIsStartTimeModalVisible(false);
              setStartTimeSet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText
              style={{color: styleGuide.palette.primary}}
              isCancelBtn={true}>
              정상출근&nbsp;
              {workingStartTime &&
                `(${moment(workingStartTime).format('kk:mm')})`}
            </DatePickerText>
          </DatePickerRoundBtn>
          <DatePickerRoundBtn
            isCancelBtn={true}
            style={{
              borderColor: styleGuide.palette.primary,
            }}
            onPress={() => {
              nomalTimeFn('deleteStart');
              setIsStartTimeModalVisible(false);
              setStartTimeSet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText
              style={{color: styleGuide.palette.primary}}
              isCancelBtn={true}>
              미출근
            </DatePickerText>
          </DatePickerRoundBtn>
          <WhiteSpace style={{height: 20}} />
          {startTimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setNoStart(false);
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
        <DatePickerContainer style={{height: utils.isAndroid() ? 450 : 490}}>
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
          <DatePickerRoundBtn
            isCancelBtn={true}
            style={{
              borderColor: styleGuide.palette.primary,
            }}
            onPress={() => {
              nomalTimeFn('end');
              setIsEndTimeModalVisible(false);
              setEndTimeSet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText
              style={{color: styleGuide.palette.primary}}
              isCancelBtn={true}>
              정상퇴근&nbsp;
              {workingEndTime && `(${moment(workingEndTime).format('kk:mm')})`}
            </DatePickerText>
          </DatePickerRoundBtn>
          <DatePickerRoundBtn
            isCancelBtn={true}
            style={{
              borderColor: styleGuide.palette.primary,
            }}
            onPress={() => {
              nomalTimeFn('deleteEnd');
              setIsEndTimeModalVisible(false);
              setEndTimeSet(true);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText
              style={{color: styleGuide.palette.primary}}
              isCancelBtn={true}>
              미퇴근
            </DatePickerText>
          </DatePickerRoundBtn>
          <WhiteSpace style={{height: 20}} />
          {endTimeSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setNoEnd(false);
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
    </BackGround>
  );
};
