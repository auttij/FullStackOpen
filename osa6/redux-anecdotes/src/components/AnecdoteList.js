import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

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
		const anecdote = anecdotes.find(a => a.id === id)
		dispatch(vote(id))
		dispatch(showNotification(`you voted ${anecdote.content}`))
		setTimeout(() => {
			dispatch(hideNotification())
		}, 5000)
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