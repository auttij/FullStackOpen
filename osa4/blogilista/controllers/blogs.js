const blogsRouter = require('express').Router()
const { update } = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	const user = request.user
	console.log('user', user)

	if ( blog.user.toString() === user._id.toString() ) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} else {
		response.status(401).json({ error: 'Can only remove blogs by the same user' })
	}
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: body._id
	}

	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
	response.json(blog)
})

module.exports = blogsRouter