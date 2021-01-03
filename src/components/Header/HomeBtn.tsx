import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {HomeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.small}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

export default () => {
  const navigation = useNavigation();

  const {STORE} = useSelector((state: any) => state.userReducer);
  const {
    STORE_SEQ = null,
    STORE_NAME = null,
    STORE_DATA: {
      workinglist: WORKING_COUNT = null,
      emplist: TOTAL_COUNT = null,
    } = {},
  } = useSelector((state: any) => state.storeReducer);

  return (
    <Touchable
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'HomeScreen',
              params: {
                STORE,
                STORE_NAME,
                STORE_SEQ,
                WORKING_COUNT,
                TOTAL_COUNT,
              },
            },
          ],
        });
      }}>
      <HomeIcon size={22} color="white" />
      <Text>HOME</Text>
    </Touchable>
  );
};
