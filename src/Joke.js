import React, { Component }from 'react';
import './Joke.css'

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: '😐',
            ringColor: 'lime'
        }
        this.borderColor = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.voteIndicators = this.voteIndicators.bind(this);
    }

    handleClick(e) {
        const list = e.target.classList;
        let voteTotal = this.props.joke.votes;
        
        list.add('thumbClick');

        if (list[1].includes('down')) {
            voteTotal = voteTotal - 1;
        } else {
            voteTotal = voteTotal + 1;
        }
        
        //this.voteIndicators(voteTotal);
        this.props.handleVotes(voteTotal, this.props.jokeId);
        setTimeout(() => { 
            list.remove('thumbClick');            
        }, 250);
    }

    voteIndicators(votes) {
        const votePad = Math.ceil((votes + 10) / 3);
        const faces = ['🤬', '😡', '😤', '🙁', '😐', '😏', '😁', '😂'];
        const colors = ['maroon', 'red', 'orange', 'yellow', 'lime', 'green', 'blue', 'purple'];
        const color = votePad <= 0 ? 0: votePad >= 7 ? 7: votePad;
        const face = color;

        return ({ emoji: faces[face], ringColor: colors[color] });
    }

    // componentDidUpdate() {
    //     this.borderColor.current.style.border = `3px solid ${this.voteIndicators(this.props.joke.votes).ringColor}`;
    // }

    render() {
        const color = this.voteIndicators(this.props.joke.votes).ringColor;
        const colorRing = {
            border: `3px solid ${color}`
        }
        return (
            <div className='Joke'>
                <i onClick={this.handleClick} className='far fa-thumbs-down' />
                <p className='Joke-votes' style={colorRing}>{this.props.joke.votes}</p>
                <i onClick={this.handleClick} className='far fa-thumbs-up' />
                <div className='Joke-container'>
                    <p>{this.props.joke.joke}</p>
                    <h1 className='Joke-emoji'>{this.voteIndicators(this.props.joke.votes).emoji}</h1>
                </div>
                
            </div> 
        );
    }
}
    

export default Joke;