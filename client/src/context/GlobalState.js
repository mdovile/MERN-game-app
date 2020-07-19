import React, {createContext, useReducer } from 'react'; 
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    games: [],
    userGames: [{}],
    error: null,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getRandomGameList() {
        try {
            const res = await axios.get('https://api.rawg.io/api/games?dates=2019-01-01,2020-06-30&ordering=-rating/?page_size=5'); 
            dispatch({
                type: 'GET_RANDOM_GAME_LIST',
                payload: res.data.results
           }) 
        } catch (error) {
            console.log(error);
        }    
    }

   async function getSearchedGameList(searchTitle) {
        try {
            const res = await axios.get(`https://api.rawg.io/api/games?search=${searchTitle}`);
            dispatch({
                type: 'GET_SEARCH_RESULTS',
                payload: res.data.results
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function getGames() {       
        try {
            const res = await axios.get('/api/v1/games');
            console.log('called my api');
            dispatch({
                type: 'GET_GAMES',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'USER_GAME_LIST_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function addGame(game) {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      
          try {
            const res = await axios.post('/api/v1/games', game, config);
      
            dispatch({
              type: 'ADD_GAME',
              payload: res.data.data
            });
          } catch (err) {
              console.log(err);
            dispatch({
              type: 'USER_GAME_LIST_ERROR',
              payload: err.response.data.error
            });
          }
    }

    async function deleteGame(id) {
        try {
          await axios.delete(`/api/v1/games/${id}`);
    
          dispatch({
            type: 'DELETE_GAME',
            payload: id
          });
        } catch (err) {
          dispatch({
            type: 'USER_GAME_LIST_ERROR',
            payload: err.response.data.error
          });
        }
      }

    return (<GlobalContext.Provider 
        value={{
            games: state.games, 
            error: state.error,
            userGames: state.userGames,
            getRandomGameList, 
            getSearchedGameList,
            getGames,
            addGame,
            deleteGame
            }}>       
        {children}
    </GlobalContext.Provider>);
}   