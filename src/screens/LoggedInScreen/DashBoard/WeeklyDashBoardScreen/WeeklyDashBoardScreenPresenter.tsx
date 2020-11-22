import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PieChart} from 'react-native-chart-kit';
import Animated from 'react-native-reanimated';

import DonutCard from '~/components/DonutCard';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

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
const Text = styled.Text``;

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
  margin-bottom: 20px;
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
  font-size: 28px;
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

export default ({
  EMP_LIST,
  totalEARLY,
  EARLY_EMP_LIST,
  totalLATE,
  LATE_EMP_LIST,
  totalREST_TIME,
  REST_TIME_EMP_LIST,
  totalVACATION,
  VACATION_EMP_LIST,
  totalWORKING,
  totlaWORKING_EMP,
  weekStartDate,
  weekEndDate,
  loading,
  visible,
  STORE_NAME,
  scrollRef,
  onPressSection,
}) => {
  if (loading || visible || EMP_LIST.length == 0) {
    return null;
  } else {
    if (totlaWORKING_EMP == 0) {
      return (
        <BackGround>
          <Container>
            <Text>금주 근무중인 직원이 없습니다. </Text>
          </Container>
        </BackGround>
      );
    } else {
      return (
        <BackGround>
          <Animated.ScrollView
            ref={scrollRef}
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
                    {moment.duration(totalWORKING / totlaWORKING_EMP).hours() !=
                      0 && (
                      <PercentageSubText color={'#e85356'}>
                        {moment
                          .duration(totalWORKING / totlaWORKING_EMP)
                          .hours()}
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
                    <DonutColumnTitle>
                      <DonutColumnTitle style={{fontSize: 12}}>
                        {moment(weekStartDate).format('MM월 DD일')}
                        &nbsp;~&nbsp;
                        {moment(weekEndDate).format('MM월 DD일')}
                      </DonutColumnTitle>
                    </DonutColumnTitle>
                    <DonutColumnTitle>{STORE_NAME}점</DonutColumnTitle>
                    <WhiteSpace />
                    <DonutColumnText>
                      {(totlaWORKING_EMP / EMP_LIST.length) * 100}% 근무중&nbsp;
                      ({totlaWORKING_EMP}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {(totalLATE / EMP_LIST.length) * 100}% 지각&nbsp; (
                      {totalLATE}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {(totalEARLY / EMP_LIST.length) * 100}% 조퇴&nbsp; (
                      {totalEARLY}명)
                    </DonutColumnText>
                    <DonutColumnText>
                      {totalREST_TIME / totlaWORKING_EMP}분 평균휴게시간
                    </DonutColumnText>
                    <DonutColumnText>
                      {(totalVACATION / totlaWORKING_EMP) * 100}% 휴가&nbsp; (
                      {totalVACATION}명)
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
                  paddingLeft="10"
                  absolute={false}
                />
              </Section>
            </Container>
            <ScrollView
              horizontal
              snapToInterval={220}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}>
              {/* <Card
                onPress={() => {}}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <Text>출근미체크율 = API 대기중</Text>
              </Card>
              <Card
                onPress={() => {}}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <Text>퇴근미체크율 = API 대기중</Text>
              </Card> */}
              <Card
                onPress={() => {}}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>지각률</TitleWord>
                <DonutCard
                  percentage={(totalLATE / totlaWORKING_EMP) * 100}
                  color={'#e85356'}
                  max={100}
                />
                <DodnutTextContainer>
                  <PercentageText color={'#e85356'}>
                    {(totalLATE / totlaWORKING_EMP) * 100}%
                  </PercentageText>
                  <PercentageSubText color={'#e85356'}>
                    {totalLATE}명
                  </PercentageSubText>
                </DodnutTextContainer>
                <TitleWord color={'#e85356'}>금주 지각 상위직원</TitleWord>
                <EmpConatainer>
                  {LATE_EMP_LIST.filter((i) => i.LATE && i.LATE > 0).length ===
                  0 ? (
                    <Text style={{marginTop: 20}}>
                      금주 지각 직원이 없습니다.
                    </Text>
                  ) : (
                    LATE_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.LATE > 0 && (
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
                              <Text style={{marginTop: 5}}>{i.LATE}회</Text>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
              <Card
                onPress={() => {}}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>조퇴률</TitleWord>
                <DonutCard
                  percentage={(totalEARLY / totlaWORKING_EMP) * 100}
                  color={'#e85356'}
                  max={100}
                />
                <DodnutTextContainer>
                  <PercentageText color={'#e85356'}>
                    {(totalEARLY / totlaWORKING_EMP) * 100}%
                  </PercentageText>
                  <PercentageSubText color={'#e85356'}>
                    {totalEARLY}명
                  </PercentageSubText>
                </DodnutTextContainer>
                <TitleWord color={'#e85356'}>금주 조퇴 상위직원</TitleWord>
                <EmpConatainer>
                  {EARLY_EMP_LIST.filter((i) => i.EARLY > 0).length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금주 조퇴 직원이 없습니다.
                    </Text>
                  ) : (
                    EARLY_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.EARLY > 0 && (
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
                              <Text style={{marginTop: 5}}>{i.EARLY}회</Text>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
              <Card
                onPress={() => {}}
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
                {console.log('VACATION_EMP_LIST', VACATION_EMP_LIST)}
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
                onPress={() => {}}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
                <TitleWord color={'#e85356'}>휴가 직원</TitleWord>
                <DonutCard
                  percentage={totalVACATION}
                  color={'#e85356'}
                  max={totlaWORKING_EMP}
                />
                <DodnutTextContainer>
                  <PercentageText color={'#e85356'}>
                    {(totalVACATION / totlaWORKING_EMP) * 100}%
                  </PercentageText>
                  <PercentageSubText color={'#e85356'}>
                    {totalVACATION}명
                  </PercentageSubText>
                </DodnutTextContainer>
                <TitleWord color={'#e85356'}>금주 휴가 상위직원</TitleWord>
                <EmpConatainer>
                  {VACATION_EMP_LIST.filter((i) => i.VACATION && i.VACATION > 0)
                    .length === 0 ? (
                    <Text style={{marginTop: 20}}>
                      금주 휴가를 사용한 직원이 없습니다.
                    </Text>
                  ) : (
                    VACATION_EMP_LIST.slice(0, 3).map(
                      (i, index) =>
                        i.VACATION > 0 && (
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
                              <Text style={{marginTop: 5}}>{i.VACATION}일</Text>
                            </Column>
                          </EmpCard>
                        ),
                    )
                  )}
                </EmpConatainer>
              </Card>
            </ScrollView>
          </Animated.ScrollView>
        </BackGround>
      );
    }
  }
};
