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

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(course => 
          <Course key={course.id} course={course} />
      )}
    </>
  )
}

export default App