import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div key={anecdote.id}>
		<div>
			{anecdote.content}
		</div>
		<div>
			has {anecdote.votes}
			<button onClick={handleClick}>vote</button>
		</div>
	</div>
	)
}

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()

	const addVote = (id) => {
		dispatch(vote(id))
	}

	const sortFunc = (a, b) => {
		return b.votes - a.votes
	}

	return (
		<>
			<h2>anecdotes</h2>
			{anecdotes.sort(sortFunc).map(anecdote =>
				<Anecdote 
					anecdote={anecdote}
					handleClick={() => 
						addVote(anecdote.id)
					}
				/>
			)}
		</>
	)
}

export default AnecdoteList