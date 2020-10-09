import React from 'react';
import styled from 'styled-components/native';

import {
  TenForwardIcon,
  TenRewindIcon,
  PauseIcon,
  PlayIcon,
} from '../constants/Icons';

interface Props {
  playing: boolean;
  showSkip: boolean;
  onPlay: () => void;
  onPause: () => void;
  skipForwards?: () => void;
  skipBackwards?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isFullScreen: boolean;
}

const Container = styled.View`
  padding: 0 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex: 3;
  margin-top: 30px;
`;
const Touchable = styled.TouchableOpacity`
  padding: 5px;
`;

export const PlayerControls: React.FC<Props> = ({
  playing,
  showSkip,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  isFullScreen,
}) => (
  <Container>
    {showSkip && (
      <Touchable onPress={skipBackwards}>
        <TenRewindIcon size={isFullScreen ? 65 : 36} />
      </Touchable>
    )}
    <Touchable onPress={playing ? onPause : onPlay}>
      {playing ? (
        <PauseIcon size={isFullScreen ? 65 : 36} />
      ) : (
        <PlayIcon size={isFullScreen ? 65 : 36} />
      )}
    </Touchable>
    {showSkip && (
      <Touchable onPress={skipForwards}>
        <TenForwardIcon size={isFullScreen ? 65 : 36} />
      </Touchable>
    )}
  </Container>
);
