import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

import {CheckMarkIcon, BarCodeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

interface IsChecked {
  isChecked?: boolean;
}

const Text = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? '#ccc' : '#333')};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Bold = styled(Text)`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  z-index: 30;
  background-color: ${styleGuide.palette.backgroundPrimary};
  padding: 3px 0;
`;

const Name = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? '#ccc' : '#333')};
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
  width: ${wp('100%') - 210}px;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 0.6px;
  background-color: #ccc;
`;

const DateText = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? '#ccc' : '#333')};
`;

const Item = styled(Ripple)`
  width: ${wp('100%') - 110}px;
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  margin-top: 3px;
  margin-left: 10px;
  min-height: 60px;
`;

const WhiteItem = styled(Ripple)`
  background-color: white;
  width: ${wp('100%') - 110}px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 3px;
  margin-left: 10px;
  min-height: 60px;
`;

const IconBorder = styled.View`
  width: 22px;
  height: 22px;
  background-color: ${styleGuide.palette.backgroundPrimary};
  border-radius: 11px;
  top: -5px;
  right: -5px;
  position: absolute;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.View<IsChecked>`
  position: absolute;
  z-index: 10;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isChecked ? '#ccc' : styleGuide.palette.tertiary};
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
  text-align: center;
`;

const GreyBox = styled.View`
  background-color: ${styleGuide.palette.backgroundPrimary};
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const WhiteBack = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: white;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -9px;
  right: -9px;
  z-index: 30;
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

export default ({name, item, confirmModal, cancelModal, onRefresh, STORE}) => {
  const navigation = useNavigation();
  if (item.checkType === '0') {
    return (
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <GreyBox>
          <Touchable
            onPress={() =>
              confirmModal(
                name,
                item.shelfLife_SEQ,
                item.IMG_LIST ?? item.shelfLifeImgLink,
              )
            }>
            {item.IMG_LIST || item?.shelfLifeImgLink ? (
              <FastImage
                style={{width: 60, height: 60, borderRadius: 10}}
                source={{
                  uri:
                    item?.shelfLifeImgLink &&
                    item?.shelfLifeImgLink !== 'undefined' &&
                    item?.shelfLifeImgLink !== 'null'
                      ? item.shelfLifeImgLink
                      : item?.IMG_LIST?.includes('file://') ||
                        item?.IMG_LIST?.includes('http://') ||
                        item?.IMG_LIST?.includes('content://')
                      ? item.IMG_LIST
                      : utils.getUriImage(item.IMG_LIST),
                  cache: FastImage.cacheControl.immutable,
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <BorderBox style={{zIndex: 10}}>
                <GreyText>사진</GreyText>
                <GreyText>미등록</GreyText>
              </BorderBox>
            )}
            <IconBorder>
              <IconContainer isChecked={true}>
                <CheckMarkIcon size={12} color={'white'} />
              </IconContainer>
            </IconBorder>
          </Touchable>
        </GreyBox>
        {item?.shelfLifeBarcode &&
          item?.shelfLifeBarcode !== 'undefined' &&
          item?.shelfLifeBarcode !== 'null' && (
            <WhiteBack>
              <BarcodeIconContainer>
                <BarCodeIcon color={styleGuide.palette.greyColor} size={13} />
              </BarcodeIconContainer>
            </WhiteBack>
          )}
        <WhiteItem
          onPress={() =>
            setTimeout(() => {
              navigation.navigate('ShelfLifeUpdateScreen', {
                name,
                shelfLife_SEQ: item.shelfLife_SEQ,
                shelfLifeName: item.shelfLifeName,
                shelfLifeDate: item.shelfLifeDate,
                shelfLifeMemo: item.shelfLifeMemo,
                shelfLifeImage: !item.IMG_LIST
                  ? null
                  : item?.IMG_LIST?.includes('file://') ||
                    item?.IMG_LIST?.includes('http://') ||
                    item?.IMG_LIST?.includes('content://')
                  ? item.IMG_LIST
                  : utils.getUriImage(item.IMG_LIST),
                onRefresh,
                shelfLifeBarcode:
                  item?.shelfLifeBarcode == 'undefined'
                    ? null
                    : item?.shelfLifeBarcode == 'null'
                    ? null
                    : item?.shelfLifeBarcode,
                shelfLifeImgLink:
                  item?.shelfLifeImgLink == 'undefined'
                    ? null
                    : item?.shelfLifeImgLink == 'null'
                    ? null
                    : item?.shelfLifeImgLink,
              });
            }, 100)
          }
          rippleColor={styleGuide.palette.rippleGreyColor}
          rippleDuration={600}
          rippleSize={1700}
          rippleContainerBorderRadius={10}
          rippleOpacity={0.1}>
          <Name>
            <NameText>{item.shelfLifeName}</NameText>
            <DateText>
              {item.shelfLifeDate.slice(0, 4)}.{item.shelfLifeDate.slice(5, 7)}.
              {item.shelfLifeDate.slice(8, 10)}
            </DateText>
          </Name>
          {item.shelfLifeMemo.length !== 0 && <Line />}
          {item.shelfLifeMemo.length !== 0 && (
            <TextContainer>
              <Text>{item.shelfLifeMemo}</Text>
            </TextContainer>
          )}
        </WhiteItem>
      </Row>
    );
  } else {
    return (
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <GreyBox>
          <Touchable
            onPress={() =>
              cancelModal(
                name,
                item.shelfLife_SEQ,
                item.IMG_LIST ?? item.shelfLifeImgLink,
              )
            }>
            {item.IMG_LIST || item?.shelfLifeImgLink ? (
              <FastImage
                style={{width: 60, height: 60, borderRadius: 10}}
                source={{
                  uri:
                    item?.shelfLifeImgLink &&
                    item?.shelfLifeImgLink !== 'undefined' &&
                    item?.shelfLifeImgLink !== 'null'
                      ? item.shelfLifeImgLink
                      : item?.IMG_LIST?.includes('file://') ||
                        item?.IMG_LIST?.includes('http://') ||
                        item?.IMG_LIST?.includes('content://')
                      ? item.IMG_LIST
                      : utils.getUriImage(item.IMG_LIST),
                  cache: FastImage.cacheControl.immutable,
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <BorderBox style={{zIndex: 10}}>
                <GreyText>사진</GreyText>
                <GreyText>미등록</GreyText>
              </BorderBox>
            )}
            <IconBorder>
              <IconContainer isChecked={false}>
                <CheckMarkIcon size={12} color={'white'} />
              </IconContainer>
            </IconBorder>
          </Touchable>
        </GreyBox>
        <WhiteBack
          style={{backgroundColor: styleGuide.palette.backgroundPrimary}}>
          <BarcodeIconContainer>
            <BarCodeIcon color={styleGuide.palette.greyColor} size={13} />
          </BarcodeIconContainer>
        </WhiteBack>
        <Item
          onPress={() => {}}
          rippleColor={styleGuide.palette.rippleGreyColor}
          rippleDuration={600}
          rippleSize={1700}
          rippleContainerBorderRadius={10}
          rippleOpacity={0.1}>
          <Name>
            <NameText isChecked={true}>{item.shelfLifeName}</NameText>
            <DateText isChecked={true}>
              {item.shelfLifeDate.slice(0, 4)}.{item.shelfLifeDate.slice(5, 7)}.
              {item.shelfLifeDate.slice(8, 10)}
            </DateText>
          </Name>
          <Line />
          {item.shelfLifeMemo.length !== 0 && (
            <TextContainer>
              <Text isChecked={true}>{item.shelfLifeMemo}</Text>
            </TextContainer>
          )}
          <TextContainer>
            <Row>
              <Text isChecked={true}>처리직원: </Text>
              <Bold isChecked={true}>
                {item.checkEmpName} [{STORE === '1' ? '사업주' : '직원'}]
              </Bold>
            </Row>
            <Row>
              <Text isChecked={true}>처리시간: </Text>
              <Bold isChecked={true}>
                {moment(item.checkTime).format('YYYY.MM.DD HH:mm')}
              </Bold>
            </Row>
          </TextContainer>
        </Item>
      </Row>
    );
  }
};
