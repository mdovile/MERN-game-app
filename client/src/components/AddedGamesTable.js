import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { AddedGameRow } from './AddedGameRow';
import { GlobalContext } from '../context/GlobalState.js';
import { MdModeEdit } from 'react-icons/md';
import TablePagination from './TablePagination';

export const AddedGamesTable = () => {
  const { userGames, getGames } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(10);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getGames();
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = userGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="userGamesTable">
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
          {currentGames.map((game) => (
            <AddedGameRow game={game} key={game._id} />
          ))}
        </tbody>
      </Table>
      <TablePagination
        gamesPerPage={gamesPerPage}
        totalGames={userGames.length}
        paginate={paginate}
      />
    </div>
  );
};
