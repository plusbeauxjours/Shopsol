import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import {updateTASK_DATA, removeTASK_DATA} from '~/redux/taskSlice';
import TaskUpdateScreenPresenter from './TaskUpdateScreenPresenter';
import utils from '~/constants/utils';
import {setSplashVisible} from '~/redux/splashSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const task_SEQ = params?.task_SEQ || '';
  const [taskName, setTaskName] = useState<string>(params?.taskName || '');
  const [taskMemo, setTaskMemo] = useState<string>(params?.taskMemo || '');
  const [taskDate, setTaskDate] = useState<any>(moment(params?.taskDate));
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(
    params?.taskImage || '',
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteModal = (title, text) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      okCallback: () => {
        deleteTask();
      },
      okButtonText: '삭제',
      cancelButtonText: '취소',
      warning: 'yes',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteTask = async () => {
    try {
      alertModal('업무를 삭제하였습니다.');
      navigation.goBack();
      dispatch(removeTASK_DATA({name: params?.name, task_SEQ}));
      await api.deleteTaskData({task_SEQ});
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    if (taskName == '') {
      alertModal('수정할 업무명을 입력해주세요.');
    }
    if (cameraPictureLast?.length === 0) {
      try {
        navigation.goBack();
        alertModal('수정이 완료되었습니다.');
        dispatch(
          updateTASK_DATA({
            name: params?.name,
            task_SEQ,
            taskName,
            taskDate: moment(taskDate).format('YYYY-MM-DD'),
            taskMemo,
          }),
        );
        const {data} = await api.updateTaskData({
          task_SEQ,
          taskNAME: taskName,
          taskDATE: moment(taskDate).format('YYYY-MM-DD'),
          taskMEMO: taskMemo,
        });
        await params?.fetchData();
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      const formData: any = new FormData();
      formData.append('task_SEQ', task_SEQ);
      formData.append('taskNAME', taskName);
      formData.append('taskDATE', moment(taskDate).format('YYYY-MM-DD'));
      formData.append('taskMEMO', taskMemo);

      const fileInfoArr = cameraPictureLast.split('/');
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
          ? cameraPictureLast
          : cameraPictureLast.replace('file://', ''),
        name: fileName,
        type: fileType,
      });

      try {
        navigation.goBack();
        alertModal('수정이 완료되었습니다.');
        await params?.fetchData();
        dispatch(
          updateTASK_DATA({
            name: params?.name,
            task_SEQ,
            taskName,
            taskDate: moment(taskDate).format('YYYY-MM-DD'),
            taskMemo,
          }),
        );
        const {data} = await api.updateTaskDataImg(formData);
        console.log(data);
        if (data.result == '0') {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible({visible: false}));
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
    <TaskUpdateScreenPresenter
      deleteModal={deleteModal}
      cameraPictureLast={cameraPictureLast}
      setCameraPictureLast={setCameraPictureLast}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      taskName={taskName}
      setTaskName={setTaskName}
      taskDate={taskDate}
      setTaskDate={setTaskDate}
      taskMemo={taskMemo}
      setTaskMemo={setTaskMemo}
      takePictureFn={takePictureFn}
      launchImageLibraryFn={launchImageLibraryFn}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      submit={submit}
      alertModal={alertModal}
    />
  );
};
