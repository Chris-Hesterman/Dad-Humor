import React, { Component } from 'react';
import Joke from './Joke';
import './JokeBoard.css';
import dad from './dadSmall.png';


let fillJokes;
class JokeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: new Set(),
            jokeMax: 10,
        };
        this.getJoke = this.getJoke.bind(this);
        this.collectJokes = this.collectJokes.bind(this);
        this.handleVotes = this.handleVotes.bind(this);
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
                let newJokes = this.state.jokes;
                const joke = {
                    votes: 0,
                    joke: data.joke,
                    id: data.id 
                }
                newJokes.add(joke);
                this.setState({ jokes: newJokes })
            });
        }, 90);
    }

    handleClick() {
        this.setState({ jokes: new Set() })
        this.collectJokes();
    }

    handleVotes(votes, jokeIndex) {
        const jokeArr = Array.from(this.state.jokes);
        let replacementInfo = {
            votes: votes,
            joke: jokeArr[jokeIndex].joke,
            id: jokeArr[jokeIndex].id
        }
        jokeArr.splice(jokeIndex, 1, replacementInfo);
        this.setState({ jokes: new Set(jokeArr) });
    }

    componentDidMount() {
        this.collectJokes();
    }

    componentDidUpdate() {
        if (this.state.jokes.size >= this.state.jokeMax) {
            clearInterval(fillJokes);
        } 
    }

    render() {
        const jokeArr = Array.from(this.state.jokes);
        jokeArr.length = jokeArr.length >= 10 ? 10: jokeArr.length;

        let dadJokes = jokeArr.length >= 10 ? jokeArr.map((joke, index)=> {
                return (
                    <li key={joke.id}>
                        <Joke joke={joke} jokeIndex={index} handleVotes={this.handleVotes} />
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