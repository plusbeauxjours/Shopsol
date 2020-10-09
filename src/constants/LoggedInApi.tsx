import axios from 'axios';
import store from '../redux/store';

const callApi = async (
  method: string,
  path: string,
  data?: any,
  isImg?: boolean,
) => {
  const {
    userReducer: {MEMBER_SEQ},
  } = store.getState();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const baseUrl = 'http://133.186.209.113:3003/api';
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get' || method === 'delete') {
    console.log(
      method,
      `${fullUrl}MEMBER_SEQ=${MEMBER_SEQ}`,
      'MEMBER_SEQ:',
      MEMBER_SEQ,
    );
    return axios[method](`${fullUrl}MEMBER_SEQ=${MEMBER_SEQ}`, {headers});
  } else {
    if (isImg) {
      console.log(method, fullUrl, data, {headers});
      return axios[method](fullUrl, data, {headers});
    } else {
      console.log(method, fullUrl, {...data, MEMBER_SEQ}, {headers});
      return axios[method](fullUrl, {...data, MEMBER_SEQ}, {headers});
    }
  }
};

const oldApi = async (
  method: string,
  path: string,
  data?: any,
  isImg?: boolean,
) => {
  const {
    userReducer: {MEMBER_SEQ},
  } = store.getState();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const baseUrl = 'http://133.186.209.113:80/api/v2';
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get' || method === 'delete') {
    console.log(
      method,
      `${fullUrl}MEMBER_SEQ=${MEMBER_SEQ}`,
      'MEMBER_SEQ:',
      MEMBER_SEQ,
    );
    return axios[method](`${fullUrl}MEMBER_SEQ=${MEMBER_SEQ}`, {headers});
  } else {
    if (isImg) {
      console.log(method, fullUrl, data, {headers});
      return axios[method](fullUrl, data, {headers});
    } else {
      console.log(method, fullUrl, {...data, MEMBER_SEQ}, {headers});
      return axios[method](fullUrl, {...data, MEMBER_SEQ}, {headers});
    }
  }
};

const noPortApi = async (method: string, path: string, data?: any) => {
  const {
    userReducer: {MEMBER_SEQ},
  } = store.getState();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const baseUrl = 'http://133.186.209.113/api/v2';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    console.log(
      method,
      `${fullUrl}MEMBER_SEQ=${MEMBER_SEQ}`,
      'MEMBER_SEQ:',
      MEMBER_SEQ,
    );
    return axios[method](`${fullUrl}MEMBER_SEQ=${MEMBER_SEQ}`, {headers});
  } else {
    console.log(method, fullUrl, {...data, MEMBER_SEQ}, {headers});
    return axios[method](fullUrl, {...data, MEMBER_SEQ}, {headers});
  }
};

export default {
  checkApp: (data: any) => callApi('post', '/auth/checkApp/', data), // SelectStoreScreen, HomeScreen, StartScreen
  getSMS: (data: any) => callApi('post', '/auth/getsms/', data), //MyPagePasswordSetScreen, FindPasswordScreen, VerificationScreen
  help: () => callApi('post', '/auth/help/'), // MyPageAppointmentScreen, StartScreen
  updatePush: (data: any) => callApi('post', '/auth/updatePush/', data),
  getStoreInfo: (data: any) => callApi('post', '/auth/getstoreinfo/', data),
  getCertificate: (data: any) => callApi('post', '/auth/getCERTIFICATE/', data),
  getPush: (data: any) => callApi('post', '/auth/getPush/', data),
  toggleMember: (data: any) =>
    callApi('post', '/auth/changeMemberStore/', data),
  changeName: (data: any) => callApi('post', '/auth/changeMemberName', data),
  cupdflistcheck: () => callApi('get', `/auth/cupdflistcheck?`),
  cuvideolistcheck: () => callApi('get', `/auth/cuvideolistcheck?`),
  setvideocheck: (VIDEO_SEQ: string) =>
    callApi('get', `/auth/setvideocheck?VIDEO_SEQ=${VIDEO_SEQ}&`),
  endList: () => callApi('get', `/auth/endstorelist?`),
  cuedulistcheck: () => callApi('get', `/auth/cuedulistcheck?`),
  storeHealthEmpList: (STORE_SEQ: string, STORE: string) =>
    callApi(
      'get',
      `/auth/emphealthlist?STORE_SEQ=${STORE_SEQ}&STORE=${STORE}&`,
    ),
  storeHealthEmpDetail: (EMP_SEQ: string) =>
    callApi('get', `/auth/emphealthdetail?EMP_SEQ=${EMP_SEQ}&`),
  attendanceWork: (data: any) => callApi('post', '/auth/attendancework/', data),
  attendanceOffWork: (data: any) =>
    callApi('post', '/auth/attendanceoffwork/', data),
  storeList: (STORE: string) =>
    callApi('get', `/auth/storelist?STORE=${STORE}&`),
  updateStore: (data: any) => callApi('post', '/auth/updatestore', data),
  cancelJoin: (data: any) => callApi('post', '/auth/canceljoin', data),
  rejectJoin: (data: any) => callApi('post', '/auth/reject_join/', data),
  sendOneEmp: (data: any) => callApi('post', '/auth/sendOneEmp', data),
  getShelfLifeData: (data: any) =>
    callApi('post', '/auth/getshelfLifeData/', data),
  checkShelfLifeData: (data: any) =>
    callApi('post', '/auth/checkShelfLifeData/', data),
  getAllShelfLifeData: (data: any) =>
    callApi('post', '/auth/getAllshelfLifeData/', data),
  deleteShelfLifeData: (data: any) =>
    callApi('post', '/auth/deleteshelfLifeData/', data),
  updateShelfLifeData: (data: any) =>
    callApi('post', '/auth/updateshelfLifeData/', data),
  cancelShelfLifeData: (data: any) =>
    callApi('post', '/auth/cancelShelfLifeData/', data),
  checkOcr: (data: any) => callApi('post', '/auth/checkocr/', data, true),
  checkocr1: (data: any) => callApi('post', '/auth/checkocr1/', data, true),
  saveOcr: (data: any) => callApi('post', '/auth/saveocr/', data, true),
  saveOcr1: (data: any) => callApi('post', '/auth/saveocr1/', data, true),
  updateOcr: (data: any) => callApi('post', '/auth/updateocr/', data, true),
  updateOcr1: (data: any) => callApi('post', '/auth/updateocr1/', data, true),
  deleteStoreHealth: (data: any) =>
    callApi('post', '/auth/deleteStoreHealth/', data),
  getAllCeoHealth: (data: any) =>
    callApi('post', '/auth/getAllCeoHealth/', data),
  deleteCeoHealth: (data: any) =>
    callApi('post', '/auth/deleteCeoHealth/', data),
  setShelfLifeData: (data: any) =>
    callApi('post', '/auth/setshelfLifeData/', data),
  sendEmp2: (data: any) => callApi('post', '/auth/sendEmp', data),
  toggleCalendar: (data: any) => callApi('post', '/auth/toggleCalendar/', data),
  getEmp: (EMP_SEQ: string) =>
    callApi('get', `/auth/getempinfo?EMP_SEQ=${EMP_SEQ}&`),
  getSchedules: (EMP_SEQ: string) =>
    callApi('get', `/auth/getschedules?EMP_SEQ=${EMP_SEQ}&`),
  getAllCheckSchedules: (data: any) =>
    callApi('post', '/auth/getAllCheckSchedules/', data),
  setCheckListImg2: (data: any) =>
    callApi('post', '/auth/setCheckListImg2/', data, true),
  setCheckList2: (data: any) => callApi('post', '/auth/setCheckList2/', data),
  setNoticeFavorite: (data: any) =>
    callApi('post', '/auth/setNoticeFavorite/', data),
  getNotice: (STORE_SEQ: string, DATE: string, STORE: string) =>
    callApi(
      'get',
      `/auth/getNotice?STORE_SEQ=${STORE_SEQ}&STORE=${STORE}&DATE=${DATE}&`,
    ),
  getCuNotice: (STORE_SEQ: string) =>
    callApi('get', `/auth/getCuNotice?STORE_SEQ=${STORE_SEQ}&`),
  editNoticeComment: (COM_SEQ: string, CONTENTS: string) =>
    callApi(
      'get',
      `/auth/editNoticeComment?COM_SEQ=${COM_SEQ}&CONTENTS=${CONTENTS}&`,
    ),
  delNoticeComment: (COM_SEQ: string) =>
    callApi('get', `/auth/delNoticeComment?COM_SEQ=${COM_SEQ}&`),
  setNoticeComment: (
    NOTICE_SEQ: string,
    EMP_NAME: string,
    CONTENTS: string,
    STORE: string,
  ) =>
    callApi(
      'get',
      `/auth/setNoticeComment?NOTICE_SEQ=${NOTICE_SEQ}&EMP_NAME=${EMP_NAME}&CONTENTS=${CONTENTS}&STORE=${STORE}&`,
    ),
  getNoticeComment: (NOTICE_SEQ: string, STORE_SEQ: string, TITLE: string) =>
    callApi(
      'get',
      `/auth/getNoticeComment?NOTICE_SEQ=${NOTICE_SEQ}&STORE_SEQ=${STORE_SEQ}&TITLE=${TITLE}&`,
    ),
  setNoticeImg2: (data: any) =>
    callApi('post', '/auth/setNoticeImg2/', data, true),
  setNotice2: (data: any) => callApi('post', '/auth/setNotice2/', data),
  updateNotice: (data: any) => callApi('post', '/auth/updateNotice/', data),
  updateNoticeImg: (data: any) =>
    callApi('post', '/auth/updateNoticeImg/', data, true),
  setEmpType: (EMP_SEQ: string) =>
    callApi('get', `/auth/request_join?EMP_SEQ=${EMP_SEQ}&`),
  cancelScheduleVacation: (data: any) =>
    callApi('post', '/auth/cancelScheduleVacation/', data),
  getScheduleRestTimeUpdate: (data: any) =>
    callApi('post', '/auth/updateRestTime/', data),
  deleteSchedule: (data: any) => callApi('post', '/auth/deleteschedule/', data),
  updateSchedule: (data: any) => callApi('post', '/auth/updateTime/', data),
  seteducheck: (VIDEO_SEQ: string) =>
    callApi('get', `/auth/setvideocheck?VIDEO_SEQ=${VIDEO_SEQ}&`),

  // oldApi
  changePwd: (data: any) => oldApi('post', '/Auth/changePwd', data),
  createSchedule: (data: any) =>
    oldApi('post', '/Management/schedule_create', data),
  getWorkingEmpTotalPay: (YEAR: string, MONTH: string, STORE_SEQ: string) =>
    oldApi(
      'get',
      `/Store/get_working_emp_totalpay2?YEAR=${YEAR}&MONTH=${MONTH}&STORE_SEQ=${STORE_SEQ}&`,
    ),
  getWaitEmpList: (STORE_SEQ: string) =>
    oldApi('get', `/Store/get_wait_emp_list?STORE_SEQ=${STORE_SEQ}&`),
  addStore: (data: any) => oldApi('post', '/Store/insert22', data),
  createScheduleVacation2: (data: any) =>
    oldApi('post', '/Management/createScheduleVacation2', data),
  updateEmpSchedule: (data: any) =>
    oldApi('post', '/Employee/update_emp_schedules3', data),
  closeList: () => oldApi('get', `/Store/Close_list?`),
  getEmployeeList: (data: any) => oldApi('post', '/Employee/getEmpList/', data),
  getEmpPay: (data: any) => oldApi('post', '/Employee/getEmpPay/', data),
  getScheduleRestTimeCreate: (data: any) =>
    oldApi('post', '/Management/schedule_Rest_TIme_create/', data),
  checkChecklist: (data: any) => oldApi('post', '/StoreAuth/checklist', data),
  monthLists: (STORE_ID: string, EMP_ID: string, YEAR: string, MONTH: string) =>
    noPortApi(
      'get',
      `/PayMents/month_lists?STORE_ID=${STORE_ID}&EMP_ID=${EMP_ID}&YEAR=${YEAR}&MONTH=${MONTH}&`,
    ),
  getChecklistAll: (storeID: string, YEAR: string, MONTH: string) =>
    oldApi(
      'get',
      `/Store/ChecklistAll?STORE=${storeID}&YEAR=${YEAR}&MONTH=${MONTH}&`,
    ),
  getChecklist: (STORE: string, DATE: string) =>
    oldApi('get', `/Store/Checklist?STORE=${STORE}&DATE=${DATE}&`),
  getAllSchedules: (STORE_SEQ: string, YEAR: string, MONTH: string) =>
    oldApi(
      'get',
      `/Store/getAllSchedules?STORE_SEQ=${STORE_SEQ}&YEAR=${YEAR}&MONTH=${MONTH}&`,
    ),
  getEmpLists: (STORE_SEQ: string) =>
    oldApi('get', `/Store/get_emp_lists?STORE_SEQ=${STORE_SEQ}&`),
  getNoticeAll: (
    STORE_SEQ: string,
    YEAR: string,
    MONTH: number,
    TYPE: string,
  ) =>
    oldApi(
      'get',
      `/Store/noticeAll?STORE_SEQ=${STORE_SEQ}&YEAR=${YEAR}&MONTH=${MONTH}&TYPE=${TYPE}&`,
    ),
  setpdfcheck: (PDF_SEQ: string) =>
    oldApi('get', `/Store/setpdfcheck?PDF_SEQ=${PDF_SEQ}&`),
  updateEmp: (data: any) => oldApi('put', '/Employee/update/', data),
  checkUpdate: (data: any) => oldApi('post', '/Store/CheckUpdate/', data),
  checkRegister: (data: any) => oldApi('post', '/Store/CheckRegister/', data),
  createNewSchedule: (data: any) =>
    oldApi('post', '/Management/new_schedule_create/', data),
  insertEmpSchedule: (data: any) =>
    oldApi('post', '/Employee/insert_emp_schedules/', data),
};
