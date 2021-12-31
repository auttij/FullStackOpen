import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

const LoginForm = ({onSubmit, username, onUsernameChange, password, onPasswordChange}) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={onUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

const BlogForm = ({blogs}) => {
  return(
    <>
      <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      { user === null ?
        <LoginForm 
          onSubmit={handleLogin} 
          username={username} 
          password={password} 
          onUsernameChange={({ target }) => setUsername(target.value)} 
          onPasswordChange={({ target }) => setPassword(target.value)} /> :
        <BlogForm blogs={blogs} />
      }
    </div>
  )
}

export default App