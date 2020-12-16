import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EmpPayInfoCard1 from './EmpPayInfoCard1';
import EmpPayInfoCard2 from './EmpPayInfoCard2';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {
  ForwardIcon,
  BackIcon,
  ReloadCircleIcon,
  UpIcon,
  DownIcon,
} from '~/constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
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
const Profile = styled.View`
  flex: 1;
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameText = styled.Text`
  margin-right: 10px;
  color: #707070;
  font-size: 15px;
`;

const NameBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const GreyText = styled.Text`
  margin-right: 5px;
  color: #999;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EmployeeText = styled.Text`
  color: #707070;
  height: 15px;
  font-size: 10px;
`;

const DateArrow = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: #f4aaab;
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateBoxText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #7f7f7f;
`;

const DateText = styled.Text`
  color: #707070;
  font-size: 12px;
`;

const DateBox = styled(Row)`
  padding: 20px 15px;
`;

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

const CardBox = styled.View`
  flex: 1;
  margin-top: 20px;
  align-items: center;
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitle = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

const BoxTitleText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #e85356;
`;
const DetailRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 5px 20px;
  align-items: center;
  justify-content: space-between;
`;
const DetailRowText = styled.Text`
  font-size: 15px;
  color: #999;
`;

const BoxButton = styled.TouchableOpacity`
  width: ${wp('25%')}px;
  padding: 10px 0;
  border-radius: 30px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const BoxButtonText = styled.Text`
  font-size: 15px;
`;

const PayInfoBox = styled.View`
  margin-top: 10px;
  align-items: center;
  border-color: #bbb;
  border-width: 1px;
`;
const MainPayBox = styled.View`
  padding: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const MainPayBoxText = styled.Text`
  font-size: 23px;
`;

const DetailBox = styled.View`
  width: 100%;
`;
const Line = styled.View`
  height: 1px;
  background-color: #bbb;
`;
const ToggleIcon = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const FooterBtn = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  padding: 15px 10px;
  border-radius: 10px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
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
  border-color: #e85356;
  border-radius: 6px;
`;

const Bold = styled.Text`
  color: #e85356;
  font-weight: bold;
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
  onRefresh,
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
}) => {
  const MainBoxContainer = ({text, onPress, boxButton}) => (
    <Box>
      <BoxTitle>
        <BoxTitleText>{text}</BoxTitleText>
      </BoxTitle>
      <BoxButton onPress={onPress}>
        {boxButton ? (
          <BoxButtonText>접기</BoxButtonText>
        ) : (
          <BoxButtonText>자세히보기</BoxButtonText>
        )}
      </BoxButton>
    </Box>
  );

  const DetailListRow = ({text, value}) => (
    <DetailRowContainer>
      <DetailRowText>{text}</DetailRowText>
      <DetailRowText>{value} 원</DetailRowText>
    </DetailRowContainer>
  );

  const MainInfoOfPay = ({text, value, click, onPress}) => (
    <DetailRowContainer>
      <ToggleIcon onPress={onPress}>
        {click ? <UpIcon color="#BCC5D3" /> : <DownIcon color="#777" />}
        <DetailRowText>{text}</DetailRowText>
      </ToggleIcon>
      <DetailRowText>{value} 원</DetailRowText>
    </DetailRowContainer>
  );

  const TopAreaContainer = () => (
    <TopArea>
      <DateBox>
        <DateArrow onPress={() => backpay()}>
          <BackIcon size={22} color={'#f4aaab'} />
        </DateArrow>
        <DateTextArea>
          <DateBoxText>
            {moment(maindata.START_DAY).format('YYYY년 M월')}
          </DateBoxText>
          <DateBoxText style={{fontSize: 12, fontWeight: '300'}}>
            ({moment(maindata.START_DAY).format('M월 D일')}
            &nbsp;~&nbsp;
            {moment(maindata.END_DAY).format('M월 D일')})
          </DateBoxText>
        </DateTextArea>
        <DateArrow style={{marginRight: 5}} onPress={() => onRefresh()}>
          <ReloadCircleIcon size={18} color={'#f4aaab'} />
        </DateArrow>
        <DateArrow onPress={() => nextpay()}>
          <ForwardIcon size={22} color={'#f4aaab'} />
        </DateArrow>
      </DateBox>
    </TopArea>
  );

  const DetailAreaContainer = ({totalearned}) => (
    <>
      <MainInfoOfPay
        text={'4대보험 근로자부담금'}
        value={`(-)${numberComma(maindata.fourtotal)}`}
        click={click2}
        onPress={() => setClick2(!click2)}
      />
      {click2 && (
        <DetailBox>
          <DetailListRow
            text={'국민연금'}
            value={`(-)${numberComma(maindata.pension_pay)}`}
          />
          <DetailListRow
            text={'건강보험'}
            value={`(-)${numberComma(maindata.health_pay)}`}
          />
          <DetailListRow
            text={'장기요양'}
            value={`(-)${numberComma(maindata.health2_pay)}`}
          />
          <DetailListRow
            text={'고용보험'}
            value={`(-)${numberComma(maindata.employment_pay)}`}
          />
        </DetailBox>
      )}
      <MainInfoOfPay
        text={'원천세'}
        value={`(-)${numberComma(totalearned)}`}
        click={click3}
        onPress={() => setClick3(!click3)}
      />
      {click3 && (
        <DetailBox>
          <DetailListRow
            text={'소득세'}
            value={`(-)${numberComma(maindata.earned)}`}
          />
          <DetailListRow
            text={'지방소득세'}
            value={`(-)${numberComma(maindata.earned2)}`}
          />
        </DetailBox>
      )}
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
                {IS_MANAGER === '1' ? '[매니저]' : '[스태프]'}
              </DateText>
            </Row>
            <EmployeeText>
              {EMP_PAY_TYPE === '0' && '시급'}
              {EMP_PAY_TYPE === '1' && '일급'}
              {EMP_PAY_TYPE === '2' && '월급'}&nbsp;
              {PAY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </EmployeeText>
            <EmployeeText>
              근무기간&nbsp;({moment().diff(moment(START), 'month')}개월)
            </EmployeeText>
            <EmployeeText>
              {moment(START).format('YYYY.MM.DD')} ~&nbsp;
              {END ? moment(END).format('YYYY.MM.DD') : '계속'}
            </EmployeeText>
          </NameBox>
          <NavigationButton onPress={() => gotoSetInfo()}>
            <Bold>정보수정</Bold>
          </NavigationButton>
        </EmployeeCardContainer>
      </TopArea>
    );
  };

  if (PAY_TYPE == '2') {
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
              <Section>
                <MainBoxContainer
                  text={'고용주 지출액'}
                  onPress={() => setBoxButton(!boxButton)}
                  boxButton={boxButton}
                />
                <PayInfoBox>
                  <MainPayBox>
                    <MainPayBoxText>
                      {ownertotal ? `${numberComma(ownertotal)} 원` : '0 원'}
                    </MainPayBoxText>
                  </MainPayBox>
                  {boxButton && (
                    <DetailBox>
                      <Line />
                      <DetailListRow
                        text={'급여지급액'}
                        value={numberComma(emptotal)}
                      />
                      <DetailListRow
                        text={'4대보험 고용주부담금'}
                        value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                      />
                      <DetailListRow
                        text={'4대보험 근로자부담금'}
                        value={`(+) ${numberComma(maindata.fourtotal)}`}
                      />
                      <DetailListRow
                        text={'원천세'}
                        value={`(+) ${numberComma(totalearned)}`}
                      />
                    </DetailBox>
                  )}
                </PayInfoBox>
              </Section>
            )}

            <Section>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <MainBoxContainer
                  text={'근로자 수령액(월급)'}
                  onPress={() => setBoxButton2(!boxButton2)}
                  boxButton={boxButton2}
                />
              ) : (
                <Box>
                  <BoxTitle>
                    <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
                  </BoxTitle>
                </Box>
              )}
              <PayInfoBox>
                <MainPayBox>
                  <MainPayBoxText>
                    {emptotal ? `${numberComma(emptotal)} 원` : '0 원'}
                  </MainPayBoxText>
                </MainPayBox>
                {boxButton2 && (
                  <DetailBox>
                    <Line />
                    <MainInfoOfPay
                      text={'공제전 금액'}
                      value={numberComma(maindata.realtotal)}
                      click={click1}
                      onPress={() => setClick1(!click1)}
                    />
                    {click1 && (
                      <DetailBox>
                        <DetailListRow
                          text={'기본급'}
                          value={numberComma(maindata.PAY)}
                        />
                        <DetailListRow
                          text={'식대'}
                          value={numberComma(maindata.MEALS)}
                        />
                        <DetailListRow
                          text={'자가운전'}
                          value={numberComma(maindata.SELF_DRIVING)}
                        />
                        <DetailListRow
                          text={'상여'}
                          value={numberComma(maindata.BONUS)}
                        />
                        <DetailListRow
                          text={'성과급'}
                          value={numberComma(maindata.INCENTIVE)}
                        />
                      </DetailBox>
                    )}
                    <DetailAreaContainer totalearned={totalearned} />
                  </DetailBox>
                )}
              </PayInfoBox>
            </Section>
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
              <Section>
                <MainBoxContainer
                  text={'고용주 지출액'}
                  onPress={() => setBoxButton(!boxButton)}
                  boxButton={boxButton}
                />
                <PayInfoBox>
                  <MainPayBox>
                    <MainPayBoxText>
                      {ownertotal ? `${numberComma(ownertotal)} 원` : '0 원'}
                    </MainPayBoxText>
                  </MainPayBox>
                  {boxButton && (
                    <DetailBox>
                      <Line />
                      <DetailListRow
                        text={'급여지급액'}
                        value={numberComma(realemptotal)}
                      />
                      <DetailListRow
                        text={'4대보험 고용주부담금'}
                        value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                      />
                      <DetailListRow
                        text={'4대보험 근로자부담금'}
                        value={`(+) ${numberComma(maindata.fourtotal)}`}
                      />
                      <DetailListRow
                        text={'원천세'}
                        value={`(+) ${numberComma(totalearned)}`}
                      />
                    </DetailBox>
                  )}
                </PayInfoBox>
              </Section>
            )}
            <Section>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <MainBoxContainer
                  text={'근로자 수령액(시급)'}
                  onPress={() => setBoxButton2(!boxButton2)}
                  boxButton={boxButton2}
                />
              ) : (
                <Box>
                  <BoxTitle>
                    <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
                  </BoxTitle>
                </Box>
              )}
              <PayInfoBox>
                <MainPayBox>
                  <MainPayBoxText>
                    {realemptotal ? `${numberComma(realemptotal)} 원` : '0 원'}
                  </MainPayBoxText>
                </MainPayBox>
                {boxButton2 && (
                  <DetailBox>
                    <Line />
                    <MainInfoOfPay
                      text={'공제전 금액'}
                      value={numberComma(emptotal)}
                      click={click1}
                      onPress={() => setClick1(!click1)}
                    />
                    {click1 && (
                      <DetailBox>
                        <DetailListRow
                          text={'기본급'}
                          value={numberComma(maindata.realtotal)}
                        />
                        <DetailListRow
                          text={'주휴수당'}
                          value={`(+)${numberComma(maindata.weekpaytotal)}`}
                        />
                        <DetailListRow
                          text={'야간/초과/휴일 수당'}
                          value={`(+)${numberComma(maindata.addtotal)}`}
                        />
                        <DetailListRow
                          text={'지각/조퇴 차감'}
                          value={`(-)${numberComma(maindata.minertotalpay)}`}
                        />
                        <DetailListRow
                          text={'결근/휴무 차감'}
                          value={`(-)${numberComma(maindata.noworktotalpay)}`}
                        />
                      </DetailBox>
                    )}
                    <DetailAreaContainer totalearned={totalearned} />
                  </DetailBox>
                )}
              </PayInfoBox>
            </Section>

            <Footer>
              <FooterBtn onPress={() => onPressFooter('click4')}>
                <DateText>일별 급여현황</DateText>
                {isCardShowed ? (
                  <UpIcon color="#BCC5D3" />
                ) : (
                  <DownIcon color="#777" />
                )}
              </FooterBtn>
              {isCardShowed && (
                <CardBox>
                  {maindata.CARDLIST.map((data) => {
                    return (
                      <EmpPayInfoCard1
                        key={data.key}
                        day={data.START}
                        yoil={data.DAY}
                        base={data.basic_payment}
                        night={data.night_payment}
                        over={data.day_payment}
                        holi={0}
                        late={data.miner_payment}
                        total={data.payment}
                      />
                    );
                  })}
                </CardBox>
              )}
            </Footer>
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
              <Section>
                <MainBoxContainer
                  text={'고용주 지출액'}
                  onPress={() => setBoxButton(!boxButton)}
                  boxButton={boxButton}
                />
                <PayInfoBox>
                  <MainPayBox>
                    <MainPayBoxText>
                      {ownertotal ? `${numberComma(ownertotal)} 원` : '0 원'}
                    </MainPayBoxText>
                  </MainPayBox>
                  {boxButton && (
                    <DetailBox>
                      <Line />
                      <DetailListRow
                        text={'급여지급액'}
                        value={numberComma(realemptotal)}
                      />
                      <DetailListRow
                        text={'4대보험 고용주부담금'}
                        value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                      />
                      <DetailListRow
                        text={'4대보험 근로자부담금'}
                        value={`(+) ${numberComma(maindata.fourtotal)}`}
                      />
                      <DetailListRow
                        text={'원천세'}
                        value={`(+) ${numberComma(totalearned)}`}
                      />
                    </DetailBox>
                  )}
                </PayInfoBox>
              </Section>
            )}
            <Section>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <MainBoxContainer
                  text={'근로자 수령액(월급)'}
                  onPress={() => setBoxButton2(!boxButton2)}
                  boxButton={boxButton2}
                />
              ) : (
                <Box>
                  <BoxTitle>
                    <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
                  </BoxTitle>
                </Box>
              )}
              <PayInfoBox>
                <MainPayBox>
                  <MainPayBoxText>
                    {realemptotal ? `${numberComma(realemptotal)} 원` : '0 원'}
                  </MainPayBoxText>
                </MainPayBox>
                {boxButton2 && (
                  <DetailBox>
                    <Line />
                    <MainInfoOfPay
                      text={'공제전 금액'}
                      value={numberComma(maindata.realtotal)}
                      click={click1}
                      onPress={() => setClick1(!click1)}
                    />
                    {click1 && (
                      <DetailBox>
                        <DetailListRow
                          text={'기본급'}
                          value={numberComma(maindata.realtotal)}
                        />
                      </DetailBox>
                    )}
                    <DetailAreaContainer totalearned={totalearned} />
                  </DetailBox>
                )}
              </PayInfoBox>
            </Section>
            <Footer>
              <FooterBtn
                onPress={() => {
                  onPressFooter('click5');
                }}>
                <DateText>일별 급여현황</DateText>
                {isCardShowed ? (
                  <UpIcon color="#BCC5D3" />
                ) : (
                  <DownIcon color="#777" />
                )}
              </FooterBtn>
              {isCardShowed && (
                <CardBox>
                  {maindata.CARDLIST1.map((data) => {
                    return (
                      <EmpPayInfoCard2
                        day={data.START}
                        yoil={data.DAY}
                        total={data.payment}
                      />
                    );
                  })}
                </CardBox>
              )}
            </Footer>
          </Container>
        </ScrollView>
      </BackGround>
    );
  }
};
