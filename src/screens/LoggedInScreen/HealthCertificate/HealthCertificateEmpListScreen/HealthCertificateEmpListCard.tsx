import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';

import {EllipseIcon} from '~/constants/Icons';

interface IText {
  color: string;
}

const AddressBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;
const AddressText = styled.Text<IText>`
  font-size: 13px;
  margin-left: 3px;
  color: ${(props) => props.color};
`;

const NameText = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const Container = styled.TouchableOpacity`
  flex: 1;
  width: ${wp('100%') - 40}px;
  padding: 20px;
  background-color: white;
  justify-content: center;
  margin-bottom: 20px;
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
      <Container key={key} onPress={() => gotoHealthCertificateEmpDetail(data)}>
        <NameText>
          {data?.NAME}[{data?.IS_MANAGER === '1' ? '매니저' : '스태프'}]
        </NameText>
        <AddressBox>
          {data?.RESULT_DATE && dday > 0 ? (
            <EllipseIcon size={8} color={'#7e7c7c'} />
          ) : (
            <EllipseIcon size={8} color={'#CE0505'} />
          )}
          {data?.RESULT_DATE ? (
            <AddressText
              color={dday <= 0 ? '#CE0505' : '#7e7c7c'}
              style={dday <= 0 && {textDecorationLine: 'underline'}}>
              검진일 : {data?.RESULT_DATE} (갱신 D{dday <= 0 ? '+' : '-'}
              {Math.abs(Math.floor(dday))})
            </AddressText>
          ) : (
            <AddressText
              color={'#CE0505'}
              style={{textDecorationLine: 'underline'}}>
              보건증 미등록
            </AddressText>
          )}
        </AddressBox>
      </Container>
    );
  } else {
    return (
      <Container
        key={key}
        onPress={() =>
          gotoHealthCertificateEmpForm(
            data.NAME,
            data.EMP_SEQ,
            data.RESULT_COUNT,
          )
        }>
        <NameText>
          {data?.NAME}[{data?.IS_MANAGER == '1' ? '매니저' : '스태프'}]
        </NameText>
        <AddressBox>
          {data?.RESULT_DATE ? (
            <EllipseIcon size={8} color={'#7e7c7c'} />
          ) : (
            <EllipseIcon size={8} color={'#CE0505'} />
          )}
          {data?.RESULT_DATE ? (
            <AddressText
              color={dday <= 0 ? '#CE0505' : '#7e7c7c'}
              style={dday <= 0 && {textDecorationLine: 'underline'}}>
              검진일 : {data?.RESULT_DATE}
            </AddressText>
          ) : (
            <AddressText
              color={'#CE0505'}
              style={{textDecorationLine: 'underline'}}>
              보건증 미등록
            </AddressText>
          )}
        </AddressBox>
      </Container>
    );
  }
};
