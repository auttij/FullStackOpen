import React from 'react'
import Part from './Part'

const Content = (props) => {
	return (
		<>
			<Part course={props.p1} exercises={props.e1} />
			<Part course={props.p2} exercises={props.e2} />
			<Part course={props.p3} exercises={props.e3} />
		</>
	)
}

export default Content