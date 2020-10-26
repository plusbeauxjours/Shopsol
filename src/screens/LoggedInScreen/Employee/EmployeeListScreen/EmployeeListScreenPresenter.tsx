import React from 'react';

import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import EmployeeListCard from './EmployeeListCard';
import {HelpCircleIcon} from '~/constants/Icons';

interface IEmployeeListBox {
  hasEmployeeNow?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
  background-color: white;
`;

const BoxTitle = styled.View`
  margin: 0 20px;
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitleText = styled.Text`
  font-size: 20px;
  color: #7e7c7c;
`;

const StoreBox = styled.View`
  width: 100%;
  padding: 25px;
  margin-top: 20px;
  border-radius: 50px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const StoreBoxText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

const NumberText = styled.Text`
  color: #e85356;
  font-size: 18px;
  font-weight: bold;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;
const EmployeeListBox = styled.View<IEmployeeListBox>`
  width: 100%;
  align-items: center;
  border-radius: 20px;
  border-color: #f2f2f2;
  background-color: white;
  border-top-width: ${(props) => (props.hasEmployeeNow ? '1px' : 0)};
`;

export default ({
  refreshing,
  onRefresh,
  STORE,
  STORE_NAME,
  adviceModal,
  employeeNowOn,
  employeeNowOff,
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <StoreBox>
            <StoreBoxText>{STORE_NAME}의 직원목록</StoreBoxText>
          </StoreBox>

          <Section>
            <BoxTitle>
              <BoxTitleText>전체직원</BoxTitleText>
              <NumberText>{employeeNowOn?.length ?? 0}</NumberText>
            </BoxTitle>

            <EmployeeListBox hasEmployeeNow={employeeNowOn}>
              {employeeNowOn?.map((data, index) => {
                return (
                  <EmployeeListCard
                    key={index}
                    EMP_NAME={data.EMP_NAME}
                    IS_MANAGER={data.IS_MANAGER == 0 ? '스태프' : '매니저'}
                    image={
                      data.images.length == 0 ? '3.png' : data.images[0].IMAGE
                    }
                    START={data.START}
                    END={data.END}
                    data={data}
                    onRefresh={onRefresh}
                  />
                );
              })}
            </EmployeeListBox>
            <WhiteSpace />
          </Section>
          <Section>
            <BoxTitle>
              {STORE == '1' ? (
                <Touchable
                  onPress={() => {
                    adviceModal(
                      '',
                      '근무종료된 직원은 본인의 근무내역 확인이 불가능합니다.',
                    );
                  }}>
                  <BoxTitleText>근무종료</BoxTitleText>
                  <HelpCircleIcon />
                </Touchable>
              ) : (
                <BoxTitleText>근무종료</BoxTitleText>
              )}
              <NumberText>{employeeNowOff?.length ?? 0}</NumberText>
            </BoxTitle>
            {employeeNowOff?.map((data, index) => (
              <EmployeeListBox hasEmployeeNow={employeeNowOff}>
                <EmployeeListCard
                  key={index}
                  EMP_NAME={data.EMP_NAME}
                  IS_MANAGER={data.IS_MANAGER == 0 ? '스태프' : '매니저'}
                  image={
                    data.images.length == 0 ? '3.png' : data.images[0].IMAGE
                  }
                  START={data.START}
                  END={data.END}
                  data={data}
                  onRefresh={onRefresh}
                />
                <WhiteSpace />
              </EmployeeListBox>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
