import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BigText = styled.Text`
  color: #000;
  font-size: 32px;
`;
const Text = styled.Text`
  color: #000;
  font-size: 16px;
`;

const View = styled.View`
  z-index: 10;
  background-color: white;
  border-radius: 20px;
  width: 300px;
  height: 350px;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
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
  position: absolute;
  top: 80px;
  align-items: center;
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
  setSucessModalOpen,
  actionTYPE,
}) => {
  return (
    <>
      <FastImage
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          position: 'relative',
          top: 60,
          zIndex: 15,
        }}
        source={{uri: 'http://133.186.210.223/uploads/3.png'}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <LottieView
        style={{width: wp('100%'), zIndex: 1, position: 'absolute'}}
        source={require('../assets/animations/goWorkingSuccess.json')}
        loop={true}
        autoPlay
      />
      <View>
        <TextBox>
          <BigText>
            {MEMBER_NAME}님, {STORE_NAME}점에
          </BigText>
          <BigText style={{textAlign: 'center', marginBottom: 5}}>
            무사히 {actionTYPE}하였습니다.
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
          onPress={() => setSucessModalOpen(false)}
          rippleColor={'#e39a9c'}
          rippleDuration={600}
          rippleSize={1200}
          rippleContainerBorderRadius={30}
          rippleOpacity={0.45}>
          <Text style={{color: '#e85356'}}>확인</Text>
        </Touchable>
      </View>
    </>
  );
};
