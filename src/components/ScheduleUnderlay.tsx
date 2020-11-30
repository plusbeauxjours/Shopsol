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

const GreyLine = styled.View`
  background-color: #ccc;
  width: 0.5;
  height: 100%;
`;

export default () => {
  return (
    <BoxContainer>
      <MainBox>
        {[0, 0.25, 0.5, 0.75, 1].map((i, index) => {
          return <GreyLine offset={i} />;
        })}
      </MainBox>
    </BoxContainer>
  );
};
