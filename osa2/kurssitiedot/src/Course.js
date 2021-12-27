import React from 'react'

const Part = ({part}) => (
	<p>{part.name} {part.exercises}</p>
)

const Content = ({course}) => (
	<>
		{course.parts.map(part => 
		<Part key={part.id} part={part} />
		)}
	</>
)

const Header = ({course}) => (
	<h1>{course.name}</h1>
)

const Total = ({parts}) => {
	const total = parts.reduce( (s, p) => ({exercises: s.exercises + p.exercises}))
	return (
		<h3>Total of {total.exercises} exercises</h3>
	)
}

const Course = ({course}) => (
	<div>
		<Header course={course} />
		<Content course={course}/>
		<Total parts={course.parts}/>
	</div>
)

export default Course