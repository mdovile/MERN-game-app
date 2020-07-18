export default (state, action) => {
    switch(action.type){
        case 'GET_RANDOM_GAME_LIST':
            return {
                ...state,
                games: action.payload,
            }

        case 'GET_SEARCH_RESULTS':
            return {
                ...state,
                games: action.payload,
            }
        case 'GET_GAMES':
            return {
                ...state,
                userGames: action.payload
            }

        case 'USER_GAME_LIST_ERROR':
            return {          
                ...state,
                error: action.payload      
            }

        case 'ADD_GAME':
            return {
                ...state,
                userGames: [...state.userGames, action.payload]
            }

        default:
            return state;
    }
}