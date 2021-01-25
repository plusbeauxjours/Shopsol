import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import {LocationIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Container = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 10px;
  width: ${wp('90%')}px;
  padding: 20px;
  background-color: white;
  flex-direction: column;
  border-radius: 20px;
  shadow-opacity: 0.55;
  shadow-radius: 5px;
  shadow-color: grey;
  shadow-offset: 5px 5px;
  elevation: 6;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
  margin-bottom: ${hp('1.5%')}px;
`;

const AddressBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp('0.5%')}px;
`;

const AddressText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: grey;
`;

const IconContainer = styled.View`
  width: 20px;
  align-items: center;
  margin: 1px 3px 0 0;
`;

export default ({name, addr}) => (
  <Container disabled={true}>
    <NameText>{name}</NameText>
    <AddressBox>
      <IconContainer>
        <LocationIcon color={styleGuide.palette.secondary} size={17} />
      </IconContainer>
      <AddressText>{addr ? addr : '주소 미등록'}</AddressText>
    </AddressBox>
  </Container>
);
