import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {toggleVACATION} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';
import SubmitBtn from '~/components/Btn/SubmitBtn';

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
const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
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
  width: ${wp('75%')}px;
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
  color: #aaa;
  margin: 40px;
`;

const ContentsBoxLine = styled.View`
  width: ${wp('75%') - 20}px;
  border-bottom-width: 2px;
  border-color: #e5e5e5;
  margin-top: 10px;
`;

const ElementsBox = styled.View`
  border-width: 1px;
  border-radius: 10px;
  border-color: #cccccc;
  padding: 20px;
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
    data: {
      WORKDATE = null,
      MEMBER_SEQ = null,
      EMP_ID = null,
      NAME = null,
      START = '',
      END = '',
    } = {},
    date = null,
  } = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [isHelpModalVisible, setisHelpModalVisible] = useState<boolean>(false);
  const [restType, setRestType] = useState<string>('0');

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const registerFn = async () => {
    try {
      dispatch(
        toggleVACATION({
          VACATION: '1',
          DATE: date,
          MEMBER_SEQ,
        }),
      );
      navigation.pop(2);
      alertModal('휴무설정이 완료되었습니다.');
      await api.createScheduleVacation2({
        EMP_SEQ: EMP_ID,
        STORE_ID: STORE_SEQ,
        EMP_NAME: NAME,
        DATE: date,
        TYPE: restType,
        START,
        END,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const Vacation = ({key, title}) => (
    <TextWrapper>
      <Text style={{marginLeft: 10}}>{title}</Text>
      <MidText>{[key]}</MidText>
      <Text style={{marginRight: 20}}>일</Text>
    </TextWrapper>
  );

  const RestType = ({selection, text}) => {
    return (
      <Row>
        <Touchable
          onPress={() => {
            if (selection === 0) {
              setRestType('0');
            } else if (selection === 1) {
              setRestType('1');
            }
          }}>
          <BigText>{text}</BigText>
        </Touchable>
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
      </Row>
    );
  };

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
            직원의 근무를
          </BigText>
          <RestType selection={0} text={'무급휴무로 진행합니다.'} />
          {restType === '1' && (
            <>
              <RowSpace>
                <ElementsBox>
                  <Vacation key={'totalVacation'} title={'총 연차'} />
                  <Vacation key={'useVacation'} title={'사용한 연차'} />
                  <ContentsBoxLine />
                  <Vacation key={'remainderVacation'} title={'남은 연차'} />
                </ElementsBox>
              </RowSpace>
              <GreyText>
                * 직원정보의 연차설정에 입력된 값으로 셋팅이 됩니다.
              </GreyText>
            </>
          )}
        </Section>
        <SubmitBtn
          text={'휴무 적용'}
          onPress={() => registerFn()}
          isRegisted={true}
        />
      </Container>
    </BackGround>
  );
};
