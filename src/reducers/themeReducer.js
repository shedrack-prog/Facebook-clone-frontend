import Cookies from 'js-cookie';
const theme = Cookies.get('darkTheme');
export function themeReducer(
  state = theme ? JSON.parse(theme) : false,
  action
) {
  switch (action.type) {
    case 'DARK':
      return true;
    case 'LIGHT':
      return false;
    default:
      return state;
  }
}
