import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

import styleGuide from '~/constants/styleGuide';

interface IIsBefore {
  isBefore: boolean;
}

const SubmitButton = styled(Ripple)<IIsBefore>`
  width: ${wp('100%') - 40};
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
`;

const NoSubmitButton = styled(SubmitButton)`
  background-color: #cccccc;
`;

const WhiteText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
`;

export default ({onPressIn = null, text, onPress = null, isRegisted}) => {
  if (isRegisted) {
    return (
      <SubmitButton
        onPressIn={onPressIn}
        onPress={onPress}
        rippleColor={'#499c9b'}
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
        rippleColor={'white'}
        rippleDuration={600}
        rippleSize={1200}
        rippleOpacity={0.25}>
        <WhiteText>{text}</WhiteText>
      </NoSubmitButton>
    );
  }
};
