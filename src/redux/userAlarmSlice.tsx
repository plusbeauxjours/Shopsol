import {createSlice} from '@reduxjs/toolkit';

const userAlarmSlice = createSlice({
  name: 'userAlram',
  initialState: {
    All_PUSH: false,
    WORK_PUSH: false,
    CHECK_PUSH: false,
    CHECKSHARE_PUSH: false,
    SCHEDULE_PUSH: false,
    SHELF_PUSH: false,
    HEALTH_PUSH: false,
  },
  reducers: {
    setAllPush(state, action) {
      const {payload: All_PUSH} = action;
      return {
        ...state,
        All_PUSH,
      };
    },
    setWorkPush(state, action) {
      const {payload: WORK_PUSH} = action;
      return {
        ...state,
        WORK_PUSH,
      };
    },
    setCheckPush(state, action) {
      const {payload: CHECK_PUSH} = action;
      return {
        ...state,
        CHECK_PUSH,
      };
    },
    setChecksharePush(state, action) {
      const {payload: CHECKSHARE_PUSH} = action;
      return {
        ...state,
        CHECKSHARE_PUSH,
      };
    },
    setScedulePUsh(state, action) {
      const {payload: SCHEDULE_PUSH} = action;
      return {
        ...state,
        SCHEDULE_PUSH,
      };
    },
    setShelfPush(state, action) {
      const {payload: SHELF_PUSH} = action;
      return {
        ...state,
        SHELF_PUSH,
      };
    },
    setHealthPush(state, action) {
      const {payload: HEALTH_PUSH} = action;
      return {
        ...state,
        HEALTH_PUSH,
      };
    },
  },
});

export const {
  setAllPush,
  setWorkPush,
  setCheckPush,
  setChecksharePush,
  setScedulePUsh,
  setShelfPush,
  setHealthPush,
} = userAlarmSlice.actions;

export default userAlarmSlice.reducer;
