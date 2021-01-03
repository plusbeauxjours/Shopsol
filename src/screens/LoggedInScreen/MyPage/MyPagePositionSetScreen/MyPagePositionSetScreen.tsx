import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setSTORE} from '~/redux/userSlice';
import api from '~/constants/LoggedInApi';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {RadioBtnOnIcon, RadioBtnOffIcon} from '~/constants/Icons';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import styleGuide from '~/constants/styleGuide';

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
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TypeCheckCase = styled.View`
  width: 200px;
  flex-direction: row;
  justify-content: space-around;
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 14px;
`;

const View = styled.View``;

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
  const {MEMBER_SEQ, MOBILE_NO, STORE} = useSelector(
    (state: any) => state.userReducer,
  );
  const [positionTypeCheck, setPositionTypeCheck] = useState<
    [boolean, boolean]
  >(STORE == '0' ? [true, false] : [false, true]);

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
    if (positionTypeCheck.indexOf(true) === -1) {
      return alert('유형을 선택해주세요.');
    }
    try {
      alertModal('전환이 완료되었습니다.');
      navigation.goBack();
      dispatch(setSTORE(positionTypeCheck.indexOf(true)));
      dispatch(getSTORELIST_DATA());
      const {data} = await api.changeStore({
        MobileNo: MOBILE_NO,
        MEMBER_SEQ,
        STORE: positionTypeCheck.indexOf(true),
      });
      if (data.message !== 'SUCCESS') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const positionType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(positionTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setPositionTypeCheck(value);
        }}>
        {positionTypeCheck[selection] ? (
          <RadioBtnOnIcon size={22} />
        ) : (
          <RadioBtnOffIcon size={22} />
        )}
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  return (
    <BackGround>
      <Container>
        <Section>
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <TitleText>가입유형</TitleText>
            <TypeCheckCase>
              <View>{positionType(1, '점장')}</View>
              <View>{positionType(0, '직원')}</View>
            </TypeCheckCase>
          </Row>
        </Section>
        <SubmitBtn
          onPress={() => submitFn()}
          text={'수정하기'}
          isRegisted={positionTypeCheck.indexOf(true) !== -1}
        />
      </Container>
    </BackGround>
  );
};
