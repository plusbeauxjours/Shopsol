import React, {useState} from 'react';

import Animated from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Chevron from '~/components/Chevron';

const {interpolate} = Animated;

const LIST_ITEM_HEIGHT = 55;

const View = styled.View`
  margin-bottom: 20px;
`;

const HiddenItems = styled.View`
  overflow: hidden;
`;

const ListContainer = styled.View`
  margin-top: 16px;
  background-color: white;
  padding: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${wp('100%') - 40}px;
  padding: 20px;
  background-color: white;
`;

const TotalContainer = styled.View`
  width: ${wp('100%') - 40}px;
  background-color: white;
  align-items: flex-end;
  padding: 20px;
`;

const Text = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const PointsContainer = styled.View`
  border-radius: 8px;
  background-color: #44c282;
  padding: 8px;
`;

const ListItemContainer = styled.View`
  width: ${wp('100%') - 40}px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  height: 55px;
`;

const Touchable = styled.TouchableWithoutFeedback``;

const BorderFooter = styled.View`
  width: ${wp('100%') - 40}px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: white;
  height: 40px;
`;

export default ({list}) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const height = mix(transition, 0, LIST_ITEM_HEIGHT * list.items.length);
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  const Item = ({item, isLast}) => {
    return (
      <ListItemContainer>
        <Text>{item.name}</Text>
        <PointsContainer>
          <Text>{item.points}</Text>
        </PointsContainer>
      </ListItemContainer>
    );
  };

  return (
    <View>
      <Touchable onPress={() => setOpen((prev) => !prev)}>
        <ListContainer
          as={Animated.View}
          style={[
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}>
          <Text>Total Points</Text>
          <Chevron {...{transition}} />
        </ListContainer>
      </Touchable>
      <TotalContainer>
        <Text>Total Points</Text>
      </TotalContainer>
      <HiddenItems as={Animated.View} style={{height}}>
        {list.items.map((item, key) => (
          <Item key={key} isLast={key === list.items.length - 1} {...{item}} />
        ))}
      </HiddenItems>
      <BorderFooter />
    </View>
  );
};
