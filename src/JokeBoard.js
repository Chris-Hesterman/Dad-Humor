import React, { Component } from 'react';
import Joke from './Joke';
import './JokeBoard.css';
import dad from './dadSmall.png';

let fillJokes;

class JokeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [
                {
                    votes: undefined,
                    joke: undefined,
                    id: undefined
                }
            ],
            jokeMax: 10,
        };
        this.getJoke = this.getJoke.bind(this);
        this.getJokeList = this.getJokeList.bind(this);
        this.handleVotes = this.handleVotes.bind(this);
    }
    
    async getJoke() {
        return await fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json());
    }

    getJokeList() {
        this.getJoke().then(data => {
            this.setState({ jokes: [
                {
                    votes: 0,
                    joke: data.joke,
                    id: data.id
                }
            ]});
        });
        fillJokes = setInterval(() => { 
            this.getJoke()
                .then(data => {
                    if (this.state.jokes.length < this.state.jokeMax) {  
                        for (let joke of this.state.jokes) {
                            if (this.state.jokes[0].id === undefined) {
                                this.setState({
                                        jokes: [{
                                            votes: 0,
                                            joke: data.joke,
                                            id: data.id
                                        }]
                                });
                            } else if (joke.joke !== data.joke) {
                                this.setState(prevState => {
                                    const jokeInfo = [...prevState.jokes, {
                                            votes: 0,
                                            joke: data.joke,
                                            id: data.id
                                        }
                                    ]; 
                                    return ({ jokes: jokeInfo });
                                });
                            } 
                        }                                                  
                    }
                }); 
        }, 1000); 
        
    }

    handleVotes(votes, jokeIndex) {
        let replacementInfo = {
            votes: votes,
            joke: this.state.jokes[jokeIndex].joke,
            id: this.state.jokes[jokeIndex].id
        }
        let jokeArr = this.state.jokes;
        jokeArr.splice(jokeIndex, 1, replacementInfo);
        this.setState({ jokes: jokeArr });
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
            this.state.jokes.map((joke, index)=> {
                return (
                    <li key={joke.id}>
                        <Joke joke={joke} jokeIndex={index} handleVotes={this.handleVotes} />
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
                    <img src={dad} alt='generic dad'/>
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