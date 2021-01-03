import React, {useState} from 'react';
import styled from 'styled-components/native';

import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';

import api from '~/constants/LoggedInApi';
import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {getRESPONSE_EMPLOYEE} from '~/redux/employeeSlice';
import styleGuide from '~/constants/styleGuide';

interface IsLast {
  isLast?: boolean;
}

const Container = styled.View<IsLast>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.isLast ? 0 : 10)}px;
`;

const EmployeeBox = styled.View`
  width: 120px;
  align-items: flex-start;
  margin-left: 10px;
`;

const AdmitText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.primary};
`;

const RefuseText = styled(AdmitText)`
  color: #3d3d3d;
`;

const TextBox = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.View`
  width: 100px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  right: 0;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PhoneText = styled.Text`
  margin-top: 5px;
  color: #555;
  font-size: 14px;
`;

export default ({
  key,
  isLast,
  join_emp_seq,
  EMP_NAME,
  PHONE,
  STORE_SEQ,
  IMAGE,
}) => {
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
    <Container isLast={isLast}>
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
        <EmployeeBox>
          <NameText>{EMP_NAME}</NameText>
          <PhoneText>{PHONE}</PhoneText>
        </EmployeeBox>
      </Row>
      {isSent ? (
        <ButtonBox disabled={true}>
          <RefuseText>전송 완료</RefuseText>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <TextBox onPress={() => sendFn(PHONE)}>
            <AdmitText>재전송</AdmitText>
          </TextBox>
          <TextBox onPress={() => deleteModal(join_emp_seq)}>
            <RefuseText>삭제</RefuseText>
          </TextBox>
        </ButtonBox>
      )}
    </Container>
  );
};
