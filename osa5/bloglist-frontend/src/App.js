import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable.js'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const LogoutButton = ({ onClick }) => (
	<button onClick={onClick}>logout</button>
)

const UserInfo = ({ user, logoutAction }) => (
	<p>{user.name} logged in <LogoutButton onClick={logoutAction}/></p>
)

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()

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

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
				setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000)
			})
			.catch((error) => {
				setErrorMessage(`error: ${error.message}`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}

	const updateBlog = (blogId, blogObject) => {
		const blogIdx = blogs.findIndex(blog => blog.id === blogId)
		blogService
			.update(blogId, blogObject)
			.then(returnedBlog => {
				let newBlogs = [...blogs]
				let newBlog = { ...blogs[blogIdx], likes: returnedBlog.likes }
				newBlogs[blogIdx] = newBlog
				setBlogs(newBlogs)
			})
	}

	const deleteBlog = (blogId) => {
		blogService
			.remove(blogId)
			.then(function () {
				const newBlogs = blogs.filter(blog => blog.id !== blogId)
				setBlogs(newBlogs)
				setSuccessMessage('Blog successfully removed')
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000)
			})
			.catch((error) => {
				setErrorMessage(`error: ${error.message}`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
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
					<Togglable buttonLabel='create new blog' ref={blogFormRef}>
						<BlogForm
							createBlog={addBlog}
						/>
					</Togglable>
					<h2>blogs</h2>
					<BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
				</>
			}
		</div>
	)
}

export default App