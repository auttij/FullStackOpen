import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data.anecdote  
      )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const vote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch ({ 
      type: 'VOTE', 
      data: { 
        id: id,
        anecdote: updatedAnecdote
      }
    })
  }
}

export default anecdoteReducer