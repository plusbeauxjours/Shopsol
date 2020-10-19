import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = styled.View`
  height: ${hp('15%')}px;
  width: ${wp('80%')}px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${hp('3%')}px;
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

const Text = styled.Text`
  color: #707070;
  font-size: 17px;
`;

export default ({day, yoil, total}) => {
  return (
    <Container>
      <DayText>
        {day}-{yoil}
      </DayText>
      <Line />
      <Box>
        <Text>합계</Text>
        <Text>{total} 원</Text>
      </Box>
    </Container>
  );
};
