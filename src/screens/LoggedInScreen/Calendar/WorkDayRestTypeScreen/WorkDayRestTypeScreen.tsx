import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {toggleVACATION} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import styleGuide from '~/constants/styleGuide';
import {setSplashVisible} from '~/redux/splashSlice';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const BoxContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 40px 20px;
  align-items: center;
  background-color: white;
  margin-bottom: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const TextWrapper = styled(RowSpace)`
  align-items: center;
  width: ${wp('100%') - 120}px;
  height: 30px;
`;

const MidText = styled.Text`
  flex: 1;
  font-size: ${styleGuide.fontSize.large}px;
  margin: 0 5px;
  text-align: right;
`;

const BigText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  margin-bottom: 10px;
`;

const ContentsBoxLine = styled.View`
  width: ${wp('100') - 80}px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  margin: 10px 0;
`;

const ButtonText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
`;

const LeftButton = styled.TouchableOpacity`
  height: 50px;
  width: ${(wp('100%') - 50) / 2}px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
  border-radius: 20px;
`;

const RightButton = styled(LeftButton)`
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.primary};
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    data: {WORKDATE = null, MEMBER_SEQ = null, EMP_ID = null, NAME = null} = {},
    date = null,
  } = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [totalVacation, setTotalVacation] = useState<string>('0');
  const [useVacation, setUseVacation] = useState<string>('0');
  const [remainderVacation, setRemainderVacation] = useState<string>('0');

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const registerFn = async (TYPE) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.createScheduleVacation2({
        EMP_SEQ: EMP_ID,
        STORE_ID: STORE_SEQ,
        EMP_NAME: NAME,
        DATE: date,
        TYPE,
      });
      if (data.message === 'SUCCESS') {
        alertModal(`${TYPE == '1' ? '유급' : '무급'} 휴무가 적용되었습니다.`);
        dispatch(
          toggleVACATION({
            VACATION: '1',
            DATE: date,
            MEMBER_SEQ,
          }),
        );
        navigation.pop(2); // 뒤로
      } else {
        alertModal(data.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const initialize = async () => {
    const YEAR = moment().format('YYYY');
    const {data} = await api.getEmpAnnual(EMP_ID, YEAR);
    if (Array.isArray(data.message) && data.message.length > 0) {
      const annual = data.message[0];
      if (annual?.ANNUAL && annual?.USE_ANNUAL) {
        setRemainderVacation(
          (
            Number(annual?.ANNUAL || 0) - Number(annual?.USE_ANNUAL || 0)
          ).toString(),
        );
      }

      annual?.ANNUAL && setTotalVacation(annual.ANNUAL);
      annual?.USE_ANNUAL && setUseVacation(annual.USE_ANNUAL);
    } else {
      return;
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const Vacation = ({vacation, title}) => (
    <TextWrapper>
      <Text>{title}</Text>
      <MidText>{vacation}</MidText>
      <Text>일</Text>
    </TextWrapper>
  );

  return (
    <BackGround>
      <Container>
        <Section>
          <BigText>
            {WORKDATE.slice(0, 4)}년 {WORKDATE.slice(5, 7)}
            월&nbsp;
            {WORKDATE.slice(8, 10)}일
          </BigText>
          <BigText>
            <Text
              style={{
                fontWeight: styleGuide.fontWeight.bold,
                fontSize: styleGuide.fontSize.large,
              }}>
              {NAME}
            </Text>
            직원의 휴무설정
          </BigText>
          <WhiteSpace />
          <Vacation vacation={totalVacation} title={'총 연차'} />
          <Vacation vacation={useVacation} title={'사용한 연차'} />
          <ContentsBoxLine />
          <Vacation vacation={remainderVacation} title={'남은 연차'} />
        </Section>
        <BoxContainer>
          <LeftButton onPress={() => registerFn('1')}>
            <ButtonText
              style={{fontSize: styleGuide.fontSize.large, color: 'white'}}>
              유급휴무 적용
            </ButtonText>
          </LeftButton>
          <RightButton onPress={() => registerFn('0')}>
            <ButtonText
              style={{
                fontSize: styleGuide.fontSize.large,
                color: styleGuide.palette.primary,
              }}>
              무급휴무 적용
            </ButtonText>
          </RightButton>
        </BoxContainer>
      </Container>
    </BackGround>
  );
};
