import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import moment from 'moment';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import {CameraIcon} from '~/constants/Icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isIphoneX} from 'react-native-iphone-x-helper';

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

const CameraBox = styled.TouchableOpacity`
  margin: 20px 0;
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

export default ({
  submitFn,
  checkOrcFn,
  dateModalVisible,
  setDateModalVisible,
  NAME,
  setNAME,
  RESULT_COUNT,
  setRESULT_COUNT,
  EDUCATION_DATE,
  setEDUCATION_DATE,
  isCameraModalVisible,
  setIsCameraModalVisible,
  cameraPictureLast,
  setCameraPictureLast,
  takePictureFn,
  RESULT_DATE,
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
              ) : (
                <CameraBox onPress={() => setIsCameraModalVisible(true)}>
                  <Bold style={{color: '#e85356'}}>촬영하기</Bold>
                  <CameraIcon size={40} />
                </CameraBox>
              )}
              <Bold>* 인식이 불안정할 경우 직접입력하여 진행해 주세요.</Bold>
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
                <Touchable onPress={() => setDateModalVisible(true)}>
                  <GreyText>검진일</GreyText>
                  <DateText>
                    {moment(EDUCATION_DATE).format('YYYY.MM.DD')}
                  </DateText>
                </Touchable>
              </TextInputContainer>
              <SmallWhiteSpace />
              <InputLine isBefore={EDUCATION_DATE == '' ? true : false} />
            </Section>
            <DatePickerModal
              headerTextIOS={'날짜를 선택하세요.'}
              cancelTextIOS={'취소'}
              confirmTextIOS={'선택'}
              isVisible={dateModalVisible}
              mode="date"
              locale="ko_KRus_EN"
              onConfirm={(date) => {
                setEDUCATION_DATE(moment(date).format('YYYY-MM-DD'));
                setDateModalVisible(false);
              }}
              onCancel={() => setDateModalVisible(false)}
              display="default"
              minimumDate={moment(RESULT_DATE).toDate()}
            />
            <SubmitBtn
              text={'입력완료'}
              onPress={() => submitFn()}
              isRegisted={
                cameraPictureLast && RESULT_COUNT && NAME && EDUCATION_DATE
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
                '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
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
    </BackGround>
  );
};
