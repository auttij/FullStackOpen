const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('GET /blogs/api/', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
	})

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

describe('POST /blogs/api', () => {
	test('succeeds with valid data', async() => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
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
})

afterAll(() => {
	mongoose.connection.close()
})