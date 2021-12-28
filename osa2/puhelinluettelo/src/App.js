import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({value, onChange}) => (
  <div>filter shown with <input value={value} onChange={onChange}/></div>
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

const Persons = ({persons}) => (
  <>  
    {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    var found = persons.filter(item => item.name === newName).length > 0

    if (!found) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    } else {
      alert(`${newName} is already added to phonebook`)
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
      <Persons persons={peopleToShow}/>
    </div>
  )
}

export default App