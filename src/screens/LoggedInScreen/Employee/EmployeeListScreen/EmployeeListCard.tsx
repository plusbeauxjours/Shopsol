import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import {ForwardIcon} from '~/constants/Icons';

const Touchable = styled.TouchableOpacity`
  padding: 0 20px;
  height: ${hp('10%')}px;
  width: 100%;
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
`;

const NameBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${hp('0.5%')}px;
`;

const NameText = styled.Text`
  font-size: 15px;
  margin-right: ${wp('2%')};
`;

const PositionText = styled.Text`
  font-size: 13px;
`;

const WorkFromText = styled(PositionText)`
  color: grey;
`;

const DateText = styled.Text`
  color: gray;
  font-size: 12px;
`;

export default ({
  key,
  EMP_NAME,
  IS_MANAGER,
  image,
  START,
  END,
  data,
  onRefresh,
}) => {
  const navigation = useNavigation();
  return (
    <Touchable
      key={key}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('EmployeeInfoScreen', {data});
      }}>
      <FastImage
        style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
        source={{
          uri: 'http://133.186.210.223/uploads/' + image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <ContentBox>
        <NameBox>
          <NameText>{EMP_NAME}</NameText>
          <PositionText>[{IS_MANAGER}]</PositionText>
        </NameBox>
        <WorkFromText>근무기간</WorkFromText>
        <DateText>
          {START} ~ {END ?? '계속'}
        </DateText>
      </ContentBox>
      <ForwardIcon />
    </Touchable>
  );
};
