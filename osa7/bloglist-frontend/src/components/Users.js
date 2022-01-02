import React from 'react'
import { useResource } from '../hooks'
import { Link } from 'react-router-dom'

const Users = () => {
	const users = useResource('/api/users')

	if (!users[0]) {
		return null
	}

	return (
		<>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users[0].map(user => (
						<tr key={user.id}>
							<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Users