export const capitalCase = value => (value && value.length ? `${value[0].toUpperCase()}${value.slice(1)}` : '');

export const getCurrentRouteName = (navState) => {
  if (Object.prototype.hasOwnProperty.call(navState, 'index')) {
    return getCurrentRouteName(navState.routes[navState.index]);
  }
  return navState.routeName;
};
