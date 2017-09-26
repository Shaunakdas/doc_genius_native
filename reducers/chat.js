import {
  SET_CHANNEL,
  SET_MESSAGES,
  ADD_MESSAGES,
  SET_LIST_QUERY,
  SET_CHAT_SESSION,
} from '../common/constants';

const initialState = {
  channel: null,
  messages: [],
  listQuery: null,
  sessionId: null,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return {
        ...state,
        channel: action.channel,
        listQuery: null,
      };
    case SET_CHAT_SESSION:
      return {
        ...state,
        sessionId: action.sessionId,
      };
    case SET_LIST_QUERY:
      return {
        ...state,
        listQuery: action.listQuery,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case ADD_MESSAGES:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.messages,
        ],
      };
    default:
      return state;
  }
};

export default appState;
