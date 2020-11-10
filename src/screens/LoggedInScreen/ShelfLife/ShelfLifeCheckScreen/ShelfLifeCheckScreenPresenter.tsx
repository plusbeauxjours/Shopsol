import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import DonutCard from '~/components/DonutCard';
import MainDonut from '~/components/MainDonut';
import ShelfLifeCheckScreenCard from './ShelfLifeCheckScreenCard';
import ShelfLifeCheckScreenHeader from './ShelfLifeCheckScreenHeader';

interface IColor {
  color: string;
}

interface ICard {
  color: string;
  index?: number;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;
const View = styled.View``;
const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  height: 140px;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SpaceRow = styled(Row)`
  width: 80px;
  justify-content: space-between;
`;

const WideSpaceRow = styled(SpaceRow)`
  width: 110px;
`;

const Card = styled(Ripple)<ICard>`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 280px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  margin-left: 20px;
  margin-right: ${(props) => (props.index == 3 ? wp('100%') - 220 : 0)};
`;

const Title = styled.View`
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 10px;
`;

const TitleNumber = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: 60px;
  font-weight: bold;
`;

const TitleWord = styled(TitleNumber)`
  color: ${(props) => props.color};
  margin-top: 12px;
  font-size: 30px;
`;

const PercentageText = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: 30px;
  font-weight: bold;
  position: absolute;
`;

const Footer = styled.View`
  bottom: 10px;
  position: absolute;
  right: 20px;
`;

const SmallText = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: 12px;
`;

const SmallBold = styled(SmallText)<IColor>`
  font-weight: bold;
`;

const Donut = styled.View`
  position: absolute;
  top: 70px;
  left: 100px;
`;

const Column = styled.View`
  width: 100%;
  position: absolute;
  align-items: flex-end;
  right: 50px;
  top: 30px;
  flex-direction: column;
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
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color ?? 'white'};
`;

const MainDonutText = styled(LineText)<IColor>`
  text-align: right;
  margin-bottom: 10px;
`;

const VerticalLine = styled.View`
  width: 0.6px;
  left: 30px;
  background-color: #ddd;
  position: absolute;
  height: 100%;
  top: 140px;
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
}) => {
  if (SHELFLIFE_DATA?.length > 0 && data?.length > 0) {
    return (
      <BackGround>
        <Animated.ScrollView
          ref={scrollRef}
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          scrollEventThrottle={16}
          onScroll={onScroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh('firstRoute')}
            />
          }>
          <Container>
            <Section>
              <Donut>
                <MainDonut
                  percentage={data[0].totalQTY}
                  color={data[0].textColor}
                  radius={data[0].radius}
                  max={data[3].totalQTY}
                />
                <MainDonut
                  percentage={data[1].totalQTY}
                  color={data[1].textColor}
                  radius={data[1].radius}
                  max={data[3].totalQTY}
                />
                <MainDonut
                  percentage={data[2].totalQTY}
                  color={data[2].textColor}
                  radius={data[2].radius}
                  max={data[3].totalQTY}
                />
                <MainDonut
                  percentage={data[3].totalQTY}
                  color={data[3].textColor}
                  radius={data[3].radius}
                  max={data[3].totalQTY}
                />
              </Donut>
              <Column>
                <MainDonutText color={data[3].textColor}>
                  유통기한 등록 상품&nbsp;
                </MainDonutText>
                <WideSpaceRow>
                  <SmallText
                    color={data[0].textColor}
                    style={{fontWeight: 'bold'}}>
                    1일전 전체 수량
                  </SmallText>
                  <SmallBold color={data[0].textColor}>
                    {data[0].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
                <WideSpaceRow>
                  <SmallText color={data[3].textColor}>
                    1주전 전체 수량
                  </SmallText>
                  <SmallBold color={data[3].textColor}>
                    {data[1].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
                <WideSpaceRow>
                  <SmallText color={data[3].textColor}>
                    2주전 전체 수량
                  </SmallText>
                  <SmallBold color={data[3].textColor}>
                    {data[2].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
                <WideSpaceRow>
                  <SmallText color={data[3].textColor}>
                    1달전 전체 수량
                  </SmallText>
                  <SmallBold color={data[3].textColor}>
                    {data[3].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
              </Column>
            </Section>
          </Container>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
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
                <Title>
                  <TitleNumber color={item.textColor}>
                    {item.titleNumber}
                  </TitleNumber>
                  <TitleWord color={item.textColor}>{item.titleWord}</TitleWord>
                </Title>
                <DonutCard
                  percentage={item.percentage}
                  color={item.textColor}
                  max={100}
                />
                <PercentageText color={item.textColor}>
                  {item.percentage}%
                </PercentageText>
                <Footer>
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
                </Footer>
              </Card>
            )}
          />
          <Container>
            {SHELFLIFE_DATA.map(({name, color, items}, index) => (
              <View
                key={index}
                onLayout={({
                  nativeEvent: {
                    layout: {y: anchor},
                  },
                }) => index !== 0 && onMeasurement(index, {name, anchor})}>
                <VerticalLine />
                {items?.length !== 0 && (
                  <LineTextContainer
                    as={Animated.View}
                    style={{opacity: opacity(tabs[index].anchor)}}
                    color={color}>
                    <LineText color={color}>{name}</LineText>
                  </LineTextContainer>
                )}
                {items?.map((item, index) => (
                  <View key={index}>
                    <ShelfLifeCheckScreenCard
                      name={name}
                      item={item}
                      confirmModal={confirmModal}
                      cancelModal={cancelModal}
                    />
                  </View>
                ))}
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
      </BackGround>
    );
  } else {
    return null;
  }
};
