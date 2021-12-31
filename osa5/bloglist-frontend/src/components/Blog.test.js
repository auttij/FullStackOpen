import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component

	const updateBlog = jest.fn()
	const deleteBlog = jest.fn()

	const blog = {
		'title':'Dependency Management With Python Poetry',
		'author':'Philipp Acsany',
		'url':'https://realpython.com/dependency-management-python-poetry/',
		'likes':124,
		'user':{
			'username':'auttij',
			'name':'Juhana Autti',
			'id':'61cdc680827e867f01a83a82'
		},
		'id': '61cddd619f084491c99dc018'
	}

	const user = {
		'username':'auttij',
		'name':'Juhana Autti',
		'id':'61cdc680827e867f01a83a82'
	}

	beforeEach(() => {
		component = render(
			<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
		)
	})

	test('renders blog title and author when not full visible', () => {
		const hiddenBlogDiv = component.container.querySelector('.hiddenBlog')
		const visibleBlogDiv = component.container.querySelector('.visibleBlog')

		expect(hiddenBlogDiv).not.toHaveStyle('display: none')
		expect(visibleBlogDiv).toHaveStyle('display: none')

		expect(hiddenBlogDiv).toHaveTextContent(
			'Dependency Management With Python Poetry'
		)
		expect(hiddenBlogDiv).toHaveTextContent(
			'Philipp Acsany'
		)
		expect(hiddenBlogDiv).not.toHaveTextContent(
			'https://realpython.com/dependency-management-python-poetry/'
		)
		expect(hiddenBlogDiv).not.toHaveTextContent(
			'likes'
		)
		expect(hiddenBlogDiv).not.toHaveTextContent(
			'Juhana Autti'
		)
	})

	test('Full blog is rendered after show-button clicked', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		const hiddenBlogDiv = component.container.querySelector('.hiddenBlog')
		const visibleBlogDiv = component.container.querySelector('.visibleBlog')

		expect(hiddenBlogDiv).toHaveStyle('display: none')
		expect(visibleBlogDiv).not.toHaveStyle('display: none')

		expect(visibleBlogDiv).toHaveTextContent(
			'Dependency Management With Python Poetry'
		)
		expect(visibleBlogDiv).toHaveTextContent(
			'Philipp Acsany'
		)
		expect(visibleBlogDiv).toHaveTextContent(
			'https://realpython.com/dependency-management-python-poetry/'
		)
		expect(visibleBlogDiv).toHaveTextContent(
			'likes'
		)
		expect(visibleBlogDiv).toHaveTextContent(
			'Juhana Autti'
		)
	})

	test('blog update function gets fired each time', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		const likeButton = component.container.querySelector('.likeButton')

		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(updateBlog.mock.calls).toHaveLength(2)
	})
})