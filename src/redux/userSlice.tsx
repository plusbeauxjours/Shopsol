import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLOGIN(state) {
      state.isLoggedIn = true;
    },
  },
});

export const {setLOGIN} = userSlice.actions;

export default userSlice.reducer;
