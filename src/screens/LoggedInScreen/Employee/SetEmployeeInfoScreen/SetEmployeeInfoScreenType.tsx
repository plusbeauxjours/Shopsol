import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {
  RadioBtnOnIcon,
  RadioBtnOffIcon,
  CheckBoxIcon,
  HelpCircleIcon,
} from '~/constants/Icons';

interface IsBefore {
  isBefore: boolean;
}

const Touchable = styled.TouchableOpacity``;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15px;
  margin-left: 5px;
`;

const TimeText = styled(Text)`
  margin-left: 0;
  color: #e85356;
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #e85356;
`;

const InputCase = styled.TouchableOpacity<IsBefore>`
  align-items: center;
  justify-content: center;
  width: 40px;
  border-color: ${(props) => (props.isBefore ? '#E5E5E5' : '#e85356')};
  border-bottom-width: 2px;
`;

export const DeductionType = ({
  selection,
  text,
  deductionTypeCheck,
  setDeductionTypeCheck,
}) => {
  let value = JSON.parse(JSON.stringify(deductionTypeCheck));
  return (
    <Row style={{marginRight: 15}}>
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setDeductionTypeCheck(value);
        }}>
        {deductionTypeCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <Text>{text}</Text>
      </TypeContainer>
    </Row>
  );
};

export const InsuranceType = ({
  selection,
  text,
  insuranceCheck,
  setInsuranceCheck,
}) => {
  let value = JSON.parse(JSON.stringify(insuranceCheck));
  return (
    <Row>
      <TypeContainer
        onPress={() => {
          value[selection] = !value[selection];
          setInsuranceCheck(value);
        }}>
        {insuranceCheck[selection] ? (
          <CheckBoxIcon size={25} color="#e85356" />
        ) : (
          <CheckBoxIcon size={25} color="#CCCCCC" />
        )}
        <Text>{text}</Text>
      </TypeContainer>
    </Row>
  );
};

export const WeekType = ({
  selection,
  text,
  weekTypeCheck,
  setWeekTypeCheck,
  weekTime,
  setWeekTime,
}) => {
  const weekRef = useRef(null);
  let value = JSON.parse(JSON.stringify(weekTypeCheck));
  return (
    <Row>
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setWeekTypeCheck(value);
          setWeekTime(null);
        }}>
        {weekTypeCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <Text>{text}</Text>
      </TypeContainer>
      {selection === 0 && weekTypeCheck[0] === true && (
        <Row style={{marginLeft: 40}}>
          <InputCase
            onPress={() => weekRef.current.focus()}
            isBefore={weekTime === ''}>
            <TextInput
              ref={weekRef}
              onChangeText={(text) => setWeekTime(text)}
              value={weekTime}
              keyboardType={'number-pad'}
              maxLength={3}
            />
          </InputCase>
          <TimeText> 시간</TimeText>
        </Row>
      )}
    </Row>
  );
};

export const RestType = ({
  selection,
  text,
  restTypeCheck,
  setRestTypeCheck,
  restTime,
  setRestTime,
}) => {
  const restRef = useRef(null);
  let value = JSON.parse(JSON.stringify(restTypeCheck));
  return (
    <Row>
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setRestTypeCheck(value);
          setRestTime(null);
        }}>
        {restTypeCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <Text>{text}</Text>
      </TypeContainer>
      {selection === 0 && restTypeCheck[0] === true && (
        <Row style={{marginLeft: 40}}>
          <InputCase
            onPress={() => restRef.current.focus()}
            isBefore={restTime === ''}>
            <TextInput
              ref={restRef}
              onChangeText={(text) => setRestTime(text)}
              value={restTime}
              keyboardType={'number-pad'}
              maxLength={3}
            />
          </InputCase>
          <TimeText> 분</TimeText>
        </Row>
      )}
    </Row>
  );
};

export const PositionType = ({
  selection,
  text,
  positionCheck,
  setPositionCheck,
  authorityCheck,
  setAuthorityCheck,
  explainModal,
}) => {
  const {STORE} = useSelector((state: any) => state.userReducer);
  let valueP = JSON.parse(JSON.stringify(positionCheck));
  let valueA = JSON.parse(JSON.stringify(authorityCheck));
  return (
    <Row>
      <TypeContainer
        onPress={() => {
          valueP.fill(false); // ES6
          valueA.fill(false); // ES6
          valueP[selection] = true;
          setPositionCheck(valueP);
          setAuthorityCheck(valueA);
        }}>
        {positionCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <Text>{text}</Text>
      </TypeContainer>
      {selection === 1 && STORE == '1' && (
        <Touchable
          onPress={() => {
            explainModal(
              '매니저는 점장의 권한을 부분적으로 부여받아 점주의 업무를 대행할 수 있습니다. 하단의 선택사항에 따라 권한이 부여됩니다.',
            );
          }}>
          <HelpCircleIcon />
        </Touchable>
      )}
    </Row>
  );
};
