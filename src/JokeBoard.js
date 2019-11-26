import React, { Component } from 'react';
import Joke from './Joke';
import './JokeBoard.css';
import dad from './dadSmall.png';


let fillJokes;
class JokeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
            jokeMax: 10,
        };
        this.getJoke = this.getJoke.bind(this);
        this.collectJokes = this.collectJokes.bind(this);
        this.handleVotes = this.handleVotes.bind(this);
        this.sortJokes = this.sortJokes.bind(this);
        this.handleClick = this.handleClick.bind(this); 
    }
    
    async getJoke() {
        return await fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json());
    }

    collectJokes() {
        fillJokes = setInterval(() => {
            this.getJoke().then(data => {
                const jokesArr = this.state.jokes;
                const joke = {
                    votes: 0,
                    joke: data.joke,
                    id: data.id 
                }
                const newJokesArr = jokesArr.filter(stateJoke => {
                    return stateJoke.id !== joke.id;
                });
                newJokesArr.push(joke);
                this.setState({ jokes: newJokesArr })
            });
        }, 90);
    }

    handleClick() {
        this.setState({ jokes: [] })
        this.collectJokes();
    }

    handleVotes(votes, id) {
        let jokesArr = this.state.jokes;
        
        jokesArr.length = this.state.jokeMax;
        jokesArr = jokesArr.map(jokeItem => {
                if (jokeItem.id === id) {
                    return {
                        votes: votes,
                        joke: jokeItem.joke,
                        id: jokeItem.id
                    }
                } else {
                    return jokeItem
                }
            });
        this.setState({ jokes: jokesArr });
        setTimeout(() => {
            this.sortJokes();
        }, 100);
    }

    sortJokes() {
        const sortedJokes = this.state.jokes;
        sortedJokes.sort((a, b) => {
            return b.votes - a.votes;
        });
        this.setState({ jokes: sortedJokes })
    }

    componentDidMount() {
        this.collectJokes();
    }

    componentDidUpdate() {
        if (this.state.jokes.length >= this.state.jokeMax) {
            clearInterval(fillJokes);
        } 
    }

    render() {
        const jokeArr = this.state.jokes;
        jokeArr.length = jokeArr.length >= 10 ? 10: jokeArr.length;

        let dadJokes = jokeArr.length >= 10 ? jokeArr.map((joke, index)=> {
                return (
                    <li key={joke.id}>
                        <Joke joke={joke} jokeId={joke.id} handleVotes={this.handleVotes} />
                    </li>
                )
            }): false;
        const load = (
            <div className='JokeBoard-load'>
                <p>Loading...</p>
            </div>
        )
        
        return dadJokes ? (
            <div className='JokeBoard-container'>
                <div className='JokeBoard-side'>
                    <h1 className='Title' >Greatest Dad Jokes</h1>
                    <img src={dad} alt='generic dad'/>
                    <button className='JokeBoard-new' onClick={this.handleClick}>Get New Jokes</button>
                </div>
                <div className='JokeBoard'>
                    {
                        <ol>{dadJokes}</ol>
                    }
                </div>
            </div>    
        )
        : load;
    }
}

export default JokeBoard;