import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {HelpIcon, SettingIcon} from '~/constants/Icons';

const Container = styled.View`
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
  margin-left: 15px;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 11px;
  color: white;
  font-weight: bold;
`;

export default () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Touchable
        onPress={() => {
          navigation.navigate('HelpModalScreen');
        }}>
        <HelpIcon size={20} />
        <Text>도움말</Text>
      </Touchable>
      <Touchable
        onPress={() => {
          navigation.navigate('MyPageMainScreen');
        }}>
        <SettingIcon size={20} color="white" />
        <Text>설정</Text>
      </Touchable>
    </Container>
  );
};
