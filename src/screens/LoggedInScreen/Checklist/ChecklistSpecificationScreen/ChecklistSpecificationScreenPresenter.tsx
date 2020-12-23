import React, {useRef, createRef} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {RNCamera} from 'react-native-camera';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {CheckBoxIcon, CameraIcon, PictureIcon} from '~/constants/Icons';
import {CloseCircleIcon} from '~/constants/Icons';

interface IsLast {
  isLast?: boolean;
}

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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const SectionText = styled.Text`
  font-size: 16px;
  color: #999;
  font-weight: bold;
`;

const TextInput = styled.TextInput``;

const WhiteSpace = styled.View`
  height: 10px;
`;

const Box = styled.View`
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 10px;
  min-height: 100px;
  padding: 10px;
`;

const ChecklistItem = styled.View<IsLast>`
  width: 100%;
  border-bottom-width: ${(props) => (props.isLast ? 0 : 0.7)}px;
  border-color: #ccc;
  padding: 6px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxIconContainer = styled(RowSpace)`
  width: 60px;
`;

const ChecklistTitle = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  padding-right: 5px;
`;

const GreyText = styled(Text)`
  margin: 10px 0;
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

const Line = styled.View`
  width: ${wp('100%') - 80}px;
  height: 0.7px;
  background-color: #cccccc;
  margin: 20px 0 20px 0;
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
  top: -10px;
  right: -10px;
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

const Column = styled.View`
  flex-direction: column;
  margin-right: 10px;
`;

const EndRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  align-items: flex-end;
  margin-top: 10px;
  height: 140px;
`;

export default ({
  scan,
  gotoChecklistAdd,
  CHECK_TITLE,
  setCHECK_TITLE,
  TITLE,
  LIST,
  NAME,
  STORE,
  CHECK_TIME,
  PHOTO_CHECK,
  END_TIME,
  EMP_NAME,
  isCameraModalVisible,
  setIsCameraModalVisible,
  checklistGoodState,
  setChecklistGoodState,
  checklistBadState,
  setChecklistBadState,
  onPressImageFn,
  launchImageLibraryFn,
  registerFn,
  takePictureFn,
  cameraPictureLast,
  setCameraPictureLast,
  cameraPictureList,
  setCameraPictureList,
}) => {
  const cameraRef = useRef(null);
  const scrollRef = createRef(0);

  return (
    <>
      <BackGround>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <Section>
              <RowSpace>
                <SectionText>체크항목</SectionText>
                <Text>{TITLE}</Text>
              </RowSpace>
              <WhiteSpace />
              <RowSpace>
                <SectionText>체크예정시간</SectionText>
                <Text>{END_TIME == '' ? '미사용' : END_TIME}</Text>
              </RowSpace>
              <Line />
              <RowSpace style={{alignItems: 'flex-start'}}>
                <SectionText>{NAME ? '담당직원' : '확인직원'}</SectionText>
                <Text
                  style={{
                    maxWidth: wp('100') - 160,
                    color: NAME ? '#000' : '#e85356',
                    fontWeight: NAME ? 'normal' : 'bold',
                  }}>
                  {NAME ? NAME.split('@').join(' / ') : EMP_NAME ?? '체크전'}
                </Text>
              </RowSpace>
              <WhiteSpace />
              <RowSpace>
                <SectionText>확인시간</SectionText>
                <Text
                  style={{
                    color: CHECK_TIME ? '#000' : '#e85356',
                    fontWeight: CHECK_TIME ? 'normal' : 'bold',
                  }}>
                  {CHECK_TIME ? moment(CHECK_TIME).format('HH:mm') : '체크전'}
                </Text>
              </RowSpace>
            </Section>
            <Section>
              <SectionText>체크리스트 목록</SectionText>
              <WhiteSpace />
              <Box>
                <ChecklistTitle>
                  {LIST?.length === 0 ? (
                    <ChecklistItem isLast={true}>
                      <Text>ex. 가스벨브 잠그기</Text>
                    </ChecklistItem>
                  ) : (
                    <CheckBoxIconContainer>
                      <Text
                        style={{
                          fontSize: 12,
                          color: scan == '0' ? '#CCCCCC' : '#000',
                        }}>
                        정상
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: scan == '0' ? '#CCCCCC' : '#B91C1B',
                        }}>
                        이상
                      </Text>
                    </CheckBoxIconContainer>
                  )}
                </ChecklistTitle>
                {LIST?.map((data, index) => (
                  <ChecklistItem key={index} isLast={LIST?.length - 1 == index}>
                    <Text>{data}</Text>
                    <CheckBoxIconContainer>
                      <Touchable
                        onPress={() => {
                          let checklistGoodStated = JSON.parse(
                            JSON.stringify(checklistGoodState),
                          );
                          let checklistBadStated = JSON.parse(
                            JSON.stringify(checklistBadState),
                          );
                          checklistGoodStated[index] = true;
                          checklistBadStated[index] = false;
                          setChecklistGoodState(checklistGoodStated);
                          setChecklistBadState(checklistBadStated);
                        }}
                        disabled={scan == '1' ? false : true}>
                        <CheckBoxIcon
                          size={25}
                          color={
                            JSON.parse(JSON.stringify(checklistGoodState))[
                              index
                            ]
                              ? '#000'
                              : '#CCCCCC'
                          }
                        />
                      </Touchable>
                      <WhiteSpace />
                      <Touchable
                        onPress={() => {
                          let checklistGoodStated = JSON.parse(
                            JSON.stringify(checklistGoodState),
                          );
                          let checklistBadStated = JSON.parse(
                            JSON.stringify(checklistBadState),
                          );
                          checklistGoodStated[index] = false;
                          checklistBadStated[index] = true;
                          setChecklistGoodState(checklistGoodStated);
                          setChecklistBadState(checklistBadStated);
                        }}
                        disabled={scan == '1' ? false : true}>
                        <CheckBoxIcon
                          size={25}
                          color={
                            JSON.parse(JSON.stringify(checklistBadState))[index]
                              ? '#B91C1B'
                              : '#CCCCCC'
                          }
                        />
                      </Touchable>
                    </CheckBoxIconContainer>
                  </ChecklistItem>
                ))}
              </Box>
            </Section>
            {scan == '1' && (
              <Section>
                <SectionText>메모</SectionText>
                <WhiteSpace />
                <Box>
                  <TextInput
                    onChangeText={(text) => setCHECK_TITLE(text)}
                    value={CHECK_TITLE}
                    placeholder={'내용를 입력하세요.'}
                    placeholderTextColor={'#CCCCCC'}
                    multiline={true}
                  />
                </Box>
              </Section>
            )}
            {PHOTO_CHECK === '1' && STORE === '0' && scan === '1' && (
              <Section>
                <SectionText>관련사진</SectionText>
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
                        onPress={() => {
                          setCameraPictureLast(null);
                          setIsCameraModalVisible(true);
                        }}>
                        <BorderBox>
                          <CameraIcon size={25} color={'#ccc'} />
                          <Text style={{color: '#bbb', fontSize: 10}}>
                            사진촬영
                          </Text>
                        </BorderBox>
                      </Touchable>
                      <Touchable onPress={() => launchImageLibraryFn()}>
                        <BorderBox>
                          <PictureIcon size={25} color={'#ccc'} />
                          <Text style={{color: '#bbb', fontSize: 10}}>
                            보관함
                          </Text>
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
                        <Text style={{color: '#eee'}}>사진 미등록</Text>
                      </PictureBorderBox>
                    )}
                  </EndRow>
                </Animated.ScrollView>
              </Section>
            )}
            {STORE == '0' && scan === '1' && (
              <SubmitBtn
                text={'체크완료'}
                onPress={() => registerFn()}
                isRegisted={true}
              />
            )}
            {STORE == '1' && (
              <SubmitBtn
                text={'수정하기'}
                onPress={() => gotoChecklistAdd()}
                isRegisted={true}
              />
            )}
          </Container>
        </ScrollView>
      </BackGround>

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
                    setCameraPictureList([
                      ...cameraPictureList,
                      {uri: cameraPictureLast},
                    ]);
                    setIsCameraModalVisible(false);
                    setCameraPictureLast(null);
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
    </>
  );
};
