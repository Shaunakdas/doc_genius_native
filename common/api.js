
const headers = (authToken) => {
  const returnValue = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  };
  if (authToken) { returnValue['Authorization'] = authToken; }
};


export const buildQuery = (queryObject) => {
  const keys = Object.keys(queryObject);
  return keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`).join('&');
};

export const jsonFetch = async (url, options = {}, authToken = '') => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(authToken),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    throw error;
  }
};
