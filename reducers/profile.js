import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  MARK_READ_NOTIFICATION,
  MARK_READ_ALL_NOTIFICATIONS,
} from '../common/constants';

const initialState = {
  notifications: [],
  hasNotifications: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
        hasNotifications: action.notifications ? action.notifications.some(n => !n.read) : false,
      };
    case MARK_READ_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
        hasNotifications: false,
      };
    case MARK_READ_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: action.notification.id === notification.id ? true : notification.read,
        })),
        hasNotifications: state.notifications
          .filter(notification => notification.id !== action.notification.id).some(n => !n.read),
      };
    case ADD_NOTIFICATIONS:
      return {
        notifications: [
          ...state.notifications,
          ...action.notifications,
        ],
        hasNotifications: (action.notifications && action.notifications.some(n => !n.read))
        || state.notifications.some(n => !n.read),
      };
    default:
      return state;
  }
};

export default profile;
