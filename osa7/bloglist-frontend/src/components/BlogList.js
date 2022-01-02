import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
	const blogsSorted = blogs.sort(function (a, b) {
		return b.likes - a.likes
	})

	return(
		<>
			{blogsSorted.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
				/>
			)}
		</>
	)
}

export default BlogList