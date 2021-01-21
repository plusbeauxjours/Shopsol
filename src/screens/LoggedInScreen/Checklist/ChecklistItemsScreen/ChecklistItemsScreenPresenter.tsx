import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';

import {
  EllipseIcon,
  ForwardIcon,
  BackIcon,
  ReloadCircleIcon,
  CalendarIcon,
} from '~/constants/Icons';
import moment from 'moment';
import ChecklistItemsScreenCard from './ChecklistItemsScreenCard';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

import {AddIcon} from '~/constants/Icons';
import utils from '~/constants/utils';
import styleGuide from '~/constants/styleGuide';

interface IsEmpName {
  isEmpName: string;
}

interface IsEmpty {
  isEmpty: boolean;
}

const CalendarText = styled.Text`
  margin: 2px 0 2px 10px;
  font-size: ${styleGuide.fontSize.small}px;
  color: #333;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
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
  border-color: ${styleGuide.palette.arrowColor};
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
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  color: ${styleGuide.palette.greyColor};
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View<IsEmpty>`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: ${(props) => (props.isEmpty ? 0 : 20)}px;
  background-color: white;
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
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
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

export default ({
  EMP_SEQ,
  STORE,
  date,
  setDate,
  refreshing,
  onRefresh,
  markingFn,
  isCalendarModalVisible,
  setIsCalendarModalVisible,
  onPressAddChecklist,
  CHECKLIST_MARKED,
  onDayPress,
  onMonthChange,
  CHECKLIST_DATA,
  fetchData,
  loading,
}) => {
  const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  const tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');

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
          <Section isEmpty={CHECKLIST_DATA?.length == 0}>
            <Date>
              <DateArrowLeft
                onPress={() => {
                  setDate(yesterday);
                  fetchData(yesterday);
                }}>
                <BackIcon size={22} color={styleGuide.palette.arrowColor} />
              </DateArrowLeft>
              <DateToday onPress={() => fetchData(date)}>
                <ReloadCircleIcon
                  size={18}
                  color={styleGuide.palette.arrowColor}
                />
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
                    moment(date).format('D'),
                  );
                  setIsCalendarModalVisible(true);
                }}>
                <CalendarIcon size={18} color={styleGuide.palette.arrowColor} />
              </CalendarOpenBtn>
              <DateArrowRight
                onPress={() => {
                  setDate(tomorrow);
                  fetchData(tomorrow);
                }}>
                <ForwardIcon size={22} color={styleGuide.palette.arrowColor} />
              </DateArrowRight>
            </Date>
          </Section>
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
              <EmptyText>체크리스트 정보를 불러오는 중입니다. </EmptyText>
              <EmptyText>잠시만 기다려주세요.</EmptyText>
            </>
          ) : (
            <>
              {CHECKLIST_DATA?.length == 0 ? (
                STORE == '1' ? (
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
                        <EmptyText>체크리스트를 등록해 주세요.</EmptyText>
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
                          EMP_SEQ={EMP_SEQ}
                        />
                      );
                    },
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </ScrollView>
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
            todayTextColor: styleGuide.palette.primary,
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
