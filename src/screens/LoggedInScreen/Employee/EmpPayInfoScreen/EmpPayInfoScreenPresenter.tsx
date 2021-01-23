import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Animated from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import EmpPayInfoCard1 from './EmpPayInfoCard1';
import EmpPayInfoCard2 from './EmpPayInfoCard2';
import {ForwardIcon, BackIcon, ReloadCircleIcon} from '~/constants/Icons';
import Chevron from '~/components/Chevron';
import styleGuide from '~/constants/styleGuide';

interface IsFirst {
  isFirst?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const TopArea = styled.View`
  width: 100%;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

const NameText = styled.Text`
  margin-right: 10px;
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const NameBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EmployeeText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  height: 15px;
  font-size: ${styleGuide.fontSize.small}px;
`;

const DateArrow = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.arrowColor};
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateBoxText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

const DateText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
`;

const DateBox = styled(Row)`
  padding: 20px 15px;
`;

const BoxTitleText = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.primary};
`;

const DetailRowText = styled.Text`
  font-size: 14px;
  color: ${styleGuide.palette.greyColor};
`;

const MainPayBoxText = styled.Text`
  bottom: -3px;
  position: absolute;
  right: 40px;
  font-size: 23px;
`;

const EmployeeCardContainer = styled.View`
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NavigationButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${styleGuide.palette.primary};
  border-radius: 6px;
`;

const HiddenItems = styled.View`
  overflow: hidden;
  align-items: center;
`;

const ListContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${wp('100%') - 40}px;
  padding: 25px 10px 0 20px;
`;

const MainItemContainer = styled.View<IsFirst>`
  width: ${wp('100%') - 40}px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 40px;
  padding-top: ${(props) => (props.isFirst ? 20 : 0)}px;
  height: ${(props) => (props.isFirst ? 60 : 40)}px;
`;

const SubItemContainer = styled(MainItemContainer)`
  width: ${wp('100%') - 40}px;
  padding-left: 40px;
  padding-top: 0;
  height: 25px;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ListTouchable = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const BorderFooter = styled.TouchableOpacity`
  width: ${wp('100%') - 40}px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: white;
  height: 25px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  width: ${wp('100%') - 40}px;
`;

export default ({
  MEMBER_NAME,
  maindata,
  PAY_TYPE,
  backpay,
  replaceAll,
  nextpay,
  STORE,
  STOREPAY_SHOW,
  IS_MANAGER,
  boxButton,
  setBoxButton,
  boxButton2,
  setBoxButton2,
  fetchData,
  numberComma,
  click1,
  click2,
  click3,
  isCardShowed,
  setClick1,
  setClick2,
  setClick3,
  onPressFooter,
  EMP_PAY_TYPE,
  PAY,
  image,
  START,
  END,
  gotoSetInfo,
  visible,
  loading,
  date,
  MANAGER_CALLED,
  probationDATE,
  probationPercent,
}) => {
  const boxButtonTransition = useTransition(boxButton);
  const boxButton2Transition = useTransition(boxButton2);
  const cardShowedTransition = useTransition(isCardShowed);
  const click1Transition = useTransition(click1);
  const click2Transition = useTransition(click2);
  const click3Transition = useTransition(click3);
  const MainItem = ({isFirst = false, text, value}) => {
    return (
      <MainItemContainer isFirst={isFirst}>
        <DetailRowText>{text}</DetailRowText>
        <DetailRowText>{value}&nbsp;원</DetailRowText>
      </MainItemContainer>
    );
  };

  const SubItem = ({isFirst = false, text, value}) => {
    return (
      <SubItemContainer isFirst={isFirst}>
        <DetailRowText>{text}</DetailRowText>
        <DetailRowText>{value}&nbsp;원</DetailRowText>
      </SubItemContainer>
    );
  };

  const TopAreaContainer = () => (
    <TopArea>
      <DateBox>
        <DateArrow onPress={() => backpay()}>
          <BackIcon size={22} color={styleGuide.palette.arrowColor} />
        </DateArrow>
        <DateTextArea>
          <DateBoxText>{moment(date).format('YYYY년 M월')}</DateBoxText>
          <DateBoxText
            style={{
              fontSize: styleGuide.fontSize.middle,
              fontWeight: '300',
            }}>
            ({moment(maindata?.START_DAY).format('M월 D일')}
            &nbsp;~&nbsp;
            {moment(maindata?.END_DAY).format('M월 D일')})
          </DateBoxText>
        </DateTextArea>
        <DateArrow style={{marginRight: 5}} onPress={() => fetchData()}>
          <ReloadCircleIcon size={18} color={styleGuide.palette.arrowColor} />
        </DateArrow>
        <DateArrow onPress={() => nextpay()}>
          <ForwardIcon size={22} color={styleGuide.palette.arrowColor} />
        </DateArrow>
      </DateBox>
    </TopArea>
  );

  const DetailAreaContainer = ({totalearned}) => (
    <>
      <ListTouchable onPress={() => setClick2(!click2)}>
        <MainItemContainer style={{paddingRight: 10}} as={Animated.View}>
          <DetailRowText>4대보험 근로자부담금</DetailRowText>
          <DetailRowText style={{position: 'absolute', right: 40}}>
            (-){numberComma(maindata.fourtotal)}&nbsp;원
          </DetailRowText>
          <Chevron {...{transition: click2Transition}} />
        </MainItemContainer>
      </ListTouchable>
      <HiddenItems
        as={Animated.View}
        style={{height: mix(click2Transition, 0, 25 * 4)}}>
        <SubItem
          isFirst={true}
          text={'국민연금'}
          value={`(-)${numberComma(maindata.pension_pay)}`}
        />
        <SubItem
          text={'건강보험'}
          value={`(-)${numberComma(maindata.health_pay)}`}
        />
        <SubItem
          text={'장기요양'}
          value={`(-)${numberComma(maindata.health2_pay)}`}
        />
        <SubItem
          text={'고용보험'}
          value={`(-)${numberComma(maindata.employment_pay)}`}
        />
      </HiddenItems>
      <ListTouchable onPress={() => setClick3(!click3)}>
        <MainItemContainer style={{paddingRight: 10}} as={Animated.View}>
          <DetailRowText>원천세</DetailRowText>
          <DetailRowText style={{position: 'absolute', right: 40}}>
            (-){numberComma(totalearned)}&nbsp;원
          </DetailRowText>
          <Chevron {...{transition: click3Transition}} />
        </MainItemContainer>
      </ListTouchable>
      <HiddenItems
        as={Animated.View}
        style={{height: mix(click3Transition, 0, 25 * 2 + 10)}}>
        <SubItem
          isFirst={true}
          text={'소득세'}
          value={`(-)${numberComma(maindata.earned)}`}
        />
        <SubItem
          text={'지방소득세'}
          value={`(-)${numberComma(maindata.earned2)}`}
        />
      </HiddenItems>
    </>
  );

  const EmployeeCard = () => {
    return (
      <TopArea>
        <EmployeeCardContainer>
          <FastImage
            style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
            source={{
              uri: `http://133.186.210.223/uploads/${image}`,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <NameBox>
            <Row style={{justifyContent: 'flex-start', marginBottom: 5}}>
              <NameText>{MEMBER_NAME}</NameText>
              <DateText>
                {IS_MANAGER == '1' ? `[${MANAGER_CALLED}]` : '[직원]'}
              </DateText>
            </Row>
            <EmployeeText>
              {EMP_PAY_TYPE && EMP_PAY_TYPE === '0' && '시급'}
              {EMP_PAY_TYPE && EMP_PAY_TYPE === '1' && '일급'}
              {EMP_PAY_TYPE && EMP_PAY_TYPE === '2' && '월급'}&nbsp;
              {PAY?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </EmployeeText>
            <EmployeeText>
              근무기간&nbsp;({moment().diff(moment(START), 'month')}개월)
            </EmployeeText>
            <EmployeeText>
              {moment(START).format('YYYY.MM.DD')}&nbsp;~&nbsp;
              {END ? moment(END).format('YYYY.MM.DD') : '계속'}
            </EmployeeText>
            {probationDATE && probationPercent && (
              <EmployeeText>
                수습기간&nbsp;
                {moment() > moment(probationDATE)
                  ? `종료 (${probationPercent}%적용)`
                  : `${moment(probationDATE).format(
                      '~YYYY.MM.DD',
                    )}까지 (${probationPercent}%적용)`}
              </EmployeeText>
            )}
          </NameBox>
          {STORE == '1' && (
            <NavigationButton onPress={() => gotoSetInfo()}>
              <BoxTitleText>정보수정</BoxTitleText>
            </NavigationButton>
          )}
        </EmployeeCardContainer>
      </TopArea>
    );
  };

  if (loading) {
    return null;
  } else if (PAY_TYPE == '2') {
    const totalearned = maindata.earned + maindata.earned2;
    const emptotal = maindata.realtotal - maindata.fourtotal - totalearned;
    const ownertotal =
      emptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <EmployeeCard />
            <TopAreaContainer />
            {(STORE == '1' || STOREPAY_SHOW == '1') && (
              <>
                <ListTouchable onPress={() => setBoxButton(!boxButton)}>
                  <ListContainer as={Animated.View}>
                    <DateBoxText>고용주 지출액</DateBoxText>
                    <MainPayBoxText>
                      {ownertotal ? `${numberComma(ownertotal)} 원` : '0 원'}
                    </MainPayBoxText>
                    <Chevron {...{transition: boxButtonTransition}} />
                  </ListContainer>
                </ListTouchable>
                <HiddenItems
                  as={Animated.View}
                  style={{height: mix(boxButtonTransition, 0, 40 * 4 + 10)}}>
                  <MainItem
                    isFirst={true}
                    text={'급여지급액'}
                    value={numberComma(emptotal)}
                  />
                  <MainItem
                    text={'4대보험 고용주부담금'}
                    value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                  />
                  <MainItem
                    text={'4대보험 근로자부담금'}
                    value={`(+) ${numberComma(maindata.fourtotal)}`}
                  />
                  <MainItem
                    text={'원천세'}
                    value={`(+) ${numberComma(totalearned)}`}
                  />
                </HiddenItems>
                <BorderFooter
                  onPress={() => setBoxButton(!boxButton)}
                  activeOpacity={1}
                />
              </>
            )}

            <ListTouchable
              onPress={() => setBoxButton2(!boxButton2)}
              disabled={!(STORE == '1' || STOREPAY_SHOW == '1')}>
              <ListContainer as={Animated.View}>
                {STORE == '1' || STOREPAY_SHOW == '1' ? (
                  <DateBoxText>근로자 수령액(월급)</DateBoxText>
                ) : (
                  <DateBoxText>수령액(월급)</DateBoxText>
                )}
                <MainPayBoxText>
                  {emptotal ? `${numberComma(emptotal)} 원` : '0 원'}
                </MainPayBoxText>
                {(STORE == '1' || STOREPAY_SHOW == '1') && (
                  <Chevron {...{transition: boxButton2Transition}} />
                )}
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  boxButton2Transition,
                  0,
                  40 * 3 +
                    10 +
                    (click1 ? 25 * 5 : 0) +
                    (click2 ? 25 * 4 : 0) +
                    (click3 ? 25 * 2 + 10 : 0),
                ),
              }}>
              <ListTouchable onPress={() => setClick1(!click1)}>
                <MainItemContainer
                  style={{paddingRight: 10}}
                  isFirst={true}
                  as={Animated.View}>
                  <DetailRowText>공제전 금액</DetailRowText>
                  <DetailRowText
                    style={{bottom: 10, position: 'absolute', right: 40}}>
                    {numberComma(maindata.realtotal)}&nbsp;원
                  </DetailRowText>
                  <Chevron {...{transition: click1Transition}} />
                </MainItemContainer>
              </ListTouchable>
              <HiddenItems
                as={Animated.View}
                style={{height: mix(click1Transition, 0, 25 * 5)}}>
                <SubItem
                  isFirst={true}
                  text={'기본급'}
                  value={numberComma(maindata.PAY)}
                />
                <SubItem text={'식대'} value={numberComma(maindata.MEALS)} />
                <SubItem
                  text={'자가운전'}
                  value={numberComma(maindata.SELF_DRIVING)}
                />
                <SubItem text={'상여'} value={numberComma(maindata.BONUS)} />
                <SubItem
                  text={'성과급'}
                  value={numberComma(maindata.INCENTIVE)}
                />
              </HiddenItems>
              <DetailAreaContainer totalearned={totalearned} />

              <MainItemContainer isFirst={true}>
                <DetailRowText>공제전 금액</DetailRowText>
                <DetailRowText>
                  {numberComma(maindata.realtotal)}&nbsp;원
                </DetailRowText>
              </MainItemContainer>
              <DetailAreaContainer totalearned={totalearned} />
            </HiddenItems>
            <BorderFooter
              onPress={() => setBoxButton2(!boxButton2)}
              activeOpacity={1}
              disabled={!(STORE == '1' || STOREPAY_SHOW == '1')}
            />
          </Container>
        </ScrollView>
      </BackGround>
    );
  } else if (PAY_TYPE == '0') {
    const totalearned = maindata.earned + maindata.earned2;
    const emptotal =
      maindata.realtotal +
      maindata.weekpaytotal +
      maindata.addtotal -
      maindata.minertotalpay -
      maindata.noworktotalpay;
    const realemptotal =
      maindata.realtotal +
      maindata.weekpaytotal +
      maindata.addtotal -
      maindata.minertotalpay -
      maindata.noworktotalpay -
      maindata.fourtotal -
      totalearned;
    const ownertotal =
      realemptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <EmployeeCard />
            <TopAreaContainer />
            {(STORE == '1' || STOREPAY_SHOW == '1') && (
              <>
                <ListTouchable onPress={() => setBoxButton(!boxButton)}>
                  <ListContainer as={Animated.View}>
                    <DateBoxText>고용주 지출액</DateBoxText>
                    <MainPayBoxText>
                      {ownertotal ? `${numberComma(ownertotal)} 원` : '0 원'}
                    </MainPayBoxText>
                    <Chevron {...{transition: boxButtonTransition}} />
                  </ListContainer>
                </ListTouchable>
                <HiddenItems
                  as={Animated.View}
                  style={{
                    height: mix(boxButtonTransition, 0, 40 * 4 + 10),
                  }}>
                  <MainItem
                    isFirst={true}
                    text={'급여지급액'}
                    value={numberComma(realemptotal)}
                  />
                  <MainItem
                    text={'4대보험 고용주부담금'}
                    value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                  />
                  <MainItem
                    text={'4대보험 근로자부담금'}
                    value={`(+) ${numberComma(maindata.fourtotal)}`}
                  />
                  <MainItem
                    text={'원천세'}
                    value={`(+) ${numberComma(totalearned)}`}
                  />
                </HiddenItems>
                <BorderFooter
                  onPress={() => setBoxButton(!boxButton)}
                  activeOpacity={1}
                />
              </>
            )}

            <ListTouchable
              onPress={() => setBoxButton2(!boxButton2)}
              disabled={!(STORE == '1' || STOREPAY_SHOW == '1')}>
              <ListContainer as={Animated.View}>
                {STORE == '1' || STOREPAY_SHOW == '1' ? (
                  <DateBoxText>근로자 수령액(시급)</DateBoxText>
                ) : (
                  <DateBoxText>수령액(시급)</DateBoxText>
                )}
                <MainPayBoxText>
                  {realemptotal ? `${numberComma(realemptotal)} 원` : '0 원'}
                </MainPayBoxText>
                {(STORE == '1' || STOREPAY_SHOW == '1') && (
                  <Chevron {...{transition: boxButton2Transition}} />
                )}
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  boxButton2Transition,
                  0,
                  40 * 3 +
                    10 +
                    (click1 ? 25 * 5 : 0) +
                    (click2 ? 25 * 4 : 0) +
                    (click3 ? 25 * 2 + 10 : 0),
                ),
              }}>
              <ListTouchable onPress={() => setClick1(!click1)}>
                <MainItemContainer
                  style={{paddingRight: 10}}
                  isFirst={true}
                  as={Animated.View}>
                  <DetailRowText>공제전 금액</DetailRowText>
                  <DetailRowText
                    style={{bottom: 10, position: 'absolute', right: 40}}>
                    {numberComma(emptotal)}&nbsp;원
                  </DetailRowText>
                  <Chevron {...{transition: click1Transition}} />
                </MainItemContainer>
              </ListTouchable>
              <HiddenItems
                as={Animated.View}
                style={{height: mix(click1Transition, 0, 25 * 5)}}>
                <SubItem
                  isFirst={true}
                  text={'기본급'}
                  value={numberComma(maindata.realtotal)}
                />
                <SubItem
                  text={'주휴수당'}
                  value={`(+)${numberComma(maindata.weekpaytotal)}`}
                />
                <SubItem
                  text={'야간/초과/휴일 수당'}
                  value={`(+)${numberComma(maindata.addtotal)}`}
                />
                <SubItem
                  text={'지각/조퇴 차감'}
                  value={`(-)${numberComma(maindata.minertotalpay)}`}
                />
                <SubItem
                  text={'결근/휴무 차감'}
                  value={`(-)${numberComma(maindata.noworktotalpay)}`}
                />
              </HiddenItems>
              <DetailAreaContainer totalearned={totalearned} />

              <MainItemContainer isFirst={true}>
                <DetailRowText>공제전 금액</DetailRowText>
                <DetailRowText>
                  {numberComma(maindata.realtotal)}&nbsp;원
                </DetailRowText>
              </MainItemContainer>
              <DetailAreaContainer totalearned={totalearned} />
            </HiddenItems>
            <BorderFooter
              onPress={() => setBoxButton2(!boxButton2)}
              activeOpacity={1}
              disabled={!(STORE == '1' || STOREPAY_SHOW == '1')}
            />
            <ListTouchable onPress={() => onPressFooter('click4')}>
              <ListContainer style={{paddingBottom: 0}} as={Animated.View}>
                <DateBoxText>일별 급여현황</DateBoxText>
                <Chevron {...{transition: cardShowedTransition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  cardShowedTransition,
                  0,
                  320 * maindata.CARDLIST?.length || 0,
                ),
              }}>
              <CardContainer>
                {maindata.CARDLIST?.map((data, index) => {
                  return (
                    <EmpPayInfoCard1
                      key={index}
                      day={data.START}
                      yoil={data.DAY}
                      base={data.basic_payment}
                      night={data.night_payment}
                      over={data.day_payment}
                      holi={0}
                      late={data.miner_payment}
                      total={data.payment}
                      rest_payment={data.rest_payment || 0}
                    />
                  );
                })}
              </CardContainer>
            </HiddenItems>
            <BorderFooter
              onPress={() => onPressFooter('click4')}
              activeOpacity={1}
            />
          </Container>
        </ScrollView>
      </BackGround>
    );
  } else {
    const totalearned = maindata.earned + maindata.earned2;
    const realemptotal = maindata.realtotal - maindata.fourtotal - totalearned;
    const ownertotal =
      realemptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <EmployeeCard />
            <TopAreaContainer />
            {(STORE == '1' || STOREPAY_SHOW == '1') && (
              <>
                <ListTouchable onPress={() => setBoxButton(!boxButton)}>
                  <ListContainer as={Animated.View}>
                    <DateBoxText>고용주 지출액</DateBoxText>
                    <MainPayBoxText>
                      {ownertotal ? `${numberComma(ownertotal)} 원` : '0 원'}
                    </MainPayBoxText>
                    <Chevron {...{transition: boxButtonTransition}} />
                  </ListContainer>
                </ListTouchable>
                <HiddenItems
                  as={Animated.View}
                  style={{
                    height: mix(boxButtonTransition, 0, 40 * 4 + 10),
                  }}>
                  <MainItem
                    isFirst={true}
                    text={'급여지급액'}
                    value={numberComma(realemptotal)}
                    aㅁ
                  />
                  <MainItem
                    text={'4대보험 고용주부담금'}
                    value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                  />
                  <MainItem
                    text={'4대보험 근로자부담금'}
                    value={`(+) ${numberComma(maindata.fourtotal)}`}
                  />
                  <MainItem
                    text={'원천세'}
                    value={`(+) ${numberComma(totalearned)}`}
                  />
                </HiddenItems>
                <BorderFooter
                  onPress={() => setBoxButton(!boxButton)}
                  activeOpacity={1}
                />
              </>
            )}
            <ListTouchable
              onPress={() => setBoxButton2(!boxButton2)}
              disabled={!(STORE == '1' || STOREPAY_SHOW == '1')}>
              <ListContainer as={Animated.View}>
                {STORE == '1' || STOREPAY_SHOW == '1' ? (
                  <DateBoxText>근로자 수령액(일급)</DateBoxText>
                ) : (
                  <DateBoxText>수령액(일급)</DateBoxText>
                )}
                <MainPayBoxText>
                  {realemptotal ? `${numberComma(realemptotal)} 원` : '0 원'}
                </MainPayBoxText>
                {(STORE == '1' || STOREPAY_SHOW == '1') && (
                  <Chevron {...{transition: boxButton2Transition}} />
                )}
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  boxButton2Transition,
                  0,
                  40 * 3 +
                    10 +
                    (click1 ? 25 * 1 : 0) +
                    (click2 ? 25 * 4 : 0) +
                    (click3 ? 25 * 2 + 10 : 0),
                ),
              }}>
              <ListTouchable onPress={() => setClick1(!click1)}>
                <MainItemContainer
                  style={{paddingRight: 10}}
                  isFirst={true}
                  as={Animated.View}>
                  <DetailRowText>공제전 금액</DetailRowText>
                  <DetailRowText
                    style={{bottom: 10, position: 'absolute', right: 40}}>
                    {numberComma(maindata.realtotal)}&nbsp;원
                  </DetailRowText>
                  <Chevron {...{transition: click1Transition}} />
                </MainItemContainer>
              </ListTouchable>
              <HiddenItems
                as={Animated.View}
                style={{height: mix(click1Transition, 0, 25 * 1)}}>
                <SubItem
                  isFirst={true}
                  text={'기본급'}
                  value={numberComma(maindata.realtotal)}
                />
              </HiddenItems>
              <DetailAreaContainer totalearned={totalearned} />

              <MainItemContainer isFirst={true}>
                <DetailRowText>공제전 금액</DetailRowText>
                <DetailRowText>
                  {numberComma(maindata.realtotal)}&nbsp;원
                </DetailRowText>
              </MainItemContainer>

              <DetailAreaContainer totalearned={totalearned} />
            </HiddenItems>
            <BorderFooter
              onPress={() => setBoxButton2(!boxButton2)}
              activeOpacity={1}
              disabled={!(STORE == '1' || STOREPAY_SHOW == '1')}
            />

            <ListTouchable onPress={() => onPressFooter('click5')}>
              <ListContainer style={{paddingBottom: 0}} as={Animated.View}>
                <DateBoxText>일별 급여현황</DateBoxText>
                <Chevron {...{transition: cardShowedTransition}} />
              </ListContainer>
            </ListTouchable>
            <HiddenItems
              as={Animated.View}
              style={{
                height: mix(
                  cardShowedTransition,
                  0,
                  170 * maindata.CARDLIST1?.length,
                ),
              }}>
              <CardContainer>
                {maindata.CARDLIST1?.map((data, index) => {
                  return (
                    <EmpPayInfoCard2
                      key={index}
                      day={data.START}
                      yoil={data.DAY}
                      total={data.payment}
                    />
                  );
                })}
              </CardContainer>
            </HiddenItems>
            <BorderFooter
              onPress={() => onPressFooter('click5')}
              activeOpacity={1}
            />
          </Container>
        </ScrollView>
      </BackGround>
    );
  }
};
