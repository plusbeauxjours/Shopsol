import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  UpIcon,
  DownIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '~/constants/Icons';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

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

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
`;

const TimePickBox = styled.View`
  margin-top: 20px;
  padding: 20px;
  border-color: #f2f2f2;
  border-top-width: 1px;
`;

const NameText = styled.Text`
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-right: 5px;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const IncentiveText = styled.Text`
  margin-left: 10;
  font-size: 15px;
`;

const WorkTime = styled.View`
  height: 15px;
  flex-direction: row;
  justify-content: flex-start;
`;

const WorkTitleText = styled.Text`
  color: #999;
  font-size: 10px;
  margin-left: 5px;
  width: 60px;
`;

const WorkTimeText = styled.Text`
  color: #999;
  font-size: 10px;
`;

const CntArea = styled.View`
  flex: 1;
  padding-left: 15px;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RowSpaceTouchable = styled(RowTouchable)`
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

export default ({
  startTime,
  endTime,
  stepFourClick,
  setStepFourClick,
  incentiveCheck,
  setIncentiveCheck,
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
  isStartTimeModalVisible,
  setIsStartTimeModalVisible,
  isEndTimeModalVisible,
  setIsEndTimeModalVisible,
  setStartTime,
  setEndTime,
  TYPE,
  AUTOWORKOFF,
  startTimeSet,
  setStartTimeSet,
  endTimeSet,
  setEndTimeSet,
  REST_TIME,
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
            uri: `http://133.186.210.223/uploads/${IMAGE}`,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <CntArea>
          <NameText>{NAME}</NameText>
          {((ATTENDANCE_TIME || START)?.substring(0, 5) ==
            CHANGE_START?.substring(0, 5) ||
            (WORK_OFF_TIME || END)?.substring(0, 5) ==
              CHANGE_END?.substring(0, 5)) &&
          !CHANGE_START &&
          !CHANGE_END ? (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              {TYPE == '4' ? (
                <WorkTimeText>자율출퇴근</WorkTimeText>
              ) : (
                <WorkTimeText>
                  {(ATTENDANCE_TIME || START)?.substring(0, 5)}
                  &nbsp;~&nbsp;{isNextDay1 && '익일 '}
                  {(WORK_OFF_TIME || END)?.substring(0, 5)}
                </WorkTimeText>
              )}
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              {TYPE == '4' ? (
                <WorkTimeText>자율출퇴근</WorkTimeText>
              ) : (
                <WorkTimeText>
                  {(ATTENDANCE_TIME || START)?.substring(0, 5)}&nbsp;~&nbsp;
                  {isNextDay1 && '익일 '}
                  {(WORK_OFF_TIME || END)?.substring(0, 5)}
                  {CHANGE_START && CHANGE_END && ' > '}
                  {CHANGE_START && CHANGE_START?.substring(0, 5)}
                  {CHANGE_START && CHANGE_END && ' ~ '}
                  {isNextDay2 && '익일 '}
                  {CHANGE_END && CHANGE_END?.substring(0, 5)}
                </WorkTimeText>
              )}
            </WorkTime>
          )}
          {(START_TIME?.substring(0, 5) == UPDATED_START?.substring(0, 5) &&
            END_TIME?.substring(0, 5) == UPDATED_END?.substring(0, 5)) ||
          (!START_TIME && !END_TIME && !UPDATED_START && !UPDATED_END) ? (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)}&nbsp;~&nbsp;
                {START_TIME && AUTOWORKOFF == '1'
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
                {START_TIME && AUTOWORKOFF == '1'
                  ? '퇴근미체크'
                  : isNextDay3
                  ? `익일 ${END_TIME?.substring(0, 5)}`
                  : END_TIME
                  ? END_TIME?.substring(0, 5)
                  : '미퇴근'}
                &nbsp;&gt;&nbsp;
                {!UPDATED_START ? '미출근' : UPDATED_START.substring(0, 5)}
                &nbsp;~&nbsp;
                {UPDATED_START && AUTOWORKOFF == '1'
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
        <TitleText>변경할 근무시간</TitleText>
      </RowTitle>
      <TimePickBox>
        <RowSpaceTouchable onPress={() => setIsStartTimeModalVisible(true)}>
          <SideText>근무 시작시간</SideText>
          <TimePickBoxTimeText isSelected={!!moment(startTime).format('HH:mm')}>
            {moment(startTime).format('HH:mm')}
          </TimePickBoxTimeText>
        </RowSpaceTouchable>
        <WhiteSpace />
        <RowSpaceTouchable onPress={() => setIsEndTimeModalVisible(true)}>
          <SideText>근무 종료시간</SideText>
          <TimePickBoxTimeText isSelected={!!moment(endTime).format('HH:mm')}>
            {moment(endTime).format('HH:mm')}
          </TimePickBoxTimeText>
        </RowSpaceTouchable>
      </TimePickBox>
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
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FixScheduleStepOne />
          <FixScheduleStepTwo />
          <FixScheduleStepFour />
          <SubmitBtn
            text={'수정완료'}
            isRegisted={true}
            onPress={() => registerFn()}
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
    </BackGround>
  );
};
