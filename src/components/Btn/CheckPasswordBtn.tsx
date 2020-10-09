import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import utils from '~/constants/utils';

const CheckPasswordButton = styled.TouchableWithoutFeedback`
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
`;

export default ({onPress, isPasswordSeen}) => {
  return (
    <CheckPasswordButton onPress={() => onPress()}>
      {isPasswordSeen ? (
        <Icon
          name={utils.isAndroid ? 'md-eye' : 'ios-eye'}
          size={24}
          color="#aaa"
        />
      ) : (
        <Icon
          name={utils.isAndroid ? 'md-eye-off' : 'ios-eye-off'}
          size={24}
          color="#ddd"
        />
      )}
    </CheckPasswordButton>
  );
};
