import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
	let component

	const createBlog = jest.fn()

	beforeEach(() => {
		component = render(
			<BlogForm createBlog={createBlog} />
		)
	})

	test('calls callback-function received as props with correct input', () => {
		const title = component.container.querySelector('#title')
		const author = component.container.querySelector('#author')
		const url = component.container.querySelector('#url')
		const form = component.container.querySelector('form')

		fireEvent.change(title, {
			target: { value: 'Dependency Management With Python Poetry' }
		})
		fireEvent.change(author, {
			target: { value: 'Philipp Acsany' }
		})
		fireEvent.change(url, {
			target: { value: 'https://realpython.com/dependency-management-python-poetry/' }
		})
		fireEvent.submit(form)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('Dependency Management With Python Poetry')
		expect(createBlog.mock.calls[0][0].author).toBe('Philipp Acsany')
		expect(createBlog.mock.calls[0][0].url).toBe('https://realpython.com/dependency-management-python-poetry/')
	})
})