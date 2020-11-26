import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = styled.View`
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
  background-color: 'rgba(52, 52, 52, 0.8)';
  flex: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export default ({size = 'large'}) => {
  return (
    <Container>
      <LottieView
        style={{
          width: size == 'large' ? 200 : 120,
          height: size == 'large' ? 200 : 120,
        }}
        source={require('../assets/animations/loader.json')}
        loop
        autoPlay
      />
    </Container>
  );
};
