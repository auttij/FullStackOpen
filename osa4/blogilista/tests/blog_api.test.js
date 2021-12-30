const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const blogsAtStart = await helper.blogsInDb()
		expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
	})

	test('a specific blog is within the returned notes', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const title = blogsAtStart.map(r => r.title)

		expect(title).toContain(
			'React patterns'
		)
	})

	test('blog identifier field should be id', async() => {
		const blogsAtStart = await helper.blogsInDb()
		const id = blogsAtStart.map(r => r.id)
		expect(id).toBeDefined()
	})
})

describe('POST /api/blogs', () => {
	test('succeeds with valid data', async() => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(n => n.title)
		expect(titles).toContain(
			'Canonical string reduction'
		)
	})

	test('succeeds when likes is undefined', async() => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)

		const blogsAtEnd = await helper.blogsInDb()
		const likes = blogsAtEnd.map(n => n.likes)
		expect(likes[likes.length - 1]).toBe(0)
	})

	test('fails when title is empty', async() => {
		const newBlog = {
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 1
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

	test('fails when url is empty', async() => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 1
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('DELETE /api/blogs/:id', () => {
	test('succeeds with valid id', async() => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)


		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)
	})

	test('fails with invalid id', async() => {
		await api
			.delete('/api/blogs/incorrect_id')
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length
		)
	})
})

describe('PUT /api/blogs/:id', () => {
	test('succeeds with valid id', async() => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const newBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 100
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length
		)

		const likes = blogsAtEnd.map(n => n.likes)
		expect(likes).toContain(
			blogToUpdate.likes + 100
		)
	})
})

afterAll(() => {
	mongoose.connection.close()
})