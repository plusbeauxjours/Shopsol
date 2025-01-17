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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  CameraIcon,
  PictureIcon,
  CheckBoxOnIcon,
  CheckBoxOffIcon,
} from '~/constants/Icons';
import {CloseCircleIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';
import {ScrollView} from 'react-native';
interface IsLast {
  isLast?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

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
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const TextInput = styled.TextInput`
  padding: 0;
`;

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
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  height: 140px;
`;

const ScrollViewContainer = styled.View`
  align-items: flex-start;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;

const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.tertiary};
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
`;

const AddButtonText = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
  color: white;
`;

const ChecklistTextContainer = styled.View`
  width: ${wp('100%') - 180}px;
  flex-wrap: nowrap;
`;

export default ({
  scan,
  setScan,
  gotoChecklistAdd,
  CHECK_TITLE,
  setCHECK_TITLE,
  TITLE,
  LIST,
  NAME,
  STORE,
  EMP_SEQ,
  ITEM_EMP_SEQ,
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
  DATE,
}) => {
  const cameraRef = useRef(null);
  const scrollRef = createRef(0);
  return (
    <>
      <BackGround>
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}>
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
                    color: NAME ? '#000' : styleGuide.palette.primary,
                    fontWeight: NAME
                      ? styleGuide.fontWeight.normal
                      : styleGuide.fontWeight.bold,
                  }}>
                  {NAME ? NAME.split('@').join(' / ') : EMP_NAME ?? '체크전'}
                </Text>
              </RowSpace>
              <WhiteSpace />
              <RowSpace>
                <SectionText>확인시간</SectionText>
                <Text
                  style={{
                    color: CHECK_TIME ? '#000' : styleGuide.palette.primary,
                    fontWeight: CHECK_TIME
                      ? styleGuide.fontWeight.normal
                      : styleGuide.fontWeight.bold,
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
                          fontSize: styleGuide.fontSize.middle,
                          color:
                            scan == '0'
                              ? styleGuide.palette.primary
                              : styleGuide.palette.primary,
                        }}>
                        정상
                      </Text>
                      <Text
                        style={{
                          fontSize: styleGuide.fontSize.middle,
                          color:
                            scan == '0'
                              ? styleGuide.palette.primary
                              : '#B91C1B',
                        }}>
                        이상
                      </Text>
                    </CheckBoxIconContainer>
                  )}
                </ChecklistTitle>
                {LIST?.map((data, index) => (
                  <ChecklistItem key={index} isLast={LIST?.length - 1 == index}>
                    <ChecklistTextContainer>
                      <Text>{data}</Text>
                    </ChecklistTextContainer>
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
                        {JSON.parse(JSON.stringify(checklistGoodState))[
                          index
                        ] ? (
                          <CheckBoxOnIcon color={styleGuide.palette.primary} />
                        ) : (
                          <CheckBoxOffIcon
                            color={styleGuide.palette.lightGreyColor}
                          />
                        )}
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
                        {JSON.parse(JSON.stringify(checklistBadState))[
                          index
                        ] ? (
                          <CheckBoxOnIcon color={'#B91C1B'} />
                        ) : (
                          <CheckBoxOffIcon
                            color={styleGuide.palette.lightGreyColor}
                          />
                        )}
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
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={styleGuide.palette.greyColor}
                    multiline={true}
                    style={{
                      textAlignVertical: 'top',
                    }}
                  />
                </Box>
              </Section>
            )}
            {PHOTO_CHECK === '1' && STORE === '0' && scan === '1' && (
              <Section>
                <SectionText>관련사진</SectionText>
                <ScrollViewContainer>
                  <Animated.ScrollView
                    ref={scrollRef}
                    onContentSizeChange={() => {
                      cameraPictureList.length > 2 &&
                        scrollRef.current
                          ?.getNode()
                          ?.scrollToEnd({animated: true});
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    <EndRow>
                      <Column>
                        <Touchable
                          onPress={() => {
                            setCameraPictureLast(null);
                            utils.handleCameraPermission(
                              setIsCameraModalVisible,
                            );
                          }}>
                          <BorderBox>
                            <CameraIcon size={25} color={'#ccc'} />
                            <Text
                              style={{
                                color: '#bbb',
                                fontSize: styleGuide.fontSize.small,
                              }}>
                              사진촬영
                            </Text>
                          </BorderBox>
                        </Touchable>
                        <Touchable onPress={() => launchImageLibraryFn()}>
                          <BorderBox>
                            <PictureIcon size={25} color={'#ccc'} />
                            <Text
                              style={{
                                color: '#bbb',
                                fontSize: styleGuide.fontSize.small,
                              }}>
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
                                cache: FastImage.cacheControl.immutable,
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </Touchable>
                        ))
                      ) : (
                        <PictureBorderBox>
                          <Text style={{textAlign: 'center', color: '#eee'}}>
                            사진
                          </Text>
                          <Text style={{textAlign: 'center', color: '#eee'}}>
                            미등록
                          </Text>
                        </PictureBorderBox>
                      )}
                    </EndRow>
                  </Animated.ScrollView>
                </ScrollViewContainer>
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
        </KeyboardAwareScrollView>
        {((STORE == '0' && ITEM_EMP_SEQ?.includes(EMP_SEQ)) ||
          (STORE == '0' && !ITEM_EMP_SEQ)) &&
          DATE == moment().format('YYYY-MM-DD') &&
          scan === '0' && (
            <AddButtonContainer>
              <AddButton onPress={() => setScan('1')}>
                <AddButtonText>체크</AddButtonText>
              </AddButton>
            </AddButtonContainer>
          )}
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
                  cache: FastImage.cacheControl.immutable,
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
                    setCameraPictureList([
                      ...cameraPictureList,
                      {uri: cameraPictureLast},
                    ]);
                    setIsCameraModalVisible(false);
                    setCameraPictureLast(null);
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
    </>
  );
};
