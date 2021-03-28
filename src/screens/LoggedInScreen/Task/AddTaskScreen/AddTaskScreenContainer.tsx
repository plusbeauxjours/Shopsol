import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import AddTaskScreenPresenter from './AddTaskScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import ImagePicker from 'react-native-image-crop-picker';
import * as IOSImagePicker from 'react-native-image-picker';

import ImageResizer from 'react-native-image-resizer';
import {setSplashVisible, setLoadingVisible} from '~/redux/splashSlice';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const taskDataTempList = [];

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDate, setTaskDate] = useState<any>(moment());
  const [initTaskDate, setInitTaskDate] = useState<any>(moment());
  const [taskDateSet, setTaskDateSet] = useState<boolean>(false);
  const [taskMemo, setTaskMemo] = useState<string>('');
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );

  const alertModal = (text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      content: text,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 목록에 추가하기 버튼
  const addFn = () => {
    if (taskName == '') {
      return alertModal('업무명을 입력해주세요.');
    }
    if (!taskDateSet) {
      return alertModal('기한을 입력해주세요.', () =>
        setIsDateModalVisible(true),
      );
    }
    for (let i = 0; i < list.length; i++) {
      if (
        taskName == list[i].taskNAME &&
        moment(taskDate).format('YYYY-MM-DD') == list[i].taskDATE
      ) {
        return alertModal('같은 일자에 동일한 업무가 작성되어 있습니다.');
      }
    }
    let buffer = list;
    buffer.unshift({
      taskNAME: taskName,
      taskDATE: moment(taskDate).format('YYYY-MM-DD'),
      taskMEMO: taskMemo,
      taskIMAGE: cameraPictureLast,
    });
    setCameraPictureLast(null);
    setTaskName('');
    setTaskDate(moment());
    setInitTaskDate(moment());
    setTaskDateSet(false);
    setTaskMemo('');
    setList(buffer);
  };

  // 업무 목록에서 제거
  const deleteBuffer = (name, date) => {
    setTimeout(() => {
      setList((buffer) =>
        buffer.filter(
          (item) => item.taskNAME !== name || item.taskDATE !== date,
        ),
      );
    }, 200);
  };

  // 이미지가 있는 업무 등록
  const taskDataImg = async (i, taskSTORE_SEQ) => {
    try {
      dispatch(setLoadingVisible(true));
      const formData: any = new FormData();
      formData.append('STORE_SEQ', taskSTORE_SEQ);
      formData.append('taskDATE', i.taskDATE);
      formData.append('taskMEMO', i.taskMEMO);
      formData.append('taskNAME', i.taskNAME);

      const fileInfoArr = i.taskIMAGE.split('/');
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
        uri: utils.isAndroid ? i.taskIMAGE : i.taskIMAGE.replace('file://', ''),
        name: fileName,
        type: fileType,
      });

      const {data} = await api.setTaskDataImg(formData);
      if (data.result == '0') {
        alertModal('연결에 실패하였습니다.');
      } else {
        dispatch(setLoadingVisible(false));
      }
    } catch (e) {
      console.log(e);
      alertModal('연결에 실패하였습니다.');
    } finally {
      dispatch(setLoadingVisible(false));
    }
  };

  // 업무 등록 (이미지가 있는 업무 등록 & 이미지가 없는 업무 등록)
  const submitFn = async () => {
    if (list.length == 0) {
      return alertModal('등록하실 업무를 목록에 추가하신 후 등록을 해주세요.');
    }
    try {
      // 로딩스피너
      dispatch(
        setSplashVisible({
          visible: true,
          fullText: '업무를 등록중입니다.',
        }),
      );
      // 이미지가 없는 업무는 리스트를 파라미터로 받기 때문에 빈리스트에 푸시
      list.map((i, index) => !i.taskIMAGE && taskDataTempList.push(i));
      // 이미지가 없는 업무 리퀘스트
      if (taskDataTempList.length > 0) {
        const {data} = await api.setTaskData({
          STORE_SEQ,
          LIST: taskDataTempList,
        });
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        } else {
          alertModal('등록이 완료되었습니다.');
        }
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      navigation.goBack();
      // 이미지가 있는 업무는 업무하나에 리퀘스트 하나를 보내기때문에 시간이 오래걸림
      // 그 동안 리프레쉬를 하여서 이미지가 없는 업무를 등록한 것을 렌더
      dispatch(setSplashVisible({visible: false}));
      // 루프를 돌면서 이미지가 있는 업무를 등록
      list.map((i, index) => {
        if (list.length - 1 == index) {
          params?.onRefresh();
        }
        i.taskIMAGE && taskDataImg(i, STORE_SEQ);
      });
    }
  };

  // 카메라로 사진 촬영 후 압축
  const takePictureFn = async (cameraRef) => {
    const data = await cameraRef.current.takePictureAsync();
    return ImageResizer.createResizedImage(
      data.uri,
      800,
      1200,
      'JPEG',
      100,
      0,
      null,
      true,
    )
      .then((res) => {
        setCameraPictureLast(res.uri);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 디바이스의 앨범에서 사진 선택 후 압축
  // 이미지 등록에 이슈가 있어서 플랫폼에 따라 다른 라이브러리를 사용 중
  // 오랜 삽질을 거쳐서 최적화됨
  const launchImageLibraryFn = () => {
    utils.isAndroid()
      ? ImagePicker.openPicker({
          multiple: false,
          forceJpg: true,
          mediaType: 'photo',
          compressImageMaxWidth: 800,
          compressImageMaxHeight: 1200,
        }).then((res: any) => {
          if (res) {
            setCameraPictureLast(res.path);
          }
        })
      : IOSImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 1200,
          },
          (res) => {
            !res.didCancel && setCameraPictureLast(res.uri);
          },
        );
  };

  return (
    <AddTaskScreenPresenter
      addFn={addFn}
      explainModal={explainModal}
      deleteBuffer={deleteBuffer}
      submitFn={submitFn}
      list={list}
      taskName={taskName}
      setTaskName={setTaskName}
      taskMemo={taskMemo}
      setTaskMemo={setTaskMemo}
      taskDate={taskDate}
      initTaskDate={initTaskDate}
      setTaskDate={setTaskDate}
      setInitTaskDate={setInitTaskDate}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      takePictureFn={takePictureFn}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      launchImageLibraryFn={launchImageLibraryFn}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      alertModal={alertModal}
      taskDateSet={taskDateSet}
      setTaskDateSet={setTaskDateSet}
    />
  );
};
