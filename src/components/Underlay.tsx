import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import styleGuide from '~/constants/styleGuide';

const BoxContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: -30px;
`;
const MainBox = styled.View`
  flex: 1;
  justify-content: space-between;
`;
const TextBox = styled.View`
  width: 30px;
  align-items: center;
`;
const Box = styled.View``;
const Text = styled.Text`
  font-size: 9px;
  color: ${styleGuide.palette.greyColor};
`;

// 주별 사업장현황의 막대그래프 아래의 시간
export default ({minY, maxY}) => {
  const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;
  return (
    <BoxContainer>
      <MainBox>
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
              <TextBox>
                {Math.trunc(
                  moment.duration(Math.round(lerp(minY, maxY, t))).asHours(),
                ) > 0 && (
                  <Text>
                    {Math.trunc(
                      moment
                        .duration(Math.round(lerp(minY, maxY, t)))
                        .asHours(),
                    )}
                    시간
                  </Text>
                )}
                {moment.duration(Math.round(lerp(minY, maxY, t))).minutes() >
                  0 && (
                  <Text>
                    {moment.duration(Math.round(lerp(minY, maxY, t))).minutes()}
                    분
                  </Text>
                )}
              </TextBox>
              <Box style={{flex: 1, height: 0.5, backgroundColor: '#ccc'}} />
            </Box>
          );
        })}
      </MainBox>
    </BoxContainer>
  );
};
