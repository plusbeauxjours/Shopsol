import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';

import PaymentInfoScreenCard from './PaymentInfoScreenCard';
import {
  ForwardIcon,
  BackIcon,
  ReloadCircleIcon,
  HelpCircleIcon,
} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
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
  padding: 20px 0;
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
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.secondary};
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #7f7f7f;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
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
  background-color: #${styleGuide.palette.borderColor};
`;

const EmployeeListBox = styled.View`
  width: 100%;
  align-items: center;
  border-radius: 20px;
  border-color: #${styleGuide.palette.borderColor};
  background-color: white;
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
  loading,
  startDate,
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
                <BackIcon size={22} color={styleGuide.palette.secondary} />
              </DateArrow>
              <DateTextArea>
                <DateText>{moment(startDate).format('YYYY년 M월')}</DateText>
                <DateText style={{fontSize: 12, fontWeight: '300'}}>
                  ({moment(startDate).format('M월 D일')}
                  &nbsp;~&nbsp;
                  {moment(startDate)
                    .add(1, 'months')
                    .subtract(1, 'days')
                    .format('M월 D일')}
                  )
                </DateText>
              </DateTextArea>
              <DateArrow style={{marginRight: 5}} onPress={() => onRefresh()}>
                <ReloadCircleIcon
                  size={18}
                  color={styleGuide.palette.secondary}
                />
              </DateArrow>
              <DateArrow onPress={() => nextpay()}>
                <ForwardIcon size={22} color={styleGuide.palette.secondary} />
              </DateArrow>
            </DateBox>
            <Line />
            {loading ? (
              <PayBox>
                <ActivityIndicator size="small" />
              </PayBox>
            ) : (
              <PayBox>
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
                    {TOTAL_PAYMENT_WORKING_EMP?.STACKEDPAY}
                  </BoxTitleText3>
                </Pay>
                <Pay>
                  <BoxTitleText3>누적급여</BoxTitleText3>
                  <BoxTitleText3>
                    {TOTAL_PAYMENT_WORKING_EMP?.TOTALPAY}
                  </BoxTitleText3>
                </Pay>
                <Pay>
                  <BoxTitleText3>주휴수당</BoxTitleText3>
                  <BoxTitleText3>
                    {TOTAL_PAYMENT_WORKING_EMP?.WEEKPAY}
                  </BoxTitleText3>
                </Pay>
              </PayBox>
            )}
          </Section>
          {TOTAL_PAYMENT_WORKING_EMP && (
            <Section>
              <EmployeeListBox>
                {TOTAL_PAYMENT_WORKING_EMP?.emps?.map((data) => (
                  <PaymentInfoScreenCard
                    key={data.MEMBER_SEQ}
                    name={data.EMP_NAME}
                    isManager={data.IS_MANAGER == 0 ? '스태프' : '매니저'}
                    image={data.IMAGE}
                    data={data}
                    STORE={STORE}
                    STORE_SEQ={STORE_SEQ}
                    STOREPAY_SHOW={STOREPAY_SHOW}
                  />
                ))}
              </EmployeeListBox>
            </Section>
          )}
        </Container>
      </ScrollView>
    </BackGround>
  );
};
