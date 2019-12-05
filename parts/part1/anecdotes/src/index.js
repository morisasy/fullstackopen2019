import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = (props) => { 
    const {onClick, text } = props
    return (
      <button onClick={onClick}>  {text} </button>
    )
  }

  const Voting =(props) =>{
    return(
      <div>
        <h3>{props.text}</h3>
        <p>{props.anecdotes}</p>
        <p>has {props.vote} votes</p>
      </div>
    )    
  }
const Display =(props) =>{
  if (isNaN(props.vote) || props.vote === 0){
    return(
      <div>
      </div>
    )  
  } else {
    return(
      <div>
        <h3>{props.text}</h3>
        <p>{props.anecdotes}</p>
        <p>has {props.vote} votes</p>
      </div>
    )  
  }   
}
const App = (props) => {
  // initial points each anecdote has got 0 vote.
    const points =  [0,0,0,0,0,0];
    let anecdotesLength = props.anecdotes.length;
    const [selected, setSelected] = useState({
      selected: 0, 
      vote: [...points]
    })

    const handleClick = () =>{
    let randomSelected =Math.floor(Math.random()*anecdotesLength);
    console.log('Random number  value is randomSelected: ', randomSelected)
    const newSelected = { 
      selected: randomSelected, 
      vote: selected.vote
    }

   setSelected(newSelected)
   console.log('Random selected   ', props.anecdotes[randomSelected])
  }
  
 const handleVote = () => {
       
    if (points.length ===0){
      if (points.indexOf(selected.selected) === -1) {
       console.log("out of vote limit")
      }
      selected.vote[selected.selected] += 1

    } else { 
      selected.vote[selected.selected] += 1
    } 
  }

  return (
    <div>
      <Voting 
        text = "Anecdote of the day" 
        anecdotes = {props.anecdotes[selected.selected]}
        vote = {selected.vote[selected.selected]}
       />
      <Button onClick={handleVote} text = "vote" />
      <Button onClick={handleClick} text = "next anecode" />
      <Display 
        text = "Anecdote with most vote" 
        anecdotes = {props.anecdotes[selected.vote.indexOf(Math.max(...selected.vote))]}
        vote = {Math.max(...selected.vote)}
       />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)