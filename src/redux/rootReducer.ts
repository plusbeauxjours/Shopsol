import { combineReducers } from "redux";
import userReducer from "./userSlice";
import alertSlice from './alertSlice';
import splashReducer from "./splashSlice";
import helpReducer from "./helpSlice";

export default combineReducers({
    userReducer,
    alertSlice,
    splashReducer,
    helpReducer,
});
