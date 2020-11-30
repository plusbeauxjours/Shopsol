import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const maxWidth = wp('100%') - 90;

const BoxContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${wp('100%') - 90}px;
`;

const MainBox = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;
const TextBox = styled.View`
  flex-direction: row;
  left: -15px;
  align-items: center;
  width: ${wp('100%') - 60}px;
  justify-content: space-between;
`;
const Box = styled.View``;
const Text = styled.Text`
  width: 30px;
  font-size: 10px;
  color: #7f7f7f;
  text-align: center;
  margin-bottom: 5px;
`;

const GreyLine = styled.View`
  background-color: #ccc;
  width: 0.5;
  height: 100%;
`;

export default () => {
  const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;
  return (
    <BoxContainer>
      <TextBox>
        {[0, 6, 12, 18, 24].map((i, index) => {
          return <Text>{i}시</Text>;
        })}
      </TextBox>
      <MainBox>
        {[0, 0.25, 0.5, 0.75, 1].map((i, index) => {
          return <GreyLine offset={i} />;
        })}
      </MainBox>
    </BoxContainer>
  );
};
