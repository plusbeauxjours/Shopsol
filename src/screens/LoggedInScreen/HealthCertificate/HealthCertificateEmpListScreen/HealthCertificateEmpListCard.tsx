import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import FastImage from 'react-native-fast-image';
import {ForwardIcon} from '~/constants/Icons';

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
  color: #707070;
  font-size: 16px;
`;

const DateText = styled.Text`
  color: #707070;
  font-size: 12px;
`;

const InfoText = styled(DateText)<IText>`
  font-size: 12px;
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
  key,
  data,
  gotoHealthCertificateEmpDetail,
  gotoHealthCertificateEmpForm,
}) => {
  const dday = moment(data?.PUSH_DAY).diff(moment(), 'days');
  if (data.RESULT_DATE) {
    return (
      <Touchable key={key} onPress={() => gotoHealthCertificateEmpDetail(data)}>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
          source={{
            uri: `http://133.186.210.223/uploads/${data?.IMAGE}`,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <NameBox>
          <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
            <NameText>{data?.NAME}</NameText>
            <DateText>
              [{data?.IS_MANAGER == '1' ? '매니저' : '스태프'}]
            </DateText>
          </Row>
          {data?.RESULT_DATE ? (
            <InfoText
              color={dday <= 0 ? '#CE0505' : '#7e7c7c'}
              style={dday <= 0 && {textDecorationLine: 'underline'}}>
              검진일 : {moment(data?.RESULT_DATE).format('YYYY.MM.DD')} (갱신 D
              {dday <= 0 ? '+' : '-'}
              {Math.abs(Math.floor(dday))})
            </InfoText>
          ) : (
            <InfoText
              color={'#CE0505'}
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
        key={key}
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
            uri: `http://133.186.210.223/uploads/${data?.IMAGE}`,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <NameBox>
          <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
            <NameText>{data?.NAME}</NameText>
            <DateText>
              [{data?.IS_MANAGER == '1' ? '매니저' : '스태프'}]
            </DateText>
          </Row>
          {data?.RESULT_DATE ? (
            <InfoText
              color={dday <= 0 ? '#CE0505' : '#7e7c7c'}
              style={dday <= 0 && {textDecorationLine: 'underline'}}>
              검진일 : {moment(data?.RESULT_DATE).format('YYYY.MM.DD')}
            </InfoText>
          ) : (
            <InfoText
              color={'#CE0505'}
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
