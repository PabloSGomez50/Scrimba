import React from 'react';
import location_icon from '../assets/location.svg';
import './Card.css';

export default function Card(props) {
    return (
        <article className='card'>
            <img src={props.imageUrl} className='card--image'/>
            <div className='card--info'>
                <div className='card--location'>
                    <img src={location_icon}/>
                    <span>{props.location.toUpperCase()}</span>
                    <a href={props.googleMapsUrl} target='_blank'>
                        View on Google Maps
                    </a>
                </div>
                <h1 className='card--title'>{props.title}</h1>
                <h3 className='card--date'>{props.startDate} - {props.endDate}</h3>
                <p className='card--desc'>{props.description}</p>
            </div>
        </article>
    )
}