import React from 'react';
import styled from 'styled-components/native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {ForwardIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

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
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const DateText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
`;

const PayText = styled(DateText)`
  height: 15px;
  font-size: ${styleGuide.fontSize.small}px;
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

export default ({MANAGER_CALLED, data, STORE, STORE_SEQ, STOREPAY_SHOW}) => {
  const navigation = useNavigation();
  const gotoPayInfo = () => {
    navigation.navigate('EmpPayInfoScreen', {
      STORE_SEQ,
      EMP_SEQ: data.EMP_SEQ,
      STORE,
      STOREPAY_SHOW,
      MEMBER_NAME: data?.EMP_NAME,
      IS_MANAGER: data?.IS_MANAGER,
      EMP_PAY_TYPE: data?.PAY_TYPE,
      PAY: data?.PAY,
      image: data?.images[0].IMAGE,
      START: data?.START,
      END: data?.END,
      probationDATE: data?.probationDATE,
      probationPercent: data?.probationPercent,
    });
  };
  return (
    <Touchable onPress={() => gotoPayInfo()}>
      <FastImage
        style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
        source={{
          uri: `http://shopsolapi.shop-sol.com/uploads/${data?.images[0].IMAGE}`,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <NameBox>
        <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
          <NameText>{data?.EMP_NAME}</NameText>
          <DateText>
            {data?.IS_MANAGER == '1' ? `[${MANAGER_CALLED}]` : '[직원]'}
          </DateText>
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
        {data?.probationDATE && data?.probationPercent && (
          <PayText>
            수습기간&nbsp;
            {moment() > moment(data?.probationDATE)
              ? `종료 (${data?.probationPercent}%적용)`
              : `${moment(data?.probationDATE).format('~YYYY.MM.DD')}까지 (${
                  data?.probationPercent
                }%적용)`}
          </PayText>
        )}
      </NameBox>
      <IconContainer>
        <ForwardIcon />
      </IconContainer>
    </Touchable>
  );
};
