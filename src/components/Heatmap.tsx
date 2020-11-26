import React, {useState} from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';

import {PlayCircleOutlineIcon, StopCircleOutlineIcon} from '~/constants/Icons';

interface IActive {
  activeDays: any;
  index: number;
  isSelected: boolean;
}

const ToucahbleSize = wp('100%') * 0.1;

const HeatmapText = styled.Text<IActive>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) =>
    props.isSelected
      ? 'white'
      : props.activeDays?.indexOf(props.index) > -1
      ? 'white'
      : '#e85356'};
`;

const Text = styled.Text`
  color: #7f7f7f;
`;

const Touchable = styled(RNBounceable)<IActive>`
  margin-top: 8px;
  margin-left: ${(props) =>
    props.index == 0
      ? moment().startOf('month').weekday() * (ToucahbleSize + 5)
      : 0}px;
  margin-right: 5px;
  background-color: ${(props) =>
    props.isSelected
      ? 'rgba(232,83,86, 1)'
      : props.activeDays?.indexOf(props.index) > -1
      ? 'rgba(232,83,86, 0.2)'
      : 'white'};
  border-width: ${(props) =>
    props.isSelected
      ? 0
      : props.activeDays?.indexOf(props.index) > -1
      ? 0
      : 0.7};
  border-color: ${(props) =>
    props.isSelected
      ? 'transparent'
      : props.activeDays?.indexOf(props.index) > -1
      ? 'transparent'
      : '#aaa'};
  border-radius: 12px;
  width: ${ToucahbleSize}px;
  height: ${ToucahbleSize}px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  padding-left: 7px;
  flex-wrap: wrap;
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const InformationBox = styled.View`
  padding: 0 10px;
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  margin-bottom: 10px;
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

const SpaceRow = styled.View`
  width: 100%;
  position: absolute;
  top: -10px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 25px;
`;

export default ({data}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    moment().date() - 1,
  );
  const activeDays = [];
  data?.WORKING?.map((i, index) => i[0] != 0 && activeDays.push(index));

  let monthStartDate = moment().startOf('month');
  let monthEndDate = moment().endOf('month');
  const monthDates = [];
  while (monthStartDate < monthEndDate) {
    monthDates.push(monthStartDate.format('YYYY-MM-DD'));
    monthStartDate.add(1, 'days');
  }
  return (
    <>
      <SpaceRow>
        <SmallText>일</SmallText>
        <SmallText>토</SmallText>
      </SpaceRow>
      <Container>
        {monthDates.map((_, index) => (
          <Touchable
            key={index}
            activeDays={activeDays}
            index={index}
            isSelected={index == selectedIndex}
            onPress={() => setSelectedIndex(index)}>
            {index == selectedIndex && (
              <HeatmapText
                activeDays={activeDays}
                index={index + 1}
                isSelected={index == selectedIndex}>
                {index + 1}
              </HeatmapText>
            )}
          </Touchable>
        ))}
      </Container>
      <InformationBox>
        {data.WORKING[selectedIndex][0] != 0 ? (
          <Row>
            <IconContainer>
              <PlayCircleOutlineIcon />
              <Text>
                시작시간&nbsp;
                {moment(data.WORKING[selectedIndex][1], 'kk:mm').format(
                  'k시 m분',
                )}
              </Text>
            </IconContainer>
            <IconContainer>
              <StopCircleOutlineIcon />
              <Text>
                종료시간&nbsp;
                {moment(data.WORKING[selectedIndex][2], 'kk:mm').format(
                  'k시 m분',
                )}
              </Text>
            </IconContainer>
          </Row>
        ) : (
          <Text style={{textAlign: 'center'}}>해당일에 근무가 없습니다.</Text>
        )}
        <Row style={{justifyContent: 'flex-start'}}>
          {data.WORKING[selectedIndex][0] != 0 && (
            <SmallTextRound>
              <SmallText>
                근무시간:&nbsp;
                {Math.trunc(
                  moment.duration(data.WORKING[selectedIndex][0]).asHours(),
                ) > 0 &&
                  `${Math.trunc(
                    moment.duration(data.WORKING[selectedIndex][0]).asHours(),
                  )}시간`}
                &nbsp;
                {moment.duration(data.WORKING[selectedIndex][0]).minutes() >
                  0 &&
                  `${moment
                    .duration(data.WORKING[selectedIndex][0])
                    .minutes()}분`}
              </SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][0] != 0 && data.REST_TIME !== '0' && (
            <SmallTextRound>
              <SmallText>휴게시간: {data.REST_TIME}분</SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][0] != 0 &&
            data.WORKING[selectedIndex][4] && (
              <SmallTextRound>
                <SmallText>지각</SmallText>
              </SmallTextRound>
            )}
          {data.WORKING[selectedIndex][0] != 0 &&
            data.WORKING[selectedIndex][5] && (
              <SmallTextRound>
                <SmallText>조퇴</SmallText>
              </SmallTextRound>
            )}
          {data.WORKING[selectedIndex][0] != 0 &&
            data.WORKING[selectedIndex][6] && (
              <SmallTextRound>
                <SmallText>결근</SmallText>
              </SmallTextRound>
            )}
          {data.WORKING[selectedIndex][0] != 0 &&
            data.WORKING[selectedIndex][3] && (
              <SmallTextRound>
                <SmallText>휴가</SmallText>
              </SmallTextRound>
            )}
        </Row>
      </InformationBox>
    </>
  );
};
