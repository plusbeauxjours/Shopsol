import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

const BigText = styled.Text`
  color: #000;
  font-size: 32px;
`;
const Text = styled.Text`
  color: #000;
  font-size: ${styleGuide.fontSize.large}px;
`;

const View = styled.View`
  z-index: 10;
  background-color: white;
  border-radius: 20px;
  width: 300px;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Touchable = styled(Ripple)`
  width: 80%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 20px;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
`;

const TextBox = styled.View`
  padding: 0 10px;
  margin-top: 70px;
  align-items: center;
`;

export default ({
  GENDER,
  STORE_NAME,
  MEMBER_NAME,
  setSucessModalOpen,
  actionTYPE,
}) => {
  return (
    <>
      <FastImage
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          position: 'relative',
          top: 60,
          zIndex: 15,
        }}
        source={{uri: utils.avatarUrl(GENDER)}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <LottieView
        style={{
          width: wp('100%'),
          zIndex: 1,
          position: 'absolute',
        }}
        source={require('../assets/animations/goWorkingSuccess.json')}
        loop={true}
        autoPlay
      />
      <View>
        <TextBox>
          <BigText style={{textAlign: 'center'}}>
            {MEMBER_NAME}님, {STORE_NAME}점에
          </BigText>
          <BigText style={{textAlign: 'center'}}>
            무사히 {actionTYPE}하였습니다.
          </BigText>
          <Text>현재시간 {moment().format('kk:mm')} 입니다.</Text>
        </TextBox>
        <Touchable
          onPress={() => setSucessModalOpen(false)}
          rippleColor={'#e39a9c'}
          rippleDuration={600}
          rippleSize={1200}
          rippleContainerBorderRadius={30}
          rippleOpacity={0.45}>
          <Text style={{color: styleGuide.palette.primary}}>확인</Text>
        </Touchable>
      </View>
    </>
  );
};
