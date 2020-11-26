import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import PaymentInfoScreenCard from './PaymentInfoScreenCard';

import {
  ForwardIcon,
  BackIcon,
  ReloadCircleIcon,
  HelpCircleIcon,
} from '~/constants/Icons';
import Loader from '~/components/Loader';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
  align-items: center;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 0 20px;
  align-items: center;
`;

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
  padding: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateBox = styled(Row)`
  padding: 20px 15px;
  height: 50px;
  flex: 1;
  margin-bottom: 20px;
`;

const DateArrow = styled.TouchableOpacity`
  width: ${wp('10%')};
  height: ${wp('10%')};
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const Date = styled.View`
  flex: 1;
  height: 20px;
  align-items: center;
`;

const DateText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const DateReload = styled.TouchableOpacity`
  margin-right: 5px;
  width: ${wp('10%')}px;
  height: ${wp('10%')}px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const PayBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const Line = styled.View`
  height: 1px;
  width: ${wp('80%')};
  margin-bottom: 10px;
  background-color: #f2f2f2;
`;

const EmployeeListBox = styled.View`
  margin: 20px 0;
`;

const Pay = styled.View`
  height: ${hp('4%')}px;
  width: ${wp('70%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitleText3 = styled.Text`
  font-size: 15px;
  color: #999999;
`;

export default ({
  onRefresh,
  nextpay,
  STORE,
  STORE_SEQ,
  STOREPAY_SHOW,
  backpay,
  TOTAL_PAYMENT_WORKING_EMP,
  explainModal,
  EMPLOYEE_LIST,
  loading,
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <DateBox>
              <DateArrow onPress={() => backpay()}>
                <BackIcon size={22} color={'black'} />
              </DateArrow>
              <Date>
                <DateText>
                  {TOTAL_PAYMENT_WORKING_EMP.start}
                  &nbsp;~&nbsp;
                  {TOTAL_PAYMENT_WORKING_EMP.end}
                </DateText>
              </Date>
              <DateReload onPress={() => onRefresh()}>
                <ReloadCircleIcon />
              </DateReload>
              <DateArrow onPress={() => nextpay()}>
                <ForwardIcon size={22} color={'black'} />
              </DateArrow>
            </DateBox>
            <Line />
            <PayBox>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Pay>
                    <Row>
                      <Touchable
                        onPress={() => {
                          explainModal(
                            '[ 예상급여 미포함 내역 ]',
                            '-자율출퇴근 급여\n-근무시간 수정(근무시간 연장시)\n-추가일정 급여\n\n*근무일정 삭제시 과거 예상급여는 차감됩니다',
                          );
                        }}>
                        <BoxTitleText3>예상급여</BoxTitleText3>
                        <HelpCircleIcon size={20} />
                      </Touchable>
                    </Row>
                    <BoxTitleText3>
                      {TOTAL_PAYMENT_WORKING_EMP.stackedpay}
                    </BoxTitleText3>
                  </Pay>
                  <Pay>
                    <BoxTitleText3>누적급여</BoxTitleText3>
                    <BoxTitleText3>
                      {TOTAL_PAYMENT_WORKING_EMP.total}
                    </BoxTitleText3>
                  </Pay>
                  <Pay>
                    <BoxTitleText3>주휴수당</BoxTitleText3>
                    <BoxTitleText3>
                      {TOTAL_PAYMENT_WORKING_EMP.weekpay}
                    </BoxTitleText3>
                  </Pay>
                </>
              )}
            </PayBox>
          </Section>
          <EmployeeListBox>
            {EMPLOYEE_LIST?.workinglist?.map((data) => (
              <PaymentInfoScreenCard
                key={data.MEMBER_SEQ}
                name={data.EMP_NAME}
                isManager={data.IS_MANAGER == 0 ? '스태프' : '매니저'}
                image={data.images.length == 0 ? '3.png' : data.images[0].IMAGE}
                data={data}
                STORE={STORE}
                STORE_SEQ={STORE_SEQ}
                STOREPAY_SHOW={STOREPAY_SHOW}
              />
            ))}
          </EmployeeListBox>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
