const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
	switch(action.type) {
		case 'SHOW_NOTIFICATION':
			return action.data
		case 'HIDE_NOTIFICATION':
			return action.data
		default:
			return state
	}
}

export const showNotification = (message) => {
	return {
		type: 'SHOW_NOTIFICATION',
		data: message
	}
}

export const hideNotification = (message) => {
	return {
		type: 'HIDE_NOTIFICATION',
		data: ''
	}
}

export default notificationReducer