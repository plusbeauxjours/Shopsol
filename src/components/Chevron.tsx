import React from 'react';
import {processColor} from 'react-native';
import Animated from 'react-native-reanimated';
import {mix, mixColor} from 'react-native-redash';
import styled from 'styled-components/native';

import {DownIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

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

// 에니며이션되는 아커디언의 아이콘, 탭하면 돌면서 에니메이션 됨
export default ({transition}) => {
  const rotateZ = mix(transition, Math.PI, 0);
  const backgroundColor = mixColor(
    transition,
    processColor('#ddd'),
    processColor(styleGuide.palette.primary),
  ) as Animated.Node<number>;
  return (
    <IconContainer
      as={Animated.View}
      style={[{transform: [{rotateZ}], backgroundColor}]}>
      <DownIcon size={15} />
    </IconContainer>
  );
};
