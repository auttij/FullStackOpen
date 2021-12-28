import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Filter = ({value, onChange}) => (
  <div>filter shown with <input value={value} onChange={onChange}/></div>
)

const DeleteButton = ({onClick}) => (
  <button onClick={onClick}>delete</button>
)

const PersonForm = ({nameVal, numberVal, onSubmit, handleNameChange, handleNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input
        value={nameVal} 
        onChange={handleNameChange} />
    </div>
    <div>
      number: <input 
        value={numberVal} 
        onChange={handleNumberChange}/>
    </div>
    <div><button type="submit">add</button></div>
  </form>
)

const Persons = ({persons, onDeleteClick}) => (
  <>  
    {persons.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton onClick={() => onDeleteClick(person.id)}/></p>)}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    var found = persons.filter(item => item.name === newName)

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!(found.length > 0)) {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
    } else {
      const id = found[0].id
      const result = window.confirm(
        `${personObject.name} is already added to the phonebook, replace the old number with a new one?`)
      if (result) {
        personService
          .update(id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              setSuccessMessage(`Changed number for ${returnedPerson.name}`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(
                `Information of '${personObject.name}' was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
      }
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    const result = window.confirm(`Delete ${person.name}`)

    if (result) {
      personService.deletePerson(id)
        .then(
          setPersons(persons.filter(n => n.id !== id))
        )
        .catch(error => {
          setErrorMessage(
            `the person '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterVal(event.target.value)
  }

  const peopleToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterVal.toLowerCase()) )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter value={filterVal} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        nameVal={newName}
        numberVal={newNumber}
        onSubmit={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} onDeleteClick={deletePerson}/>
    </div>
  )
}

export default App