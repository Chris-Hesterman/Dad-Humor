import React, { Component } from 'react';
import Joke from './Joke';
import './JokeBoard.css';

let fillJokes;
class JokeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
            jokeMax: 10,
        };
        this.getJoke = this.getJoke.bind(this);
    }
    
    async getJoke() {
        return await fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    getJokeList() {
        fillJokes = setInterval(() => {   
            this.getJoke()
                .then(response => response.json())
                .then(data => {
                    if (this.state.jokes.length < this.state.jokeMax) {
                        
                        this.setState(prevState => {
                            if (!this.state.jokes.includes(data.joke)) {
                                const jokeInfo = [...prevState.jokes, data.joke];
                                return ({ jokes: jokeInfo });
                            }
                        });
                    }  
                })
                .catch(err => console.log(err, 'Fuck'));
        }, 0); 
        return fillJokes;
    }

    componentDidMount() {
        this.getJokeList();
    }

    componentDidUpdate() {
        if (this.state.jokes.length === this.state.jokeMax) {
            clearInterval(fillJokes);
        }   
    }

    render() {
        const dadJokes = this.state.jokes.length >= 10 ?
            this.state.jokes.map(joke => {
                return (
                    <li key={joke}>
                        <Joke humor={joke} />
                    </li>
                )
            })
            : false;

        const load = (
            <div className='JokeBoard-load'>
                <p>Loading...</p>
            </div>
        )
        

        return dadJokes ? (
            <div className='JokeBoard-container'>
                <div className='JokeBoard-side'>
                    <h1 className='Title' >Greatest Dad Jokes</h1>
                    <button className='JokeBoard-new'>Get New Jokes</button>
                </div>
                <div className='JokeBoard'>
                    {
                        <ol>{dadJokes}</ol>
                    }
                </div>
            </div>    
        )
        : (load)
    }
}

export default JokeBoard;