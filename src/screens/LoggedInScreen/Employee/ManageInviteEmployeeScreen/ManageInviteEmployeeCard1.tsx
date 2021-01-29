import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';

import FastImage from 'react-native-fast-image';

import api from '~/constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
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
  data,
  isLast,
  EMP_NAME,
  EMP_SEQ,
  PHONE,
  STORE_SEQ,
  onRefresh,
  IMAGE,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isRefused, setIsRefused] = useState<boolean>(false);

  const gotoSetEmployeeInfo = () => {
    navigation.navigate('SetEmployeeInfoScreen', {
      EMP_NAME: data?.EMP_NAME,
      STORE_SEQ: data?.STORE_SEQ,
      EMP_SEQ: data?.EMP_SEQ,
      from: 'ManageInviteEmployeeScreen',
      onRefresh,
      IMAGE: data?.images[0]?.IMAGE,
      mobileNo: data?.MobileNo,
    });
  };

  const yesConfirmModal = (EMP_NAME) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: `[${EMP_NAME}] 직원을 합류시키시겠습니까?\n\n직원 정보 입력을 완료하신 후 합류완료 버튼을 눌러야 합류됩니다.`,
      cancelButtonText: '취소',
      okButtonText: '승인',
      okCallback: () => {
        gotoSetEmployeeInfo();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const noConfirmModal = (EMP_NAME, EMP_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: `[${EMP_NAME}]의 합류를 거절하시겠습니까?\n\n거절 후에도 직원초대를 통해 합류요청이 가능합니다.`,
      cancelButtonText: '취소',
      okButtonText: '거절',
      warning: 'yes',
      okCallback: () => {
        refuseFn(EMP_SEQ);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 거절버튼 (초대에 응한 직원)
  const refuseFn = async (EMP_SEQ) => {
    try {
      const {data} = await api.rejectJoin({STORE_SEQ, EMP_SEQ});
      if (data.message === 'SUCCESS') {
        setIsRefused(true);
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
            uri: `http://shopsolapi.shop-sol.com/uploads/${IMAGE}`,
            cache: FastImage.cacheControl.immutable,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <EmployeeBox>
          <NameText>{EMP_NAME}</NameText>
          <PhoneText>{PHONE}</PhoneText>
        </EmployeeBox>
      </Row>
      {isRefused ? (
        <ButtonBox>
          <RefuseText>거절했습니다</RefuseText>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <TextBox onPress={() => yesConfirmModal(EMP_NAME)}>
            <AdmitText>승인</AdmitText>
          </TextBox>
          <TextBox onPress={() => noConfirmModal(EMP_NAME, EMP_SEQ)}>
            <RefuseText>거절</RefuseText>
          </TextBox>
        </ButtonBox>
      )}
    </Container>
  );
};
