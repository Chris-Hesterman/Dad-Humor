import React, { Component } from 'react';
import Joke from './Joke';
import './JokeBoard.css';

class JokeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
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

    componentDidMount() {
        
        this.getJoke()
            .then(response => response.json())
            .then(data => {
                this.setState(prevSt => ({ jokes: prevSt.jokes.concat(data.joke) }))
            })
            .catch(err => console.log(err, 'Fuck'))     
    }

    componentDidUpdate() {
        
        if (this.state.jokes.length < 10) {
            setTimeout(() => {
                this.getJoke()
                    .then(response => response.json())
                    .then(data => {
                        this.setState(prevState => {
                            if (!this.state.jokes.includes(data.joke)) {
                                return ({ jokes: prevState.jokes.concat(data.joke) });
                            }
                        });
                    })
                    .catch(err => console.log(err, 'Fuck'));
            }, 50);  
        }  
    }


    render() {
        console.log(this.state.jokes)

        return (
            <div>
                <ol>
                    {this.state.jokes.map((joke, index) => {
                        return (
                            <li key={joke}>
                                <Joke humor={joke} />
                            </li>
                        )
                    })}
                </ol>
                
            </div>
        )
    }
}

export default JokeBoard;