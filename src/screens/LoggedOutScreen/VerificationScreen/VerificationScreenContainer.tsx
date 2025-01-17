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

  const [mobileNo, setMobileNo] = useState<string>(''); // 입력하는 휴대폰 번호
  const [verifyCode, setVerifyCode] = useState<string>(''); // 입력하는 인증 번호
  const [countdown, setCountdown] = useState<string>(''); // 카운트다운
  const [isCountDownStarted, setIsCountDownStarted] = useState<boolean>(false); // 카운트다운 시작 여부
  const [hasCheckTimeOut, setHasCheckTimeOut] = useState<boolean>(false); // 카운트다운 종료 여부
  const [isVerified, setIsVerified] = useState<boolean>(false); // 인증성공 여부
  const [policyCheck, setPolicyCheck] = useState<boolean>(false); // 약관 동의
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

  // 인증번호를 발송하고 나면 카운트다운이 시작
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
        setVerifyCode('');
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

  // 인증번호 인증을 위한 api
  const onVerifyCode = async () => {
    if (verifyCode?.length != 6) {
      clearInterval(timer);
      setIsCountDownStarted(false);
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

  // 휴대폰번호 입력 & length 제한
  const onChangeMobileNum = (text) => {
    if (text?.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNo(text);
    }
  };

  // 인증번호 입력 & length 제한
  const onChangeVerifyNum = (text) => {
    if (text?.length > 6) {
      alertModal('인증번호는 최대 6자리 입력 가능합니다.');
    } else {
      setVerifyCode(text);
    }
  };

  // 인증번호 발송을 위한 api
  const requireVerifyCode = async () => {
    if (mobileNo?.length == 0) {
      return alertModal('휴대폰번호를 입력해주세요.');
    }
    const regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(mobileNo)) {
      return alertModal('올바른 휴대폰번호 11자리를 입력해주세요.');
    }

    try {
      const registered = await SmsRetriever?.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener((event) => {
          SmsRetriever.removeSmsListener();
        });
      }
      const {data} = await api.getSMS({
        PHONENUMBER: mobileNo,
        SIGNUP: '1', // 회원가입시 '1'입력
      });
      if (data.message == 'ALREADY_SUCCESS') {
        alertModal('이미 가입한 휴대폰번호입니다.');
      } else if (data.message == 'SUCCESS') {
        alertModal('인증번호를 발송하였습니다.');
        setHasCheckedVerifyCode(true);
        setIsCountDownStarted(true);
        setHasCheckTimeOut(false);
        startCountDown();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 약관스크린으로 이동
  const gotoPolicy = () => {
    navigation.navigate('WebViewScreen', {
      uri: 'https://www.notion.so/wesop/d13606c443f843d69fdb2c8e8e84ad1b',
      text: '샵솔 약관을 불러오는 중입니다.',
      title: '샵솔 약관',
    });
  };

  // 인증 완료후 다음단계인 회원가입스크린으로 이동
  const gotoSignup = () => {
    setVerifyCode('');
    setCountdown('');
    setIsCountDownStarted(false);
    setHasCheckTimeOut(false);
    setIsVerified(false);
    setHasCheckedVerifyCode(false);
    navigation.navigate('SignupScreen', {mobileNo, verifyCode});
  };

  // 약관 동의를
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
      gotoPolicy={gotoPolicy}
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
