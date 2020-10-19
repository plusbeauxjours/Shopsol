import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface IsRight {
  isRight: boolean;
}
const Container = styled.View`
  height: ${hp('40%')}px;
  width: ${wp('80%')}px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const DayText = styled.Text`
  color: #707070;
  font-size: 15px;
`;

const Box = styled.View`
  margin-top: 10px;
  width: ${wp('60%')}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Line = styled(Box)`
  margin-top: 10px;
  border-width: 1px;
  border-color: #707070;
`;

const Text = styled.Text<IsRight>`
  color: #707070;
  font-size: 14px;
  width: ${(props) => (props.isRight ? wp('25%') : wp('35%'))};
  text-align: ${(props) => (props.isRight ? 'right' : 'left')};
`;

const Title = styled(Text)<IsRight>`
  font-size: 17px;
`;

export default ({key, day, yoil, base, night, over, holi, late, total}) => {
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
      <DayText>
        {day.split('-').join('.')} {yoil}요일
      </DayText>
      <Box>
        <Title isRight={false}>기본급여</Title>
        <Title isRight={true}>{numberComma(base)} 원</Title>
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
        <Text isRight={false}>지각조퇴결근 차감</Text>
        <Text isRight={true}>(-){numberComma(late)} 원</Text>
      </Box>
      <Line />
      <Box>
        <Text isRight={false}>합계</Text>
        <Text isRight={true}>{numberComma(total)} 원</Text>
      </Box>
    </Container>
  );
};
