import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {removeAddWork} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import {ForwardIcon, TimerIcon, CalendarTimesIcon} from '~/constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;
const Touchable = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 10px;
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text`
  margin-left: 10px;
  font-size: 15px;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    data: {SCH_ID = null, MEMBER_SEQ = null} = {},
    date = null,
    addWork = null,
  } = params;
  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        deleteAddWorkFn();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteAddWorkFn = async () => {
    try {
      dispatch(
        removeAddWork({
          MEMBER_SEQ,
          DATE: date,
        }),
      );
      navigation.goBack();
      alertModal('추가일정 삭제완료');
      await api.deleteSchedule({SCH_ID});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Touchable
            onPress={() =>
              navigation.navigate('WorkDayRestTypeScreen', {
                data: params?.data,
                date,
              })
            }>
            <Text style={{color: '#e85356'}}>
              <CalendarTimesIcon color={'#e85356'} />
              &nbsp;&nbsp;휴무 설정
            </Text>
            <ForwardIcon size={24} color={'#e85356'} />
          </Touchable>
          <Touchable
            onPress={() =>
              navigation.navigate('WorkDayRestTimeScreen', {
                data: params?.data,
                date,
              })
            }>
            <Text style={{color: '#e85356'}}>
              <TimerIcon color={'#e85356'} />
              &nbsp;&nbsp;휴게시간 설정
            </Text>
            <ForwardIcon size={24} color={'#e85356'} />
          </Touchable>
          {addWork == 'addWork' && (
            <Touchable
              onPress={() =>
                confirmModal('', `추가일정을 삭제합니다`, '취소', '삭제')
              }>
              <Text style={{color: '#e85356'}}>&nbsp;&nbsp;추가일정 삭제</Text>
              <ForwardIcon size={24} color={'#e85356'} />
            </Touchable>
          )}
        </Container>
      </ScrollView>
    </BackGround>
  );
};
