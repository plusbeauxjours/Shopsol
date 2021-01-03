import React, {useState} from 'react';
import styled from 'styled-components/native';

import styleGuide from '~/constants/styleGuide';

interface IColor {
  color: string;
  backgroundColor?: string;
}

const RenderDayPickerTouchable = styled.TouchableOpacity<IColor>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
`;

const RenderDayPickerText = styled.Text<IColor>`
  font-size: 14px;
  color: ${(props) => props.color};
  font-weight: ${styleGuide.fontWeight.bold};
`;

export default ({
  day,
  index,
  dayList,
  timeList,
  startTime,
  endTime,
  alertModal,
  onDayPress,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(day.isChecked);
  for (const time of timeList) {
    if (!isDisabled) {
      for (const day of time.dayList) {
        if (day.isChecked && day.day === dayList[index].day) {
          setIsDisabled(true);
        }
      }
    }
  }
  return (
    <RenderDayPickerTouchable
      color={isChecked ? styleGuide.palette.primary : '#CCCCCC'}
      style={{
        backgroundColor:
          isChecked && !isDisabled
            ? styleGuide.palette.primary
            : !isChecked && isDisabled
            ? '#bbb'
            : isChecked && isDisabled
            ? '#bbb'
            : 'white',
      }}
      disabled={isDisabled}
      onPress={() => {
        if (!startTime || !endTime) {
          alertModal('시간을 선택해주세요.');
        } else {
          setIsChecked(!isChecked);
          onDayPress(index);
        }
      }}
      key={index}>
      <RenderDayPickerText
        color={day.isChecked ? '#ffffff' : isDisabled ? '#ffffff' : '#bbb'}>
        {day.text}
      </RenderDayPickerText>
    </RenderDayPickerTouchable>
  );
};
