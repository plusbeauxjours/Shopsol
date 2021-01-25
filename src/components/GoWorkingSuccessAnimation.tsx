import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import styleGuide from '~/constants/styleGuide';

const BigText = styled.Text`
  color: #000;
  font-size: 24px;
  text-align: center;
`;
const Text = styled.Text`
  color: #000;
  font-size: ${styleGuide.fontSize.large}px;
`;

const View = styled.View`
  z-index: 10;
  background-color: white;
  border-radius: 20px;
  width: 280px;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Touchable = styled(Ripple)`
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 20px;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
`;

const WhiteSpace = styled.View`
  height: 15px;
`;

const TextBox = styled.View`
  padding: 0 10px;
  align-items: center;
`;

export default ({
  AVATAR,
  STORE_NAME,
  MEMBER_NAME,
  setSucessModalOpen,
  workingModalOpen,
  setQrCameraModalOpen1,
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
        source={{
          uri: `http://133.186.210.223/uploads/${AVATAR}`,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
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
          <BigText>{MEMBER_NAME}님, </BigText>
          <BigText>{STORE_NAME}점에</BigText>
          <BigText>무사히 {actionTYPE}하였습니다.</BigText>
          <WhiteSpace />
          <Text>현재시간 {moment().format('kk:mm')} 입니다.</Text>
        </TextBox>
        <Touchable
          onPress={() => {
            setSucessModalOpen(false);
            workingModalOpen(false);
            setQrCameraModalOpen1(false);
          }}
          rippleColor={styleGuide.palette.rippleColor}
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
