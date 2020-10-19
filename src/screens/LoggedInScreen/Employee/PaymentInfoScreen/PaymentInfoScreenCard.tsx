import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {ForwardIcon} from '~/constants/Icons';

const Touchable = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 10px;
  width: ${wp('100%') - 40}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background-color: white;
`;

const ImageArea = styled.View`
  margin: 0 10px;
  flex-direction: row;
  align-items: center;
`;

const TitleArea = styled.View`
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const SubText = styled.Text`
  margin-left: 3px;
  font-size: 12px;
`;

export default ({
  key,
  name,
  isManager,
  image,
  data,
  STORE,
  STORE_SEQ,
  STOREPAY_SHOW,
}) => {
  const navigation = useNavigation();
  const payInfo = () => {
    navigation.navigate('EmpPayInfoScreen', {
      STORE_SEQ,
      EMP_SEQ: data.EMP_SEQ,
      STORE,
      STOREPAY_SHOW,
      NAME: name,
      ISMANAGER: isManager,
    });
  };
  return (
    <Touchable key={key} onPress={() => payInfo()}>
      <ImageArea>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30}}
          source={{
            uri: 'http://133.186.210.223/uploads/' + image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TitleArea>
          <NameText>{name}</NameText>
          <SubText>[{isManager}]</SubText>
        </TitleArea>
      </ImageArea>
      <ForwardIcon size={22} color={'black'} />
    </Touchable>
  );
};
