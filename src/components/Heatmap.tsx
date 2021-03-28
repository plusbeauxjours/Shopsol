import React, {useState} from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';

import {PlayCircleOutlineIcon, StopCircleOutlineIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

interface IActive {
  activeDays: any;
  index: number;
  isSelected: boolean;
}

interface IRow {
  paddingLeft: number;
}

const ToucahbleSize = wp('100%') * 0.095;
const ToucahbleMargin = (wp('100%') - ToucahbleSize * 7 - 60) / 8;

const HeatmapText = styled.Text<IActive>`
  font-size: 14px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${(props) =>
    props.isSelected
      ? 'white'
      : props.activeDays?.indexOf(props.index) > -1
      ? 'white'
      : '#cccccc'};
`;

const Text = styled.Text`
  color: ${styleGuide.palette.greyColor};
`;

const Touchable = styled(RNBounceable)<IActive>`
  margin-top: 8px;
  margin-right: ${ToucahbleMargin}px;
  background-color: ${(props) =>
    props.isSelected
      ? styleGuide.palette.primary
      : props.activeDays?.indexOf(props.index) > -1
      ? '#ebd0d1'
      : 'white'};
  border-width: ${(props) =>
    props.isSelected
      ? 0
      : props.activeDays?.indexOf(props.index) > -1
      ? 0
      : 0.7}px;
  border-color: ${(props) =>
    props.isSelected
      ? 'transparent'
      : props.activeDays?.indexOf(props.index) > -1
      ? 'transparent'
      : styleGuide.palette.greyColor};
  border-radius: 14px;
  width: ${ToucahbleSize}px;
  height: ${ToucahbleSize}px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  width: ${ToucahbleSize * 7 + ToucahbleMargin * 8}px;
  padding-left: ${ToucahbleMargin}px;
  flex-wrap: wrap;
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const SpaceRow = styled.View`
  width: ${ToucahbleSize * 7 + ToucahbleMargin * 8}px;
  position: absolute;
  top: -15px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${ToucahbleSize / 2 + ToucahbleMargin / 2}px;
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
  justify-content: flex-start;
  align-items: center;
  height: 22px;
  margin-bottom: 10px;
`;

const SmallTextRound = styled.View`
  border-radius: 15px;
  border-width: 0.5px;
  border-color: ${styleGuide.palette.greyColor};
  padding: 5px;
  margin-right: 5px;
`;

const SmallText = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  color: ${styleGuide.palette.greyColor};
`;

const WhiteSpace = styled.View<IRow>`
  width: ${(props) => props.paddingLeft * (ToucahbleSize + ToucahbleMargin)}px;
`;

// 월별 사업장현황의 달력
export default ({data, toDay}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    moment(toDay).date() - 1,
  );
  const activeDays = [];
  data?.WORKING?.map((i, index) => i[0] > 0 && activeDays.push(index));

  const vacationDays = [];
  data?.WORKING?.map((i, index) => i[0] === -1 && vacationDays.push(index));

  let monthStartDate = moment(toDay).startOf('month');
  let monthEndDate = moment(toDay).endOf('month');
  const monthDates = [];
  while (monthStartDate < monthEndDate) {
    monthDates.push(monthStartDate.format('YYYY-MM-DD'));
    monthStartDate.add(1, 'days');
  }
  return (
    <>
      <Container>
        <SpaceRow>
          {['일', '월', '화', '수', '목', '금', '토'].map((i, index) => (
            <Text key={index}>{i}</Text>
          ))}
        </SpaceRow>
        <WhiteSpace paddingLeft={moment(toDay).startOf('month').isoWeekday()} />
        {monthDates.map((_, index) => {
          if (vacationDays?.indexOf(index) > -1 && selectedIndex !== index) {
            return (
              <Touchable
                key={index}
                activeDays={activeDays}
                index={index}
                isSelected={index == selectedIndex}
                onPress={() => setSelectedIndex(index)}>
                <HeatmapText
                  style={{fontSize: styleGuide.fontSize.middle}}
                  activeDays={activeDays}
                  index={index}
                  isSelected={index == selectedIndex}>
                  휴가
                </HeatmapText>
              </Touchable>
            );
          } else {
            return (
              <Touchable
                key={index}
                activeDays={activeDays}
                index={index}
                isSelected={index == selectedIndex}
                onPress={() => setSelectedIndex(index)}>
                <HeatmapText
                  activeDays={activeDays}
                  index={index}
                  isSelected={index == selectedIndex}>
                  {index + 1}
                </HeatmapText>
              </Touchable>
            );
          }
        })}
      </Container>
      <InformationBox>
        {data.WORKING[selectedIndex][0] > 0 ? (
          <Row style={{justifyContent: 'space-around'}}>
            <IconContainer>
              <PlayCircleOutlineIcon />
              <Text style={{marginLeft: 5, width: 60}}>시작시간:&nbsp;</Text>
              {moment() >
              moment(toDay).startOf('month').add(selectedIndex, 'days') ? (
                <Text style={{marginLeft: 5, width: 60}}>
                  {data.WORKING[selectedIndex][10].slice(0, 5)}
                </Text>
              ) : (
                <Text style={{marginLeft: 5, width: 60}}>
                  {data.WORKING[selectedIndex][1].slice(0, 5)}
                </Text>
              )}
            </IconContainer>
            <IconContainer>
              <StopCircleOutlineIcon />
              <Text style={{marginLeft: 5, width: 60}}>종료시간:&nbsp;</Text>
              {moment() >
              moment(toDay).startOf('month').add(selectedIndex, 'days') ? (
                <Text style={{marginLeft: 5, width: 60}}>
                  {moment.duration(data.WORKING[selectedIndex][10]) >
                    moment.duration(data.WORKING[selectedIndex][11]) && (
                    <SmallText>익일&nbsp;</SmallText>
                  )}
                  {data.WORKING[selectedIndex][11].slice(0, 5)}
                </Text>
              ) : (
                <Text style={{marginLeft: 5, width: 60}}>
                  {moment.duration(data.WORKING[selectedIndex][1]) >
                    moment.duration(data.WORKING[selectedIndex][2]) && (
                    <SmallText>익일&nbsp;</SmallText>
                  )}
                  {data.WORKING[selectedIndex][2].slice(0, 5)}
                </Text>
              )}
            </IconContainer>
          </Row>
        ) : data.WORKING[selectedIndex][0] === -1 &&
          data.WORKING[selectedIndex][7] ? (
          <Row style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>유급휴가일 입니다.</Text>
          </Row>
        ) : data.WORKING[selectedIndex][0] === -1 &&
          !data.WORKING[selectedIndex][7] ? (
          <Row style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>무급휴가일 입니다.</Text>
          </Row>
        ) : (
          <Row style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>해당일에 근무가 없습니다.</Text>
          </Row>
        )}
        <Row style={{justifyContent: 'flex-start'}}>
          {data.WORKING[selectedIndex][0] > 0 && (
            <SmallTextRound>
              {moment() >
              moment(toDay).startOf('month').add(selectedIndex, 'days') ? (
                typeof data.WORKING[selectedIndex][9] === 'string' &&
                data.WORKING[selectedIndex][9]?.includes('미') ? (
                  <SmallText>
                    근무시간:&nbsp;{data.WORKING[selectedIndex][9]}
                  </SmallText>
                ) : (
                  <SmallText>
                    근무시간:&nbsp;
                    {Math.trunc(
                      moment.duration(data.WORKING[selectedIndex][9]).asHours(),
                    ) > 0 &&
                      `${Math.trunc(
                        moment
                          .duration(data.WORKING[selectedIndex][9])
                          .asHours(),
                      )}시간`}
                    &nbsp;
                    {moment.duration(data.WORKING[selectedIndex][9]).minutes() >
                      0 &&
                      `${moment
                        .duration(data.WORKING[selectedIndex][9])
                        .minutes()}분`}
                  </SmallText>
                )
              ) : (
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
              )}
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][0] > 0 && data.REST_TIME !== '0' && (
            <SmallTextRound>
              <SmallText>휴게시간: {data.REST_TIME}분</SmallText>
            </SmallTextRound>
          )}
          {data.WORKING[selectedIndex][0] > 0 &&
            data.WORKING[selectedIndex][4] && (
              <SmallTextRound>
                <SmallText>지각</SmallText>
              </SmallTextRound>
            )}
          {data.WORKING[selectedIndex][0] > 0 &&
            data.WORKING[selectedIndex][5] && (
              <SmallTextRound>
                <SmallText>조퇴</SmallText>
              </SmallTextRound>
            )}
          {data.WORKING[selectedIndex][0] > 0 &&
            data.WORKING[selectedIndex][6] && (
              <SmallTextRound>
                <SmallText>결근</SmallText>
              </SmallTextRound>
            )}
          {data.WORKING[selectedIndex][0] > 0 &&
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
