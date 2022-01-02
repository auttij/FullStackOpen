import React from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
	}

	const reset = () => {
		content.onChange({ 'target': {'value': ''}})
		author.onChange({ 'target': {'value': ''}})
		info.onChange({ 'target': {'value': ''}})
	}

	return (
		<div>
		<h2>create a new anecdote</h2>
		<form onSubmit={handleSubmit}>
			<div>
				content
				<input {...content} />
			</div>
			<div>
				author
				<input {...author} />
			</div>
			<div>
				url for more info
				<input {...info} />
			</div>
			<button>create</button>
			<button type="button" onClick={reset}>reset</button>
		</form>
		</div>
	)
}

export default CreateNew