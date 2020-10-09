import { combineReducers } from "redux";
import userReducer from "./userSlice";
import alertSlice from './alertSlice';

export default combineReducers({
    userReducer,
    alertSlice
});
