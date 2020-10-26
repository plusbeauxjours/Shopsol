import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import ManageInviteEmployeeCard1 from './ManageInviteEmployeeCard1';
import ManageInviteEmployeeCard2 from './ManageInviteEmployeeCard2';
import {HelpCircleIcon} from '~/constants/Icons';
import {getRESPONSE_EMPLOYEE} from '~/redux/employeeSlice';

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
  padding-bottom: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const BoxTitle = styled.TouchableOpacity`
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const EmployeeListBox = styled.View`
  align-items: center;
`;

const BoxTitleText = styled.Text`
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const GreyText = styled.Text`
  text-align: center;
  color: #aaa;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const {RESPONSE_EMPLOYEE, NO_RESPONSE_EMPLOYEE} = useSelector(
    (state: any) => state.employeeReducer,
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const explainModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await dispatch(getRESPONSE_EMPLOYEE());
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const gotoInviteEmployee = () => {
    navigation.navigate('InviteEmployeeScreen');
  };

  useEffect(() => {
    dispatch(getRESPONSE_EMPLOYEE());
  }, []);

  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <Section>
            <BoxTitle
              onPress={() =>
                explainModal('', 'App 설치 및 회원가입이 완료된 직원입니다.')
              }>
              <BoxTitleText style={{paddingRight: 5}}>
                초대에 응한 직원
              </BoxTitleText>
              <HelpCircleIcon />
            </BoxTitle>
            {RESPONSE_EMPLOYEE?.length === 0 && (
              <GreyText>초대에 응한 직원이 없습니다</GreyText>
            )}
            <EmployeeListBox>
              {RESPONSE_EMPLOYEE?.map((data, index) => (
                <ManageInviteEmployeeCard1
                  key={index}
                  data={data}
                  EMP_NAME={data.EMP_NAME}
                  EMP_SEQ={data.EMP_SEQ}
                  PHONE={data.MobileNo}
                  STORE_SEQ={STORE_SEQ}
                  onRefresh={onRefresh}
                  IMAGE={data.images[0].IMAGE}
                />
              ))}
            </EmployeeListBox>
          </Section>
          <Section>
            <BoxTitle
              onPress={() => {
                explainModal(
                  '',
                  'App 설치가 완료되지 않은 직원입니다. 초대메시지 재전송을 눌러 다시한번 알려주세요.',
                );
              }}>
              <BoxTitleText style={{paddingRight: 5}}>
                초대 메시지 미열람 직원
              </BoxTitleText>
              <HelpCircleIcon />
            </BoxTitle>
            {NO_RESPONSE_EMPLOYEE?.length === 0 && (
              <GreyText>초대 메시지 미열람 직원이 없습니다.</GreyText>
            )}
            <EmployeeListBox>
              {NO_RESPONSE_EMPLOYEE?.map((data, index) => (
                <ManageInviteEmployeeCard2
                  key={index}
                  join_emp_seq={data.join_emp_seq}
                  EMP_NAME={data.EMP_NAME}
                  PHONE={data.PHONE}
                  STORE_SEQ={STORE_SEQ}
                />
              ))}
            </EmployeeListBox>
          </Section>
          <SubmitBtn
            text={'직원초대'}
            onPress={() => gotoInviteEmployee()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
