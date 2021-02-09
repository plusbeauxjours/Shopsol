import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

import styleGuide from '~/constants/styleGuide';
import FastImage from 'react-native-fast-image';
import utils from '~/constants/utils';

const BigText = styled.Text`
  color: #000;
  font-size: 24px;
  text-align: center;
`;

const Text = styled.Text`
  text-align: center;
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
  align-items: center;
  margin-bottom: 30px;
`;

export default ({
  AVATAR,
  STORE_NAME,
  MEMBER_NAME,
  setFailModalOpen,
  actionTYPE,
  errorMessage,
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
          uri: utils.getUriImage(AVATAR),
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View>
        <TextBox>
          <BigText>{MEMBER_NAME}님,</BigText>
          <BigText> {STORE_NAME}점에</BigText>
          <BigText> {actionTYPE}을 진행할 수 없습니다.</BigText>
          <BigText
            style={{
              fontSize: 14,
              color: 'red',
              fontWeight: '600',
            }}>
            {errorMessage}
          </BigText>
          <WhiteSpace />
          <Text>현재시간 {moment().format('kk:mm')} 입니다.</Text>
        </TextBox>
        <Touchable
          onPress={() => setFailModalOpen(false)}
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
