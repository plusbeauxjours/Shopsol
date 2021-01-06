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
  position: absolute;
  top: ${utils.isAndroid ? 0 : -3};
  right: -25px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
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
  border-color: ${styleGuide.palette.secondary};
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
  background-color: red;
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
  background-color: ${styleGuide.palette.primary};
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
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
}) => {
  const Tab = createMaterialTopTabNavigator();

  const NewCntView = ({route}) => {
    if (route.title == '지시사항' && NEW_CNT1 !== 0) {
      return (
        <NewCntViewContainer>
          <NewCntViewText>{NEW_CNT1 < 10 ? NEW_CNT1 : '9+'}</NewCntViewText>
        </NewCntViewContainer>
      );
    } else if (route.title == '특이사항' && NEW_CNT2 !== 0) {
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
            <BackIcon size={22} color={styleGuide.palette.secondary} />
          </DateArrowLeft>
          <DateToday
            onPress={() => {
              setDate(moment(date).format('YYYY-MM-DD'));
              fetchData(location, date);
            }}>
            <ReloadCircleIcon size={18} color={styleGuide.palette.secondary} />
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
              markingFn(moment(date).format('YYYY'), moment(date).format('M'));
              setIsCalendarModalVisible(true);
            }}>
            <CalendarIcon size={18} color={styleGuide.palette.secondary} />
          </CalendarOpenBtn>
          <DateArrowRight
            onPress={() => {
              setDate(tomorrow);
              fetchData(location, tomorrow);
            }}>
            <ForwardIcon size={22} color={styleGuide.palette.secondary} />
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
          {CHECKLIST_SHARE_DATA1?.basic?.length == 0 &&
          CHECKLIST_SHARE_DATA1?.favorite?.length == 0 ? (
            <EmptyList TITLE={'지시사항'} />
          ) : (
            <>
              {CHECKLIST_SHARE_DATA1?.favorite?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'지시사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'unFix', '지시사항')
                  }
                  gotoChecklistShareItem={gotoChecklistShareItem}
                />
              ))}
              {CHECKLIST_SHARE_DATA1?.basic?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'지시사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'fix', '지시사항')
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
          {CHECKLIST_SHARE_DATA2?.basic?.length == 0 &&
          CHECKLIST_SHARE_DATA2?.favorite?.length == 0 ? (
            <EmptyList TITLE={'특이사항'} />
          ) : (
            <>
              {CHECKLIST_SHARE_DATA2?.favorite?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'특이사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'unFix', '특이사항')
                  }
                  gotoChecklistShareItem={gotoChecklistShareItem}
                />
              ))}
              {CHECKLIST_SHARE_DATA2?.basic?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'특이사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'fix', '특이사항')
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
              width: 377,
              height: 535,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../../../assets/images/emptyImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TextBox>
            <Column>
              <EmptyText>특이사항을 등록해주세요.</EmptyText>
              <EmptyText>직원이 점포 운영현황을 점장에게 전달합니다.</EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
      {STORE === '0' && !IS_MANAGER && TITLE == '지시사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 377,
              height: 535,
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
                점장 및 매니저가 직원들에게 전달하는 내용입니다.
              </EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
      {STORE === '1' && TITLE == '특이사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 377,
              height: 535,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../../../assets/images/emptyImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TextBox>
            <Column>
              <EmptyText>특이사항이 없습니다.</EmptyText>
              <EmptyText>직원이 점포 운영현황을 점장에게 전달합니다.</EmptyText>
            </Column>
          </TextBox>
        </EmptyBox>
      )}
      {(STORE === '1' || IS_MANAGER) && TITLE == '지시사항' && (
        <EmptyBox>
          <FastImage
            style={{
              width: 377,
              height: 535,
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
                점장 및 매니저가 직원들에게 전달하는 내용입니다.
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
        <Tab.Screen name="지시사항" component={FirstRoute} />
        <Tab.Screen name="특이사항" component={SecondRoute} />
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
              <CalendarTitleText>게시글 표시</CalendarTitleText>
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
              <CalendarTitleText>읽지않은 게시글</CalendarTitleText>
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
