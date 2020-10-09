import React from 'react';
import styled from 'styled-components/native';
import HomeBtn from './HomeBtn';
import ShelfLifeCheckBtn from './ShelfLifeCheckBtn';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default () => (
  <Container>
    <ShelfLifeCheckBtn />
    <HomeBtn />
  </Container>
);
