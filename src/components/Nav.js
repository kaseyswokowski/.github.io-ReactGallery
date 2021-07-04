import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        //Create Links
        <nav className= "main-nav">
            <ul>
                <Link to="/sunset">Sunset</Link>
                <Link to="/waterfall">Waterfall</Link>
                <Link to="/forest">Forest</Link>
            </ul>

        </nav>
    )
}

export default Nav;