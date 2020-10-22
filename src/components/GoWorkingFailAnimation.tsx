import React from 'react';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

const BigText = styled.Text`
  color: #000;
  font-size: 24px;
`;
const Text = styled.Text`
  text-align: center;
  color: #000;
  font-size: 16px;
`;

const View = styled.View`
  z-index: 10;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 60px;
  width: 300px;
  justify-content: center;
  align-items: center;
`;

const Touchable = styled(Ripple)`
  position: absolute;
  bottom: 10px;
  width: 80%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 20px;
  border-width: 1px;
  border-color: #e85356;
`;

const TextBox = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

const WhiteSpace = styled.View`
  height: 15px;
`;

const InfoTextBox = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export default ({
  STORE_NAME,
  JULI,
  LATE_TIME,
  EARLY_TIME,
  MEMBER_NAME,
  setFailModalOpen,
  actionTYPE,
  errorMessage,
}) => {
  return (
    <View>
      <TextBox>
        <BigText style={{textAlign: 'center', marginBottom: 5}}>
          {MEMBER_NAME}님, {STORE_NAME}점에&nbsp;
          {actionTYPE}을 진행 할 수 없습니다.
        </BigText>
        <BigText style={{color: 'red', fontWeight: 'bold', marginBottom: 5}}>
          {errorMessage}
        </BigText>
        <Text>현재시간 {moment().format('hh:mm')} 입니다.</Text>
        <WhiteSpace />
        {actionTYPE === '출근' ? (
          <InfoTextBox>
            {(JULI || LATE_TIME) && <Text>{STORE_NAME}점의&nbsp;</Text>}
            {JULI && <Text>출퇴근 허용거리는 {JULI}M</Text>}
            {LATE_TIME && <Text>지각 허용시간은 {LATE_TIME}분</Text>}
            {(JULI || LATE_TIME) && <Text>입니다.</Text>}
          </InfoTextBox>
        ) : (
          <InfoTextBox>
            {(JULI || LATE_TIME) && <Text>{STORE_NAME}점의&nbsp;</Text>}
            {JULI && <Text>출퇴근 허용거리는 {JULI}M</Text>}
            {EARLY_TIME && <Text>조퇴 허용시간은 {EARLY_TIME}분</Text>}
            {(JULI || LATE_TIME) && <Text>입니다.</Text>}
          </InfoTextBox>
        )}
      </TextBox>
      <Touchable
        onPress={() => setFailModalOpen(false)}
        rippleColor={'#e39a9c'}
        rippleDuration={600}
        rippleSize={1200}
        rippleContainerBorderRadius={30}
        rippleOpacity={0.45}>
        <Text style={{color: '#e85356'}}>확인</Text>
      </Touchable>
    </View>
  );
};
