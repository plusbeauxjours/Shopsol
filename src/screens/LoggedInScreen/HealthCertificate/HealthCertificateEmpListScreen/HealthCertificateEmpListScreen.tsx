import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import HealthCertificateEmpListCard from './HealthCertificateEmpListCard';
import {getSTORE_HEALTH_EMP_LIST} from '~/redux/healthSlice';
import styleGuide from '~/constants/styleGuide';

interface IEmployeeListBox {
  hasEmployeeNow?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

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
  font-size: 16px;
  color: #999;
  font-weight: bold;
`;

const NumberText = styled.Text`
  color: ${styleGuide.palette.primary};
  font-size: 18px;
  font-weight: bold;
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 10px 0 20px 0;
  background-color: #${styleGuide.palette.borderColor};
  height: 1px;
`;

const EmployeeListBox = styled.View<IEmployeeListBox>`
  width: 100%;
  align-items: center;
  border-radius: 20px;
  border-color: #${styleGuide.palette.borderColor};
  background-color: white;
`;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {HEALTH_EMP_LIST} = useSelector((state: any) => state.healthReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await dispatch(getSTORE_HEALTH_EMP_LIST());
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const gotoHealthCertificateEmpDetail = (data) => {
    navigation.navigate('HealthCertificateEmpDetailScreen', {data});
  };

  const gotoHealthCertificateEmpForm = (NAME, EMP_SEQ, RESULT_COUNT) => {
    navigation.navigate('HealthCertificateEmpFormScreen', {
      NAME,
      EMP_SEQ,
      RESULT_COUNT,
    });
  };

  useEffect(() => {
    dispatch(getSTORE_HEALTH_EMP_LIST());
  }, []);

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <Section>
            <Row>
              <TitleText>보건증 등록 직원</TitleText>
              <NumberText>
                {HEALTH_EMP_LIST?.filter((i) => i.RESULT_DATE)?.length ?? 0}
              </NumberText>
            </Row>
            {HEALTH_EMP_LIST?.filter((i) => i.RESULT_DATE)?.length != 0 && (
              <GreyLine />
            )}
            <EmployeeListBox
              hasEmployeeNow={HEALTH_EMP_LIST?.filter((i) => i.RESULT_DATE)}>
              {HEALTH_EMP_LIST &&
                HEALTH_EMP_LIST.length !== 0 &&
                HEALTH_EMP_LIST?.filter(
                  (i) => i.RESULT_DATE,
                )?.map((data: any, index) => (
                  <HealthCertificateEmpListCard
                    key={index}
                    data={data}
                    gotoHealthCertificateEmpDetail={
                      gotoHealthCertificateEmpDetail
                    }
                    gotoHealthCertificateEmpForm={gotoHealthCertificateEmpForm}
                  />
                ))}
            </EmployeeListBox>
          </Section>
          <Section>
            <Row>
              <TitleText>보건증 미등록 직원</TitleText>
              <NumberText>
                {HEALTH_EMP_LIST?.filter((i) => !i.RESULT_DATE)?.length ?? 0}
              </NumberText>
            </Row>
            {HEALTH_EMP_LIST?.filter((i) => !i.RESULT_DATE)?.length != 0 && (
              <GreyLine />
            )}
            {HEALTH_EMP_LIST &&
              HEALTH_EMP_LIST.length !== 0 &&
              HEALTH_EMP_LIST?.filter((i) => !i.RESULT_DATE)?.map(
                (data: any, index) => (
                  <EmployeeListBox
                    hasEmployeeNow={HEALTH_EMP_LIST?.filter(
                      (i) => !i.RESULT_DATE,
                    )}>
                    <HealthCertificateEmpListCard
                      key={index}
                      data={data}
                      gotoHealthCertificateEmpDetail={
                        gotoHealthCertificateEmpDetail
                      }
                      gotoHealthCertificateEmpForm={
                        gotoHealthCertificateEmpForm
                      }
                    />
                  </EmployeeListBox>
                ),
              )}
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
