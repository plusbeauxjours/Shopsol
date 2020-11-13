import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePickerModal from 'react-native-modal-datetime-picker';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import moment from 'moment';
import {isIphoneX} from 'react-native-iphone-x-helper';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import AddShelfLifeScreenCard from './AddShelfLifeScreenCard';
import RoundBtn from '~/components/Btn/RoundBtn';
import utils from '~/constants/utils';
import {CloseCircleOutlineIcon} from '../../../../constants/Icons';
import {
  HelpCircleIcon,
  CloseCircleIcon,
  CameraIcon,
  PictureIcon,
  BarCodeIcon,
} from '~/constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
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

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ListContasiner = styled(TextContainer)`
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: #e85356;
  font-weight: bold;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
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
  background-color: #ddd;
  position: absolute;
  height: 100%;
  top: 0;
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
  right: ${utils.isAndroid() ? 0 : 25};
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

const CloseIconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  top: ${(props) => (isIphoneX() ? 35 : 10)};
`;

const IconContainer = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
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

export default ({
  addFn,
  explainModal,
  deleteBuffer,
  submitFn,
  list,
  shelfLifeName,
  setShelfLifeName,
  shelfLifeMemo,
  setShelfLifeMemo,
  shelfLifeDate,
  setShelfLifeDate,
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
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}
                onPress={() => {
                  explainModal(
                    '',
                    '상품을 등록하시면 직원이 출근 시 유통기한 도래 상품을 알려드립니다.\n\nEx)금일(6/23) 유통기한 경과 상품이 있습니다. (치토스 외 4개)\n유통기한 캘린더를 통해 상품을 확인해주시고, 진열대에서 철수해주세요.',
                  );
                }}>
                <TitleText>상품정보</TitleText>
                <HelpCircleIcon />
              </Touchable>
            </TextContainer>
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
                // <BorderBox >
                //   <GreyText>사진 미등록</GreyText>
                // </BorderBox>
                <Column>
                  <Touchable onPress={() => setIsCameraModalVisible(true)}>
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
                  <Touchable
                    onPress={() =>
                      alertModal('', '바코드 서비스 준비중입니다.')
                    }>
                    <BorderBox>
                      <BarCodeIcon size={20} color={'#ccc'} />
                      <GreyText style={{fontSize: 10}}>바코드</GreyText>
                    </BorderBox>
                  </Touchable>
                </Column>
              )}

              <WhiteItem style={{justifyContent: 'flex-start'}}>
                <Name>
                  <TextInput
                    placeholder="상품명"
                    selectionColor="#6428AC"
                    placeholderTextColor="#CCC"
                    onChangeText={(text) => setShelfLifeName(text)}
                    value={shelfLifeName}
                    maxLength={15}
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      height: 5,
                      margin: -10,
                      borderWidth: 0,
                      width: 180,
                    }}
                  />
                  <Touchable onPress={() => setIsDateModalVisible(true)}>
                    {shelfLifeDate.length === 0 ? (
                      <GreyText
                        style={{
                          color: '#CCC',
                          fontSize: 16,
                          marginRight: 10,
                        }}>
                        기한
                      </GreyText>
                    ) : (
                      <DateText>
                        {moment(shelfLifeDate).format('YYYY년 MM월 DD일')}
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
              <TitleText>상품목록</TitleText>
              <TitleText>{list.length}&nbsp;&nbsp;</TitleText>
            </ListContasiner>
            {list && list.length !== 0 && (
              <GreyText style={{marginTop: 10}}>
                상품을 탭하고 있으면 리스트에서 삭제할 수 있습니다.
              </GreyText>
            )}
            {list.length > 1 && (
              <View>
                <VerticalLine />
              </View>
            )}
            {list &&
              list.length !== 0 &&
              list.map((data, index) => (
                <AddShelfLifeScreenCard
                  key={index}
                  deleteBuffer={deleteBuffer}
                  onPress={() => {
                    setIsImageViewVisible(true);
                    setSelectedIndex(index);
                  }}
                  IMAGE={data.shelfLifeIMAGE}
                  NAME={data.shelfLifeNAME}
                  DATE={data.shelfLifeDATE}
                  MEMO={data.shelfLifeMEMO}
                />
              ))}
          </Section>
          <SubmitBtn
            text={'상품 등록완료'}
            isRegisted={list && list.length !== 0}
            onPress={() => submitFn()}
          />
        </Container>
        <DatePickerModal
          isDarkModeEnabled={false}
          headerTextIOS={'날짜를 선택하세요.'}
          cancelTextIOS={'취소'}
          confirmTextIOS={'선택'}
          isVisible={isDateModalVisible}
          mode="date"
          minimumDate={moment().toDate()}
          locale="ko_KRus_EN"
          onConfirm={(date) => {
            setShelfLifeDate(moment(date).format('YYYY-MM-DD'));
            setIsDateModalVisible(false);
          }}
          onCancel={() => setIsDateModalVisible(false)}
          display="default"
        />
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
                    onPress={() => setIsCameraModalVisible(false)}>
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
            justifyContent: 'flex-end',
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
            style={{width: '100%', height: '100%'}}
            source={{
              uri: list[selectedIndex]?.shelfLifeIMAGE,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Modal>
      </ScrollView>
    </BackGround>
  );
};
