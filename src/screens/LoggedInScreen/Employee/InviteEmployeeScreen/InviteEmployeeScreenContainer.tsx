import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Hangul from 'hangul-js';
import Contacts from 'react-native-contacts';
import {openSettings} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import InviteEmployeeScreenPresenter from './InviteEmployeeScreenPresenter';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';
import {getRESPONSE_EMPLOYEE} from '~/redux/employeeSlice';
import {Alert, Linking} from 'react-native';
import utils from '~/constants/utils';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [name, setName] = useState<string>(null);
  const [phone, setPhone] = useState<string>(null);
  const [search, setSearch] = useState<string>(null);
  const [result, setResult] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [choice, setChoice] = useState<any>([]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const explainModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteBuffer = (KEY) => {
    setChoice((buffer) => buffer.filter((item) => item.key !== KEY));
  };

  const addFn = () => {
    if (!phone || !name) {
      return alertModal('', '초대할 직원의 연락처를 입력하세요');
    }
    var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(phone)) {
      return alertModal('', '올바른 휴대폰번호 11자리를 입력해주세요.');
    }
    let buffer = choice;
    let flag = true;
    for (var i = 0; i < buffer.length; i++) {
      const bufferformat = buffer[i].phone.split('-').join('');
      if (bufferformat == phone) {
        flag = false;
        break;
      }
    }
    if (flag == true) {
      buffer.unshift({key: phone, NAME: name, phone: phone});
    } else {
      alertModal('', '동일한 전화번호의 직원이 등록되어있습니다');
    }
    setChoice(buffer);
    setName(null);
    setPhone(null);
  };

  const choiseFn = (id, name, phoneNumbers) => {
    let buffer = choice;
    if (buffer && buffer.length !== 0) {
      let flag = true;
      for (var i = 0; i < buffer.length; i++) {
        if (buffer[i].key == id) {
          flag = false;
          break;
        }
      }
      if (flag == true) {
        buffer.unshift({key: id, NAME: name, phone: phoneNumbers});
      }
    } else {
      buffer.unshift({key: id, NAME: name, phone: phoneNumbers});
    }
    setChoice(buffer);
    setResult(result.filter((i) => i.recordID !== id));
  };

  const searchName = (text) => {
    setSearch(text);
    const arr = contacts;
    arr.forEach(function (item) {
      let dis = Hangul.disassemble(item.familyName + item.givenName, true);
      let cho = dis.reduce(function (prev, elem: any) {
        elem = elem[0] ? elem[0] : elem;
        return prev + elem;
      }, '');
      item.disassembled = cho;
    });
    let search = text;
    let search1 = Hangul.disassemble(search).join(''); // 렭 -> ㄹㅕㄹr
    const result1 = arr.filter(function (item) {
      return (
        item.familyName.includes(search) ||
        item.disassembled.includes(search1) ||
        item.givenName.includes(search)
      );
    });
    setResult(result1);
  };

  const submitFn = async () => {
    let buffer = choice;
    let buffer2 = new Array();
    for (let i = 0; i < buffer.length; i++) {
      buffer2.unshift(buffer[i].phone.replace(/\D/g, ''));
      buffer2.unshift(buffer[i].NAME);
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.sendEmp2({
        STORE_SEQ,
        LIST: buffer2,
      });
      if (data.message === 'SUCCESS') {
        alertModal(
          '초대완료',
          '초대확인 알림이 오면 직원합류승인에서 정보를 입력하여 합류를 완료해주세요. (초대받은 직원이 앱에 로그인 하게되면 초대확인 알림이 도착합니다)',
        );
        setChoice([]);
        dispatch(getRESPONSE_EMPLOYEE());
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const onPressSubmitButton = () => {
    setIsModalVisible(false);
    setSearch(null);
  };

  const onPress = (data) => {
    dispatch(setSplashVisible(true));
    try {
      choiseFn(
        data.recordID,
        data.familyName + data.givenName,
        data.phoneNumbers[0].number.replace(/\D/g, ''),
      );
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
      setSearch(null);
    }
  };

  const getContactsFn = () => {
    try {
      if (utils.isAndroid()) {
        requestPermissionsAndroid();
      } else {
        requestPermissionsIOS();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const requestPermissionsIOS = async () => {
    try {
      Contacts.checkPermission((err, permission) => {
        if (permission !== 'authorized') {
          Alert.alert(
            '연락처 탐색 동의',
            '연락처 탐색 기능을 사용하기 위해 확인을 누른 뒤, 환경 설정에서 탐색을 켜주세요.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: () => Linking.openURL('app-settings:'),
              },
            ],
          );
        } else {
          Contacts.getAll((err, contacts: any) => {
            setContacts(contacts);
            setResult(contacts);
          });
          setIsModalVisible(true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const requestPermissionsAndroid = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: '연락처 탐색 동의',
          message:
            '연락처 탐색 기능을 사용하기 위해 확인을 누른 뒤, 환경 설정에서 탐색을 켜주세요.',
          buttonPositive: '확인',
        },
      );
      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          '연락처 탐색 동의',
          '연락처 탐색 기능을 사용하기 위해 확인을 누른 뒤, 환경 설정에서 탐색을 켜주세요.',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => openSettings(),
            },
          ],
        );
      } else {
        Contacts.getAll((err, contacts: any) => {
          setContacts(contacts);
          setResult(contacts);
        });
        setIsModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toastFn = () => {
    clearTimeout();
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 1000);
  };

  return (
    <InviteEmployeeScreenPresenter
      explainModal={explainModal}
      setName={setName}
      name={name}
      setPhone={setPhone}
      phone={phone}
      choice={choice}
      submitFn={submitFn}
      addFn={addFn}
      result={result}
      getContactsFn={getContactsFn}
      deleteBuffer={deleteBuffer}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      searchName={searchName}
      search={search}
      onPress={onPress}
      onPressSubmitButton={onPressSubmitButton}
      toastFn={toastFn}
      isToastVisible={isToastVisible}
    />
  );
};
