import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {ForwardIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Touchable = styled.TouchableOpacity`
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
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const DateText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
`;

const InfoText = styled(DateText)`
  font-size: ${styleGuide.fontSize.small}px;
  height: 15px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 5px;
`;

export default ({EMP_NAME, IS_MANAGER, data, image, mobileNo, START, END}) => {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('EmployeeInfoScreen', {data});
      }}>
      <FastImage
        style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
        source={{
          uri: `http://shopsolapi.shop-sol.com/uploads/${image}`,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <NameBox>
        <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
          <NameText>{EMP_NAME}</NameText>
          <DateText>[{IS_MANAGER}]</DateText>
        </Row>
        <InfoText>
          근무기간&nbsp;({moment().diff(moment(START), 'month')}개월)
        </InfoText>
        <InfoText>
          {moment(START).format('YYYY.MM.DD')} ~&nbsp;
          {END ? moment(END).format('YYYY.MM.DD') : '계속'}
        </InfoText>
        {data?.probationDATE && data?.probationPercent && (
          <InfoText>
            수습기간&nbsp;
            {moment() > moment(data?.probationDATE)
              ? `종료 (${data?.probationPercent}%적용)`
              : `${moment(data?.probationDATE).format('~YYYY.MM.DD')}까지 (${
                  data?.probationPercent
                }%적용)`}
          </InfoText>
        )}
      </NameBox>
      <IconContainer>
        <ForwardIcon />
      </IconContainer>
    </Touchable>
  );
};
