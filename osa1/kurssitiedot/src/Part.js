import React from 'react'

const Part = (props) => {
	return (
		<p>{props.part.course} {props.part.exercises}</p>
	)
}

export default Part