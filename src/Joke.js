import React from 'react';
import './Joke.css'

function Joke(props) {
    const handleClick = (e) => {
        const list = e.target.classList;
        let voteTotal = props.joke.votes;
        
        list.add('thumbClick');

        if (list[1].includes('down')) {
            voteTotal = voteTotal - 1;
        } else {
            voteTotal = voteTotal + 1;
        }
        props.handleVotes(voteTotal, props.jokeId);
        setTimeout(() => { 
            list.remove('thumbClick');            
        }, 250);
    }

    const voteIndicators = (votes) => {
        const votePad = Math.ceil((votes + 10) / 3);
        const faces = ['🤬', '😡', '😤', '🙁', '😐', '😏', '😁', '😂'];
        const colors = ['maroon', 'red', 'orange', 'yellow', 'lime', 'seagreen', 'blue', 'purple'];
        const color = votePad <= 0 ? 0: votePad >= 7 ? 7: votePad;
        const face = color;

        return ({ emoji: faces[face], ringColor: colors[color] });
    }

    const { joke } = props;
    const color = voteIndicators(joke.votes).ringColor;
    const colorRing = {
        border: `5px solid ${color}`
    }
    
    return (
        <div className='Joke'>
            <i onClick={handleClick} className='far fa-thumbs-down' />
            <p className='Joke-votes' style={colorRing}>{joke.votes}</p>
            <i onClick={handleClick} className='far fa-thumbs-up' />
            <div className='Joke-container'>
                <p>{joke.joke}</p>
                <h1 className='Joke-emoji'>{voteIndicators(joke.votes).emoji}</h1>
            </div>
            
        </div> 
    );
}

export default Joke;