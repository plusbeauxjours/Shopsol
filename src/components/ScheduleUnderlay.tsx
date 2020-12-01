import React from 'react';
import styled from 'styled-components/native';
import Dash from 'react-native-dash';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const BoxContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${wp('100%') - 90}px;
`;

const MainBox = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const GreyLine = styled.View`
  background-color: #ccc;
  width: 0.5;
  height: 100%;
`;

export default () => {
  return (
    <BoxContainer>
      <MainBox>
        {[0, 0.25, 0.5, 0.75, 1].map((i, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <>
                <Dash
                  dashGap={4}
                  dashLength={4}
                  dashThickness={0.5}
                  dashColor={'#ccc'}
                  style={{
                    width: 0.5,
                    height: '100%',
                    flexDirection: 'column',
                  }}
                />
                <Dash
                  dashGap={4}
                  dashLength={4}
                  dashThickness={0.5}
                  dashColor={'#ccc'}
                  style={{
                    width: 0.5,
                    height: '100%',
                    flexDirection: 'column',
                  }}
                />
                <GreyLine />
                <Dash
                  dashGap={4}
                  dashLength={4}
                  dashThickness={0.5}
                  dashColor={'#ccc'}
                  style={{
                    width: 0.5,
                    height: '100%',
                    flexDirection: 'column',
                  }}
                />
                <Dash
                  dashGap={4}
                  dashLength={4}
                  dashThickness={0.5}
                  dashColor={'#ccc'}
                  style={{
                    width: 0.5,
                    height: '100%',
                    flexDirection: 'column',
                  }}
                />
              </>
            )}
            <GreyLine />
          </React.Fragment>
        ))}
      </MainBox>
    </BoxContainer>
  );
};
