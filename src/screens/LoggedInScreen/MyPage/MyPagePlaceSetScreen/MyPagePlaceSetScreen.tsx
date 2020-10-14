import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';

import api from '~/constants/LoggedInApi';
import MyPagePlaceSetCard from './MyPagePlaceSetCard';
import {setCLOSED_STORE_DATA} from '~/redux/mypageSlice';
import {setSplashVisible} from '~/redux/splashSlice';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const BoxText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #999999;
`;

const Section = styled.View`
  z-index: 3;
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  margin: 20px 20px 0 20px;
  shadow-opacity: 0.55;
  shadow-radius: 5px;
  shadow-color: grey;
  shadow-offset: 5px 5px;
  elevation: 6;
`;

const ScrollView = styled.ScrollView``;

export default () => {
  const dispatch = useDispatch();
  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {CLOSED_STORE_DATA} = useSelector((state: any) => state.mypageReducer);

  const fetchData = async () => {
    if (STORE == 1) {
      try {
        if (!CLOSED_STORE_DATA) {
          dispatch(setSplashVisible(true));
        }
        const {data} = await api.closeList(MEMBER_SEQ);
        if (data.message === 'SUCCESS') {
          dispatch(setCLOSED_STORE_DATA(data.result));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        if (!CLOSED_STORE_DATA) {
          dispatch(setSplashVisible(true));
        }
        const {data} = await api.endList(MEMBER_SEQ);
        if (data.message === 'SUCCESS') {
          dispatch(setCLOSED_STORE_DATA(data.result));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackGround>
      <Section style={{alignItems: 'center'}}>
        <BoxText>
          {STORE == '1' ? '폐업 사업장 목록' : '종료 사업장 목록'}
        </BoxText>
      </Section>
      <ScrollView
        contentContainerStyle={{
          width: wp('100%'),
          alignItems: 'center',
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}>
        {CLOSED_STORE_DATA?.length === 0 && (
          <BoxText style={{marginTop: 30}}>
            {STORE == '1' ? '폐업 사업장' : '종료 사업장'}이 없습니다
          </BoxText>
        )}
        {CLOSED_STORE_DATA?.map((data: any, index) => (
          <MyPagePlaceSetCard
            key={index}
            name={data.NAME}
            addr={data.ADDR1 + data.ADDR2}
          />
        ))}
      </ScrollView>
    </BackGround>
  );
};
