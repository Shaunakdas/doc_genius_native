export const capitalCase = value => value && value.length ? `${value[0].toUpperCase()}${value.slice(1)}` : ''

export const getCurrentRouteName = (navState)  => {
  if (navState.hasOwnProperty('index')) {
      return getCurrentRouteName(navState.routes[navState.index]);
  } else {
      return navState.routeName;
  }
}