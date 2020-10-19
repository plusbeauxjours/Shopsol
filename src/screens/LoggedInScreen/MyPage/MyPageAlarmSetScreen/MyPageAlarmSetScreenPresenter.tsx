import React from 'react';
import styled from 'styled-components/native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6; ;
`;

const Box = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15px;
  color: #212121;
`;
const Switch = styled.Switch``;

export default ({
  updateAlarm,
  All_PUSH,
  WORK_PUSH,
  CHECK_PUSH,
  CHECKSHARE_PUSH,
  SCHEDULE_PUSH,
  toggleAlarm,
}) => {
  const SwitchBox = ({value, alarm}) => (
    <Switch
      trackColor={{true: '#e39a9c', false: '#ddd'}}
      thumbColor={'#fff'}
      onValueChange={() => {
        toggleAlarm(alarm);
        updateAlarm(value, alarm);
      }}
      value={value}
    />
  );
  return (
    <BackGround>
      <Box>
        <Text>푸시 끄기/켜기</Text>
        <SwitchBox value={All_PUSH} alarm={'All_PUSH'} />
      </Box>
      {All_PUSH && (
        <>
          <Box>
            <Text>출퇴근 푸시</Text>
            <SwitchBox value={WORK_PUSH} alarm={'WORK_PUSH'} />
          </Box>
          <Box>
            <Text>근무일정 푸시</Text>
            <SwitchBox value={CHECK_PUSH} alarm={'CHECK_PUSH'} />
          </Box>
          <Box>
            <Text>체크리스트 푸시</Text>
            <SwitchBox value={CHECKSHARE_PUSH} alarm={'CHECKSHARE_PUSH'} />
          </Box>
          <Box>
            <Text>업무일지 푸시</Text>
            <SwitchBox value={SCHEDULE_PUSH} alarm={'SCHEDULE_PUSH'} />
          </Box>
        </>
      )}
    </BackGround>
  );
};
