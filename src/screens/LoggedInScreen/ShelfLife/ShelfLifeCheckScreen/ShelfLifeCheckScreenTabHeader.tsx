import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {interpolateColor} from 'react-native-redash';

import utils from '~/constants/utils';

const ListContainer = styled.View`
  height: 50px;
  flex-direction: row;
  width: 100%;
  left: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  width: ${wp('100%') - 40}px;
  justify-content: space-between;
`;

const LineTextContainer = styled.View`
  align-self: flex-end;
  background-color: white;
  border-width: 1px;
  border-radius: 15px;
  padding: 5px 15px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  bottom: ${utils.isAndroid() ? 20 : isIphoneX() ? 68 : 40}px;
`;

const LineText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const Touchable = styled.TouchableOpacity``;

export default ({transition, tabs, gotoCategory, y, ready}) => {
  const opacity = transition;
  const updateBackColor = (anchor = 20, nextAnchor = 5000, color) => {
    return interpolateColor(y, {
      inputRange: [
        Number(anchor) + 325,
        Number(anchor) + 375,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 375,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 425,
      ],
      outputRange: ['white', color, color, 'white'],
    });
  };
  const updateFrontColor = (
    anchor = 20,
    nextAnchor = 5000,
    color = 'white',
  ) => {
    return interpolateColor(y, {
      inputRange: [
        Number(anchor) + 325,
        Number(anchor) + 375,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 375,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 425,
      ],
      outputRange: [color, 'white', 'white', color],
    });
  };

  const Tab = ({name, index, color, gotoCategory}) => {
    return (
      <Touchable onPress={() => gotoCategory(index)}>
        <LineTextContainer
          as={Animated.View}
          style={{
            borderColor: updateFrontColor(
              tabs[index].anchor,
              index !== 3 ? tabs[index + 1].anchor : tabs[3].anchor * 100,
              color,
            ),
            backgroundColor: updateBackColor(
              tabs[index].anchor,
              index !== 3 ? tabs[index + 1].anchor : tabs[3].anchor * 100,
              color,
            ),
          }}>
          <LineText
            as={Animated.Text}
            style={{
              color: updateFrontColor(
                tabs[index].anchor,
                index !== 3 ? tabs[index + 1].anchor : tabs[3].anchor * 100,
                color,
              ),
            }}>
            {name}
          </LineText>
        </LineTextContainer>
      </Touchable>
    );
  };

  const TabsContainer = ({tabs, gotoCategory}) => {
    return (
      <Row>
        {tabs[1].anchor <= tabs[2].anchor <= tabs[3].anchor &&
          tabs?.map((tab, index) => (
            <Tab
              key={index}
              index={index}
              color={index === 0 ? '#e85356' : '#7f7f7f'}
              gotoCategory={gotoCategory}
              {...tab}
            />
          ))}
      </Row>
    );
  };

  return (
    <ListContainer as={Animated.View} style={{opacity}}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
        }}>
        <TabsContainer {...{tabs}} gotoCategory={gotoCategory} />
      </Animated.View>
    </ListContainer>
  );
};
