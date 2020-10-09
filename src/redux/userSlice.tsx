import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    DEVICE_PLATFORM: '',
  },
  reducers: {
    setLOGIN(state) {
      state.isLoggedIn = true;
    },
    setDEVICE_PLATFORM(state, action) {
      const {payload: DEVICE_PLATFORM} = action;
      return {
        ...state,
        DEVICE_PLATFORM,
      };
    },
  },
});

export const {setLOGIN, setDEVICE_PLATFORM} = userSlice.actions;

export default userSlice.reducer;
