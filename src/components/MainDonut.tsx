import React, {useEffect, useRef} from 'react';
import {Easing, Animated, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import styled from 'styled-components/native';

const View = styled.View`
  width: 0px;
  height: 0px;
  justify-content: center;
  align-items: center;
`;

export default ({
  percentage,
  radius,
  strokeWidth = 13,
  delay = 200,
  duration = 400,
  color,
  strokeOpacity = color == '#ea1901' ? '0.1' : '0.4',
  max,
}) => {
  const animated = useRef(new Animated.Value(0)).current;
  const circleRef = useRef(null);
  const inputRef = useRef(null);
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
          />
        </G>
      </Svg>
    </View>
  );
};
