import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import api from '~/constants/LoggedInApi';
import MyPagePlaceSetCard from './MyPagePlaceSetCard';
import {setCLOSED_STORE_DATA} from '~/redux/mypageSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const EmptyBox = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const EmptyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const TextBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

const ScrollView = styled.ScrollView``;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {CLOSED_STORE_DATA} = useSelector((state: any) => state.mypageReducer);

  const fetchData = async () => {
    if (STORE == 1) {
      try {
        if (!CLOSED_STORE_DATA) {
          dispatch(setSplashVisible({visible: true}));
        }
        const {data} = await api.closeList(MEMBER_SEQ);
        if (data.message === 'SUCCESS') {
          dispatch(setCLOSED_STORE_DATA(data.result));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    } else {
      try {
        if (!CLOSED_STORE_DATA) {
          dispatch(setSplashVisible({visible: true}));
        }
        const {data} = await api.endList(MEMBER_SEQ);
        if (data.message === 'SUCCESS') {
          dispatch(setCLOSED_STORE_DATA(data.result));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    }
  };

  useEffect(() => {
    fetchData();
    STORE == '1'
      ? navigation.setOptions({headerTitle: '폐업 사업장 목록'})
      : navigation.setOptions({headerTitle: '종료 사업장 목록'});
  }, []);

  return (
    <BackGround>
      <ScrollView
        contentContainerStyle={{
          width: wp('100%'),
          alignItems: 'center',
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}>
        {CLOSED_STORE_DATA?.length === 0 && (
          <EmptyBox>
            <FastImage
              style={{
                width: 201,
                marginVertical: 20,
                height: 284,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}
              source={require('../../../../assets/images/emptyImg.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TextBox>
              <EmptyText>
                {STORE == '1' ? '폐업 사업장' : '종료 사업장'}이 없습니다
              </EmptyText>
            </TextBox>
          </EmptyBox>
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
