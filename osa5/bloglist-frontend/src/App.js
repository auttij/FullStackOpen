import React, { useState, useEffect } from 'react'
import BlogList from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

const LogoutButton = ({onClick}) => (
  <button onClick={onClick}>logout</button>
) 

const UserInfo = ({user, logoutAction}) => (
  <p>{user.name} logged in <LogoutButton onClick={logoutAction}/></p>
)

const Main = ({blogs, user, logoutAction}) => {
  return (
    <>
      <h2>blogs</h2>
      <UserInfo user={user} logoutAction={logoutAction}/>
      <BlogList blogs={blogs} />
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

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

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
        <Main blogs={blogs} user={user} logoutAction={() => loginService.logout()} />
      }
    </div>
  )
}

export default App