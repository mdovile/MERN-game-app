
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from '../context/GlobalState.js';

export const Search = () => {
  
    const { games, getSearchedGameList } = useContext(GlobalContext);
    const [userInput, setUserInput] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        getSearchedGameList(searchTitle);
    }, [searchTitle])

    const findGame = e => {
        e.preventDefault();
        setSearchTitle(userInput);
    };

    const onChange = e => {
        setUserInput(e.target.value);
    };

    return (
        <div className="searchBarContainer">
        <form  className="search-container"
        onSubmit={findGame}>
         <input
            type="text"
            id="search-bar" 
            placeholder="Search for games..." 
            name="userInput"
            value={userInput}
            onChange={onChange} >
            </input>
            <button className="searchGamesButton" type="submit">
             Search
        </button>
        </form>
    </div>
   
    );  
};  

export default Search;