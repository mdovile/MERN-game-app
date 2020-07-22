import React, { useState, useEffect, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GlobalContext } from '../context/GlobalState.js';

export const Search = () => {
  const { getSearchedGameList } = useContext(GlobalContext);
  const [userInput, setUserInput] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    getSearchedGameList(searchTitle);
  }, [searchTitle]);

  const findGame = (e) => {
    e.preventDefault();
    setSearchTitle(userInput);
    setUserInput('');
  };

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="searchBarContainer">
      <form className="search-container" onSubmit={findGame}>
        <input
          type="text"
          id="search-bar"
          placeholder="Search for games..."
          name="userInput"
          value={userInput}
          onChange={onChange}
        ></input>
        <div className="searchButtonContainer" style={{ position: 'relative' }}>
          <button
            className="btn pull-right shadow-none"
            type="submit"
            style={{
              border: 'none',
              position: 'absolute',
              right: '0px',
              top: '-46px',
              zIndex: 1,
              width: '45px',
              height: '45px',
              background: '#ddd',
            }}
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
