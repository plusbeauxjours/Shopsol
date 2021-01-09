import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isIphoneX} from 'react-native-iphone-x-helper';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import {
  CameraIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
  CloseCircleIcon,
} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

const WhiteSpace = styled.View`
  height: 20px;
`;
const SmallWhiteSpace = styled.View`
  height: 10px;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: ${styleGuide.palette.borderColor};
  height: 1px;
`;

const CameraBoxContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 30px;
`;

const TextContainer = styled.View`
  align-items: flex-start;
`;

const DateText = styled.Text`
  width: 100%;
  font-size: 14px;
  margin-left: 5px;
  margin-top: 10px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 14px;
  color: black;
  margin-left: 5px;
  height: 40px;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
`;

const GreyText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const BorderBox = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${styleGuide.palette.secondary};
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const GreySmallText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.greyColor};
  text-align: left;
`;

const Touchable = styled.TouchableOpacity``;

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

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CameraPictureCloseButtonText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: #ffffff;
`;

const CameraPictureCloseButton = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color:${styleGuide.palette.primary}
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;

const CameraPictureButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border-color:${styleGuide.palette.primary}
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

const DatePickerContainer = styled.View`
  width: 330px;
  height: 320px;
  border-radius: 20px;
  padding: 20px;
  padding-top: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const DatePickerRoundBtn = styled(Ripple)`
  position: absolute;
  width: 250px;
  height: 60px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: ${styleGuide.palette.greyColor};
  bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const DatePickerText = styled.Text`
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  text-align: center;
`;

export default ({
  submitFn,
  setNAME,
  NAME,
  setPosition,
  position,
  setOwner,
  owner,
  setStorename,
  storename,
  EDUCATION_DATE,
  setEDUCATION_DATE,
  EDUCATION_TYPE,
  setBusinesstype,
  businesstype,
  dateModalVisible,
  setDateModalVisible,
  toggleEducationType,
  isCameraModalVisible,
  setIsCameraModalVisible,
  cameraPictureLast,
  setCameraPictureLast,
  takePictureFn,
  checkOrcFn,
  EDUCATION_DATEprops,
}) => {
  const cameraRef = useRef(null);
  return (
    <BackGround>
      <KeyboardAwareScrollView>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}>
          <Container>
            <Section>
              <TextContainer>
                <TitleText>보건증 촬영</TitleText>
              </TextContainer>
              <GreyLine />
              <GreySmallText>문자인식(OCR) 기술로</GreySmallText>
              <GreySmallText>정보를 자동으로 입력할 수 있습니다</GreySmallText>
              <GreySmallText>
                인식이 불안정할 경우 직접 입력하여 진행해 주세요.
              </GreySmallText>
              {cameraPictureLast ? (
                <CameraBoxContainer>
                  <Touchable onPress={() => setCameraPictureLast(null)}>
                    <BorderBox>
                      <CloseIconContainer>
                        <CloseCircleIcon />
                      </CloseIconContainer>
                      <FastImage
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginHorizontal: 5,
                        }}
                        source={{
                          uri: cameraPictureLast,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </BorderBox>
                  </Touchable>
                </CameraBoxContainer>
              ) : (
                <CameraBoxContainer>
                  <Touchable onPress={() => setIsCameraModalVisible(true)}>
                    <BorderBox>
                      <CameraIcon
                        size={25}
                        color={styleGuide.palette.secondary}
                      />
                      <GreySmallText
                        style={{
                          color: styleGuide.palette.secondary,
                          fontSize: styleGuide.fontSize.small,
                        }}>
                        사진촬영
                      </GreySmallText>
                    </BorderBox>
                  </Touchable>
                </CameraBoxContainer>
              )}
            </Section>
            <Section>
              <TextInputContainer>
                <GreyText>성명</GreyText>
                <TextInput
                  placeholder={'교육이수자성명'}
                  placeholderTextColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => {
                    setNAME(text);
                  }}
                  value={NAME}
                  maxLength={6}
                />
              </TextInputContainer>
              <InputLine isBefore={NAME.length === 0 ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>직책</GreyText>
                <TextInput
                  placeholder={'교육이수자 직책'}
                  placeholderTextColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => {
                    setPosition(text);
                  }}
                  value={position}
                  maxLength={6}
                />
              </TextInputContainer>
              <InputLine isBefore={position.length === 0 ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>대표자 성명</GreyText>
                <TextInput
                  placeholder={'대표자 성명'}
                  placeholderTextColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => {
                    setOwner(text);
                  }}
                  value={owner}
                  maxLength={6}
                />
              </TextInputContainer>
              <InputLine isBefore={owner.length === 0 ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>영업소 명칭</GreyText>
                <TextInput
                  placeholder={'영업소 명칭'}
                  placeholderTextColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => {
                    setStorename(text);
                  }}
                  value={storename}
                  maxLength={6}
                />
              </TextInputContainer>
              <InputLine isBefore={storename.length === 0 ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <Touchable
                  style={{alignItems: 'flex-start'}}
                  onPress={() => setDateModalVisible(true)}>
                  <GreyText>교육 일시</GreyText>
                  <DateText>
                    {moment(EDUCATION_DATE).format('YYYY.MM.DD')}
                  </DateText>
                </Touchable>
              </TextInputContainer>
              <SmallWhiteSpace />
              <InputLine isBefore={false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>영업의 종류</GreyText>
                <TextInput
                  placeholder={'영업의 종류'}
                  placeholderTextColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => {
                    setBusinesstype(text);
                  }}
                  value={businesstype}
                  maxLength={6}
                />
              </TextInputContainer>
              <InputLine isBefore={businesstype.length === 0 ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>교육 구분</GreyText>
                <WhiteSpace />
                <Row style={{justifyContent: 'space-around', width: '100%'}}>
                  <Touchable
                    style={{alignItems: 'flex-start'}}
                    onPress={() => toggleEducationType()}>
                    <Row>
                      {EDUCATION_TYPE === 'online' ? (
                        <RadioBtnOnIcon size={22} />
                      ) : (
                        <RadioBtnOffIcon size={22} />
                      )}
                      <GreyText style={{marginLeft: 10}}>온라인 교육</GreyText>
                    </Row>
                  </Touchable>
                  <Touchable
                    style={{alignItems: 'flex-start'}}
                    onPress={() => toggleEducationType()}>
                    <Row>
                      {EDUCATION_TYPE === 'offline' ? (
                        <RadioBtnOnIcon size={22} />
                      ) : (
                        <RadioBtnOffIcon size={22} />
                      )}
                      <GreyText style={{marginLeft: 10}}>집체 교육</GreyText>
                    </Row>
                  </Touchable>
                </Row>
              </TextInputContainer>
            </Section>
            <SubmitBtn
              text={'입력완료'}
              onPress={() => submitFn()}
              isRegisted={
                cameraPictureLast &&
                NAME.length !== 0 &&
                position.length !== 0 &&
                owner.length !== 0 &&
                storename.length !== 0 &&
                businesstype.length !== 0 &&
                EDUCATION_TYPE.length !== 0
              }
            />
          </Container>
        </ScrollView>
      </KeyboardAwareScrollView>
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
                  onPress={() => {
                    checkOrcFn();
                    setIsCameraModalVisible(false);
                  }}>
                  <HalfBottonText style={{color: 'white'}}>선택</HalfBottonText>
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
              <CameraPictureCloseButtonText>닫기</CameraPictureCloseButtonText>
            </CameraPictureCloseButton>
          </RNCamera>
        )}
      </Modal>
      <Modal
        onRequestClose={() => setDateModalVisible(false)}
        onBackdropPress={() => setDateModalVisible(false)}
        isVisible={dateModalVisible}
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
            date={moment(EDUCATION_DATE).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            onDateChange={(date) =>
              setEDUCATION_DATE(moment(date).format('YYYY-MM-DD'))
            }
          />
          <DatePickerRoundBtn
            onPress={() => setDateModalVisible(false)}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <DatePickerText>확인</DatePickerText>
          </DatePickerRoundBtn>
        </DatePickerContainer>
      </Modal>
    </BackGround>
  );
};
