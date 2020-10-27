import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import {CameraIcon, CheckBoxIcon} from '~/constants/Icons';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  width: 100%;
  margin-top: 20px;
  padding: 20px;
`;

const TitleText = styled.Text`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
`;

const CameraBox = styled.TouchableOpacity`
  margin: 20px;
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
  margin-left: 5px;
  height: 40px;
`;

const Bold = styled(Text)``;

const Section = styled.View`
  padding: 30px 0;
  border-radius: 20px;
  align-items: center;
  background-color: white;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
`;

const TextInputBox = styled.View`
  padding: 30px 20px;
  border-radius: 20px;
  background-color: white;
`;

const GreyText = styled.Text`
  font-size: 18px;
  color: #999;
  font-weight: bold;
`;

const Touchable = styled.TouchableOpacity``;

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
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
            <WhiteSpace />
            <TextInputBox>
              <TextInputContainer>
                <GreyText>성명</GreyText>
                <TextInput
                  placeholder={'교육이수자성명'}
                  placeholderTextColor={'#999'}
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
                  placeholderTextColor={'#999'}
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
                  placeholderTextColor={'#999'}
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
                  placeholderTextColor={'#999'}
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
                  style={{width: '100%'}}
                  onPress={() => setDateModalVisible(true)}>
                  <GreyText>교육 일시</GreyText>
                  <DateText>
                    {moment(EDUCATION_DATE).format('YYYY.MM.DD')}
                  </DateText>
                </Touchable>
              </TextInputContainer>
              <SmallWhiteSpace />
              <InputLine
                isBefore={EDUCATION_DATE.length === 0 ? true : false}
              />
              <WhiteSpace />
              <TextInputContainer>
                <GreyText>영업의 종류</GreyText>
                <TextInput
                  placeholder={'영업의 종류'}
                  placeholderTextColor={'#999'}
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
                  <Touchable onPress={() => toggleEducationType()}>
                    <Row>
                      {EDUCATION_TYPE === 'online' ? (
                        <CheckBoxIcon size={25} color="#e85356" />
                      ) : (
                        <CheckBoxIcon size={25} color="#CCCCCC" />
                      )}
                      <GreyText style={{marginLeft: 10}}>온라인 교육</GreyText>
                    </Row>
                  </Touchable>
                  <Touchable onPress={() => toggleEducationType()}>
                    <Row>
                      {EDUCATION_TYPE === 'offline' ? (
                        <CheckBoxIcon size={25} color="#e85356" />
                      ) : (
                        <CheckBoxIcon size={25} color="#CCCCCC" />
                      )}
                      <GreyText style={{marginLeft: 10}}>집체 교육</GreyText>
                    </Row>
                  </Touchable>
                </Row>
              </TextInputContainer>
            </TextInputBox>
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
              minimumDate={moment(EDUCATION_DATEprops).add(1, 'days').toDate()}
            />
            <SubmitBtn
              text={'입력완료'}
              onPress={() => submitFn()}
              isRegisted={true}
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
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
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
