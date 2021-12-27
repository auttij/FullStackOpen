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

const Total = (props) => {
	let sum = 0
	props.course.parts.forEach(part => {
		sum += part.exercises
	});

	return (
		<p>Number of exercises {sum}</p>
	)
}


const Course = ({course}) => (
  <div>
    <Header course={course} />
    <Content course={course}/>
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App