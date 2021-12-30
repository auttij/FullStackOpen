const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/blog')

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]
beforeEach(async () => {
	await Note.deleteMany({})
	let noteObject = new Note(initialBlogs[0])
	await noteObject.save()
	noteObject = new Note(initialBlogs[1])
	await noteObject.save()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about React patterns', async () => {
	const response = await api.get('/api/blogs')

	const title = response.body.map(r => r.title)

	expect(title).toContain(
		'React patterns'
	)
})

afterAll(() => {
	mongoose.connection.close()
})