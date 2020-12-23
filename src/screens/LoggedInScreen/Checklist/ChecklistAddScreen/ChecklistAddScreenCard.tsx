import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {CloseCircleIcon} from '~/constants/Icons';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-right: 15px;
  margin-bottom: 5px;
`;

const Text = styled.Text``;

const CloseIconContainer = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #aaa;
  border-width: 2px;
  border-color: white;
  z-index: 30;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0px;
  right: -10px;
`;

export default ({name, image}) => {
  return (
    <Container>
      <CloseIconContainer>
        <CloseCircleIcon />
      </CloseIconContainer>
      <FastImage
        style={{width: 60, height: 60, borderRadius: 30}}
        source={{
          uri: `http://133.186.210.223/uploads/${image}`,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text>{name}</Text>
    </Container>
  );
};
