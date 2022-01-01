const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
	switch(action.type) {
		case 'SET_NOTIFICATION':
			return action.message
		default:
			return state
	}
}

export const setNotification = (message, timeout) => {
	return async dispatch => {
		dispatch ({
			type: 'SET_NOTIFICATION',
			message: message
		})
		setTimeout(() => {
			dispatch({
				type: 'SET_NOTIFICATION',
				message: ''
			})
		}, timeout * 1000)
	}
}

export default notificationReducer