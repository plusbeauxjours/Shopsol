import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 10px;
  border-width: 1px;
  border-color: #ddd;
  background-color: white;
`;

const Memo = styled.View`
  margin-top: 10px;
  padding-top: 5px;
  border-top-width: 0.6px;
  border-color: #aaa;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MemoText = styled.Text``;

const NameText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const DateText = styled.Text`
  color: #aaa;
`;

export default ({NAME, DATE, MEMO}) => (
  <Container>
    <Row>
      <NameText>{NAME}</NameText>
      <DateText>
        {DATE.slice(0, 4)}년 {DATE.slice(5, 7)}월 {DATE.slice(8, 10)}일
      </DateText>
    </Row>
    {MEMO && MEMO !== '' ? (
      <Memo>
        <MemoText>{MEMO}</MemoText>
      </Memo>
    ) : null}
  </Container>
);
