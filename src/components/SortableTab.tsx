import React, {useEffect, useState, useMemo} from 'react';
import Animated, {
  Value,
  add,
  cond,
  eq,
  block,
  set,
  useCode,
  multiply,
  divide,
  and,
  round,
} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  moving,
  panGestureHandler,
  withSpringTransition,
} from 'react-native-redash';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

export const withOffset = ({
  offset,
  value,
  state: gestureState,
}: {
  offset: Animated.Adaptable<number>;
  value: Animated.Value<number>;
  state: Animated.Value<State>;
}) => {
  const safeOffset = new Value(0);
  return cond(
    eq(gestureState, State.ACTIVE),
    add(safeOffset, value),
    set(safeOffset, offset),
  );
};

const TAB_COLUMNS = 2;
const TAB_SIZE = wp('100%') / TAB_COLUMNS;

const Item = styled.TouchableOpacity`
  width: ${TAB_SIZE}px;
  height: ${TAB_SIZE}px;
  background-color: red;
`;

const Text = styled.Text``;

export default ({emp, index, offsets}) => {
  const [isAlreadyAnimated, setIsAlreadyAnimated] = useState<boolean>(false);
  const {gestureHandler, state, translation, velocity} = panGestureHandler();
  const currentOffset = offsets[index];
  const x = withOffset({
    value: translation.x,
    offset: currentOffset.x,
    state,
  });
  const y = withOffset({
    value: translation.y,
    offset: currentOffset.y,
    state,
  });
  const zIndex = cond(eq(state, State.ACTIVE), 200, cond(moving(y), 100, 1));
  const offsetX = multiply(round(divide(x, TAB_SIZE)), TAB_SIZE);

  const offsetY = multiply(round(divide(y, TAB_SIZE)), TAB_SIZE);
  const translateX = withSpringTransition(x, {}, velocity.x, state);
  console.log(translateX);
  const translateY = withSpringTransition(y, {}, velocity.y, state);
  useCode(
    () =>
      block(
        offsets.map((offset) =>
          cond(
            and(
              eq(offsetX, offset.x),
              eq(offsetY, offset.y),
              eq(state, State.ACTIVE),
            ),
            [
              set(offset.x, currentOffset.x),
              set(offset.y, currentOffset.y),
              set(currentOffset.x, offsetX),
              set(currentOffset.y, offsetY),
            ],
          ),
        ),
      ),
    [currentOffset.x, currentOffset.y, offsetX, offsetY, offsets, state],
  );

  useEffect(() => {
    setIsAlreadyAnimated(true);
  }, []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: TAB_SIZE,
          height: TAB_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{translateX}, {translateY}],
          zIndex,
        }}>
        <Item onPress={() => console.log('lp')}>
          <Text>jiji</Text>
        </Item>
      </Animated.View>
    </PanGestureHandler>
  );
};
