import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {interpolateColor} from 'react-native-redash';

import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

const ListContainer = styled.View`
  height: 50px;
  flex-direction: row;
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  width: ${wp('100%') - 40}px;
  justify-content: space-between;
`;

const LineTextContainer = styled.View`
  background-color: white;
  border-width: 1px;
  border-radius: 15px;
  padding: 5px 10px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: ${utils.isAndroid() ? 30 : 2}px;
`;

const LineText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: white;
`;

const Touchable = styled.TouchableOpacity``;

export default ({transition, tabs, gotoCategory, y, ready}) => {
  const opacity = transition;
  // 앵커된 y값에 다다르면 헤더이있는 인덱스가 이동(바탕색)
  const updateBackColor = (anchor = 20, nextAnchor = 5000, color) => {
    return interpolateColor(y, {
      inputRange: [
        //앵커된y 전, 앵커된 y, 다음 앵커된 y, 다음 앵커된 y 후
        Number(anchor) + 250,
        Number(anchor) + 260,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 260,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 270,
      ],
      outputRange: ['white', color, color, 'white'],
    });
  };
  // 앵커된 y값에 다다르면 헤더이있는 인덱스가 이동(글자색)
  const updateFrontColor = (
    anchor = 20,
    nextAnchor = 5000,
    color = 'white',
  ) => {
    return interpolateColor(y, {
      inputRange: [
        //앵커된y 전, 앵커된 y, 다음 앵커된 y, 다음 앵커된 y 후
        Number(anchor) + 250,
        Number(anchor) + 260,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 260,
        Number(anchor > nextAnchor ? anchor : nextAnchor) + 270,
      ],
      outputRange: [color, 'white', 'white', color],
    });
  };

  // 헤더에 있는 인덱스 컴퍼넌트
  const Tab = ({name, index, color, gotoCategory}) => {
    return (
      <Touchable onPress={() => gotoCategory(index)}>
        <LineTextContainer
          as={Animated.View}
          style={{
            borderColor: updateFrontColor(
              tabs[index].anchor,
              index !== 4 ? tabs[index + 1].anchor : tabs[4].anchor * 100,
              color,
            ),
            backgroundColor: updateBackColor(
              tabs[index].anchor,
              index !== 4 ? tabs[index + 1].anchor : tabs[4].anchor * 100,
              color,
            ),
          }}>
          <LineText
            as={Animated.Text}
            style={{
              color: updateFrontColor(
                tabs[index].anchor,
                index !== 4 ? tabs[index + 1].anchor : tabs[4].anchor * 100,
                color,
              ),
            }}>
            {name}
          </LineText>
        </LineTextContainer>
      </Touchable>
    );
  };

  // 앵커된 y값에 다다르면 스르르 나타나는 헤더
  const TabsContainer = ({tabs, gotoCategory}) => {
    return (
      <Row>
        {tabs[1].anchor <= tabs[3].anchor <= tabs[4].anchor &&
          tabs?.map((tab, index) => (
            <Tab
              key={index}
              index={index}
              color={
                index === 0 || index === 1
                  ? styleGuide.palette.donutColor
                  : styleGuide.palette.greyColor
              }
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
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <TabsContainer {...{tabs}} gotoCategory={gotoCategory} />
      </Animated.View>
    </ListContainer>
  );
};
