import React, { useState } from 'react'

const FormField = ({ text, value, onChange }) => (
	<div>{text} <input value={value} onChange={onChange}/></div>
)

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}


	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<FormField text={'title'} value={title} onChange={ handleTitleChange }/>
			<FormField text={'author'} value={author} onChange={ handleAuthorChange }/>
			<FormField text={'url'} value={url} onChange={ handleUrlChange }/>
			<button type="submit">create</button>
		</form>
	)
}

export default BlogForm
