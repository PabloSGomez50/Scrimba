import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import data from './data';

export default function App() {
    return (
        <div className='container'>
            <Header />
            {data.map(item => (
                <Card 
                    {...item}
                />
            ))}
        </div>
    )
}