import React from 'react';
import { Link } from "react-router-dom";
import { FaGamepad } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark" style={{ textAlign: "center", display: "block" }}>
            <span className="navbar-brand mb-0 h1 mx-auto" style={{textAlign: "center"}}>
                <Link to="/" style={{ textDecoration: "none" }} >
                 FIND GAMES
                </Link></span>  
                <Link to="/myGames" style={{ position: "absolute", right: 20, top: 18, textDecoration: "none", textAlign: "right" }}>
                     My Games {' '}
                    <FaGamepad /> 
                </Link>
        </nav>
    );
};

export default Navbar;