import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Linking, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {isIphoneX} from 'react-native-iphone-x-helper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import api from '~/constants/LoggedInApi';
import {setHelpCategory} from '~/redux/helpSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {ForwardIcon, CloseCircleOutlineIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

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
  font-size: ${styleGuide.fontSize.large}px;
`;

const AdviceText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
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
  background-color: white;
  border-color: #ddd;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {helpCategory} = useSelector((state: any) => state.helpReducer);

  const fetchData = async () => {
    try {
      if (!helpCategory) {
        dispatch(setSplashVisible({visible: true}));
      }
      const {data} = await api.help();
      dispatch(setHelpCategory(data.result));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible({visible: false}));
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
          <ForwardIcon color={'black'} />
        </KakaoBox>
        <AdviceBox
          onPress={() => {
            navigation.navigate('WebViewScreen', {
              uri:
                'https://www.notion.so/wesop/FAQ-d1ded15e0dfa4502ad0aaf40ba217601',
              text: '자주 묻는 질문을 불러오는 중입니다.',
              title: '자주 묻는 질문',
            });
          }}>
          <AdviceText>자주 묻는 질문</AdviceText>
          <ForwardIcon color={styleGuide.palette.greyColor} />
        </AdviceBox>
        <WhiteSpace />
      </ScrollView>
    </BackGround>
  );
};
