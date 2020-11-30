import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import ScheduleUnderlay from './ScheduleUnderlay';

interface ITouchable {
  isSelected?: boolean;
  backgroundColor?: string;
  startTime?: number;
  width: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const maxWidth = wp('100%') - 90;

const View = styled.View<ITouchable>`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  height: 50px;
  border-radius: 25px;
  min-width: 50px;
  width: ${(props) => (props.width * maxWidth) / 86400000}px;
  background-color: ${(props) => props.backgroundColor};
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  background-color: #e85356;
`;

const Touchable = styled.TouchableOpacity<ITouchable>`
  border-radius: 25px;
  height: 50px;
  min-width: 50px;
  width: ${(props) => (props.width * maxWidth) / 86400000}px;
  margin-top: ${(props) => (props.isFirst ? 30 : 0)}px;
  margin-bottom: 10px;
  left: ${(props) => (props.startTime * maxWidth) / 86400000 - 25}px;
`;

const Bold = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

const EmpCardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  flex-wrap: wrap;
`;

const GraphSection = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  padding: 25px;
`;

const Table = styled.View`
  background-color: white;
`;

export default ({
  EMP_LIST,
  selectedIndex,
  setSelectedIndex,
  gotoSelectedIndex,
}) => {
  return (
    <GraphSection>
      <Table>
        <ScheduleUnderlay />
        {EMP_LIST.map(
          (i, index) =>
            i.WORKING > 0 && (
              <Touchable
                key={index}
                isFirst={index == 0}
                isLast={index == EMP_LIST.length - 1}
                startTime={moment.duration(i.START_TIME).as('milliseconds')}
                // width={i?.WORKING || 0}
                width={i?.WORKING || 0}
                delayLongPress={1}
                onPress={() => {
                  setSelectedIndex(index);
                  gotoSelectedIndex(index);
                }}
                activeOpacity={1}>
                <View
                  isSelected={selectedIndex == index}
                  backgroundColor={i?.color}
                  startTime={moment.duration(i.START_TIME).as('milliseconds')}
                  // width={i?.WORKING || 0}
                  width={i?.WORKING || 0}>
                  <FastImage
                    style={{
                      marginRight: 10,
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
                  {(i?.WORKING * maxWidth) / 86400000 > 110 && (
                    <EmpCardRow style={{marginBottom: 0}}>
                      <Bold>{i.EMP_NAME}</Bold>
                    </EmpCardRow>
                  )}
                </View>
              </Touchable>
            ),
        )}
      </Table>
    </GraphSection>
  );
};
