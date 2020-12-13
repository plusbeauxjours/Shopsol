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

interface IsFavorite {
  isFavorite: boolean;
}

const View = styled.View`
  flex-direction: row;
  align-items: flex-start;
  width: ${wp('100%')}px
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
  margin-right: ${wp('20%')}px;
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
  font-size: 16px;
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
  background-color: ${(props) => (props.isFavorite ? '#000' : '#ddd')};
  z-index: 10;
`;

const InfoText = styled.Text`
  font-size: 10px;
  color: #c0c0c0;
`;

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
`;

const WhiteText = styled.Text`
  font-size: 11px;
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
  bottom: 10px;
  margin-left: 5px;
`;

const ContentBox = styled.View`
  flex: 1;
  padding: 0 10px;
`;

const BorderBox = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border-width: 0.7px;
  border-color: #ccc;
  justify-content: center;
  align-items: center;
`;

export default ({
  key,
  data,
  ME,
  type,
  confirmModal,
  gotoChecklistShareItem,
}) => {
  let imgarr = [];
  let allimg = [];
  if (data.IMG_LIST != null) {
    allimg = data.IMG_LIST.split('@');
    imgarr.push(allimg[0]);
  }
  return (
    <View key={key}>
      <Touchable
        onPress={() =>
          setTimeout(() => {
            gotoChecklistShareItem(type, data.NOTICE_SEQ, data.favorite);
          }, 100)
        }
        rippleColor={'#666'}
        rippleDuration={600}
        rippleSize={1700}
        rippleContainerBorderRadius={20}
        rippleOpacity={0.1}>
        <Section>
          {ME !== data.MEMBER_SEQ && data.NoticeCheck_SEQ == null && (
            <NewBadge>
              <NewBoxIcon />
            </NewBadge>
          )}
          <ContentBox>
            <RowSpace>
              <NotiTitleText numberOfLines={1}>{data.TITLE}</NotiTitleText>
            </RowSpace>
            <Row>
              <ContentText numberOfLines={2}>{data.CONTENTS}</ContentText>
            </Row>
            <AddressBox>
              <InfoText>
                {moment(data.CREATE_TIME).format('YYYY.MM.DD HH:mm')}
              </InfoText>
            </AddressBox>
          </ContentBox>
          <ImageSection>
            {imgarr?.length > 0 ? (
              <FastImage
                style={{width: 100, height: 100, borderRadius: 10}}
                source={{
                  uri: `http://133.186.210.223/uploads/${imgarr[0]}`,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <BorderBox>
                <GreyText>사진 미등록</GreyText>
              </BorderBox>
            )}
            {allimg?.length > 1 && (
              <AnotherBox>
                <WhiteText>+</WhiteText>
                <WhiteText>{allimg.length - 1}</WhiteText>
              </AnotherBox>
            )}
          </ImageSection>
        </Section>
      </Touchable>
      <PinTouchable
        isFavorite={data.favorite === '1'}
        onPress={() => confirmModal(data.NOTICE_SEQ)}>
        <PinIcon size={18} color={data.favorite == '1' ? 'yellow' : '#aaa'} />
      </PinTouchable>
    </View>
  );
};
