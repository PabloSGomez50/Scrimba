import React from 'react';
import world_icon from '../assets/world-icon.svg';
import './Header.css';

export default function Header() {
    return (
        <nav>
            <img src={world_icon} alt='world'/>
            <h2>my travel journal.</h2>
        </nav>
    )
}