import Cookies from 'js-cookie';
const user = Cookies.get('user');
export function userReducer(state = user ? JSON.parse(user) : null, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'UPDATEPICTURE':
      return { ...state, picture: action.payload };
    case 'VERIFY':
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}
