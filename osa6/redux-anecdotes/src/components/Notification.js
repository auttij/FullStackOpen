import React from 'react'
import { connect } from 'react-redux'

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification[0]
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification