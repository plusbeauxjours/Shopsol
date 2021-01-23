import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';

import {HomeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.small}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

export default ({from = ''}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const onRefresh = async () => {
    navigation.popToTop();
    await api.getStoreInfo({
      STORE,
      MEMBER_SEQ,
      STORE_SEQ,
    });
  };

  const confirmModal = (content) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      okCallback: () => {
        onRefresh();
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
        from == 'SetEmployeeInfoScreen' || from == 'EmployeeScheduleInfoScreen'
          ? confirmModal(
              '입력하였던 정보가 없어집니다. \n(기존 정보는 유지됩니다.) \n계속 하시겠습니까?',
            )
          : onRefresh()
      }>
      <HomeIcon size={22} color="white" />
      <Text>HOME</Text>
    </Touchable>
  );
};
