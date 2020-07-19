import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState.js';
import { MdClear } from 'react-icons/md'
import { Link } from 'react-router-dom';

export const AddedGameRow = ( {game} ) => {

  const { deleteGame } = useContext(GlobalContext);

    return (
          <tr>
             <Link to={`details/${game.slug}`} style={{textDecoration: "none"}}><td>{game.title}</td></Link>
            <td>{game.platform}</td>
            <td>{game.notes}</td>
            <td style={{color: "red", fontWeight: "bold"}}>{game.amountPaid}</td>
            <td style={{color: "green", fontWeight: "bold"}}>{game.amountSold}</td>
            <button type="button" className="btn shadow-none"
           style={{border: "none" }}
             onClick={() => deleteGame(game._id)} className="delete-btn"> <MdClear /> </button>
          </tr>  
    )
}
