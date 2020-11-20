import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DonutCard from '~/components/DonutCard';
import FastImage from 'react-native-fast-image';

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

const Section = styled.View`
  width: 100%;
  height: 140px;
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
  font-size: 22px;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 20px;
`;

const DodnutTextContainer = styled.View`
  top: 115px;
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

const EmpConatainer = styled.View`
  width: 100%;
  height: 180px;
  justify-content: flex-start;
  align-items: center;
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
  WORKING_EMP_LIST,
}) => {
  return (
    <BackGround>
      <ScrollView
        style={{paddingBottom: hp('100%') - 420}}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container></Container>

        <ScrollView
          horizontal
          snapToInterval={220}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}>
          {/* <Card
            onPress={() => console.log('index')}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1700}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.1}>
            <Text>출근미체크율 = API 대기중</Text>
          </Card>
          <Card
            onPress={() => console.log('index')}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1700}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.1}>
            <Text>퇴근미체크율 = API 대기중</Text>
          </Card> */}
          <Card
            onPress={() => console.log('index')}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1700}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.1}>
            <TitleWord color={'red'}>지각률</TitleWord>
            <DonutCard
              percentage={(totalLATE / EMP_LIST.length) * 100}
              color={'red'}
              max={100}
            />
            <DodnutTextContainer>
              <PercentageText color={'red'}>
                {(totalLATE / EMP_LIST.length) * 100}%
              </PercentageText>
              <PercentageSubText color={'red'}>{totalLATE}명</PercentageSubText>
            </DodnutTextContainer>
            <TitleWord color={'red'}>금일 지각 직원</TitleWord>
            <EmpConatainer>
              {LATE_EMP_LIST.filter((i) => i.LATE !== '0').length === 0 ? (
                <Text style={{marginTop: 20}}>금일 지각 직원이 없습니다. </Text>
              ) : (
                LATE_EMP_LIST.map(
                  (i) =>
                    i.LATE !== '0' && (
                      <EmpCard>
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
            onPress={() => console.log('index')}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1700}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.1}>
            <TitleWord color={'red'}>조퇴률</TitleWord>
            <DonutCard
              percentage={(totalEARLY / EMP_LIST.length) * 100}
              color={'red'}
              max={100}
            />
            <DodnutTextContainer>
              <PercentageText color={'red'}>
                {(totalEARLY / EMP_LIST.length) * 100}%
              </PercentageText>
              <PercentageSubText color={'red'}>
                {totalEARLY}명
              </PercentageSubText>
            </DodnutTextContainer>
            <TitleWord color={'red'}>금일 조퇴 직원</TitleWord>
            <EmpConatainer>
              {EARLY_EMP_LIST.filter((i) => i.EARLY !== '0').length === 0 ? (
                <Text style={{marginTop: 20}}>금일 조퇴 직원이 없습니다. </Text>
              ) : (
                EARLY_EMP_LIST.map(
                  (i) =>
                    i.EARLY !== '0' && (
                      <EmpCard>
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
            onPress={() => console.log('index')}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1700}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.1}>
            <TitleWord color={'red'}>평균 휴게시간</TitleWord>
            <DonutCard
              percentage={totalREST_TIME / EMP_LIST.length}
              color={'red'}
              max={60}
            />
            <DodnutTextContainer>
              <PercentageText color={'red'} style={{marginTop: 10}}>
                {totalREST_TIME / EMP_LIST.length}분
              </PercentageText>
            </DodnutTextContainer>
            <TitleWord color={'red'}>휴게시간 상위직원</TitleWord>
            <EmpConatainer>
              {REST_TIME_EMP_LIST.filter((i) => i.REST_TIME !== '0').length ===
              0 ? (
                <Text style={{marginTop: 20}}>
                  휴게시간이 있는 직원이 없습니다.
                </Text>
              ) : (
                REST_TIME_EMP_LIST.map(
                  (i) =>
                    i.REST_TIME !== '0' && (
                      <EmpCard>
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
                          <Text style={{marginTop: 5}}>{i.REST_TIME}분</Text>
                        </Column>
                      </EmpCard>
                    ),
                )
              )}
            </EmpConatainer>
          </Card>
          <Card
            isLast={true}
            onPress={() => console.log('index')}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1700}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.1}>
            <TitleWord color={'red'}>휴가중인 직원</TitleWord>
            <DonutCard
              percentage={totalVACATION}
              color={'red'}
              max={EMP_LIST.length}
            />
            <DodnutTextContainer>
              <PercentageText color={'red'} style={{marginTop: 10}}>
                {totalVACATION}명
              </PercentageText>
            </DodnutTextContainer>
            <TitleWord color={'red'}>금일 휴가 직원</TitleWord>
            <EmpConatainer>
              {VACATION_EMP_LIST.filter((i) => i.VACATION !== '0').length ===
              0 ? (
                <Text style={{marginTop: 20}}>
                  금일 휴가중인 직원이 없습니다.{' '}
                </Text>
              ) : (
                VACATION_EMP_LIST.map(
                  (i) =>
                    i.VACATION !== '0' && (
                      <EmpCard>
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
        </ScrollView>
      </ScrollView>
    </BackGround>
  );
};
