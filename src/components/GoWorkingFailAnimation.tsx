import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

import styleGuide from '~/constants/styleGuide';

const BigText = styled.Text`
  color: #000;
  font-size: 24px;
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
  padding: 40px 20px;
  padding-bottom: 60px;
  width: 300px;
  justify-content: center;
  align-items: center;
`;

const Touchable = styled(Ripple)`
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 20px;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
`;

const TextBox = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

export default ({
  STORE_NAME,
  MEMBER_NAME,
  setFailModalOpen,
  actionTYPE,
  errorMessage,
}) => {
  return (
    <View>
      <TextBox>
        <BigText style={{textAlign: 'center', marginBottom: 5}}>
          {MEMBER_NAME}님, {STORE_NAME}점에&nbsp;
          {actionTYPE}을 진행 할 수 없습니다.
        </BigText>
        <BigText
          style={{
            color: 'red',
            fontWeight: '600',
            marginBottom: 5,
          }}>
          {errorMessage}
        </BigText>
        <Text>현재시간 {moment().format('kk:mm')} 입니다.</Text>
      </TextBox>
      <WhiteSpace />
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
  );
};
