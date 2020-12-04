import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PieChart} from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';

import DonutCard from '~/components/DonutCard';
import {
  UpIcon,
  PlayCircleOutlineIcon,
  StopCircleOutlineIcon,
} from '~/constants/Icons';
import Schedule from '~/components/Schedule';

interface IColor {
  color: string;
}
interface ICard {
  color?: string;
  isLast?: boolean;
}

interface IEmpCard {
  isLast?: boolean;
  isSelected?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const Text = styled.Text`
  color: #7f7f7f;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled(Ripple)`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
`;

const Card = styled(Ripple)<ICard>`
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 480px;
  border-radius: 20px;
  background-color: white;
  margin-left: 20px;
  margin-right: ${(props) => (props.isLast ? wp('100%') - 220 : 0)};
`;

const TitleWord = styled.Text<IColor>`
  color: ${(props) => props.color};
  align-self: flex-start;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 18px;
`;

const DodnutTextContainer = styled.View`
  width: 70px;
  top: 115px;
  text-align: center;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const PercentageText = styled.Text<IColor>`
  color: ${(props) => props.color ?? 'black'};
  font-size: 25px;
  font-weight: bold;
`;

const PercentageSubText = styled.Text<IColor>`
  color: ${(props) => props.color ?? 'black'};
  font-size: 18px;
  font-weight: bold;
`;

const EmpCard = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const Column = styled.View`
  flex-direction: column;
`;

const DonutColumn = styled(Column)`
  width: 130px;
  height: 200px;
  justify-content: center;
  margin-right: 10px;
`;

const DonutColumnTitle = styled.Text`
  color: #7f7f7f;
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0;
`;

const DonutColumnText = styled(DonutColumnTitle)`
  font-size: 12px;
  font-weight: 400;
`;

const EmpConatainer = styled.View`
  width: 100%;
  height: 180px;
  justify-content: flex-start;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const EmpCardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  border-bottom-width: 0.7px;
  border-bottom-color: #7f7f7f;
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

const SmallText = styled.Text`
  font-size: 9px;
  color: #7f7f7f;
`;

const SmallTextRound = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border-width: 0.5px;
  border-color: #7f7f7f;
  padding: 0 10px;
  height: 30px;
  margin-right: 5px;
  margin-top: 5px;
`;

const EmpCardContainer = styled(Ripple)<IEmpCard>`
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  min-height: 220px;
  height: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  margin-left: 20px;
  margin-right: ${(props) => (props.isLast ? wp('100%') - 220 : 0)};
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
`;

const EmpCardDataRow = styled.View`
  width: 200px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
const GotoTopButtonContainer = styled.View`
  position: absolute;
  z-index: 2;
  right: ${wp('5%')}px;
  bottom: ${hp('5%')}px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;

const GotoTopButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
`;

export default ({
  EMP_LIST,
  TIME_EMP_LIST,
  totalEARLY,
  EARLY_EMP_LIST,
  totalLATE,
  LATE_EMP_LIST,
  totalREST_TIME,
  REST_TIME_EMP_LIST,
  totalVACATION,
  VACATION_EMP_LIST,
  totalNOWORK,
  NOWORK_EMP_LIST,
  totalWORKING,
  totlaWORKING_EMP,
  toDay,
  loading,
  visible,
  STORE_NAME,
  screenScrollRef,
  cardScrollRef,
  onPressSection,
  modalEARLY,
  setModalEARLY,
  modalLATE,
  setModalLATE,
  modalREST_TIME,
  setModalREST_TIME,
  modalVACATION,
  setModalVACATION,
  modalNOWORK,
  setModalNOWORK,
  selectedIndex,
  setSelectedIndex,
  onScroll,
  gotoSelectedIndex,
  indexTime,
  setIndexTime,
  scrollRef,
  gotoSelectedCard,
  gotoTop,
}) => {
  if (loading || visible) {
    return (
      <Container>
        <LottieView
          style={{
            marginTop: 20,
            width: 160,
            height: 160,
          }}
          source={require('../../../../assets/animations/dashBoardLoader.json')}
          loop
          autoPlay
        />
      </Container>
    );
  } else {
    if (totlaWORKING_EMP == 0 || EMP_LIST.length == 0) {
      return (
        <BackGround>
          <Container>
            <Text>금일 근무중인 직원이 없습니다. </Text>
          </Container>
        </BackGround>
      );
    } else {
      return (
        <BackGround>
          <GotoTopButtonContainer>
            <GotoTopButton onPress={() => gotoTop()}>
              <UpIcon />
            </GotoTopButton>
          </GotoTopButtonContainer>
          <Animated.ScrollView
            ref={screenScrollRef}
            style={{paddingBottom: hp('100%') - 420}}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}>
            <Container>
              <Section
                onPress={() => onPressSection()}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <Row>
                  <DonutCard
                    percentage={totalWORKING / totlaWORKING_EMP}
                    color={'#e85356'}
                    max={86400000}
                  />
                  <DodnutTextContainer
                    style={{
                      left: 65,
                      top: 80,
                      height: 40,
                    }}>
                    {Math.trunc(
                      moment
                        .duration(totalWORKING / totlaWORKING_EMP)
                        .asHours(),
                    ) != 0 && (
                      <PercentageSubText color={'#e85356'}>
                        {Math.trunc(
                          moment
                            .duration(totalWORKING / totlaWORKING_EMP)
                            .asHours(),
                        )}
                        시간
                      </PercentageSubText>
                    )}
                    {moment
                      .duration(totalWORKING / totlaWORKING_EMP)
                      .minutes() != 0 && (
                      <PercentageSubText color={'#e85356'}>
                        {moment
                          .duration(totalWORKING / totlaWORKING_EMP)
                          .minutes()}
                        분
                      </PercentageSubText>
                    )}
                  </DodnutTextContainer>
                  <DonutColumn>
                    <DonutColumnTitle style={{fontSize: 12}}>
                      {moment(toDay).format('M월 D일')}
                    </DonutColumnTitle>
                    <DonutColumnTitle>{STORE_NAME}점</DonutColumnTitle>
                    <WhiteSpace />
                    <DonutColumnText>
                      {Math.ceil((totlaWORKING_EMP / EMP_LIST.length) * 100)}%
                      근무&nbsp; ({totlaWORKING_EMP}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}%
                      지각&nbsp; ({totalLATE}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil((totalEARLY / totlaWORKING_EMP) * 100)}%
                      조퇴&nbsp; ({totalEARLY}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil((totalNOWORK / totlaWORKING_EMP) * 100)}%
                      결근&nbsp; ({totalNOWORK}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil(totalREST_TIME / totlaWORKING_EMP)}분 평균
                      휴게시간
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil((totalVACATION / totlaWORKING_EMP) * 100)}%
                      휴가&nbsp; ({totalVACATION}명)
                    </DonutColumnText>
                  </DonutColumn>
                </Row>
                <PieChart
                  data={EMP_LIST}
                  width={wp('100%') - 60}
                  height={200}
                  chartConfig={{
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: '#08130D',
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // optional
                  }}
                  accessor="WORKING"
                  backgroundColor="transparent"
                  paddingLeft="20"
                  absolute={false}
                />
              </Section>
            </Container>
            <Animated.ScrollView
              ref={cardScrollRef}
              horizontal
              scrollEventThrottle={16}
              snapToInterval={220}
              decelerationRate="fast"
              onScroll={onScroll}
              showsHorizontalScrollIndicator={false}>
              {[
                ...TIME_EMP_LIST,
                ...TIME_EMP_LIST,
                ...TIME_EMP_LIST,
                ...TIME_EMP_LIST,
                ...TIME_EMP_LIST,
                ...TIME_EMP_LIST,
                ...TIME_EMP_LIST,
              ]
                .sort(
                  (a, b) =>
                    moment(a.START_TIME, 'kk:mm').valueOf() -
                    moment(b.START_TIME, 'kk:mm').valueOf(),
                )
                .map((i, index) => {
                  return (
                    <EmpCardContainer
                      onPress={() => {
                        gotoSelectedCard(index);
                        gotoSelectedIndex(index);
                        setSelectedIndex(index);
                      }}
                      isSelected={index == selectedIndex}
                      isLast={
                        index ==
                        [
                          ...TIME_EMP_LIST,
                          ...TIME_EMP_LIST,
                          ...TIME_EMP_LIST,
                          ...TIME_EMP_LIST,
                          ...TIME_EMP_LIST,
                          ...TIME_EMP_LIST,
                          ...TIME_EMP_LIST,
                        ].length -
                          1
                      }
                      rippleColor={'#666'}
                      rippleDuration={600}
                      rippleSize={1700}
                      rippleContainerBorderRadius={20}
                      rippleOpacity={0.1}>
                      <EmpCard
                        key={index}
                        style={{
                          width: 160,
                          marginBottom: 20,
                          alignItems: 'flex-start',
                        }}>
                        <FastImage
                          style={{
                            marginRight: 10,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                          }}
                          source={{
                            uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                            headers: {Authorization: 'someAuthToken'},
                            priority: FastImage.priority.low,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <EmpCardRow style={{marginBottom: 0}}>
                          <Bold>
                            {i.EMP_NAME} [
                            {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                          </Bold>
                        </EmpCardRow>
                      </EmpCard>
                      {i.WORKING > 0 ? (
                        <Column>
                          <EmpCardDataRow style={{justifyContent: 'center'}}>
                            <Column style={{justifyContent: 'center'}}>
                              <IconContainer>
                                <PlayCircleOutlineIcon />
                                <Text style={{marginLeft: 5}}>
                                  시작시간:&nbsp;
                                  {Math.trunc(
                                    moment.duration(i.START_TIME).asHours(),
                                  )}
                                  시
                                  {moment.duration(i.START_TIME).minutes() >
                                    0 &&
                                    ` ${moment
                                      .duration(i.START_TIME)
                                      .minutes()}분`}
                                </Text>
                              </IconContainer>
                              <IconContainer>
                                <StopCircleOutlineIcon />
                                <Text style={{marginLeft: 5}}>
                                  종료시간:&nbsp;
                                  {Math.trunc(
                                    moment.duration(i.END_TIME).asHours(),
                                  )}
                                  시
                                  {moment.duration(i.WORKING).minutes() > 0 &&
                                    ` ${moment
                                      .duration(i.WORKING)
                                      .minutes()}분`}
                                </Text>
                              </IconContainer>
                            </Column>
                          </EmpCardDataRow>
                          <EmpCardDataRow style={{paddingLeft: 5}}>
                            {i.WORKING > 0 && (
                              <SmallTextRound>
                                <SmallText>
                                  근무시간:
                                  {Math.trunc(
                                    moment.duration(i.WORKING).asHours(),
                                  ) > 0 &&
                                    ` ${Math.trunc(
                                      moment.duration(i.WORKING).asHours(),
                                    )}시간`}
                                  {moment.duration(i.WORKING).minutes() > 0 &&
                                    ` ${moment
                                      .duration(i.WORKING)
                                      .minutes()}분`}
                                </SmallText>
                              </SmallTextRound>
                            )}
                            <SmallTextRound>
                              <SmallText>휴게시간: {i.REST_TIME}분</SmallText>
                            </SmallTextRound>
                            <SmallTextRound>
                              <SmallText>지각</SmallText>
                            </SmallTextRound>
                            <SmallTextRound>
                              <SmallText>조퇴</SmallText>
                            </SmallTextRound>
                            <SmallTextRound>
                              <SmallText>결근</SmallText>
                            </SmallTextRound>
                            <SmallTextRound>
                              <SmallText>휴가</SmallText>
                            </SmallTextRound>
                          </EmpCardDataRow>
                        </Column>
                      ) : (
                        <Column>
                          <Text style={{textAlign: 'center'}}>
                            금일 근무가 없습니다.
                          </Text>
                        </Column>
                      )}
                    </EmpCardContainer>
                  );
                })}
            </Animated.ScrollView>
            <Container>
              <Schedule
                TIME_EMP_LIST={TIME_EMP_LIST}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                gotoSelectedIndex={gotoSelectedIndex}
                indexTime={indexTime}
                setIndexTime={setIndexTime}
                scrollRef={scrollRef}
              />
            </Container>
            <Animated.ScrollView
              horizontal
              snapToInterval={220}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}>
              <Card
                onPress={() => setModalLATE(true)}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>지각률</TitleWord>
                <DonutCard
                  percentage={Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}
                  color={'#e85356'}
                  max={100}
                />
                {totalLATE / totlaWORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalLATE}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금일 지각 직원</TitleWord>
                <EmpConatainer>
                  {LATE_EMP_LIST.filter((i) => i.LATE && i.LATE !== '0')
                    .length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금일 지각 직원이 없습니다.{' '}
                    </Text>
                  ) : (
                    LATE_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.LATE &&
                        i.LATE !== '0' && (
                          <EmpCard key={index}>
                            <FastImage
                              style={{
                                margin: 10,
                                marginLeft: 20,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                              source={{
                                uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <Column>
                              <Bold>
                                {i.EMP_NAME} [
                                {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                              </Bold>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
              <Card
                onPress={() => setModalEARLY(true)}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>조퇴률</TitleWord>
                <DonutCard
                  percentage={Math.ceil((totalEARLY / totlaWORKING_EMP) * 100)}
                  color={'#e85356'}
                  max={100}
                />
                {totalEARLY / totlaWORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil((totalEARLY / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil((totalEARLY / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalEARLY}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금일 조퇴 직원</TitleWord>
                <EmpConatainer>
                  {EARLY_EMP_LIST.filter((i) => i.EARLY && i.EARLY !== '0')
                    .length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금일 조퇴 직원이 없습니다.{' '}
                    </Text>
                  ) : (
                    EARLY_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.EARLY &&
                        i.EARLY !== '0' && (
                          <EmpCard key={index}>
                            <FastImage
                              style={{
                                margin: 10,
                                marginLeft: 20,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                              source={{
                                uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <Column>
                              <Bold>
                                {i.EMP_NAME} [
                                {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                              </Bold>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
              <Card
                onPress={() => setModalNOWORK(true)}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>결근률</TitleWord>
                <DonutCard
                  percentage={Math.ceil((totalNOWORK / totlaWORKING_EMP) * 100)}
                  color={'#e85356'}
                  max={100}
                />
                {totalNOWORK / totlaWORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil((totalNOWORK / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil((totalNOWORK / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalNOWORK}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금일 결근 직원</TitleWord>
                <EmpConatainer>
                  {NOWORK_EMP_LIST.filter((i) => i.NOWORK && i.NOWORK !== '0')
                    .length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금일 결근 직원이 없습니다.{' '}
                    </Text>
                  ) : (
                    NOWORK_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.NOWORK &&
                        i.NOWORK !== '0' && (
                          <EmpCard key={index}>
                            <FastImage
                              style={{
                                margin: 10,
                                marginLeft: 20,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                              source={{
                                uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <Column>
                              <Bold>
                                {i.EMP_NAME} [
                                {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                              </Bold>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
              <Card
                onPress={() => setModalREST_TIME(true)}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>평균 휴게시간</TitleWord>
                <DonutCard
                  percentage={totalREST_TIME / totlaWORKING_EMP}
                  color={'#e85356'}
                  max={60}
                />
                <DodnutTextContainer>
                  <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                    {totalREST_TIME / totlaWORKING_EMP}분
                  </PercentageText>
                </DodnutTextContainer>
                <TitleWord color={'#e85356'}>휴게시간 상위직원</TitleWord>
                <EmpConatainer>
                  {REST_TIME_EMP_LIST.filter(
                    (i) => i.REST_TIME && i.REST_TIME !== '0',
                  ).length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      휴게시간이 있는 직원이 없습니다.
                    </Text>
                  ) : (
                    REST_TIME_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.REST_TIME &&
                        i.REST_TIME !== '0' && (
                          <EmpCard key={index}>
                            <FastImage
                              style={{
                                margin: 10,
                                marginLeft: 20,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                              source={{
                                uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <Column>
                              <Bold>
                                {i.EMP_NAME} [
                                {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                              </Bold>
                              <Text style={{marginTop: 5}}>
                                {i.REST_TIME}분
                              </Text>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
              <Card
                isLast={true}
                onPress={() => setModalVACATION(true)}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>휴가중인 직원</TitleWord>
                <DonutCard
                  percentage={totalVACATION}
                  color={'#e85356'}
                  max={totlaWORKING_EMP}
                />
                {totalVACATION / totlaWORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil((totalVACATION / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil((totalVACATION / totlaWORKING_EMP) * 100)}%
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalVACATION}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}

                <TitleWord color={'#e85356'}>금일 휴가 직원</TitleWord>
                <EmpConatainer>
                  {VACATION_EMP_LIST.filter(
                    (i) => i.VACATION && i.VACATION !== '0',
                  ).length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금일 휴가중인 직원이 없습니다.
                    </Text>
                  ) : (
                    VACATION_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.VACATION &&
                        i.VACATION !== '0' && (
                          <EmpCard key={index}>
                            <FastImage
                              style={{
                                margin: 10,
                                marginLeft: 20,
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                              source={{
                                uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <Column>
                              <Bold>
                                {i.EMP_NAME} [
                                {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                              </Bold>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
            </Animated.ScrollView>
          </Animated.ScrollView>
          <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onRequestClose={() => setModalEARLY(false)}
            onBackdropPress={() => setModalEARLY(false)}
            isVisible={modalEARLY}
            style={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 250}}
              onPress={() => setModalEARLY(false)}
              rippleColor={'#666'}
              rippleDuration={600}
              rippleSize={1700}
              rippleContainerBorderRadius={20}
              rippleOpacity={0.1}>
              {EARLY_EMP_LIST.map((i, index) => (
                <EmpCard key={index}>
                  <FastImage
                    style={{
                      margin: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{
                      uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Column>
                    <Bold>
                      {i.EMP_NAME} [{i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                    </Bold>
                    {i.EARLY == 1 ? (
                      <Row>
                        <SmallTextRound>
                          <SmallText>조퇴</SmallText>
                        </SmallTextRound>
                      </Row>
                    ) : (
                      <SmallText style={{fontSize: 18}}>&nbsp;</SmallText>
                    )}
                  </Column>
                </EmpCard>
              ))}
            </Section>
          </Modal>
          <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onRequestClose={() => setModalLATE(false)}
            onBackdropPress={() => setModalLATE(false)}
            isVisible={modalLATE}
            style={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 250}}
              onPress={() => setModalLATE(false)}
              rippleColor={'#666'}
              rippleDuration={600}
              rippleSize={1700}
              rippleContainerBorderRadius={20}
              rippleOpacity={0.1}>
              {LATE_EMP_LIST.map((i, index) => (
                <EmpCard key={index}>
                  <FastImage
                    style={{
                      margin: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{
                      uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Column>
                    <Bold>
                      {i.EMP_NAME} [{i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                    </Bold>
                    {i.LATE == 1 ? (
                      <Row>
                        <SmallTextRound>
                          <SmallText>지각</SmallText>
                        </SmallTextRound>
                      </Row>
                    ) : (
                      <SmallText style={{fontSize: 18}}>&nbsp;</SmallText>
                    )}
                  </Column>
                </EmpCard>
              ))}
            </Section>
          </Modal>
          <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onRequestClose={() => setModalNOWORK(false)}
            onBackdropPress={() => setModalNOWORK(false)}
            isVisible={modalNOWORK}
            style={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 250}}
              onPress={() => setModalNOWORK(false)}
              rippleColor={'#666'}
              rippleDuration={600}
              rippleSize={1700}
              rippleContainerBorderRadius={20}
              rippleOpacity={0.1}>
              {NOWORK_EMP_LIST.map((i, index) => (
                <EmpCard key={index}>
                  <FastImage
                    style={{
                      margin: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{
                      uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Column>
                    <Bold>
                      {i.EMP_NAME} [{i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                    </Bold>
                    {i.NOWORK == 1 ? (
                      <Row>
                        <SmallTextRound>
                          <SmallText>결근</SmallText>
                        </SmallTextRound>
                      </Row>
                    ) : (
                      <SmallText style={{fontSize: 18}}>&nbsp;</SmallText>
                    )}
                  </Column>
                </EmpCard>
              ))}
            </Section>
          </Modal>
          <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onRequestClose={() => setModalREST_TIME(false)}
            onBackdropPress={() => setModalREST_TIME(false)}
            isVisible={modalREST_TIME}
            style={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 250}}
              onPress={() => setModalREST_TIME(false)}
              rippleColor={'#666'}
              rippleDuration={600}
              rippleSize={1700}
              rippleContainerBorderRadius={20}
              rippleOpacity={0.1}>
              {REST_TIME_EMP_LIST.map((i, index) => (
                <EmpCard key={index}>
                  <FastImage
                    style={{
                      margin: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{
                      uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Column>
                    <Bold>
                      {i.EMP_NAME} [{i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                    </Bold>
                    {i.REST_TIME != '0' ? (
                      <Row>
                        <SmallTextRound>
                          <SmallText>휴게시간: {i.REST_TIME}분</SmallText>
                        </SmallTextRound>
                      </Row>
                    ) : (
                      <SmallText style={{fontSize: 18}}>&nbsp;</SmallText>
                    )}
                  </Column>
                </EmpCard>
              ))}
            </Section>
          </Modal>
          <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onRequestClose={() => setModalVACATION(false)}
            onBackdropPress={() => setModalVACATION(false)}
            isVisible={modalVACATION}
            style={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 250}}
              onPress={() => setModalVACATION(false)}
              rippleColor={'#666'}
              rippleDuration={600}
              rippleSize={1700}
              rippleContainerBorderRadius={20}
              rippleOpacity={0.1}>
              {VACATION_EMP_LIST.map((i, index) => (
                <EmpCard key={index}>
                  <FastImage
                    style={{
                      margin: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{
                      uri: `http://133.186.210.223/uploads/${i.IMAGE}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Column>
                    <Bold>
                      {i.EMP_NAME} [{i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                    </Bold>
                    {i.VACATION == 1 ? (
                      <Row>
                        <SmallTextRound>
                          <SmallText>휴가</SmallText>
                        </SmallTextRound>
                      </Row>
                    ) : (
                      <SmallText style={{fontSize: 18}}>&nbsp;</SmallText>
                    )}
                  </Column>
                </EmpCard>
              ))}
            </Section>
          </Modal>
        </BackGround>
      );
    }
  }
};
