import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {CalendarIcon} from '~/constants/Icons';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  padding: 5px;
`;

const Text = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

export default () => {
  const navigation = useNavigation();
  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);
  const {STORE} = useSelector((state: any) => state.userReducer);
  if (STORE == '1' || STORE_DATA.CalendarEdit == '1') {
    return (
      <Touchable
        onPress={() => {
          navigation.navigate('CalendarAddScreen');
        }}>
        <CalendarIcon />
        <Text>일정추가</Text>
      </Touchable>
    );
  } else {
    return null;
  }
};
