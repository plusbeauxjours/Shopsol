import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';

import {AddCircleIcon, RemoveCircleIcon, HomeIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import api from '~/constants/LoggedInApi';
import {toggleIS_BIG_FONT} from '~/redux/checklistshareSlice';

const Container = styled.View`
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  height: 40px;
`;

const Text = styled.Text`
  color: white;
  font-size: ${styleGuide.fontSize.small}px;
  font-weight: ${styleGuide.fontWeight.bold};
`;

// 업무일지의 텍스트 크기 확대, 축소를 위한 버튼(feat.대표님)
export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {IS_BIG_FONT} = useSelector(
    (state: any) => state.checklistshareReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const onRefresh = async () => {
    // popToTop이 아니면 슬라이드가 역으로 (오른쪽에서 왼쪽으로) 발생하기 때문에 popToTop이 가장 적당하였음(feat.윤혜정)
    navigation.popToTop();
    await api.getStoreInfo({
      STORE,
      STORE_SEQ,
    });
  };

  return (
    <Container>
      <Touchable onPress={() => dispatch(toggleIS_BIG_FONT())}>
        {IS_BIG_FONT ? (
          <RemoveCircleIcon size={23} color={'white'} />
        ) : (
          <AddCircleIcon size={23} color={'white'} />
        )}
        {IS_BIG_FONT ? <Text>축소</Text> : <Text>확대</Text>}
      </Touchable>
      <Touchable onPress={() => onRefresh()}>
        <HomeIcon size={22} color="white" />
        <Text>HOME</Text>
      </Touchable>
    </Container>
  );
};
