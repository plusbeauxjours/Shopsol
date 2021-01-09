import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import AddTaskScreenPresenter from './AddTaskScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {setSplashVisible} from '~/redux/splashSlice';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const taskDataImgTempList = [];
  const taskDataTempList = [];

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDate, setTaskDate] = useState<any>(moment());
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

  const addFn = () => {
    if (taskName == '') {
      return alertModal('상품명을 입력해주세요.');
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
        return alertModal('같은 일자에 동일한 상품이 작성되어 있습니다.');
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
    setTaskDateSet(false);
    setTaskMemo('');
    setList(buffer);
  };

  const deleteBuffer = (name, date) => {
    setTimeout(() => {
      setList((buffer) =>
        buffer.filter(
          (item) => item.taskNAME !== name || item.taskDATE !== date,
        ),
      );
    }, 200);
  };

  const setTaskDataImgList = (i) => {
    const formData: any = new FormData();
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
    formData.append('taskIMAGE', {
      uri: utils.isAndroid ? i.taskIMAGE : i.taskIMAGE.replace('file://', ''),
      name: fileName,
      type: fileType,
    });
    taskDataImgTempList.push(formData);
  };

  const submitFn = async () => {
    if (list.length == 0) {
      return alertModal('등록하실 상품을 목록에 추가하신 후 등록을 해주세요.');
    }
    list.map((i) =>
      i.taskIMAGE ? setTaskDataImgList(i) : taskDataTempList.push(i),
    );
    dispatch(setSplashVisible(true));
    navigation.goBack();
    if (taskDataImgTempList.length > 0) {
      try {
        const {data} = await api.setTaskDataImg({
          STORE_SEQ,
          LIST: taskDataImgTempList,
        });
        await params?.fetchData();
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        } else {
          alertModal('등록이 완료되었습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
    if (taskDataTempList.length > 0) {
      try {
        const {data} = await api.setTaskData({
          STORE_SEQ,
          LIST: taskDataTempList,
        });
        await params?.fetchData();
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        } else {
          alertModal('등록이 완료되었습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

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
      .then((response) => {
        setCameraPictureLast(response.uri);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const launchImageLibraryFn = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
        maxHeight: 1200,
      },
      (response) => {
        !response.didCancel && setCameraPictureLast(response.uri);
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
      setTaskDate={setTaskDate}
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
