import React from 'react';
import styled from 'styled-components/native';
import {EyeOnIcon, EyeOffIcon} from '~/constants/Icons';

const CheckPasswordButton = styled.TouchableWithoutFeedback`
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
`;

export default ({onPress, isPasswordSeen}) => {
  return (
    <CheckPasswordButton onPress={() => onPress()}>
      {isPasswordSeen ? <EyeOnIcon /> : <EyeOffIcon />}
    </CheckPasswordButton>
  );
};
