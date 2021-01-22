import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {HelpIcon, SettingIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Container = styled.View`
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
  margin-left: 15px;
  align-items: center;
`;

const IconContainer = styled.View`
  height: 25px;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

export default () => {
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);

  return (
    <Container>
      {STORE == '1' && (
        <Touchable
          onPress={() => {
            navigation.navigate('HelpModalScreen');
          }}>
          <IconContainer>
            <HelpIcon size={18} />
          </IconContainer>
          <Text>도움말</Text>
        </Touchable>
      )}
      <Touchable
        onPress={() => {
          navigation.navigate('MyPageMainScreen');
        }}>
        <IconContainer>
          <SettingIcon size={18} color="white" />
        </IconContainer>
        <Text>설정</Text>
      </Touchable>
    </Container>
  );
};
