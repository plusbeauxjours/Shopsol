import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {CloseCircleIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const Text = styled.Text``;

const CloseIconContainer = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${styleGuide.palette.greyColor};
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
