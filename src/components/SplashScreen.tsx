import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertVisible} from '~/redux/alertSlice';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSplashVisible({visible: false}));
    dispatch(setAlertVisible(false));
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoggedInNavigation',
            state: {routes: [{name: 'SelectStoreScreen'}]},
          },
        ],
      });
    }, 1500);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  });

  return (
    <Container>
      <Animatable.Image
        animation={{
          from: {opacity: 0},
          to: {opacity: 1},
        }}
        duration={2000}
        source={require('../assets/images/shopSol.png')}
        style={{height: 200, width: 200, bottom: 185}}
      />
    </Container>
  );
};
