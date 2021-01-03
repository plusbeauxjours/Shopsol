import React from 'react';
import Slider from '@react-native-community/slider';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding-bottom: 5px;
`;

const TimeSlider = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const TimeLeft = styled.Text`
  flex: 1;
  font-size: ${styleGuide.fontSize.large}px;
  color: #ffffff;
  padding-left: 10px;
`;

const TimeRight = styled.Text`
  flex: 1;
  font-size: ${styleGuide.fontSize.large}px;
  color: #ffffff;
  text-align: right;
  padding-right: 10px;
`;

interface Props {
  currentTime: number;
  duration: number;
  onSlideCapture: (data: {seekTime: number}) => void;
  onSlideStart: () => void;
  onSlideComplete: () => void;
}

export const ProgressBar: React.FC<Props> = ({
  currentTime,
  duration,
  onSlideCapture,
  onSlideStart,
  onSlideComplete,
}) => {
  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  function getMinutesFromSeconds(time: number) {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  }

  function handleOnSlide(time: number) {
    onSlideCapture({seekTime: time});
  }
  return (
    <Container>
      <TimeSlider>
        <TimeLeft>{position}</TimeLeft>
        <TimeRight>{fullDuration}</TimeRight>
      </TimeSlider>
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onValueChange={handleOnSlide}
        onSlidingStart={onSlideStart}
        onSlidingComplete={onSlideComplete}
        minimumTrackTintColor={'#F44336'}
        maximumTrackTintColor={'#FFFFFF'}
        thumbTintColor={'#F44336'}
      />
    </Container>
  );
};
