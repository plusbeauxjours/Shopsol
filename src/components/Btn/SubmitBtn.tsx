import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

interface IIsBefore {
  isBefore: boolean;
}

const SubmitButton = styled(Ripple)<IIsBefore>`
  margin-top: 30px;
  width: ${wp('100%') - 40};
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

const NoSubmitButton = styled(SubmitButton)`
  background-color: #cccccc;
`;

const WhiteText = styled.Text`
  font-size: 16px;
  color: white;
`;

export default ({onPressIn = null, text, onPress = null, isRegisted}) => {
  if (isRegisted) {
    return (
      <SubmitButton
        onPressIn={onPressIn}
        onPress={onPress}
        rippleColor={'#e39a9c'}
        rippleDuration={600}
        rippleSize={1200}
        rippleOpacity={0.45}>
        <WhiteText>{text}</WhiteText>
      </SubmitButton>
    );
  } else {
    return (
      <NoSubmitButton
        onPress={() => {}}
        rippleColor={'#fff'}
        rippleDuration={600}
        rippleSize={1200}
        rippleOpacity={0.25}>
        <WhiteText>{text}</WhiteText>
      </NoSubmitButton>
    );
  }
};
