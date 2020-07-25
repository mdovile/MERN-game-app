import React, { useContext, useEffect } from 'react';
import { Game } from './Game';
import { Search } from './Search';
import { GlobalContext } from '../context/GlobalState.js';
import { Row } from 'reactstrap';

export const Games = () => {
  const { games, getRandomGameList } = useContext(GlobalContext);

  useEffect(() => {
    getRandomGameList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gamesWithImages = games.filter((game) => game.background_image);

  return (
    <div className="container">
      <Search />
      <div id="list" className="row">
        <Row xs="2">
          {gamesWithImages.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </Row>
      </div>
    </div>
  );
};
