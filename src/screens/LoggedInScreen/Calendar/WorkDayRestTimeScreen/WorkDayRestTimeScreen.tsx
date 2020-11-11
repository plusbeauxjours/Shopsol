import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {updateREST_TIME} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import SubmitBtn from '~/components/Btn/SubmitBtn';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

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
  align-items: flex-end;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const BigText = styled.Text`
  font-size: 24px;
`;

const TextInput = styled.TextInput`
  font-size: 24px;
  color: #e85356;
  flex: 1;
  text-align: right;
  margin: 0 5px;
`;

const TextReadOnly = styled(BigText)`
  color: #e85356;
  margin: 0 5px;
  text-align: right;
`;

const Bold = styled.Text`
  margin-left: 10px;
  font-size: 26px;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    data: {
      MEMBER_SEQ = null,
      EMP_ID = null,
      REST_TIME = null,
      SCH_ID = null,
      NAME = null,
      ATTENDANCE_TIME = null,
      WORK_OFF_TIME = null,
    },
    date = null,
  } = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [restTime, setRestTime] = useState<string>('');

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const registerFn = async () => {
    if (!restTime) {
      return alertModal('수정할 휴게시간을 입력해주세요.');
    }
    navigation.pop(2);
    alertModal('휴게시간이 변경되었습니다.');
    try {
      dispatch(
        updateREST_TIME({
          REST_TIME: restTime,
          DATE: date,
          MEMBER_SEQ,
        }),
      );
      if (Object.prototype.hasOwnProperty.call(params?.data, 'SCH_ID')) {
        await api.getScheduleRestTimeUpdate({
          STORE_ID: STORE_SEQ,
          EMP_SEQ: EMP_ID,
          SCH_ID,
          EMP_NAME: NAME,
          NEW_REST_TIME: restTime,
          DATE: date,
        });
      } else {
        await api.getScheduleRestTimeCreate({
          STORE_ID: STORE_SEQ,
          EMP_SEQ: EMP_ID,
          EMP_NAME: NAME,
          NEW_REST_TIME: restTime,
          DATE: date,
          START: ATTENDANCE_TIME,
          END: WORK_OFF_TIME,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BackGround>
      <Container>
        <Section>
          <Bold>현재 휴게시간 설정값</Bold>
          <WhiteSpace />
          <Row>
            <TextReadOnly>{REST_TIME ?? '0'}</TextReadOnly>
            <BigText>분</BigText>
          </Row>
          <WhiteSpace />
          <Bold>수정할 휴게시간</Bold>
          <WhiteSpace />
          <Row>
            <TextInput
              placeholder={'시간을 입력해주세요'}
              placeholderTextColor={'#E5E5E5'}
              selectionColor={'#999'}
              onChangeText={(text) => {
                setRestTime(text);
              }}
              maxLength={3}
              value={restTime}
              autoFocus={true}
              keyboardType={'number-pad'}
            />
            <BigText>분</BigText>
          </Row>
        </Section>
        <SubmitBtn
          text={'휴게시간 적용'}
          onPress={() => registerFn()}
          isRegisted={true}
        />
      </Container>
    </BackGround>
  );
};
