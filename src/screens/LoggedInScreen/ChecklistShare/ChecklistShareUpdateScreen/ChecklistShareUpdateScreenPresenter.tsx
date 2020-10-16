import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-modal';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  CameraIcon,
  PictureIcon,
  FlashIcon,
  NoFlashIcon,
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

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const RowCenter = styled(Row)`
  justify-content: center;
  margin-bottom: 30px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 15px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const ContentTextInput = styled.TextInput`
  padding: 10px;
  min-height: 120px;
  font-size: 15px;
  border-width: 1px;
  border-color: #e5e5e5;
`;

const GreyText = styled(Text)`
  margin: 10px 0;
  color: #bbb;
`;

const IconContainer = styled.View`
  width: ${wp('45%')}px;
  align-items: center;
`;

const IconBox = styled.View`
  margin-top: 10px;
  width: ${wp('20%')};
  height: ${wp('20%')};
  border-width: 1px;
  border-color: #e85356;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

const CameraFlashButton = styled.TouchableOpacity`
  top: 50px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: grey;
  position: absolute;
`;

const CameraPictureCloseButtonText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const CameraPictureCloseButton = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color: #e85356;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;

const CameraPictureButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border-color: #e85356;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${wp('50%') - 30}px;
  bottom: 80px;
`;

const HalfBotton = styled.TouchableOpacity`
  width: 50%;
  height: 60px;
  margin-top: 20px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const HalfBottonText = styled.Text`
  font-size: 16px;
`;

const CameraLastPictureContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export default ({
  title,
  setTitle,
  content,
  setContent,
  isCameraModalVisible,
  setIsCameraModalVisible,
  TITLE,
  registerFn,
  confirmModal,
  onPressImageFn,
  launchImageLibraryFn,
  cameraPictureFlash,
  setCameraPictureFlash,
  takePictureFn,
  cameraPictureLast,
  setCameraPictureLast,
  cameraPictureList,
  setCameraPictureList,
}) => {
  const cameraRef = useRef(null);
  return (
    <>
      <BackGround>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <Section>
              <TitleText>제목</TitleText>
              <TextInput
                placeholder={'최대 글자수는 15자 입니다'}
                selectionColor={'#999'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setTitle(text);
                }}
                value={title}
                maxLength={15}
              />
            </Section>
            <Section>
              <TitleText>내용</TitleText>
              <ContentTextInput
                placeholder={'내용을 입력해주세요'}
                selectionColor={'#999'}
                blurOnSubmit={false}
                multiline={true}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setContent(text);
                }}
                value={content}
              />
            </Section>
            <Section>
              <TitleText>사진</TitleText>
              <GreyText>등록된 사진을 클릭하면 리스트에서 제거됩니다</GreyText>
              <RowCenter>
                <IconContainer>
                  <Text>촬영</Text>
                  <Touchable
                    onPress={() => {
                      setCameraPictureLast(null);
                      setIsCameraModalVisible(true);
                    }}>
                    <IconBox>
                      <CameraIcon size={40} />
                    </IconBox>
                  </Touchable>
                </IconContainer>
                <IconContainer>
                  <Text>보관함</Text>
                  <Touchable onPress={() => launchImageLibraryFn()}>
                    <IconBox>
                      <PictureIcon />
                    </IconBox>
                  </Touchable>
                </IconContainer>
              </RowCenter>
              {cameraPictureList?.length > 0 && (
                <FlatList
                  horizontal
                  keyExtractor={(_, index) => index.toString()}
                  style={{flexDirection: 'row'}}
                  contentContainerStyle={{justifyContent: 'center'}}
                  data={cameraPictureList}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <Touchable key={index} onPress={() => onPressImageFn(item)}>
                      <FastImage
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                        source={{
                          uri: item.uri,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </Touchable>
                  )}
                />
              )}
            </Section>

            <SubmitBtn
              text={`${TITLE} 수정완료`}
              onPress={() =>
                confirmModal(`${TITLE}을 수정하시겠습니까?`, '수정', 'no', () =>
                  registerFn(),
                )
              }
              isRegisted={title && content}
            />
            <DeleteButton
              onPress={() => {
                confirmModal(
                  `${TITLE}을 삭제하시겠습니까?`,
                  '삭제',
                  'yes',
                  () => registerFn('close'),
                );
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FF3D3D',
                  textDecorationLine: 'underline',
                }}>
                {TITLE} 삭제하기
              </Text>
            </DeleteButton>
          </Container>
        </ScrollView>
      </BackGround>
      <Modal
        isVisible={isCameraModalVisible}
        style={{margin: 0}}
        onBackdropPress={() => setIsCameraModalVisible(false)}
        onRequestClose={() => setIsCameraModalVisible(false)}>
        {cameraPictureLast ? (
          <>
            <CameraLastPictureContainer>
              <FastImage
                style={{
                  width: wp('100%') - 40,
                  height: hp('100%') - 120,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                source={{
                  uri: cameraPictureLast,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Row>
                <HalfBotton onPress={() => setCameraPictureLast(null)}>
                  <HalfBottonText style={{color: '#e85356'}}>
                    재촬영
                  </HalfBottonText>
                </HalfBotton>
                <HalfBotton
                  style={{backgroundColor: '#e85356'}}
                  onPress={() => {
                    setCameraPictureList([
                      ...cameraPictureList,
                      {uri: cameraPictureLast},
                    ]);
                    setIsCameraModalVisible(false);
                    setCameraPictureLast(null);
                  }}>
                  <HalfBottonText style={{color: '#fff'}}>선택</HalfBottonText>
                </HalfBotton>
              </Row>
            </CameraLastPictureContainer>
          </>
        ) : (
          <RNCamera
            ref={cameraRef}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
            type={RNCamera.Constants.Type.back}
            flashMode={
              cameraPictureFlash
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            <CameraFlashButton
              onPress={() => setCameraPictureFlash(!cameraPictureFlash)}>
              {cameraPictureFlash ? <FlashIcon /> : <NoFlashIcon />}
            </CameraFlashButton>
            <CameraPictureButton onPress={() => takePictureFn(cameraRef)}>
              <CameraIcon size={40} />
            </CameraPictureButton>
            <CameraPictureCloseButton
              onPress={() => setIsCameraModalVisible(false)}>
              <CameraPictureCloseButtonText>닫기</CameraPictureCloseButtonText>
            </CameraPictureCloseButton>
          </RNCamera>
        )}
      </Modal>
    </>
  );
};
