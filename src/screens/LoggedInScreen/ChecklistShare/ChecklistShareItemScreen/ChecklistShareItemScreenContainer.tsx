import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import analytics from '@react-native-firebase/analytics';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedInApi';
import ChecklistShareItemScreenPresenter from './ChecklistShareItemScreenPresenter';
import moment from 'moment';
import {
  getCHECKLIST_COMMENTS,
  addCHECKLIST_SHARE_COMMENTS,
  editCHECKLIST_SHARE_COMMENTS,
  deleteCHECKLIST_SHARE_COMMENTS,
} from '~/redux/checklistshareSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const {TITLE, NOTICE_SEQ, isFavorite} = params;

  const {STORE, MEMBER_SEQ: ME, MEMBER_NAME, AVATAR, GENDER} = useSelector(
    (state: any) => state.userReducer,
  );
  const {
    IS_BIG_FONT,
    CHECKLIST_SHARE_COMMENTS,
    CHECKLIST_SHARE_DATA1,
    CHECKLIST_SHARE_DATA2,
  } = useSelector((state: any) => state.checklistshareReducer);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [commentInputBox, setCommentInputBox] = useState<boolean>(false);
  const [selectedCOM_SEQ, setSelectedCOM_SEQ] = useState<string>('');
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [imgarr, setImgarr] = useState<any>([]);
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [item, setItem] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [isAddedToastVisible, setIsAddedToastVisible] = useState<boolean>(
    false,
  );
  const [isUpdatedToastVisible, setIsUpdatedToastVisible] = useState<boolean>(
    false,
  );
  const [isRemovedToastVisible, setIsRemovedToastVisible] = useState<boolean>(
    false,
  );

  const confirmModal = (selectedCOM_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '댓글을 삭제하시겠습니까?',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => {
        setComment('');
        deleteFn(selectedCOM_SEQ);
        setIsEditMode(false);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const addedToastFn = () => {
    clearTimeout();
    setTimeout(() => {
      setIsAddedToastVisible(true);
    }, 50);
    setTimeout(() => {
      setIsAddedToastVisible(false);
    }, 1500);
  };

  const updatedToastFn = () => {
    clearTimeout();
    setTimeout(() => {
      setIsUpdatedToastVisible(true);
    }, 50);
    setTimeout(() => {
      setIsUpdatedToastVisible(false);
    }, 1500);
  };

  const removedToastFn = () => {
    clearTimeout();
    setIsRemovedToastVisible(true);
    setTimeout(() => {
      setIsRemovedToastVisible(false);
    }, 1000);
  };

  const editFn = async () => {
    if (comment == '') {
      return alertModal('댓글을 입력해주세요.');
    }
    try {
      setCommentInputBox(false);
      setComment('');
      setSelectedCOM_SEQ('');
      dispatch(editCHECKLIST_SHARE_COMMENTS({selectedCOM_SEQ, comment}));
      updatedToastFn();
      const {data} = await api.editNoticeComment(selectedCOM_SEQ, comment);
      if (data.message !== 'SUCCESS') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFn = async (selectedCOM_SEQ) => {
    try {
      clearTimeout();
      setTimeout(() => {
        dispatch(deleteCHECKLIST_SHARE_COMMENTS(selectedCOM_SEQ));
      }, 50);
      removedToastFn();
      const {data} = await api.delNoticeComment(selectedCOM_SEQ);
      if (data.message !== 'SUCCESS') {
        alertModal('연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const registFn = async () => {
    if (comment == '') {
      return alertModal('댓글을 입력해주세요.');
    }
    try {
      setCommentInputBox(false);
      dispatch(
        addCHECKLIST_SHARE_COMMENTS({
          IMAGE: AVATAR,
          COM_SEQ: Math.ceil(Math.random() * 10000000),
          CONTENTS: comment,
          CREATE_TIME: moment().format('YYYY-MM-DD'),
          EMP_NAME: MEMBER_NAME,
          IS_MANAGER: STORE == '1' ? '사업주' : '직원',
          MEMBER_SEQ: ME.toString(),
          NOTICE_SEQ: NOTICE_SEQ.toString(),
        }),
      );

      addedToastFn();
      const {data} = await api.setNoticeComment(
        NOTICE_SEQ,
        MEMBER_NAME,
        comment.replace(/\n/gi, '%0A'),
        STORE,
        ME,
      );
      if (data.message === 'SUCCESS') {
        setComment('');
        dispatch(getCHECKLIST_COMMENTS(NOTICE_SEQ, TITLE));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchImage = (item) => {
    let imgarr = [];
    let modalImgarr = [];
    if (item?.IMG_LIST != null) {
      let allimg = item?.IMG_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        imgarr.push(allimg[i]);
        modalImgarr.push({
          url: `${allimg[i]}`,
        });
      }
      setModalImgarr(modalImgarr);
      setImgarr(imgarr);
    }
  };

  const fetchData = async () => {
    if (TITLE === '지시사항') {
      if (isFavorite) {
        const item = CHECKLIST_SHARE_DATA1.favorite?.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      } else {
        const item = CHECKLIST_SHARE_DATA1.basic?.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      }
    } else if (TITLE === '특이사항') {
      if (isFavorite) {
        const item = CHECKLIST_SHARE_DATA2.favorite?.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      } else {
        const item = CHECKLIST_SHARE_DATA2.basic?.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      }
    }
    try {
      await dispatch(getCHECKLIST_COMMENTS(NOTICE_SEQ, TITLE));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const openRow = (rowRef) => {
    if (!rowRef.isOpen) {
      rowRef.manuallySwipeRow(-100);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImage(item);
    console.log(
      '===================',
      `${params?.TITLE} 상세`,
      '===================',
    );
    analytics().logScreenView({
      screen_name: `${params?.TITLE} 상세`,
      screen_class: `${params?.TITLE} 상세`,
    });
  }, []);

  return (
    <ChecklistShareItemScreenPresenter
      NOTI_TITLE={item?.TITLE}
      CREATE_TIME={item?.CREATE_TIME}
      UPDATEDATE={item?.UPDATEDATE}
      EMP_NAME={item?.EMP_NAME}
      TITLE={TITLE}
      CONTENTS={item?.CONTENTS}
      imgarr={imgarr}
      setIsImageViewVisible={setIsImageViewVisible}
      modalImgarr={modalImgarr}
      isImageViewVisible={isImageViewVisible}
      ME={ME}
      MEMBER_SEQ={item?.MEMBER_SEQ}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      comment={comment}
      setComment={setComment}
      registFn={registFn}
      editFn={editFn}
      IMG_LIST={item?.IMG_LIST}
      NOTICE_SEQ={NOTICE_SEQ}
      commentInputBox={commentInputBox}
      setCommentInputBox={setCommentInputBox}
      setSelectedCOM_SEQ={setSelectedCOM_SEQ}
      CHECKLIST_SHARE_COMMENTS={CHECKLIST_SHARE_COMMENTS}
      loading={loading}
      isFavorite={isFavorite}
      imageIndex={imageIndex}
      setImageIndex={setImageIndex}
      STORE={STORE}
      GENDER={GENDER}
      isAddedToastVisible={isAddedToastVisible}
      isUpdatedToastVisible={isUpdatedToastVisible}
      isRemovedToastVisible={isRemovedToastVisible}
      openRow={openRow}
      confirmModal={confirmModal}
      ADDDATE={item?.ADDDATE}
      smallFontSize={IS_BIG_FONT ? 14 : 10}
      midFontSize={IS_BIG_FONT ? 18 : 14}
      largeFontSize={IS_BIG_FONT ? 20 : 16}
    />
  );
};
