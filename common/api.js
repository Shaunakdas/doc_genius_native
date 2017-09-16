import { BASE_URL } from './constants';

const headers = (authToken) => {
  const returnValue = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (authToken) { returnValue['Authorization'] = authToken; }
  return returnValue;
};

const buildError = (error = '') => ({ success: false, error });

const jsonFetch = async (url, options = {}, authToken = '') => {
  try {
    // console.log(url, {
    //   ...options,
    //   headers: headers(authToken),
    // });
    const response = await fetch(url, {
      ...options,
      headers: headers(authToken),
    });
    const jsonResponse = await response.json();
    if (response.status >= 400) { throw jsonResponse.error || jsonResponse; }
    return jsonResponse;
  } catch (error) {
    return buildError(error);
  }
};

export const loginAPI = async (login, password) => {
  const body = JSON.stringify({ login, password });
  const response = await jsonFetch(`${BASE_URL}/user/login`, { body, method: 'POST' });
  return (response.success !== false) ? { authToken: response.auth_token } : response;
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
