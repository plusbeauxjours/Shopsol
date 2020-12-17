import React from 'react';
import styled from 'styled-components/native';
import {AddCircleIcon, RemoveCircleIcon} from '~/constants/Icons';

const Row = styled.View`
  padding: 5px;
  margin: 0 20px;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.View`
  flex: 1;
  align-items: center;
`;

const NameText = styled.Text`
  color: #7f7f7f;
  font-size: 16px;
`;

const Phone = styled(Name)`
  flex: 1.5;
`;

const PhoneText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const IconContainer = styled.View`
  font-size: 14px;
  color: #b91c1b;
  padding: 5px 10px;
`;

export default ({name, phone, isSearched}) => (
  <Row>
    <Name>
      <NameText>{name}</NameText>
    </Name>
    <Phone>
      <PhoneText>{phone}</PhoneText>
    </Phone>
    <IconContainer>
      {isSearched ? (
        <AddCircleIcon size={24} />
      ) : (
        <RemoveCircleIcon size={24} />
      )}
    </IconContainer>
  </Row>
);
