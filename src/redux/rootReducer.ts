import { combineReducers } from "redux";
import userReducer from "./userSlice";
import userAlarmReducer from './userAlarmSlice';
import alertReducer from './alertSlice';
import splashReducer from "./splashSlice";
import helpReducer from "./helpSlice";
import storeReducer from "./storeSlice";
import mypageReducer from "./mypageSlice";
import employeeReducer from "./employeeSlice"
import healthReducer from "./healthSlice"
import shelflifeReducer from "./shelflifeSlice"
import taskReducer from "./taskSlice"
import checklistReducer from "./checklistSlice"
import checklistshareReducer from "./checklistshareSlice"
import calendarReducer from "./calendarSlice"
import paymentReducer from "./paymentSlice"

export default combineReducers({
    userReducer,
    userAlarmReducer,
    alertReducer,
    splashReducer,
    helpReducer,
    storeReducer,
    mypageReducer,
    employeeReducer,
    healthReducer,
    shelflifeReducer,
    taskReducer,
    checklistReducer,
    checklistshareReducer,
    calendarReducer,
    paymentReducer
});
