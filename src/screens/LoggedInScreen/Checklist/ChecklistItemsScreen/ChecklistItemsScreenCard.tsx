import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {EllipseIcon, ForwardIcon} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';
import {CheckMarkIcon} from '../../../../constants/Icons';

interface IContain {
  isContainedEmp: boolean;
}

const Touchable = styled(Ripple)<IContain>`
  width: 100%;
  flex-direction: row;
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 25px;
  margin-bottom: 20px;
  border-width: ${(props) => (props.isContainedEmp ? 0 : 1)}px;
  border-color: ${(props) =>
    props.isContainedEmp ? 'transparent' : styleGuide.palette.rippleColor};
  background-color: ${(props) =>
    props.isContainedEmp ? 'white' : styleGuide.palette.backgroundPrimary};
`;

const ArrowBox = styled.View`
  width: 20px;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CheckpointText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  font-weight: ${styleGuide.fontWeight.bold};
  margin-bottom: 20px;
`;

const GreyText = styled.Text`
  padding-left: 10px;
  color: #7e7c7c;
`;
const CheckpointBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  width: ${wp('100') - 150}px;
`;

const ChecktimeText = styled.Text`
  font-size: ${styleGuide.fontSize.middle}px;
  color: ${styleGuide.palette.primary};
`;

const CalendarText = styled.Text`
  margin: 0 5px;
  font-size: ${styleGuide.fontSize.small}px;
  color: #333;
`;

const IconContainer = styled.View`
  z-index: 10;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.tertiary};
`;

export default ({date, data, EMP_SEQ}) => {
  const navigation = useNavigation();
  const [willCheck, setWillCheck] = useState<boolean>(false);
  const [checkNo, setCheckNo] = useState<boolean>(false);

  let done = false;
  if (moment(date) == moment()) {
    done = true;
  } else {
    if (!(moment(date) > moment())) {
      done = true;
    }
  }

  const gotoCkecklistDetail = () => {
    if (data.CS_SEQ) {
      navigation.navigate('ChecklistDetailScreen', {
        QR_SEQ: data?.QR_SEQ,
        ITEM_EMP_SEQ: data?.EMP_SEQ,
        CHECK_SEQ: data?.CHECK_SEQ,
        DATE: date,
      });
    } else {
      navigation.navigate('ChecklistSpecificationScreen', {
        data,
        scan: '0',
      });
    }
  };

  const checkState = (check) => {
    let willChecked = false;
    let checkedNo = false;
    if (check) {
      check = check.split('@');
      for (var i = 0; i < check.length / 2; i++) {
        var temp = 2 * i + 1;
        if (check[temp] === '2') {
          checkedNo = true;
        }
      }
    } else {
      willChecked = true;
    }
    setWillCheck(willChecked);
    setCheckNo(checkedNo);
  };

  useEffect(() => {
    checkState(data.CHECK_LIST);
  }, []);

  useEffect(() => {
    checkState(data.CHECK_LIST);
  }, [data]);

  return (
    <Touchable
      activeOpacity={1}
      onPress={() => gotoCkecklistDetail()}
      isContainedEmp={!data?.EMP_SEQ || data?.EMP_SEQ?.includes(EMP_SEQ)}
      rippleColor={styleGuide.palette.rippleGreyColor}
      rippleDuration={600}
      rippleSize={1700}
      rippleContainerBorderRadius={20}
      rippleOpacity={0.1}>
      <ContentBox>
        <Row
          style={{
            justifyContent: 'flex-end',
            height: 10,
          }}>
          {done && (
            <Row style={{justifyContent: 'flex-end'}}>
              {willCheck && (
                <Row>
                  <EllipseIcon size={8} color={'#0D4F8A'} />
                  <CalendarText>미체크</CalendarText>
                </Row>
              )}
              {!checkNo && data.CS_SEQ && (
                <Row>
                  <EllipseIcon size={8} color={'#AACE36'} />
                  <CalendarText>체크정상</CalendarText>
                </Row>
              )}
              {checkNo && data.CS_SEQ && (
                <Row>
                  <EllipseIcon size={8} color={'#984B19'} />
                  <CalendarText>체크이상</CalendarText>
                </Row>
              )}
              {data.CHECK_TITLE?.length > 0 && data.CHECK_TITLE && data.CS_SEQ && (
                <Row>
                  <EllipseIcon size={8} color={'#FEBF40'} />
                  <CalendarText>특이사항</CalendarText>
                </Row>
              )}
            </Row>
          )}
        </Row>
        <CheckpointText>{data.TITLE}</CheckpointText>
        {data.EMP_NAME ? ( // 체크한 상태
          <>
            <CheckpointBox>
              <ChecktimeText>체크시간</ChecktimeText>
              <GreyText>
                {data?.CHECK_TIME?.split('-')
                  .join('.')
                  .slice(0, data?.CHECK_TIME?.length - 3)}
              </GreyText>
              <IconContainer>
                <CheckMarkIcon size={12} color={'white'} />
              </IconContainer>
            </CheckpointBox>
            {data.EMP_SEQ ? (
              <CheckpointBox>
                <ChecktimeText>담당직원</ChecktimeText>
                <GreyText>{data.NAME.split('@').join(' / ')}</GreyText>
              </CheckpointBox>
            ) : (
              <CheckpointBox>
                <ChecktimeText>체크직원</ChecktimeText>
                <GreyText>{data.EMP_NAME}</GreyText>
              </CheckpointBox>
            )}
          </>
        ) : (
          <>
            <CheckpointBox>
              <ChecktimeText>체크예정시간</ChecktimeText>
              <GreyText>
                {data.END_TIME === '' ? '미사용' : data.END_TIME}
              </GreyText>
            </CheckpointBox>
            {data.EMP_SEQ && (
              <CheckpointBox>
                <ChecktimeText>담당직원</ChecktimeText>
                <GreyText>{data.NAME.split('@').join(' / ')}</GreyText>
              </CheckpointBox>
            )}
          </>
        )}
      </ContentBox>
      <ArrowBox>
        <ForwardIcon />
      </ArrowBox>
    </Touchable>
  );
};
