import React, {useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import DatePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  updateSHELFLIFE_DATA,
  getSHELFLIFE_DATA,
  removeSHELFLIFE_DATA,
} from '~/redux/shelflifeSlice';

interface ITextInput {
  isBefore: boolean;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const TextInput = styled.TextInput<ITextInput>`
  border-color: ${(props) => (props.isBefore ? '#ddd' : '#e85356')};
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-width: 1px;
  width: ${wp('50%')}px;
  min-height: 40px;
`;
const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Bold = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const DeleteBtn = styled.TouchableOpacity`
  padding: 10px;
  border-width: 1px;
  border-color: #b91c1b;
`;

const DeleteBtnText = styled.Text`
  color: #b91c1b;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 2px;
  background-color: #ddd;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InputItem = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputItemText = styled.Text``;

const DateBox = styled.TouchableOpacity<ITextInput>`
  padding: 3px 10px;
  border-color: ${(props) => (props.isBefore ? '#ddd' : '#e85356')};
  border-width: 1px;
  width: ${wp('50%')}px;
  justify-content: center;
  min-height: 40px;
`;

const DateText = styled.Text``;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shelfLife_SEQ = params?.shelfLife_SEQ || '';
  const [shelfLifeName, setShelfLifeName] = useState<string>(
    params?.shelfLifeName || '',
  );
  const [shelfLifeMemo, setShelfLifeMemo] = useState<string>(
    params?.shelfLifeMemo || '',
  );
  const [shelfLifeDate, setShelfLifeDate] = useState<string>(
    params?.shelfLifeDate || '',
  );
  const [shelfLifeDateModal, setShelfLifeDateModal] = useState<boolean>(false);

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteModal = (title, text) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      okCallback: () => {
        deleteShelfLife();
      },
      okButtonText: '삭제',
      cancelButtonText: '취소',
      warning: 'yes',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteShelfLife = async () => {
    try {
      navigation.goBack();
      dispatch(removeSHELFLIFE_DATA({shelfLife_SEQ, shelfLifeDate}));
      alertModal('', '상품을 삭제하였습니다.');
      const {data} = await api.deleteShelfLifeData({shelfLife_SEQ});
      if (data.result == '0') {
        alertModal('', '연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    if (shelfLifeName == '') {
      alertModal('', '수정할 상품명을 입력해주세요.');
    }
    try {
      navigation.goBack();
      alertModal('', '수정이 완료되었습니다.');
      dispatch(
        updateSHELFLIFE_DATA({
          shelfLife_SEQ,
          shelfLifeName,
          prevShelfLifeDate: params?.shelfLifeDate,
          shelfLifeDate,
          shelfLifeMemo,
        }),
      );
      const {data} = await api.updateShelfLifeData({
        shelfLife_SEQ,
        shelfLifeNAME: shelfLifeName,
        shelfLifeDATE: shelfLifeDate,
        shelfLifeMEMO: shelfLifeMemo,
      });
      if (data.result == '0') {
        alertModal('', '연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <Title>
              <Bold>상품정보</Bold>
              <DeleteBtn
                onPress={() =>
                  deleteModal('', '등록하신 상품을 삭제하시겠습니까?')
                }>
                <DeleteBtnText style={{color: '#B91C1B'}}>삭제</DeleteBtnText>
              </DeleteBtn>
            </Title>
            <Line />
            <InputItem>
              <Row>
                <InputItemText>상품명 </InputItemText>
                <DeleteBtnText>*</DeleteBtnText>
              </Row>
              <TextInput
                isBefore={shelfLifeName == ''}
                placeholder="상품명"
                selectionColor={'#999'}
                placeholderTextColor="#CCC"
                onChangeText={(text) => {
                  setShelfLifeName(text);
                }}
                value={shelfLifeName}
                maxLength={15}
              />
            </InputItem>
            <InputItem>
              <Row>
                <InputItemText>기한 </InputItemText>
                <DeleteBtnText>*</DeleteBtnText>
              </Row>
              <DateBox
                onPress={() => setShelfLifeDateModal(true)}
                isBefore={shelfLifeDate == ''}>
                <DateText>
                  {moment(shelfLifeDate).format('YYYY.MM.DD')}
                </DateText>
              </DateBox>
            </InputItem>
            <InputItem>
              <InputItemText>메모</InputItemText>
              <TextInput
                isBefore={shelfLifeMemo == ''}
                placeholder=""
                selectionColor={'#999'}
                placeholderTextColor="#CCC"
                onChangeText={(text) => setShelfLifeMemo(text)}
                value={shelfLifeMemo}
                multiline={true}
              />
            </InputItem>
          </Section>
          <SubmitBtn
            text={'수정완료'}
            onPress={() => submit()}
            isRegisted={true}
          />
        </Container>
        <DatePickerModal
          headerTextIOS={'날짜를 선택하세요.'}
          cancelTextIOS={'취소'}
          confirmTextIOS={'선택'}
          isVisible={shelfLifeDateModal}
          mode="date"
          minimumDate={moment().toDate()}
          locale="ko_KRus_EN"
          onConfirm={(date) => {
            setShelfLifeDate(moment(date).format('YYYY-MM-DD'));
            setShelfLifeDateModal(false);
          }}
          onCancel={() => setShelfLifeDateModal(false)}
          display="default"
        />
      </ScrollView>
    </BackGround>
  );
};
