export const getToken = () => {
  return window.sessionStorage.getItem('token');
}

export const setToken = token => {
  window.sessionStorage.setItem('token', token);
}
