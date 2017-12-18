export const MOCK_URL = 'http://bf21766f.ngrok.io';
export const DEV_URL = 'http://localhost:4000';
export const TEST_URL = 'http://9f93b39b.ngrok.io';
export const STAGE_URL = 'http://9f93b39b.ngrok.io';
export const PROD_URL = 'http://9f93b39b.ngrok.io';

// Options: 'expo' and 'integrated'
export const ENVIRONMENT = 'expo';
// Options: 'MOCK','DEV','TEST','STAGE','PROD'
export const SERVER = 'mock';
export const VERSION = '/api/v1';

export const URL = (serv) => {
  let url;
  switch (serv) {
    case 'MOCK':
      url = MOCK_URL;
      break;
    case 'DEV':
      url = DEV_URL + VERSION;
      break;
    case 'TEST':
      url = TEST_URL + VERSION;
      break;
    case 'STAGE':
      url = STAGE_URL + VERSION;
      break;
    case 'PROD':
      url = PROD_URL + VERSION;
      break;
    default:
      url = MOCK_URL + VERSION;
  }
  return url;
};
export const BASE_URL = 'http://9f93b39b.ngrok.io';
export const ADMIN_BASE_URL = 'http://9f93b39b.ngrok.io';
export const IMAGE_SERVICE_URL = 'http://13.59.133.37';
export const APPSTATE_LOGGING_IN = 'APPSTATE_LOGGING_IN';
export const LOGINSTATE_LOGGING_IN = 'LOGINSTATE_LOGGING_IN';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const APPSTATE_SIGNING_UP = 'APPSTATE_SIGNING_UP';
export const LOGINSTATE_LOGGED_IN = 'LOGINSTATE_LOGGED_IN';
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const DISMISSED_FILTER = 'DISMISSED_FILTER';
export const REFRESH_FORUM = 'REFRESH_FORUM';
export const SET_CHANNEL = 'SET_CHANNEL';
export const SET_LIST_QUERY = 'SET_LIST_QUERY';
export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const ADD_NOTIFICATIONS = 'ADD_NOTIFICATIONS';
export const REFRESH_PROFILE = 'REFRESH_PROFILE';
export const SET_CHAT_SESSION = 'SET_CHAT_SESSION';
export const MARK_READ_ALL_NOTIFICATIONS = 'MARK_READ_ALL_NOTIFICATIONS';
export const MARK_READ_NOTIFICATION = 'MARK_READ_NOTIFICATION';
export const RESET_CHAT = 'RESET_CHAT';
export const PREPEND_MESSAGES = 'PREPEND_MESSAGES';
export const SET_ROOT_NAVIGATION = 'SET_ROOT_NAVIGATION';

export const NON_VERIFIED_LOGIN = "You can't log in yet. We sent an activation email to you. Please follow the instructions in the email to activate your account.";


export const STUDENT_ROLE = 'Student';
export const COUNSELOR_ROLE = 'Counselor';

export const SENDBIRD_APP_ID = '9F467B70-99DA-4595-A2ED-241BA78C9442';

export const categoryImageMap = new Map([
  ['SAT / ACT / AP', 'SAT'],
  ['Course Selection', 'COURSE'],
  ['College / Career', 'COLLEGE'],
  ['Essay', 'ESSAY'],
  ['Recommendation Letters', 'RECOMMENDATION'],
  ['Applications', 'APPLICATION'],
  ['Financial Aid', 'FINANCIAL'],
  ['Others', 'OTHER'],
]);

export const categoryOrder = [
  'SAT / ACT / AP',
  'Course Selection',
  'College / Career',
  'Essay',
  'Recommendation Letters',
  'Applications',
  'Financial Aid',
  'Others',
];
