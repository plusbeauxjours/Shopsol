import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setMEMBER_NAME} from '~/redux/userSlice';
import api from '~/constants/LoggedInApi';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';

interface IsError {
  isError: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6; ;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
`;

const NameText = styled.Text`
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  padding: 5px 0;
  margin-left: 5px;
  font-size: 15px;
  color: black;
`;

const GreyText = styled.Text<IsError>`
  font-size: 12px;
  color: ${(props) => (props.isError ? 'red' : '#aaa')};
  margin-top: 5px;
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
      return alert('[에러] 이를을 기입해주세요.');
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
      <WhiteSpace />
      <Container>
        <NameText>이름</NameText>
        <TextInput
          placeholder={'변경하실 이름을 입력해주세요.'}
          selectionColor={'#999'}
          placeholderTextColor={'#CCCCCC'}
          onChangeText={(text) => {
            setNAME(text);
          }}
          value={NAME}
          maxLength={10}
        />
        <InputLine isBefore={NAME === '' ? true : false} />
        <GreyText isError={NAME?.length > 6}>
          * 이름은 6자 이하로 입력해주세요.
        </GreyText>
        <SubmitBtn
          onPress={() => submitFn()}
          text={'수정하기'}
          isRegisted={NAME !== '' && NAME?.length < 6}
        />
      </Container>
    </BackGround>
  );
};
