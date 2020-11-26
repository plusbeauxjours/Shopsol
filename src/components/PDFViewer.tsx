import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pdf from 'react-native-pdf';
import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Orientation from 'react-native-orientation-locker';

import Loader from '~/components/Loader';
import {
  PortraitIcon,
  LandscapeIcon,
  CloseCircleOutlineIcon,
} from '../constants/Icons';

interface IsFullScreen {
  isFullScreen: boolean;
}

const PdfContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  function handleFullscreen() {
    isFullScreen
      ? (Orientation.lockToPortrait(), setIsFullScreen(false))
      : (Orientation.lockToLandscapeLeft(), setIsFullScreen(true));
  }

  useEffect(() => {
    StatusBar.setHidden(true);
    setIsFullScreen(false);
  }, []);

  useEffect(() => {
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  return (
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
      <PdfContainer>
        <Pdf
          source={{uri: url}}
          onError={(e) => {
            console.log(e);
            setModalVisible(false);
          }}
          onPressLink={(uri) => {
            <WebView source={{uri}} />;
          }}
          scale={isFullScreen ? 2.2 : 1}
          activityIndicator={<Loader />}
          style={
            isFullScreen
              ? {width: hp('100%'), height: wp('100%')}
              : {width: wp('100%'), height: hp('100%')}
          }
        />
      </PdfContainer>
    </>
  );
};
