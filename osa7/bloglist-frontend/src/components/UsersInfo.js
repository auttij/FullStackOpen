import React from 'react'
import { useResource } from '../hooks'

const UsersInfo = ({ id }) => {
	const users = useResource('/api/users')
	if (!users) {
		return null
	}

	const user = users[0].find(u => u.id === id)
	if (!user) {
		return <p>No user with id {id}</p>
	}

	return (
		<>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</>
	)
}

export default UsersInfo