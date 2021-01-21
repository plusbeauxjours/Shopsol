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
    CHECKLIST_SHARE_MARKED: {},
    CHECKLIST_SHARE_DETAIL: null,
    CHECKLIST_SHARE_COMMENTS: [],
    NOTICE_COUNT: 0,
  },
  reducers: {
    setCHECKLIST_SHARE_STORE_SEQ(state, action) {
      const {payload: CHECKLIST_SHARE_STORE_SEQ} = action;
      return {
        ...state,
        CHECKLIST_SHARE_STORE_SEQ,
      };
    },
    setNOTICE_COUNT(state, action) {
      const {payload: NOTICE_COUNT} = action;
      return {
        ...state,
        NOTICE_COUNT,
      };
    },
    setCHECKLIST_SHARE_DATA1(state, action) {
      const {payload: CHECKLIST_SHARE_DATA1} = action;
      return {
        ...state,
        CHECKLIST_SHARE_DATA1,
      };
    },
    setCHECKLIST_SHARE_DATA2(state, action) {
      const {payload: CHECKLIST_SHARE_DATA2} = action;
      return {
        ...state,
        CHECKLIST_SHARE_DATA2,
      };
    },
    setCHECKLIST_SHARE_MARKED(state, action) {
      const {payload: CHECKLIST_SHARE_MARKED} = action;
      return {
        ...state,
        CHECKLIST_SHARE_MARKED,
      };
    },
    increaseNEW_CNT1(state) {
      return {
        ...state,
        NEW_CNT1: state.NEW_CNT1 + 1,
      };
    },
    increaseNEW_CNT2(state) {
      return {
        ...state,
        NEW_CNT2: state.NEW_CNT2 + 1,
      };
    },
    setCHECKLIST_SHARE_COMMENTS(state, action) {
      const {payload: CHECKLIST_SHARE_COMMENTS} = action;
      return {
        ...state,
        CHECKLIST_SHARE_COMMENTS,
      };
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
      return {
        ...state,
        CHECKLIST_SHARE_COMMENTS: state.CHECKLIST_SHARE_COMMENTS.filter(
          (i) => i.COM_SEQ !== selectedCOM_SEQ,
        ),
      };
    },
    deleteCHECKLIST_SHARE_DATA(state, action) {
      const {
        payload: {TITLE, NOTICE_SEQ, isFavorite},
      } = action;
      if (TITLE === '지시사항') {
        if (isFavorite) {
          return {
            ...state,
            CHECKLIST_SHARE_DATA1: {
              ...state.CHECKLIST_SHARE_DATA1,
              favorite: state.CHECKLIST_SHARE_DATA1.favorite.filter(
                (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
              ),
            },
          };
        } else {
          return {
            ...state,
            CHECKLIST_SHARE_DATA1: {
              ...state.CHECKLIST_SHARE_DATA1,
              basic: state.CHECKLIST_SHARE_DATA1.basic.filter(
                (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
              ),
            },
          };
        }
      } else {
        if (isFavorite) {
          return {
            ...state,
            CHECKLIST_SHARE_DATA2: {
              ...state.CHECKLIST_SHARE_DATA2,
              favorite: state.CHECKLIST_SHARE_DATA2.favorite.filter(
                (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
              ),
            },
          };
        } else {
          return {
            ...state,
            CHECKLIST_SHARE_DATA2: {
              ...state.CHECKLIST_SHARE_DATA2,
              basic: state.CHECKLIST_SHARE_DATA2.basic.filter(
                (i) => i.NOTICE_SEQ !== NOTICE_SEQ,
              ),
            },
          };
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
  setCHECKLIST_SHARE_STORE_SEQ,
  setNOTICE_COUNT,
  setCHECKLIST_SHARE_DATA1,
  setCHECKLIST_SHARE_DATA2,
  setCHECKLIST_SHARE_MARKED,
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
    if (data.message[0]?.ADDDATE == date) {
      dispatch(setCHECKLIST_SHARE_DATA1(data));
    }
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
    if (data.message[0]?.ADDDATE == date) {
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

export default checklistshareSlice.reducer;
