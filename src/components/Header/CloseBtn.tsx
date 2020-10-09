import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {CloseIcon} from '~/constants/Icons';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
`;

export default () => {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        navigation.goBack();
      }}>
      <CloseIcon size={24} color="white" />
    </Touchable>
  );
};
