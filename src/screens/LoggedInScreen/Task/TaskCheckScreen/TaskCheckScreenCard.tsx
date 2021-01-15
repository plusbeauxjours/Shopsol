import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

import {CheckMarkIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

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
  background-color: ${(props) => (props.isChecked ? '#ccc' : '#000')};
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

const GreyBox = styled.View`
  background-color: ${styleGuide.palette.backgroundPrimary};
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

export default ({name, item, confirmModal, cancelModal, fetchData}) => {
  const navigation = useNavigation();
  if (item.checkType === '0') {
    return (
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <GreyBox>
          <Touchable
            onPress={() => confirmModal(name, item.task_SEQ, item.IMG_LIST)}>
            {item.IMG_LIST ? (
              <FastImage
                style={{width: 60, height: 60, borderRadius: 10}}
                source={{
                  uri: 'http://133.186.210.223/uploads/' + item.IMG_LIST,
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
            <IconBorder>
              <IconContainer isChecked={true}>
                <CheckMarkIcon size={12} color={'white'} />
              </IconContainer>
            </IconBorder>
          </Touchable>
        </GreyBox>
        <WhiteItem
          onPress={() =>
            setTimeout(() => {
              navigation.navigate('TaskUpdateScreen', {
                name,
                task_SEQ: item.task_SEQ,
                taskName: item.taskName,
                taskDate: item.taskDate,
                taskMemo: item.taskMemo,
                taskImage: item.IMG_LIST,
                fetchData,
              });
            }, 100)
          }
          rippleColor={'#666'}
          rippleDuration={600}
          rippleSize={1700}
          rippleContainerBorderRadius={10}
          rippleOpacity={0.1}>
          <Name>
            <NameText>{item.taskName}</NameText>
            <DateText>
              {item.taskDate?.slice(0, 4)}.{item.taskDate?.slice(5, 7)}.
              {item.taskDate?.slice(8, 10)}
            </DateText>
          </Name>
          {item.taskMemo?.length !== 0 && <Line />}
          {item.taskMemo?.length !== 0 && (
            <TextContainer>
              <Text>{item.taskMemo}</Text>
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
            onPress={() => cancelModal(name, item.task_SEQ, item.IMG_LIST)}>
            {item.IMG_LIST ? (
              <FastImage
                style={{width: 60, height: 60, borderRadius: 10}}
                source={{
                  uri: 'http://133.186.210.223/uploads/' + item.IMG_LIST,
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
            <IconBorder>
              <IconContainer isChecked={false}>
                <CheckMarkIcon size={12} color={'yellow'} />
              </IconContainer>
            </IconBorder>
          </Touchable>
        </GreyBox>
        <Item
          onPress={() => {}}
          rippleColor={'#999'}
          rippleDuration={600}
          rippleSize={1700}
          rippleContainerBorderRadius={10}
          rippleOpacity={0.1}>
          <Name>
            <NameText isChecked={true}>{item.taskName}</NameText>
            <DateText isChecked={true}>
              {item.taskDate?.slice(0, 4)}.{item.taskDate?.slice(5, 7)}.
              {item.taskDate?.slice(8, 10)}
            </DateText>
          </Name>
          <Line />
          {item.taskMemo?.length !== 0 && (
            <TextContainer>
              <Text isChecked={true}>{item.taskMemo}</Text>
            </TextContainer>
          )}
          <TextContainer>
            <Row>
              <Text isChecked={true}>처리직원: </Text>
              <Bold isChecked={true}>{item.checkEmpName}</Bold>
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
