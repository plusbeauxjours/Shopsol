import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export default () => {
  return (
    <Container>
      <LottieView
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/animations/loader.json')}
        loop
        autoPlay
      />
    </Container>
  );
};
