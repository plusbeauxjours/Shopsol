import moment from 'moment';
import React, {useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import DatePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import {CloseCircleIcon} from '~/constants/Icons';
import {CameraIcon, PictureIcon} from '~/constants/Icons';
import Animated from 'react-native-reanimated';
import {isIphoneX} from 'react-native-iphone-x-helper';

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
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const EndRow = styled(Row)`
  align-items: flex-end;
  margin-top: 10px;
  height: 140px;
`;

const TextInput = styled.TextInput`
  justify-content: center;
  align-items: center;
  width: ${wp('50%')}px;
  min-height: 40px;
`;

const DateText = styled.Text`
  font-size: 17px;
  margin-left: 5px;
  margin-top: 10px;
`;

const GreyText = styled(Text)`
  color: #bbb;
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

const CloseIconContainer = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #aaa;
  border-width: 2px;
  border-color: white;
  z-index: 30;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -10;
  right: -10;
`;

const WhiteItem = styled.View`
  flex: 1;
  border-width: 0.7px;
  border-color: #ccc;
  width: ${wp('100%') - 80}px;
  border-radius: 10px;
  padding: 0 10px;
  min-height: 125px;
  margin-bottom: 5px;
`;

const Name = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Line = styled.View`
  height: 0.6px;
  background-color: #ccc;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Column = styled.View`
  flex-direction: column;
  margin-right: 10px;
`;

const BorderBox = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border-width: 0.7px;
  border-color: #ccc;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const PictureBorderBox = styled.View`
  width: 125px;
  height: 125px;
  border-radius: 10px;
  border-width: 0.7px;
  border-color: #eee;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

export default ({
  isDateModalVisible,
  setIsDateModalVisible,
  date,
  setDate,
  title,
  setTitle,
  content,
  setContent,
  isCameraModalVisible,
  setIsCameraModalVisible,
  TITLE,
  registerFn,
  onPressImageFn,
  launchImageLibraryFn,
  takePictureFn,
  cameraPictureLast,
  setCameraPictureLast,
  cameraPictureList,
  selectPicture,
  scrollRef,
}) => {
  const cameraRef = useRef(null);
  return (
    <>
      <BackGround>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <Section>
              <WhiteItem style={{justifyContent: 'flex-start'}}>
                <Name>
                  <TextInput
                    placeholder={'최대 글자수는 15자 입니다'}
                    selectionColor={'#e85356'}
                    placeholderTextColor={'#E5E5E5'}
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                    value={title}
                    maxLength={15}
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      height: 5,
                      borderWidth: 0,
                      width: 180,
                    }}
                  />
                  <Touchable onPress={() => setIsDateModalVisible(true)}>
                    {date.length === 0 ? (
                      <GreyText
                        style={{
                          color: '#CCC',
                          fontSize: 16,
                          marginRight: 10,
                        }}>
                        등록일
                      </GreyText>
                    ) : (
                      <DateText>
                        {moment(date).format('YYYY년 MM월 DD일')}
                      </DateText>
                    )}
                  </Touchable>
                </Name>
                <Line />
                <TextContainer>
                  <TextInput
                    placeholder={'내용을 입력해주세요'}
                    selectionColor="#6428AC"
                    placeholderTextColor={'#E5E5E5'}
                    onChangeText={(text) => {
                      setContent(text);
                    }}
                    value={content}
                    multiline={true}
                    style={{
                      textAlignVertical: 'top',
                      marginTop: 0,
                      borderWidth: 0,
                      width: '100%',
                      paddingTop: 10,
                      paddingBottom: 10,
                      minHeight: 80,
                    }}
                  />
                </TextContainer>
              </WhiteItem>
              <Animated.ScrollView
                ref={scrollRef}
                onContentSizeChange={() => {
                  scrollRef.current?.getNode()?.scrollToEnd({animated: true});
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <EndRow>
                  <Column>
                    {/* <Touchable onPress={() => setIsCameraModalVisible(true)}> */}
                    <Touchable onPress={() => console.log('photo')}>
                      <BorderBox>
                        <CameraIcon size={25} color={'#ccc'} />
                        <GreyText style={{fontSize: 10}}>사진촬영</GreyText>
                      </BorderBox>
                    </Touchable>
                    <Touchable onPress={() => launchImageLibraryFn()}>
                      <BorderBox>
                        <PictureIcon size={25} color={'#ccc'} />
                        <GreyText style={{fontSize: 10}}>보관함</GreyText>
                      </BorderBox>
                    </Touchable>
                  </Column>
                  {cameraPictureList.length > 0 ? (
                    cameraPictureList?.map((cameraPicture, index) => (
                      <Touchable
                        key={index}
                        onPress={() => onPressImageFn(cameraPicture)}
                        style={{
                          marginRight: 10,
                          marginBottom: 5,
                          justifyContent: 'flex-end',
                        }}>
                        <CloseIconContainer>
                          <CloseCircleIcon />
                        </CloseIconContainer>
                        <FastImage
                          style={{
                            width: 125,
                            height: 125,
                            borderRadius: 10,
                          }}
                          source={{
                            uri: cameraPicture.uri,
                            headers: {Authorization: 'someAuthToken'},
                            priority: FastImage.priority.low,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </Touchable>
                    ))
                  ) : (
                    <PictureBorderBox>
                      <GreyText style={{color: '#eee'}}>사진 미등록</GreyText>
                    </PictureBorderBox>
                  )}
                </EndRow>
              </Animated.ScrollView>
            </Section>
            <SubmitBtn
              text={`${TITLE} 등록완료`}
              onPress={() => registerFn()}
              isRegisted={content && title}
            />
          </Container>
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
                      marginTop: isIphoneX() ? 20 : 40,
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
                      onPress={() => selectPicture()}>
                      <HalfBottonText style={{color: '#fff'}}>
                        선택
                      </HalfBottonText>
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
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                  title: '카메라 권한 설정',
                  message:
                    '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}>
                <CameraPictureButton onPress={() => takePictureFn(cameraRef)}>
                  <CameraIcon size={40} />
                </CameraPictureButton>
                <CameraPictureCloseButton
                  onPress={() => setIsCameraModalVisible(false)}>
                  <CameraPictureCloseButtonText>
                    닫기
                  </CameraPictureCloseButtonText>
                </CameraPictureCloseButton>
              </RNCamera>
            )}
          </Modal>
        </ScrollView>
      </BackGround>
      <DatePickerModal
        headerTextIOS={'날짜를 선택하세요.'}
        cancelTextIOS={'취소'}
        confirmTextIOS={'선택'}
        isVisible={isDateModalVisible}
        mode="date"
        locale="ko_KRus_EN"
        onConfirm={(date) => {
          setDate(moment(date).format('YYYY-MM-DD'));
          setIsDateModalVisible(false);
        }}
        onCancel={() => setIsDateModalVisible(false)}
        display="default"
      />
    </>
  );
};
