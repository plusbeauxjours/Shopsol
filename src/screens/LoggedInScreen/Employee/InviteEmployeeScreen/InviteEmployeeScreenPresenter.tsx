import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';

import InviteEmployeeScreenCard from './InviteEmployeeScreenCard';
import {PersonAddIcon, HelpCircleIcon, SearchIcon} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import utils from '~/constants/utils';

interface IIsBefore {
  isBefore: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 20px;
  background-color: #f6f6f6;
`;

const Line = styled.View`
  height: 1px;
  margin-bottom: 20px;
  background-color: #666;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TextContainer = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: #e85356;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  padding: 15px 0;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const Touchable = styled.TouchableOpacity``;

const Refer = styled.View`
  margin: 12px 0;
  justify-content: center;
`;

const ReferText = styled.Text`
  font-size: 13px;
  color: #b5b5b5;
`;

const Contact = styled.TouchableOpacity`
  padding: 15px 0;
  width: 100%;
  border-radius: 30px;
  border-width: 1px;
  border-color: #e85356;
  align-items: center;
  justify-content: center;
`;

const ContactIconContainer = styled(Contact)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: 5px;
`;

const Box = styled.View`
  padding-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const BoxText = styled.Text`
  font-size: 15px;
  color: #7e7c7c;
`;

const NameContainer = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-color: #e2e2e2;
  border-width: 1px;
  background-color: white;
  margin-right: 10px;
`;

const PhoneContainer = styled(NameContainer)`
  flex: 2.5;
  width: 120px;
  margin-right: 0;
`;

const ModalContainer = styled.View`
  height: ${hp('50%')};
  background-color: white;
`;

const SearchBox = styled.View`
  padding: 20px;
  padding-bottom: 2px;
  position: relative;
`;

const SearchIconContainer = styled.View`
  position: absolute;
  top: 32px;
  right: 40px;
`;

const SearchInput = styled.TextInput`
  border-width: 1px;
  border-color: #e85356;
  border-radius: 30px;
  padding-left: 20px;
  padding-top: 2px;
  color: #333;
  height: 50px;
  background-color: white;
`;

const SubmitButton = styled(Ripple)<IIsBefore>`
  margin-top: 2px;
  width: ${wp('100%')}px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isBefore ? '#cccccc' : '#e85356')};
`;

const WhiteText = styled.Text`
  font-size: 16px;
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
  background-color: ${utils.isAndroid ? '#888' : 'rgba(0,0,0,0.7)'};
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
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <TextContainer>
              <TitleText>(STEP1)</TitleText>
              <TitleText style={{color: '#000'}}> 직원 초대하기</TitleText>
            </TextContainer>
            <Box>
              <Row
                onPress={() => {
                  explainModal(
                    '',
                    '방법1, 방법2 중 편한 방법을 선택하여 직원을 초대해 보세요.\n\n[추가하기] 버튼을 눌러 여러명의 직원을 한번에 초대할 수 있습니다.',
                  );
                }}>
                <BoxText>(방법1) 연락처로 추가하기</BoxText>
                <HelpCircleIcon />
              </Row>
              <ContactIconContainer onPress={() => getContactsFn()}>
                <PersonAddIcon />
              </ContactIconContainer>
            </Box>
            <Line />
            <TextContainer>
              <BoxText>(방법2) 직접 입력해서 추가하기</BoxText>
            </TextContainer>
            <Box>
              <NameContainer>
                <TextInput
                  placeholder={'홍길동'}
                  selectionColor={'#999'}
                  placeholderTextColor={'#CCCCCC'}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  maxLength={6}
                />
              </NameContainer>
              <PhoneContainer>
                <TextInput
                  placeholder={'01012345678'}
                  selectionColor={'#999'}
                  placeholderTextColor={'#CCCCCC'}
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  maxLength={11}
                  keyboardType={'number-pad'}
                />
              </PhoneContainer>
            </Box>
            <RoundBtn
              isInSection={true}
              text={'초대할 직원목록에 추가'}
              onPress={() => addFn()}
              isRegisted={name && phone}
            />
          </Section>
          <Section>
            <TextContainer>
              <TitleText>(STEP2)</TitleText>
              <TitleText style={{color: '#000'}}> 초대할 직원목록</TitleText>
            </TextContainer>
            <Refer>
              <ReferText>
                &nbsp; * 카카오톡을 통하여 직원에게 초대 메시지를 발송합니다.
                (카카오톡 미설치 시 문자 발송)
              </ReferText>
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
        isVisible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}>
        <ModalContainer>
          <SearchBox>
            <SearchInput
              placeholder="이름으로 검색 ex) 홍길동, ㅎㄱㄷ"
              placeholderTextColor={'#999'}
              onChangeText={(text) => searchName(text)}
              value={search}
            />
            <SearchIconContainer>
              <SearchIcon />
            </SearchIconContainer>
          </SearchBox>
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
                <ModalPopupText>직원을 목록에 추가하였습니다</ModalPopupText>
              </ModalPopup>
            </ModalPopupArea>
          )}
          <SubmitButton
            isBefore={choice?.length === 0}
            onPress={() => {
              choice?.length === 0 ? {} : onPressSubmitButton();
            }}
            rippleColor={choice?.length === 0 ? '#fff' : '#e39a9c'}
            rippleDuration={600}
            rippleSize={1200}
            rippleOpacity={0.45}>
            <WhiteText>완료</WhiteText>
          </SubmitButton>
        </ModalContainer>
      </Modal>
    </BackGround>
  );
};
