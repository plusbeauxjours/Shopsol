import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import styleGuide from '~/constants/styleGuide';

const Container = styled.View`
  height: 150px;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: ${styleGuide.palette.greyColor};
  margin-top: 20px;
`;

const Box = styled.View`
  margin-top: 10px;
  width: 260px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Line = styled(Box)`
  margin-top: 10px;
  border-width: 0.5px;
  border-color: ${styleGuide.palette.greyColor};
`;

const Text = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.small}px;
`;

const DateTextArea = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Title = styled(Text)`
  font-size: ${styleGuide.fontSize.large}px;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

export default ({day, yoil, total}) => {
  return (
    <Container>
      <DateTextArea>
        <DateText>{moment(day).format('YYYY년 M월 D일')}</DateText>
        <DateText
          style={{
            fontSize: styleGuide.fontSize.middle,
            fontWeight: styleGuide.fontWeight.normal,
          }}>
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
