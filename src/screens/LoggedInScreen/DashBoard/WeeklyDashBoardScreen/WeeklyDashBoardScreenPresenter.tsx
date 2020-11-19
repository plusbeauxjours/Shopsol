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
`;

export default ({weekStartDate, weekEndDate}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <Text>weekStartDate = {weekStartDate}</Text>
            <Text>weekEndDate = {weekEndDate}</Text>
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
