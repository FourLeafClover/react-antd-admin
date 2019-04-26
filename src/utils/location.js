import cloneDeep from 'lodash/cloneDeep';
let key = 1;

export const getFullPath = location => {
  if (location.search) {
    return `${location.pathname}${location.search}`;
  } else {
    return location.pathname;
  }
};

export const getLocationKey = location => {
  return `${location.pathname}-${key++}`;
};

export const cloneMenu = menu => {
  return cloneDeep(menu);
};
