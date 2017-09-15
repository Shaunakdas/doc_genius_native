import {
  LOGINSTATE_LOGGING_IN,
  APPSTATE_SIGNING_UP,
} from '../common/constants';

export function startLogIn() {
  return {
    type: LOGINSTATE_LOGGING_IN,
  };
}

export function startSignUp() {
  return {
    type: APPSTATE_SIGNING_UP,
  };
}
