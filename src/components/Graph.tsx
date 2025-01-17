import React, { useState, memo } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RNBounceable from '@freakycoder/react-native-bounceable';
import styled from 'styled-components/native';
import moment from 'moment';

import Underlay from './Underlay';
import { PlayCircleOutlineIcon, StopCircleOutlineIcon } from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

interface IColumn {
    index?: number;
    isSelected?: boolean;
    height?: number;
}

const width = wp('100%') - 100;
const height = 200;
const step = width / 7;

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
    color: ${styleGuide.palette.greyColor};
`;

const Column = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    align-self: center;
    opacity: 0.06;
    width: 30px;
    background-color: ${styleGuide.palette.primary};
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
`;

const Top = styled.View<IColumn>`
    position: absolute;
    top: 0;
    height: 40px;
    align-self: center;
    width: 30px;
    background-color: ${(props) => (props.isSelected ? styleGuide.palette.primary : '#ebd0d1')};
    border-radius: 14px;
    justify-content: center;
    align-items: center;
`;

const ColumnContainer = styled(RNBounceable)<IColumn>`
    position: absolute;
    left: ${(props) => props.index * step}px;
    bottom: -20px;
    width: ${step}px;
    height: ${(props) => props.height + 20}px;
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
    justify-content: flex-start;
    align-items: center;
    height: 22px;
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

const TopText = styled.Text<IColumn>`
    font-size: 14px;
    font-weight: ${styleGuide.fontWeight.bold};
    color: white;
`;

const GraphBox = styled.View`
    height: 200px;
    overflow: hidden;
`;

const VacationContainer = styled(RNBounceable)<IColumn>`
    flex: 1;
    position: absolute;
    justify-content: center;
    align-items: center;
    left: ${(props) => props.index * step}px;
    width: ${step}px;
    height: 200px;
`;

const VacationTop = styled.View<IColumn>`
    position: absolute;
    height: 195px;
    align-self: center;
    width: 30px;
    background-color: ${(props) => (props.isSelected ? styleGuide.palette.primary : '#ebd0d1')};
    border-radius: 14px;
    justify-content: center;
    align-items: center;
    border-width: 0.7px;
    background-color: white;
    border-color: ${(props) => (props.isSelected ? 'rgba(127, 127, 127, 0.6)' : 'rgba(127, 127, 127, 0.3)')};
`;

const VacationTopText = styled(TopText)<IColumn>`
    font-size: ${styleGuide.fontSize.middle}px;
    font-weight: ${styleGuide.fontWeight.normal};
    color: ${(props) => (props.isSelected ? styleGuide.palette.greyColor : 'rgba(127, 127, 127, 0.6)')};
`;

// 주별 사업장현황의 막대그래프
export default ({ data, toDay }) => {
    const values = Object.values(data.WORKING)?.map((p) => p[0]);
    const minY = Math.min(...values);
    const maxY = Math.max(...values);
    const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;
    const [selectedIndex, setSelectedIndex] = useState<string>((moment(toDay).isoWeekday() - 1).toString());
    return (
        <>
            <Box>
                <Underlay minY={minY} maxY={maxY} />
                <GraphBox>
                    {values?.map((item, index) => {
                        if (item === -1) {
                            return (
                                <VacationContainer
                                    key={index}
                                    index={index}
                                    onPress={() => setSelectedIndex(index.toString())}
                                    bounceEffect={0.95}>
                                    <VacationTop isSelected={selectedIndex == index.toString()}>
                                        <VacationTopText isSelected={selectedIndex == index.toString()}>
                                            휴가
                                        </VacationTopText>
                                    </VacationTop>
                                </VacationContainer>
                            );
                        } else {
                            return (
                                <ColumnContainer
                                    key={index}
                                    index={index}
                                    isSelected={selectedIndex == index.toString()}
                                    onPress={() => setSelectedIndex(index.toString())}
                                    height={lerp(0, height, item / maxY)}
                                    bounceEffect={0.95}>
                                    <Column />
                                    <Top isSelected={selectedIndex == index.toString()}>
                                        <TopText isSelected={selectedIndex == index.toString()}>
                                            {moment(toDay).startOf('isoWeek').add(index, 'days').format('D')}
                                        </TopText>
                                    </Top>
                                </ColumnContainer>
                            );
                        }
                    })}
                </GraphBox>
                {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
                    return (
                        <View key={index} index={index}>
                            <Text style={{ textAlign: 'center' }}>{day}</Text>
                        </View>
                    );
                })}
            </Box>
            <InformationBox>
                {data.WORKING[selectedIndex][0] > 0 ? (
                    <Row style={{ justifyContent: 'space-around' }}>
                        <IconContainer>
                            <PlayCircleOutlineIcon />
                            <Text style={{ marginLeft: 5, width: 60 }}>시작시간:&nbsp;</Text>
                            {moment() > moment(toDay).startOf('isoWeek').add(selectedIndex, 'days') ? (
                              
                                // 4월24일 //////////
                                <Text style={{ marginLeft: 5, width: 60 }}>
                                    {data.WORKING[selectedIndex][10].slice(0, 5)}
                                </Text>
                            ) : (
                                <Text style={{ marginLeft: 5, width: 60 }}>
                                    {data.WORKING[selectedIndex][1].slice(0, 5)}
                                </Text>
                                ////////////////////////
                            )}
                        </IconContainer>
                        <IconContainer>
                            <StopCircleOutlineIcon />
                            <Text style={{ marginLeft: 5, width: 60 }}>종료시간:&nbsp;</Text>
                            {moment() > moment(toDay).startOf('isoWeek').add(selectedIndex, 'days') ? (

                                // 4월24일 //////////
                                <Text style={{ marginLeft: 5, width: 60 }}>
                                    {moment.duration(data.WORKING[selectedIndex][10]) >
                                        moment.duration(data.WORKING[selectedIndex][11]) && (
                                        <SmallText>익일&nbsp;</SmallText>
                                    )}
                                    {data.WORKING[selectedIndex][11].slice(0, 5)}
                                </Text>
                            ) : (
                                <Text style={{ marginLeft: 5, width: 60 }}>
                                    {moment.duration(data.WORKING[selectedIndex][1]) >
                                        moment.duration(data.WORKING[selectedIndex][2]) && (
                                        <SmallText>익일&nbsp;</SmallText>
                                    )}
                                    {data.WORKING[selectedIndex][2].slice(0, 5)}
                                </Text>
                                ////////////////////////
                            )}
                        </IconContainer>
                    </Row>
                ) : data.WORKING[selectedIndex][0] === -1 && data.WORKING[selectedIndex][7] ? (
                    <Row style={{ justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>유급휴가일 입니다.</Text>
                    </Row>
                ) : data.WORKING[selectedIndex][0] === -1 && !data.WORKING[selectedIndex][7] ? (
                    <Row style={{ justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>무급휴가일 입니다.</Text>
                    </Row>
                ) : (
                    <Row style={{ justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>해당일에 근무가 없습니다.</Text>
                    </Row>
                )}
                <Row style={{ justifyContent: 'flex-start' }}>
                    {data.WORKING[selectedIndex][0] > 0 && (
                        <SmallTextRound>
                            {moment() > moment(toDay).startOf('isoWeek').add(selectedIndex, 'days') ? (
                                typeof data.WORKING[selectedIndex][9] === 'string' &&
                                data.WORKING[selectedIndex][9]?.includes('미') ? (
                                    <SmallText>근무시간:&nbsp;{data.WORKING[selectedIndex][9]}</SmallText>
                                ) : (
                                    <SmallText>
                                        근무시간:&nbsp;
                                        {Math.trunc(moment.duration(data.WORKING[selectedIndex][9]).asHours()) > 0 &&
                                            `${Math.trunc(
                                                moment.duration(data.WORKING[selectedIndex][9]).asHours(),
                                            )}시간`}
                                        &nbsp;
                                        {moment.duration(data.WORKING[selectedIndex][9]).minutes() > 0 &&
                                            `${moment.duration(data.WORKING[selectedIndex][9]).minutes()}분`}
                                    </SmallText>
                                )
                            ) : (
                                <SmallText>
                                    근무시간:&nbsp;
                                    {Math.trunc(moment.duration(data.WORKING[selectedIndex][0]).asHours()) > 0 &&
                                        `${Math.trunc(moment.duration(data.WORKING[selectedIndex][0]).asHours())}시간`}
                                    &nbsp;
                                    {moment.duration(data.WORKING[selectedIndex][0]).minutes() > 0 &&
                                        `${moment.duration(data.WORKING[selectedIndex][0]).minutes()}분`}
                                </SmallText>
                            )}
                        </SmallTextRound>
                    )}
                    {data.WORKING[selectedIndex][0] > 0 && data.REST_TIME !== '0' && (
                        <SmallTextRound>
                            <SmallText>휴게시간: {data.REST_TIME}분</SmallText>
                        </SmallTextRound>
                    )}
                    {data.WORKING[selectedIndex][0] > 0 && data.WORKING[selectedIndex][4] && (
                        <SmallTextRound>
                            <SmallText>지각</SmallText>
                        </SmallTextRound>
                    )}
                    {data.WORKING[selectedIndex][0] > 0 && data.WORKING[selectedIndex][5] && (
                        <SmallTextRound>
                            <SmallText>조퇴</SmallText>
                        </SmallTextRound>
                    )}
                    {data.WORKING[selectedIndex][0] > 0 && data.WORKING[selectedIndex][6] && (
                        <SmallTextRound>
                            <SmallText>결근</SmallText>
                        </SmallTextRound>
                    )}
                    {data.WORKING[selectedIndex][0] > 0 && data.WORKING[selectedIndex][3] && (
                        <SmallTextRound>
                            <SmallText>휴가</SmallText>
                        </SmallTextRound>
                    )}
                </Row>
            </InformationBox>
        </>
    );
};
