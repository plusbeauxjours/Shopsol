import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;
`;
const Text = styled.Text``;

export default ({name, image}) => {
  return (
    <Container>
      <FastImage
        style={{width: 60, height: 60, borderRadius: 30}}
        source={{
          uri: 'http://133.186.210.223/uploads/' + image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text>{name}</Text>
    </Container>
  );
};
