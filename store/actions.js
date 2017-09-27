import {
  LOGINSTATE_LOGGING_IN,
  APPSTATE_SIGNING_UP,
  SET_AUTH_TOKEN,
  LOGINSTATE_LOGGED_IN,
  SET_LOGGED_IN_USER,
  SET_CATEGORIES,
  APPLY_FILTERS,
  SET_CHANNEL,
  SET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  REFRESH_FORUM,
  SET_MESSAGES,
  ADD_MESSAGES,
  SET_LIST_QUERY,
  SET_CHAT_SESSION,
  MARK_READ_ALL_NOTIFICATIONS,
  MARK_READ_NOTIFICATION,
  RESET_CHAT,
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

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}

export function applyFilters(filters) {
  return {
    type: APPLY_FILTERS,
    filters,
  };
}

export function setChannel(channel) {
  return {
    type: SET_CHANNEL,
    channel,
  };
}

export function setNotifications(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications,
  };
}

export function markNotificationRead(notification) {
  return {
    type: MARK_READ_NOTIFICATION,
    notification,
  };
}

export function markAllNotificationRead() {
  return {
    type: MARK_READ_ALL_NOTIFICATIONS,
  };
}

export function addNotifications(notifications) {
  return {
    type: ADD_NOTIFICATIONS,
    notifications,
  };
}

export function refreshForum() {
  return {
    type: REFRESH_FORUM,
  };
}

export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    messages,
  };
}

export function addMessages(messages) {
  return {
    type: ADD_MESSAGES,
    messages,
  };
}

export function setListQuery(listQuery) {
  return {
    type: SET_LIST_QUERY,
    listQuery,
  };
}

export function setChatSession(sessionId) {
  return {
    type: SET_CHAT_SESSION,
    sessionId,
  };
}


export function resetChat() {
  return {
    type: RESET_CHAT,
  };
}
