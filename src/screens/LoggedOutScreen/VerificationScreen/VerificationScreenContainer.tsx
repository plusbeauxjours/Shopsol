import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import SmsRetriever from 'react-native-sms-retriever';

import VerificationScreenPresenter from './VerificationScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedOutApi';

let timer = null;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [mobileNo, setMobileNo] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('');
  const [isCountDownStarted, setIsCountDownStarted] = useState<boolean>(false);
  const [hasCheckTimeOut, setHasCheckTimeOut] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [policyCheck, setPolicyCheck] = useState<boolean>(false);
  const [hasCheckedVerifyCode, setHasCheckedVerifyCode] = useState<boolean>(
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

  const onVerifyCode = async () => {
    if (verifyCode == '369369') {
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

  const onChangeMobileNum = (text) => {
    if (text.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNo(text);
    }
  };

  const onChangeVerifyNum = (text) => {
    if (text.length > 6) {
      alertModal('인증번호는 최대 6자리 입력 가능합니다.');
    } else {
      setVerifyCode(text);
    }
  };

  const requireVerifyCode = async () => {
    if (mobileNo.length == 0) {
      return alertModal('휴대폰번호를 입력해주세요.');
    }
    const regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(mobileNo)) {
      return alertModal('올바른 휴대폰번호 11자리를 입력해주세요.');
    }
    setHasCheckedVerifyCode(true);
    setIsCountDownStarted(true);
    setHasCheckTimeOut(false);
    startCountDown();
    try {
      const registered = await SmsRetriever?.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener((event) => {
          SmsRetriever.removeSmsListener();
        });
      }
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

  const gotoSignup = () => {
    navigation.navigate('SignupScreen', {mobileNo, verifyCode});
  };

  const togglePolicyCheck = () => {
    if (policyCheck) {
      setMobileNo('');
      setVerifyCode('');
      setCountdown('');
      setIsCountDownStarted(false);
      setHasCheckTimeOut(false);
      setIsVerified(false);
      setPolicyCheck(false);
      setHasCheckedVerifyCode(false);
    } else {
      setPolicyCheck(true);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
      SmsRetriever?.removeSmsListener();
    };
  });

  useEffect(() => {
    (async () => {
      (await DeviceInfo?.getPhoneNumber()) !== 'unknown' &&
        setMobileNo(await DeviceInfo.getPhoneNumber());
    })();
  }, []);

  return (
    <VerificationScreenPresenter
      verifyCode={verifyCode}
      mobileNo={mobileNo}
      gotoSignup={gotoSignup}
      onChangeMobileNum={onChangeMobileNum}
      onChangeVerifyNum={onChangeVerifyNum}
      requireVerifyCode={requireVerifyCode}
      onVerifyCode={onVerifyCode}
      countdown={countdown}
      isCountDownStarted={isCountDownStarted}
      hasCheckedVerifyCode={hasCheckedVerifyCode}
      hasCheckTimeOut={hasCheckTimeOut}
      isVerified={isVerified}
      policyCheck={policyCheck}
      togglePolicyCheck={togglePolicyCheck}
    />
  );
};
