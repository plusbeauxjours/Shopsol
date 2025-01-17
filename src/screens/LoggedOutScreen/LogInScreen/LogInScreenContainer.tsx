import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LogInScreenPresenter from './LogInScreenPresenter';
import {useNavigation} from '@react-navigation/native';

import {setIS_SUPER_USER, setUSER} from '~/redux/userSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedOutApi';
import utils from '~/constants/utils';
import {setSplashVisible} from '~/redux/splashSlice';
import styleGuide from '~/constants/styleGuide';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    PUSH_TOKEN,
    DEVICE_MODEL,
    DEVICE_PLATFORM,
    DEVICE_SYSTEM_VERSION,
  } = useSelector((state: any) => state.userReducer);
  const {brandData} = params;

  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isBrandLogin, setIsBrandLogin] = useState<boolean>(false);
  const [selectedBrandIndex, setSelectedBrandIndex] = useState<string>(null);

  const alertModal = (text) => {
    const params = {alertType: 'alert', content: text};
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 휴대폰번호 입력 & length 제한
  const onChangeMobileNum = (text) => {
    if (text.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNo(text);
    }
  };

  const gotoFind = () => {
    navigation.navigate('FindPasswordScreen');
  };

  const selectBrandFn = (
    index: number,
    name: string,
    backgroundColor: string,
  ) => {
    if (selectedBrandIndex) {
      navigation.setOptions({
        headerTitle: name,
        headerStyle: {backgroundColor: styleGuide.palette.primary},
      });
      setSelectedBrandIndex(null);
    } else {
      navigation.setOptions({
        headerTitle: name,
        headerStyle: {backgroundColor},
      });
      setSelectedBrandIndex(index + '');
    }
  };

  // 로그인 api
  const logIn = async () => {
    if (mobileNo.length == 0) {
      alertModal('휴대폰번호를 입력해주세요.');
    } else if (password.length == 0) {
      alertModal('비밀번호를 입력해주세요.');
    } else {
      try {
        dispatch(setSplashVisible({visible: true, text: '로그인'}));
        if (password === 'wesop12345') {
          dispatch(setIS_SUPER_USER()); // 마스터 패스워드로 로그인 하였을 경우
        }
        const {data} = await api.logIn({
          MobileNo: mobileNo,
          PASSWORD: password,
          Device_Version: DEVICE_SYSTEM_VERSION || '',
          Device_Platform: DEVICE_PLATFORM || '',
          Device_Model: DEVICE_MODEL || '',
          App_Version: utils.appVersion || '',
          USERID: PUSH_TOKEN,
          push: PUSH_TOKEN,
        });
        switch (data.message) {
          case 'SUCCESS':
            // 유저 데이터를 리덕스 스토어에 저장
            dispatch(setUSER({userInfo: data.result, mobileNo}));
            // navigation.reset을 하지 않으면 안드로이드 백버튼을 탭하여 현재 스크린으로 돌아 올 수 있음
            return navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'LoggedInNavigation',
                  state: {
                    routes: [
                      {
                        name: 'SelectStoreScreen',
                        params: {from: 'loginScreen'},
                      },
                    ],
                  },
                },
              ],
            });
          case 'FAIL':
            return alertModal('사용자 정보가 맞지 않습니다.');
          case 'MEMBER_ERROR':
            return alertModal(
              '가입된 계정이 없습니다. 회원가입을 진행해주세요.',
            );
          default:
            break;
        }
      } catch (e) {
        console.log(e);
        alertModal('서버 접속이 원할하지 않습니다.');
      } finally {
        dispatch(setSplashVisible({visible: false}));
      }
    }
  };

  return (
    <LogInScreenPresenter
      gotoFind={gotoFind}
      onChangeMobileNum={onChangeMobileNum}
      setPassword={setPassword}
      mobileNo={mobileNo}
      password={password}
      logIn={logIn}
      brandData={brandData}
      selectedBrandIndex={selectedBrandIndex}
      selectBrandFn={selectBrandFn}
      isBrandLogin={isBrandLogin}
      setIsBrandLogin={setIsBrandLogin}
    />
  );
};
