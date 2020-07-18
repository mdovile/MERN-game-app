import React, { useContext, useEffect } from 'react';
import { Table } from 'reactstrap';
import { AddedGameRow } from './AddedGameRow';
import { GlobalContext } from '../context/GlobalState.js';

export const AddedGamesTable = () => {

  const { userGames, getGames } = useContext(GlobalContext);
    
  useEffect(() => {
      getGames();
      console.log(userGames);
  }, []);

  
  // {userGames.map(game => (<AddedGameRow game={game} />))}

    return (
        <Table hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Platform</th>
            <th>Notes</th>
            <th>Paid</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
       
          </tbody>
          </Table>
    );

};