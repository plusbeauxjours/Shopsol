import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {
  CheckBoxOnIcon,
  CheckBoxOffIcon,
  CloseCircleOutlineIcon,
} from '~/constants/Icons';
import Loader from '~/components/Loader';
import styleGuide from '~/constants/styleGuide';
import LottieView from 'lottie-react-native';
import utils from '~/constants/utils';

interface ISelected {
  isSelected: boolean;
}

interface IsLast {
  isLast?: boolean;
}

interface ILoading {
  loading?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
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
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const SectionText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const Box = styled.View`
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 10px;
  min-height: 100px;
  padding: 10px;
`;

const TextInput = styled.TextInput`
  padding: 0;
`;

const WhiteSpace = styled.View`
  height: 10px;
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

const ChecklistTitle = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  padding-right: 5px;
`;

const CheckBoxIconContainer = styled(RowSpace)`
  width: 60px;
`;

const CategoryList = styled.View`
  padding: 16px 0;
`;

const Category = styled.TouchableOpacity<ISelected>`
  border-radius: 15px;
  height: 30px;
  background-color: ${(props) =>
    props.isSelected ? styleGuide.palette.primary : '#ffffff'};
  border-color: ${styleGuide.palette.primary};
  border-width: 1px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  margin-left: 16px;
`;

const CategoryText = styled.Text<ISelected>`
  color: ${(props) =>
    props.isSelected ? '#ffffff' : styleGuide.palette.primary};
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

const Line = styled.View`
  width: ${wp('100%') - 80}px;
  height: 0.7px;
  background-color: #cccccc;
  margin: 20px 0 20px 0;
`;

const AddButtonContainer = styled.View<ILoading>`
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => (props.loading ? 'transparent' : 'white')};
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
  selectedCategory,
  cameraPictureList,
  modalImgarr,
  isImageViewVisible,
  setIsImageViewVisible,
  CHECK_TITLE,
  setCHECK_TITLE,
  TITLE,
  END_TIME,
  setEND_TIME,
  EMP_NAME,
  setEMP_NAME,
  CHECK_TIME,
  setCHECK_TIME,
  checklist,
  checklistGoodState,
  setChecklistGoodState,
  checklistBadState,
  setChecklistBadState,
  categoryList,
  setSelectedCategory,
  setChecklist,
  setCameraPictureList,
  setModalImgarr,
  data,
  imageIndex,
  setImageIndex,
  ITEM_EMP_SEQ,
  EMP_SEQ,
  STORE,
  gotoChecklistSpecification,
  loading,
  DATE,
}) => {
  const renderImage = (item, index) => (
    <Touchable
      onPress={() => {
        setImageIndex(index);
        setIsImageViewVisible(true);
      }}
      key={index}>
      {console.log(item)}

      <FastImage
        style={{width: 100, height: 100, borderRadius: 10, marginHorizontal: 5}}
        source={{
          uri: utils.getUriImage(item),
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Touchable>
  );

  const renderFooter = (index: number) => (
    <Footer>
      <FooterText>
        {index + 1 || 1} / {modalImgarr.length}
      </FooterText>
    </Footer>
  );

  const CategoryListRenderItem = (item, index) => {
    const isSelected = item.MEMBER_SEQ1 == selectedCategory;
    return (
      <Category
        key={index}
        isSelected={isSelected}
        onPress={() => {
          let check = data.resultdata[item.key].CHECK_LIST;

          let checklistGoodState = new Array(checklist.length);
          let checklistBadState = new Array(checklist.length);

          checklistGoodState.fill(false);
          checklistBadState.fill(false);

          if (check !== null) {
            checklist = check.split('@');
            const size = checklist.length / 2;
            checklist = new Array();
            check = check.split('@');
            for (var i = 0; i < size; i++) {
              var checktemp = 2 * i;
              checklist[i] = check[checktemp];
              var temp = 2 * i + 1;
              if (check[temp] === '1') {
                checklistGoodState[i] = true;
              }
              if (check[temp] === '2') {
                checklistBadState[i] = true;
              }
            }
          } else {
            checklist = checklist.split('@@');
            checklist[checklist.length - 1] = checklist[
              checklist.length - 1
            ].replace('@', '');
          }

          const cameraPictureList = [];
          const modalImgarr = [];
          const imageList = (data.resultdata[item.key].IMAGE_LIST || '').split(
            '@',
          );
          if (imageList && Array.isArray(imageList)) {
            if (imageList[0] != '') {
              for (const imageName of imageList) {
                cameraPictureList.push(`${imageName}`);
                modalImgarr.push({
                  url: `${imageName}`,
                });
              }
            }
          }

          setChecklist(checklist);
          setEND_TIME(data.resultdata[item.key].END_TIME);
          setCHECK_TITLE(data.resultdata[item.key].CHECK_TITLE);
          setEMP_NAME(data.resultdata[item.key].EMP_NAME);
          setCHECK_TIME(data.resultdata[item.key].CHECK_TIME);
          setChecklistGoodState(checklistGoodState);
          setChecklistBadState(checklistBadState);
          setCameraPictureList(cameraPictureList);
          setModalImgarr(modalImgarr);

          setSelectedCategory(item.MEMBER_SEQ1);
        }}>
        <CategoryText isSelected={isSelected}>{item.EMP_NAME}</CategoryText>
      </Category>
    );
  };

  return (
    <BackGround>
      <CategoryList>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categoryList}
          horizontal={true}
          renderItem={({item, index}) => CategoryListRenderItem(item, index)}
        />
      </CategoryList>
      <ScrollView
        showsVerticalScrollIndicator={false}
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
            <RowSpace>
              <SectionText>{EMP_NAME ? '담당직원' : '확인직원'}</SectionText>
              <Text
                style={{
                  maxWidth: wp('100') - 160,
                  color: EMP_NAME ? '#000' : styleGuide.palette.primary,
                  fontWeight: EMP_NAME
                    ? styleGuide.fontWeight.normal
                    : styleGuide.fontWeight.bold,
                }}>
                {EMP_NAME ?? '체크전'}
              </Text>
            </RowSpace>
            <WhiteSpace />
            <RowSpace>
              <SectionText>확인시간</SectionText>
              <Text
                style={{
                  color: CHECK_TIME ? '#000' : '#e85356',
                  fontWeight: CHECK_TIME ? '300' : '600',
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
                {checklist?.length === 0 ? (
                  <ChecklistItem isLast={true}>
                    <Text>ex. 가스벨브 잠그기</Text>
                  </ChecklistItem>
                ) : (
                  <CheckBoxIconContainer>
                    <Text
                      style={{
                        fontSize: styleGuide.fontSize.middle,
                        color: styleGuide.palette.primary,
                      }}>
                      정상
                    </Text>
                    <Text
                      style={{
                        fontSize: styleGuide.fontSize.middle,
                        color: '#B91C1B',
                      }}>
                      이상
                    </Text>
                  </CheckBoxIconContainer>
                )}
              </ChecklistTitle>

              {checklist?.map((data, index) => (
                <ChecklistItem
                  key={index}
                  isLast={checklist?.length - 1 == index}>
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
                        checklistGoodStated[index] = !checklistGoodState[index];
                        checklistBadStated[index] = !checklistBadState[index];
                        setChecklistGoodState(checklistGoodStated);
                        setChecklistBadState(checklistBadStated);
                      }}
                      disabled={true}>
                      {checklistGoodState[index] ? (
                        <CheckBoxOnIcon
                          size={25}
                          color={styleGuide.palette.primary}
                        />
                      ) : (
                        <CheckBoxOffIcon
                          size={25}
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
                        checklistGoodStated[index] = !checklistGoodState[index];
                        checklistBadStated[index] = !checklistBadState[index];
                        setChecklistGoodState(checklistGoodStated);
                        setChecklistBadState(checklistBadStated);
                      }}
                      disabled={true}>
                      {checklistBadState[index] ? (
                        <CheckBoxOnIcon size={25} color="#B91C1B" />
                      ) : (
                        <CheckBoxOffIcon
                          size={25}
                          color={styleGuide.palette.lightGreyColor}
                        />
                      )}
                    </Touchable>
                  </CheckBoxIconContainer>
                </ChecklistItem>
              ))}
            </Box>
          </Section>

          {CHECK_TITLE?.length > 0 && (
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
                  editable={false}
                />
              </Box>
            </Section>
          )}

          {cameraPictureList?.length > 0 && (
            <Section>
              <SectionText>관련사진</SectionText>
              <WhiteSpace style={{height: 20}} />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                style={{flexDirection: 'row'}}
                data={cameraPictureList}
                renderItem={({item, index}) => renderImage(item, index)}
              />
            </Section>
          )}
        </Container>

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
            index={imageIndex}
            imageUrls={modalImgarr}
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
                  uri: utils.getUriImage(props.source.uri),
                  cache: FastImage.cacheControl.immutable,
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          />
        </Modal>
      </ScrollView>
      {((STORE == '0' && ITEM_EMP_SEQ?.includes(EMP_SEQ)) ||
        (STORE == '0' && !ITEM_EMP_SEQ)) &&
        DATE == moment().format('YYYY-MM-DD') && (
          <AddButtonContainer loading={loading}>
            {loading ? (
              <LottieView
                style={{
                  position: 'absolute',
                  right: -15,
                  bottom: -15,
                  width: 150,
                  height: 150,
                }}
                source={require('../../../../assets/animations/loading.json')}
                loop
                autoPlay
              />
            ) : (
              <AddButton onPress={() => gotoChecklistSpecification()}>
                <AddButtonText>체크</AddButtonText>
              </AddButton>
            )}
          </AddButtonContainer>
        )}
    </BackGround>
  );
};
