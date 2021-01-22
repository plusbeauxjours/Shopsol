import React, {useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {isIphoneX} from 'react-native-iphone-x-helper';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {CloseCircleIcon} from '~/constants/Icons';
import {CameraIcon, PictureIcon} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

interface IIsCancel {
  isCancelBtn?: boolean;
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

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
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
  font-size: ${styleGuide.fontSize.middle}px;
  min-height: 40px;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  margin-left: 10px;
`;

const GreyText = styled(Text)`
  color: #bbb;
`;

const CameraPictureCloseButtonText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: #ffffff;
`;

const CameraPictureCloseButton = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color: ${styleGuide.palette.primary};
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;

const CameraPictureButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border-color: ${styleGuide.palette.primary};
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
  background-color: white;
`;

const HalfBottonText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
`;

const CameraLastPictureContainer = styled.View`
  flex: 1;
  align-items: center;
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
  top: -10px;
  right: -10px;
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
  height: 40px;
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

const DatePickerContainer = styled.View`
  width: 330px;
  height: 390px;
  border-radius: 20px;
  padding: 20px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const DatePickerRoundBtn = styled(Ripple)<IIsCancel>`
  width: 250px;
  height: 50px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: ${styleGuide.palette.greyColor};
  background-color: ${(props) =>
    props.isCancelBtn ? 'transparent' : styleGuide.palette.primary};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const DatePickerText = styled.Text<IIsCancel>`
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.large}px;
  color: ${(props) =>
    props.isCancelBtn ? styleGuide.palette.greyColor : 'white'};
  text-align: center;
`;

export default ({
  isDateModalVisible,
  setIsDateModalVisible,
  date,
  initDate,
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
                    selectionColor={styleGuide.palette.primary}
                    placeholderTextColor={'#E5E5E5'}
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={title}
                    maxLength={15}
                    style={{
                      fontSize: styleGuide.fontSize.large,
                      fontWeight: '600',
                      borderWidth: 0,
                      width: 180,
                    }}
                  />
                </Name>
                <Line />
                <TextContainer>
                  <GreyText>등록일</GreyText>
                  <Touchable
                    style={{height: 40, justifyContent: 'center'}}
                    onPress={() => setIsDateModalVisible(true)}>
                    <DateText>{moment(date).format('YYYY.MM.DD')}</DateText>
                  </Touchable>
                </TextContainer>
                <Line />
                <TextContainer>
                  <TextInput
                    placeholder={'내용을 입력해주세요'}
                    selectionColor={styleGuide.palette.secondary}
                    placeholderTextColor={'#E5E5E5'}
                    onChangeText={(text) => {
                      setContent(text);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
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
                    <Touchable
                      onPress={() =>
                        utils.handleCameraPermission(setIsCameraModalVisible)
                      }>
                      <BorderBox>
                        <CameraIcon size={25} color={'#ccc'} />
                        <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                          사진촬영
                        </GreyText>
                      </BorderBox>
                    </Touchable>
                    <Touchable onPress={() => launchImageLibraryFn()}>
                      <BorderBox>
                        <PictureIcon size={25} color={'#ccc'} />
                        <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                          보관함
                        </GreyText>
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
              <CameraLastPictureContainer>
                <FastImage
                  style={{
                    width: wp('100%') - 40,
                    flex: 1,
                    marginBottom: 80,
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
                <Row style={{position: 'absolute', bottom: 0, flex: 1}}>
                  <HalfBotton onPress={() => setCameraPictureLast(null)}>
                    <HalfBottonText style={{color: styleGuide.palette.primary}}>
                      재촬영
                    </HalfBottonText>
                  </HalfBotton>
                  <HalfBotton
                    style={{backgroundColor: styleGuide.palette.primary}}
                    onPress={() => selectPicture()}>
                    <HalfBottonText style={{color: 'white'}}>
                      선택
                    </HalfBottonText>
                  </HalfBotton>
                </Row>
              </CameraLastPictureContainer>
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
                    '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "샵솔" 앱의 권한 허용을 해야 합니다.',
                  buttonPositive: '확인',
                  buttonNegative: '취소',
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
      <Modal
        onRequestClose={() => {}}
        onBackdropPress={() => {}}
        isVisible={isDateModalVisible}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <DatePickerContainer>
          <DatePicker
            style={{width: utils.isAndroid() ? 200 : 230}}
            locale="ko"
            date={moment(date).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            onDateChange={(date) => setDate(moment(date).format('YYYY-MM-DD'))}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setIsDateModalVisible(false);
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
          <DatePickerRoundBtn
            isCancelBtn={true}
            onPress={() => {
              setIsDateModalVisible(false);
              setDate(moment(initDate).format('YYYY-MM-DD'));
            }}
            rippleColor={styleGuide.palette.rippleGreyColor}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText isCancelBtn={true}>취소</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
    </>
  );
};
