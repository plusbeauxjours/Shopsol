import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLogout} from '~/redux/userSlice';
import {LogoutIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Touchable = styled.TouchableOpacity`
  margin-right: 10px;
  align-items: center;
`;
const IconContainer = styled.View`
  height: 25px;
`;

const Text = styled.Text`
  margin-top: 2px;
  font-size: ${styleGuide.fontSize.small}px;
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoggedOutNavigation',
              state: {routes: [{name: 'StartScreen'}]},
            },
          ],
        });
        setTimeout(() => {
          dispatch(userLogout());
        }, 1000);
      }}>
      <IconContainer>
        <LogoutIcon size={24} color="white" />
      </IconContainer>
      <Text>로그아웃</Text>
    </Touchable>
  );
};
