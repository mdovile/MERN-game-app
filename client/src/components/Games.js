import React, { useContext, useEffect } from 'react';
import { Game } from './Game';
import { Search } from './Search';
import { GlobalContext } from '../context/GlobalState.js';
import { CardDeck} from 'reactstrap';

export const Games = () => {

    const { games, heading, getRandomGameList } = useContext(GlobalContext);

    useEffect(() => {
        getRandomGameList();
    }, []);

    const gamesWithImages = games.filter(game => game.background_image);

    return (
         <div className="container" >
            <Search />
           <h3 className="text-center">{heading}</h3>
           <div id="list" className="row">
            <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
               {gamesWithImages.map(game => (<Game key={game.id} game={game}/>))}
            </CardDeck>
           </div>    
        </div>
    )
}