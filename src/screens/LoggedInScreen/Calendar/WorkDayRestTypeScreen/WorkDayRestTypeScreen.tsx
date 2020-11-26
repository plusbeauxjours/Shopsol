import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {toggleVACATION} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import moment from 'moment';
import {setSplashVisible} from '~/redux/splashSlice';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const Box = styled.TouchableOpacity`
  width: 160px;
  height: 70px;
  border-width: 1px;
  border-color: #e85356;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const BoxContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin: 20px 0;
`;
const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
  background-color: white;
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
  font-size: 15px;
  margin: 0 5px;
  text-align: right;
`;

const BigText = styled.Text`
  font-size: 26px;
  margin-bottom: 20px;
`;

const GreyText = styled.Text`
  align-self: flex-start;
  color: #aaa;
  margin-top: 10px;
  margin-left: 10px;
`;

const ContentsBoxLine = styled.View`
  width: ${wp('100') - 80}px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  margin: 10px 0;
`;

const ModalContainer = styled.View`
  height: 280px;
  background-color: white;
`;

const ModalBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const BoxText = styled.Text`
  font-size: 16px;
  color: #e85356;
  font-weight: bold;
`;
const WhiteSpace = styled.View`
  height: 30px;
`;

const ModalYesButton = styled.TouchableOpacity`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    data: {WORKDATE = null, MEMBER_SEQ = null, EMP_ID = null, NAME = null} = {},
    date = null,
  } = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [isHelpModalVisible, setisHelpModalVisible] = useState<boolean>(false);
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
      console.log(annual?.ANNUAL);
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
                color: '#e85356',
                fontWeight: 'bold',
                fontSize: 30,
              }}>
              {NAME}
            </Text>
            직원의 휴무설정
          </BigText>
        </Section>
        <BoxContainer>
          <Box onPress={() => registerFn('1')}>
            <BoxText>유급휴무 적용</BoxText>
          </Box>
          <Box onPress={() => registerFn('0')}>
            <BoxText>무급휴무 적용</BoxText>
          </Box>
        </BoxContainer>
        <Section>
          <Vacation vacation={totalVacation} title={'총 연차'} />
          <Vacation vacation={useVacation} title={'사용한 연차'} />
          <ContentsBoxLine />
          <Vacation vacation={remainderVacation} title={'남은 연차'} />
        </Section>
        <GreyText>
          * 직원정보의 연차설정에 입력된 값으로 셋팅이 됩니다.
        </GreyText>
        {isHelpModalVisible && (
          <Modal
            onRequestClose={() => setisHelpModalVisible(false)}
            onBackdropPress={() => setisHelpModalVisible(false)}
            isVisible={isHelpModalVisible}
            style={{margin: 0, justifyContent: 'flex-end'}}>
            <ModalContainer>
              <ModalBox>
                <Text style={{fontSize: 30, color: '#e85356'}}>
                  도움말 입니다.
                </Text>
                <WhiteSpace />
                <Text style={{fontSize: 15, color: '#707070'}}>
                  세부 도움말이 작성될 공간입니다.
                </Text>
              </ModalBox>
              <Row>
                <ModalYesButton onPress={() => setisHelpModalVisible(false)}>
                  <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
                </ModalYesButton>
              </Row>
            </ModalContainer>
          </Modal>
        )}
      </Container>
    </BackGround>
  );
};
