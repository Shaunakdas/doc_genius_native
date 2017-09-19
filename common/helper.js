import IMAGES from './images';

const SCHOOL_BASE = 'http://connecpath.tk';

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

export const validGraduationYear = (year) => {
  const numericValue = +year;
  return (!isNaN(numericValue) &&
          (numericValue >= 2017) &&
          (numericValue <= 2023) &&
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
  const { avatar_url } = user.user_fields;
  if (avatar_url) {
    return { uri: `${SCHOOL_BASE}${avatar_url.replace('{size}', size * resolution)}` };
  }
  return IMAGES.NORMAL_USER;
};
