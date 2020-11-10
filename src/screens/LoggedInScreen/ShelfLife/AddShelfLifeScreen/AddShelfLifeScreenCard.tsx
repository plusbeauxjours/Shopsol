import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';

const Text = styled.Text`
  color: #333;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Bold = styled(Text)`
  font-weight: bold;
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  z-index: 30;
  background-color: white;
  padding: 3px 0;
`;

const Name = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
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
  background-color: #fff;
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
  font-size: 12px;
  color: #aaa;
`;

export default ({IMAGE, deleteBuffer, onPress, NAME, DATE, MEMO}) => {
  return (
    <Row style={{marginTop: 10, marginBottom: 10}}>
      <Touchable onPress={onPress} disabled={!IMAGE}>
        {IMAGE ? (
          <FastImage
            style={{width: 60, height: 60, borderRadius: 10}}
            source={{
              uri: IMAGE,
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
      <WhiteItem
        onLongPress={() => deleteBuffer(NAME, DATE)}
        rippleColor={'#666'}
        rippleDuration={600}
        rippleSize={1700}
        rippleContainerBorderRadius={10}
        rippleOpacity={0.1}>
        <Name>
          <NameText>
            {NAME.length > 10 ? `${NAME.substring(0, 10)}...` : NAME}
          </NameText>
          <DateText>
            {DATE.slice(0, 4)}년 {DATE.slice(5, 7)}월 {DATE.slice(8, 10)}일
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
