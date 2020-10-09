import { combineReducers } from "redux";
import userReducer from "./userSlice";
import alertReducer from './alertSlice';
import splashReducer from "./splashSlice";
import helpReducer from "./helpSlice";

export default combineReducers({
    userReducer,
    alertReducer,
    splashReducer,
    helpReducer,
});
