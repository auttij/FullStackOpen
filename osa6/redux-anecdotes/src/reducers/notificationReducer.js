const notificationReducer = (state = ['', null], action) => {
	switch(action.type) {
		case 'SET_NOTIFICATION':
			return [action.message, null]
		case 'SET_TIMEOUT':
			return [state[0], action.timeout]
		case 'CLEAR_TIMEOUT':
			if (state[1] != null) {
				clearTimeout(state[1])
			}
			return [state[0], null]
		default:
			return state
	}
}

export const setNotification = (message, timeout) => {
	return async dispatch => {
		dispatch({
			type: 'CLEAR_TIMEOUT'
		})
		dispatch ({
			type: 'SET_NOTIFICATION',
			message: message
		})
		const timeoutID = setTimeout(() => {
			dispatch({
				type: 'SET_NOTIFICATION',
				message: ''
			})
		}, timeout * 1000)
		dispatch({ 
			type: 'SET_TIMEOUT',
			timeout: timeoutID
		})
	}
}

export default notificationReducer