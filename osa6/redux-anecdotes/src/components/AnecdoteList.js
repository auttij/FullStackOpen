import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
	const anecdotes = useSelector(state => 
		state.anecdotes.filter(a => 
			a.content.toLowerCase().includes(
				state.filter.toLowerCase()
			)
		)
	)
	const dispatch = useDispatch()

	const addVote = (id, anecdote) => {
		dispatch(vote(id, anecdote))
		dispatch(setNotification(`you voted ${anecdote.content}`, 5))
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
						addVote(anecdote.id, anecdote)
					}
				/>
			)}
		</>
	)
}

export default AnecdoteList