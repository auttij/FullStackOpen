import React from 'react'

const Total = (props) => {
	const reducer = (a, b) => a + b
	const sum = props.exercises.reduce(reducer)

	return (
		<p>Number of exercises {sum}</p>
	)
}

export default Total