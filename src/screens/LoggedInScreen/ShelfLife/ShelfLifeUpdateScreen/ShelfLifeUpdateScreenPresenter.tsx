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

interface ITextInput {
  isBefore: boolean;
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const GreyText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.greyColor};
`;

const TextInput = styled.TextInput<ITextInput>`
  border-color: ${(props) =>
    props.isBefore ? '#ddd' : styleGuide.palette.primary};
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-width: 1px;
  width: ${wp('50%')}px;
  min-height: 40px;
`;

const Name = styled.View`
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
  color: #333;
  right: ${(props) => (!utils.isAndroid() && !isIphoneX() ? 25 : 0)}px;
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
  font-weight: ${styleGuide.fontWeight.normal};
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  text-align: center;
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
  shelfLifeMemo,
  setShelfLifeMemo,
  takePictureFn,
  launchImageLibraryFn,
  setIsDateModalVisible,
  isDateModalVisible,
  submit,
  alertModal,
  shelfLifeDateSet,
  setShelfLifeDateSet,
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
              {cameraPictureLast ? (
                <Touchable
                  onPress={() => setCameraPictureLast(null)}
                  disabled={!cameraPictureLast}>
                  <IconContainer>
                    <CloseCircleIcon size={12} />
                  </IconContainer>
                  <FastImage
                    style={{width: 60, height: 60, borderRadius: 10}}
                    source={{
                      uri: cameraPictureLast,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </Touchable>
              ) : (
                <Column>
                  {/* <Touchable onPress={() => setIsCameraModalVisible(true)}> */}
                  <Touchable
                    onPress={() => alertModal('사진등록 서비스 준비중입니다.')}>
                    <BorderBox>
                      <CameraIcon size={25} color={'#ccc'} />
                      <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                        사진촬영
                      </GreyText>
                    </BorderBox>
                  </Touchable>
                  {/* <Touchable onPress={() => launchImageLibraryFn()}> */}
                  <Touchable
                    onPress={() => alertModal('사진등록 서비스 준비중입니다.')}>
                    <BorderBox>
                      <PictureIcon size={25} color={'#ccc'} />
                      <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                        보관함
                      </GreyText>
                    </BorderBox>
                  </Touchable>
                  <Touchable
                    onPress={() => alertModal('바코드 서비스 준비중입니다.')}>
                    <BorderBox>
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
                    selectionColor="#6428AC"
                    placeholderTextColor="#CCC"
                    onChangeText={(text) => setShelfLifeName(text)}
                    value={shelfLifeName}
                    maxLength={15}
                    style={{
                      fontSize: styleGuide.fontSize.large,
                      fontWeight: '600',
                      height: 5,
                      margin: -10,
                      borderWidth: 0,
                      width: 180,
                    }}
                  />
                  <Touchable onPress={() => setIsDateModalVisible(true)}>
                    <DateText>
                      {moment(shelfLifeDate).format('YYYY.MM.DD')}
                    </DateText>
                  </Touchable>
                </Name>
                <Line />
                <TextContainer>
                  <TextInput
                    isBefore={shelfLifeMemo == ''}
                    placeholder="메모 입력"
                    selectionColor="#6428AC"
                    placeholderTextColor="#CCC"
                    onChangeText={(text) => setShelfLifeMemo(text)}
                    value={shelfLifeMemo}
                    multiline={true}
                    style={{
                      textAlignVertical: 'top',
                      marginLeft: -10,
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
            </Row>
          </Section>
          <SubmitBtn
            text={'수정완료'}
            onPress={() => submit()}
            isRegisted={true}
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
                  '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
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
      <Modal
        onRequestClose={() => setIsDateModalVisible(false)}
        onBackdropPress={() => setIsDateModalVisible(false)}
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
            onDateChange={(date) => {
              setShelfLifeDateSet(true);
              setShelfLifeDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          {shelfLifeDateSet ? (
            <DatePickerRoundBtn
              onPress={() => {
                setIsDateModalVisible(false);
                setShelfLifeDateSet(true);
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
