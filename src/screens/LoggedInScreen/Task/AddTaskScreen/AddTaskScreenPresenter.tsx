import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import DatePicker from 'react-native-date-picker';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {isIphoneX} from 'react-native-iphone-x-helper';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import AddTaskScreenCard from './AddTaskScreenCard';
import RoundBtn from '~/components/Btn/RoundBtn';
import utils from '~/constants/utils';
import {CloseCircleOutlineIcon} from '~/constants/Icons';
import {
  HelpCircleIcon,
  CloseCircleIcon,
  CameraIcon,
  PictureIcon,
} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

const View = styled.View`
  position: absolute;
  left: 20px;
  width: 60px;
  height: 100%;
  padding-top: 80px;
  top: 90px;
`;

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

const Center = styled.View`
  align-items: center;
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

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ListContasiner = styled(TextContainer)`
  justify-content: space-between;
`;

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
  padding: 10px;
  width: ${wp('50%')}px;
  min-height: 40px;
`;

const VerticalLine = styled.View`
  width: 0.6px;
  left: 30px;
  background-color: ${styleGuide.palette.lightGreyColor};
  position: absolute;
  height: 100%;
  top: 0;
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
  color: #333;
  width: 75px;
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

const CloseIconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  top: ${(props) => (isIphoneX() ? 35 : 25)}px;
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

export default ({
  addFn,
  explainModal,
  deleteBuffer,
  submitFn,
  list,
  taskName,
  setTaskName,
  taskMemo,
  setTaskMemo,
  taskDate,
  setTaskDate,
  isDateModalVisible,
  setIsDateModalVisible,
  cameraPictureLast,
  setCameraPictureLast,
  takePictureFn,
  isCameraModalVisible,
  setIsCameraModalVisible,
  launchImageLibraryFn,
  isImageViewVisible,
  setIsImageViewVisible,
  selectedIndex,
  setSelectedIndex,
  alertModal,
  taskDateSet,
  setTaskDateSet,
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
            <TextContainer>
              <Touchable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  explainModal(
                    '',
                    '업무를 등록하시면 직원이 출근 시 해당업무 알려드립니다.',
                  );
                }}>
                <TitleText>업무정보</TitleText>
                <HelpCircleIcon />
              </Touchable>
            </TextContainer>
            <GreyLine />
            <Row style={{marginTop: 10, marginBottom: 20}}>
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
                  <Touchable onPress={() => setIsCameraModalVisible(true)}>
                    {/* <Touchable
                    onPress={() => alertModal('사진등록 서비스 준비중입니다.')}> */}
                    <BorderBox>
                      <CameraIcon size={25} color={'#ccc'} />
                      <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                        사진촬영
                      </GreyText>
                    </BorderBox>
                  </Touchable>
                  <Touchable onPress={() => launchImageLibraryFn()}>
                    {/* <Touchable
                     onPress={() => alertModal('사진등록 서비스 준비중입니다.')}> */}
                    <BorderBox>
                      <PictureIcon size={25} color={'#ccc'} />
                      <GreyText style={{fontSize: styleGuide.fontSize.small}}>
                        보관함
                      </GreyText>
                    </BorderBox>
                  </Touchable>
                </Column>
              )}

              <WhiteItem style={{justifyContent: 'flex-start'}}>
                <Name>
                  <TextInput
                    placeholder="업무명"
                    selectionColor="#6428AC"
                    placeholderTextColor="#CCC"
                    onChangeText={(text) => setTaskName(text)}
                    onFocus={() => setTaskName('')}
                    value={taskName}
                    maxLength={15}
                    multiline={true}
                    style={{
                      fontSize: styleGuide.fontSize.large,
                      fontWeight: '600',
                      height: 5,
                      margin: -10,
                      borderWidth: 0,
                      width: wp('100%') - 240,
                    }}
                  />
                  <Touchable onPress={() => setIsDateModalVisible(true)}>
                    {!taskDateSet ? (
                      <GreyText
                        style={{
                          color: '#CCC',
                          fontSize: styleGuide.fontSize.large,
                        }}>
                        기한
                      </GreyText>
                    ) : (
                      <DateText>
                        {moment(taskDate).format('YYYY.MM.DD')}
                      </DateText>
                    )}
                  </Touchable>
                </Name>
                <Line />
                <TextContainer>
                  <TextInput
                    placeholder="메모 입력"
                    selectionColor="#6428AC"
                    placeholderTextColor="#CCC"
                    onChangeText={(text) => setTaskMemo(text)}
                    onFocus={() => setTaskMemo('')}
                    value={taskMemo}
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
            <Center>
              <RoundBtn
                isInSection={true}
                text={'목록에 추가하기'}
                onPress={() => addFn()}
                isRegisted={true}
              />
            </Center>
          </Section>
          <Section>
            <ListContasiner>
              <TitleText>업무목록</TitleText>
              <TitleText>{list.length}&nbsp;&nbsp;</TitleText>
            </ListContasiner>
            {list && list.length !== 0 && <GreyLine />}
            {list.length > 1 && (
              <View>
                <VerticalLine />
              </View>
            )}
            {list &&
              list.length !== 0 &&
              list.map((data, index) => (
                <AddTaskScreenCard
                  key={index}
                  deleteBuffer={deleteBuffer}
                  onPress={() => {
                    setIsImageViewVisible(true);
                    setSelectedIndex(index);
                  }}
                  IMAGE={data.taskIMAGE}
                  NAME={data.taskNAME}
                  DATE={data.taskDATE}
                  MEMO={data.taskMEMO}
                />
              ))}
          </Section>
          <SubmitBtn
            text={'업무 등록완료'}
            isRegisted={list && list.length !== 0}
            onPress={() => submitFn()}
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
          onRequestClose={() => {
            setSelectedIndex(0);
            setIsImageViewVisible(false);
          }}
          onBackdropPress={() => {
            setSelectedIndex(0);
            setIsImageViewVisible(false);
          }}
          isVisible={isImageViewVisible}
          style={{
            margin: 0,
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <CloseIconContainer
            onPress={() => {
              setSelectedIndex(0);
              setIsImageViewVisible(false);
            }}>
            <CloseCircleOutlineIcon size={33} color={'white'} />
          </CloseIconContainer>
          <FastImage
            style={{width: wp('100%'), height: wp('100%')}}
            source={{
              uri: list[selectedIndex]?.taskIMAGE,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
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
            date={moment(taskDate).toDate()}
            mode={'date'}
            androidVariant="iosClone"
            minimumDate={moment().toDate()}
            onDateChange={(date) => {
              setTaskDateSet(true);
              setTaskDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <DatePickerRoundBtn
            onPress={() => {
              setIsDateModalVisible(false);
              setTaskDateSet(true);
            }}
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
