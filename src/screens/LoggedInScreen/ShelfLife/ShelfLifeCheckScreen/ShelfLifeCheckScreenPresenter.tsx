import React from 'react';
import {Agenda} from 'react-native-calendars';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {CheckMarkIcon, DownIcon} from '~/constants/Icons';
import moment from 'moment';

interface IsChecked {
  isChecked: boolean;
}

const KnobIconContainer = styled.View`
  width: 70px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #e85356;
`;

const RenderEmpty = styled.View`
  flex: 1;
  margin-top: 30px;
  border-top-width: 1px;
  border-color: #ddd;
`;

const Item = styled.TouchableOpacity<IsChecked>`
  margin: 10px 0;
  background-color: ${(props) => (props.isChecked ? '#ddd' : '#fff')};
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  height: 150px;
`;

const IconContainer = styled.View<IsChecked>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isChecked ? '#ddd' : '#000')};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 12px;
`;

const Bold = styled(Text)`
  font-weight: bold;
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 10px;
`;

const Name = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 0.6px;
  background-color: #aaa;
`;

const Date = styled.View`
  margin-top: 10px;
  align-items: flex-end;
`;

const DateText = styled.Text`
  color: #aaa;
`;

export default ({
  SHELFLIFE_DATA,
  SHELFLIFE_MARKED,
  onDayPress,
  onRefresh,
  confirmModal,
  cancelModal,
  alertModal,
}) => {
  const navigation = useNavigation();

  const renderEmptyDate = () => <RenderEmpty />;
  const rowHasChanged = (r1, r2) => r1 !== r2;
  const renderKnob = () => (
    <KnobIconContainer>
      <DownIcon />
    </KnobIconContainer>
  );

  const renderItem = (item: any) => {
    const {
      shelfLife_SEQ,
      shelfLifeName,
      shelfLifeDate,
      checkTime,
      checkEmpName,
      shelfLifeMemo,
      checkType,
    } = item;
    return (
      <Item
        isChecked={checkType !== '0'}
        onPress={() =>
          navigation.navigate('ShelfLifeUpdateScreen', {
            shelfLife_SEQ,
            shelfLifeName,
            shelfLifeDate,
            shelfLifeMemo,
          })
        }>
        <Name>
          <NameText>{shelfLifeName}</NameText>
          <Touchable
            onPress={() => {
              if (checkType == '0') {
                confirmModal(shelfLife_SEQ, shelfLifeDate);
              } else {
                cancelModal(shelfLife_SEQ, shelfLifeDate);
              }
            }}>
            <IconContainer isChecked={checkType == '0'}>
              <CheckMarkIcon
                size={12}
                color={checkType == '0' ? '#bbb' : 'yellow'}
              />
            </IconContainer>
          </Touchable>
        </Name>
        <Date>
          <DateText>
            {shelfLifeDate.slice(0, 4)}년 {shelfLifeDate.slice(5, 7)}월
            {shelfLifeDate.slice(8, 10)}일
          </DateText>
        </Date>
        {(checkType == '1' || shelfLifeMemo !== '') && <Line />}
        {shelfLifeMemo !== '0' && (
          <TextContainer>
            <Text>{shelfLifeMemo}</Text>
          </TextContainer>
        )}
        {checkType !== '0' && (
          <TextContainer>
            <Row>
              <Text>처리직원: </Text>
              <Bold>{checkEmpName}</Bold>
            </Row>
            <Row>
              <Text>처리시간: </Text>
              <Bold>{moment(checkTime).format('YYYY.MM.DD HH:mm:ss')}</Bold>
            </Row>
          </TextContainer>
        )}
      </Item>
    );
  };

  return (
    <Agenda
      items={SHELFLIFE_DATA}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      renderKnob={renderKnob}
      onDayPress={(date) => onDayPress(date)}
      markedDates={SHELFLIFE_MARKED}
      theme={{
        agendaTodayColor: '#e85356',
        selectedDayBackgroundColor: '#ddd',
        dotColor: '#000',
        todayTextColor: '#e85356',
      }}
      refreshControl={null}
      rowHasChanged={rowHasChanged}
      monthFormat={'yyyy년 M월'}
      onRefresh={onRefresh}
    />
  );
};
