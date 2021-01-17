import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import {CloseCircleIcon, BarCodeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const Text = styled.Text`
  color: #333;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const WhiteBox = styled.View`
  background-color: white;
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const Touchable = styled.TouchableOpacity`
  z-index: 30;
  background-color: white;
  padding: 3px 0;
`;

const Name = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
  width: ${wp('100%') - 240}px;
  flex-wrap: wrap;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 0.6px;
  background-color: #ccc;
`;

const DateText = styled.Text`
  color: #333;
`;

const WhiteItem = styled(Ripple)`
  flex: 1;
  background-color: white;
  border-width: 0.7px;
  border-color: #ccc;
  width: ${wp('100%') - 150}px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 3px;
  margin-left: 10px;
  min-height: 60px;
`;

const BorderBox = styled.View`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border-width: 0.7px;
  border-color: #ccc;
  justify-content: center;
  align-items: center;
`;

const GreyText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.greyColor};
`;

const CloseIconContainer = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${styleGuide.palette.greyColor};
  border-width: 2px;
  border-color: white;
  z-index: 30;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -15px;
  right: -10px;
`;

const WhiteBack = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: white;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -15px;
  right: 15px;
  z-index: 0;
`;

const BarcodeIconContainer = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: transparent;
  border-width: 1px;
  border-color: ${styleGuide.palette.greyColor};
  z-index: 32;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export default ({
  shelfLifeImgLink,
  shelfLifeIMAGE,
  shelfLifeBarcode,
  deleteBuffer,
  onPress,
  NAME,
  DATE,
  MEMO,
}) => {
  return (
    <Row style={{marginTop: 10, marginBottom: 10}}>
      <WhiteBox>
        <Touchable
          onPress={onPress}
          disabled={!shelfLifeImgLink && !shelfLifeIMAGE}>
          {shelfLifeImgLink || shelfLifeIMAGE ? (
            <FastImage
              style={{width: 60, height: 60, borderRadius: 10}}
              source={{
                uri: shelfLifeImgLink ?? shelfLifeIMAGE,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <BorderBox style={{zIndex: 10}}>
              <GreyText>사진 미등록</GreyText>
            </BorderBox>
          )}
        </Touchable>
      </WhiteBox>
      <WhiteItem
        onPress={() => deleteBuffer(NAME, DATE)}
        rippleColor={styleGuide.palette.rippleGreyColor}
        rippleDuration={600}
        rippleSize={1700}
        rippleContainerBorderRadius={10}
        rippleOpacity={0.1}>
        {shelfLifeBarcode && (
          <WhiteBack>
            <BarcodeIconContainer>
              <BarCodeIcon color={styleGuide.palette.greyColor} size={13} />
            </BarcodeIconContainer>
          </WhiteBack>
        )}
        <CloseIconContainer>
          <CloseCircleIcon />
        </CloseIconContainer>
        <Name>
          <NameText>
            {NAME.length > 10 ? `${NAME.substring(0, 10)}...` : NAME}
          </NameText>
          <DateText>
            {DATE.slice(0, 4)}.{DATE.slice(5, 7)}.{DATE.slice(8, 10)}
          </DateText>
        </Name>
        {MEMO.length !== 0 && (
          <>
            <Line />
            <TextContainer>
              <Text>{MEMO}</Text>
            </TextContainer>
          </>
        )}
      </WhiteItem>
    </Row>
  );
};
