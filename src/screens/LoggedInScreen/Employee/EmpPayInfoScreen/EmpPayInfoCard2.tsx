import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const Container = styled.View`
  height: 150px;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: #7f7f7f;
  margin-top: 20px;
`;

const Box = styled.View`
  margin-top: 10px;
  width: 300px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Line = styled(Box)`
  margin-top: 10px;
  border-width: 0.5px;
  border-color: #7f7f7f;
`;

const Text = styled.Text`
  color: #7f7f7f;
  font-size: 10px;
`;

const DateTextArea = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Title = styled(Text)`
  font-size: 16px;
`;

const DateText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #7f7f7f;
`;

export default ({day, yoil, total}) => {
  return (
    <Container>
      <DateTextArea>
        <DateText>{moment(day).format('YYYY년 M월 D일')}</DateText>
        <DateText style={{fontSize: 12, fontWeight: '300'}}>
          {yoil}요일
        </DateText>
      </DateTextArea>
      <Line />
      <Box>
        <Title>합계</Title>
        <Title>{total} 원</Title>
      </Box>
    </Container>
  );
};
