const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcryptjs')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const salt = bcrypt.genSaltSync(10)
		const passwordHash = await bcrypt.hashSync('sekret', salt)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'auttij',
			name: 'Juhana Autti',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with short username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'aj',
			name: 'Juhana Autti',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with short password', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'auttij',
			name: 'Juhana Autti',
			password: 'pw',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})