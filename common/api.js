import SendBird from 'sendbird';
import { BASE_URL, STUDENT_ROLE, COUNSELOR_ROLE, SENDBIRD_APP_ID, ADMIN_BASE_URL, IMAGE_SERVICE_URL } from './constants';

const sendbird = new SendBird({ appId: SENDBIRD_APP_ID });

const headers = (authToken) => {
  const returnValue = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (authToken) { returnValue['Authorization'] = authToken; }
  return returnValue;
};

const buildError = (error = '') => ({ success: false, error });

const buildQuery = (queryObject) => {
  const keys = Object.keys(queryObject);
  return keys.map((key) => {
    let value = queryObject[key];
    if (!value) {
      return '';
    }
    if (Array.isArray(value)) {
      value = value.map(item => encodeURIComponent(item)).join(',');
    } else {
      value = encodeURIComponent(value);
    }
    return `${encodeURIComponent(key)}=${value}`;
  }).filter(has => !!has).join('&');
};

const jsonFetch = async (url, options = {}, authToken = '') => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(authToken),
    });
    const jsonResponse = await response.json();
    if (response.status >= 400 || jsonResponse.error || jsonResponse.errors) {
      throw jsonResponse.error || jsonResponse.errors || jsonResponse;
    }
    return jsonResponse;
  } catch (error) {
    return buildError(error);
  }
};

export const loginAPI = async (login, password) => {
  const body = JSON.stringify({ login, password });
  const response = await jsonFetch(`${ADMIN_BASE_URL}/user/login`, { body, method: 'POST' });
  return response;
};

export const activateAPI = async (username, activation_token) => {
  const body = JSON.stringify({ username, activation_token });
  const response = await jsonFetch(`${ADMIN_BASE_URL}/user/activate`, { body, method: 'POST' });
  return response;
};

export const forgotPasswordAPI = async (login) => {
  const body = JSON.stringify({ login });
  const response = await jsonFetch(`${ADMIN_BASE_URL}/passwords/forgot`, { body, method: 'POST' });
  return response;
};

export const feedbackAPI = async (from, message, cc) => {
  const body = JSON.stringify({
    email: 'feedback@connecpath.com',
    title: `Feedback from <${from}>`,
    cc,
    message,
  });
  const response = await jsonFetch(`${BASE_URL}/feedback`, { body, method: 'POST' });
  return response;
};


export const changePasswordAPI = async (login, password, activation_token) => {
  const body = JSON.stringify({ login, password, activation_token });
  const response = await jsonFetch(`${ADMIN_BASE_URL}/passwords/update`, { body, method: 'POST' });
  return response;
};


export const userAPI = async (authToken) => {
  const response = await jsonFetch(`${BASE_URL}/user`, { method: 'GET' }, authToken);
  if (response.success !== false) {
    const { user } = response;
    const { id, username, email, user_fields, name } = user;
    return {
      id,
      username,
      email,
      ...user_fields,
      name,
    };
  }
  return response;
};

export const editUserAPI = async (authToken, fullName, graduation_year, role) => {
  const url = `${BASE_URL}/user`;
  const body = JSON.stringify({
    name: fullName,
    user_fields: {
      role,
      graduation_year,
    },
  });
  const response = await jsonFetch(url, { body, method: 'PUT' }, authToken);
  return response;
};


export const studentSignUpApI =
 async ({ fullName, email, username, graduationYear, password, schoolCode: school_code }) => {
   const body = JSON.stringify({
     name: fullName,
     email,
     username,
     user_fields: {
       role: STUDENT_ROLE,
       graduation_year: graduationYear,
     },
     password,
     school_code,
   });
   const response = await jsonFetch(`${ADMIN_BASE_URL}/user/sign_up`, { body, method: 'POST' });
   if (response.success !== false) {
     const { admin_user } = response;
     const { id, username: username_r, email: email_r, user_fields, name } = admin_user;
     return {
       id,
       username: username_r,
       email: email_r,
       ...user_fields,
       name,
     };
   }
   return response;
 };

export const counselorSignUpApI = async (
  { fullName, email, username, password, counselorCode, schoolCode: school_code }) => {
  const body = JSON.stringify({
    name: fullName,
    email,
    username,
    user_fields: {
      role: COUNSELOR_ROLE,
    },
    password,
    activation_token: counselorCode,
    school_code,
  });
  const response = await jsonFetch(`${ADMIN_BASE_URL}/user/sign_up`, { body, method: 'POST' });
  if (response.success !== false && response.auth_token) {
    return response;
  }
  return { success: false, error: 'Invalid signup credentials. Please check Activation Token and Email are proper.' };
};

export const categoriesAPI = async (authToken) => {
  const response = await jsonFetch(`${BASE_URL}/categories`, { method: 'GET' }, authToken);
  if (response.success !== false) {
    const { category_list: { categories } } = response;
    const relevantCategories = categories.filter(category => !category.is_uncategorized)
      .map(category => ({ id: category.id, name: category.name }));
    return relevantCategories;
  }
  return response;
};

export const postsAPI = async (authToken, filters, searchTerm, page = 1, limit = 10) => {
  const filterIds = filters.map(filter => filter.id);
  const queryString = buildQuery({
    query: searchTerm,
    id: filterIds,
    limit,
    page,
  });
  const url = `${BASE_URL}/questions?${queryString}`;
  const response = await jsonFetch(url, { method: 'GET' }, authToken);
  return response;
};

export const questionAPI = async (authToken, id, page = 1, limit = 50) => {
  const queryString = buildQuery({
    id,
    page,
    limit,
  });
  const url = `${BASE_URL}/question?${queryString}`;
  const response = await jsonFetch(url, { method: 'GET' }, authToken);
  return response;
};

export const createQuestionAPI = async (authToken, raw, category) => {
  const url = `${BASE_URL}/question`;
  const body = JSON.stringify({
    title: raw,
    raw,
    category,
  });
  const response = await jsonFetch(url, { body, method: 'POST' }, authToken);
  return response;
};

export const createAnswerAPI = async (authToken, raw, question_id, reply_to_post_number = null) => {
  const url = `${BASE_URL}/answer`;
  const body = JSON.stringify({
    raw,
    question_id,
    reply_to_post_number,
  });
  const response = await jsonFetch(url, { body, method: 'POST' }, authToken);
  return response;
};

export const updateAnswerAPI = async (authToken, raw, id) => {
  const url = `${BASE_URL}/answer`;
  const body = JSON.stringify({
    id,
    post: { raw },
  });
  const response = await jsonFetch(url, { body, method: 'PUT' }, authToken);
  return response;
};

export const deleteAnswerAPI = async (authToken, id) => {
  const url = `${BASE_URL}/answer`;
  const body = JSON.stringify({
    id,
  });
  await jsonFetch(url, { body, method: 'DELETE' }, authToken);
  return { success: true };
};


export const likePostAPI = async (authToken, id) => {
  const url = `${BASE_URL}/answer/like`;
  const body = JSON.stringify({
    id,
  });
  const response = await jsonFetch(url, { body, method: 'POST' }, authToken);
  return response;
};

export const unlikePostAPI = async (authToken, id) => {
  const url = `${BASE_URL}/answer/unlike`;
  const body = JSON.stringify({
    id,
  });
  const response = await jsonFetch(url, { body, method: 'POST' }, authToken);
  return response;
};

export const notificationsAPI = async (authToken) => {
  const url = `${BASE_URL}/notifications`;
  const response = await jsonFetch(url, { method: 'GET' }, authToken);
  return response;
};

export const markNotificationsAsReadAPI = async (authToken, id = null) => {
  const url = `${BASE_URL}/notifications/mark_read`;
  const body = JSON.stringify(id ? {
    id,
  } : {});
  const response = await jsonFetch(url, { body, method: 'PUT' }, authToken);
  return response;
};


export const sendMessageToBot = async (message, channel_url, session_id, authToken) => {
  const url = `${BASE_URL}/chats/send_ai_message`;
  const body = JSON.stringify({
    channel_url,
    message,
    message_type: 'MESG',
    session_id,
  });
  const response = await jsonFetch(url, { body, method: 'POST' }, authToken);
  return response;
};

export const sendSendbirdMessage = async (channel, message) => new Promise((resolve, reject) => {
  channel.sendUserMessage(message, '', '', (response, error) => {
    if (error) {
      reject(error);
    }
    resolve(response);
  });
});

export const connectToSendbird = username => new Promise((resolve, reject) => {
  sendbird.connect(username, (user, error) => {
    if (error) {
      reject(error);
    } else {
      resolve(user);
    }
  });
});


export const disconnectFromSendbird = () => new Promise((resolve) => {
  sendbird.disconnect(() => {
    resolve();
  });
});

export const connectToChannel = channelUrl => new Promise((resolve, reject) => {
  sendbird.GroupChannel.getChannel(channelUrl, (channel, error) => {
    if (error) {
      reject(error);
    }
    resolve(channel);
  });
});

export const getMessages = listQuery => new Promise((resolve, reject) => {
  listQuery.load(10, true, (messageList, error) => {
    if (error) {
      reject(error);
    }
    const messages = messageList || [];
    resolve(messages.map(message => ({
      type: message.sender.userId === 'schoolbot' ? 'bot' : 'user',
      chat: message.message,
      data: message.data,
      createdAt: message.createdAt,
    })).reverse());
  });
});

export const startRecievingMessages = (handler) => {
  const ChannelHandler = new sendbird.ChannelHandler();
  ChannelHandler.onMessageReceived = (channel, message) => {
    handler(channel, message);
  };
  sendbird.addChannelHandler('ADMIN_STREAM', ChannelHandler);
};

export const uploadImageAPI = async (uri, authToken) => {
  const apiUrl = `${IMAGE_SERVICE_URL}/uploads.json`;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();
  formData.append('file', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: authToken,
    },
  };
  try {
    const response = await fetch(apiUrl, options);
    const jsonResponse = await response.json();
    if (response.status >= 400 || jsonResponse.error || jsonResponse.errors) {
      throw jsonResponse.error || jsonResponse || jsonResponse.errors;
    }
    return jsonResponse;
  } catch (error) {
    return buildError(error);
  }
};
