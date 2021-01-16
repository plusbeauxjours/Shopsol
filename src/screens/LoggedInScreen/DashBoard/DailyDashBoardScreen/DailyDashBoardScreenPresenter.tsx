import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  BackIcon,
  ForwardIcon,
  CloseCircleOutlineIcon,
} from '~/constants/Icons';
import Schedule from '~/components/Schedule';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

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

const ScrollView = styled.ScrollView``;
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Text = styled.Text`
  color: ${styleGuide.palette.greyColor};
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
  height: 520px;
  border-radius: 20px;
  background-color: white;
  margin-left: 20px;
  margin-right: ${(props) => (props.isLast ? wp('100%') - 220 : 0)}px;
`;

const CardGreyLine = styled.View`
  width: 180px;
  height: 1px;
  background-color: ${styleGuide.palette.borderColor};
  margin: 10px 0 10px 0;
`;

const TitleText = styled.Text`
  align-self: flex-start;
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
  margin-top: 20px;
  margin-left: 20px;
`;

const DodnutTextContainer = styled.View`
  width: 70px;
  top: 130px;
  text-align: center;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const PercentageText = styled.Text<IColor>`
  color: ${(props) => props.color ?? 'black'};
  font-size: 25px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const PercentageSubText = styled.Text<IColor>`
  color: ${(props) => props.color ?? 'black'};
  font-size: ${styleGuide.fontSize.middle}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const EmpCard = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const EmpCardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${wp('100%') - 80}px;
`;

const Bold = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
`;

const Column = styled.View`
  flex-direction: column;
`;

const DonutColumn = styled(Column)`
  width: 130px;
  height: 200px;
  justify-content: flex-start;
  margin-right: 10px;
  padding-top: 10px;
`;

const DonutColumnTitle = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: 18px;
  font-weight: ${styleGuide.fontWeight.bold};
  margin: 3px 0;
`;

const DonutColumnText = styled(DonutColumnTitle)`
  font-size: ${styleGuide.fontSize.middle}px;
  font-weight: ${styleGuide.fontWeight.normal};
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

const SmallText = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  color: ${styleGuide.palette.greyColor};
`;

const SmallTextRound = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border-width: 0.5px;
  border-color: ${styleGuide.palette.greyColor};
  padding: 5px;
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
  right: 30px;
  bottom: 30px;
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
  background-color: ${styleGuide.palette.primary};
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
`;

const ModalSection = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
`;

const SearchInput = styled.TextInput`
  border-width: 2px;
  border-color: ${styleGuide.palette.secondary};
  width: ${wp('100%') - 40}px;
  background-color: white;
  border-radius: 30px;
  padding-left: 20px;
  align-items: center;
  height: 40px;
  justify-content: center;
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
  border-color: ${styleGuide.palette.secondary};
`;

const DateArrowRight = styled(DateArrowLeft)``;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateSection = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  margin-bottom: 20px;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  height: 40px;
  justify-content: center;
`;

const GreyText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  position: absolute;
  color: ${styleGuide.palette.greyColor};
`;

const EmptyView = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
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
  search,
  result,
  searchName,
  prevDay,
  nextDay,
  setSearch,
  MANAGER_CALLED,
}) => {
  const EmpCardComponent = ({i, index}) => (
    <EmpCardContainer
      onPress={() => {
        gotoSelectedCard(index);
        gotoSelectedIndex(index);
        setSelectedIndex(index);
      }}
      isSelected={index == selectedIndex}
      isLast={
        index ==
        (search.length !== 0 ? result.length - 1 : TIME_EMP_LIST.length - 1)
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
            {i.EMP_NAME} [{i.IS_MANAGER == '1' ? MANAGER_CALLED : '직원'}]
          </Bold>
        </EmpCardRow>
      </EmpCard>
      {i.VACATION && i.VACATION_PAID ? (
        <Row style={{justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>유급휴가일 입니다.</Text>
        </Row>
      ) : i.VACATION && !i.VACATION_PAID ? (
        <Row style={{justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>무급휴가일 입니다.</Text>
        </Row>
      ) : i.WORKING > 0 ? (
        <Column>
          <EmpCardDataRow style={{justifyContent: 'center'}}>
            <Column style={{justifyContent: 'center'}}>
              <IconContainer>
                <PlayCircleOutlineIcon />
                <Text
                  style={{
                    marginLeft: 5,
                    textAlign: 'right',
                    width: 60,
                  }}>
                  시작시간:&nbsp;
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    textAlign: 'right',
                    width: 60,
                  }}>
                  {i.START_TIME.slice(0, 5)}
                </Text>
              </IconContainer>
              <IconContainer>
                <StopCircleOutlineIcon />
                <Text
                  style={{
                    marginLeft: 5,
                    textAlign: 'right',
                    width: 60,
                  }}>
                  종료시간:&nbsp;
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    textAlign: 'right',
                    width: 60,
                  }}>
                  {moment.duration(i.START_TIME) >
                    moment.duration(i.END_TIME) && (
                    <SmallText>익일&nbsp;</SmallText>
                  )}
                  {i.END_TIME.slice(0, 5)}
                </Text>
              </IconContainer>
            </Column>
          </EmpCardDataRow>
          <EmpCardDataRow style={{paddingLeft: 5}}>
            {i.WORKING > 0 ? (
              <SmallTextRound>
                <SmallText>
                  근무시간:
                  {Math.trunc(moment.duration(i.WORKING).asHours()) > 0 &&
                    ` ${Math.trunc(moment.duration(i.WORKING).asHours())}시간`}
                  {moment.duration(i.WORKING).minutes() > 0 &&
                    ` ${moment.duration(i.WORKING).minutes()}분`}
                </SmallText>
              </SmallTextRound>
            ) : (
              <Row style={{justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  해당일에 근무가 없습니다.
                </Text>
              </Row>
            )}
            {i.REST_TIME > 0 && (
              <SmallTextRound>
                <SmallText>휴게시간: {i.REST_TIME}분</SmallText>
              </SmallTextRound>
            )}
            {i.LATE !== '0' && (
              <SmallTextRound>
                <SmallText>지각: {i.LATE}일</SmallText>
              </SmallTextRound>
            )}
            {i.EARLY !== '0' && (
              <SmallTextRound>
                <SmallText>조퇴: {i.EARLY}일</SmallText>
              </SmallTextRound>
            )}
            {i.NOWORK !== '0' && (
              <SmallTextRound>
                <SmallText>결근: {i.NOWORK}일</SmallText>
              </SmallTextRound>
            )}
            {i.VACATION && (
              <SmallTextRound>
                <SmallText>휴가: {i.VACATION}일</SmallText>
              </SmallTextRound>
            )}
          </EmpCardDataRow>
        </Column>
      ) : (
        <Column>
          <Text style={{textAlign: 'center'}}>금일 근무가 없습니다.</Text>
        </Column>
      )}
    </EmpCardContainer>
  );
  if (loading) {
    return (
      <Container>
        <LottieView
          style={{
            marginTop: 20,
            width: 150,
            height: 150,
            marginBottom: 40,
          }}
          source={require('../../../../assets/animations/loading.json')}
          loop
          autoPlay
        />
      </Container>
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
            <DateSection>
              <Date>
                <DateArrowLeft onPress={() => prevDay()}>
                  <BackIcon size={22} color={styleGuide.palette.secondary} />
                </DateArrowLeft>
                <DateTextArea>
                  <DateText>{moment(toDay).format('YYYY년 M월 D일')}</DateText>
                  <DateText
                    style={{
                      fontSize: styleGuide.fontSize.middle,
                      fontWeight: '300',
                    }}>
                    {utils.renderWeekDay(moment(toDay).format('d'))}
                  </DateText>
                </DateTextArea>
                <DateArrowRight onPress={() => nextDay()}>
                  <ForwardIcon size={22} color={styleGuide.palette.secondary} />
                </DateArrowRight>
              </Date>
            </DateSection>
            {totlaWORKING_EMP == 0 ||
            totalWORKING == 0 ||
            EMP_LIST.length == 0 ? (
              <EmptyView>
                <FastImage
                  style={{
                    width: 220,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 90,
                  }}
                  source={require('../../../../assets/images/emptyBalloons.png')}
                  resizeMode={FastImage.resizeMode.cover}>
                  <GreyText>근무 직원이 없습니다.</GreyText>
                </FastImage>
                <FastImage
                  style={{
                    width: 100,
                    height: 63,
                    marginTop: 3,
                    bottom: 0,
                    marginLeft: 170,
                  }}
                  source={require('../../../../assets/images/emptyIcon.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </EmptyView>
            ) : (
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
                    color={styleGuide.palette.primary}
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
                      <PercentageSubText color={styleGuide.palette.primary}>
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
                      <PercentageSubText color={styleGuide.palette.primary}>
                        {moment
                          .duration(totalWORKING / totlaWORKING_EMP)
                          .minutes()}
                        분
                      </PercentageSubText>
                    )}
                  </DodnutTextContainer>
                  <DonutColumn>
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
              </Section>
            )}
          </Container>
          {totlaWORKING_EMP != 0 && totalWORKING != 0 && EMP_LIST.length != 0 && (
            <>
              <SearchInputContainer>
                <SearchInput
                  placeholder="이름으로 검색 ex) 홍길동, ㅎㄱㄷ"
                  placeholderTextColor={styleGuide.palette.greyColor}
                  onChangeText={(text) => searchName(text)}
                  value={search}
                />
                <CloseIconContainer onPress={() => setSearch('')}>
                  <CloseCircleOutlineIcon
                    color={styleGuide.palette.secondary}
                    size={24}
                  />
                </CloseIconContainer>
              </SearchInputContainer>
              <Animated.ScrollView
                ref={cardScrollRef}
                horizontal
                scrollEventThrottle={16}
                snapToInterval={220}
                decelerationRate="fast"
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}>
                {search?.length !== 0
                  ? result?.map((i, index) => (
                      <EmpCardComponent i={i} index={index} key={index} />
                    ))
                  : TIME_EMP_LIST?.map((i, index) => (
                      <EmpCardComponent i={i} index={index} key={index} />
                    ))}
              </Animated.ScrollView>
              {search.length !== 0 ? (
                result.length > 0 ? (
                  <Container>
                    <Schedule
                      TIME_EMP_LIST={
                        search.length !== 0 ? result : TIME_EMP_LIST
                      }
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      gotoSelectedIndex={gotoSelectedIndex}
                      indexTime={indexTime}
                      setIndexTime={setIndexTime}
                      scrollRef={scrollRef}
                    />
                  </Container>
                ) : (
                  <Text style={{margin: 30, marginBottom: 70}}>
                    검색된 직원이 없습니다.
                  </Text>
                )
              ) : (
                totlaWORKING_EMP > 0 && (
                  <Container>
                    <Schedule
                      TIME_EMP_LIST={
                        search.length !== 0 ? result : TIME_EMP_LIST
                      }
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      gotoSelectedIndex={gotoSelectedIndex}
                      indexTime={indexTime}
                      setIndexTime={setIndexTime}
                      scrollRef={scrollRef}
                    />
                  </Container>
                )
              )}

              <ScrollView
                horizontal
                snapToInterval={220}
                style={{marginBottom: 20}}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}>
                <Card
                  onPress={() => setModalLATE(true)}
                  rippleColor={'#666'}
                  rippleDuration={600}
                  rippleSize={1700}
                  rippleContainerBorderRadius={20}
                  rippleOpacity={0.1}>
                  <TitleText>지각률 </TitleText>
                  <CardGreyLine />
                  <DonutCard
                    percentage={Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}
                    color={styleGuide.palette.primary}
                    max={100}
                  />
                  {totalLATE / totlaWORKING_EMP == 0 ? (
                    <DodnutTextContainer>
                      <PercentageText
                        color={styleGuide.palette.primary}
                        style={{marginTop: 10}}>
                        {Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                    </DodnutTextContainer>
                  ) : (
                    <DodnutTextContainer style={{marginTop: 5}}>
                      <PercentageText color={styleGuide.palette.primary}>
                        {Math.ceil((totalLATE / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                      <PercentageSubText color={styleGuide.palette.primary}>
                        {totalLATE}명
                      </PercentageSubText>
                    </DodnutTextContainer>
                  )}
                  <TitleText>지각 직원</TitleText>
                  <CardGreyLine />
                  <EmpConatainer>
                    {LATE_EMP_LIST.filter((i) => i.LATE && i.LATE !== '0')
                      .length === 0 ? (
                      <Text style={{marginTop: 20}}>지각 직원이 없습니다.</Text>
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
                                  {i.IS_MANAGER == '1'
                                    ? MANAGER_CALLED
                                    : '직원'}
                                  ]
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
                  <TitleText>조퇴률 </TitleText>
                  <CardGreyLine />
                  <DonutCard
                    percentage={Math.ceil(
                      (totalEARLY / totlaWORKING_EMP) * 100,
                    )}
                    color={styleGuide.palette.primary}
                    max={100}
                  />
                  {totalEARLY / totlaWORKING_EMP == 0 ? (
                    <DodnutTextContainer>
                      <PercentageText
                        color={styleGuide.palette.primary}
                        style={{marginTop: 10}}>
                        {Math.ceil((totalEARLY / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                    </DodnutTextContainer>
                  ) : (
                    <DodnutTextContainer style={{marginTop: 5}}>
                      <PercentageText color={styleGuide.palette.primary}>
                        {Math.ceil((totalEARLY / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                      <PercentageSubText color={styleGuide.palette.primary}>
                        {totalEARLY}명
                      </PercentageSubText>
                    </DodnutTextContainer>
                  )}
                  <TitleText>조퇴 직원</TitleText>
                  <CardGreyLine />
                  <EmpConatainer>
                    {EARLY_EMP_LIST.filter((i) => i.EARLY && i.EARLY !== '0')
                      .length === 0 ? (
                      <Text style={{marginTop: 20}}>조퇴 직원이 없습니다.</Text>
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
                                  {i.IS_MANAGER == '1'
                                    ? MANAGER_CALLED
                                    : '직원'}
                                  ]
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
                  <TitleText>결근률 </TitleText>
                  <CardGreyLine />
                  <DonutCard
                    percentage={Math.ceil(
                      (totalNOWORK / totlaWORKING_EMP) * 100,
                    )}
                    color={styleGuide.palette.primary}
                    max={100}
                  />
                  {totalNOWORK / totlaWORKING_EMP == 0 ? (
                    <DodnutTextContainer>
                      <PercentageText
                        color={styleGuide.palette.primary}
                        style={{marginTop: 10}}>
                        {Math.ceil((totalNOWORK / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                    </DodnutTextContainer>
                  ) : (
                    <DodnutTextContainer style={{marginTop: 5}}>
                      <PercentageText color={styleGuide.palette.primary}>
                        {Math.ceil((totalNOWORK / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                      <PercentageSubText color={styleGuide.palette.primary}>
                        {totalNOWORK}명
                      </PercentageSubText>
                    </DodnutTextContainer>
                  )}
                  <TitleText>결근 직원</TitleText>
                  <CardGreyLine />
                  <EmpConatainer>
                    {NOWORK_EMP_LIST.filter((i) => i.NOWORK && i.NOWORK !== '0')
                      .length === 0 ? (
                      <Text style={{marginTop: 20}}>결근 직원이 없습니다.</Text>
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
                                  {i.IS_MANAGER == '1'
                                    ? MANAGER_CALLED
                                    : '직원'}
                                  ]
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
                  <TitleText>평균&nbsp;휴게시간</TitleText>
                  <CardGreyLine />
                  <DonutCard
                    percentage={Math.ceil(totalREST_TIME / totlaWORKING_EMP)}
                    color={styleGuide.palette.primary}
                    max={60}
                  />
                  <DodnutTextContainer>
                    <PercentageText
                      color={styleGuide.palette.primary}
                      style={{marginTop: 10}}>
                      {Math.ceil(totalREST_TIME / totlaWORKING_EMP)}분
                    </PercentageText>
                  </DodnutTextContainer>
                  <TitleText>휴게시간 상위직원</TitleText>
                  <CardGreyLine />
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
                                  {i.IS_MANAGER == '1'
                                    ? MANAGER_CALLED
                                    : '직원'}
                                  ]
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
                  <TitleText>휴가중인 직원</TitleText>
                  <CardGreyLine />
                  <DonutCard
                    percentage={totalVACATION}
                    color={styleGuide.palette.primary}
                    max={totlaWORKING_EMP}
                  />
                  {totalVACATION / totlaWORKING_EMP == 0 ? (
                    <DodnutTextContainer>
                      <PercentageText
                        color={styleGuide.palette.primary}
                        style={{marginTop: 10}}>
                        {Math.ceil((totalVACATION / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                    </DodnutTextContainer>
                  ) : (
                    <DodnutTextContainer style={{marginTop: 5}}>
                      <PercentageText color={styleGuide.palette.primary}>
                        {Math.ceil((totalVACATION / totlaWORKING_EMP) * 100)}%
                      </PercentageText>
                      <PercentageSubText color={styleGuide.palette.primary}>
                        {totalVACATION}명
                      </PercentageSubText>
                    </DodnutTextContainer>
                  )}

                  <TitleText>휴가 직원</TitleText>
                  <CardGreyLine />
                  <EmpConatainer>
                    {VACATION_EMP_LIST.filter((i) => i.VACATION).length ===
                    0 ? (
                      <Text style={{marginTop: 20}}>
                        휴가중인 직원이 없습니다.
                      </Text>
                    ) : (
                      VACATION_EMP_LIST.slice(0, 3).map(
                        (i, index) =>
                          i.VACATION && (
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
                                  {i.IS_MANAGER == '1'
                                    ? MANAGER_CALLED
                                    : '직원'}
                                  ]
                                </Bold>
                              </Column>
                            </EmpCard>
                          ),
                      )
                    )}
                  </EmpConatainer>
                </Card>
              </ScrollView>
            </>
          )}
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
          <ModalSection style={{width: 250, maxHeight: 600}}>
            <ScrollView
              keyboardDismissMode="on-drag"
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
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
                      {i.EMP_NAME} [
                      {i.IS_MANAGER == '1' ? MANAGER_CALLED : '직원'}]
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
            </ScrollView>
          </ModalSection>
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
          <ModalSection style={{width: 250, maxHeight: 600}}>
            <ScrollView
              keyboardDismissMode="on-drag"
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
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
                      {i.EMP_NAME} [
                      {i.IS_MANAGER == '1' ? MANAGER_CALLED : '직원'}]
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
            </ScrollView>
          </ModalSection>
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
          <ModalSection style={{width: 250, maxHeight: 600}}>
            <ScrollView
              keyboardDismissMode="on-drag"
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
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
                      {i.EMP_NAME} [
                      {i.IS_MANAGER == '1' ? MANAGER_CALLED : '직원'}]
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
            </ScrollView>
          </ModalSection>
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
          <ModalSection style={{width: 250, maxHeight: 600}}>
            <ScrollView
              keyboardDismissMode="on-drag"
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
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
                      {i.EMP_NAME} [
                      {i.IS_MANAGER == '1' ? MANAGER_CALLED : '직원'}]
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
            </ScrollView>
          </ModalSection>
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
          <ModalSection style={{width: 250, maxHeight: 600}}>
            <ScrollView
              keyboardDismissMode="on-drag"
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
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
                      {i.EMP_NAME} [
                      {i.IS_MANAGER == '1' ? MANAGER_CALLED : '직원'}]
                    </Bold>
                    {i.VACATION ? (
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
            </ScrollView>
          </ModalSection>
        </Modal>
      </BackGround>
    );
  }
};
