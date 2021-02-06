import React from 'react';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const View = styled.View`
  flex: 1;
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding-bottom: 200px;
`;

const Text = styled.Text`
  bottom: 10px;
`;

export default () => {
  return (
    <WebView
      style={{flex: 1, width: wp('100%'), height: hp('100%')}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      sharedCookiesEnabled={true}
      originWhitelist={['*']}
      scalesPageToFit={true}
      startInLoadingState={true}
      mixedContentMode={'always'}
      allowsInlineMediaPlayback={true}
      allowsFullscreenVideo={true}
      allowsBackForwardNavigationGestures={true}
      allowsLinkPreview={false}
      renderLoading={() => (
        <View>
          <LottieView
            style={{
              width: 150,
              height: 150,
              marginBottom: 20,
            }}
            source={require('../assets/animations/loading.json')}
            loop
            autoPlay
          />
          <Text>샵솔 약관을 불러오는 중입니다.</Text>
          <Text>잠시만 기다려주세요.</Text>
        </View>
      )}
      source={{
        uri: `https://www.notion.so/wesop/d13606c443f843d69fdb2c8e8e84ad1b`,
      }}
    />
  );
};
