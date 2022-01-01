const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
	switch(action.type) {
		case 'SHOW_NOTIFICATION':
			return action.message
		case 'HIDE_NOTIFICATION':
			return action.message
		default:
			return state
	}
}

export const showNotification = (message) => {
	return {
		type: 'SHOW_NOTIFICATION',
		message: message
	}
}

export const hideNotification = (message) => {
	return {
		type: 'HIDE_NOTIFICATION',
		message: ''
	}
}

export default notificationReducer