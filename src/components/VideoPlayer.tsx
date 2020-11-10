import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {StatusBar, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {PlayerControls} from './PlayerControls';
import {ProgressBar} from './ProgressBar';
import {
  PortraitIcon,
  LandscapeIcon,
  CloseCircleOutlineIcon,
} from '../constants/Icons';

interface IsFullScreen {
  isFullScreen: boolean;
}

const ToggleControls = styled.TouchableOpacity<IsFullScreen>`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ControlOverlay = styled.View`
  position: absolute;
  background-color: #000000c4;
`;

const FullScreenIconContainer = styled.TouchableOpacity<IsFullScreen>`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  top: ${(props) => (isIphoneX() ? 15 : -10)};
`;

const CloseIconContainer = styled.TouchableOpacity<IsFullScreen>`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  top: ${(props) => (isIphoneX() ? 15 : -10)};
`;

export default ({url, setModalVisible}) => {
  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowedControls, setIsShowedControls] = useState<boolean>(true);

  function handleFullscreen() {
    isFullScreen
      ? (Orientation.lockToPortrait(), setIsFullScreen(false))
      : (Orientation.lockToLandscapeLeft(), setIsFullScreen(true));
  }

  function handlePlayPause() {
    if (isPlaying) {
      setIsPlaying(false);
      setIsShowedControls(true);
      return;
    }
    setIsPlaying(true);
    setTimeout(() => setIsShowedControls(false), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  }

  function skipForward() {
    videoRef.current.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  }

  function onSeek(data: OnSeekData) {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  }

  function onLoadEnd(data: OnLoadData) {
    setLoading(false);
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  }

  function onLoadStart() {
    setLoading(true);
  }

  function onProgress(data: OnProgressData) {
    currentTime: setCurrentTime(data.currentTime);
  }

  function onEnd() {
    setIsPlaying(false);
    videoRef.current.seek(0);
  }

  function showControls() {
    isShowedControls ? setIsShowedControls(false) : setIsShowedControls(true);
  }

  useEffect(() => {
    StatusBar.setHidden(true);
    setIsFullScreen(false);
    setTimeout(() => setIsShowedControls(false), 4000);
  }, []);

  useEffect(() => {
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <ToggleControls
      isFullScreen={isFullScreen}
      onPress={showControls}
      activeOpacity={1}>
      <Video
        ref={videoRef}
        source={{uri: url}}
        style={
          isFullScreen
            ? {width: hp('100%'), height: wp('100%')}
            : {width: wp('100%'), height: wp('100%') * (9 / 16)}
        }
        isFullScreen={isFullScreen}
        controls={false}
        resizeMode={'contain'}
        onLoad={onLoadEnd}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onEnd={onEnd}
        paused={!isPlaying}
      />
      {isShowedControls && (
        <>
          {isFullScreen ? (
            <FullScreenIconContainer
              isFullScreen={isFullScreen}
              onPress={handleFullscreen}>
              <PortraitIcon />
            </FullScreenIconContainer>
          ) : (
            <>
              <FullScreenIconContainer
                style={{right: 50, marginTop: 3}}
                isFullScreen={isFullScreen}
                onPress={handleFullscreen}>
                <LandscapeIcon />
              </FullScreenIconContainer>
              <CloseIconContainer
                isFullScreen={isFullScreen}
                onPress={() => {
                  setIsFullScreen(false);
                  setModalVisible(false);
                  StatusBar.setHidden(false);
                  Orientation.lockToPortrait();
                }}>
                <CloseCircleOutlineIcon size={33} color={'white'} />
              </CloseIconContainer>
            </>
          )}
          <ControlOverlay
            style={
              isFullScreen
                ? {
                    justifyContent: 'center',
                    width: hp('100%'),
                    height: wp('100%'),
                  }
                : {
                    justifyContent: 'center',
                    width: wp('100%'),
                    height: wp('100%') * (9 / 16),
                  }
            }>
            {loading ? (
              <ActivityIndicator color={'grey'} size={'small'} />
            ) : (
              <>
                <PlayerControls
                  onPlay={handlePlayPause}
                  onPause={handlePlayPause}
                  playing={isPlaying}
                  showSkip={true}
                  skipBackwards={skipBackward}
                  skipForwards={skipForward}
                  isFullScreen={isFullScreen}
                />
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration > 0 ? duration : 0}
                  onSlideStart={handlePlayPause}
                  onSlideComplete={handlePlayPause}
                  onSlideCapture={onSeek}
                />
              </>
            )}
          </ControlOverlay>
        </>
      )}
    </ToggleControls>
  );
};
