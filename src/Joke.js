import React from 'react';
import './Joke.css'

function Joke(props) {
    return (
        <div className='Joke'>
            <button>like</button>
            <p>{props.humor}</p>
        </div> 
    );
}

export default Joke;