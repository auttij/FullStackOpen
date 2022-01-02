import React from 'react'

const Notification = ({ notification }) => {
	const visible = { display: notification === '' ? 'none' : '' }

	const style = {
		...visible, 
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	return (
		<div style={style} st>
		{notification}
		</div>
	)
}

export default Notification