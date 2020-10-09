import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

interface IIsWhiteBack {
  isWhiteBack: boolean;
  isInSection: boolean;
}

const SubmitButton = styled(Ripple)<IIsWhiteBack>`
  margin-top: 30px;
  width: ${(props) => (props.isInSection ? wp('100%') - 80 : wp('100%') - 40)};
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: ${(props) =>
    props.isWhiteBack ? 'transparent' : '#642a8c'};
  border-width: ${(props) => (props.isWhiteBack ? '1' : '0')};
  border-color: ${(props) => (props.isWhiteBack ? '#642a8c' : 'transparent')};
`;

const NoSubmitButton = styled(SubmitButton)`
  background-color: ${(props) =>
    props.isWhiteBack ? 'transparent' : '#cccccc'};

  border-width: ${(props) => (props.isWhiteBack ? '1' : '0')};
  border-color: ${(props) => (props.isWhiteBack ? '#cccccc' : 'transparent')};
`;

const NoSubmitButtonText = styled.Text<IIsWhiteBack>`
  font-size: 16px;
  color: ${(props) => (props.isWhiteBack ? '#cccccc' : 'white')};
`;

const SubmitButtonText = styled.Text<IIsWhiteBack>`
  font-size: 16px;
  color: ${(props) => (props.isWhiteBack ? '#642a8c' : 'white')};
`;

export default ({
  isWhiteBack = true,
  isInSection = false,
  onPressIn = null,
  text,
  onPress = null,
  isRegisted,
}) => {
  if (isRegisted) {
    return (
      <SubmitButton
        isInSection={isInSection}
        isWhiteBack={isWhiteBack}
        onPressIn={onPressIn}
        onPress={onPress}
        rippleColor={'#ac52eb'}
        rippleDuration={600}
        rippleSize={1200}
        rippleContainerBorderRadius={30}
        rippleOpacity={isWhiteBack ? 0.1 : 0.45}>
        <SubmitButtonText isWhiteBack={isWhiteBack}>{text}</SubmitButtonText>
      </SubmitButton>
    );
  } else {
    return (
      <NoSubmitButton
        isInSection={isInSection}
        isWhiteBack={isWhiteBack}
        onPress={() => {}}
        rippleColor={'#666'}
        rippleDuration={600}
        rippleSize={1200}
        rippleContainerBorderRadius={30}
        rippleOpacity={0.1}>
        <NoSubmitButtonText isWhiteBack={isWhiteBack}>
          {text}
        </NoSubmitButtonText>
      </NoSubmitButton>
    );
  }
};
