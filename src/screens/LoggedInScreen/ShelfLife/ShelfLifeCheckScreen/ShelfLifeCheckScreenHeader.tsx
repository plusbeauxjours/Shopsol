import React from 'react';
import Animated from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import {useSafeArea} from 'react-native-safe-area-context';

import ShelfLifeCheckScreenTabHeader from './ShelfLifeCheckScreenTabHeader';
import styled from 'styled-components/native';

export const MIN_HEADER_HEIGHT = 45;
const {useCode, greaterThan, set, block} = Animated;

const HeaderBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 50px;
  flex-direction: row;
  background-color: white;
  align-items: center;
`;

const HeaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export default ({y, tabs, gotoCategory, ready}) => {
  const toggle = useValue<0 | 1>(0);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, {duration: 200});
  const {top: paddingTop} = insets;
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, 350))]), [toggle, y]);
  return (
    <HeaderContainer as={Animated.View} style={{paddingTop}}>
      <HeaderBackground as={Animated.View} style={{opacity}} />
      <ShelfLifeCheckScreenTabHeader
        transition={transition}
        y={y}
        tabs={tabs}
        gotoCategory={gotoCategory}
        ready={ready}
      />
    </HeaderContainer>
  );
};
