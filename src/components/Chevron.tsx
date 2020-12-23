import React from 'react';
import {processColor} from 'react-native';
import Animated from 'react-native-reanimated';
import {mix, mixColor} from 'react-native-redash';
import styled from 'styled-components/native';

import {DownIcon} from '~/constants/Icons';

const IconContainer = styled.View`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  padding-left: 1px;
  padding-top: 1px;
  justify-content: center;
  align-items: center;
  margin-bottom: 1px;
`;

export default ({transition}) => {
  const rotateZ = mix(transition, Math.PI, 0);
  const backgroundColor = mixColor(
    transition,
    processColor('#ddd'),
    processColor('#e85356'),
  ) as Animated.Node<number>;
  return (
    <IconContainer
      as={Animated.View}
      style={[{transform: [{rotateZ}], backgroundColor}]}>
      <DownIcon size={15} />
    </IconContainer>
  );
};