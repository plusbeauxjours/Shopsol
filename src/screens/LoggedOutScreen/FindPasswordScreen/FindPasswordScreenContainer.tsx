import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import FindPasswordScreenPresenter from './FindPasswordScreenPresenter';
import api from '~/constants/LoggedOutApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';

let timer = null;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('');
  const [isCountDownStarted, setIsCountDownStarted] = useState<boolean>(false);
  const [hasCheckedTimeOut, setHasCheckTimeOut] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [hasCheckedVerifyCode, setHasCheckedVerifyCode] = useState<boolean>(
    false,
  );
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isPasswordCheckError, setIsPasswordCheckError] = useState<boolean>(
    false,
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onChangeMobileNum = (text) => {
    if (text.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNo(text);
    }
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
    try {
      navigation.goBack();
      const {data} = await api.findPwd({
        MobileNo: mobileNo,
        SMSNUMBER: verifyCode,
        PASSWORD: password,
      });
      if (data.resultcode == '1') {
        alertModal(data.result);
        navigation.goBack();
      } else if (data.resultcode == '2') {
        alertModal(data.result);
      } else {
        alertModal('정보가 정확하지 않습니다.');
      }
    } catch (e) {
      alertModal('연결에 실패하였습니다.');
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

  const onVerifyCode = async () => {
    if (verifyCode.length != 6) {
      clearInterval(timer);
      setIsVerified(true);
      setIsCountDownStarted(false);
    } else if (verifyCode.length != 6) {
      alertModal('인증번호를 정확히 입력해주세요.');
    } else {
      try {
        const {data} = await api.checkSMS({
          MobileNo: mobileNo,
          SMSNUMBER: verifyCode,
        });
        if (data.message == 'SUCCESS') {
          clearInterval(timer);
          setIsVerified(true);
          setIsCountDownStarted(false);
        } else {
          alertModal('인증번호가 맞지않습니다.');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChangeVerifyCode = (text) => {
    setVerifyCode(text);
  };

  const requireVerifyCode = async () => {
    if (mobileNo.length == 0) {
      alertModal('찾으실 휴대폰번호를 입력해주세요.');
      return;
    }
    const regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(mobileNo)) {
      alertModal('올바른 휴대폰번호 11자리를 입력해주세요.');
      return;
    }
    setHasCheckedVerifyCode(true);
    setIsCountDownStarted(true);
    setHasCheckTimeOut(false);
    startCountDown();
    try {
      const {data} = await api.getSMS({
        PHONENUMBER: mobileNo,
      });
      if (data.message == 'SUCCESS') {
        alertModal('인증번호를 발송하였습니다.');
      }
    } catch (e) {
      console.log(e);
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
        setHasCheckTimeOut(true);
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

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <FindPasswordScreenPresenter
      isCountDownStarted={isCountDownStarted}
      hasCheckedVerifyCode={hasCheckedVerifyCode}
      requireVerifyCode={requireVerifyCode}
      verifyCode={verifyCode}
      onChangeMobileNum={onChangeMobileNum}
      onChangeVerifyCode={onChangeVerifyCode}
      isVerified={isVerified}
      passwordCheck={passwordCheck}
      mobileNo={mobileNo}
      submitFn={submitFn}
      hasCheckedTimeOut={hasCheckedTimeOut}
      onVerifyCode={onVerifyCode}
      countdown={countdown}
      password={password}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
      passwordCheckerFn={passwordCheckerFn}
      isPasswordError={isPasswordError}
      isPasswordCheckError={isPasswordCheckError}
      setPassword={setPassword}
      setPasswordCheck={setPasswordCheck}
    />
  );
};
