import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

import {NewBoxIcon, PinIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import {CommentIcon} from '../../../../constants/Icons';
import utils from '~/constants/utils';

interface IsFavorite {
  isFavorite: boolean;
}

const View = styled.View`
  flex-direction: row;
  align-items: flex-start;
  width: ${wp('100%')}px;
  padding: 0 20px;
`;

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  padding: 10px;
  flex-direction: row;
  background-color: white;
  min-height: 100px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const ContentText = styled.Text`
  margin-bottom: ${hp('1.5%')}px;
  color: #7b7b7b;
`;

const Touchable = styled(Ripple)`
  z-index: 1;
  margin-bottom: 20px;
`;

const NewBadge = styled.View`
  position: absolute;
  left: 0;
  top: -10px;
`;

const NotiTitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const PinTouchable = styled.TouchableOpacity<IsFavorite>`
  width: 30px;
  height: 30px;
  bottom: 110px;
  right: 30px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: ${(props) =>
    props.isFavorite
      ? styleGuide.palette.primary
      : styleGuide.palette.lightGreyColor};
  z-index: 10;
`;

const InfoText = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  color: ${styleGuide.palette.greyColor};
`;

const WhiteText = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  color: white;
`;

const ImageSection = styled.View`
  position: relative;
  align-items: center;
`;

const AnotherBox = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #000;
  opacity: 0.6;
`;

const AddressBox = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;

const ContentBox = styled.View`
  flex: 1;
  height: 100px;
  padding: 0 5px;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const IconText = styled.Text`
  margin-left: 5px;
  font-size: ${styleGuide.fontSize.small};
  color: ${styleGuide.palette.primary};
`;

export default ({
  data,
  ME,
  TITLE,
  isOnFix,
  confirmModal,
  gotoChecklistShareItem,
}) => {
  let imgarr = [];
  let allimg = [];
  if (data?.IMG_LIST != null) {
    allimg = data?.IMG_LIST?.split('@');
    imgarr.push(allimg[0]);
  }
  return (
    <View>
      <Touchable
        onPress={() => {
          console.log(isOnFix);
          setTimeout(() => {
            gotoChecklistShareItem(TITLE, data.NOTICE_SEQ, !isOnFix && '1');
          }, 100);
        }}
        rippleColor={styleGuide.palette.rippleGreyColor}
        rippleDuration={600}
        rippleSize={1700}
        rippleContainerBorderRadius={20}
        rippleOpacity={0.1}>
        <Section>
          {ME !== data?.MEMBER_SEQ && data?.NoticeCheck_SEQ == null && (
            <NewBadge>
              <NewBoxIcon color={styleGuide.palette.redColor} />
            </NewBadge>
          )}
          <ContentBox>
            <RowSpace>
              <NotiTitleText numberOfLines={1}>{data.TITLE}</NotiTitleText>
            </RowSpace>
            <Row>
              <ContentText numberOfLines={2}>{data.CONTENTS}</ContentText>
            </Row>
            <AddressBox style={{bottom: 5}}>
              <InfoText>
                {moment(data?.UPDATEDATE).format('YYYY.MM.DD kk:mm')}
              </InfoText>
              <InfoText style={{color: 'black'}}>
                &nbsp;-&nbsp;{decodeURI(data?.EMP_NAME)}
              </InfoText>
              <IconContainer>
                <CommentIcon />
                <IconText>{data?.comment}</IconText>
              </IconContainer>
            </AddressBox>
          </ContentBox>
          {imgarr?.length > 0 && (
            <ImageSection>
              <FastImage
                style={{width: 100, height: 100, borderRadius: 10}}
                source={{
                  uri: utils.getUriImage(imgarr[0]),
                  priority: FastImage.priority.low,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </ImageSection>
          )}
          {allimg?.length > 1 && (
            <AnotherBox>
              <WhiteText>+</WhiteText>
              <WhiteText>{allimg.length - 1}</WhiteText>
            </AnotherBox>
          )}
        </Section>
      </Touchable>
      <PinTouchable
        isFavorite={!isOnFix}
        onPress={() => confirmModal(data.NOTICE_SEQ)}>
        <PinIcon size={18} color={'white'} />
      </PinTouchable>
    </View>
  );
};
