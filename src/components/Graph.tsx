import React, {useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Underlay from './Underlay';
import moment from 'moment';
import {PlayCircleOutlineIcon, StopCircleOutlineIcon} from '~/constants/Icons';

interface IColumn {
  index?: number;
  isSelected?: boolean;
  height?: number;
}
const data = [
  {
    date: '2020-01-01',
    value: 32400000,
  },
  {
    date: '2020-01-02',
    value: 22400000,
  },
  {
    date: '2020-01-03',
    value: 12400000,
  },
  {
    date: '2020-01-04',
    value: 132400000,
  },
  {
    date: '2020-01-05',
    value: 22400000,
  },
  {
    date: '2020-01-06',
    value: 82400000,
  },
  {
    date: '2020-01-07',
    value: 132400000,
  },
];

const width = wp('100%') - 100;
const height = 200;
const step = width / data.length;

const View = styled.View<IColumn>`
  width: ${step}px;
  bottom: -20px;
  position: absolute;
  left: ${(props) => props.index * step}px;
  align-items: center;
`;

const Box = styled.View`
  height: 200px;
  width: ${width}px;
  margin-bottom: 30px;
`;

const Text = styled.Text`
  color: #7f7f7f;
`;

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

const Top = styled.View<IColumn>`
  position: absolute;
  top: 0;
  height: 28px;
  left: ${step / 4}px;
  right: ${step / 4}px;
  width: 20px;
  background-color: #e85356;
  border-radius: 20px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.2)};
`;

const ColumnContainer = styled.TouchableOpacity<IColumn>`
  position: absolute;
  left: ${(props) => props.index * step}px;
  bottom: 0;
  width: ${step}px;
  height: ${(props) => props.height}px;
  overflow: hidden;
`;

const InformationBox = styled.View`
  width: ${wp('100%') - 100}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 140px;
`;

const SmallTextRound = styled.View`
  border-radius: 15px;
  border-width: 0.5px;
  border-color: #7f7f7f;
  padding: 5px;
  margin-right: 5px;
`;
const SmallText = styled.Text`
  font-size: 9px;
  color: #7f7f7f;
`;
export default ({data}) => {
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
  const values = Object.values(data.WORKING)?.map((p) => p[0]);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;
  console.log(data);
  const [selectedIndex, setSelectedIndex] = useState<string>(
    (moment().isoWeekday() - 1).toString(),
  );
  return (
    <>
      <Box>
        <Underlay minY={minY} maxY={maxY} />
        {values?.map((item, index) => {
          return (
            <ColumnContainer
              key={index}
              index={index}
              isSelected={selectedIndex == index.toString()}
              onPress={() => setSelectedIndex(index.toString())}
              height={lerp(0, height, item / maxY)}
              activeOpacity={1}>
              <Column />
              <Top isSelected={selectedIndex == index.toString()} />
            </ColumnContainer>
          );
        })}
        {weekDays.map((day, index) => {
          return (
            <View key={index} index={index}>
              <Text>{day}</Text>
            </View>
          );
        })}
      </Box>
      <InformationBox>
        <Row>
          <IconContainer>
            <PlayCircleOutlineIcon />
            <Text style={{marginLeft: 5}}>
              시작시간&nbsp;
              {moment(data.WORKING[selectedIndex][1], 'kk:mm').format(
                'k시 m분',
              )}
            </Text>
          </IconContainer>
          <IconContainer>
            <StopCircleOutlineIcon />
            <Text style={{marginLeft: 5}}>
              종료시간&nbsp;
              {moment(data.WORKING[selectedIndex][2], 'kk:mm').format(
                'k시 m분',
              )}
            </Text>
          </IconContainer>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          {data.WORKING[selectedIndex][0] != 0 && (
            <SmallTextRound>
              <SmallText>
                근무시간:&nbsp;
                {moment.duration(data.WORKING[selectedIndex][0]).hours() > 0 &&
                  `${moment
                    .duration(data.WORKING[selectedIndex][0])
                    .hours()}시간`}
                &nbsp;
                {moment.duration(data.WORKING[selectedIndex][0]).minutes() >
                  0 &&
                  `${moment
                    .duration(data.WORKING[selectedIndex][0])
                    .minutes()}분`}
              </SmallText>
            </SmallTextRound>
          )}
          {data.REST_TIME !== '0' && (
            <SmallTextRound>
              <SmallText>휴게시간: {data.REST_TIME}분</SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][4] && (
            <SmallTextRound>
              <SmallText>지각</SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][5] && (
            <SmallTextRound>
              <SmallText>조퇴</SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][4] && (
            <SmallTextRound>
              <SmallText>결근</SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][3] && (
            <SmallTextRound>
              <SmallText>휴가</SmallText>
            </SmallTextRound>
          )}
        </Row>
      </InformationBox>
    </>
  );
};
