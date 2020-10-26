import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setSplashVisible} from '~/redux/splashSlice';
import {setAlertVisible, setAlertInfo} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import ChecklistAddScreenPresenter from './ChecklistAddScreenPresenter';
import {getCHECKLIST_DATA} from '~/redux/checklistSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    CHECK_SEQ = null,
    PHOTO_CHECK = null,
    NAME = null,
    DATE = null,
    CHECK_TITLE = null,
    CHECK_LIST = [],
    CHECK_TIME = null,
    type = null,
    EMP_SEQ = null,
  } = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [choiceEmp, setChoiceEmp] = useState<any>([]);
  const [isCheckedEmpChoise, setIsCheckedEmpChoise] = useState<boolean>(
    EMP_SEQ ? true : false,
  );
  const [emplist, setEmplist] = useState<any>([]);
  const [TITLE, setTITLE] = useState<string>(CHECK_TITLE || null);
  const [checklistInput, setChecklistInput] = useState<string>('');
  const [LIST, setLIST] = useState<any>(CHECK_LIST || []);
  const [isNoCheckedtime, setIsNoCheckedtime] = useState<boolean>(
    CHECK_TIME?.length > 0 ? false : true,
  );
  const [isCheckedCamera, setIsCheckedCamera] = useState<boolean>(
    PHOTO_CHECK == '1' ? true : false,
  );
  const [customChecktime, setCustomChecktime] = useState<string>(
    CHECK_TIME || null,
  );
  const [isCustomModalVisible, setIsCustomModalVisible] = useState<boolean>(
    false,
  ); // 시간/분 입력 모달 활성화 여부
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        submitFn('close');
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 담당직원 리스트에서 삭제
  const deleteEmpFn = (KEY) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].EMP_SEQ == KEY) {
        setEmplist([...emplist, buffer[i]]);
        buffer.splice(i, 1);
        break;
      }
    }
    if (buffer.length == 0) {
      setChoiceEmp(buffer);
      setIsCheckedEmpChoise(false);
    } else {
      setChoiceEmp(buffer);
    }
  };

  // 담당직원 리스트에 추가
  const choiseEmpFn = (data) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (data.NAME == buffer[i].NAME) {
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

  const fetchData = async () => {
    try {
      const {data} = await api.getEmployeeList({STORE_SEQ});
      if (data.message === 'SUCCESS') {
        setEmplist(data.result);
      }
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
    }
  };

  // 체크리스트 추가하기
  const submitFn = async (sign) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    if (TITLE == '') {
      alertModal('체크포인트를 입력해주세요');
    }
    if (isCheckedEmpChoise && sign !== 'close') {
      if (buffer.length == 0) {
        return alertModal('체크리스트 담당 직원을 선택해주세요');
      }
    }
    let newChoiceEmp = [];
    for (let i = 0; i < choiceEmp.length; i++) {
      newChoiceEmp.push({
        EMP_SEQ: choiceEmp[i].EMP_SEQ,
      });
    }

    let newlist = [];
    for (let i = 0; i < LIST.length; i++) {
      newlist.push(LIST[i]);
      newlist.push(false);
    }
    if (!CHECK_SEQ) {
      try {
        dispatch(setSplashVisible(true));
        if (buffer.length != 0) {
          const {data} = await api.checkRegister({
            LIST: newlist,
            STORE_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
            EMP_SEQ: newChoiceEmp,
          });
          if (data.message === 'SUCCESS') {
            navigation.goBack();
            alertModal('체크리스트가 추가되었습니다.');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal(data.result);
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          const {data} = await api.checkRegister({
            LIST: newlist,
            STORE_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
          });
          if (data.message === 'SUCCESS') {
            navigation.goBack();
            alertModal('체크리스트가 추가되었습니다.');
            dispatch(getCHECKLIST_DATA(DATE));
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal(data.result);
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        if (buffer.length !== 0) {
          const {data} = await api.checkUpdate({
            CLOSE_FLAG: sign == 'close' ? '1' : '0',
            STORE_SEQ,
            LIST: newlist,
            CHECK_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
            EMP_SEQ: newChoiceEmp,
          });
          if (data.message === 'SUCCESS') {
            navigation.pop(2);
            alertModal(
              `체크리스트가 ${sign == 'close' ? '삭제' : '수정'}되었습니다.`,
            );
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          const {data} = await api.checkUpdate({
            CLOSE_FLAG: sign == 'close' ? '1' : '0',
            STORE_SEQ,
            LIST: newlist,
            CHECK_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
          });
          if (data.message === 'SUCCESS') {
            navigation.pop(2);
            alertModal(
              `체크리스트가 ${sign == 'close' ? '삭제' : '수정'}되었습니다.`,
            );
            dispatch(getCHECKLIST_DATA(DATE));
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  const initialize = () => {
    if (NAME && EMP_SEQ) {
      let buffer = [];
      let empNameArr = NAME.split('@');
      let empSeqArr = EMP_SEQ.split('@');
      for (let i = 0; i < empNameArr.length; i++) {
        buffer.push({
          NAME: empNameArr[i],
          EMP_SEQ: empSeqArr[i],
          IMAGE: '',
        });
      }

      setChoiceEmp(buffer);
    }
  };

  const toastFn = () => {
    clearTimeout();
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 1000);
  };

  useEffect(() => {
    initialize();
    fetchData();
  }, []);

  return (
    <ChecklistAddScreenPresenter
      TITLE={TITLE}
      setTITLE={setTITLE}
      deleteEmpFn={deleteEmpFn}
      isNoCheckedtime={isNoCheckedtime}
      setIsNoCheckedtime={setIsNoCheckedtime}
      isCheckedCamera={isCheckedCamera}
      setIsCheckedCamera={setIsCheckedCamera}
      customChecktime={customChecktime}
      setCustomChecktime={setCustomChecktime}
      isCheckedEmpChoise={isCheckedEmpChoise}
      setIsCheckedEmpChoise={setIsCheckedEmpChoise}
      checklistInput={checklistInput}
      choiseEmpFn={choiseEmpFn}
      emplist={emplist}
      choiceEmp={choiceEmp}
      submitFn={submitFn}
      LIST={LIST}
      type={type}
      confirmModal={confirmModal}
      setChecklistInput={setChecklistInput}
      setLIST={setLIST}
      isCustomModalVisible={isCustomModalVisible}
      setIsCustomModalVisible={setIsCustomModalVisible}
      toastFn={toastFn}
      isToastVisible={isToastVisible}
    />
  );
};
