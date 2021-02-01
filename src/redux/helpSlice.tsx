import {createSlice} from '@reduxjs/toolkit';

const helpSlice = createSlice({
  name: 'alert',
  initialState: {
    helpCategory: [],
  },
  reducers: {
    setHelpCategory(state, action) {
      const {payload: helpCategory} = action;
      state.helpCategory = helpCategory;
    },
  },
});

export const {setHelpCategory} = helpSlice.actions;

export default helpSlice.reducer;
