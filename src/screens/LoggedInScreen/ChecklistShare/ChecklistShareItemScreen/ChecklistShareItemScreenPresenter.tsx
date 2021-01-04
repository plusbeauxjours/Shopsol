import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {SwipeRow, SwipeListView} from 'react-native-swipe-list-view';
import {KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import utils from '~/constants/utils';
import Loader from '~/components/Loader';
import styleGuide from '~/constants/styleGuide';

import {
  ForwardIcon,
  DeleteIcon,
  SettingIcon,
  CloseCircleOutlineIcon,
} from '~/constants/Icons';

interface IsLast {
  isLast?: boolean;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Section = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const Bold = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const CommentTextInputContainer = styled.View`
  padding-right: 20px;
  padding-left: 10px;
  border-width: 1px;
  margin: 3px;
  margin-top: 0;
  border-radius: 20px;
  border-color: ${styleGuide.palette.primary};
  flex-direction: row;
  align-items: center;
`;

const TextInput = styled.TextInput`
  flex: 1;
  align-items: center;
  margin-left: 10px;
  padding: 10px 0;
`;

const ForwardIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: ${styleGuide.palette.primary};
`;

const ForwardIconTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  right: -20px;
  width: 60px;
  height: 50px;
`;

const MemoText = styled.Text`
  flex: 1;
  color: #ccc;
`;

const MemoContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${styleGuide.palette.greyColor};
`;

const CommentTitleText = styled.Text`
  font-size: 14px;
  color: ${styleGuide.palette.primary};
`;

const MemoBox = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 7px 0;
  flex-direction: row;
  align-items: center;
`;

const CommentBox = styled(Ripple)<IsLast>`
  padding: 10px 0;
  border-bottom-width: ${(props) => (props.isLast ? 0 : 0.7)}px;
  border-color: #ddd;
  min-height: 70px;
  justify-content: center;
  background-color: white;
`;

const Column = styled.View`
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
`;

const CommentIconContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10;
  justify-content: center;
  align-items: center;
  width: 30px;
  overflow: hidden;
`;
const Footer = styled.View`
  width: ${wp('100%')}px;
  align-items: center;
`;

const FooterText = styled.Text`
  text-align: center;
  color: ${styleGuide.palette.greyColor};
  font-size: 18px;
  margin-bottom: 20px;
`;

const CloseIconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  top: ${(props) => (isIphoneX() ? 35 : 25)}px;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 50;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-bottom-width: 0.7px;
  border-color: #ddd;
  height: 100%;
`;

const Line = styled.View`
  margin: 10px 0;
  height: 0.7px;
  background-color: #ccc;
`;

const ModalPopupArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  align-items: center;
`;

const ModalPopupText = styled.Text`
  color: white;
`;

const ModalPopup = styled.View`
  padding: 15px;
  border-radius: 10px;
  elevation: 6;
  shadow-color: grey;
  shadow-offset: 3px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 3px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default ({
  NOTI_TITLE,
  CREATE_TIME,
  EMP_NAME,
  TITLE,
  CONTENTS,
  imgarr,
  setIsImageViewVisible,
  modalImgarr,
  isImageViewVisible,
  ME,
  MEMBER_SEQ,
  isEditMode,
  setIsEditMode,
  comment,
  setComment,
  registFn,
  deleteFn,
  editFn,
  IMG_LIST,
  NOTICE_SEQ,
  commentInputBox,
  setCommentInputBox,
  setSelectedCOM_SEQ,
  CHECKLIST_SHARE_COMMENTS,
  loading,
  isFavorite,
  imageIndex,
  setImageIndex,
  STORE,
  GENDER,
  isAddedToastVisible,
  isUpdatedToastVisible,
  isRemovedToastVisible,
  openRow,
}) => {
  const navigation = useNavigation();

  const renderImage = (item, index) => (
    <Touchable
      onPress={() => {
        setImageIndex(index);
        setIsImageViewVisible(true);
      }}
      key={index}>
      <FastImage
        style={{width: 120, height: 120, borderRadius: 10, marginHorizontal: 5}}
        source={{
          uri: `http://133.186.210.223/uploads/${item}`,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Touchable>
  );

  const renderFooter = (index: number) => (
    <Footer>
      <FooterText>
        {index + 1 || 1} / {modalImgarr.length}
      </FooterText>
    </Footer>
  );

  return (
    <>
      <BackGround>
        <KeyboardAvoidingView
          behavior={utils.isAndroid() ? 'height' : 'padding'}
          keyboardVerticalOffset={65}
          enabled
          style={{flexGrow: 1}}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}>
            <Container>
              <Section>
                <Row style={{justifyContent: 'space-between'}}>
                  <Column style={{marginLeft: 0}}>
                    <Bold style={{fontSize: 18}}>{NOTI_TITLE}</Bold>
                    <Bold style={{color: '#C8C8C8'}}>{EMP_NAME}</Bold>
                  </Column>
                  <Column style={{alignItems: 'flex-end'}}>
                    <Bold style={{color: '#C8C8C8'}}>
                      {moment(CREATE_TIME).format('YYYY.MM.DD')}
                    </Bold>
                    <Bold style={{color: '#C8C8C8'}}>
                      {moment(CREATE_TIME).format('HH:mm')}
                    </Bold>
                  </Column>
                </Row>
                <Line />
                <Text>{CONTENTS}</Text>
                {imgarr?.length > 0 && (
                  <FlatList
                    horizontal
                    keyExtractor={(_, index) => index.toString()}
                    style={{
                      marginTop: 40,
                      flexDirection: 'row',
                    }}
                    contentContainerStyle={{justifyContent: 'center'}}
                    showsHorizontalScrollIndicator={false}
                    data={imgarr}
                    renderItem={({item, index}) => renderImage(item, index)}
                  />
                )}
              </Section>

              <Section>
                <MemoContainer>
                  <CommentTitleText>댓글달기</CommentTitleText>
                  <MemoBox
                    onPress={() => {
                      setIsEditMode(false);
                      setCommentInputBox(true);
                    }}>
                    <MemoText>댓글을 입력하세요...</MemoText>
                  </MemoBox>
                </MemoContainer>
                {loading ? (
                  <CommentBox isLast={true}>
                    <ActivityIndicator size="small" />
                  </CommentBox>
                ) : (
                  <SwipeListView
                    useFlatList={true}
                    closeOnRowOpen={true}
                    closeOnRowBeginSwipe={true}
                    data={CHECKLIST_SHARE_COMMENTS}
                    previewOpenValue={100}
                    renderItem={({item, index}, rowMap) => (
                      <SwipeRow
                        key={index}
                        rightOpenValue={-100}
                        disableLeftSwipe={item.MEMBER_SEQ != ME && STORE == '0'}
                        disableRightSwipe={true}>
                        <BackBtn>
                          <RowTouchable
                            style={{backgroundColor: 'white'}}
                            onPress={() => {
                              rowMap[index].closeRow();
                              setIsEditMode(true);
                              setCommentInputBox(true);
                              setComment(item.CONTENTS);
                              setSelectedCOM_SEQ(item.COM_SEQ);
                            }}>
                            <SettingIcon
                              color={styleGuide.palette.greyColor}
                              size={22}
                            />
                          </RowTouchable>
                          <RowTouchable
                            style={{backgroundColor: '#D93F12'}}
                            onPress={() => {
                              rowMap[index].closeRow();
                              deleteFn(item.COM_SEQ);
                            }}>
                            <DeleteIcon color={'white'} />
                          </RowTouchable>
                        </BackBtn>
                        <CommentBox
                          key={index}
                          isLast={CHECKLIST_SHARE_COMMENTS?.length - 1 == index}
                          onPress={() => {
                            openRow(rowMap[index]);
                          }}
                          rippleColor={'#666'}
                          rippleDuration={1500}
                          rippleSize={1700}
                          rippleContainerBorderRadius={0}
                          rippleOpacity={0.1}>
                          <Row style={{alignItems: 'flex-start'}}>
                            <FastImage
                              style={{width: 50, height: 50, borderRadius: 25}}
                              source={{
                                uri: utils.avatarUrl(GENDER),
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <Column>
                              <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={100}
                                style={{
                                  width: wp('100%') - 180,
                                  flexWrap: 'wrap',
                                  marginBottom: 5,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    color: styleGuide.palette.greyColor,
                                  }}>
                                  {item.EMP_NAME} [{item.IS_MANAGER}
                                  ]&nbsp;&nbsp;
                                </Text>
                                {item.CONTENTS}
                              </Text>
                              <Row
                                style={{
                                  justifyContent: 'flex-start',
                                }}>
                                <Text
                                  style={{color: styleGuide.palette.greyColor}}>
                                  {moment(item.CREATE_TIME).format(
                                    'YYYY.MM.DD',
                                  )}
                                </Text>
                              </Row>
                            </Column>
                            {(item.MEMBER_SEQ == ME || STORE == '1') && (
                              <CommentIconContainer>
                                <LottieView
                                  speed={0.25}
                                  style={{
                                    width: 30,
                                    height: 120,
                                  }}
                                  source={require('../../../../assets/animations/menuArrow.json')}
                                  loop
                                  autoPlay
                                />
                              </CommentIconContainer>
                            )}
                          </Row>
                        </CommentBox>
                      </SwipeRow>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </Section>
              {ME == MEMBER_SEQ && (
                <SubmitBtn
                  text={`${TITLE} 수정하기`}
                  onPress={() =>
                    navigation.navigate('ChecklistShareUpdateScreen', {
                      TITLE,
                      ADDDATE: CREATE_TIME,
                      IMG_LIST,
                      NOTICE_SEQ,
                      CONTENTS,
                      NOTI_TITLE,
                      isFavorite,
                      CREATE_TIME,
                    })
                  }
                  isRegisted={true}
                />
              )}
            </Container>
          </ScrollView>
          {commentInputBox && (
            <CommentTextInputContainer>
              <TextInput
                autoFocus={true}
                returnKeyType="next"
                onChangeText={(text) => setComment(text)}
                value={comment}
                placeholder={'댓글을 입력하세요.'}
                placeholderTextColor={'#CCCCCC'}
                onBlur={() => {
                  setComment('');
                  setCommentInputBox(false);
                }}
                multiline={true}
              />
              <ForwardIconTouchable
                onPress={() => (isEditMode ? editFn() : registFn())}>
                <ForwardIconContainer>
                  <ForwardIcon color={'white'} />
                </ForwardIconContainer>
              </ForwardIconTouchable>
            </CommentTextInputContainer>
          )}
        </KeyboardAvoidingView>
      </BackGround>
      {(isAddedToastVisible ||
        isUpdatedToastVisible ||
        isRemovedToastVisible) && (
        <ModalPopupArea>
          <ModalPopup>
            {isAddedToastVisible && (
              <ModalPopupText>댓글을 추가하였습니다</ModalPopupText>
            )}
            {isUpdatedToastVisible && (
              <ModalPopupText>댓글을 수정하였습니다</ModalPopupText>
            )}
            {isRemovedToastVisible && (
              <ModalPopupText>댓글을 삭제하였습니다</ModalPopupText>
            )}
          </ModalPopup>
        </ModalPopupArea>
      )}
      <Modal
        onRequestClose={() => setIsImageViewVisible(false)}
        onBackdropPress={() => setIsImageViewVisible(false)}
        isVisible={isImageViewVisible}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
        }}>
        <CloseIconContainer onPress={() => setIsImageViewVisible(false)}>
          <CloseCircleOutlineIcon size={33} color={'white'} />
        </CloseIconContainer>
        <ImageViewer
          index={imageIndex}
          imageUrls={modalImgarr}
          onSwipeDown={() => setIsImageViewVisible(false)}
          backgroundColor={'transparent'}
          saveToLocalByLongPress={false}
          enableSwipeDown
          useNativeDriver
          enablePreload
          renderFooter={renderFooter}
          loadingRender={() => <Loader />}
          renderIndicator={() => null}
          renderImage={(props) => (
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{
                uri: props.source.uri,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        />
      </Modal>
    </>
  );
};
