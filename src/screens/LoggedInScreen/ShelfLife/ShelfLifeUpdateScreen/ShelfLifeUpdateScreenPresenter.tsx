import React, {useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import {isIphoneX} from 'react-native-iphone-x-helper';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {PictureIcon, CameraIcon, BarCodeIcon} from '~/constants/Icons';
import {CloseCircleIcon} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';
import BarcodeMask from 'react-native-barcode-mask';

interface IIsCancel {
  isCancelBtn?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

// v2.3
// const ListContasiner = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const GreyText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.greyColor};
`;

const TextInput = styled.TextInput`
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 30px;
`;

const Name = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Touchable = styled.TouchableOpacity``;

const WhiteItem = styled.View`
  flex: 1;
  border-width: 0.7px;
  border-color: #ccc;
  width: ${wp('100%') - 150}px;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  min-height: 125px;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  margin-left: 10px;
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
  margin-bottom: 5px;
`;

const Line = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
  height: 0.6px;
  background-color: #ccc;
`;

const Column = styled.View`
  flex-direction: column;
`;

const CameraLastPictureContainer = styled.View`
  flex: 1;
  align-items: center;
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

const DeleteButton = styled.TouchableOpacity`
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
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

const DatePickerContainer = styled.View`
  width: 300px;
  height: ${utils.isAndroid() ? 330 : 370}px;
  border-radius: 20px;
  padding: 20px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const DatePickerRoundBtn = styled(Ripple)<IIsCancel>`
  width: 250px;
  height: 40px;
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

const Footer = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${styleGuide.palette.primary};
`;

const FooterText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const DateRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default ({
  deleteModal,
  cameraPictureLast,
  setCameraPictureLast,
  isCameraModalVisible,
  setIsCameraModalVisible,
  shelfLifeName,
  setShelfLifeName,
  shelfLifeDate,
  setShelfLifeDate,
  initShelfLifeDate,
  setInitShelfLifeDate,
  shelfLifeMemo,
  setShelfLifeMemo,
  takePictureFn,
  launchImageLibraryFn,
  setIsDateModalVisible,
  isDateModalVisible,
  submit,
  alertModal,
  barCodeCameraModalOpen,
  setBarCodeCameraModalOpen,
  handleBarCodeScanned,
  handleBarCodeInputScanned,
  shelfLifeBarcode,
  setShelfLifeBarcode,
  barCodeInputCameraModalOpen,
  setBarCodeInputCameraModalOpen,
  shelfLifeImgLink,
  setShelfLifeImgLink,
}) => {
  const cameraRef = useRef(null);
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <Row>
              {shelfLifeImgLink || cameraPictureLast ? (
                <Touchable
                  onPress={() =>
                    shelfLifeImgLink
                      ? setShelfLifeImgLink(null)
                      : setCameraPictureLast(null)
                  }
                  disabled={!cameraPictureLast && !shelfLifeImgLink}>
                  <IconContainer>
                    <CloseCircleIcon size={12} />
                  </IconContainer>
                  <FastImage
                    style={{width: 60, height: 60, borderRadius: 10}}
                    source={{
                      uri: shelfLifeImgLink ?? cameraPictureLast,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </Touchable>
              ) : (
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
                  <Touchable
                    onPress={() =>
                      utils.handleCameraPermission(setBarCodeCameraModalOpen)
                    }>
                    <BorderBox style={{marginBottom: 0}}>
                      <BarCodeIcon size={20} color={'#ccc'} />
                      <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                        바코드
                      </GreyText>
                    </BorderBox>
                  </Touchable>
                </Column>
              )}
              <WhiteItem style={{justifyContent: 'flex-start'}}>
                <Name>
                  <TextInput
                    isBefore={shelfLifeName == ''}
                    placeholder="상품명"
                    selectionColor={styleGuide.palette.secondary}
                    placeholderTextColor={styleGuide.palette.lightGreyColor}
                    onChangeText={(text) => setShelfLifeName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={shelfLifeName}
                    maxLength={15}
                    multiline={true}
                    style={{
                      fontSize: styleGuide.fontSize.large,
                      fontWeight: '600',
                      borderWidth: 0,
                    }}
                  />
                </Name>
                <Line />
                <Touchable
                  style={{
                    width: '100%',
                    height: 30,
                    justifyContent: 'center',
                  }}
                  onPress={() => setIsDateModalVisible(true)}>
                  <DateRow>
                    <GreyText
                      style={{
                        fontSize: styleGuide.fontSize.large,
                        color: styleGuide.palette.lightGreyColor,
                      }}>
                      기한
                    </GreyText>
                    <DateText>
                      {moment(shelfLifeDate).format('YYYY.MM.DD')}
                    </DateText>
                  </DateRow>
                </Touchable>
                <Line />
                <TextContainer>
                  <TextInput
                    placeholder="메모 입력"
                    selectionColor={styleGuide.palette.secondary}
                    placeholderTextColor={styleGuide.palette.lightGreyColor}
                    onChangeText={(text) => setShelfLifeMemo(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={shelfLifeMemo}
                    multiline={true}
                    style={{
                      fontSize: styleGuide.fontSize.middle,
                      width: '100%',
                      paddingTop: 10,
                      minHeight: 87,
                    }}
                  />
                  {/* 
                  v2.3
                  <ListContasiner style={{width: '100%', marginTop: 32}}>
                    <Touchable
                      onPress={() =>
                        shelfLifeBarcode
                          ? setShelfLifeBarcode(null)
                          : setBarCodeInputCameraModalOpen(true)
                      }>
                      {shelfLifeBarcode && (
                        <IconContainer style={{top: -5, right: -5}}>
                          <CloseCircleIcon size={12} />
                        </IconContainer>
                      )}
                      <RequestBorderButton
                        disabled={true}
                        isChecked={shelfLifeBarcode}>
                        <RequestBorderText isChecked={shelfLifeBarcode}>
                          {shelfLifeBarcode
                            ? shelfLifeBarcode
                            : '바코드 넘버 입력'}
                        </RequestBorderText>
                      </RequestBorderButton>
                    </Touchable>
                  </ListContasiner> */}
                </TextContainer>
              </WhiteItem>
            </Row>
          </Section>
          <SubmitBtn
            text={'수정완료'}
            onPress={() => submit()}
            isRegisted={
              shelfLifeName.length !== 0 && shelfLifeMemo.length !== 0
            }
          />
          <DeleteButton
            onPress={() =>
              deleteModal('', '등록하신 상품을 삭제하시겠습니까?')
            }>
            <Text
              style={{
                fontSize: styleGuide.fontSize.large,
                fontWeight: '600',
                color: '#FF3D3D',
                textDecorationLine: 'underline',
              }}>
              삭제하기
            </Text>
          </DeleteButton>
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
                    onPress={() => setIsCameraModalVisible(false)}>
                    <HalfBottonText style={{color: 'white'}}>
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
        <Modal
          isVisible={barCodeCameraModalOpen}
          onBackdropPress={() => setBarCodeCameraModalOpen(false)}
          onRequestClose={() => setBarCodeCameraModalOpen(false)}
          style={{margin: 0}}
          avoidKeyboard={true}>
          <RNCamera
            ref={cameraRef}
            style={{flex: 1}}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            captureAudio={false}
            onFacesDetected={() => {}}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            onBarCodeRead={({data}) => handleBarCodeScanned(data)}>
            <BarcodeMask
              width={300}
              height={100}
              outerMaskOpacity={0.8}
              edgeColor={styleGuide.palette.tertiary}
              edgeBorderWidth={2}
              showAnimatedLine={false}
            />
            <Footer onPress={() => setBarCodeCameraModalOpen(false)}>
              <FooterText>닫기</FooterText>
            </Footer>
          </RNCamera>
        </Modal>
      </ScrollView>
      <Modal
        isVisible={barCodeInputCameraModalOpen}
        onBackdropPress={() => setBarCodeInputCameraModalOpen(false)}
        onRequestClose={() => setBarCodeInputCameraModalOpen(false)}
        style={{margin: 0}}
        avoidKeyboard={true}>
        <RNCamera
          ref={cameraRef}
          style={{flex: 1}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          captureAudio={false}
          onFacesDetected={() => {}}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          onBarCodeRead={({data}) => handleBarCodeInputScanned(data)}>
          <BarcodeMask
            width={300}
            height={100}
            outerMaskOpacity={0.8}
            edgeColor={styleGuide.palette.tertiary}
            edgeBorderWidth={2}
            showAnimatedLine={false}
          />
          <Footer onPress={() => setBarCodeInputCameraModalOpen(false)}>
            <FooterText>닫기</FooterText>
          </Footer>
        </RNCamera>
      </Modal>
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
            date={moment(shelfLifeDate).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            minimumDate={moment().toDate()}
            onDateChange={(date) =>
              setShelfLifeDate(moment(date).format('YYYY-MM-DD'))
            }
          />
          <DatePickerRoundBtn
            onPress={() => {
              setInitShelfLifeDate(moment(shelfLifeDate).format('YYYY-MM-DD'));
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
              setShelfLifeDate(moment(initShelfLifeDate).format('YYYY-MM-DD'));
              setIsDateModalVisible(false);
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
    </BackGround>
  );
};
