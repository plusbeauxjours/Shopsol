import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Linking, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import {setHelpCategory} from '~/redux/helpSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {ForwardIcon} from '~/constants/Icons';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const KakaoText = styled.Text`
  font-size: 16px;
`;

const AdviceText = styled.Text`
  font-size: 16px;
  color: #642a8c;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const KakaoBox = styled.TouchableOpacity`
  flex-direction: row;
  height: 70px;
  margin-top: 20px;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #ffde00;
`;

const AdviceBox = styled(KakaoBox)`
  border-width: 1px;
  background-color: #fff;
  border-color: #ddd;
`;

export default () => {
  const dispatch = useDispatch();
  const {helpCategory} = useSelector((state: any) => state.helpReducer);

  const fetchData = async () => {
    try {
      if (!helpCategory) {
        dispatch(setSplashVisible(true));
      }
      const {data} = await api.help();
      dispatch(setHelpCategory(data.result));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KakaoBox
          onPress={() => Linking.openURL('http://pf.kakao.com/_tAUxlj/chat')}>
          <Row>
            <Image
              source={require('../../../../assets/images/kakaoBtn.png')}
              style={{marginRight: 5}}
            />
            <KakaoText>카카오톡 문의</KakaoText>
          </Row>
          <ForwardIcon size={22} color={'#000'} />
        </KakaoBox>
        {helpCategory?.map((data: any, index) => (
          <AdviceBox
            key={index}
            onPress={() => {
              Linking.openURL(data?.URL);
            }}>
            <AdviceText>{data?.TITLE}</AdviceText>
            <ForwardIcon size={22} color={'#bbb'} />
          </AdviceBox>
        ))}
        <WhiteSpace />
      </ScrollView>
    </BackGround>
  );
};
