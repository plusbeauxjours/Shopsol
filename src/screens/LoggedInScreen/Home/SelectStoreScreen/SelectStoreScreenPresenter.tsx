import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';

import SelectStoreCard from './SelectStoreCard';
import {AddCircleIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
interface IIsStore {
  isStore?: boolean;
}

const BackGround = styled.View<IIsStore>`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
  padding-top: ${(props) => (props.isStore ? 60 : 0)}px;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  width: 100%;
  padding-bottom: 40px;
  align-items: center;
`;

const EmptyBox = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TextBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.View`
  align-items: center;
  flex-direction: column;
`;

const EmptyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;

const AddStoreButtonText = styled.Text`
  color: ${styleGuide.palette.primary};
  font-weight: ${styleGuide.fontWeight.bold};
`;

const WhiteSpace = styled.View`
  height: 50px;
`;

const SmallWhiteSpace = styled.View`
  height: 20px;
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
  border-color: ${styleGuide.palette.primary};
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
  visible,
}) => {
  if (visible) {
    return null;
  } else {
    return (
      <BackGround isStore={STORE == '1'}>
        {STORE == '1' && (
          <AddStoreButton
            onPress={() => gotoAddStore()}
            rippleColor={styleGuide.palette.rippleColor}
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
          <Container>
            {STORE == '1' ? <WhiteSpace /> : <SmallWhiteSpace />}
            {STORELIST_DATA?.length > 0 ? (
              STORELIST_DATA?.map((data, index) => (
                <SelectStoreCard
                  key={index}
                  data={data}
                  name={data.NAME}
                  address1={data.ADDR1}
                  address2={data.ADDR2}
                  employee={data.emplist}
                  STORE={STORE}
                  TYPE={data.TYPE}
                  MANAGER={data.IS_MANAGER == 1 ? '[매니저]' : '[직원]'}
                  workinglist={data.workinglist}
                  gotoHomeScreen={gotoHomeScreen}
                />
              ))
            ) : STORE == '1' ? (
              <EmptyBox>
                <FastImage
                  style={{
                    width: 201,
                    marginVertical: 20,
                    height: 284,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50,
                  }}
                  source={require('../../../../assets/images/emptyImg.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <TextBox>
                  <Column>
                    <EmptyText>등록된 사업장이 없습니다!</EmptyText>
                    <EmptyText>사업장을 등록하시면 입력하신 주소로</EmptyText>
                    <EmptyText>
                      출퇴근이 가능한 QR키트를 송부해 드립니다.
                    </EmptyText>
                    <EmptyText>(영업일 기준 2~3일 소요)</EmptyText>
                  </Column>
                </TextBox>
              </EmptyBox>
            ) : (
              <EmptyBox>
                <FastImage
                  style={{
                    width: 201,
                    marginVertical: 20,
                    height: 284,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50,
                  }}
                  source={require('../../../../assets/images/emptyImg.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <TextBox>
                  <Column>
                    <EmptyText>합류된 사업장이 없습니다!</EmptyText>
                    <EmptyText>
                      사업주 또는 매니저(관리자)가 직원을 초대할 수 있습니다.
                    </EmptyText>
                    <EmptyText>
                      초대 후 재로그인하여 직원이 사업장을 확인하게 되면
                    </EmptyText>
                    <EmptyText>
                      관리자가 직원합류를 완료할 수 있습니다.
                    </EmptyText>
                  </Column>
                </TextBox>
              </EmptyBox>
            )}
          </Container>
        </ScrollView>
      </BackGround>
    );
  }
};
