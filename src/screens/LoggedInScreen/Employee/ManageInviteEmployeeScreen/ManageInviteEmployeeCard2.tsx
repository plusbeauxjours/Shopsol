import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

import api from '~/constants/LoggedInApi';
import {RemoveCircleIcon} from '~/constants/Icons';
import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getRESPONSE_EMPLOYEE} from '~/redux/employeeSlice';

const Container = styled.View`
  height: ${hp('10%')}px;
  width: ${wp('100%')}px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EmployeeBox = styled.View`
  width: ${wp('30%')}px;
  align-items: flex-start
  padding-left: 20px;
`;

const NameText = styled.Text`
  color: #7f7f7f;
  font-size: 16px;
`;

const PhoneText = styled.Text`
  margin-top: 5px;
  color: #555;
  font-size: 14px;
`;

const SendText = styled.Text`
  font-size: 12px;
`;

const Touchable = styled.TouchableOpacity`
  margin-left: 5px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const ButtonBox = styled.TouchableOpacity`
  width: ${wp('35%')}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 20px;
  padding: 7px 14px;
`;

export default ({key, join_emp_seq, EMP_NAME, PHONE, STORE_SEQ}) => {
  const dispatch = useDispatch();

  const [isSent, setIsSent] = useState<boolean>(false);

  const deleteModal = (join_emp_seq) => {
    const params = {
      alertType: 'confirm',
      title: '초대 메시지 미열람 직원',
      content: '초대내역을 삭제합니다',
      cancelButtonText: '취소',
      okButtonText: '삭제',
      warning: 'yes',
      okCallback: () => {
        cancelJoinFn(join_emp_seq);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 미열람 직원에게 초대메시지 보내기
  const sendFn = async (PHONE) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.sendOneEmp({STORE_SEQ, PHONE});
      if (data.message === 'SUCCESS') {
        setIsSent(true);
        dispatch(getRESPONSE_EMPLOYEE());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  // 취소아이콘 (초대 메시지 미열람 직원)
  const cancelJoinFn = async (join_emp_seq) => {
    try {
      const {data} = await api.cancelJoin({join_emp_seq});
      if (data.message === 'SUCCESS') {
        dispatch(getRESPONSE_EMPLOYEE());
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container key={key}>
      <EmployeeBox>
        <NameText>{EMP_NAME}</NameText>
        <PhoneText>{PHONE}</PhoneText>
      </EmployeeBox>
      <Row>
        {isSent ? (
          <ButtonBox disabled={true}>
            <SendText>전송 완료</SendText>
          </ButtonBox>
        ) : (
          <ButtonBox onPress={() => sendFn(PHONE)}>
            <SendText>초대 메시지 재전송</SendText>
          </ButtonBox>
        )}
        <Touchable onPress={() => deleteModal(join_emp_seq)}>
          <RemoveCircleIcon size={36} />
        </Touchable>
      </Row>
    </Container>
  );
};
