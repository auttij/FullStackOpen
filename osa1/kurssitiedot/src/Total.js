import React from 'react'

const Total = (props) => {
	let sum = 0
	props.parts.forEach(part => {
		sum += part.exercises
	});

	return (
		<p>Number of exercises {sum}</p>
	)
}

export default Total