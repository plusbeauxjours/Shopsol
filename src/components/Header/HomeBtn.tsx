import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';

import {HomeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.small}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

export default ({depth, from = ''}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const confirmModal = (content) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      okCallback: () => {
        navigation.pop(depth);
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
          ? confirmModal('입력하였던 정보가 없어집니다. \n계속 하시겠습니까?')
          : navigation.pop(depth)
      }>
      <HomeIcon size={22} color="white" />
      <Text>HOME</Text>
    </Touchable>
  );
};
