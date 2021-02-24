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

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {IS_BIG_FONT} = useSelector(
    (state: any) => state.checklistshareReducer,
  );
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const onRefresh = async () => {
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
