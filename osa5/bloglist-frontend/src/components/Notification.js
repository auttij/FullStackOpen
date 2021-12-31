import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
	if (successMessage === null && errorMessage === null) {
	  return null
	}
	else if (errorMessage === null) {
	  return (
		<div className="notification">
		  {successMessage}
		</div>
	  )
	} else if (successMessage === null) {
	  return (
		<div className="error">
		  {errorMessage}
		</div>
	  )
	}
  
	return (
	  <>
		<div className="notification">
		  {successMessage}
		</div>
		<div className="error">
		  {errorMessage}
		</div>
	  </>
	)
}

export default Notification