import React from 'react';
import styled from 'styled-components/native';
import {BackIcon} from '~/constants/Icons';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Touchable = styled.TouchableOpacity``;

// 직원 정보를 입력하다가 뒤로가기를 탭하였을 때,
// 입력하던 정보는 사라지고, 기존 정보는 유지됨을 알려주는 팝업이 뜨는 백버튼(feat.이사님)
const ConfirmBackBtn: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const confirmModal = (content) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      okCallback: () => {
        navigation.goBack();
      },
      okButtonText: '확인',
      cancelButtonText: '취소',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  return (
    <Touchable
      onPress={() =>
        confirmModal(
          '입력하였던 정보가 없어집니다. \n(기존 정보는 유지됩니다.) \n계속 하시겠습니까?',
        )
      }>
      <BackIcon size={28} color={'white'} />
    </Touchable>
  );
};

export default ConfirmBackBtn;
