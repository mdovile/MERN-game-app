import React from 'react'

export const AddedGameRow = ( {game} ) => {
    return (
          <tr>
            <td>{game.title}</td>
            <td>{game.platform}</td>
            <td>{game.notes}</td>
            <td style={{color: "red", fontWeight: "bold"}}>{game.amountPaid}</td>
            <td style={{color: "green", fontWeight: "bold"}}>{game.amountSold}</td>
          </tr>  
    )
}
