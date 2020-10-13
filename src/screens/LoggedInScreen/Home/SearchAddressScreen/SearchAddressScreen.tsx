import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default ({route: {params}}) => {
  const navigation = useNavigation();

  const choseAddress = (data) => {
    const {addr, lat, long} = JSON.parse(data.data);
    navigation.navigate(
      params?.screen == 0 ? 'AddStoreScreen' : 'UpdateStoreScreen',
      {addr, lat, long},
    );
  };

  return (
    <BackGround>
      <WebView
        source={{uri: 'http://133.186.210.223/Shopsol/zipcodern'}}
        style={{flex: 1}}
        onMessage={(event) => {
          choseAddress(event.nativeEvent);
        }}
      />
    </BackGround>
  );
};
