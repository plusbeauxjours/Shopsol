import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';

import {
  EllipseIcon,
  ForwardIcon,
  BackIcon,
  ReloadCircleIcon,
  CalendarIcon,
  CheckMarkIcon,
} from '~/constants/Icons';
import moment from 'moment';
import ChecklistItemsScreenCard from './ChecklistItemsScreenCard';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

import {AddIcon, CloseCircleOutlineIcon} from '~/constants/Icons';
import utils from '~/constants/utils';

interface IsEmpName {
  isEmpName: string;
}
const CalendarText = styled.Text`
  margin: 2px 0 2px 10px;
  font-size: 11px;
  color: #333;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ModalItemTouchable = styled(RowTouchable)`
  margin-bottom: 20px;
`;

const RowSpace = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Date = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DateArrowLeft = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: transparent;
  border-width: 2px;
  border-color: #f4aaab;
`;

const DateArrowRight = styled(DateArrowLeft)``;
const CalendarOpenBtn = styled(DateArrowLeft)`
  margin-right: 5px;
`;

const DateToday = styled(DateArrowLeft)`
  margin-left: 5px;
`;

const DateTextArea = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #7f7f7f;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const CalendarTitle = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #e85356;
`;

const CalendarTextBox = styled.View`
  padding: 10px 20px;
  background-color: white;
`;

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

const EmptyText = styled.Text`
  color: #999;
`;

const CircleBotton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #e85356;
  position: absolute;
  bottom: ${hp('5%')}px;
  right: ${wp('7%')}px;
  justify-content: center;
  align-items: center;
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
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

const WhiteText = styled.Text`
  color: white;
`;

const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 20;
  top: 0;
`;

const WhiteBigText = styled(WhiteText)`
  font-size: 20px;
`;

const ChecklistModalBox = styled.View`
  flex: 4;
  justify-content: center;
  height: 100px;
  padding: 20px;
  background-color: white;
`;

const ChecklistTitleText = styled.Text`
  margin: 10px 0;
  font-size: 16px;
`;

const ChecklistIconContainer = styled.View<IsEmpName>`
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isEmpName ? '#e85356' : '#ddd')};
`;

const ChecklistTypeText1 = styled.Text`
  align-self: flex-start;
  color: #e85356;
  font-size: 11px;
`;

const ChecklistTypeText2 = styled.Text`
  flex: 1;
  padding-left: 10px;
  color: #7e7c7c;
  font-size: 12px;
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
  background-color: #e85356;
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
  elevation: 6;
`;

export default ({
  STORE,
  date,
  setDate,
  refreshing,
  onRefresh,
  markingFn,
  isCalendarModalVisible,
  setIsCalendarModalVisible,
  isChecklistModalVisible,
  setIsChecklistModalVisible,
  onPressAddChecklist,
  CHECKLIST_MARKED,
  onDayPress,
  onMonthChange,
  CHECKLIST_DATA,
  selectCheckListFn,
  checkdataFn,
  fetchData,
}) => {
  const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  const tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
  const CheckState = ({check}) => {
    let checkState;
    if (check !== null) {
      check = check.split('@');
      for (let i = 0; i < check.length / 2; i++) {
        let temp = 2 * i + 1;
        if (check[temp] === '1') {
          checkState = 'checkComplete';
        }
        if (check[temp] === '2') {
          checkState = 'checkIncomplete';
          break;
        }
      }
    } else {
      checkState = 'willCheck';
    }
    if (checkState == 'checkComplete') {
      return (
        <Row>
          <EllipseIcon size={8} color={'#AACE36'} />
          <CalendarText>체크정상</CalendarText>
        </Row>
      );
    } else if (checkState == 'checkIncomplete') {
      return (
        <Row>
          <EllipseIcon size={8} color={'#984B19'} />
          <CalendarText>체크이상</CalendarText>
          <EllipseIcon size={8} color={'#FEBF40'} />
          <CalendarText>특이사항</CalendarText>
        </Row>
      );
    } else {
      return (
        <Row>
          <EllipseIcon size={8} color={'#0D4F8A'} />
          <CalendarText>체크예정</CalendarText>
        </Row>
      );
    }
  };

  const ModalItem = ({item, key}) => (
    <ModalItemTouchable key={key} onPress={() => checkdataFn(item)}>
      <ChecklistModalBox>
        <RowSpace>
          <CheckState check={item.CHECK_LIST} />
        </RowSpace>
        <ChecklistTitleText ellipsizeMode={'tail'} numberOfLines={1}>
          {item.TITLE}
        </ChecklistTitleText>
        {item.EMP_NAME ? ( // 체크한 상태
          <>
            <Row>
              <ChecklistTypeText1>체크시간</ChecklistTypeText1>
              <ChecklistTypeText2>{item.CHECK_TIME}</ChecklistTypeText2>
            </Row>
            {item.EMP_SEQ ? (
              <Row>
                <ChecklistTypeText1>담당직원</ChecklistTypeText1>
                <ChecklistTypeText2>
                  {item.NAME.split('@').join(' / ')}
                </ChecklistTypeText2>
              </Row>
            ) : (
              <Row>
                <ChecklistTypeText1>체크직원</ChecklistTypeText1>
                <ChecklistTypeText2>{item.EMP_NAME}</ChecklistTypeText2>
              </Row>
            )}
          </>
        ) : (
          // 미체크 상태
          <>
            <Row>
              <ChecklistTypeText1>체크예정시간</ChecklistTypeText1>
              <ChecklistTypeText2>
                {item.END_TIME === '' ? '미사용' : item.END_TIME}
              </ChecklistTypeText2>
            </Row>
            {item.EMP_SEQ && ( // 담당직원이 설정된 상태
              <Row>
                <ChecklistTypeText1>담당직원</ChecklistTypeText1>
                <ChecklistTypeText2>
                  {item.NAME.split('@').join(' / ')}
                </ChecklistTypeText2>
              </Row>
            )}
          </>
        )}
      </ChecklistModalBox>
      <ChecklistIconContainer isEmpName={item.EMP_NAME}>
        <CheckMarkIcon size={34} color="white" />
      </ChecklistIconContainer>
    </ModalItemTouchable>
  );

  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <Section>
            <Date>
              <DateArrowLeft
                onPress={() => {
                  setDate(yesterday);
                  fetchData(yesterday);
                }}>
                <BackIcon size={22} color={'#f4aaab'} />
              </DateArrowLeft>
              <DateToday onPress={() => fetchData(date)}>
                <ReloadCircleIcon size={18} color={'#f4aaab'} />
              </DateToday>
              <DateTextArea>
                <DateText>{moment(date).format('YYYY년 M월 D일')}</DateText>
                <DateText style={{fontSize: 12, fontWeight: '300'}}>
                  {utils.renderWeekDay(moment(date).format('d'))}
                </DateText>
              </DateTextArea>

              <CalendarOpenBtn
                onPress={() => {
                  markingFn(
                    moment(date).format('YYYY'),
                    moment(date).format('M'),
                    moment(date).format('D'),
                  );
                  setIsCalendarModalVisible(true);
                }}>
                <CalendarIcon size={18} color={'#f4aaab'} />
              </CalendarOpenBtn>
              <DateArrowRight
                onPress={() => {
                  setDate(tomorrow);
                  fetchData(tomorrow);
                }}>
                <ForwardIcon size={22} color={'#f4aaab'} />
              </DateArrowRight>
            </Date>
          </Section>
          {CHECKLIST_DATA?.length == 0 ? (
            STORE == '1' ? (
              <EmptyBox>
                <FastImage
                  style={{
                    width: 377,
                    height: 450,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50,
                  }}
                  source={require('../../../../assets/images/emptyImg.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <TextBox>
                  <Column>
                    <EmptyText>체크리스트를 등록해주세요.</EmptyText>
                  </Column>
                </TextBox>
              </EmptyBox>
            ) : (
              <EmptyBox>
                <FastImage
                  style={{
                    width: 377,
                    height: 450,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50,
                  }}
                  source={require('../../../../assets/images/emptyImg.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <TextBox>
                  <Column>
                    <EmptyText>등록된 체크리스트가 없습니다.</EmptyText>
                  </Column>
                </TextBox>
              </EmptyBox>
            )
          ) : (
            <>
              {CHECKLIST_DATA?.filter((i) => i.CHECK_TYPE == '1').map(
                (data, index) => {
                  return (
                    <ChecklistItemsScreenCard
                      key={index}
                      date={date}
                      data={data}
                    />
                  );
                },
              )}
            </>
          )}
        </Container>
      </ScrollView>
      {STORE == '0' && (
        <CircleBotton onPress={() => selectCheckListFn()}>
          <WhiteText>체크</WhiteText>
        </CircleBotton>
      )}
      <Modal
        isVisible={isChecklistModalVisible}
        style={{marginTop: 60}}
        onBackdropPress={() => setIsChecklistModalVisible(false)}
        onRequestClose={() => setIsChecklistModalVisible(false)}>
        {CHECKLIST_DATA && CHECKLIST_DATA.length == 0 ? (
          <Row style={{justifyContent: 'center'}}>
            <WhiteBigText>등록된 체크리스트가 없습니다</WhiteBigText>
          </Row>
        ) : (
          <Row style={{top: -10, marginBottom: 20, justifyContent: 'center'}}>
            <WhiteBigText>체크항목를 선택해주세요.</WhiteBigText>
            <IconContainer onPress={() => setIsChecklistModalVisible(false)}>
              <CloseCircleOutlineIcon size={30} color={'white'} />
            </IconContainer>
          </Row>
        )}
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          {CHECKLIST_DATA?.filter((i) => i.CHECK_TYPE == '0').map(
            (item, index) => (
              <ModalItem item={item} key={index} />
            ),
          )}
          {CHECKLIST_DATA?.filter((i) => i.CHECK_TYPE == '1').map(
            (item, index) => (
              <ModalItem item={item} key={index} />
            ),
          )}
        </ScrollView>
      </Modal>
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
            <Row>
              <EllipseIcon size={8} color={'#0D4F8A'} />
              <CalendarText>미체크</CalendarText>
            </Row>
            <Row>
              <EllipseIcon size={8} color={'#984B19'} />
              <CalendarText>체크이상</CalendarText>
            </Row>
            <Row>
              <EllipseIcon size={8} color={'#AACE36'} />
              <CalendarText>체크정상</CalendarText>
            </Row>
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
            todayTextColor: '#e85356',
          }}
          markingType={'multi-dot'}
          hideExtraDays={true}
          monthFormat={'M월'}
          current={date}
          markedDates={CHECKLIST_MARKED}
          onDayPress={(date) => onDayPress(date)}
          onMonthChange={(date) => onMonthChange(date)}
        />
      </Modal>
      {STORE === '1' && (
        <AddButtonContainer>
          <AddButton onPress={() => onPressAddChecklist()}>
            <AddIcon />
          </AddButton>
        </AddButtonContainer>
      )}
    </BackGround>
  );
};
