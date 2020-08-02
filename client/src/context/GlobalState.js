import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
  games: [],
  userGames: [],
  error: null,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getRandomGameList() {
    try {
      const res = await axios.get('https://api.rawg.io/api/games');
      dispatch({
        type: 'GET_RANDOM_GAME_LIST',
        payload: res.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getSearchedGameList(searchTitle) {
    try {
      const res = await axios.get(`https://api.rawg.io/api/games?search=${searchTitle}`);
      dispatch({
        type: 'GET_SEARCH_RESULTS',
        payload: res.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getGames() {
    try {
      const res = await axios.get('/api/v1/games');
      dispatch({
        type: 'GET_GAMES',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_GAME_LIST_ERROR',
        payload: error.response.data.error,
      });
    }
  }

  async function addGame(game) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/games', game, config);

      dispatch({
        type: 'ADD_GAME',
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'USER_GAME_LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteGame(id) {
    try {
      await axios.delete(`/api/v1/games/${id}`);

      dispatch({
        type: 'DELETE_GAME',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'USER_GAME_LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function updateGameSold(newData) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.put('/api/v1/games/update', newData, config);
    } catch (error) {
      dispatch({
        type: 'USER_GAME_LIST_ERROR',
        payload: error.response.data.error,
      });
    }
  }

  async function register(newUser) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.post('/api/v1/users', newUser, config);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response.data.error,
      });
      console.log(error.response.data.error)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        games: state.games,
        error: state.error,
        userGames: state.userGames,
        user: state.user,
        getRandomGameList,
        getSearchedGameList,
        getGames,
        addGame,
        deleteGame,
        updateGameSold,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
