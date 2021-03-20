import React from 'react';
import styled from 'styled-components/native';
import {EyeOnIcon, EyeOffIcon} from '~/constants/Icons';

const CheckPasswordButton = styled.TouchableOpacity`
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
`;

// 페스워드 입력폼의 오른쪽 눈알
export default ({onPress, isEmpty, isPasswordSeen}) => {
  return (
    <CheckPasswordButton activeOpacity={1} onPress={() => onPress()}>
      {isPasswordSeen && !isEmpty ? <EyeOnIcon /> : <EyeOffIcon />}
    </CheckPasswordButton>
  );
};
