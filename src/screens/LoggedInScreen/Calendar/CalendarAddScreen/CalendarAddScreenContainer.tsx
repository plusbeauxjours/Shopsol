import React, {useState} from 'react';
import CalendarAddScreenPresenter from './CalendarAddScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {STORE_SEQ, STORE_NAME} = useSelector(
    (state: any) => state.storeReducer,
  );
  const {EMPLOYEE_LIST} = useSelector((state: any) => state.employeeReducer);

  const [emplist, setEmplist] = useState<any>(EMPLOYEE_LIST?.workinglist);
  const [choiceEmp, setChoiceEmp] = useState<any>([]);
  const [startTime, setStartTime] = useState<any>(moment());
  const [endTime, setEndTime] = useState<any>(moment());
  const [startTimeSet, setStartTimeSet] = useState<boolean>(false);
  const [endTimeSet, setEndTimeSet] = useState<boolean>(false);
  const [timeSelected, setTimeSelected] = useState<any>(null);
  const [timeCheck, setTimeCheck] = useState<any>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [stepFourClick, setStepFourClick] = useState<boolean>(false);
  const [incentiveCheck, setIncentiveCheck] = useState<
    [boolean, boolean, boolean]
  >([true, false, false]); // [기본급 적용(1배), 야간근무수당 적용(1.5배), 야간근무수당 적용(2배)]
  const [isStartTimeModalVisible, setIsStartTimeModalVisible] = useState<
    boolean
  >(false);
  const [isEndTimeModalVisible, setIsEndTimeModalVisible] = useState<boolean>(
    false,
  );
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // STEP1에서 추가한 직원을 눌렀을 때
  const deleteEmpFn = (KEY) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].MobileNo == KEY) {
        setEmplist([...emplist, buffer[i]]);
        buffer.splice(i, 1);
        break;
      }
    }
    setChoiceEmp(buffer);
  };

  // 직원 리스트 모달에서 직원을 추가하였을 때
  const addEmpFn = (data) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (data.EMP_NAME == buffer[i].EMP_NAME) {
        return;
      }
    }
    buffer.push(data);
    setEmplist(
      emplist.filter((info) => {
        return info.EMP_SEQ !== data.EMP_SEQ;
      }),
    );
    setChoiceEmp(buffer);
  };

  const toastFn = () => {
    clearTimeout();
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 1000);
  };

  // 일정추가완료 버튼
  const registerFn = async () => {
    let incentiveChecked = incentiveCheck.indexOf(true);
    if (choiceEmp.length === 0) {
      return alertModal('직원을 선택해주세요.');
    }
    if (timeCheck.length === 0) {
      return alertModal('출퇴근 시간이 입력되지 않았습니다.');
    }
    if (Object.keys(markedDates).length === 0) {
      return alertModal('캘린더에서 근무일을 설정해주세요.');
    }
    let newChoiceEmp = [];
    for (var i = 0; i < choiceEmp.length; i++) {
      newChoiceEmp.push({
        EMP_SEQ: choiceEmp[i].EMP_SEQ,
        EMP_NAME: choiceEmp[i].EMP_NAME,
      });
    }
    if (incentiveChecked === 0) {
      incentiveChecked = 9; // 0: 기본급 적용(1배)
    } else if (incentiveChecked === 1) {
      incentiveChecked = 8; // 1: 초과, 야간근무수당 적용(1.5배)
    } else if (incentiveChecked === 2) {
      incentiveChecked = 6; // 2: 초과, 야간근무수당 적용(2배)
    }
    for (var i = 0; i < timeCheck.length; i++) {
      let newMarkedDates = [];
      Object.keys(markedDates).map((key) => {
        for (var j = 0; j < markedDates[key].dots.length; j++) {
          let value = markedDates[key].dots[j].color;
          if (value === timeCheck[i].color) {
            newMarkedDates.push(key);
          }
        }
      });
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.createNewSchedule({
          EMPS: newChoiceEmp,
          DATE: newMarkedDates,
          SCHEDULETYPE: incentiveChecked,
          TYPE: '3',
          START: timeCheck[i].start,
          END: timeCheck[i].end,
          COLOR: timeCheck[i].color,
          STORE_NAME,
          STORE_ID: STORE_SEQ,
        });
        if (data.message === 'ALREADY_SUCCESS') {
          alertModal('일정이 이미 등록되어 있습니다.');
        } else if (data.message === 'SUCCESS') {
          navigation.navigate('CalendarInfoScreen');
          alertModal('추가일정을 등록하였습니다.');
          params?.fetchData();
        }
      } catch (e) {
        console.log(e);
        alertModal('통신이 원활하지 않습니다.');
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  // 출퇴근 목록에서 출퇴근 목록에 추가 버튼
  const checkAddTimeFn = () => {
    setTimeSelected(0);
    if (!startTimeSet || !endTimeSet) {
      return alertModal('출퇴근 시간을 먼저 입력해주세요.');
    } else if (
      moment(startTime).format('HH:mm') == moment(endTime).format('HH:mm')
    ) {
      return alertModal('출퇴근 시간을 다르게 입력해주세요.');
    } else if (timeCheck.length >= 7) {
      return alertModal('일정은 7개가 최대입니다.');
    } else {
      setStartTimeSet(false);
      setEndTimeSet(false);
      let value = JSON.parse(JSON.stringify(timeCheck));
      let color = [
        '#0D4F8A',
        '#ED8F52',
        '#FEBF40',
        '#5CAD6F',
        '#984B19',
        '#CB8DB1',
        '#FEBF40',
      ];
      let temp, tempIndex;
      if (timeCheck.length === 0) {
        temp = {
          start: moment(startTime).format('HH:mm'),
          end: moment(endTime).format('HH:mm'),
          color: color[timeCheck.length],
        };
      } else {
        for (var i = 0; i < timeCheck.length; i++) {
          tempIndex = color.indexOf(timeCheck[i].color);
          color.splice(tempIndex, 1);
        }
        temp = {
          start: moment(startTime).format('HH:mm'),
          end: moment(endTime).format('HH:mm'),
          color: color[0],
        };
      }
      value.push(temp);
      setTimeCheck(value);
    }
  };

  // 출퇴근 목록에서 삭제 붉은 아이콘
  const deleteColorFn = (index) => {
    setTimeSelected(0);
    let timeChecked = JSON.parse(JSON.stringify(timeCheck));
    let markedDated = JSON.parse(JSON.stringify(markedDates));
    Object.keys(markedDated).map((key) => {
      var temp = markedDated[key].dots.findIndex(
        (element) => element.key === timeChecked[index].color,
      );

      if (temp !== -1) {
        markedDated[key].dots.splice(temp, 1);
      }
    });
    timeChecked.splice(index, 1);
    setTimeCheck(timeChecked);
    setMarkedDates(markedDated);
    if (timeSelected > index) {
      setTimeSelected(timeSelected - 1);
    } else if (timeSelected === index) {
      setTimeSelected(null);
    }
  };

  return (
    <CalendarAddScreenPresenter
      alertModal={alertModal}
      markedDates={markedDates}
      setMarkedDates={setMarkedDates}
      emplist={emplist}
      timeCheck={timeCheck}
      registerFn={registerFn}
      addEmpFn={addEmpFn}
      deleteEmpFn={deleteEmpFn}
      checkAddTimeFn={checkAddTimeFn}
      deleteColorFn={deleteColorFn}
      choiceEmp={choiceEmp}
      startTime={startTime}
      endTime={endTime}
      timeSelected={timeSelected}
      setTimeSelected={setTimeSelected}
      stepFourClick={stepFourClick}
      setStepFourClick={setStepFourClick}
      incentiveCheck={incentiveCheck}
      setIncentiveCheck={setIncentiveCheck}
      isStartTimeModalVisible={isStartTimeModalVisible}
      setIsStartTimeModalVisible={setIsStartTimeModalVisible}
      isEndTimeModalVisible={isEndTimeModalVisible}
      setIsEndTimeModalVisible={setIsEndTimeModalVisible}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      toastFn={toastFn}
      isToastVisible={isToastVisible}
      startTimeSet={startTimeSet}
      setStartTimeSet={setStartTimeSet}
      endTimeSet={endTimeSet}
      setEndTimeSet={setEndTimeSet}
    />
  );
};
