import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import {ForwardIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

interface IText {
  color: string;
}

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

const InfoText = styled(DateText)<IText>`
  font-size: ${styleGuide.fontSize.middle}px;
  margin-top: 5px;
  color: ${(props) => props.color};
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

export default ({
  data,
  gotoHealthCertificateEmpDetail,
  gotoHealthCertificateEmpForm,
  MANAGER_CALLED,
}) => {
  const dday = moment(data?.PUSH_DAY).diff(moment(), 'days');
  if (data.RESULT_DATE) {
    return (
      <Touchable onPress={() => gotoHealthCertificateEmpDetail(data)}>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
          source={{
            uri: utils.getUriImage(data?.IMAGE),
            cache: FastImage.cacheControl.immutable,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <NameBox>
          <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
            <NameText>{data?.NAME}</NameText>
            <DateText>
              {data?.IS_MANAGER == '1' ? `[${MANAGER_CALLED}]` : '[직원]'}
            </DateText>
          </Row>
          {data?.RESULT_DATE ? (
            <InfoText
              color={dday <= 0 ? '#FF3D3D' : '#7e7c7c'}
              style={dday <= 0 && {textDecorationLine: 'underline'}}>
              검진일 : {moment(data?.RESULT_DATE).format('YYYY.MM.DD')} (갱신 D
              {dday <= 0 ? '+' : '-'}
              {Math.abs(Math.floor(dday))})
            </InfoText>
          ) : (
            <InfoText
              color={'#FF3D3D'}
              style={{textDecorationLine: 'underline'}}>
              보건증 미등록
            </InfoText>
          )}
        </NameBox>
        <IconContainer>
          <ForwardIcon />
        </IconContainer>
      </Touchable>
    );
  } else {
    return (
      <Touchable
        onPress={() =>
          gotoHealthCertificateEmpForm(
            data.NAME,
            data.EMP_SEQ,
            data.RESULT_COUNT,
          )
        }>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
          source={{
            uri: utils.getUriImage(data?.IMAGE),
            cache: FastImage.cacheControl.immutable,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <NameBox>
          <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
            <NameText>{data?.NAME}</NameText>
            <DateText>
              {data?.IS_MANAGER == '1' ? `[${MANAGER_CALLED}]` : '[직원]'}
            </DateText>
          </Row>
          {data?.RESULT_DATE ? (
            <InfoText
              color={dday <= 0 ? '#FF3D3D' : '#7e7c7c'}
              style={dday <= 0 && {textDecorationLine: 'underline'}}>
              검진일 : {moment(data?.RESULT_DATE).format('YYYY.MM.DD')}
            </InfoText>
          ) : (
            <InfoText
              color={'#FF3D3D'}
              style={{textDecorationLine: 'underline'}}>
              보건증 미등록
            </InfoText>
          )}
        </NameBox>
        <IconContainer>
          <ForwardIcon />
        </IconContainer>
      </Touchable>
    );
  }
};
