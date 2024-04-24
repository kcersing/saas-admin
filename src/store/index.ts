import { initialState } from '../../types/global';

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case 'update-userInfo': {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      return {
        ...state,
        userLoading,
        userInfo,
      };
    }
    case 'update-UserMenuRole':  {
      const { userMenu = initialState.userMenu} = action.payload;
      return {
        ...state,
        userMenu,
      };
    }
    default:
      return state;
  }
}
