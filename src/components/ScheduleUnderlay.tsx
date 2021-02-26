import React from 'react';
import styled from 'styled-components/native';
import Dash from 'react-native-dash';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface ILine {
  index?: number;
}

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

const GreyLine = styled.View<ILine>`
  background-color: ${(props) => (props.index == 9 ? '#efefef' : '#ccc')};
  width: 0.5px;
  height: 100%;
`;

export default () => (
  <BoxContainer>
    <MainBox>
      {['_', '0', null, '0.25', null, '0.5', null, '0.75', null, '1'].map(
        (_, index) => {
          if (_) {
            return (
              <React.Fragment key={index}>
                {index == 0 ? (
                  <>
                    <GreyLine style={{backgroundColor: '#efefef'}} />
                    <Dash
                      dashGap={4}
                      dashLength={4}
                      dashThickness={0.5}
                      dashColor={'#efefef'}
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
                      dashColor={'#efefef'}
                      style={{
                        width: 0.5,
                        height: '100%',
                        flexDirection: 'column',
                      }}
                    />
                  </>
                ) : index == 9 ? (
                  <>
                    <Dash
                      dashGap={4}
                      dashLength={4}
                      dashThickness={0.5}
                      dashColor={'#efefef'}
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
                      dashColor={'#efefef'}
                      style={{
                        width: 0.5,
                        height: '100%',
                        flexDirection: 'column',
                      }}
                    />
                  </>
                ) : (
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
                <GreyLine index={index} />
              </React.Fragment>
            );
          }
        },
      )}
    </MainBox>
  </BoxContainer>
);
