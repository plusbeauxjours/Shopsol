import React from 'react';
import styled from 'styled-components/native';

import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Box = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14px;
  color: #212121;
`;
const Switch = styled.Switch``;

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px 0;
  background-color: white;
`;

export default ({
  updateAlarm,
  allPushState,
  workPushState,
  checkPushState,
  checksharePushState,
  scedulePUshState,
}) => {
  const SwitchBox = ({value, alarm}) => (
    <Switch
      trackColor={{true: '#e39a9c', false: '#ddd'}}
      thumbColor={'white'}
      onValueChange={() => {
        updateAlarm(value, alarm);
      }}
      value={value}
    />
  );
  return (
    <BackGround>
      <Container>
        <Section>
          <Box>
            <Text>푸시 끄기/켜기</Text>
            <SwitchBox value={allPushState} alarm={'All_PUSH'} />
          </Box>
          {allPushState && (
            <>
              <Box>
                <Text>출퇴근 푸시</Text>
                <SwitchBox value={workPushState} alarm={'WORK_PUSH'} />
              </Box>
              <Box>
                <Text>근무일정 푸시</Text>
                <SwitchBox value={checkPushState} alarm={'CHECK_PUSH'} />
              </Box>
              <Box>
                <Text>체크리스트 푸시</Text>
                <SwitchBox
                  value={checksharePushState}
                  alarm={'CHECKSHARE_PUSH'}
                />
              </Box>
              <Box>
                <Text>업무일지 푸시</Text>
                <SwitchBox value={scedulePUshState} alarm={'SCHEDULE_PUSH'} />
              </Box>
            </>
          )}
        </Section>
      </Container>
    </BackGround>
  );
};
