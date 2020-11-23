import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

interface IColumn {
  index: number;
  height: number;
}
const data = [
  {
    date: '2020-01-01',
    value: 32400000,
    color: 'grey',
  },
  {
    date: '2020-01-02',
    value: 22400000,
    color: 'grey',
  },
  {
    date: '2020-01-03',
    value: 12400000,
    color: 'grey',
  },
  {
    date: '2020-01-04',
    value: 132400000,
    color: 'grey',
  },
  {
    date: '2020-01-05',
    value: 22400000,
    color: 'grey',
  },
  {
    date: '2020-01-06',
    value: 82400000,
    color: 'grey',
  },
  {
    date: '2020-01-07',
    value: 132400000,
    color: 'grey',
  },
];

const width = wp('100%') - 100;
const height = 200;
const step = width / data.length;

const Box = styled.View`
  height: 200px;
  width: ${width}px;
  overflow: hidden;
`;
const View = styled.View``;
const Text = styled.Text``;

const Column = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${step / 4}px;
  right: ${step / 4}px;
  opacity: 0.1;
  width: 20px;
  background-color: #e85356;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const Top = styled.View`
  position: absolute;
  top: 0;
  height: 28px;
  left: ${step / 4}px;
  right: ${step / 4}px;
  width: 20px;
  background-color: #e85356;
  border-radius: 20px;
`;

const ColumnContainer = styled.TouchableOpacity<IColumn>`
  position: absolute;
  left: ${(props) => props.index * step}px;
  bottom: 0;
  width: ${step};
  height: ${(props) => props.height};
`;

// export default ({data}) => {
export default () => {
  const values = data.map((p) => p.value);
  const maxY = Math.max(...values);
  const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;
  return (
    <Box>
      {data.map((point, index) => {
        return (
          <ColumnContainer
            key={index}
            index={index}
            onPress={() => console.log('ColumnContainer')}
            height={lerp(0, height, point.value / maxY)}>
            <Column />
            <Top />
          </ColumnContainer>
        );
      })}
    </Box>
  );
};
