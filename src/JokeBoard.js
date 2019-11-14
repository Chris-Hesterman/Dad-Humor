import React, { Component } from 'react';
import Joke from './Joke';
import './JokeBoard.css';

class JokeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
        };
        this.getJokes = this.getJokes.bind(this);
    }
    async getJokes() {
        let jokes = await fetch('https://icanhazdadjoke.com/search', {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            });
            return jokes;
    }

    componentDidMount() {
        this.getJokes()
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                this.setState(prevSt => ({ jokes: prevSt.jokes.concat(data.joke) }))
            })
            .catch(err => console.log(err, 'Fuck'))     
    }

    // componentDidUpdate() {
    //     if (this.state.jokes.length < 10) {
    //         setTimeout(() => {
    //             this.getJoke()
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     this.setState(prevState => {
    //                         if (!this.state.jokes.includes(data.joke)) {
    //                             return ({ jokes: prevState.jokes.concat(data.joke) });
    //                         }
    //                     });
    //                 })
    //                 .catch(err => console.log(err, 'Fuck'));
    //         }, 50);  
    //     }  
    // }

    render() {

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