import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const VoteLine = ({points, selected}) => (
  <p>has {points[selected]} votes</p>
)

const MostVoted = ({anecdotes, mostVoted, points}) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <VoteLine points={points} selected={mostVoted}/>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
  const [mostVoted, setMostVoted] = useState(0)

  const addPoint = ({selected}) => {
    const newPoints = {
      ...points,
    }
    newPoints[selected] += 1
    setPoints(newPoints)

    if (newPoints[selected] > newPoints[mostVoted])
      setMostVoted(selected)
  }

  const randomAnecdote = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <VoteLine points={points} selected={selected} />
      <Button text={"vote"} handleClick={() => addPoint({selected})}/>
      <Button text={"next anecdote"} handleClick={() => setSelected(randomAnecdote)} />
      <MostVoted anecdotes={anecdotes} mostVoted={mostVoted} points={points} />
    </div>
  )
}

export default App