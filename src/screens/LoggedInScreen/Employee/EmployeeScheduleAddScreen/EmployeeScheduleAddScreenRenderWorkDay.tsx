import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RemoveCircleIcon} from '../../../../constants/Icons';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
}

const RenderDayRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding: 10px 0;
  width: ${wp('100%') - 80}px;
`;

const RenderDayBox = styled.View<IsSelected>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
  background-color: ${(props) =>
    props.isSelected ? `${props.color}` : 'transparent'};
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const RenderDayBoxText = styled.Text<IsSelected>`
  color: ${(props) => (props.isSelected ? 'white' : '#CCCCCC')};
`;

const RenderDayTime = styled.View`
  margin-top: 10px;
  margin-left: 15px;
  width: 115px;
`;

const RenderWorkDayTouchable = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  align-items: center;
  justify-content: center;
`;

const RenderDayTimeText = styled.Text<IsSelected>`
  font-size: 14px;
  color: ${(props) => (props.substract && props.isSelected ? '#000' : '#ddd')};
`;

const RenderDuration = styled.View`
  margin-top: 10px;
  margin-left: 5px;
  width: 85px;
`;

const RenderDurationText = styled.Text<IsSelected>`
  font-size: 14px;
  color: ${(props) => (props.isSelected ? '#000' : '#ddd')};
`;

export default ({index, removeDayFn, timeList, timeListIndex, originalDay}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const substractHour = (startTime, endTime) => {
    const startTimeArray = startTime.split(':');
    let startTimeHour = Number(startTimeArray[0]);
    let startTimeMinute = Number(startTimeArray[1]);
    const endTimeArray = endTime.split(':');
    let endTimeHour = Number(endTimeArray[0]);
    let endTimeMinute = Number(endTimeArray[1]);
    let resultTimeHour = 0;
    let resultTimeMinute = 0;
    if (
      startTimeHour > endTimeHour ||
      (startTimeHour === endTimeHour && startTimeMinute > endTimeMinute)
    ) {
      endTimeHour += 24;
    }
    if (startTimeMinute > endTimeMinute) {
      endTimeHour--;
      endTimeMinute += 60;
    }
    resultTimeMinute = endTimeMinute - startTimeMinute;
    resultTimeHour = endTimeHour - startTimeHour;
    return `(${resultTimeHour}h ${resultTimeMinute}m)`;
  };

  let startTime = '00:00';
  let endTime = '00:00';
  let flag = false;
  let color = null;

  for (let i = 0; i < timeList.length; i++) {
    for (const day of timeList[i].dayList) {
      if (day.isChecked && originalDay.day === day.day) {
        startTime = timeList[i].startTime;
        endTime = timeList[i].endTime;
        flag = true;
        if (timeListIndex !== null && timeListIndex === i) {
          color = timeList[i]?.color;
        }
      }
    }
  }
  const substract = flag ? substractHour(startTime, endTime) : '';
  // const isSelected = color && flag;

  useEffect(() => {
    if (color && flag) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [flag]);

  return (
    <RenderDayRow key={index}>
      <RenderDayBox isSelected={isSelected} color={color}>
        <RenderDayBoxText isSelected={isSelected}>
          {originalDay.text}
        </RenderDayBoxText>
      </RenderDayBox>
      <RenderDayTime>
        <RenderDayTimeText isSelected={isSelected} substract={substract}>
          {isSelected ? startTime : '00:00'}&nbsp;~&nbsp;
          {isSelected ? endTime : '00:00'}
        </RenderDayTimeText>
      </RenderDayTime>
      <RenderDuration>
        <RenderDurationText isSelected={isSelected}>
          {isSelected && substract}
        </RenderDurationText>
      </RenderDuration>
      {flag && isSelected && (
        <RenderWorkDayTouchable
          onPress={() => {
            setIsSelected(false);
            removeDayFn(originalDay);
          }}>
          <RemoveCircleIcon />
        </RenderWorkDayTouchable>
      )}
    </RenderDayRow>
  );
};
