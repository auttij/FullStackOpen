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

const FormField = ({text, value, onChange}) => (
  <div>{text} <input value={value} onChange={onChange}/></div>
)

const BlogForm = ({onSubmit, title, author, url, titleChange, authorChange, urlChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormField text={'title'} value={title} onChange={titleChange}/>
      <FormField text={'author'} value={author} onChange={authorChange}/>
      <FormField text={'url'} value={url} onChange={urlChange}/>
      <button type="submit">create</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
        })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
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
        <>
          <h2>Blog app</h2>
          <UserInfo user={user} logoutAction={() => loginService.logout()}/>
          <h2>create new</h2>
          <BlogForm 
            onSubmit={(event) => addBlog(event)}
            title={title} author={author} url={url} 
            titleChange={({ target }) => setTitle(target.value)} 
            authorChange={({ target }) => setAuthor(target.value)} 
            urlChange={({ target }) => setUrl(target.value)} 
          />
          <h2>blogs</h2>
          <BlogList blogs={blogs} />
        </>
      }
    </div>
  )
}

export default App