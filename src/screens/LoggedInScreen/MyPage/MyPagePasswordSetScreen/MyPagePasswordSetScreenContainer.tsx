import React, {useState, useEffect} from 'react';
import moment from 'moment';
import MyPagePasswordSetScreenPresenter from './MyPagePasswordSetScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {useNavigation} from '@react-navigation/native';
import SmsRetriever from 'react-native-sms-retriever';

let timer = null;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {MEMBER_SEQ, MOBILE_NO} = useSelector(
    (state: any) => state.userReducer,
  );
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );
  const [hasCheckedVerifyCode, setHasCheckedVerifyCode] = useState<boolean>(
    false,
  );
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('');
  const [isCountDownStarted, setIsCountDownStarted] = useState<boolean>(false);
  const [hasCheckedTimeOut, setHasCheckedTimeOut] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isPasswordCheckError, setIsPasswordCheckError] = useState<boolean>(
    false,
  );
  // Notification
  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onChangeVerifyCode = (text) => {
    setVerifyCode(text);
  };

  const submitFn = async () => {
    if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      return alertModal('숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.');
    }

    let checkNumber = password.search(/[0-9]/g);
    let checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      return alertModal('숫자와 영문자를 혼용하여야 합니다.');
    }
    if (/(\w)\1\1\1/.test(password)) {
      return alertModal('444같은 문자를 4번 이상 사용하실 수 없습니다.');
    }

    if (hasCheckedVerifyCode === false) {
      return alertModal('휴대폰번호 인증을 해주세요.');
    }

    try {
      const {data} = await api.changePwd({
        MobileNo: MOBILE_NO,
        MEMBER_SEQ,
        PASSWORD: password,
        SMS: verifyCode,
      });
      if (data.message == 'SMSERROR') {
        alertModal('인증번호 오류입니다.');
      } else {
        setHasCheckedVerifyCode(false);
        clearInterval(timer);
        alertModal('비밀번호가 변경 되었습니다.');
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };

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
        if (password.length < 6) {
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

  const startCountDown = () => {
    let duration = moment.duration(180000, 'milliseconds');
    setCountdown(
      '0' +
        duration.minutes().toString() +
        ':' +
        (duration.seconds() < 10 ? '0' : '') +
        duration.seconds().toString(),
    );
    const timer = setInterval(() => {
      if (duration.asSeconds() <= 0) {
        clearInterval(timer);
        setHasCheckedVerifyCode(false);
        setIsCountDownStarted(false);
        setHasCheckedTimeOut(true);
      }
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      setCountdown(
        '0' +
          duration.minutes().toString() +
          ':' +
          (duration.seconds() < 10 ? '0' : '') +
          duration.seconds().toString(),
      );
    }, 1000);
  };

  const requireVerifyCode = async () => {
    setVerifyCode('');
    setHasCheckedVerifyCode(true);
    setIsCountDownStarted(true);
    setHasCheckedTimeOut(false);
    startCountDown();
    try {
      const registered = await SmsRetriever?.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener((event) => {
          SmsRetriever.removeSmsListener();
        });
      }
      const {data} = await api.getSMS({
        PHONENUMBER: MOBILE_NO,
      });
      if (data.message == 'SUCCESS') {
        alertModal('인증번호를 발송하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
      SmsRetriever?.removeSmsListener();
    };
  });

  return (
    <MyPagePasswordSetScreenPresenter
      password={password}
      passwordCheck={passwordCheck}
      hasCheckedVerifyCode={hasCheckedVerifyCode}
      verifyCode={verifyCode}
      MOBILE_NO={MOBILE_NO}
      requireVerifyCode={requireVerifyCode}
      onChangeVerifyCode={onChangeVerifyCode}
      submitFn={submitFn}
      countdown={countdown}
      isCountDownStarted={isCountDownStarted}
      hasCheckedTimeOut={hasCheckedTimeOut}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
      setPassword={setPassword}
      setPasswordCheck={setPasswordCheck}
      isPasswordError={isPasswordError}
      isPasswordCheckError={isPasswordCheckError}
      passwordCheckerFn={passwordCheckerFn}
    />
  );
};
