import React from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

import utils from '~/constants/utils';
import {
  AddIcon,
  BackIcon,
  ReloadCircleIcon,
  CalendarIcon,
  ForwardIcon,
} from '~/constants/Icons';
import ChecklistShareMainScreenCard from './ChecklistShareMainScreenCard';
import styleGuide from '~/constants/styleGuide';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const SmallWhiteSpace = styled.View`
  height: 10px;
`;

const NewCntViewContainer = styled.View`
  margin-left: 10px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${styleGuide.palette.redColor};
`;

const NewCntViewText = styled.Text`
  font-size: ${styleGuide.fontSize.small}px;
  color: white;
  font-weight: ${styleGuide.fontWeight.bold};
`;

const DateArrowLeft = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: ${styleGuide.palette.arrowColor};
`;

const DateArrowRight = styled(DateArrowLeft)``;
const CalendarOpenBtn = styled(DateArrowLeft)`
  margin-right: 5px;
`;

const DateToday = styled(DateArrowLeft)`
  margin-left: 5px;
`;

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

const Date = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

const CalendarTitle = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${styleGuide.palette.primary};
`;

const CalendarTextBox = styled.View`
  padding: 10px 20px;
  background-color: white;
`;

const CalendarTitleText = styled.Text``;

const CalendarTitleBox = styled.View`
  align-items: flex-end;
`;

const CalendarTitleText1 = styled.Text`
  color: white;
  font-size: 18px;
`;

const CalendarTitleText2 = styled.Text`
  margin-left: 10px;
  color: white;
  font-size: 30px;
`;

const CheckPoint = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 10px;
  background-color: #000;
`;

const NewPoint = styled.View`
  margin-left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.redColor};
`;

const AddButtonContainer = styled.View`
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;

const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.tertiary};
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
  padding-left: 3px;
`;

const EmptyListContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const EmptyBox = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TextBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 5px;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
  text-align: center;
`;

export default ({
  refreshing,
  onRefresh,
  STORE,
  onDayPress,
  onMonthChange,
  onPressAddButtonFn,
  CHECKLIST_SHARE_MARKED,
  date,
  setDate,
  CHECKLIST_SHARE_DATA1,
  NEW_CNT1,
  CHECKLIST_SHARE_DATA2,
  NEW_CNT2,
  markingFn,
  fixControlFn,
  fetchData,
  MEMBER_SEQ,
  IS_MANAGER,
  isCalendarModalVisible,
  setIsCalendarModalVisible,
  gotoChecklistShareItem,
  loading,
  MANAGER_CALLED,
}) => {
  const Tab = createMaterialTopTabNavigator();

  const NewCntView = ({route}) => {
    if (route == '지시사항' && NEW_CNT1 !== 0) {
      return (
        <NewCntViewContainer>
          <NewCntViewText>{NEW_CNT1 < 10 ? NEW_CNT1 : '9+'}</NewCntViewText>
        </NewCntViewContainer>
      );
    } else if (route == '특이사항' && NEW_CNT2 !== 0) {
      return (
        <NewCntViewContainer>
          <NewCntViewText>{NEW_CNT2 < 10 ? NEW_CNT2 : '9+'}</NewCntViewText>
        </NewCntViewContainer>
      );
    } else {
      return null;
    }
  };

  const DateController = ({location}) => {
    const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    const tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    return (
      <Section>
        <Date>
          <DateArrowLeft
            onPress={() => {
              setDate(yesterday);
              fetchData(location, yesterday);
            }}>
            <BackIcon size={22} color={styleGuide.palette.arrowColor} />
          </DateArrowLeft>
          <DateToday
            onPress={() => {
              setDate(moment(date).format('YYYY-MM-DD'));
              fetchData(location, date);
            }}>
            <ReloadCircleIcon size={18} color={styleGuide.palette.arrowColor} />
          </DateToday>
          <DateTextArea>
            <DateText>{moment(date).format('YYYY년 M월 D일')}</DateText>
            <DateText
              style={{
                fontSize: styleGuide.fontSize.middle,
                fontWeight: '300',
              }}>
              {utils.renderWeekDay(moment(date).format('d'))}
            </DateText>
          </DateTextArea>
          <CalendarOpenBtn
            onPress={() => {
              markingFn(
                moment(date).format('YYYY'),
                moment(date).format('M'),
                location == 'firstRoute' ? 1 : 0,
              );
              setIsCalendarModalVisible(true);
            }}>
            <CalendarIcon size={18} color={styleGuide.palette.arrowColor} />
          </CalendarOpenBtn>
          <DateArrowRight
            onPress={() => {
              setDate(tomorrow);
              fetchData(location, tomorrow);
            }}>
            <ForwardIcon size={22} color={styleGuide.palette.arrowColor} />
          </DateArrowRight>
        </Date>
      </Section>
    );
  };

  const FirstRoute = () => (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh('firstRoute')}
          />
        }>
        <Container>
          <DateController location={'firstRoute'} />
          {loading ? (
            <>
              <LottieView
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 40,
                }}
                source={require('../../../../assets/animations/loading.json')}
                loop
                autoPlay
              />
              <EmptyText>지시사항 정보를 불러오는 중입니다. </EmptyText>
              <EmptyText>잠시만 기다려주세요.</EmptyText>
            </>
          ) : CHECKLIST_SHARE_DATA1?.basic?.length == 0 &&
            CHECKLIST_SHARE_DATA1?.favorite?.length == 0 ? (
            <EmptyList TITLE={'지시사항'} />
          ) : (
            <>
              {CHECKLIST_SHARE_DATA1?.favorite?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  TITLE={'지시사항'}
                  isOnFix={false}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, false, '지시사항')
                  }
                  gotoChecklistShareItem={gotoChecklistShareItem}
                />
              ))}
              {CHECKLIST_SHARE_DATA1?.basic?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  TITLE={'지시사항'}
                  isOnFix={true}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, true, '지시사항')
                  }
                  gotoChecklistShareItem={gotoChecklistShareItem}
                />
              ))}
            </>
          )}
        </Container>
      </ScrollView>
      {(STORE == '1' || IS_MANAGER === true) && (
        <AddButtonContainer>
          <AddButton onPress={() => onPressAddButtonFn('지시사항')}>
            <AddIcon />
          </AddButton>
        </AddButtonContainer>
      )}
    </BackGround>
  );

  const SecondRoute = () => (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh('secondRoute')}
          />
        }>
        <Container>
          <DateController location={'secondRoute'} />
          {loading ? (
            <>
              <LottieView
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 40,
                }}
                source={require('../../../../assets/animations/loading.json')}
                loop
                autoPlay
              />
              <EmptyText>특이사항 정보를 불러오는 중입니다. </EmptyText>
              <EmptyText>잠시만 기다려주세요.</EmptyText>
            </>
          ) : CHECKLIST_SHARE_DATA2?.basic?.length == 0 &&
            CHECKLIST_SHARE_DATA2?.favorite?.length == 0 ? (
            <EmptyList TITLE={'특이사항'} />
          ) : (
            <>
              {CHECKLIST_SHARE_DATA2?.favorite?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  TITLE={'특이사항'}
                  isOnFix={false}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, false, '특이사항')
                  }
                  gotoChecklistShareItem={gotoChecklistShareItem}
                />
              ))}
              {CHECKLIST_SHARE_DATA2?.basic?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  TITLE={'특이사항'}
                  isOnFix={true}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, true, '특이사항')
                  }
                  gotoChecklistShareItem={gotoChecklistShareItem}
                />
              ))}
            </>
          )}
        </Container>
      </ScrollView>
      {STORE == '0' && (
        <AddButtonContainer>
          <AddButton onPress={() => onPressAddButtonFn('특이사항')}>
            <AddIcon />
          </AddButton>
        </AddButtonContainer>
      )}
    </BackGround>
  );

  const EmptyList = ({TITLE}) => (
    <EmptyListContainer>
      {STORE === '0' && TITLE == '특이사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 201,
              marginBottom: 20,
              height: 284,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../../../assets/images/emptyImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TextBox>
            <Column>
              <EmptyText>특이사항을 등록해주세요.</EmptyText>
              <EmptyText>
                직원이 사업장 운영현황을 사업주에게 전달합니다.
              </EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
      {STORE === '0' && !IS_MANAGER && TITLE == '지시사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 201,
              marginBottom: 20,
              height: 284,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../../../assets/images/emptyImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TextBox>
            <Column>
              <EmptyText>지시사항이 없습니다.</EmptyText>
              <EmptyText>
                사업주 및 {MANAGER_CALLED}가 직원들에게 전달하는 내용입니다.
              </EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
      {STORE === '1' && TITLE == '특이사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 201,
              marginBottom: 20,
              height: 284,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../../../assets/images/emptyImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TextBox>
            <Column>
              <EmptyText>특이사항이 없습니다.</EmptyText>
              <EmptyText>
                직원이 사업장 운영현황을 사업주에게 전달합니다.
              </EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
      {(STORE === '1' || IS_MANAGER) && TITLE == '지시사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 201,
              marginBottom: 20,
              height: 284,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../../../assets/images/emptyImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TextBox>
            <Column>
              <EmptyText>지시사항을 등록해주세요.</EmptyText>
              <EmptyText>
                사업주 및 {MANAGER_CALLED}가 직원들에게 전달하는 내용입니다.
              </EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
    </EmptyListContainer>
  );

  return (
    <>
      <Tab.Navigator
        initialRouteName={STORE === '1' ? '특이사항' : '지시사항'}
        tabBarOptions={{
          labelStyle: {fontSize: 14},
          indicatorStyle: {
            height: 4,
            borderRadius: 10,
            backgroundColor: styleGuide.palette.primary,
          },
          style: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: () => (
              <Date>
                <CalendarTitleText>지시사항</CalendarTitleText>
                <NewCntView route={'지시사항'} />
              </Date>
            ),
          }}
          name="지시사항"
          component={FirstRoute}
        />
        <Tab.Screen
          options={{
            tabBarLabel: () => (
              <Date>
                <CalendarTitleText>특이사항</CalendarTitleText>
                <NewCntView route={'특이사항'} />
              </Date>
            ),
          }}
          name="특이사항"
          component={SecondRoute}
        />
      </Tab.Navigator>
      <Modal
        isVisible={isCalendarModalVisible}
        onRequestClose={() => {
          setIsCalendarModalVisible(false);
          setDate(date);
        }}
        onBackdropPress={() => {
          setIsCalendarModalVisible(false);
          setDate(date);
        }}>
        <CalendarTitle>
          <CalendarTextBox>
            <RowSpace>
              <CalendarTitleText>등록 게시글</CalendarTitleText>
              <NewPoint
                style={{
                  backgroundColor: 'transparent',
                }}>
                <CalendarTitleText>1</CalendarTitleText>
                <CheckPoint />
              </NewPoint>
            </RowSpace>
            <SmallWhiteSpace />
            <RowSpace>
              <CalendarTitleText>미열람 게시글</CalendarTitleText>
              <NewPoint>
                <CalendarTitleText style={{color: 'white'}}>
                  1
                </CalendarTitleText>
              </NewPoint>
            </RowSpace>
          </CalendarTextBox>
          <CalendarTitleBox>
            <CalendarTitleText1>
              {moment(date).format('YYYY')}년
            </CalendarTitleText1>
            <CalendarTitleText2>
              {moment(date).format('M')}월 {moment(date).format('D')}일
            </CalendarTitleText2>
          </CalendarTitleBox>
        </CalendarTitle>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 10,
          }}
          theme={{
            arrowColor: '#000',
            todayTextColor: styleGuide.palette.primary,
          }}
          markingType={'multi-dot'}
          hideExtraDays={true}
          monthFormat={'M월'}
          current={date}
          markedDates={CHECKLIST_SHARE_MARKED}
          onDayPress={(date) => onDayPress(date)}
          onMonthChange={(date) => onMonthChange(date)}
        />
      </Modal>
    </>
  );
};
