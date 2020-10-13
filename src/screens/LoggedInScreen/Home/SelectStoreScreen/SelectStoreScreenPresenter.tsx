import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';

import SelectStoreCard from './SelectStoreCard';
import {AddCircleIcon} from '~/constants/Icons';

interface IIsStore {
  isStore?: boolean;
}

const BackGround = styled.View<IIsStore>`
  flex: 1;
  background-color: #f6f6f6;
  padding-top: ${(props) => (props.isStore ? 60 : 0)};
`;

const ScrollView = styled.ScrollView``;

const EmptyListWrapper = styled.View`
  margin-top: 100px;
  padding: ${hp('5%')}px ${wp('5%')}px;
  width: ${wp('100%') - 40}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
`;

const EmptyListText = styled.Text`
  color: #999;
`;

const EmptyListTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const AddStoreButtonText = styled.Text`
  color: #e85356;
  font-weight: bold;
`;

const WhiteSpace = styled.View`
  height: 50px;
`;

const AddStoreButton = styled(Ripple)`
  margin-top: 30px;
  z-index: 3;
  width: ${wp('100%') - 36}px;
  height: 60px;
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 30px;
  background-color: white;
  border-width: 2px;
  border-color: #e85356;
  align-self: center;
  shadow-opacity: 0.9;
  shadow-radius: 5px;
  shadow-color: grey;
  shadow-offset: 6px 6px;
  elevation: 8;
`;

export default ({
  STORE,
  STORELIST_DATA,
  refreshing,
  onRefresh,
  gotoAddStore,
  gotoHomeScreen,
}) => {
  const StoreList = () => {
    if (STORELIST_DATA && STORELIST_DATA.length !== 0) {
      return STORELIST_DATA?.map((data, index) => (
        <SelectStoreCard
          key={index}
          data={data}
          name={data.NAME}
          address1={data.ADDR1}
          address2={data.ADDR2}
          employee={data.emplist}
          STORE={STORE}
          TYPE={data.TYPE}
          MANAGER={data.IS_MANAGER == 1 ? '[점장]' : '[스태프]'}
          workinglist={data.workinglist}
          gotoHomeScreen={gotoHomeScreen}
        />
      ));
    } else {
      if (STORE == '1') {
        return (
          <EmptyListWrapper>
            <EmptyListText>사업장을 등록하시면 입력하신 주소로</EmptyListText>
            <EmptyListText>
              출퇴근이 가능한 QR키트를 송부해 드립니다.
            </EmptyListText>
            <EmptyListText>(영업일 기준 2~3일 소요)</EmptyListText>
          </EmptyListWrapper>
        );
      } else {
        return (
          <EmptyListWrapper>
            <EmptyListTitle>합류된 사업장이 없습니다!</EmptyListTitle>
            <EmptyListText>
              점장 또는 매니저가 직원을 초대할 수 있습니다.
            </EmptyListText>
            <EmptyListText>
              초대 후 재로그인하여 직원이 사업장을 확인하게 되면
            </EmptyListText>
            <EmptyListText>
              관리자가 직원합류를 완료할 수 있습니다.
            </EmptyListText>
          </EmptyListWrapper>
        );
      }
    }
  };
  return (
    <BackGround isStore={STORE == '1'}>
      {STORE == '1' && (
        <AddStoreButton
          onPress={() => gotoAddStore()}
          rippleColor={'#e39a9c'}
          rippleDuration={600}
          rippleSize={1200}
          rippleContainerBorderRadius={30}
          rippleOpacity={0.45}>
          <AddStoreButtonText>사업장 등록하기</AddStoreButtonText>
          <AddCircleIcon />
        </AddStoreButton>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={20}
          />
        }
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        {STORE == '1' && <WhiteSpace />}
        <StoreList />
      </ScrollView>
    </BackGround>
  );
};
