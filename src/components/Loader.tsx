import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  position: absolute;
  bottom: 30px;
  color: white;
`;

export default () => {
  const {text} = useSelector((state: any) => state.splashReducer);
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
      {text.length > 0 && (
        <>
          <Text>{text} 정보를 불러오는 중입니다.</Text>
          <Text style={{bottom: 10}}> 잠시만 기다려주세요.</Text>
        </>
      )}
    </Container>
  );
};
