import { BASE_URL, STUDENT_ROLE, COUNSELOR_ROLE } from './constants';

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

export const activateAPI = async (username, activation_token) => {
  const body = JSON.stringify({ username, activation_token });
  const response = await jsonFetch(`${BASE_URL}/user/activate`, { body, method: 'POST' });
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

export const studentSignUpApI = async ({ fullName, email, username, graduationYear, password }) => {
  const body = JSON.stringify({
    name: fullName,
    email,
    username,
    user_fields: {
      role: STUDENT_ROLE,
      graduation_year: graduationYear,
    },
    password,
  });
  const response = await jsonFetch(`${BASE_URL}/user/sign_up`, { body, method: 'POST' });
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
  { fullName, email, username, graduationYear, password, counselorCode }) => {
  const body = JSON.stringify({
    name: fullName,
    email,
    username,
    user_fields: {
      role: COUNSELOR_ROLE,
      graduation_year: graduationYear,
    },
    password,
    activation_token: counselorCode,
  });
  const response = await jsonFetch(`${BASE_URL}/user/sign_up`, { body, method: 'POST' });
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
  return { success: false, error: 'Invalid signup credentials. Please check Counselor Code, Username and Email are proper.' };
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
