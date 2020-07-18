import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1 mx-auto">
                <Link to="/" >
                 Game App
                </Link></span>  
                <Link to="/myGames" >
                    My Games
                </Link>
        </nav>
    );
};

export default Navbar;