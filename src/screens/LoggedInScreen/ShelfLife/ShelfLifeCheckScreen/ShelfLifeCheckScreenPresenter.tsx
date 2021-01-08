import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import DonutCard from '~/components/DonutCard';
import ShelfLifeCheckScreenCard from './ShelfLifeCheckScreenCard';
import ShelfLifeCheckScreenHeader from './ShelfLifeCheckScreenHeader';
import {AddIcon, CloseCircleOutlineIcon, BarCodeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-modal';
import BarcodeMask from 'react-native-barcode-mask';

interface IColor {
  color: string;
}

interface ICard {
  color: string;
  index?: number;
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

const SpaceRow = styled(Row)`
  margin-right: 10px;
  min-width: 60px;
  justify-content: space-between;
`;

const Card = styled(Ripple)<ICard>`
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 280px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  margin-left: 20px;
  margin-right: ${(props) => (props.index == 3 ? wp('100%') - 220 : 0)}px;
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
  padding: 5px 15px;
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

const SearchInput = styled.TextInput`
  border-width: 2px;
  border-color: ${styleGuide.palette.secondary};
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
  justify-content: center;
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
  fetchData,
  search,
  setSearch,
  codenumber,
  barCodeCameraModalOpen,
  setBarCodeCameraModalOpen,
  handleBarCodeScanned,
}) => {
  const cameraRef = useRef(null);

  if (SHELFLIFE_DATA?.length > 0 && data?.length > 0) {
    if (
      SHELFLIFE_DATA[0]?.items.length == 0 &&
      SHELFLIFE_DATA[1]?.items.length == 0 &&
      SHELFLIFE_DATA[2]?.items.length == 0 &&
      SHELFLIFE_DATA[3]?.items.length == 0
    ) {
      return (
        <BackGround>
          <Container style={{flex: 1, marginTop: 40}}>
            <EmptyBox>
              <FastImage
                style={{
                  width: 300,
                  height: 425,
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
                  rippleColor={'#666'}
                  rippleDuration={600}
                  rippleSize={1700}
                  rippleContainerBorderRadius={20}
                  rippleOpacity={0.1}>
                  <Row
                    style={{
                      marginTop: 20,
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <TitleText color={item.textColor}>
                      {item.titleWord}
                    </TitleText>
                    <SpaceRow>
                      <SmallText color={item.textColor}>전체 수량</SmallText>
                      <SmallText color={item.textColor}>
                        <SmallBold color={item.textColor}>
                          {item.totalQTY}
                        </SmallBold>
                        &nbsp;개
                      </SmallText>
                    </SpaceRow>
                    <SpaceRow>
                      <SmallText color={item.textColor}>처리 수량</SmallText>
                      <SmallText color={item.textColor}>
                        <SmallBold color={item.textColor}>
                          {item.doneQTY}
                        </SmallBold>
                        &nbsp;개
                      </SmallText>
                    </SpaceRow>
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
                      setCodenumber('');
                      setBarCodeCameraModalOpen(true);
                    }}>
                    <BarCodeIcon size={20} />
                  </BarcodeIconConatiner>
                  <SearchInput
                    placeholder="물품 검색"
                    placeholderTextColor={styleGuide.palette.greyColor}
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                  />
                  <CloseIconContainer onPress={() => setSearch('')}>
                    <CloseCircleOutlineIcon
                      color={styleGuide.palette.secondary}
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
                  {codenumber.length > 0
                    ? items
                        ?.filter((i) => i.shelfLifeBarcode == codenumber)
                        .map((item, index) => {
                          return index == 0 ? (
                            <React.Fragment key={index}>
                              <LineTextContainer
                                as={Animated.View}
                                style={{opacity: opacity(tabs[index].anchor)}}
                                color={color}>
                                <LineText color={color}>{name}</LineText>
                              </LineTextContainer>
                              <View key={index}>
                                <ShelfLifeCheckScreenCard
                                  name={name}
                                  item={item}
                                  confirmModal={confirmModal}
                                  cancelModal={cancelModal}
                                  fetchData={fetchData}
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
                                fetchData={fetchData}
                              />
                            </View>
                          );
                        })
                    : search.length > 0
                    ? items
                        ?.filter(
                          (i) =>
                            i.shelfLifeName
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            i.shelfLifeMemo
                              .toLowerCase()
                              .includes(search.toLowerCase()),
                        )
                        .map((item, index) => {
                          return index == 0 ? (
                            <React.Fragment key={index}>
                              <LineTextContainer
                                as={Animated.View}
                                style={{opacity: opacity(tabs[index].anchor)}}
                                color={color}>
                                <LineText color={color}>{name}</LineText>
                              </LineTextContainer>
                              <View key={index}>
                                <ShelfLifeCheckScreenCard
                                  name={name}
                                  item={item}
                                  confirmModal={confirmModal}
                                  cancelModal={cancelModal}
                                  fetchData={fetchData}
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
                                fetchData={fetchData}
                              />
                            </View>
                          );
                        })
                    : items?.map((item, index) => {
                        return index == 0 ? (
                          <React.Fragment key={index}>
                            <LineTextContainer
                              as={Animated.View}
                              style={{opacity: opacity(tabs[index].anchor)}}
                              color={color}>
                              <LineText color={color}>{name}</LineText>
                            </LineTextContainer>
                            <View key={index}>
                              <ShelfLifeCheckScreenCard
                                name={name}
                                item={item}
                                confirmModal={confirmModal}
                                cancelModal={cancelModal}
                                fetchData={fetchData}
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
                              fetchData={fetchData}
                            />
                          </View>
                        );
                      })}
                </View>
              ))}
            </Container>
          </Animated.ScrollView>
          {tabs[3]?.anchor !== 20 && (
            <ShelfLifeCheckScreenHeader
              y={y}
              tabs={tabs}
              gotoCategory={gotoCategory}
              ready={ready}
            />
          )}
          <AddButtonContainer>
            <AddButton onPress={() => gotoAdd()}>
              <AddIcon />
            </AddButton>
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
              onFacesDetected={() => {}}
              onFocusChanged={() => {}}
              onZoomChanged={() => {}}
              onBarCodeRead={({data}) => handleBarCodeScanned(data)}>
              <BarcodeMask
                width={300}
                height={100}
                outerMaskOpacity={0.8}
                edgeColor={styleGuide.palette.tertiary}
                edgeBorderWidth={2}
                showAnimatedLine={false}
              />
              <Footer onPress={() => setBarCodeCameraModalOpen(false)}>
                <FooterText>닫기</FooterText>
              </Footer>
            </RNCamera>
          </Modal>
        </BackGround>
      );
    }
  } else {
    return null;
  }
};
