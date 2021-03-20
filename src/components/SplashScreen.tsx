import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertVisible} from '~/redux/alertSlice';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

// 앱을 켤 때 가장처음 나타나는 스플레쉬 스크린
export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);
  const {STORE} = useSelector((state: any) => state.userReducer);
  useEffect(() => {
    dispatch(setSplashVisible({visible: false}));
    dispatch(setAlertVisible(false));
    setTimeout(() => {
      STORE_DATA?.resultdata?.STORE_SEQ
        ? navigation.reset({
            index: 0,
            routes: [
              {
                name: 'LoggedInNavigation',
                state: {
                  routes: [
                    {
                      name: 'HomeScreen',
                      params: {
                        STORE_SEQ: STORE_DATA?.resultdata?.STORE_SEQ,
                        STORE,
                        STORE_NAME: STORE_DATA?.resultdata?.NAME,
                        WORKING_COUNT: STORE_DATA?.resultdata?.workinglist,
                        TOTAL_COUNT: STORE_DATA?.resultdata?.emplist,
                        GPS: STORE_DATA?.resultdata?.GPS,
                        QR_Num: STORE_DATA?.resultdata?.QR_Num,
                      },
                    },
                  ],
                },
              },
            ],
          })
        : navigation.reset({
            index: 0,
            routes: [
              {
                name: 'LoggedInNavigation',
                state: {routes: [{name: 'SelectStoreScreen'}]},
              },
            ],
          });
    }, 800);
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
