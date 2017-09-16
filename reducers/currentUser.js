import {
  SET_LOGGED_IN_USER,
} from '../common/constants';

const initialState = {
  activation_token: '',
  answers_by_bot: 0,
  answers_by_forum: 0,
  channel_url: '',
  device_token: '',
  email: '',
  graduation_year: 0,
  head_counselor: false,
  id: 0,
  name: '',
  role: 'Student',
  sendbird_id: '',
  username: '',
  you_posted_to_forum: 0,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...action.user,
      };
    default:
      return state;
  }
};

export default currentUser;
