import React from 'react'

const Users = ({ users }) => {
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
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Users