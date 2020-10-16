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

import SubmitBtn from '~/components/Btn/SubmitBtn';
import utils from '~/constants/utils';
import {KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {
  ForwardIcon,
  EllipseIcon,
  DeleteIcon,
  SettingIcon,
  CloseCircleIcon,
} from '~/constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
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

const RowTouchable = styled.TouchableOpacity`
  margin-right: 10px;
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
  font-weight: bold;
`;

const CommentTextInputContainer = styled.View`
  padding: 10px;
  border-width: 1px;
  border-color: #e85356;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const TextInput = styled.TextInput`
  flex: 1;
  align-items: center;
  margin-left: 10px;
  padding: 10px 0;
`;

const ForwardIconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #e85356;
`;

const MemoText = styled.Text`
  flex: 1;
  color: #ccc;
`;

const MemoContainer = styled.View`
  border-bottom-width: 1px;
  border-color: #aaa;
`;

const CommentTitleText = styled.Text`
  font-size: 15px;
  color: #e85356;
`;

const MemoBox = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 7px 0;
  flex-direction: row;
  align-items: center;
`;

const Comment = styled.View`
  margin: 20px 0;
  border-bottom-width: 0.7px;
  border-color: #ddd;
`;

const CommentBox = styled.View`
  padding: 5px 0;
  border-top-width: 0.7px;
  border-color: #ddd;
  min-height: 100px;
  justify-content: center;
`;

const Column = styled.View`
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.View`
  width: ${wp('100%')}px;
`;

const FooterText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
`;

const CloseIconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  top: ${(props) => (isIphoneX() ? 35 : 10)};
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
          uri: 'http://133.186.210.223/uploads/' + item,
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
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <Section>
              <Row style={{justifyContent: 'center', marginBottom: 5}}>
                <Bold style={{fontSize: 18}}>{NOTI_TITLE}</Bold>
              </Row>
              <Row style={{justifyContent: 'center'}}>
                <Bold style={{color: '#C8C8C8'}}>
                  {moment(CREATE_TIME).format('YYYY.MM.DD')}
                </Bold>
                {TITLE !== 'CU소식' && (
                  <Bold style={{color: '#C8C8C8'}}>
                    &nbsp;-&nbsp;{EMP_NAME}
                  </Bold>
                )}
              </Row>
            </Section>
            <Section>
              <Text>{CONTENTS}</Text>
            </Section>
            {imgarr?.length > 0 && (
              <Section>
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
              </Section>
            )}

            {TITLE !== 'CU소식' && (
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
                <Comment>
                  {loading ? (
                    <CommentBox>
                      <ActivityIndicator color={'grey'} size={'small'} />
                    </CommentBox>
                  ) : (
                    !loading &&
                    CHECKLIST_SHARE_COMMENTS?.map((data, index) => (
                      <CommentBox key={index}>
                        <Row>
                          <FastImage
                            style={{width: 60, height: 60, borderRadius: 30}}
                            source={{
                              uri: 'http://133.186.210.223/uploads/3.png',
                              headers: {Authorization: 'someAuthToken'},
                              priority: FastImage.priority.low,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                          <Column>
                            <Row>
                              <Text
                                style={{
                                  color: '#aaa',
                                  fontSize: 13,
                                  marginRight: 15,
                                }}>
                                {data.EMP_NAME} [{data.IS_MANAGER}]
                              </Text>
                              <EllipseIcon color={'#999'} size={5} />
                              <Bold style={{color: '#C8C8C8', marginLeft: 5}}>
                                {moment(data.CREATE_TIME).format('YYYY.MM.DD')}
                              </Bold>
                            </Row>
                            <Text
                              ellipsizeMode={'tail'}
                              numberOfLines={100}
                              style={{flexWrap: 'wrap', marginTop: 5}}>
                              {data.CONTENTS}
                            </Text>
                          </Column>
                        </Row>
                        {(data.MEMBER_SEQ == ME || STORE == '1') && (
                          <Row style={{justifyContent: 'flex-end'}}>
                            <RowTouchable
                              onPress={() => {
                                setIsEditMode(true);
                                setCommentInputBox(true);
                                setComment(data.CONTENTS);
                                setSelectedCOM_SEQ(data.COM_SEQ);
                              }}>
                              <SettingIcon color={'#AACE36'} size={20} />
                              <Text style={{color: '#AACE36'}}>수정</Text>
                            </RowTouchable>
                            <RowTouchable
                              onPress={() => deleteFn(data.COM_SEQ)}>
                              <DeleteIcon />
                              <Text style={{color: '#B91C1B'}}>삭제</Text>
                            </RowTouchable>
                          </Row>
                        )}
                      </CommentBox>
                    ))
                  )}
                </Comment>
              </Section>
            )}
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
                  })
                }
                isRegisted={true}
              />
            )}
          </Container>
        </ScrollView>
        {commentInputBox && (
          <KeyboardAvoidingView
            behavior={utils.isAndroid ? 'height' : 'padding'}
            keyboardVerticalOffset={0}
            style={
              utils.isAndroid
                ? {backgroundColor: '#dddee2'}
                : {backgroundColor: '#cfd3d6'}
            }
            enabled>
            <CommentTextInputContainer>
              <TextInput
                autoFocus={true}
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
              <ForwardIconContainer
                onPress={() => {
                  isEditMode ? editFn() : registFn();
                }}>
                <ForwardIcon color={'white'} />
              </ForwardIconContainer>
            </CommentTextInputContainer>
          </KeyboardAvoidingView>
        )}
      </BackGround>
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
          <CloseCircleIcon size={33} color={'white'} />
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
          loadingRender={() => (
            <ActivityIndicator color={'grey'} size={'small'} />
          )}
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
