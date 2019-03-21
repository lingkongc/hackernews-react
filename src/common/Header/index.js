import React, { Component } from 'react';
import {
    NavLink
} from 'react-router-dom';
import './index.css';


const Header = () => {
    return (
        <nav className="nav">
            <div className="wrapper">
                <NavLink exact to='/' activeClassName="active">Search</NavLink>
                <NavLink exact to="/lastest" activeClassName="active">Lastest</NavLink>
            </div>
        </nav>
    )
}

export default Header;