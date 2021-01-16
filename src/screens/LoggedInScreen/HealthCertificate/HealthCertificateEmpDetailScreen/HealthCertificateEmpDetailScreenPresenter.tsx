import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {isIphoneX} from 'react-native-iphone-x-helper';
import moment from 'moment';

import {
  BackIcon,
  ForwardIcon,
  ReloadCircleIcon,
  CloseCircleOutlineIcon,
} from '~/constants/Icons';
import Loader from '~/components/Loader';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary}; ;
`;
const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const ContentLine = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-color: #ddd;
`;

const ContentDataWrapper = styled.View`
  flex: 1;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
`;

const ContentLabelWrapper = styled.View`
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-color: #ddd;
  padding: 20px 15px;
  width: ${wp('28%')}px;
`;

const ContentLabelText = styled.Text`
  color: #000;
`;

const ContentDataText = styled(ContentLabelText)`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const Touchable = styled.TouchableOpacity``;
const WhiteSpace = styled.View`
  height: 50px;
`;

const Container = styled.View`
  padding: 20px;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const Date = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DateArrowLeft = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.arrowColor};
`;
const DateArrowRight = styled(DateArrowLeft)``;
const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;
const ContentWrapper = styled.View`
  width: 100%;
  margin-top: 30px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

const ModifyButton = styled.TouchableOpacity`
  height: 50px;
  width: ${(wp('100%') - 50) / 2}px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
  border-radius: 20px;
`;

const SaveButton = styled(ModifyButton)`
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.primary};
`;

const RegDate = styled.Text`
  color: #9b9b9b;
  font-size: ${styleGuide.fontSize.middle}px;
  margin-right: 10px;
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const RegDateContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: flex-end;
`;

const Footer = styled.View`
  width: ${wp('100%')}px;
  align-items: center;
`;

const FooterText = styled.Text`
  text-align: center;
  color: ${styleGuide.palette.greyColor};
  font-size: 18px;
  margin-bottom: 20px;
`;

const CloseIconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  top: ${(props) => (isIphoneX() ? 35 : 25)}px;
`;

export default ({
  fetchData,
  EMP_SEQ,
  onRefresh,
  alertModal,
  HEALTH_EMP_DETAIL,
  isImageViewVisible,
  setIsImageViewVisible,
  SELECT_INDEX,
  decreaseSELECT_INDEX,
  increaseSELECT_INDEX,
}) => {
  if (HEALTH_EMP_DETAIL) {
    const navigation = useNavigation();
    const images = [
      {
        url: `http://133.186.210.223/uploads/ocr/${HEALTH_EMP_DETAIL[SELECT_INDEX]?.IMG_LIST}`,
      },
    ];

    const renderFooter = (index: number) => (
      <Footer>
        <FooterText>1 / 1</FooterText>
      </Footer>
    );

    const GetContent = ({label, data}) => (
      <ContentLine>
        <ContentLabelWrapper>
          <ContentLabelText>{label}</ContentLabelText>
        </ContentLabelWrapper>
        <ContentDataWrapper>
          <ContentDataText>{data}</ContentDataText>
        </ContentDataWrapper>
      </ContentLine>
    );

    const GetContentComponent = ({label, images}) => (
      <ContentLine>
        <ContentLabelWrapper>
          <ContentLabelText>{label}</ContentLabelText>
        </ContentLabelWrapper>
        <ContentDataWrapper>
          <Touchable onPress={() => setIsImageViewVisible(true)}>
            <FastImage
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginHorizontal: 5,
              }}
              source={{
                uri: images[0].url,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Touchable>
        </ContentDataWrapper>
      </ContentLine>
    );

    return (
      <BackGround>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Section>
              <Date>
                <DateArrowLeft
                  onPress={() => {
                    if (SELECT_INDEX == HEALTH_EMP_DETAIL?.length - 1) {
                      alertModal('최초데이터 입니다.');
                    } else {
                      increaseSELECT_INDEX();
                    }
                  }}>
                  <BackIcon size={22} color={styleGuide.palette.arrowColor} />
                </DateArrowLeft>
                <DateTextArea>
                  <DateText>
                    {HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_COUNT}회차
                  </DateText>
                </DateTextArea>
                <DateArrowRight
                  style={{marginRight: 5}}
                  onPress={() => onRefresh()}>
                  <ReloadCircleIcon
                    size={18}
                    color={styleGuide.palette.arrowColor}
                  />
                </DateArrowRight>
                <DateArrowRight
                  onPress={() => {
                    if (SELECT_INDEX == 0) {
                      alertModal('최신데이터 입니다.');
                    } else {
                      decreaseSELECT_INDEX();
                    }
                  }}>
                  <ForwardIcon
                    size={22}
                    color={styleGuide.palette.arrowColor}
                  />
                </DateArrowRight>
              </Date>
              <ContentWrapper>
                <GetContent
                  label={'성명'}
                  data={HEALTH_EMP_DETAIL[SELECT_INDEX]?.NAME}
                />
                <GetContent
                  label={'회차'}
                  data={HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_COUNT}
                />
                <GetContent
                  label={'검진일'}
                  data={moment(
                    HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_DATE,
                  ).format('YYYY.MM.DD')}
                />
                <GetContentComponent label={'사진'} images={images} />
              </ContentWrapper>
              <RegDateContainer>
                <RegDate>
                  입력일자 :&nbsp;
                  {moment(HEALTH_EMP_DETAIL[SELECT_INDEX]?.CREATE_TIME).format(
                    'YYYY.MM.DD',
                  )}
                </RegDate>
              </RegDateContainer>
            </Section>
            <Row>
              <ModifyButton
                onPress={() => {
                  navigation.navigate('HealthCertificateEmpUpdateScreen', {
                    fetchData,
                    NAME: HEALTH_EMP_DETAIL[SELECT_INDEX]?.NAME,
                    EMP_SEQ: HEALTH_EMP_DETAIL[SELECT_INDEX]?.EMP_SEQ,
                    STORE_SEQ: HEALTH_EMP_DETAIL[SELECT_INDEX]?.STORE_SEQ,
                    RESULT_COUNT: HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_COUNT,
                    EDUCATION_DATE:
                      HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_DATE,
                    IMG_LIST: `http://133.186.210.223/uploads/ocr/${HEALTH_EMP_DETAIL[SELECT_INDEX]?.IMG_LIST}`,
                    STORE_HEALTH_SEQ:
                      HEALTH_EMP_DETAIL[SELECT_INDEX]?.STORE_HEALTH_SEQ,
                    SELECT_INDEX,
                  });
                }}>
                <Text
                  style={{fontSize: styleGuide.fontSize.large, color: 'white'}}>
                  수정하기
                </Text>
              </ModifyButton>
              <SaveButton
                onPress={() => {
                  navigation.navigate('HealthCertificateEmpFormScreen', {
                    fetchData,
                    EMP_SEQ,
                    RESULT_DATE: HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_DATE,
                    NAME: HEALTH_EMP_DETAIL[SELECT_INDEX]?.NAME,
                    RESULT_COUNT: HEALTH_EMP_DETAIL[SELECT_INDEX]?.RESULT_COUNT,
                    IMG_LIST: `http://133.186.210.223/uploads/ocr/${HEALTH_EMP_DETAIL[SELECT_INDEX]?.IMG_LIST}`,
                    SELECT_INDEX,
                  });
                }}>
                <Text
                  style={{
                    fontSize: styleGuide.fontSize.large,
                    color: styleGuide.palette.primary,
                  }}>
                  갱신하기
                </Text>
              </SaveButton>
            </Row>
            <WhiteSpace />
          </Container>
        </ScrollView>
        <Modal
          onRequestClose={() => setIsImageViewVisible(false)}
          onBackdropPress={() => setIsImageViewVisible(false)}
          isVisible={isImageViewVisible}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
            width: '100%',
            height: '100%',
          }}>
          <CloseIconContainer onPress={() => setIsImageViewVisible(false)}>
            <CloseCircleOutlineIcon size={33} color={'white'} />
          </CloseIconContainer>
          <ImageViewer
            imageUrls={images}
            onSwipeDown={() => setIsImageViewVisible(false)}
            backgroundColor={'transparent'}
            saveToLocalByLongPress={false}
            enableSwipeDown
            useNativeDriver
            enablePreload
            renderFooter={renderFooter}
            loadingRender={() => <Loader />}
            renderIndicator={() => null}
            renderImage={(props) => (
              <FastImage
                style={{width: '100%', height: '100%'}}
                source={{
                  uri: props.source.uri,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          />
        </Modal>
      </BackGround>
    );
  } else {
    return <Loader />;
  }
};
