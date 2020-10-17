import React from 'react';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import api from '~/constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {toggleVACATION} from '~/redux/calendarSlice';
import {EllipseIcon} from '~/constants/Icons';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const Text = styled.Text`
  margin-left: 5px;
  font-weight: 200;
  font-size: 11px;
`;

const NameText = styled.Text`
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
`;

const RowSpace = styled(Row)`
  margin-top:10px;
  width: 100%;
  justify-content: space-between;
`;

const SelectBox = styled(RowSpace)`
  margin-top: 10;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const SelectBoxTouchable = styled.TouchableOpacity`
  height: 30px;
  width: ${wp('28%')}px;
  border-width: 1px;
  border-radius: 10px;
  border-color:#999;
  justify-content: center;
  align-items: center;
`;

const BoxText = styled.Text`
  color:#999;
  font-size: 12px;
`;

const Container = styled.View`
  width: ${wp('100%')}px;
  background-color: white;
  border-color: #dedede;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: stretch;
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

const WhiteSpace = styled.View`
  height: 10px;
`;

export default ({
  data,
  STORE,
  index,
  SCH_ID,
  MEMBER_SEQ,
  VACATION,
  TYPE,
  STORE_SEQ,
  NAME,
  date,
  image,
  ICON,
  nowork,
  workoff,
  working,
  alear,
  jigark,
  CHANGE_START,
  CHANGE_END,
  ATTENDANCE_TIME,
  START,
  WORK_OFF_TIME,
  END,
  UPDATED_START,
  UPDATED_END,
  START_TIME,
  END_TIME,
  REST_TIME,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isNextDay1 = (ATTENDANCE_TIME || START) > (WORK_OFF_TIME || END);
  const isNextDay2 = CHANGE_START > CHANGE_END;
  const isNextDay3 = START_TIME > END_TIME;
  const isNextDay4 = UPDATED_START > UPDATED_END;

  const confirmModal = () => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '휴무를 취소하시겠습니까?',
      cancelButtonText: '아니요',
      okButtonText: '예',
      okCallback: () => cancelVacationFn(),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = () => {
    const params = {
      alertType: 'alert',
      title: '',
      content: '휴무를 취소하였습니다',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelVacationFn = async () => {
    try {
      alertModal();
      dispatch(
        toggleVACATION({
          VACATION: null,
          DATE: date,
          MEMBER_SEQ,
        }),
      );
      await api.cancelScheduleVacation({SCH_ID});
    } catch (e) {
      console.log(e);
    }
  };

  const ButtonGroup = () => {
    if (STORE === '1') {
      if (VACATION) {
        return (
          <SelectBox>
            <SelectBoxTouchable
              style={{width: wp('90%')}}
              onPress={() => confirmModal()}>
              <BoxText>휴무 취소</BoxText>
            </SelectBoxTouchable>
          </SelectBox>
        );
      } else {
        return (
          <SelectBox>
            <SelectBoxTouchable
              onPress={() => {
                console.log(data)
                navigation.navigate('WorkTimeScreen', {
                  data,
                  date,
                });
              }}>
              <BoxText>근무시간 수정</BoxText>
            </SelectBoxTouchable>
            <SelectBoxTouchable
              onPress={() => {
                console.log(data)
                navigation.navigate('RealWorkTimeScreen', {
                  data,
                  date,
                });
              }}>
              <BoxText>출퇴근시간 수정</BoxText>
            </SelectBoxTouchable>
            <SelectBoxTouchable
              onPress={() => {
                navigation.navigate('WorkDayScreen', {
                  data,
                  STORE_SEQ,
                  date,
                  addWork:
                    TYPE == '3' && VACATION != '1' ? 'addWork' : 'schWork',
                });
              }}>
              <BoxText>기타 설정</BoxText>
            </SelectBoxTouchable>
          </SelectBox>
        );
      }
    } else {
      return <WhiteSpace />;
    }
  };

  return (
    <Container key={index}>
      <ContentBox>
        <RowSpace>
          <NameText>{NAME}</NameText>
          <Row>
            {VACATION == '1' && (
              <Row>
                <EllipseIcon size={8} color={'#325CBE'} />
                <Text>휴무</Text>
              </Row>
            )}
            {ICON == '1' && VACATION != '1' && (
              <Row>
                <EllipseIcon size={8} color={'#23AF3A'} />
                <Text>출근예정</Text>
              </Row>
            )}
            {TYPE == '3' && VACATION != '1' && (
              <Row>
                <EllipseIcon size={8} color={'#325CBE'} />
                <Text>추가일정</Text>
              </Row>
            )}
            {nowork == '1' && (
              <Row>
                <EllipseIcon size={8} color={'#B91C1B'} />
                <Text>결근</Text>
              </Row>
            )}
            {workoff == '1' && (
              <Row>
                <EllipseIcon size={8} color={'#8F8F8F'} />
                <Text>퇴근</Text>
              </Row>
            )}
            {working == '1' && (
              <Row>
                <EllipseIcon size={8} color={'#23AF3A'} />
                <Text>근무중</Text>
              </Row>
            )}
            {alear == '1' && (
              <Row>
                <EllipseIcon size={8} color={'#E8B12F'} />
                <Text>조퇴</Text>
              </Row>
            )}
            {jigark == '1' && (
              <Row>
                <EllipseIcon size={8} color={'#E8B12F'} />
                <Text>지각</Text>
              </Row>
            )}
          </Row>
        </RowSpace>
        <Row>
          <FastImage
            style={{width: 60, height: 60, borderRadius: 30}}
            source={{
              uri: 'http://133.186.210.223/uploads/' + image,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <CntArea>
            {CHANGE_START == null && CHANGE_END == null ? (
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
                  {(WORK_OFF_TIME || END)?.substring(0, 5)}&nbsp;>&nbsp;
                  {CHANGE_START == null ? '' : CHANGE_START?.substring(0, 5)}
                  &nbsp;~&nbsp;{isNextDay2 && '익일 '}
                  {CHANGE_END == null ? '' : CHANGE_END?.substring(0, 5)}
                </WorkTimeText>
              </WorkTime>
            )}
            {UPDATED_START == null && UPDATED_END == null ? (
              <WorkTime>
                <WorkTitleText>출퇴근시간 </WorkTitleText>
                <WorkTimeText>
                  {(START_TIME || '미출근')?.substring(0, 5)}&nbsp;~&nbsp;
                  {isNextDay3 && '익일 '}
                  {(END_TIME || '미퇴근')?.substring(0, 5)}
                </WorkTimeText>
              </WorkTime>
            ) : (
              <WorkTime>
                <WorkTitleText>출퇴근시간 </WorkTitleText>
                <WorkTimeText>
                  {(START_TIME || '미출근')?.substring(0, 5)}&nbsp;~&nbsp;
                  {isNextDay3 && '익일 '}
                  {(END_TIME || '미퇴근')?.substring(0, 5)}&nbsp;>&nbsp;
                  {(UPDATED_START || '미출근')?.substring(0, 5)}&nbsp;~&nbsp;
                  {isNextDay4 && '익일 '}
                  {(UPDATED_END || '미퇴근')?.substring(0, 5)}
                </WorkTimeText>
              </WorkTime>
            )}

            <WorkTime>
              <WorkTitleText>휴게시간 </WorkTitleText>
              <WorkTitleText style={{marginLeft: 0}}>
                {REST_TIME}분
              </WorkTitleText>
            </WorkTime>
          </CntArea>
        </Row>
      </ContentBox>
      <ButtonGroup />
    </Container>
  );
};
