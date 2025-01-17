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
import {ForwardArrowIcon, EllipseIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  margin-left: 5px;
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.small}px;
`;

const NameText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  margin-bottom: 5px;
`;

const RowSpace = styled(Row)`
  margin-top: 5px;
  width: 100%;
  justify-content: space-between;
`;

const SelectBox = styled(RowSpace)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const SelectBoxTouchable = styled.TouchableOpacity`
  height: 30px;
  width: ${wp('100%') / 3 - 20}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${styleGuide.palette.greyColor};
  justify-content: center;
  align-items: center;
`;

const BoxText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
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
  justify-content: flex-start;
  padding-bottom: 5px;
  min-height: 80px;
`;

const WhiteSpace = styled.View`
  height: 10px;
`;

const ForwardArrowIconContainer = styled.View`
  justify-content: center;
  align-items: center;
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
  IMAGE,
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
  AUTOWORKOFF,
  IS_MANAGER,
  CALENDAR_EDIT,
  MANAGER_CALLED,
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

  const cancelVacationFn = async () => {
    try {
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
    if (STORE == '1' || (STORE == '0' && CALENDAR_EDIT)) {
      if (VACATION) {
        return (
          <SelectBox style={{marginTop: 0}}>
            <SelectBoxTouchable
              style={{width: wp('90%')}}
              onPress={() => confirmModal()}>
              <BoxText>휴무 취소</BoxText>
            </SelectBoxTouchable>
          </SelectBox>
        );
      } else if (TYPE == '4') {
        return (
          <SelectBox style={{marginTop: 0}}>
            <SelectBoxTouchable
              style={{width: (wp('100%') / 3) * 2 - 30}}
              onPress={() => {
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
      } else {
        return (
          <SelectBox style={{marginTop: 0}}>
            <SelectBoxTouchable
              onPress={() => {
                navigation.navigate('WorkTimeScreen', {
                  data,
                  date,
                });
              }}>
              <BoxText>근무시간 수정</BoxText>
            </SelectBoxTouchable>
            <SelectBoxTouchable
              onPress={() => {
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
        <Row style={{paddingTop: 10}}>
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
            <RowSpace>
              <Row>
                <NameText style={{marginLeft: 5}}>{NAME}&nbsp;</NameText>
                <NameText style={{fontSize: 12}}>
                  {IS_MANAGER === '1' ? `[${MANAGER_CALLED}]` : '[직원]'}
                </NameText>
              </Row>
              <Row>
                {VACATION == '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#325CBE'} />
                    <Text>휴무</Text>
                  </Row>
                )}
                {ICON == '1' && VACATION != '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#23AF3A'} />
                    <Text>출근예정</Text>
                  </Row>
                )}
                {TYPE == '3' && VACATION != '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#325CBE'} />
                    <Text>추가일정</Text>
                  </Row>
                )}
                {nowork == '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#B91C1B'} />
                    <Text>결근</Text>
                  </Row>
                )}
                {workoff == '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#8F8F8F'} />
                    <Text>퇴근</Text>
                  </Row>
                )}
                {working == '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#23AF3A'} />
                    <Text>근무중</Text>
                  </Row>
                )}
                {alear == '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#E8B12F'} />
                    <Text>조퇴</Text>
                  </Row>
                )}
                {jigark == '1' && (
                  <Row style={{marginRight: 10}}>
                    <EllipseIcon size={8} color={'#E8B12F'} />
                    <Text>지각</Text>
                  </Row>
                )}
              </Row>
            </RowSpace>
            {(ATTENDANCE_TIME
              ? ATTENDANCE_TIME?.substring(0, 5) ==
                CHANGE_START?.substring(0, 5)
              : START?.substring(0, 5) == CHANGE_START?.substring(0, 5)) &&
            (WORK_OFF_TIME
              ? WORK_OFF_TIME?.substring(0, 5) == CHANGE_END?.substring(0, 5)
              : END?.substring(0, 5) == CHANGE_END?.substring(0, 5)) &&
            CHANGE_START != 'undefined' &&
            CHANGE_END != 'undefined' ? (
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
                )}
              </WorkTime>
            )}
            {!VACATION && (
              <>
                {(START_TIME?.substring(0, 5) ==
                  UPDATED_START?.substring(0, 5) &&
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
                      {!UPDATED_START
                        ? '미출근'
                        : UPDATED_START.substring(0, 5)}
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
              </>
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
