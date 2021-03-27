import React from 'react';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';

import InputLine from '~/components/InputLine';
import RoundBtn from '~/components/Btn/RoundBtn';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Space = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const Touchable = styled.TouchableOpacity``;
const View = styled.View``;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${styleGuide.palette.lightGreyColor};
  background-color: white;
  bottom: 0px;
  flex: 1;
`;

const SectionNoLine = styled.View`
  width: 100%;
  background-color: white;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  padding: 0;
  width: 100%;
  font-size: ${styleGuide.fontSize.large}px;
  color: black;
  margin-left: 5px;
  margin-top: 10px;
`;

const UnderLineText = styled.Text`
  text-decoration-line: underline;
  font-size: ${styleGuide.fontSize.large}px;
`;

const GreyText = styled.Text`
  font-size: 18px;
  color: #212121;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  width: 100px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
  border-radius: 20px;
  align-self: flex-end;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const RequestText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: white;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ({
  gotoFind,
  onChangeMobileNum,
  setPassword,
  mobileNo,
  password,
  logIn,
  brandData,
  selectedBrandIndex,
  selectBrandFn,
  isBrandLogin,
  setIsBrandLogin,
}) => {
  return (
    <BackGround>
      <KeyboardAvoidingView style={{height: '100%', padding: 20}}>
        <Container>
          {/* {isBrandLogin ? (
            selectedBrandIndex ? (
              <SectionNoLine
                as={Animatable.View}
                animation={{
                  from: {opacity: 0, scale: 1.2},
                  to: {opacity: 1, scale: 1},
                }}
                duration={100}>
                <Touchable
                  style={{width: wp('100%'), flex: 1, alignItems: 'center'}}
                  onPress={() => selectBrandFn()}>
                  <FastImage
                    style={{borderRadius: 20, height: 150, width: 150, flex: 1}}
                    source={{
                      uri: brandData[selectedBrandIndex].IMG_URL,
                      cache: FastImage.cacheControl.immutable,
                      priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Touchable>
              </SectionNoLine>
            ) : brandData?.length > 12 ? (
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                }}>
                <Row
                  as={Animatable.View}
                  animation={{
                    from: {opacity: 0},
                    to: {opacity: 1},
                  }}
                  duration={200}>
                  {brandData?.map((brand, index) => (
                    <Touchable
                      onPress={() =>
                        selectBrandFn(index, brand.NAME, brand.COLOR)
                      }>
                      <FastImage
                        key={index}
                        style={{
                          borderRadius: 10,
                          height: (wp('100%') - 120) / 4,
                          width: (wp('100%') - 120) / 4,
                          margin: 10,
                        }}
                        source={{
                          uri: brand.IMG_URL,
                          cache: FastImage.cacheControl.immutable,
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </Touchable>
                  ))}
                </Row>
              </ScrollView>
            ) : (
              <SectionNoLine>
                <Row
                  as={Animatable.View}
                  animation={{
                    from: {opacity: 0},
                    to: {opacity: 1},
                  }}
                  duration={200}>
                  {brandData?.map((brand, index) => (
                    <Touchable
                      onPress={() =>
                        selectBrandFn(index, brand.NAME, brand.COLOR)
                      }>
                      <FastImage
                        key={index}
                        style={{
                          borderRadius: 10,
                          height: (wp('100%') - 120) / 4,
                          width: (wp('100%') - 120) / 4,
                          margin: 10,
                        }}
                        source={{
                          uri: brand.IMG_URL,
                          cache: FastImage.cacheControl.immutable,
                          priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </Touchable>
                  ))}
                </Row>
              </SectionNoLine>
            )
          ) : ( */}
          <FastImage
            style={{height: 200, width: 200, flex: 1}}
            source={require('../../../assets/images/shopSol.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/*  )}
           {!selectedBrandIndex ? (
             <RequestButton onPress={() => setIsBrandLogin(!isBrandLogin)}>
               <RequestText>
                 {isBrandLogin ? '샵솔 로그인' : '브랜드 로그인'}
               </RequestText>
             </RequestButton>
           ) : (
             <View style={{height: 50}} />
           )} */}
          <Section>
            <TextInputContainer>
              <GreyText>ID</GreyText>
              <TextInput
                placeholder={'휴대폰번호'}
                placeholderTextColor={styleGuide.palette.greyColor}
                onChangeText={(text) => onChangeMobileNum(text)}
                value={mobileNo}
                keyboardType={'number-pad'}
                maxLength={11}
                clearButtonMode={'always'}
              />
            </TextInputContainer>
            <InputLine isBefore={mobileNo == '' ? true : false} />
            <WhiteSpace />
            <TextInputContainer>
              <GreyText>Password</GreyText>
              <TextInput
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={styleGuide.palette.greyColor}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                clearButtonMode={'always'}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </TextInputContainer>
            <InputLine isBefore={password == '' ? true : false} />
            <WhiteSpace />
            <RoundBtn
              isInSection={true}
              isWhiteBack={false}
              text={'로그인'}
              onPress={() => logIn()}
              isRegisted={mobileNo || password}
            />
            <WhiteSpace />
            <Space>
              <Touchable
                onPress={() => {
                  Keyboard.dismiss;
                  gotoFind();
                }}>
                <UnderLineText>비밀번호 찾기</UnderLineText>
              </Touchable>
            </Space>
          </Section>
        </Container>
      </KeyboardAvoidingView>
    </BackGround>
  );
};
