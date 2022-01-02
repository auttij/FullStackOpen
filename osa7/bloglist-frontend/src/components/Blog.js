import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return(
		<div style={blogStyle} className="blog">
			<div className="hiddenBlog">
				<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
			</div>
			{/* <div style={showWhenVisible} className="visibleBlog">
				<p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
				<p>{blog.author}</p>
				<p>{blog.url}</p>
				<p>likes {blog.likes} <button onClick={addLike} className="likeButton">like</button></p>
				<p>{blog.user.name}</p>
				<button onClick={removeBlog} style={visibleWhenAddedByUser} className="removeButton">remove</button>
			</div> */}
		</div>
	)
}

export default Blog