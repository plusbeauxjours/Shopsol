import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

const Box = styled.View``;
const Text = styled.Text``;

export default ({dates, minY, maxY, step}) => {
  const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box style={{flex: 1, justifyContent: 'space-between'}}>
        {[1, 0.66, 0.33, 0].map((t) => {
          return (
            <Box
              key={t}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 30,
                top: t === 0 ? 15 : t === 1 ? -15 : 0,
              }}>
              <Box>
                <Text style={{color: 'darkGrey', textAlign: 'right'}}>
                  {Math.round(lerp(minY, maxY, t))}
                </Text>
              </Box>
              <Box style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
