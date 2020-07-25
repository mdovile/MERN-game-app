import React, { useContext, useEffect } from 'react';
import { Game } from './Game';
import { Search } from './Search';
import { GlobalContext } from '../context/GlobalState.js';
import { Row, Container, Col } from 'reactstrap';

export const Games = () => {
  const { games, getRandomGameList } = useContext(GlobalContext);

  useEffect(() => {
    getRandomGameList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gamesWithImages = games.filter((game) => game.background_image);

  return (
    <Container>
      <Search />
      <Row>
        {gamesWithImages.map((game) => (
          <Col sm={6}>
            <Game key={game.id} game={game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
