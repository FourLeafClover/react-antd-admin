export const login = ({ userName, password }) => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: {
        token:'123123123132',
        user: {
          userName,
          avatar:'https://avatars1.githubusercontent.com/u/8449788?s=40&v=4'
        }
      },
    });
  });
};

export const getUserInfo = () => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: {
        userName: 'admin',
        avatar:'https://avatars1.githubusercontent.com/u/8449788?s=40&v=4'
      }
    });
  });
}