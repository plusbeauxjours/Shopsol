import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';

import InviteEmployeeScreenCard from './InviteEmployeeScreenCard';
import {HelpCircleIcon, CloseCircleOutlineIcon} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import styleGuide from '~/constants/styleGuide';
import LottieView from 'lottie-react-native';

interface IIsBefore {
  isBefore: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  padding: 20px;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const GreyLine = styled.View`
  width: ${wp('100%') - 80}px;
  margin: 20px 0;
  background-color: ${styleGuide.palette.borderColor};
  height: 1px;
`;

const TextInput = styled.TextInput`
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${styleGuide.fontSize.large}px;
  text-align: center;
  width: ${wp('100%') - 80}px;
  background-color: rgba(30, 30, 30, 0.6);
  color: white;
  height: 60px;
  border-color: ${styleGuide.palette.greyColor};
  border-width: 1px;
  border-radius: 30px;
  padding: 20px;
`;

const Touchable = styled.TouchableOpacity``;

const Refer = styled.View`
  margin: 12px 0;
  justify-content: center;
`;

const ReferText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.greyColor};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RoundBtn = styled(Ripple)`
  justify-content: center;
  align-items: center;
  text-align: center;
  border-color: ${styleGuide.palette.greyColor};
  border-width: 1px;
  border-radius: 30px;
  width: ${wp('100%') - 80}px;
  background-color: rgba(30, 30, 30, 0.6);
  height: 60px;
`;

const ModalContainer = styled.View`
  height: ${hp('50%')};
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const SearchInput = styled.TextInput`
  border-width: 2px;
  border-color: ${styleGuide.palette.searchBarColor};
  width: ${wp('100%') - 40}px;
  background-color: white;
  border-radius: 30px;
  padding-left: 20px;
  align-items: center;
  height: 40px;
  justify-content: center;
`;

const CloseIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  height: 40px;
  justify-content: center;
`;

const SearchInputContainer = styled.View`
  width: ${wp('100%') - 40}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const SubmitButton = styled(Ripple)<IIsBefore>`
  margin-top: 2px;
  width: ${wp('100%')}px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isBefore ? '#cccccc' : styleGuide.palette.primary};
`;

const WhiteText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
`;

const ModalPopupArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  align-items: center;
`;

const ModalPopupText = styled.Text`
  color: white;
`;

const ModalPopup = styled.View`
  padding: 15px;
  border-radius: 10px;
  elevation: 6;
  shadow-color: grey;
  shadow-offset: 3px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SpaceRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled(Ripple)`
  height: 50px;
  width: ${(wp('100%') - 90) / 2}px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-width: 1px;
  border-color: #bbb;
  border-radius: 25px;
`;

const ModalWhiteText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
`;

const WhiteSpace = styled.View`
  height: 60px;
`;

const HelpText = styled.Text`
  width: 100%;
  font-size: ${styleGuide.fontSize.small}px;
  color: white;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 120px;
  margin-top: 5px;
`;

const LoadingContainer = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
  padding-bottom: 80px;
`;

const EmptyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

export default ({
  explainModal,
  setName,
  name,
  setPhone,
  phone,
  choice,
  submitFn,
  addFn,
  result,
  getContactsFn,
  deleteBuffer,
  isModalVisible,
  setIsModalVisible,
  searchName,
  search,
  onPress,
  onPressSubmitButton,
  toastFn,
  isToastVisible,
  isInputModalVisible,
  setIsInputModalVisible,
  setSearch,
  isModalToastVisible,
  loading,
}) => {
  var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <Row
              onPress={() => {
                explainModal(
                  '',
                  '방법1, 방법2 중 편한 방법을 선택하여 직원을 초대해 보세요.\n\n[추가하기] 버튼을 눌러 여러명의 직원을 한번에 초대할 수 있습니다.',
                );
              }}>
              <TitleText> 직원 초대하기</TitleText>
              <HelpCircleIcon />
            </Row>
            <GreyLine />
            <SpaceRow>
              <Button
                rippleContainerBorderRadius={25}
                rippleColor={'#ccc'}
                rippleDuration={300}
                rippleSize={400}
                rippleOpacity={0.45}
                onPress={() => getContactsFn()}>
                <Text
                  style={{fontSize: 14, color: styleGuide.palette.greyColor}}>
                  연락처로 추가
                </Text>
              </Button>
              <Button
                rippleContainerBorderRadius={25}
                rippleColor={'#ccc'}
                rippleDuration={300}
                rippleSize={400}
                rippleOpacity={0.45}
                onPress={() =>
                  setTimeout(() => {
                    setIsInputModalVisible(true);
                    setName(null);
                    setPhone(null);
                  }, 400)
                }>
                <Text
                  style={{fontSize: 14, color: styleGuide.palette.greyColor}}>
                  직접 입력
                </Text>
              </Button>
            </SpaceRow>
          </Section>
          <Section>
            <TitleText> 초대할 직원목록</TitleText>
            <GreyLine />
            <Refer>
              <ReferText>
                카카오톡을 통하여 직원에게 초대 메시지를 발송합니다.
              </ReferText>
              <ReferText>(카카오톡 미설치 시 문자 발송)</ReferText>
            </Refer>
            {choice?.map((data, index) => (
              <Touchable
                key={index}
                onPress={() => {
                  deleteBuffer(data.key);
                }}>
                <InviteEmployeeScreenCard
                  name={data.NAME}
                  phone={data.phone}
                  isSearched={false}
                />
              </Touchable>
            ))}
          </Section>
          <SubmitBtn
            text={'직원초대완료'}
            isRegisted={choice && choice.length !== 0}
            onPress={() => submitFn()}
          />
        </Container>
      </ScrollView>
      <Modal
        isVisible={isInputModalVisible}
        onRequestClose={() => {
          setIsInputModalVisible(false);
        }}
        onBackdropPress={() => {
          setIsInputModalVisible(false);
        }}
        style={{
          flex: 1,
          margin: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isModalToastVisible && (
          <ModalPopupArea>
            <ModalPopup>
              <ModalPopupText>직원을 목록에 추가하였습니다</ModalPopupText>
            </ModalPopup>
          </ModalPopupArea>
        )}
        <TextInput
          placeholder={'홍길동'}
          selectionColor={'white'}
          placeholderTextColor={styleGuide.palette.greyColor}
          onChangeText={(text) => setName(text)}
          value={name}
          maxLength={6}
        />
        {!name ? (
          <HelpText>초대할 직원의 연락처를 입력하세요.</HelpText>
        ) : (
          <HelpText>&nbsp;</HelpText>
        )}
        <TextInput
          placeholder={'01012345678'}
          selectionColor={'white'}
          placeholderTextColor={styleGuide.palette.greyColor}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          maxLength={11}
          keyboardType={'number-pad'}
          locale="ko"
        />
        {!regExp_ctn.test(phone) ? (
          <HelpText>올바른 휴대폰번호 11자리를 입력해주세요.</HelpText>
        ) : (
          <HelpText>&nbsp;</HelpText>
        )}
        {name && phone && regExp_ctn.test(phone) ? (
          <RoundBtn
            rippleColor={'#ccc'}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}
            isInSection={true}
            text={'초대할 직원목록에 추가'}
            onPress={() => addFn()}>
            <ModalWhiteText>초대할 직원목록에 추가</ModalWhiteText>
          </RoundBtn>
        ) : (
          <WhiteSpace />
        )}
      </Modal>
      <Modal
        isVisible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}>
        <ModalContainer>
          {loading ? (
            <LoadingContainer style={{justifyContent: 'center'}}>
              <LottieView
                style={{
                  marginTop: 20,
                  width: 150,
                  height: 150,
                  marginBottom: 40,
                }}
                source={require('../../../../assets/animations/loading.json')}
                loop
                autoPlay
              />
              <EmptyText>연락처 정보를 불러오는 중입니다. </EmptyText>
              <EmptyText>잠시만 기다려주세요.</EmptyText>
            </LoadingContainer>
          ) : (
            <>
              <SearchInputContainer>
                <SearchInput
                  placeholder="이름으로 검색 ex) 홍길동, ㅎㄱㄷ"
                  placeholderTextColor={styleGuide.palette.searchBarColor}
                  onChangeText={(text) => searchName(text)}
                  value={search}
                />
                <CloseIconContainer onPress={() => setSearch(null)}>
                  <CloseCircleOutlineIcon
                    color={styleGuide.palette.searchBarColor}
                    size={24}
                  />
                </CloseIconContainer>
              </SearchInputContainer>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}>
                {result
                  ?.filter((i) => i.phoneNumbers[0]?.number)
                  ?.sort((a, b) =>
                    a.familyName < b.familyName
                      ? -1
                      : a.familyName > b.familyName
                      ? 1
                      : 0,
                  )
                  .map((data, index) => {
                    if (data.phoneNumbers[0]?.number) {
                      return (
                        <Touchable
                          key={index}
                          onPress={() => {
                            toastFn();
                            onPress(data);
                          }}>
                          <InviteEmployeeScreenCard
                            name={data.familyName + data.givenName}
                            phone={
                              data.phoneNumbers[0]?.number
                                ? data.phoneNumbers[0].number.replace(/\D/g, '')
                                : 'No Number'
                            }
                            isSearched={true}
                          />
                        </Touchable>
                      );
                    } else {
                      return null;
                    }
                  })}
              </ScrollView>
              {isToastVisible && (
                <ModalPopupArea>
                  <ModalPopup>
                    <ModalPopupText>
                      직원을 목록에 추가하였습니다
                    </ModalPopupText>
                  </ModalPopup>
                </ModalPopupArea>
              )}
              <SubmitButton
                isBefore={choice?.length === 0}
                onPress={() => {
                  choice?.length === 0 ? {} : onPressSubmitButton();
                }}
                rippleColor={choice?.length === 0 ? 'white' : '#499c9b'}
                rippleDuration={600}
                rippleSize={1200}
                rippleOpacity={0.45}>
                <WhiteText>완료</WhiteText>
              </SubmitButton>
            </>
          )}
        </ModalContainer>
      </Modal>
    </BackGround>
  );
};
