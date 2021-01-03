import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {ForwardIcon, HelpCircleIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

interface IText {
  isSubmited?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const Text = styled.Text<IText>`
  margin-left: 5px;
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${(props) => (props.isSubmited ? '#7e7c7c' : '#CE0505')};
`;

const FooterText = styled(Text)`
  margin-top: 5px;
  color: ${styleGuide.palette.greyColor};
`;

const GreyText = styled(Text)`
  color: #7e7c7c;
  font-size: ${styleGuide.fontSize.middle}px;
`;

const Section = styled.TouchableOpacity`
  width: ${wp('100%') - 40}px;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
  justify-content: center;
`;

const Touchable = styled.TouchableOpacity``;

const Footer = styled.View`
  align-items: center;
  margin: 0 20px;
`;

const TypeTitleBox = styled.View`
  align-items: center;
`;

const TypeTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled(Row)`
  margin-top: 20px;
  align-items: center;
`;

const ForwardIconContainer = styled.View`
  position: absolute;
  right: 20px;
`;

export default ({
  refreshing,
  STORE,
  EDUCATION_CERTIFICATE,
  HEALTH_CERTIFICATE_TARGET,
  HEALTH_CERTIFICATE_APPLY,
  HEALTH_DDAY,
  EDUCATION_DATA,
  explainModal,
  onRefresh,
  dday,
}) => {
  const navigation = useNavigation();

  if (STORE == '0') {
    return (
      <BackGround>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Container>
            <Section
              onPress={() =>
                navigation.navigate('HealthCertificateEmpListScreen')
              }>
              <TypeTitle>
                <TitleText>보건증</TitleText>
              </TypeTitle>
              {HEALTH_CERTIFICATE_APPLY == 0 ? (
                <IconContainer>
                  <Text isSubmited={false}> 미등록</Text>
                </IconContainer>
              ) : (
                <IconContainer
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <Text isSubmited={true}>위생교육증 등록완료</Text>
                  <Text
                    style={
                      dday <= 0
                        ? {
                            textDecorationLine: 'underline',
                            marginTop: 5,
                            color: 'red',
                          }
                        : {marginTop: 5, color: styleGuide.palette.greyColor}
                    }>
                    검진일시: {HEALTH_DDAY} (갱신 D{dday <= 0 ? '+' : '-'}
                    {Math.abs(Math.floor(dday))})
                  </Text>
                </IconContainer>
              )}
              <ForwardIconContainer>
                <ForwardIcon />
              </ForwardIconContainer>
            </Section>
            <Footer>
              <FooterText>조기경보시스템을 등록하시면</FooterText>
              <FooterText>갱신시점 이전(40일, 14일, 당일)에</FooterText>
              <FooterText>
                앱푸시 및 문자메시지로 알림을 보내드립니다
              </FooterText>
            </Footer>
          </Container>
        </ScrollView>
      </BackGround>
    );
  } else {
    return (
      <BackGround>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Container>
            {EDUCATION_CERTIFICATE != 0 ? (
              <Section
                onPress={() =>
                  navigation.navigate('HealthCertificateStoreDetailScreen')
                }>
                <TypeTitle>
                  <Row>
                    <TitleText>위생교육증</TitleText>
                    <Touchable
                      onPress={() => {
                        explainModal(
                          '',
                          '위생교육증을 등록하시면 갱신시점 알람 및 기존 교육증 이력관리가 가능합니다.\n(현재는 한국휴게음식업중앙회 발급 수료증에 한하여 등록이 가능합니다. 추후 종류 추가 예정)',
                        );
                      }}>
                      <HelpCircleIcon color="#aaa" />
                    </Touchable>
                  </Row>
                </TypeTitle>
                <IconContainer
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <Text isSubmited={true}>위생교육증 등록완료</Text>
                  <Text
                    style={
                      dday <= 0
                        ? {
                            textDecorationLine: 'underline',
                            marginTop: 5,
                            color: 'red',
                          }
                        : {marginTop: 5, color: '#7e7c7c'}
                    }>
                    교육일시: {moment(EDUCATION_DATA).format('YYYY.MM.DD')}
                    &nbsp;(갱신 D{dday <= 0 ? '+' : '-'}
                    {Math.abs(Math.floor(dday))})
                  </Text>
                </IconContainer>
                <ForwardIconContainer>
                  <ForwardIcon />
                </ForwardIconContainer>
              </Section>
            ) : (
              <Section
                onPress={() =>
                  navigation.navigate('HealthCertificateStoreFormScreen', {
                    count: 3,
                  })
                }>
                <TypeTitle>
                  <Row>
                    <TitleText>위생교육증</TitleText>
                    <Touchable
                      onPress={() => {
                        explainModal(
                          '',
                          '위생교육증을 등록하시면 갱신시점 알람 및 기존 교육증 이력관리가 가능합니다.\n(현재는 한국휴게음식업중앙회 발급 수료증에 한하여 등록이 가능합니다. 추후 종류 추가 예정)',
                        );
                      }}>
                      <HelpCircleIcon color="#aaa" />
                    </Touchable>
                  </Row>
                </TypeTitle>

                <IconContainer>
                  <Text
                    style={{textDecorationLine: 'underline'}}
                    isSubmited={false}>
                    위생교육증 미등록
                  </Text>
                </IconContainer>
                <ForwardIconContainer>
                  <ForwardIcon />
                </ForwardIconContainer>
              </Section>
            )}
            <Section
              onPress={() =>
                navigation.navigate('HealthCertificateEmpListScreen')
              }>
              <TypeTitle>
                <Row>
                  <TitleText>보건증</TitleText>
                  <Touchable
                    onPress={() => {
                      explainModal(
                        '',
                        "직원별 보건증 등록이 가능하며, 등록 후 갱신시점 알람 및 보건증 이력관리가 가능합니다. \n\n직원이 '조기경보'화면에서 직접 등록이 가능합니다. \n직원은 본인 보건증만 확인이 가능합니다.",
                      );
                    }}>
                    <HelpCircleIcon color="#7e7c7c" />
                  </Touchable>
                </Row>
              </TypeTitle>
              {HEALTH_CERTIFICATE_APPLY == 0 ? (
                <IconContainer>
                  <Text isSubmited={false}>미등록</Text>
                </IconContainer>
              ) : Number(HEALTH_CERTIFICATE_APPLY) ==
                Number(HEALTH_CERTIFICATE_TARGET) ? (
                <IconContainer>
                  <Text isSubmited={true}>
                    등록 중({HEALTH_CERTIFICATE_TARGET}명 중&nbsp;
                    {HEALTH_CERTIFICATE_APPLY}명 완료)
                  </Text>
                </IconContainer>
              ) : (
                <IconContainer>
                  <Text isSubmited={false}>
                    등록 중({HEALTH_CERTIFICATE_TARGET}명 중&nbsp;
                    {HEALTH_CERTIFICATE_APPLY}명 완료)
                  </Text>
                </IconContainer>
              )}
              <ForwardIconContainer>
                <ForwardIcon />
              </ForwardIconContainer>
            </Section>
            <Section disabled={true}>
              <TypeTitleBox style={{alignItems: 'flex-start'}}>
                <TitleText>영업신고증</TitleText>
              </TypeTitleBox>
              <IconContainer>
                <GreyText>추후 업데이트 예정입니다.</GreyText>
              </IconContainer>
            </Section>
            <Footer>
              <FooterText>조기경보시스템을 등록하시면</FooterText>
              <FooterText>갱신시점 이전(40일, 14일, 당일)에</FooterText>
              <FooterText>
                앱푸시 및 문자메시지로 알림을 보내드립니다
              </FooterText>
            </Footer>
          </Container>
        </ScrollView>
      </BackGround>
    );
  }
};
