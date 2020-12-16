import React from 'react';
import styled from 'styled-components/native';

import FastImage from 'react-native-fast-image';

import {ForwardIcon, PhoneIcon} from '~/constants/Icons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

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
  font-size: 15px;
`;

const DateText = styled.Text`
  color: #707070;
  font-size: 12px;
`;

const PayText = styled(DateText)`
  height: 15px;
  font-size: 10px;
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
      MEMBER_NAME: name,
      IS_MANAGER: isManager,
      EMP_PAY_TYPE: data?.PAY_TYPE,
      PAY: data?.PAY,
      image,
      START: data?.START,
      END: data?.END,
    });
  };
  return (
    <Touchable key={key} onPress={() => payInfo()}>
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
          <NameText>{name}</NameText>
          <DateText>[{isManager}]</DateText>
        </Row>
        <PayText>
          {data?.PAY_TYPE === '0' && '시급'}
          {data?.PAY_TYPE === '1' && '일급'}
          {data?.PAY_TYPE === '2' && '월급'}&nbsp;
          {data?.PAY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </PayText>
        <PayText>
          근무기간&nbsp;({moment().diff(moment(data?.START), 'month')}개월)
        </PayText>
        <PayText>
          {moment(data?.START).format('YYYY.MM.DD')} ~&nbsp;
          {data?.END ? moment(data?.END).format('YYYY.MM.DD') : '계속'}
        </PayText>
      </NameBox>
      <IconContainer>
        <ForwardIcon />
      </IconContainer>
    </Touchable>
  );
};
