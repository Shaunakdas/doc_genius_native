import {
  LOGINSTATE_LOGGING_IN,
  APPSTATE_SIGNING_UP,
  SET_AUTH_TOKEN,
  LOGINSTATE_LOGGED_IN,
  SET_LOGGED_IN_USER,
} from '../common/constants';

export function startLogIn() {
  return {
    type: LOGINSTATE_LOGGING_IN,
    loggingIn: true,
  };
}

export function loginError() {
  return {
    type: LOGINSTATE_LOGGING_IN,
    loggingIn: false,
  };
}

export function loggedIn() {
  return {
    type: LOGINSTATE_LOGGED_IN,
  };
}

export function startSignUp() {
  return {
    type: APPSTATE_SIGNING_UP,
  };
}

export function setAuthToken(authToken) {
  return {
    type: SET_AUTH_TOKEN,
    authToken,
  };
}

export function setLoggedInUser(user) {
  return {
    type: SET_LOGGED_IN_USER,
    user,
  };
}
