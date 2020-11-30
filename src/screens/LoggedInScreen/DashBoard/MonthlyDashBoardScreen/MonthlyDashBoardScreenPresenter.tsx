import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {PieChart} from 'react-native-chart-kit';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import DonutCard from '~/components/DonutCard';
import Heatmap from '~/components/Heatmap';

interface IColor {
  color: string;
}
interface ICard {
  color: string;
  isLast?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const View = styled.View``;
const Text = styled.Text`
  color: #7f7f7f;
`;

const SmallText = styled.Text`
  font-size: 9px;
  color: #7f7f7f;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px 20px 0 20px;
  align-items: center;
`;

const Section = styled(Ripple)`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  margin-bottom: 20px;
`;

const SectionCard = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
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
  font-size: 12px;
  font-weight: bold;
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
  border-bottom-width: 0.7px;
  border-bottom-color: #7f7f7f;
  padding-bottom: 10px;
  margin-bottom: 20px;
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

const HeatmapContainer = styled.View`
  height: 320px;
  margin-top: 10px;
`;

export default ({
  EMP_LIST,
  totalEARLY_COUNT,
  EARLY_EMP_LIST,
  totalLATE_COUNT,
  LATE_EMP_LIST,
  totalREST_TIME_COUNT,
  REST_TIME_EMP_LIST,
  totalVACATION_COUNT,
  VACATION_EMP_LIST,
  totalWORKING_COUNT,
  totalWORKING_EMP,
  totalNOWORK_COUNT,
  totalNOWORK_EMP,
  NOWORK_EMP_LIST,
  monthStartDate,
  monthEndDate,
  loading,
  visible,
  STORE_NAME,
  scrollRef,
  onPressSection,
  totalWORKING_DAY,
  totalEARLY_EMP,
  totalLATE_EMP,
  totalVACATION_EMP,
  totalSUB_WORKING_EMP,
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
    if (totalWORKING_DAY == 0) {
      return (
        <BackGround>
          <Container>
            <Text>금월 근무일이 없습니다. </Text>
          </Container>
        </BackGround>
      );
    } else if (totalWORKING_EMP == 0 || EMP_LIST.length == 0) {
      return (
        <BackGround>
          <Container>
            <Text>금월 근무중인 직원이 없습니다. </Text>
          </Container>
        </BackGround>
      );
    } else {
      return (
        <BackGround>
          <Animated.ScrollView
            ref={scrollRef}
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
                    percentage={totalWORKING_COUNT / totalWORKING_EMP}
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
                        .duration(totalWORKING_COUNT / totalWORKING_EMP)
                        .asHours(),
                    ) != 0 && (
                      <PercentageSubText
                        color={'#e85356'}
                        style={{fontSize: 18}}>
                        {Math.trunc(
                          moment
                            .duration(totalWORKING_COUNT / totalWORKING_EMP)
                            .asHours(),
                        )}
                        시간
                      </PercentageSubText>
                    )}
                    {Math.trunc(
                      moment
                        .duration(totalWORKING_COUNT / totalWORKING_EMP)
                        .minutes(),
                    ) != 0 && (
                      <PercentageSubText
                        color={'#e85356'}
                        style={{fontSize: 18}}>
                        {moment
                          .duration(totalWORKING_COUNT / totalWORKING_EMP)
                          .minutes()}
                        분
                      </PercentageSubText>
                    )}
                  </DodnutTextContainer>
                  <DonutColumn>
                    <DonutColumnTitle>
                      <DonutColumnTitle style={{fontSize: 12}}>
                        {moment(monthStartDate).format('M월 D일')}
                        &nbsp;~&nbsp;
                        {moment(monthEndDate).format('M월 D일')}
                      </DonutColumnTitle>
                    </DonutColumnTitle>
                    <DonutColumnTitle>{STORE_NAME}점</DonutColumnTitle>
                    <WhiteSpace />
                    <DonutColumnText>
                      {totalWORKING_DAY}일 직원 근무일
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil(
                        (EMP_LIST.filter((i) => i.TOTAL_WORKING !== 0).length /
                          EMP_LIST.length) *
                          100,
                      )}
                      % 직원 근무&nbsp; (
                      {EMP_LIST.filter((i) => i.TOTAL_WORKING !== 0).length}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil(
                        (totalLATE_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      % 평균 지각&nbsp; ({totalLATE_EMP}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil(
                        (totalEARLY_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      % 평균 조퇴&nbsp; ({totalEARLY_EMP}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil(
                        (totalNOWORK_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      % 평균 결근&nbsp; ({totalNOWORK_EMP}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {totalREST_TIME_COUNT / totalWORKING_EMP}분 평균 휴게시간
                    </DonutColumnText>
                    <DonutColumnText>
                      {Math.ceil(
                        (totalVACATION_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      % 휴가&nbsp; ({totalVACATION_EMP}명)
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
                  accessor="TOTAL_WORKING"
                  backgroundColor="transparent"
                  paddingLeft="10"
                  absolute={false}
                />
              </Section>
              {EMP_LIST.sort(
                (a, b) =>
                  moment(a.START_TIME, 'kk:mm').valueOf() -
                  moment(b.START_TIME, 'kk:mm').valueOf(),
              ).map((i, index) => {
                return (
                  <SectionCard>
                    <Column>
                      <EmpCardRow>
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
                        <Column
                          style={{
                            width: wp('100%') - 130,
                          }}>
                          <Row>
                            <Bold>
                              {i.EMP_NAME} [
                              {i.IS_MANAGER == '1' ? '매니저' : '스태프'}]
                            </Bold>
                            {i.TOTAL_WORKING != 0 && (
                              <Bold>
                                월&nbsp;
                                {Math.trunc(
                                  moment.duration(i.TOTAL_WORKING).asHours(),
                                ) > 0 &&
                                  `${Math.trunc(
                                    moment.duration(i.TOTAL_WORKING).asHours(),
                                  )}시간`}
                                &nbsp;
                                {moment.duration(i.TOTAL_WORKING).minutes() >
                                  0 &&
                                  `${moment
                                    .duration(i.TOTAL_WORKING)
                                    .minutes()}분`}
                              </Bold>
                            )}
                          </Row>

                          <Row
                            style={{
                              marginTop: 5,
                              justifyContent: 'flex-start',
                            }}>
                            {i.TOTAL_LATE !== 0 && (
                              <SmallTextRound>
                                <SmallText>지각: {i.TOTAL_LATE}일</SmallText>
                              </SmallTextRound>
                            )}
                            {i.TOTAL_EARLY !== 0 && (
                              <SmallTextRound>
                                <SmallText>조퇴: {i.TOTAL_EARLY}일</SmallText>
                              </SmallTextRound>
                            )}
                            {i.TOTAL_NOWORK !== 0 && (
                              <SmallTextRound>
                                <SmallText>결근: {i.TOTAL_NOWORK}일</SmallText>
                              </SmallTextRound>
                            )}
                            {i.REST_TIME != 0 && (
                              <SmallTextRound>
                                <SmallText>휴게시간: {i.REST_TIME}분</SmallText>
                              </SmallTextRound>
                            )}
                            {i.TOTAL_VACATION !== 0 && (
                              <SmallTextRound>
                                <SmallText>
                                  휴가: {i.TOTAL_VACATION}일
                                </SmallText>
                              </SmallTextRound>
                            )}
                          </Row>
                        </Column>
                      </EmpCardRow>
                      {i.TOTAL_WORKING != 0 ? (
                        <HeatmapContainer>
                          <Heatmap data={i} />
                        </HeatmapContainer>
                      ) : (
                        <Text style={{textAlign: 'center'}}>
                          금월 근무가 없습니다.
                        </Text>
                      )}
                    </Column>
                  </SectionCard>
                );
              })}
            </Container>
            <ScrollView
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
                <TitleWord color={'#e85356'}>
                  금월 {moment().date()}일간 지각률
                </TitleWord>
                <DonutCard
                  percentage={Math.ceil(
                    (totalLATE_COUNT / totalSUB_WORKING_EMP) * 100,
                  )}
                  color={'#e85356'}
                  max={100}
                />
                {totalLATE_COUNT / totalSUB_WORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil(
                        (totalLATE_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer style={{marginTop: 5}}>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil(
                        (totalLATE_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalLATE_COUNT}일 / {totalLATE_EMP}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금월 지각 상위직원</TitleWord>
                <EmpConatainer>
                  {LATE_EMP_LIST.filter((i) => i.TOTAL_LATE > 0).length ===
                  0 ? (
                    <Text style={{marginTop: 20}}>
                      금월 지각 직원이 없습니다.
                    </Text>
                  ) : (
                    LATE_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.TOTAL_LATE > 0 && (
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
                                {i.TOTAL_LATE}일
                              </Text>
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
                <TitleWord color={'#e85356'}>
                  금월 {moment().date()}일간 조퇴률
                </TitleWord>
                <DonutCard
                  percentage={Math.ceil(
                    (totalEARLY_COUNT / totalSUB_WORKING_EMP) * 100,
                  )}
                  color={'#e85356'}
                  max={100}
                />
                {totalEARLY_COUNT / totalSUB_WORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil(
                        (totalEARLY_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer style={{marginTop: 5}}>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil(
                        (totalEARLY_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalEARLY_COUNT}일 / {totalEARLY_EMP}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금월 조퇴 상위직원</TitleWord>
                <EmpConatainer>
                  {EARLY_EMP_LIST.filter((i) => i.TOTAL_EARLY > 0).length ===
                  0 ? (
                    <Text style={{marginTop: 20}}>
                      금월 조퇴 직원이 없습니다.
                    </Text>
                  ) : (
                    EARLY_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.TOTAL_EARLY > 0 && (
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
                                {i.TOTAL_EARLY}일
                              </Text>
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
                <TitleWord color={'#e85356'}>
                  금월 {moment().date()}일간 결근률
                </TitleWord>
                <DonutCard
                  percentage={Math.ceil(
                    (totalNOWORK_COUNT / totalSUB_WORKING_EMP) * 100,
                  )}
                  color={'#e85356'}
                  max={100}
                />
                {totalNOWORK_COUNT / totalSUB_WORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil(
                        (totalNOWORK_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer style={{marginTop: 5}}>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil(
                        (totalNOWORK_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalNOWORK_COUNT}일 / {totalNOWORK_EMP}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금월 결근 상위직원</TitleWord>
                <EmpConatainer>
                  {NOWORK_EMP_LIST.filter((i) => i.TOTAL_NOWORK > 0).length ===
                  0 ? (
                    <Text style={{marginTop: 20}}>
                      금월 결근 직원이 없습니다.
                    </Text>
                  ) : (
                    NOWORK_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.TOTAL_NOWORK > 0 && (
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
                                {i.TOTAL_NOWORK}일
                              </Text>
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
                  percentage={totalREST_TIME_COUNT / totalWORKING_EMP}
                  color={'#e85356'}
                  max={60}
                />

                <DodnutTextContainer>
                  <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                    {totalREST_TIME_COUNT / totalWORKING_EMP}분
                  </PercentageText>
                </DodnutTextContainer>
                <TitleWord color={'#e85356'}>휴게시간 상위직원</TitleWord>
                <EmpConatainer>
                  {REST_TIME_EMP_LIST.filter(
                    (i) => i.REST_TIME && i.REST_TIME > 0,
                  ).length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      휴게시간이 있는 직원이 없습니다.
                    </Text>
                  ) : (
                    REST_TIME_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.REST_TIME > 0 && (
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
                <TitleWord color={'#e85356'}>
                  금월 {moment().date()}일간 휴가 직원
                </TitleWord>
                <DonutCard
                  percentage={totalVACATION_COUNT}
                  color={'#e85356'}
                  max={totalSUB_WORKING_EMP}
                />
                {totalVACATION_COUNT / totalSUB_WORKING_EMP == 0 ? (
                  <DodnutTextContainer>
                    <PercentageText color={'#e85356'} style={{marginTop: 10}}>
                      {Math.ceil(
                        (totalVACATION_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                  </DodnutTextContainer>
                ) : (
                  <DodnutTextContainer style={{marginTop: 5}}>
                    <PercentageText color={'#e85356'}>
                      {Math.ceil(
                        (totalVACATION_COUNT / totalSUB_WORKING_EMP) * 100,
                      )}
                      %
                    </PercentageText>
                    <PercentageSubText color={'#e85356'}>
                      {totalVACATION_COUNT}일 / {totalVACATION_EMP}명
                    </PercentageSubText>
                  </DodnutTextContainer>
                )}
                <TitleWord color={'#e85356'}>금월 휴가 상위직원</TitleWord>
                <EmpConatainer>
                  {VACATION_EMP_LIST.filter(
                    (i) => i.TOTAL_VACATION && i.TOTAL_VACATION > 0,
                  ).length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금월 휴가 직원이 없습니다.
                    </Text>
                  ) : (
                    VACATION_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.TOTAL_VACATION > 0 && (
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
                                {i.TOTAL_VACATION}일
                              </Text>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
            </ScrollView>
          </Animated.ScrollView>
          <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onRequestClose={() => setModalEARLY(false)}
            onBackdropPress={() => setModalEARLY(false)}
            isVisible={modalEARLY}
            style={{
              marginLeft: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section style={{width: 200}} onPress={() => setModalEARLY(false)}>
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
                    {i.TOTAL_EARLY > 0 ? (
                      <Row>
                        <SmallTextRound style={{marginTop: 5}}>
                          <SmallText>조퇴: {i.TOTAL_EARLY}일</SmallText>
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
              marginLeft: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section style={{width: 200}} onPress={() => setModalLATE(false)}>
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
                    {i.TOTAL_LATE > 0 ? (
                      <Row>
                        <SmallTextRound style={{marginTop: 5}}>
                          <SmallText>지각: {i.TOTAL_LATE}일</SmallText>
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
              marginLeft: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section style={{width: 200}} onPress={() => setModalNOWORK(false)}>
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
                    {i.TOTAL_NOWORK > 0 ? (
                      <Row>
                        <SmallTextRound style={{marginTop: 5}}>
                          <SmallText>결근: {i.TOTAL_NOWORK}일</SmallText>
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
              marginLeft: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 200}}
              onPress={() => setModalREST_TIME(false)}>
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
                        <SmallTextRound style={{marginTop: 5, width: 80}}>
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
              marginLeft: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: '100%',
            }}>
            <Section
              style={{width: 200}}
              onPress={() => setModalVACATION(false)}>
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
                    {i.TOTAL_VACATION > 0 ? (
                      <Row>
                        <SmallTextRound style={{marginTop: 5}}>
                          <SmallText>휴가: {i.TOTAL_VACATION}일</SmallText>
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
