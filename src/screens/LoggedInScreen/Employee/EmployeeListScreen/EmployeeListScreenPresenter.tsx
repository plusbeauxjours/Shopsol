import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';

import EmployeeListCard from './EmployeeListCard';
import {HelpCircleIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import LottieView from 'lottie-react-native';

interface IEmployeeListBox {
  hasEmployeeNow?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const NumberText = styled.Text`
  color: ${styleGuide.palette.primary};
  font-size: 18px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 10px 0 20px 0;
  background-color: ${styleGuide.palette.borderColor};
  height: 1px;
`;

const EmployeeListBox = styled.View<IEmployeeListBox>`
  width: 100%;
  align-items: center;
  border-radius: 20px;
  border-color: ${styleGuide.palette.borderColor};
  background-color: white;
`;

const Column = styled.View`
  flex-direction: column;
`;

const DarkGreyColor = styled.Text`
  color: ${styleGuide.palette.darkGreyColor};
`;

export default ({
  refreshing,
  onRefresh,
  STORE,
  adviceModal,
  employeeNowOn,
  employeeNowOff,
  MANAGER_CALLED,
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
          <Section>
            <Row>
              <TitleText>전체직원</TitleText>
              <NumberText>{employeeNowOn?.length ?? 0}</NumberText>
            </Row>
            <GreyLine />
            <EmployeeListBox hasEmployeeNow={employeeNowOn}>
              {employeeNowOn?.map((data, index) => {
                return (
                  <EmployeeListCard
                    key={index}
                    EMP_NAME={data?.EMP_NAME}
                    IS_MANAGER={data?.IS_MANAGER == 0 ? '직원' : MANAGER_CALLED}
                    image={
                      data?.images.length == 0 ? '3.png' : data?.images[0].IMAGE
                    }
                    data={data}
                    mobileNo={data?.MobileNo}
                    START={data?.START}
                    END={data?.END}
                  />
                );
              })}
            </EmployeeListBox>
          </Section>
          <Section>
            <Row>
              {STORE == '1' ? (
                <Touchable
                  onPress={() => {
                    adviceModal(
                      '',
                      '근무종료된 직원은 본인의 근무내역 확인이 불가능합니다.',
                    );
                  }}>
                  <TitleText>근무종료</TitleText>
                  <HelpCircleIcon />
                </Touchable>
              ) : (
                <TitleText>근무종료</TitleText>
              )}
              <NumberText>{employeeNowOff?.length ?? 0}</NumberText>
            </Row>

            {employeeNowOff && <GreyLine />}
            {employeeNowOff?.map((data, index) => (
              <EmployeeListBox key={index} hasEmployeeNow={employeeNowOff}>
                <EmployeeListCard
                  key={index}
                  EMP_NAME={data?.EMP_NAME}
                  IS_MANAGER={data?.IS_MANAGER == 0 ? '직원' : MANAGER_CALLED}
                  image={
                    data?.images.length == 0 ? '3.png' : data?.images[0].IMAGE
                  }
                  data={data}
                  mobileNo={data?.MobileNo}
                  START={data?.START}
                  END={data?.END}
                />
              </EmployeeListBox>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
