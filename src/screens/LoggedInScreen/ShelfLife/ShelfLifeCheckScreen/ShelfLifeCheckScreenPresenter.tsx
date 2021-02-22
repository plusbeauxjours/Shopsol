import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-modal';
import BarcodeMask from 'react-native-barcode-mask';
import LottieView from 'lottie-react-native';

import DonutCard from '~/components/DonutCard';
import ShelfLifeCheckScreenCard from './ShelfLifeCheckScreenCard';
import ShelfLifeCheckScreenHeader from './ShelfLifeCheckScreenHeader';
import {AddIcon, CloseCircleOutlineIcon, BarCodeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import utils from '~/constants/utils';

interface IColor {
  color: string;
}

interface ICard {
  color: string;
  index?: number;
}

interface ILoading {
  loading?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const View = styled.View``;
const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
  padding-bottom: 80px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Card = styled(Ripple)<ICard>`
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 280px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  margin-left: 20px;
  margin-right: ${(props) => (props.index == 4 ? wp('100%') - 220 : 0)}px;
`;

const CardGreyLine = styled.View`
  width: 180px;
  height: 1px;
  background-color: ${styleGuide.palette.borderColor};
  margin: 10px 0 10px 0;
`;

const TitleText = styled.Text<IColor>`
  align-self: flex-start;
  font-size: ${styleGuide.fontSize.large}px;
  color: ${(props) => props.color};
  font-weight: ${styleGuide.fontWeight.bold};
  margin-left: 20px;
`;

const PercentageText = styled.Text<IColor>`
  color: ${(props) => props.color ?? 'black'};
  font-size: 25px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const SmallText = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: ${styleGuide.fontSize.small}px;
`;

const SmallBold = styled(SmallText)<IColor>`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const DodnutTextContainer = styled.View`
  width: 70px;
  top: 145px;
  text-align: center;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const LineTextContainer = styled.View<IColor>`
  align-self: flex-end;
  background-color: white;
  border-color: ${(props) => props.color ?? 'white'};
  border-width: 1px;
  border-radius: 15px;
  padding: 5px 10px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const LineText = styled.Text<IColor>`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${(props) => props.color ?? 'white'};
`;

const VerticalLine = styled.View`
  width: 0.6px;
  left: 30px;
  background-color: ${styleGuide.palette.lightGreyColor};
  position: absolute;
  height: 100%;
  top: 140px;
  z-index: -1;
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
  padding-left: 3px;
`;

const SearchInput = styled.TextInput`
  border-width: 2px;
  border-color: ${styleGuide.palette.searchBarColor};
  width: ${wp('100%') - 90}px;
  background-color: white;
  border-radius: 30px;
  padding-left: 20px;
  align-items: center;
  height: 40px;
  justify-content: center;
  margin-left: 50px;
`;

const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BarcodeIconConatiner = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
  height: 40px;
  width: 40px;
  border-width: 2px;
  border-color: ${styleGuide.palette.secondary};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
`;

const CloseIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  height: 40px;
  justify-content: center;
`;

const EmptyBox = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TextBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 5px;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;
const Footer = styled.View``;

const ModalFooter = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${styleGuide.palette.primary};
`;

const ModalFooterText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ModalPopupArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  align-items: center;
`;

const ModalPopupText = styled.Text`
  color: white;
`;

const ModalPopup = styled.View`
  padding: 14px;
  border-radius: 10px;
  elevation: 6;
  shadow-color: grey;
  shadow-offset: 3px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 3px;
  background-color: ${utils.isAndroid
    ? styleGuide.palette.greyColor
    : 'rgba(0,0,0,0.7)'};
`;

export default ({
  onRefresh,
  confirmModal,
  cancelModal,
  refreshing,
  data,
  tabs,
  scrollRef,
  onScroll,
  opacity,
  y,
  SHELFLIFE_DATA,
  gotoCategory,
  onMeasurement,
  ready,
  gotoAdd,
  search,
  setSearch,
  codenumber,
  setCodenumber,
  isCancelToastVisible,
  isUpdateToastVisible,
  barCodeCameraModalOpen,
  setBarCodeCameraModalOpen,
  handleBarCodeScanned,
  loading,
  STORE,
}) => {
  const cameraRef = useRef(null);
  if (SHELFLIFE_DATA?.length > 0 && data?.length > 0) {
    if (
      SHELFLIFE_DATA[0]?.items.length == 0 &&
      SHELFLIFE_DATA[1]?.items.length == 0 &&
      SHELFLIFE_DATA[2]?.items.length == 0 &&
      SHELFLIFE_DATA[3]?.items.length == 0 &&
      SHELFLIFE_DATA[4]?.items.length == 0
    ) {
      return (
        <BackGround>
          <Container style={{flex: 1, marginTop: 40}}>
            <EmptyBox>
              <FastImage
                style={{
                  width: 201,
                  marginVertical: 20,
                  height: 284,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../../../assets/images/emptyImg.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TextBox>
                <Column>
                  <EmptyText>유통기한 정보를 등록해주세요.</EmptyText>
                </Column>
              </TextBox>
            </EmptyBox>
            <AddButtonContainer>
              <AddButton onPress={() => gotoAdd()}>
                <AddIcon />
              </AddButton>
            </AddButtonContainer>
          </Container>
        </BackGround>
      );
    } else {
      return (
        <BackGround>
          <Animated.ScrollView
            ref={scrollRef}
            style={StyleSheet.absoluteFill}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center', paddingTop: 20}}
            scrollEventThrottle={16}
            onScroll={onScroll}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh('firstRoute')}
              />
            }>
            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={data}
              horizontal
              snapToInterval={220}
              decelerationRate="fast"
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Card
                  key={index}
                  color={item.backgroundColor}
                  index={index}
                  onPress={() => gotoCategory(index)}
                  rippleColor={styleGuide.palette.rippleGreyColor}
                  rippleDuration={600}
                  rippleSize={1700}
                  rippleContainerBorderRadius={20}
                  rippleOpacity={0.1}>
                  <Row
                    style={{
                      marginTop: 20,
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TitleText color={item.textColor}>
                      {item.titleWord}
                    </TitleText>
                    <Column style={{marginRight: 10}}>
                      <SmallText color={item.textColor}>전체 수량</SmallText>
                      <SmallBold color={item.textColor}>
                        <SmallBold color={item.textColor}>
                          {item.totalQTY}
                        </SmallBold>
                        &nbsp;개
                      </SmallBold>
                    </Column>
                  </Row>
                  <CardGreyLine />
                  <DonutCard
                    percentage={item.percentage}
                    color={item.textColor}
                    max={100}
                  />
                  <DodnutTextContainer>
                    <PercentageText color={item.textColor}>
                      {item.percentage}%
                    </PercentageText>
                  </DodnutTextContainer>
                </Card>
              )}
            />
            <Container>
              <Row>
                <SearchInputContainer>
                  <BarcodeIconConatiner
                    onPress={() => {
                      setSearch('');
                      setCodenumber('');
                      utils.handleCameraPermission(setBarCodeCameraModalOpen);
                    }}>
                    <BarCodeIcon
                      color={styleGuide.palette.searchBarColor}
                      size={20}
                    />
                  </BarcodeIconConatiner>
                  <SearchInput
                    placeholder="물품 검색"
                    placeholderTextColor={styleGuide.palette.searchBarColor}
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                  />
                  <CloseIconContainer
                    onPress={() => {
                      setSearch('');
                      setCodenumber('');
                    }}>
                    <CloseCircleOutlineIcon
                      color={styleGuide.palette.searchBarColor}
                      size={24}
                    />
                  </CloseIconContainer>
                </SearchInputContainer>
              </Row>
              {SHELFLIFE_DATA?.map(({name, color, items}, index) => (
                <View
                  key={index}
                  onLayout={({
                    nativeEvent: {
                      layout: {y: anchor},
                    },
                  }) => index !== 0 && onMeasurement(index, {name, anchor})}>
                  <VerticalLine />
                  {codenumber?.length > 0
                    ? items
                        ?.filter((i) => i.shelfLifeBarcode == codenumber)
                        .map((item, index) => {
                          return index == 0 ? (
                            <React.Fragment key={index}>
                              <LineTextContainer color={color}>
                                <LineText color={color}>{name}</LineText>
                              </LineTextContainer>
                              <View key={index}>
                                <ShelfLifeCheckScreenCard
                                  name={name}
                                  item={item}
                                  confirmModal={confirmModal}
                                  cancelModal={cancelModal}
                                  onRefresh={onRefresh}
                                  STORE={STORE}
                                />
                              </View>
                            </React.Fragment>
                          ) : (
                            <View key={index}>
                              <ShelfLifeCheckScreenCard
                                name={name}
                                item={item}
                                confirmModal={confirmModal}
                                cancelModal={cancelModal}
                                onRefresh={onRefresh}
                                STORE={STORE}
                              />
                            </View>
                          );
                        })
                    : search.length > 0
                    ? items
                        ?.filter(
                          (i) =>
                            i.shelfLifeName
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                            i.shelfLifeMemo
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                            i.shelfLifeBarcode
                              ?.toLowerCase()
                              .includes(search.toLowerCase()),
                        )
                        .map((item, index) => {
                          return index == 0 ? (
                            <React.Fragment key={index}>
                              <LineTextContainer color={color}>
                                <LineText color={color}>{name}</LineText>
                              </LineTextContainer>
                              <View key={index}>
                                <ShelfLifeCheckScreenCard
                                  name={name}
                                  item={item}
                                  confirmModal={confirmModal}
                                  cancelModal={cancelModal}
                                  onRefresh={onRefresh}
                                  STORE={STORE}
                                />
                              </View>
                            </React.Fragment>
                          ) : (
                            <View key={index}>
                              <ShelfLifeCheckScreenCard
                                name={name}
                                item={item}
                                confirmModal={confirmModal}
                                cancelModal={cancelModal}
                                onRefresh={onRefresh}
                                STORE={STORE}
                              />
                            </View>
                          );
                        })
                    : items?.map((item, index) => {
                        return index == 0 ? (
                          <React.Fragment key={index}>
                            <LineTextContainer color={color}>
                              <LineText color={color}>{name}</LineText>
                            </LineTextContainer>
                            <View key={index}>
                              <ShelfLifeCheckScreenCard
                                name={name}
                                item={item}
                                confirmModal={confirmModal}
                                cancelModal={cancelModal}
                                onRefresh={onRefresh}
                                STORE={STORE}
                              />
                            </View>
                          </React.Fragment>
                        ) : (
                          <View key={index}>
                            <ShelfLifeCheckScreenCard
                              name={name}
                              item={item}
                              confirmModal={confirmModal}
                              cancelModal={cancelModal}
                              onRefresh={onRefresh}
                              STORE={STORE}
                            />
                          </View>
                        );
                      })}
                </View>
              ))}
            </Container>
          </Animated.ScrollView>
          {tabs[4]?.anchor !== 20 && (
            <ShelfLifeCheckScreenHeader
              y={y}
              tabs={tabs}
              gotoCategory={gotoCategory}
              ready={ready}
            />
          )}
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
              <AddButton onPress={() => gotoAdd()}>
                <AddIcon />
              </AddButton>
            )}
          </AddButtonContainer>
          <Modal
            isVisible={barCodeCameraModalOpen}
            onBackdropPress={() => setBarCodeCameraModalOpen(false)}
            onRequestClose={() => setBarCodeCameraModalOpen(false)}
            style={{margin: 0}}
            avoidKeyboard={true}>
            <RNCamera
              ref={cameraRef}
              style={{flex: 1}}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              captureAudio={false}
              onBarCodeRead={({data}) => handleBarCodeScanned(data)}>
              <BarcodeMask
                width={300}
                height={100}
                outerMaskOpacity={0.8}
                edgeColor={styleGuide.palette.tertiary}
                edgeBorderWidth={2}
                showAnimatedLine={false}
              />
              <ModalFooter onPress={() => setBarCodeCameraModalOpen(false)}>
                <ModalFooterText>닫기</ModalFooterText>
              </ModalFooter>
            </RNCamera>
          </Modal>
          {isCancelToastVisible && (
            <ModalPopupArea>
              <ModalPopup>
                <ModalPopupText>
                  상품의 처리완료를 취소하였습니다.
                </ModalPopupText>
              </ModalPopup>
            </ModalPopupArea>
          )}
          {isUpdateToastVisible && (
            <ModalPopupArea>
              <ModalPopup>
                <ModalPopupText>
                  상품의 폐기 또는 처리를 완료하였습니다.
                </ModalPopupText>
              </ModalPopup>
            </ModalPopupArea>
          )}
        </BackGround>
      );
    }
  } else {
    return (
      <Container style={{paddingBottom: 0}}>
        <LottieView
          style={{
            width: 150,
            height: 150,
            marginBottom: 40,
          }}
          source={require('../../../../assets/animations/loading.json')}
          loop
          autoPlay
        />
        <EmptyText>유통기한 정보를 불러오는 중입니다. </EmptyText>
        <EmptyText>잠시만 기다려주세요.</EmptyText>
      </Container>
    );
  }
};
