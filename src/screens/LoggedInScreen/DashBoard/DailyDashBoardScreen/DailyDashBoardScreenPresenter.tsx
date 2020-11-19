import React from 'react';
import styled from 'styled-components/native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const View = styled.View``;
const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  height: 140px;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  margin-bottom: 20px;
`;

export default ({empList, toDay, data}) => {
  return (
    <BackGround>
      {console.log('empList', empList)}

      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <Text>출근미체크율 = API 대기중</Text>
          </Section>
          <Section>
            <Text>퇴근미체크율 = API 대기중</Text>
          </Section>
          <Section>
            <Text>지각률 = {toDay}</Text>
          </Section>
          <Section>
            <Text>조퇴률 = {toDay}</Text>
          </Section>
          <Section>
            <Text>평균 휴게시간 = {data.length}</Text>
          </Section>
          <Section>
            <Text>휴가중인 직원 = {toDay}</Text>
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
