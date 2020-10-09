import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {CartIcon} from '~/constants/Icons';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  padding: 5px;
`;

const Text = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

export default () => {
  const navigation = useNavigation();
  return (
    <Touchable onPress={() => navigation.navigate('AddShelfLifeScreen')}>
      <CartIcon size={22} color="white" />
      <Text>등록하기</Text>
    </Touchable>
  );
};
