import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {
	const blogsSorted = blogs.sort(function (a, b) {
		return b.likes - a.likes
	})

	return(
		<>
			{blogsSorted.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					updateBlog={updateBlog}
					deleteBlog={deleteBlog}
					user={user} />
			)}
		</>
	)
}

export default BlogList