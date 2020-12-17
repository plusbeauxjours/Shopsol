import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';

import {ForwardIcon, PhoneIcon} from '~/constants/Icons';
import moment from 'moment';

const Touchable = styled.TouchableOpacity`
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NameBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const NameText = styled.Text`
  margin-right: 10px;
  color: #707070;
  font-size: 16px;
`;

const DateText = styled.Text`
  color: #707070;
  font-size: 12px;
`;

const InfoText = styled(DateText)`
  font-size: 10px;
  height: 15px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 20px;
`;

export default ({
  key,
  EMP_NAME,
  IS_MANAGER,
  data,
  image,
  mobileNo,
  START,
  END,
}) => {
  const navigation = useNavigation();
  return (
    <Touchable
      key={key}
      onPress={() => {
        navigation.navigate('EmployeeInfoScreen', {data});
      }}>
      <FastImage
        style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
        source={{
          uri: `http://133.186.210.223/uploads/${image}`,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <NameBox>
        <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
          <NameText>{EMP_NAME}</NameText>
          <DateText>[{IS_MANAGER}]</DateText>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <PhoneIcon color={'#707070'} />
          <InfoText style={{marginLeft: 5}}>{mobileNo}</InfoText>
        </Row>
        <InfoText>
          근무기간&nbsp;({moment().diff(moment(START), 'month')}개월)
        </InfoText>
        <InfoText>
          {moment(START).format('YYYY.MM.DD')} ~&nbsp;
          {END ? moment(END).format('YYYY.MM.DD') : '계속'}
        </InfoText>
      </NameBox>
      <IconContainer>
        <ForwardIcon />
      </IconContainer>
    </Touchable>
  );
};
