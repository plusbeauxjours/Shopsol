import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import {setSplashVisible} from './splashSlice';

const checklistshareSlice = createSlice({
  name: 'checklistshare',
  initialState: {
    CHECKLIST_SHARE_STORE_SEQ: '',
    CHECKLIST_SHARE_DATA1: null,
    NEW_CNT1: 0,
    CHECKLIST_SHARE_DATA2: null,
    NEW_CNT2: 0,
    CHECKLIST_SHARE_DETAIL: null,
    CHECKLIST_SHARE_COMMENTS: [],
    IS_BIG_FONT: false,
  },
  reducers: {
    toggleIS_BIG_FONT(state) {
      state.IS_BIG_FONT = !state.IS_BIG_FONT;
    },
    addCHECKLIST_SHARE_TO_FAVORITE(state, action) {
      const {
        payload: {TITLE, NOTICE_SEQ},
      } = action;
      if (TITLE === '지시사항') {
        const item = state.CHECKLIST_SHARE_DATA1.basic.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        state.CHECKLIST_SHARE_DATA1.favorite.unshift(item);
      } else {
        const item = state.CHECKLIST_SHARE_DATA2.basic.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        state.CHECKLIST_SHARE_DATA2.favorite.unshift(item);
      }
    },
    addCHECKLIST_SHARE_TO_BASIC(state, action) {
      const {
        payload: {TITLE, NOTICE_SEQ},
      } = action;
      if (TITLE === '지시사항') {
        const item = state.CHECKLIST_SHARE_DATA1.favorite.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );

        state.CHECKLIST_SHARE_DATA1.basic.unshift(item);
      } else {
        const item = state.CHECKLIST_SHARE_DATA2.favorite.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        state.CHECKLIST_SHARE_DATA2.basic.unshift(item);
      }
    },
    removeCHECKLIST_SHARE_FROM_FAVORITE(state, action) {
      const {
        payload: {TITLE, NOTICE_SEQ},
      } = action;
      if (TITLE === '지시사항') {
        state.CHECKLIST_SHARE_DATA1.favorite = state.CHECKLIST_SHARE_DATA1.favorite.filter(
          (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
        );
      } else {
        state.CHECKLIST_SHARE_DATA2.favorite = state.CHECKLIST_SHARE_DATA2.favorite.filter(
          (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
        );
      }
    },
    removeCHECKLIST_SHARE_FROM_BASIC(state, action) {
      const {
        payload: {TITLE, NOTICE_SEQ},
      } = action;
      if (TITLE === '지시사항') {
        state.CHECKLIST_SHARE_DATA1.basic = state.CHECKLIST_SHARE_DATA1.basic.filter(
          (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
        );
      } else {
        state.CHECKLIST_SHARE_DATA2.basic = state.CHECKLIST_SHARE_DATA2.basic.filter(
          (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
        );
      }
    },

    setCHECKLIST_SHARE_STORE_SEQ(state, action) {
      const {payload: CHECKLIST_SHARE_STORE_SEQ} = action;
      state.CHECKLIST_SHARE_STORE_SEQ = CHECKLIST_SHARE_STORE_SEQ;
    },
    setCHECKLIST_SHARE_DATA1(state, action) {
      const {payload: CHECKLIST_SHARE_DATA1} = action;
      state.CHECKLIST_SHARE_DATA1 = CHECKLIST_SHARE_DATA1;
      state.NEW_CNT1 =
        CHECKLIST_SHARE_DATA1?.favorite.filter((i) => !i.NoticeCheck_SEQ)
          .length +
        CHECKLIST_SHARE_DATA1?.basic.filter((i) => !i.NoticeCheck_SEQ).length;
    },
    setCHECKLIST_SHARE_DATA2(state, action) {
      const {payload: CHECKLIST_SHARE_DATA2} = action;
      state.CHECKLIST_SHARE_DATA2 = CHECKLIST_SHARE_DATA2;
      state.NEW_CNT2 =
        CHECKLIST_SHARE_DATA2?.favorite.filter((i) => !i.NoticeCheck_SEQ)
          .length +
        CHECKLIST_SHARE_DATA2?.basic.filter((i) => !i.NoticeCheck_SEQ).length;
    },
    increaseNEW_CNT1(state) {
      state.NEW_CNT1 + 1;
    },
    increaseNEW_CNT2(state) {
      state.NEW_CNT2 + 1;
    },
    setCHECKLIST_SHARE_COMMENTS(state, action) {
      const {payload: CHECKLIST_SHARE_COMMENTS} = action;
      state.CHECKLIST_SHARE_COMMENTS = CHECKLIST_SHARE_COMMENTS;
    },
    addCHECKLIST_SHARE_COMMENTS(state, action) {
      const {payload: CHECKLIST_SHARE_COMMENTS} = action;
      state.CHECKLIST_SHARE_COMMENTS.unshift(CHECKLIST_SHARE_COMMENTS);
    },
    editCHECKLIST_SHARE_COMMENTS(state, action) {
      const {
        payload: {selectedCOM_SEQ, comment},
      } = action;
      const item = state.CHECKLIST_SHARE_COMMENTS.find(
        (i) => i.COM_SEQ === selectedCOM_SEQ,
      );
      item.CONTENTS = comment;
    },
    deleteCHECKLIST_SHARE_COMMENTS(state, action) {
      const {payload: selectedCOM_SEQ} = action;
      state.CHECKLIST_SHARE_COMMENTS = state.CHECKLIST_SHARE_COMMENTS.filter(
        (i) => i.COM_SEQ !== selectedCOM_SEQ,
      );
    },
    deleteCHECKLIST_SHARE_DATA(state, action) {
      const {
        payload: {TITLE, NOTICE_SEQ, isFavorite},
      } = action;
      if (TITLE === '지시사항') {
        if (isFavorite) {
          state.CHECKLIST_SHARE_DATA1.favorite = state.CHECKLIST_SHARE_DATA1.favorite.filter(
            (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
          );
        } else {
          state.CHECKLIST_SHARE_DATA1.basic = state.CHECKLIST_SHARE_DATA1.basic.filter(
            (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
          );
        }
      } else {
        if (isFavorite) {
          state.CHECKLIST_SHARE_DATA2.favorite = state.CHECKLIST_SHARE_DATA2.favorite.filter(
            (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
          );
        } else {
          state.CHECKLIST_SHARE_DATA2.basic = state.CHECKLIST_SHARE_DATA2.basic.filter(
            (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
          );
        }
      }
    },
    updateCHECKLIST_SHARE_DATA(state, action) {
      const {
        payload: {TITLE, title, content, NOTICE_SEQ, image, isFavorite},
      } = action;
      if (TITLE === '지시사항') {
        if (isFavorite) {
          const favoriteItem = state.CHECKLIST_SHARE_DATA1.favorite.find(
            (i) => i.NOTICE_SEQ === NOTICE_SEQ,
          );
          favoriteItem.TITLE = title;
          favoriteItem.CONTENTS = content;
          if (image) {
            favoriteItem.IMG_LIST = image;
          } else {
            favoriteItem.IMG_LIST = null;
          }
        } else {
          const basicItem = state.CHECKLIST_SHARE_DATA1.basic.find(
            (i) => i.NOTICE_SEQ === NOTICE_SEQ,
          );
          basicItem.TITLE = title;
          basicItem.CONTENTS = content;
          if (image) {
            basicItem.IMG_LIST = image;
          } else {
            basicItem.IMG_LIST = null;
          }
        }
      } else {
        if (isFavorite) {
          const favoriteItem = state.CHECKLIST_SHARE_DATA2.favorite.find(
            (i) => i.NOTICE_SEQ === NOTICE_SEQ,
          );
          favoriteItem.TITLE = title;
          favoriteItem.CONTENTS = content;
          if (image) {
            favoriteItem.IMG_LIST = image;
          } else {
            favoriteItem.IMG_LIST = null;
          }
        } else {
          const basicItem = state.CHECKLIST_SHARE_DATA2.basic.find(
            (i) => i.NOTICE_SEQ === NOTICE_SEQ,
          );
          basicItem.TITLE = title;
          basicItem.CONTENTS = content;
          if (image) {
            basicItem.IMG_LIST = image;
          } else {
            basicItem.IMG_LIST = null;
          }
        }
      }
    },
  },
});

export const {
  toggleIS_BIG_FONT,
  addCHECKLIST_SHARE_TO_FAVORITE,
  addCHECKLIST_SHARE_TO_BASIC,
  removeCHECKLIST_SHARE_FROM_FAVORITE,
  removeCHECKLIST_SHARE_FROM_BASIC,
  setCHECKLIST_SHARE_STORE_SEQ,
  setCHECKLIST_SHARE_DATA1,
  setCHECKLIST_SHARE_DATA2,
  increaseNEW_CNT1,
  increaseNEW_CNT2,
  setCHECKLIST_SHARE_COMMENTS,
  addCHECKLIST_SHARE_COMMENTS,
  editCHECKLIST_SHARE_COMMENTS,
  deleteCHECKLIST_SHARE_COMMENTS,
  updateCHECKLIST_SHARE_DATA,
  deleteCHECKLIST_SHARE_DATA,
} = checklistshareSlice.actions;

export const getCHECKLIST_SHARE_DATA1 = (date) => async (
  dispatch,
  getState,
) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    userReducer: {MEMBER_SEQ},
  } = getState();
  const {
    checklistshareReducer: {CHECKLIST_SHARE_DATA1},
  } = getState();
  if (!CHECKLIST_SHARE_DATA1 || CHECKLIST_SHARE_DATA1?.length === 0) {
    dispatch(setSplashVisible({visible: true, text: '지시사항'}));
  }
  try {
    const {data} = await api.getNotice(STORE_SEQ, date, '1', MEMBER_SEQ);
    for (let a = 0; a < data.basic.length; a++) {
      if (data.basic[a].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT1());
      }
    }
    for (let b = 0; b < data.favorite.length; b++) {
      if (data.favorite[b].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT1());
      }
    }
    if (data.basic[0]?.ADDDATE == date || data.basic.length == 0) {
      dispatch(setCHECKLIST_SHARE_DATA1(data));
    }
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export const getCHECKLIST_SHARE_DATA2 = (date) => async (
  dispatch,
  getState,
) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    userReducer: {MEMBER_SEQ},
  } = getState();
  const {
    checklistshareReducer: {CHECKLIST_SHARE_DATA2},
  } = getState();
  if (!CHECKLIST_SHARE_DATA2 || CHECKLIST_SHARE_DATA2?.length === 0) {
    dispatch(setSplashVisible({visible: true, text: '특이사항'}));
  }
  try {
    const {data} = await api.getNotice(STORE_SEQ, date, '0', MEMBER_SEQ);
    for (let a = 0; a < data.basic.length; a++) {
      if (data.basic[a].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT2());
      }
    }
    for (let b = 0; b < data.favorite.length; b++) {
      if (data.favorite[b].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT2());
      }
    }
    if (data.basic[0]?.ADDDATE == date || data.basic.length == 0) {
      dispatch(setCHECKLIST_SHARE_DATA2(data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible({visible: false}));
  }
};

export const getCHECKLIST_COMMENTS = (NOTICE_SEQ, TITLE) => async (
  dispatch,
  getState,
) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    userReducer: {MEMBER_SEQ},
  } = getState();
  try {
    const {data} = await api.getNoticeComment(
      NOTICE_SEQ,
      STORE_SEQ,
      TITLE == '공지사항' ? '1' : '0',
      MEMBER_SEQ,
    );
    dispatch(setCHECKLIST_SHARE_COMMENTS(data.message));
  } catch (e) {
    console.log(e);
  }
  return true;
};

export const onCHECKLIST_SHARE_FAVORITE = ({TITLE, NOTICE_SEQ}) => async (
  dispatch,
) => {
  try {
    dispatch(addCHECKLIST_SHARE_TO_FAVORITE({TITLE, NOTICE_SEQ}));
    dispatch(removeCHECKLIST_SHARE_FROM_BASIC({TITLE, NOTICE_SEQ}));
  } catch (e) {
    console.log(e);
  }
};

export const offCHECKLIST_SHARE_FAVORITE = ({TITLE, NOTICE_SEQ}) => async (
  dispatch,
) => {
  try {
    dispatch(addCHECKLIST_SHARE_TO_BASIC({TITLE, NOTICE_SEQ}));
    dispatch(removeCHECKLIST_SHARE_FROM_FAVORITE({TITLE, NOTICE_SEQ}));
  } catch (e) {
    console.log(e);
  }
};

export default checklistshareSlice.reducer;
