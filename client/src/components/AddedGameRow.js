import React, { useContext, useState, useRef } from 'react';
import { GlobalContext } from '../context/GlobalState.js';
import { MdClear } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Editable } from './Editable';

export const AddedGameRow = ({ game }) => {
  const { deleteGame } = useContext(GlobalContext);
  const [sold, setSold] = useState(game.amountSold);

  const inputRef = useRef();
  /*
  useEffect(() => {
    const updateBody = {
     id,
     sendToDb: +sendToDb
    }
    

    updateGameSold(updateBody);
  }, [sendToDb]);*/

  return (
    <tr>
      <td>
        <Link to={`details/${game.slug}`} style={{ textDecoration: 'none' }}>
          {game.title}
        </Link>
      </td>
      <td>{game.platform}</td>
      <td>{game.notes}</td>
      <td style={{ color: 'red', fontWeight: 'bold' }}>{game.amountPaid}</td>
      <td style={{ color: 'green', fontWeight: 'bold' }}>
        <Editable game={game} text={sold} placeholder="0" type="input" childRef={inputRef}>
          <input
            ref={inputRef}
            type="text"
            name="amoundSold"
            onChange={(e) => setSold(e.target.value)}
          />
        </Editable>
      </td>
      <button
        type="button"
        className="btn shadow-none"
        style={{ border: 'none' }}
        onClick={() => deleteGame(game._id)}
      >
        {' '}
        <MdClear />{' '}
      </button>
    </tr>
  );
};
