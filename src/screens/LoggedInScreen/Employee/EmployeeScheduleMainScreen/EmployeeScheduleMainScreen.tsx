import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  HelpCircleIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '~/constants/Icons';
import styleGuide from '~/constants/styleGuide';

const WhiteSpace = styled.View`
  height: 30px;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: ${styleGuide.palette.backgroundPrimary};
`;

const Section = styled.View`
  width: 100%;
  margin: 20px 0;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const NameText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.large}px;
`;
const GreySmallText = styled.Text`
  color: ${styleGuide.palette.greyColor};
  font-size: ${styleGuide.fontSize.middle}px;
  margin-top: 5px;
`;
const GreyText = styled.Text`
  color: ${styleGuide.palette.greyColor};
`;

const Bold = styled.Text`
  font-weight: ${styleGuide.fontWeight.bold};
  margin-left: 5px;
  font-size: 14px;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
`;

const Line = styled.View`
  width: 100%;
  border-bottom-width: 2px;
  border-color: #e5e5e5;
  margin: 20px 0;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {PAY_TYPE, PAY, EMP_SEQ, CALCULATE_DAY} = params;

  const [isFreeWorkingType, setIsFreeWorkingType] = useState<boolean>(true); //  [ 일정이 있는 직원, 자율출퇴근 직원 ]

  const explainModal = (text) => {
    const params = {
      alertType: 'explain',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const WorkType = ({selection, text}) => (
    <React.Fragment>
      <Row>
        {selection === 0 ? (
          <RowTouchable onPress={() => setIsFreeWorkingType(false)}>
            {!isFreeWorkingType ? (
              <RadioBtnOnIcon size={22} />
            ) : (
              <RadioBtnOffIcon size={22} />
            )}
            <Bold>{text}</Bold>
          </RowTouchable>
        ) : (
          <RowTouchable onPress={() => setIsFreeWorkingType(true)}>
            {isFreeWorkingType ? (
              <RadioBtnOnIcon size={22} />
            ) : (
              <RadioBtnOffIcon size={22} />
            )}
            <Bold>{text}</Bold>
          </RowTouchable>
        )}
        <RowTouchable
          onPress={() => {
            if (selection == 0) {
              explainModal(
                '1. 근무일정 설정 후 사용이 가능합니다.\n2. 근태관리가 가능합니다. (지각, 조퇴, 결근 확인 및 휴무설정 가능)\n3. 근무일정 기준으로 급여가 산출됩니다.',
              );
            } else {
              explainModal(
                '1. 근무일정 설정없이 사용이 가능합니다.\n2. 출퇴근 확인만 가능합니다.\n3. 출퇴근 시간 기준으로 급여가 산출됩니다.\n4. 주휴수당 계산이 안됩니다.',
              );
            }
          }}>
          <HelpCircleIcon />
        </RowTouchable>
      </Row>
      <Row style={{marginTop: 10, paddingLeft: 20}}>
        {text == '일정이 있는 직원' ? (
          <GreyText>
            정해진 일정으로 출퇴근하며 캘린더에 근무현황(지각, 조퇴, 휴무 등)이
            표시됩니다.
          </GreyText>
        ) : (
          <GreyText>
            정해진 일정없이 출퇴근이 가능하며 출근하였을 때만 캘린더에
            표시됩니다.
          </GreyText>
        )}
      </Row>
    </React.Fragment>
  );
  return (
    <BackGround>
      <Container>
        <Section>
          <NameText>근무유형 선택</NameText>
          <GreySmallText>
            추후 직원정보 설정에서 변경이 가능합니다.
          </GreySmallText>
          <Line />
          <WorkType selection={0} text={'일정이 있는 직원'} />
          <WhiteSpace />
          <WorkType selection={1} text={'자율출퇴근 직원'} />
        </Section>
        <SubmitBtn
          text={'선택 완료'}
          onPress={() => {
            navigation.navigate('EmployeeScheduleInfoScreen', {
              CALCULATE_DAY,
              isFreeWorkingType,
              EMP_SEQ,
              PAY,
              PAY_TYPE,
              IMAGE: params?.IMAGE,
              mobileNo: params?.mobileNo,
            });
          }}
          isRegisted={true}
        />
      </Container>
    </BackGround>
  );
};
