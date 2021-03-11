import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
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

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const {uri, text, title} = params;

  useEffect(() => {
    navigation.setOptions({headerTitle: title});
  }, []);

  return (
    <WebView
      source={{uri}}
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
              width: 80,
              height: 80,
              marginBottom: 20,
            }}
            source={require('../assets/animations/loading2.json')}
            loop
            autoPlay
          />
          <Text>{text}</Text>
          <Text>잠시만 기다려주세요.</Text>
        </View>
      )}
    />
  );
};
