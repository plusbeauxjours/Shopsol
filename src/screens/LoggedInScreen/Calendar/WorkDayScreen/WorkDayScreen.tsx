import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {removeAddWork} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import {ForwardIcon, TimerIcon, CalendarTimesIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Card = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px 0;
  background-color: white;
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
      <Container>
        <Section>
          <Card
            onPress={() =>
              navigation.navigate('WorkDayRestTypeScreen', {
                data: params?.data,
                date,
              })
            }>
            <Text>
              <CalendarTimesIcon color={'#999'} />
              &nbsp;&nbsp;휴무 설정
            </Text>
            <ForwardIcon size={24} color={styleGuide.palette.primary} />
          </Card>
          <Card
            onPress={() =>
              navigation.navigate('WorkDayRestTimeScreen', {
                data: params?.data,
                date,
              })
            }>
            <Text>
              <TimerIcon color={'#999'} />
              &nbsp;&nbsp;휴게시간 설정
            </Text>
            <ForwardIcon size={24} color={styleGuide.palette.primary} />
          </Card>
          {addWork == 'addWork' && (
            <Card
              onPress={() =>
                confirmModal('', `추가일정을 삭제합니다`, '취소', '삭제')
              }>
              <Text>&nbsp;&nbsp;추가일정 삭제</Text>
              <ForwardIcon size={24} color={styleGuide.palette.primary} />
            </Card>
          )}
        </Section>
      </Container>
    </BackGround>
  );
};
