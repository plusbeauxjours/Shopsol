import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import DatePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import SubmitBtn from '~/components/Btn/SubmitBtn';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
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

const TimePickBox = styled.View`
  margin-top: 20px;
  padding: 20px;
  border-color: #f2f2f2;
  border-top-width: 1px;
  justify-content: space-around;
  height: 110px;
`;

const NameText = styled.Text`
  font-size: 18px;
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

const NormalContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const NormalBox = styled.TouchableOpacity<IsSelected>`
  width: ${(wp('100%') - 130) / 4}px;
  height: 50px;
  margin: 0 5px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#ccc' : '#e85356')};
  align-items: center;
  justify-content: center;
`;

const NormalText = styled.Text<IsSelected>`
  color: ${(props) => (props.isSelected ? '#ccc' : '#e85356')};
  font-size: 14px;
`;

const WorkTime = styled.View`
  height: 15px;
  flex-direction: row;
  justify-content: flex-start;
`;

const WorkTitleText = styled.Text`
  color: #999;
  font-size: 11px;
  margin-left: 5px;
  width: 60px;
`;

const WorkTimeText = styled.Text`
  color: #999;
  font-size: 11px;
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

export default ({
  startTime,
  endTime,
  NAME,
  START,
  END,
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
}) => {
  const FixScheduleStepOne = () => (
    <Section>
      <Row>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30}}
          source={{
            uri: 'http://cuapi.shop-sol.com/uploads/3.png',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <CntArea>
          <NameText style={{marginBottom: 10}}>{NAME}</NameText>
          {CHANGE_START ? (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              <WorkTimeText>
                {(ATTENDANCE_TIME || START)?.substring(0, 5)} ~&nbsp;
                {(WORK_OFF_TIME || END)?.substring(0, 5)} >&nbsp;
                {CHANGE_START == null ? '' : CHANGE_START?.substring(0, 5)}{' '}
                ~&nbsp;
                {CHANGE_END == null ? '' : CHANGE_END?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              <WorkTimeText>
                {(ATTENDANCE_TIME || START)?.substring(0, 5)} ~&nbsp;
                {(WORK_OFF_TIME || END)?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          )}
          {UPDATED_START == null && UPDATED_END == null ? (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)} ~&nbsp;
                {(END_TIME || '미퇴근')?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)} ~&nbsp;
                {(END_TIME || '미퇴근')?.substring(0, 5)} >&nbsp;
                {(UPDATED_START || '미출근')?.substring(0, 5)} ~&nbsp;
                {(UPDATED_END || '미퇴근')?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          )}
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
      </TimePickBox>
      <WhiteSpace />
      <NormalContainer>
        <NormalBox
          disabled={startTime !== '미출근'}
          onPress={() => nomalTimeFn('start')}
          isSelected={startTime !== '미출근'}>
          <NormalText isSelected={startTime !== '미출근'}>정상출근</NormalText>
        </NormalBox>
        <NormalBox
          disabled={endTime !== '미퇴근'}
          onPress={() => nomalTimeFn('end')}
          isSelected={endTime !== '미퇴근'}>
          <NormalText isSelected={endTime !== '미퇴근'}>정상퇴근</NormalText>
        </NormalBox>
        <NormalBox
          disabled={startTime === '미출근'}
          onPress={() => nomalTimeFn('deleteStart')}
          isSelected={startTime === '미출근'}>
          <NormalText isSelected={startTime === '미출근'}>미출근</NormalText>
        </NormalBox>
        <NormalBox
          disabled={endTime === '미퇴근'}
          onPress={() => nomalTimeFn('deleteEnd')}
          isSelected={endTime === '미퇴근'}>
          <NormalText isSelected={endTime === '미퇴근'}>미퇴근</NormalText>
        </NormalBox>
      </NormalContainer>
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
      <DatePickerModal
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
