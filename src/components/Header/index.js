import React,{Component} from 'react';
import {
    NavLink
} from 'react-router-dom';
import './index.css';


const Header=()=>{
    return (
        <nav className="nav">
            <NavLink exact to='/' activeClassName="active">Search</NavLink>
            <NavLink exact to="/lastest" activeClassName="active">Lastest</NavLink>
        </nav>
    )
}

export default Header;