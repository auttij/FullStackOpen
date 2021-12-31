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
						id="username"
						type="text"
						value={props.username}
						name="Username"
						onChange={props.onUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="password"
						value={props.password}
						name="Password"
						onChange={props.onPasswordChange}
					/>
				</div>
				<button id="login-button" type="submit">login</button>
			</form>
		</>
	)
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onUsernameChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm