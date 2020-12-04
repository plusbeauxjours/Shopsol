import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export default ({size}) => {
  return (
    <Container>
      <LottieView
        style={{
          width: size == 'large' ? 200 : 80,
          height: size == 'large' ? 200 : 80,
        }}
        source={require('../assets/animations/loader.json')}
        loop
        autoPlay
      />
    </Container>
  );
};
