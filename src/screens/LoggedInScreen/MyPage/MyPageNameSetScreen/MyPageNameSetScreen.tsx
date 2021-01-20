import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setMEMBER_NAME} from '~/redux/userSlice';
import api from '~/constants/LoggedInApi';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import styleGuide from '~/constants/styleGuide';

interface IsError {
  isError: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary}; ;
`;

const Container = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: ${styleGuide.palette.greyColor};
  font-weight: ${styleGuide.fontWeight.bold};
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  padding: 5px 0;
  margin-left: 5px;
  font-size: 14px;
  color: black;
`;

const GreyText = styled.Text<IsError>`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${(props) => (props.isError ? 'red' : styleGuide.palette.greyColor)};
  margin-top: 5px;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {MEMBER_SEQ, MOBILE_NO, MEMBER_NAME, GENDER} = useSelector(
    (state: any) => state.userReducer,
  );

  const [NAME, setNAME] = useState<string>(MEMBER_NAME || '');

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const submitFn = async () => {
    if (NAME === '') {
      return alert('이를을 기입해주세요.');
    }
    if (NAME.length > 6) {
      return alertModal('이름은 6자 이하로 입력해주세요.');
    }
    try {
      alertModal('이름이 변경되었습니다.');
      navigation.goBack();
      dispatch(setMEMBER_NAME(NAME));
      const {data} = await api.changeName({
        MobileNo: MOBILE_NO,
        MEMBER_SEQ,
        NAME,
        GENDER,
      });
      if (data.message !== 'SUCCESS') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BackGround>
      <Container>
        <Section>
          <TitleText>이름</TitleText>
          <TextInput
            placeholder={'변경하실 이름을 입력해주세요.'}
            selectionColor={styleGuide.palette.greyColor}
            placeholderTextColor={'#CCCCCC'}
            onChangeText={(text) => setNAME(text)}
            value={NAME}
            maxLength={10}
          />
          <InputLine isBefore={NAME === '' ? true : false} />
          <GreyText isError={NAME?.length > 6}>
            * 이름은 6자 이하로 입력해주세요.
          </GreyText>
        </Section>
        <SubmitBtn
          onPress={() => submitFn()}
          text={'수정하기'}
          isRegisted={NAME !== '' && MEMBER_NAME !== NAME && NAME?.length < 6}
        />
      </Container>
    </BackGround>
  );
};
