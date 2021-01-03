import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {CartIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  padding: 5px;
`;

const Text = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.small}px;
  font-weight: ${styleGuide.fontWeight.bold};
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
