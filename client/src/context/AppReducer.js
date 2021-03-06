export default (state, action) => {
  switch (action.type) {
    case 'GET_RANDOM_GAME_LIST':
      return {
        ...state,
        games: action.payload,
        isLoading: false,
      };

    case 'GET_SEARCH_RESULTS':
      return {
        ...state,
        games: action.payload,
      };
    case 'GET_GAMES':
      return {
        ...state,
        userGames: action.payload,
        isLoading: false,
      };

    case 'USER_GAME_LIST_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'ADD_GAME':
      return {
        ...state,
        userGames: [...state.userGames, action.payload],
      };

    case 'DELETE_GAME':
      return {
        ...state,
        userGames: state.userGames.filter((game) => game._id !== action.payload),
      };

    case 'UPDATE_GAME':
      return {
        ...state,
        userGames: [...state.userGames, action.payload],
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAIL':
    case 'LOGOUT':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
