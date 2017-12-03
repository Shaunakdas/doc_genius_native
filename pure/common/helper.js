import { AsyncStorage } from 'react-native';
import IMAGES from './images';

const SCHOOL_BASE = 'connecpath.tk';

export const capitalCase = value => (value && value.length ? `${value[0].toUpperCase()}${value.slice(1)}` : '');

export const getCurrentRouteName = (navState) => {
  if (Object.prototype.hasOwnProperty.call(navState, 'index')) {
    return getCurrentRouteName(navState.routes[navState.index]);
  }
  return navState.routeName;
};

export const validateEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validDateOfBirth = (date) => {
  // eslint-disable-next-line
  return true;
};

export const validMobileNumber = (email) => {
  // eslint-disable-next-line
  return true
};

export const validGraduationYear = (year) => {
  const numericValue = +year;
  return (!isNaN(numericValue) &&
          (numericValue >= 2018) &&
          (numericValue <= 2021) &&
          (year.length === 4));
};

export const getCategory = (categories, name) => {
  const neededCategory = categories.filter(category => category.name === name);
  return neededCategory.length ? neededCategory[0] : null;
};

export const getCategoryById = (categories, id) => {
  const neededCategory = categories.filter(category => category.id === id);
  return neededCategory.length ? neededCategory[0] : null;
};

export const createRandomSlug = () => Math.random().toString(36).substr(2);

export const getUserImage = (user, size = 30, resolution = 3) => {
  if (user.username === 'cherylbot') {
    return IMAGES.BOT_USER;
  }
  let avatar_url = user.avatar_url;
  let school_code = user.school_code;
  if (user.user_fields) {
    avatar_url = user.user_fields.avatar_url || user.avatar_template;
    school_code = user.user_fields.school_code;
  }
  const prefix = !school_code || school_code === 'indiez' ? '' : school_code;
  if (avatar_url) {
    return { uri: `http://${prefix}${SCHOOL_BASE}${avatar_url.replace('{size}', size * resolution)}`, height: size, width: size };
  }
  return IMAGES.NORMAL_USER;
};

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Do nothing
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
  return null;
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // do nothing
  }
};
