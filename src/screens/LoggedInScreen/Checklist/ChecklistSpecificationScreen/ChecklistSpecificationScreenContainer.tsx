import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import ChecklistSpecificationScreenPresenter from './ChecklistSpecificationScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {getCHECKLIST_DATA} from '~/redux/checklistSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE, MEMBER_SEQ, MEMBER_NAME} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const {
    data: {
      CHECK_SEQ = null,
      TITLE = null,
      END_TIME = null,
      CS_SEQ = null,
      EMP_NAME = null,
      CHECK_TIME = null,
      CHECK_DATE = null,
      PHOTO_CHECK = null,
      NAME = null,
      IMAGE_LIST = [],
      CHECK_TYPE = null,
      EMP_SEQ = null,
    } = {},
    scan,
  } = params;

  // FROM MODAL EDITABLE
  // {
  //   "scan": "1"
  //   "data": {
  //     "CHECK_DATE": "2020-09-08",
  //     "CHECK_LIST": "제품 유통기한 확인@2@빠진 제품 채우기@2@테이블 쳥결 유지@2@커피머신 확인(원두,찌꺼기통)@1@......",
  //     "CHECK_SEQ": "2677",
  //     "CHECK_TIME": "2020-09-08 01:20:49",
  //     "CHECK_TITLE": "Gigi",
  //     "CHECK_TYPE": "0",
  //     "CREATE_TIME": "2020-06-22 14:56:05",
  //     "CS_SEQ": "7165",
  //     "EMP_NAME": "직원5",
  //     "EMP_SEQ": null,
  //     "END_TIME": "20:00",
  //     "IMAGE_LIST": "af35a086-a003-4c72-a801-a8c221caa89e-1599495627189.jpg",
  //     "LIST": "제품 유통기한 확인@@빠진 제품 채우기@@테이블 쳥결 유지@@커피머신 확인(원두,찌꺼기통)@@택배 주변 정리@@.....",
  //     "NAME": null,
  //     "PHOTO_CHECK": "1",
  //     "QRURL": "",
  //     "QR_SEQ": "2",
  //     "START_DATE": "2020-06-22",
  //     "TITLE": "관리(1)",
  //     "UPDATE_TIME": "2020-07-02 21:16:06"
  //   },
  // }

  // FROM CARD NONEDITABLE
  // {
  //   "scan": 0
  //   "data": {
  //     "CHECK_DATE": null,
  //     "CHECK_LIST": null,
  //     "CHECK_SEQ": "2677",
  //     "CHECK_TIME": null,
  //     "CHECK_TITLE": null,
  //     "CHECK_TYPE": "0",
  //     "CREATE_TIME": "2020-06-22 14:56:05",
  //     "CS_SEQ": null,
  //     "EMP_NAME": null,
  //     "EMP_SEQ": null,
  //     "END_TIME": "20:00",
  //     "IMAGE_LIST": null,
  //     "LIST": "제품 유통기한 확인@@빠진 제품 채우기@@테이블 쳥결 유지@@커피머신 확인(원두,찌꺼기통)@@택배 주변 정리.....",
  //     "NAME": null,
  //     "PHOTO_CHECK": "1",
  //     "QRURL": "",
  //     "QR_SEQ": "2",
  //     "START_DATE": "2020-06-22",
  //     "TITLE": "관리(1)",
  //     "UPDATE_TIME": "2020-07-02 21:16:06"
  //   },
  // }

  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [LIST, setLIST] = useState<any>([]);
  const [checklistGoodState, setChecklistGoodState] = useState<any>(
    new Array(params?.data.LIST.split('@@').length),
  );
  const [checklistBadState, setChecklistBadState] = useState<any>(
    new Array(params?.data.LIST.split('@@').length),
  );
  const [CHECK_TITLE, setCHECK_TITLE] = useState<string>(
    params?.scan === '1' ? null : params?.data?.CHECK_TITLE,
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onPressImageFn = (item) => {
    setCameraPictureList(
      cameraPictureList.filter(
        (cameraPictureItem) => cameraPictureItem.uri !== item.uri,
      ),
    );
  };

  const launchImageLibraryFn = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 720,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
    }).then((images: any) => {
      images.map((i) => {
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: i.path},
        ]);
      });
    });
  };

  const takePictureFn = async (cameraRef) => {
    const options = {quality: 0.8, base64: true, width: 720, height: 720};
    const data = await cameraRef.current.takePictureAsync(options);
    setCameraPictureLast(data.uri);
  };

  const gotoChecklistAdd = () => {
    navigation.navigate('ChecklistAddScreen', {
      CHECK_SEQ,
      PHOTO_CHECK,
      NAME,
      DATE: CHECK_DATE,
      CHECK_TITLE: TITLE,
      CHECK_LIST: LIST,
      CHECK_TIME: END_TIME,
      type: '수정',
      EMP_SEQ,
    });
  };

  const registerFn = async () => {
    let newList = [];
    let badflag = false;

    for (let i = 0; i < LIST?.length; i++) {
      newList.push(LIST[i]);
      if (checklistGoodState[i]) {
        newList.push('1');
      }
      if (checklistBadState[i]) {
        newList.push('2');
        badflag = true;
      }
      if (checklistGoodState[i] === false && checklistBadState[i] === false) {
        return alertModal('체크리스트 항목을 모두 체크해주세요.');
      }
    }
    if (badflag === true && CHECK_TITLE == null) {
      return alertModal('체크리스트 항목에 이상이 있을시 메모를 입력해주세요.');
    }
    if (Number(PHOTO_CHECK || 0) === 1 && cameraPictureList.length === 0) {
      return alertModal('체크리스트 관련 사진을 등록해주세요.');
    }

    if (Number(PHOTO_CHECK || 0) === 1) {
      try {
        dispatch(setSplashVisible(true));
        const formData: any = new FormData();

        formData.append('LIST', JSON.stringify(newList));
        formData.append('CHECK_TITLE', CHECK_TITLE);
        formData.append('CHECK_SEQ', CHECK_SEQ);
        formData.append('NAME', MEMBER_NAME);
        formData.append('CS_SEQ', CS_SEQ);
        formData.append('STORE_SEQ', STORE_SEQ);
        formData.append('MEMBER_SEQ', MEMBER_SEQ);

        for (let i = 0; i < cameraPictureList.length; i++) {
          const cameraPicture = cameraPictureList[i];
          const fileInfoArr = cameraPicture.uri.split('/');
          const fileInfo = fileInfoArr[fileInfoArr.length - 1];
          const extensionIndex = fileInfo.indexOf('.');
          let fileName = fileInfo;
          let fileType = '';
          if (extensionIndex > -1) {
            fileName = fileInfo;
            fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;
            if (fileType === 'image/jpg') {
              fileType = 'image/jpeg';
            }
          }
          formData.append('image', {
            uri: utils.isAndroid
              ? cameraPicture.uri
              : cameraPicture.uri.replace('file://', ''),
            name: fileName,
            type: fileType,
          });
        }
        const {data} = await api.setCheckListImg2(formData);
        if (data.result === 'SUCCESS') {
          alertModal('체크가 완료되었습니다.');
          dispatch(getCHECKLIST_DATA(params?.data.CHECK_DAT));
        }
      } catch (e) {
        alertModal('연결에 실패하였습니다.');
        dispatch(setSplashVisible(false));
        console.log(e);
      } finally {
        navigation.goBack();
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(getCHECKLIST_DATA(params?.data.CHECK_DAT));
        navigation.goBack();
        alertModal('체크가 완료되었습니다.');
        const {data} = await api.setCheckList2({
          LIST: JSON.stringify(newList),
          CHECK_TITLE,
          CHECK_SEQ,
          NAME: MEMBER_NAME,
          CS_SEQ,
          STORE_SEQ,
          MEMBER_SEQ,
        });
      } catch (e) {
        console.log(e);
        alertModal('연결에 실패하였습니다.');
        navigation.goBack();
      }
    }
  };

  // 체크리스트 ON/OFF
  const initialize = async () => {
    let checklistGoodStat = checklistGoodState;
    let checklistBadStat = checklistBadState;
    let checklist = params?.data.CHECK_LIST;
    let list = params?.data.LIST;
    checklistGoodStat.fill(false);
    checklistBadStat.fill(false);
    if (params?.data.CHECK_LIST) {
      checklist = params?.data.CHECK_LIST.split('@');
      const size = checklist.length / 2;
      list = new Array();
      checklist = params?.data.CHECK_LIST.split('@');
      for (var i = 0; i < size; i++) {
        var checktemp = 2 * i;
        list[i] = checklist[checktemp];
        var temp = 2 * i + 1;
        if (checklist[temp] === '1') {
          checklistGoodStat[i] = true;
        }
        if (checklist[temp] === '2') {
          checklistBadStat[i] = true;
        }
      }
    } else {
      list = params?.data.LIST.split('@@');
      list[list.length - 1] = list[list.length - 1].replace('@', '');
    }
    setChecklistGoodState(checklistGoodStat);
    setChecklistBadState(checklistBadStat);
    setLIST(list);
    if (cameraPictureList?.length === 0 && IMAGE_LIST) {
      const allimg = IMAGE_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: `http://133.186.210.223/uploads/${allimg[i]}`},
        ]);
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ChecklistSpecificationScreenPresenter
      scan={scan}
      gotoChecklistAdd={gotoChecklistAdd}
      CHECK_TITLE={CHECK_TITLE}
      setCHECK_TITLE={setCHECK_TITLE}
      TITLE={TITLE}
      LIST={LIST}
      NAME={NAME}
      STORE={STORE}
      CHECK_TIME={CHECK_TIME}
      PHOTO_CHECK={PHOTO_CHECK}
      END_TIME={END_TIME}
      EMP_NAME={EMP_NAME}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      checklistGoodState={checklistGoodState}
      setChecklistGoodState={setChecklistGoodState}
      checklistBadState={checklistBadState}
      setChecklistBadState={setChecklistBadState}
      onPressImageFn={onPressImageFn}
      launchImageLibraryFn={launchImageLibraryFn}
      registerFn={registerFn}
      takePictureFn={takePictureFn}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      cameraPictureList={cameraPictureList}
      setCameraPictureList={setCameraPictureList}
    />
  );
};
