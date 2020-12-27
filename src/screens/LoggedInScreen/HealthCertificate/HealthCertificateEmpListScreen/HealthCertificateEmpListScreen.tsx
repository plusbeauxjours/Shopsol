import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import HealthCertificateEmpListCard from './HealthCertificateEmpListCard';
import {getSTORE_HEALTH_EMP_LIST} from '~/redux/healthSlice';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Container = styled.View`
  padding: 20px;
`;

const Box = styled.View`
  margin-bottom: 20px;
`;

const GreyText = styled.Text`
  color: #aaa;
  font-size: 16px;
`;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {STORE} = useSelector((state: any) => state.userReducer);
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
          {HEALTH_EMP_LIST && HEALTH_EMP_LIST.length !== 0 ? (
            HEALTH_EMP_LIST?.map((data: any, index) => (
              <HealthCertificateEmpListCard
                key={index}
                data={data}
                gotoHealthCertificateEmpDetail={gotoHealthCertificateEmpDetail}
                gotoHealthCertificateEmpForm={gotoHealthCertificateEmpForm}
              />
            ))
          ) : (
            <Box>
              <GreyText>근무중인 직원이 없습니다</GreyText>
            </Box>
          )}
        </Container>
      </ScrollView>
    </BackGround>
  );
};
