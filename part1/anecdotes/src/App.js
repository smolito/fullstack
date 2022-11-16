import { useState } from 'react'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomValue = Math.floor(Math.random() * (max - min + 1) + min)
  //console.log('random value is ', RandomValue)
  return randomValue; // The maximum is inclusive and the minimum is inclusive
}

const DisplayBestAnecdote = (props) => {
    return(
      <div>
        <h2>popular anecdote</h2>
        {props.anecdoteText}
        <p>has {props.anecdoteVotes} votes</p>
      </div>
    )
}



const DisplayAnecdote = (props) => {
  return(
    <div>
      <h2>ANECDOTE OF THE DAY</h2>
      {props.anecdoteText}
      <p>has {props.anecdoteVotes} votes so far</p>
    </div>
  )
}

const Button = (props) => {

  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [points, setPoints ] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(getRandomIntInclusive(0,anecdotes.length-1))

  const setToSelected = (newSelect) => {
    setSelected(newSelect)
    //console.log('new selected anecdote: ', anecdotes[newSelect])
  }

  const setToPoints = (anecdote) => {
    let copy = [...points]
    copy[anecdote] += 1
    setPoints(copy)
  }

  return (
    <div>
      <DisplayAnecdote anecdoteText={anecdotes[selected]} anecdoteVotes={points[selected]} />
      <Button handleClick={() => setToPoints(selected)} text="vote" />
      <Button handleClick={() => setToSelected(getRandomIntInclusive(0,anecdotes.length-1))} text="new anecdote" />
      <DisplayBestAnecdote anecdoteText={anecdotes[points.indexOf(Math.max(...points), 0)]} anecdoteVotes={Math.max(...points)} />
    </div>
  )
}

export default App