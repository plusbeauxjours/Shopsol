import React, {useRef, useMemo} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RNBounceable from '@freakycoder/react-native-bounceable';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Slider, {Ballon} from 'react-native-reanimated-slider';
import Animated from 'react-native-reanimated';

import ScheduleUnderlay from './ScheduleUnderlay';
import {Value} from 'react-native-reanimated';

interface ITouchable {
  isSelected?: boolean;
  backgroundColor?: string;
  startTime?: number;
  endTime?: number;
  width: number;
  isFirst?: boolean;
  isLast?: boolean;
}

interface IRedLine {
  indexTime: number;
  height: number;
}

interface IText {
  index?: number;
}

const maxWidth = wp('100%') - 90;

const View = styled.View<ITouchable>`
  padding: 3px;
  flex-direction: row;
  align-items: center;
  height: 46px;
  border-radius: 25px;
  min-width: 46px;
  width: ${(props) => (props.width * maxWidth) / 108000000}px;
  background-color: ${(props) => props.backgroundColor};
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  background-color: #e85356;
`;

const Touchable = styled(RNBounceable)<ITouchable>`
  border-radius: 25px;
  height: 46px;
  min-width: 46px;
  width: ${(props) => (props.width * maxWidth) / 108000000}px;
  margin-top: ${(props) => (props.isFirst ? 10 : 0)}px;
  margin-bottom: 10px;
  left: ${(props) => ((props.startTime + 10800000) * maxWidth) / 108000000}px;
`;

const TouchableRow = styled(RNBounceable)<ITouchable>`
  margin-top: ${(props) => (props.isFirst ? 10 : 0)}px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

const FrontView = styled.View<ITouchable>`
  padding: 3px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  height: 46px;
  min-width: 46px;
  width: ${(props) => ((props.width + 10800000) * maxWidth) / 108000000 + 20}px;
  left: -20px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  background-color: #e85356;
`;

const BackView = styled.View<ITouchable>`
  padding: 3px;
  flex-direction: row;
  align-items: center;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  height: 46px;
  min-width: 46px;
  width: ${(props) => (props.width * maxWidth) / 108000000}px;
  left: ${(props) =>
    ((props.startTime + 10800000) * maxWidth) / 108000000 -
    ((props.endTime + 10800000) * maxWidth) / 108000000}px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  background-color: #e85356;
`;

const Bold = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const EmpCardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 45px;
  flex-wrap: wrap;
`;

const GraphSection = styled.View`
  width: 100%;
  border-radius: 20px;
  background-color: white;
  padding: 25px;
`;

const Table = styled.View`
  z-index: 1;
  background-color: transparent;
`;

const TextBox = styled.View`
  flex-direction: row;
  left: -15px;
  align-items: center;
  width: ${wp('100%') - 60}px;
  justify-content: space-between;
  margin-top: 10px;
`;

const Text = styled.Text<IText>`
  width: 30px;
  font-size: 10px;
  color: ${(props) =>
    props.index == 0 || props.index == 10 ? '#ccc' : '#7f7f7f'};
  text-align: center;
  margin-bottom: 5px;
`;

const RedLine = styled.View<IRedLine>`
  z-index: 10;
  width: 1;
  height: ${(props) => props.height}px;
  max-height: 430px;
  background-color: #e85356;
`;

const IconConatainer = styled.View`
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  left: -8px;
  top: -15px;
  z-index: 20;
`;

export default ({
  TIME_EMP_LIST,
  selectedIndex,
  setSelectedIndex,
  gotoSelectedIndex,
  indexTime,
  setIndexTime,
  scrollRef,
}) => {
  console.log(TIME_EMP_LIST);
  const ballonRef = useRef(null);
  const renderThumbImage = () => (
    <IconConatainer>
      <FastImage
        style={{height: 30, width: 30}}
        source={require('../assets/images/key.png')}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <RedLine
        indexTime={indexTime}
        height={TIME_EMP_LIST.filter((i) => i.WORKING > 0).length * 56 + 40}
      />
    </IconConatainer>
  );
  const renderBallon = () => (
    <Ballon
      ref={ballonRef}
      color={'#e85356'}
      textStyle={{width: 70, textAlign: 'center', color: 'white'}}
    />
  );

  const valueMin = useMemo(() => new Value(0), []);
  const valueMax = useMemo(() => new Value(8640), []);
  const valueProgress = useMemo(() => new Value(0), []);
  return (
    <GraphSection>
      <Slider
        style={{flex: 1, marginHorizontal: (wp('100') - 90) * 0.1}}
        maximumTrackTintColor="#f6f6f6"
        minimumTrackTintColor="#f6f6f6"
        thumbTintColor="#fff"
        min={valueMin}
        max={valueMax}
        ballon={(value) =>
          `${Math.trunc(
            moment.duration(value * 10, 'seconds').asHours(),
          )}시 ${moment.duration(value * 10, 'seconds').minutes()}분`
        }
        progress={valueProgress}
        onSlidingStart={() => {}}
        onSlidingComplete={() => {
          (value) => setIndexTime(Math.abs(value));
        }}
        renderBallon={renderBallon}
        renderThumbImage={renderThumbImage}
        setBallonText={(text) => ballonRef.current.setText(text)}
      />
      <TextBox>
        {['21', '0', null, '6', null, '12', null, '18', null, '24', '3'].map(
          (i, index) => {
            return (
              <Text key={index} index={index}>
                {i && `${i}시`}
              </Text>
            );
          },
        )}
      </TextBox>
      <Table>
        <ScheduleUnderlay />
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          decelerationRate="fast"
          style={{maxHeight: 440}}>
          {TIME_EMP_LIST.map((i, index) => {
            if (i.WORKING > 0) {
              if (moment.duration(i.START_TIME) > moment.duration(i.END_TIME)) {
                return (
                  <TouchableRow
                    bounceEffect={0.95}
                    key={index}
                    isFirst={index == 0}
                    isLast={index == TIME_EMP_LIST.length - 1}
                    startTime={moment.duration(i.START_TIME).as('milliseconds')}
                    width={i?.WORKING || 0}
                    delayLongPress={1}
                    onPress={() => {
                      setSelectedIndex(index);
                      gotoSelectedIndex(index);
                    }}>
                    <FrontView
                      isSelected={selectedIndex == index}
                      backgroundColor={i?.color}
                      width={moment.duration(i.END_TIME).as('milliseconds')}>
                      <FastImage
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                        source={{
                          uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </FrontView>
                    <BackView
                      isSelected={selectedIndex == index}
                      backgroundColor={i?.color}
                      startTime={moment
                        .duration(i.START_TIME)
                        .as('milliseconds')}
                      endTime={moment.duration(i.END_TIME).as('milliseconds')}
                      width={i?.WORKING || 0}>
                      <FastImage
                        style={{
                          marginRight: 5,
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                        source={{
                          uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      {(i?.WORKING * maxWidth) / 108000000 > 80 && (
                        <EmpCardRow style={{marginBottom: 0}}>
                          <Bold>{i.EMP_NAME}</Bold>
                        </EmpCardRow>
                      )}
                    </BackView>
                  </TouchableRow>
                );
              } else {
                return (
                  <Touchable
                    bounceEffect={0.95}
                    key={index}
                    isFirst={index == 0}
                    isLast={index == TIME_EMP_LIST.length - 1}
                    startTime={moment.duration(i.START_TIME).as('milliseconds')}
                    width={i?.WORKING || 0}
                    delayLongPress={1}
                    onPress={() => {
                      setSelectedIndex(index);
                      gotoSelectedIndex(index);
                    }}>
                    <View
                      isSelected={selectedIndex == index}
                      backgroundColor={i?.color}
                      startTime={moment
                        .duration(i.START_TIME)
                        .as('milliseconds')}
                      width={i?.WORKING || 0}>
                      <FastImage
                        style={{
                          marginRight: 5,
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                        source={{
                          uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      {(i?.WORKING * maxWidth) / 108000000 > 80 && (
                        <EmpCardRow style={{marginBottom: 0}}>
                          <Bold>{i.EMP_NAME}</Bold>
                        </EmpCardRow>
                      )}
                    </View>
                  </Touchable>
                );
              }
            }
          })}
        </Animated.ScrollView>
      </Table>
    </GraphSection>
  );
};
