import React, {createContext, useReducer } from 'react'; 
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    games: [],
    heading: "",
    userGames: [],
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
            console.log(res.data.results);
            dispatch({
                type: 'GET_GAMES',
                payload: res.data.results
            })
        } catch (error) {
            dispatch({
                type: 'USER_GAME_LIST_ERROR',
                payload: error.response.data.error
            });
        }
    }

    return (<GlobalContext.Provider 
        value={{
            games: state.games, 
            heading: state.heading, 
            getRandomGameList, 
            getSearchedGameList,
            getGames
            }}>       
        {children}
    </GlobalContext.Provider>);
}   