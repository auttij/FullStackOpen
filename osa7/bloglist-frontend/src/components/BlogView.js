import React from 'react'
import { useResource } from '../hooks'

const BlogView = ({ id, updateBlog, deleteBlog, user }) => {
	const blogs = useResource('/api/blogs')

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

	if (!blogs) {
		return null
	}

	const blog = blogs[0].find(b => b.id === id)
	if (!blog) {
		return <p>No blog with id {id}</p>
	}

	const addedByUser = user.username === blog.user.username
	const visibleWhenAddedByUser = { display: addedByUser ? '' : 'none' }

	return (
		<>
			<h2>{blog.title} {blog.author}</h2>
			<p><a href={blog.url}>{blog.url}</a></p>
			<p>{blog.likes} likes <button onClick={addLike} className="likeButton">like</button></p>
			<p>added by {blog.user.name}</p>
			<button onClick={removeBlog} style={visibleWhenAddedByUser} className="removeButton">remove</button>
		</>
	)
}

export default BlogView