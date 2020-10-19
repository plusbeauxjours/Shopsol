import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import {
  CheckBoxIcon,
  HelpCircleIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '~/constants/Icons';

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 15px;
  margin-left: 5px;
`;

const SkyblueText = styled.Text`
  color: skyblue;
`;

const RedText = styled.Text`
  color: #ff3d3d;
`;

const WhiteText = styled.Text`
  font-size: 16px;
  color: white;
`;
const WhiteSpace = styled.View`
  height: 30px;
`;

const ModalContainer = styled.View`
  height: ${hp('20%')}px;
  background-color: white;
`;

const ModalButton = styled.TouchableOpacity`
  height: 20px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

const SalarySystemSettingButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  width: 50px;
  height: 20px;
  border-radius: 20px;
  background-color: #e85356;
  align-items: center;
  justify-content: center;
`;

const SalarySystemSettingText = styled.Text`
  color: white;
  font-size: 15px;
`;

const SalarySystemText = styled.Text`
  margin-left: 10px;
`;

export const Authority = ({
  selection,
  text,
  authorityCheck,
  setAuthorityCheck,
  alertModal,
  explainModal,
}) => {
  const {STORE} = useSelector((state: any) => state.userReducer);
  let value = JSON.parse(JSON.stringify(authorityCheck));
  return (
    <Row>
      <TypeContainer
        onPress={() => {
          if (
            selection == 0 &&
            authorityCheck[0] == true &&
            authorityCheck[4] == true
          ) {
            alertModal(
              '',
              '사업장 급여에 본인급여도 포함되어 있어 사업장 급여만 선택은 불가합니다.',
            );
            return false;
          }
          if (selection == 4 && authorityCheck[4] == false) {
            value[selection] = !value[selection];
            value[0] = true;
            setAuthorityCheck(value);
          } else {
            value[selection] = !value[selection];
            setAuthorityCheck(value);
          }
        }}>
        {authorityCheck[selection] ? (
          <CheckBoxIcon size={25} color="#e85356" />
        ) : (
          <CheckBoxIcon size={25} color="#CCCCCC" />
        )}
        <Text>{text}</Text>
        {STORE == '1' && selection !== 4 && (
          <TypeContainer
            onPress={() => {
              if (selection == 0) {
                explainModal(
                  '선택여부에 따라 직원앱에서 보여지는 화면이 다릅니다.\n(선택시) 직원이 급여정보 화면에서 누적급여 등을 확인할수 있습니다.\n(선택해제) 직원에게는 급여정보 화면이 보이지 않습니다.',
                );
              } else if (selection == 1) {
                explainModal(
                  '직원의 정보수정(급여, 수당, 공제유형 등) 및 근무일정 수정이 가능합니다.',
                );
              } else if (selection == 2) {
                explainModal(
                  '직원의 일정관리(일별 근무시간, 출퇴근시간, 휴무설정 등) 수정이 가능합니다.',
                );
              } else if (selection == 3) {
                explainModal(
                  '직원의 출퇴근, 체크리스트 알람을 받아보실 수 있습니다.',
                );
              } else return;
            }}>
            <HelpCircleIcon />
          </TypeContainer>
        )}
      </TypeContainer>
    </Row>
  );
};

export const SalarySystem = ({
  selection,
  text,
  setRestTypeCheck,
  setRestTime,
  setWeekTypeCheck,
  weekTime,
  restTime,
  setWeekTime,
  salarySystemCheck,
  setSalarySystemCheck,
  explainModal,
  isSalaryModalVisible1,
  setIsSalaryModalVisible1,
  isSalaryModalVisible2,
  setIsSalaryModalVisible2,
  isHelpModalVisible,
  setIsHelpModalVisible,
}) => {
  let value = JSON.parse(JSON.stringify(salarySystemCheck));
  const {STORE} = useSelector((state: any) => state.userReducer);
  return (
    <Row style={{marginBottom: 25}}>
      <TypeContainer
        onPress={() => {
          value[selection] = !value[selection];
          if (selection === 1 && value[selection] === false) {
            setWeekTypeCheck([false, true]);
            setWeekTime(null);
          }
          if (selection === 2 && value[selection] === false) {
            setRestTypeCheck([false, true]);
            setRestTime(null);
          }
          setSalarySystemCheck(value);
        }}>
        {salarySystemCheck[selection] ? (
          <CheckBoxIcon size={25} color="#e85356" />
        ) : (
          <CheckBoxIcon size={25} color="#CCCCCC" />
        )}
        {selection === 0 && (
          <SalarySystemText>
            <SkyblueText>(+) </SkyblueText>
            <Text>{text}</Text>
          </SalarySystemText>
        )}
        {selection === 1 && (
          <SalarySystemText>
            <SkyblueText>(+) </SkyblueText>
            <Text>{text}</Text>
          </SalarySystemText>
        )}
        {selection === 2 && (
          <SalarySystemText>
            <RedText>(-) </RedText>
            <Text>{text}</Text>
          </SalarySystemText>
        )}
        {STORE == '1' && (
          <TypeContainer
            onPress={() => {
              if (selection === 0) {
                explainModal(
                  '선택 시 근무일정에 맞춰 자동으로 수당이 가산되어 급여가 산출됩니다.\n\n자세한 설명은 [도움말 전체보기]에서 확인하세요.',
                );
              } else if (selection === 1) {
                explainModal(
                  '선택 시 설정사항에 따라 계산법 변경이 가능합니다.\n\n근로기준법 기준 : 주 15시간 이상 개근할 경우 지급되는 유급휴일수당\n\n월 근무시간 : 결근 발생 유무와 상관없이 입력한 월 근무시간만큼 계산됩니다.',
                );
              } else {
                explainModal(
                  '선택 시 설정사항에 따라 계산법 변경이 가능합니다.\n\n근로기준법 기준 :\n- 4시간 30분 근무 시 : 4시간 급여계산\n- 9시간 근무 시 : 8시간 급여계산\n\n일 휴게시간 : 분단위로 직접 입력이 가능합니다.',
                );
              }
            }}>
            <HelpCircleIcon />
          </TypeContainer>
        )}
      </TypeContainer>
      {isHelpModalVisible && (
        <Modal
          onRequestClose={() => setIsHelpModalVisible(false)}
          onBackdropPress={() => setIsHelpModalVisible(false)}
          isVisible={isHelpModalVisible}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <ModalContainer>
            <Row
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 30, color: '#5887F9'}}>
                도움말 입니다.
              </Text>
              <WhiteSpace />
              <Text style={{fontSize: 15, color: '#707070'}}>
                세부 도움말이 작성될 공간입니다.
              </Text>
            </Row>
            <Row>
              <ModalButton onPress={() => setIsHelpModalVisible(false)}>
                <WhiteText>확인</WhiteText>
              </ModalButton>
            </Row>
          </ModalContainer>
        </Modal>
      )}
      {selection === 1 && salarySystemCheck[1] === true && (
        <SalarySystemSettingButton
          onPress={() => setIsSalaryModalVisible1(!isSalaryModalVisible1)}>
          <SalarySystemSettingText>
            {weekTime ? `${weekTime}시간` : '설정'}
          </SalarySystemSettingText>
        </SalarySystemSettingButton>
      )}
      {selection === 2 && salarySystemCheck[2] === true && (
        <SalarySystemSettingButton
          onPress={() => setIsSalaryModalVisible2(!isSalaryModalVisible2)}>
          <SalarySystemSettingText>
            {restTime ? `${restTime}분` : '설정'}
          </SalarySystemSettingText>
        </SalarySystemSettingButton>
      )}
    </Row>
  );
};

export const PayCheck = ({
  selection,
  text,
  payCheck,
  setPay2,
  setPay3,
  setPay4,
  setPay5,
  setPayCheck,
}) => {
  let value = JSON.parse(JSON.stringify(payCheck));
  return (
    <TypeContainer
      style={{marginRight: 15}}
      onPress={() => {
        value.fill(false);
        value[selection] = true;
        if (selection === 0 || selection === 1) {
          setPay2('');
          setPay3('');
          setPay4('');
          setPay5('');
          setPayCheck(value);
        } else if (selection === 2) {
          setPay2('0');
          setPay3('0');
          setPay4('0');
          setPay5('0');
          setPayCheck(value);
        }
      }}>
      {payCheck[selection] ? (
        <RadioBtnOnIcon size={22} />
      ) : (
        <RadioBtnOffIcon size={22} />
      )}
      <Text>{text}</Text>
    </TypeContainer>
  );
};
