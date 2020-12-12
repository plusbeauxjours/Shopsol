import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isIphoneX} from 'react-native-iphone-x-helper';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import {CameraIcon} from '~/constants/Icons';

const WhiteSpace = styled.View`
  height: 20px;
`;

const SmallWhiteSpace = styled.View`
  height: 10px;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
`;

const CameraBoxContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const CameraBox = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 5px;
  width: 300px;
  height: 120px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: #e85356;
`;

const TextContainer = styled.View`
  align-items: center;
`;

const Text = styled.Text``;

const DateText = styled.Text`
  width: 100%;
  font-size: 17px;
  margin-left: 5px;
  margin-top: 10px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 17px;
  color: black;
  margin-left: 5px;
  height: 40px;
`;

const Bold = styled(Text)``;

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
  font-size: 18px;
  color: #999;
  font-weight: bold;
`;

const Touchable = styled.TouchableOpacity`
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const DeleteButton = styled.TouchableOpacity`
  margin: 50px 0;
  justify-content: center;
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
  border-color: #888;
  bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const DatePickerRoundView = styled.View`
  position: absolute;
  width: 250px;
  height: 60px;
  border-width: 0.5px;
  border-radius: 30px;
  border-color: #ddd;
  bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const DatePickerText = styled.Text`
  font-weight: 200;
  font-size: 16px;
  color: #888;
  text-align: center;
`;

export default ({
  checkOrcFn,
  confirmModal,
  takePictureFn,
  cameraPictureLast,
  setCameraPictureLast,
  isCameraModalVisible,
  setIsCameraModalVisible,
  dateModalVisible,
  setDateModalVisible,
  submitFn,
  NAME,
  setNAME,
  RESULT_COUNT,
  setRESULT_COUNT,
  EDUCATION_DATE,
  setEDUCATION_DATE,
  EDUCATION_DATE_SET,
  setEDUCATION_DATE_SET,
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
                <TitleText>보건증을 촬영해주세요</TitleText>
                <Text>문자인식(OCR) 기술로</Text>
                <Text>정보를 자동으로 입력할 수 있습니다</Text>
              </TextContainer>
              {cameraPictureLast ? (
                <CameraBoxContainer>
                  <CameraBox onPress={() => setCameraPictureLast(null)}>
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
                  </CameraBox>
                  <Bold>
                    * 인식이 불안정할 경우 직접입력하여 진행해 주세요.
                  </Bold>
                </CameraBoxContainer>
              ) : (
                <CameraBoxContainer>
                  <CameraBox onPress={() => setIsCameraModalVisible(true)}>
                    <Bold style={{color: '#e85356'}}>촬영하기</Bold>
                    <CameraIcon size={40} />
                  </CameraBox>
                  <Bold>
                    * 인식이 불안정할 경우 직접입력하여 진행해 주세요.
                  </Bold>
                </CameraBoxContainer>
              )}
            </Section>
            <Section>
              <TextInputContainer>
                <GreyText>성명</GreyText>
                <TextInput
                  placeholder={'성명'}
                  placeholderTextColor={'#999'}
                  onChangeText={(text) => {
                    setNAME(text);
                  }}
                  value={NAME}
                  maxLength={6}
                />
              </TextInputContainer>
              <InputLine isBefore={NAME == '' ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>회차</GreyText>
                <TextInput
                  placeholder={'회차'}
                  placeholderTextColor={'#999'}
                  onChangeText={(text) => {
                    setRESULT_COUNT(text);
                  }}
                  value={RESULT_COUNT}
                  maxLength={6}
                  keyboardType={'number-pad'}
                />
              </TextInputContainer>
              <InputLine isBefore={RESULT_COUNT == '' ? true : false} />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>검진일</GreyText>
                <Touchable onPress={() => setDateModalVisible(true)}>
                  <DateText>
                    {moment(EDUCATION_DATE).format('YYYY.MM.DD')}
                  </DateText>
                </Touchable>
              </TextInputContainer>
              <SmallWhiteSpace />
              <InputLine isBefore={false} />
            </Section>
            <SubmitBtn
              text={'수정완료'}
              onPress={() => submitFn()}
              isRegisted={NAME?.length !== 0 && RESULT_COUNT?.length !== 0}
            />
            <DeleteButton
              onPress={() => {
                confirmModal();
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FF3D3D',
                  textDecorationLine: 'underline',
                }}>
                보건증 삭제하기
              </Text>
            </DeleteButton>
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
                  <HalfBottonText style={{color: '#e85356'}}>
                    재촬영
                  </HalfBottonText>
                </HalfBotton>
                <HalfBotton
                  style={{backgroundColor: '#e85356'}}
                  onPress={() => {
                    checkOrcFn();
                    setIsCameraModalVisible(false);
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
            style={{width: 200}}
            date={moment(EDUCATION_DATE).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            onDateChange={(date) => {
              setEDUCATION_DATE_SET(true);
              setEDUCATION_DATE(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {EDUCATION_DATE_SET ? (
            <DatePickerRoundBtn
              onPress={() => {
                setDateModalVisible(false);
                setEDUCATION_DATE_SET(true);
              }}
              rippleColor={'#666'}
              rippleDuration={600}
              rippleSize={1200}
              rippleContainerBorderRadius={30}
              rippleOpacity={0.1}>
              <DatePickerText>확인</DatePickerText>
            </DatePickerRoundBtn>
          ) : (
            <DatePickerRoundView>
              <DatePickerText style={{color: '#ddd'}}>확인</DatePickerText>
            </DatePickerRoundView>
          )}
        </DatePickerContainer>
      </Modal>
    </BackGround>
  );
};
