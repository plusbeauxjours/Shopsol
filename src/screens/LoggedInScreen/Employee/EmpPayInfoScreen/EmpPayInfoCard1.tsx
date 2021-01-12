import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styleGuide from '~/constants/styleGuide';

interface IsRight {
  isRight?: boolean;
}
const Container = styled.View`
  height: 300px;
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

const Text = styled.Text<IsRight>`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.small}px;
  width: ${(props) => (props.isRight ? wp('25%') : wp('35%'))};
  text-align: ${(props) => (props.isRight ? 'right' : 'left')};
`;

const Title = styled(Text)<IsRight>`
  font-size: ${styleGuide.fontSize.large}px;
`;

const DateTextArea = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

export default ({
  key,
  day,
  yoil,
  base,
  night,
  over,
  holi,
  late,
  total,
  rest_payment,
}) => {
  const numberComma = (num) => {
    let result = num;
    if (isNaN(num)) {
      result = Number(num);
    }
    let resultArray = result.toString().split('.');
    resultArray[0] = resultArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return resultArray.join('.');
  };

  return (
    <Container>
      <DateTextArea>
        <DateText>{moment(day).format('YYYY년 M월 D일')}</DateText>
        <DateText
          style={{
            fontSize: styleGuide.fontSize.middle,
            fontWeight: '300',
          }}>
          {yoil}요일
        </DateText>
      </DateTextArea>
      <Box>
        <Title isRight={false}>기본급여</Title>
        <Title isRight={true}>{numberComma(base + rest_payment)} 원</Title>
      </Box>
      <Box>
        <Text isRight={false}>야간근로 수당</Text>
        <Text isRight={true}>{numberComma(night)} 원</Text>
      </Box>
      <Box>
        <Text isRight={false}>초과근로 수당</Text>
        <Text isRight={true}>{numberComma(over)} 원</Text>
      </Box>
      <Box>
        <Text isRight={false}>휴일근로 수당</Text>
        <Text isRight={true}>{numberComma(holi)} 원</Text>
      </Box>
      <Box>
        <Text isRight={false}>휴게시간 차감</Text>
        <Text isRight={true}>(-){numberComma(rest_payment)} 원</Text>
      </Box>
      <Box>
        <Text isRight={false}>지각조퇴결근 차감</Text>
        <Text isRight={true}>(-){numberComma(late)} 원</Text>
      </Box>
      <Line />
      <Box>
        <Title isRight={false}>합계</Title>
        <Title isRight={true}>{numberComma(total)} 원</Title>
      </Box>
    </Container>
  );
};
