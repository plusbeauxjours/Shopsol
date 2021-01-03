import React from 'react';
import styled from 'styled-components/native';
import HomeBtn from './HomeBtn';
import AddCalendarInfoBtn from './AddCalendarInfoBtn';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default () => (
  <Container>
    <AddCalendarInfoBtn />
    <HomeBtn />
  </Container>
);
