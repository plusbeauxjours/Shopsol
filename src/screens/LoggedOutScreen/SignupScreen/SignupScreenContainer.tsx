import React, {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import SignupScreenPresenter from './SignupScreenPresenter';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedOutApi';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mobileNo = null, verifyCode = null} = params;

  const [name, setName] = useState<string>('');
  const [positionTypeCheck, setPositionTypeCheck] = useState<
    [boolean, boolean]
  >([false, false]);
  const [genderTypeCheck, setGenderTypeCheck] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const [joinRoute, setJoinRoute] = useState<string>('가입경로');
  const [otherJoinRoute, setOtherJoinRoute] = useState<string>('');
  const [password, setPassword] = useState<any>('');
  const [birthDate, setBirthDate] = useState<any>(moment());
  const [initBirthDate, setInitBirthDate] = useState<any>(moment());
  const [birthDateSet, setBirthDateSet] = useState<boolean>(false);

  const [isBirthDateVisible, setIsBirthDateVisible] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<any>('');
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isPasswordCheckError, setIsPasswordCheckError] = useState<boolean>(
    false,
  );
  const [helparr, setHelparr] = useState<[]>([]);

  const alertModal = (text) => {
    const params = {alertType: 'alert', content: text};
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      okCallback: () => submitFn(),
      okButtonText: '예',
      cancelButtonText: '아니요',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 회원가입을 위한 유효성검사 & api
  const submitFn = async () => {
    const checkNumber = password.search(/[0-9]/g);
    const checkEnglish = password.search(/[a-z]/gi);

    if (name.length == 0) {
      return alertModal('이름을 입력하세요.');
    }
    if (name.length > 6) {
      return alertModal('이름은 6자 이하로 입력해주세요.');
    }
    if (!birthDateSet) {
      return alertModal('생일을 선택하세요.');
    }
    if (positionTypeCheck[1] == true && joinRoute == '가입경로') {
      alertModal('가입경로를 입력해주세요.');
      dispatch(setSplashVisible({visible: false}));
      return;
    } else {
      if (joinRoute == '기타') {
        if (otherJoinRoute == '') {
          alertModal('기타 가입경로를 입력해주세요.');
          dispatch(setSplashVisible({visible: false}));
          return;
        }
      }
    }
    if (positionTypeCheck.indexOf(true).toString() == '-1') {
      return alertModal('가입유형을 입력하세요.');
    }
    if (genderTypeCheck.indexOf(true).toString() == '-1') {
      return alertModal('성별을 선택하세요.');
    }
    if (password.length == 0) {
      return alertModal('비밀번호를 입력하세요.');
    }
    if (passwordCheck.length == 0) {
      return alertModal('비밀번호 확인을 입력하세요.');
    }
    if (password != passwordCheck) {
      return alertModal('비밀번호가 동일하지 않습니다.');
    }
    if (checkNumber < 0 || checkEnglish < 0) {
      return alertModal('숫자와 영문자를 혼용하여야 합니다.');
    }
    if (/(\w)\1\1\1/.test(password)) {
      return alertModal('444같은 문자를 4번 이상 사용하실 수 없습니다.');
    }
    if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      return alertModal(
        '비밀번호는 숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.',
      );
    }
    try {
      dispatch(
        setSplashVisible({
          visible: true,
          fullText: '소중한 회원님의 정보를 검토중입니다.',
        }),
      );
      const {data} = await api.signUp({
        NAME: name,
        BIRTHDATE: moment(birthDate).format('YYYY-MM-DD'),
        GENDER: genderTypeCheck.indexOf(true).toString(),
        MobileNo: mobileNo,
        SMSNUMBER: verifyCode,
        STORE: positionTypeCheck.indexOf(true).toString(),
        PASSWORD: password,
        DEVICE_TOKEN: '',
        CATEGORY: joinRoute,
        other: otherJoinRoute,
      });
      if (data.message == 'SUCCESS') {
        dispatch(setSplashVisible({visible: false}));
        navigation.navigate('LogInScreen', {
          appVersion: utils.appVersion,
        });
        alertModal('회원가입이 완료되었습니다. 로그인해 주세요.');
      } else if (data.message === 'ALREADY_SUCCESS') {
        alertModal('이미 가입한 휴대폰번호입니다.');
        navigation.goBack();
        dispatch(setSplashVisible({visible: false}));
      } else if (data.message === 'SMSERROR') {
        alertModal('인증번호 오류입니다.');
        navigation.goBack();
        dispatch(setSplashVisible({visible: false}));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 비밀번호 입력 & length 제한 & 유효성검사
  const passwordCheckerFn = (text, isPasswordCheck) => {
    const reg1 = /^[A-Za-z0-9]*$/;
    const reg2 = /[0-9]/g;
    const reg3 = /[a-z]/gi;
    if (isPasswordCheck) {
      if (reg1.test(text)) {
        setPasswordCheck(text);
        setIsPasswordCheckError(false);
      } else {
        setIsPasswordCheckError(true);
      }
    } else {
      setPasswordCheck('');
      if (reg1.test(text)) {
        if (password.length < 5) {
          setPassword(text);
          setIsPasswordError(true);
        } else {
          if (
            (password.search(/[0-9]/g) < 0 &&
              reg3.test(text.charAt(text.length - 1))) ||
            (password.search(/[a-z]/gi) < 0 &&
              reg2.test(text.charAt(text.length - 1)))
          ) {
            setPassword(text);
            setIsPasswordError(true);
          } else {
            setPassword(text);
            setIsPasswordError(false);
          }
        }
      } else {
        setIsPasswordError(true);
      }
    }
  };

  // 가입경로 데이터
  const fetchData = async () => {
    const {data} = await api.help2();
    if (data.helparr.length > 0) {
      setHelparr(data.helparr);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SignupScreenPresenter
      alertModal={alertModal}
      mobileNo={mobileNo}
      name={name}
      confirmModal={confirmModal}
      password={password}
      passwordCheck={passwordCheck}
      positionTypeCheck={positionTypeCheck}
      setPositionTypeCheck={setPositionTypeCheck}
      genderTypeCheck={genderTypeCheck}
      setGenderTypeCheck={setGenderTypeCheck}
      helparr={helparr}
      joinRoute={joinRoute}
      setJoinRoute={setJoinRoute}
      otherJoinRoute={otherJoinRoute}
      setOtherJoinRoute={setOtherJoinRoute}
      setPassword={setPassword}
      setPasswordCheck={setPasswordCheck}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
      passwordCheckerFn={passwordCheckerFn}
      isPasswordError={isPasswordError}
      isPasswordCheckError={isPasswordCheckError}
      birthDate={birthDate}
      initBirthDate={initBirthDate}
      setBirthDate={setBirthDate}
      setInitBirthDate={setInitBirthDate}
      isBirthDateVisible={isBirthDateVisible}
      setIsBirthDateVisible={setIsBirthDateVisible}
      birthDateSet={birthDateSet}
      setBirthDateSet={setBirthDateSet}
      setName={setName}
    />
  );
};
