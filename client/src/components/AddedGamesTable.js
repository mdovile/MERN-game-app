import React, { useContext, useEffect } from 'react';
import { Table } from 'reactstrap';
import { AddedGameRow } from './AddedGameRow';
import { GlobalContext } from '../context/GlobalState.js';
import { MdModeEdit } from 'react-icons/md';

export const AddedGamesTable = () => {
  const { userGames, getGames } = useContext(GlobalContext);

  useEffect(() => {
    getGames();
  }, []);

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Platform</th>
          <th>Notes</th>
          <th>Paid</th>
          <th>
            Sold <MdModeEdit />
          </th>
        </tr>
      </thead>
      <tbody>
        {userGames.map((game) => (
          <AddedGameRow game={game} key={game._id} />
        ))}
      </tbody>
    </Table>
  );
};
