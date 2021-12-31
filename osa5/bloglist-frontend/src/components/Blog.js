import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const addedByUser = user.username === blog.user.username
	const visibleWhenAddedByUser = { display: addedByUser ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const addLike = (event) => {
		event.preventDefault()
		updateBlog(
			blog.id,
			{
				user: blog.user,
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes + 1
			}
		)
	}

	const removeBlog = () => {
		const confirm = window.confirm(`Remove blog ${blog.title}`)
		if (confirm) {
			deleteBlog(blog.id)
		}
	}

	return(
		<div style={blogStyle} className="blog">
			<div style={hideWhenVisible} className="hiddenBlog">
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible} className="visibleBlog">
				<p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
				<p>{blog.author}</p>
				<p>{blog.url}</p>
				<p>likes {blog.likes} <button onClick={addLike} className="likeButton">like</button></p>
				<p>{blog.user.name}</p>
				<button onClick={removeBlog} style={visibleWhenAddedByUser}>remove</button>
			</div>
		</div>
	)
}

export default Blog