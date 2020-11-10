import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {getText1, getText2, getText3} from '~/constants/getText';
import {ForwardIcon} from '~/constants/Icons';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: white;
`;

const ButtonAfter = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;

const Text = styled.Text`
  color: #707070;
  font-size: 15px;
`;

const WhiteText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Card = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.Text`
  font-size: 15px;
  color: #212121;
`;

const Arrow = styled.View`
  color: #5887f9;
  font-size: 20px;
`;

export default () => {
  const RBSheet1 = useRef(null);
  const RBSheet2 = useRef(null);
  const RBSheet3 = useRef(null);

  const Sheet = ({sheetRef, getText}) => (
    <RBSheet
      ref={sheetRef}
      closeOnPressMask={true}
      height={600}
      openDuration={250}
      customStyles={{
        container: {
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <ScrollView
        persistentScrollbar={true}
        contentContainerStyle={{alignItems: 'center'}}
        style={{flex: 1, paddingVertical: 16, paddingHorizontal: 16}}
        showsVerticalScrollIndicator={false}>
        <Text>{getText}</Text>
      </ScrollView>

      <ButtonAfter onPress={() => sheetRef.current.close()}>
        <WhiteText>닫기</WhiteText>
      </ButtonAfter>
    </RBSheet>
  );
  const ArrowIcon = () => (
    <Arrow>
      <ForwardIcon size={16} color={'#e85356'} />
    </Arrow>
  );
  return (
    <BackGround>
      <Sheet sheetRef={RBSheet1} getText={getText1()} />
      <Sheet sheetRef={RBSheet2} getText={getText2()} />
      <Sheet sheetRef={RBSheet3} getText={getText3()} />
      <Card
        onPress={() => {
          RBSheet1.current.open();
        }}>
        <CardText>서비스 이용약관</CardText>
        <ArrowIcon />
      </Card>
      <Card
        onPress={() => {
          RBSheet2.current.open();
        }}>
        <CardText>개인정보 수집</CardText>
        <ArrowIcon />
      </Card>
      <Card
        onPress={() => {
          RBSheet3.current.open();
        }}>
        <CardText>위치정보 수집</CardText>
        <ArrowIcon />
      </Card>
    </BackGround>
  );
};
