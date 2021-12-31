import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
	return (
		<>
			<h2>Login</h2>
			<form onSubmit={props.onSubmit}>
				<div>
					username
					<input
						type="text"
						value={props.username}
						name="Username"
						onChange={props.onUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={props.password}
						name="Password"
						onChange={props.onPasswordChange}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)
}

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm