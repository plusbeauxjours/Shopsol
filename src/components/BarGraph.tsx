import React from 'react';
import Svg, {G, Line, Rect} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import styleGuide from '~/constants/styleGuide';
import styled from 'styled-components/native';
import moment from 'moment';

const MiddleText = styled.Text`
  position: absolute;
  font-size: ${styleGuide.fontSize.small}px;
  color: ${styleGuide.palette.greyColor};
`;

const MaxText = styled.Text`
  position: absolute;
  right: 0;
  font-size: ${styleGuide.fontSize.small}px;
  color: ${styleGuide.palette.greyColor};
`;

const Container = styled.View`
  margin-top: 5px;
`;

export default ({
  TOTAL_WORKING,
  height = 12,
  width = wp('100%') - 130,
  middle,
  max,
}) => {
  // 사업장현황, 유통기한, 업무캘린더에서 사용중인 에니메이션 도넛그래프
  return (
    <Container style={{width}}>
      <Svg
        height={height}
        width={width}
        stroke={styleGuide.palette.borderColor}
        strokeWidth="2">
        <G rotation="0">
          <Rect
            rx={5}
            x={0}
            y={0}
            width={(TOTAL_WORKING / max) * width}
            height={height}
            fill={
              TOTAL_WORKING > middle
                ? styleGuide.palette.searchBarColor
                : styleGuide.palette.rippleColor
            }
          />
          <Rect
            rx={5}
            x={(TOTAL_WORKING / max) * width}
            y={0}
            width={width - (TOTAL_WORKING / max) * width}
            height={height}
            fill={styleGuide.palette.borderColor}
          />
          <Line
            x1={(middle / max) * width}
            y={0}
            x2={(middle / max) * width}
            y2={height}
            stroke={styleGuide.palette.redColor}
            strokeWidth="4"
          />
          <Line
            x1={width}
            y={0}
            x2={width}
            y2={height}
            stroke={styleGuide.palette.greyColor}
            strokeWidth="1"
          />
        </G>
      </Svg>
      <MiddleText style={{right: width - (middle / max) * width}}>
        {moment.duration(middle).asHours()}&nbsp;
      </MiddleText>
      <MaxText>{moment.duration(max).asHours()}&nbsp;</MaxText>
    </Container>
  );
};
