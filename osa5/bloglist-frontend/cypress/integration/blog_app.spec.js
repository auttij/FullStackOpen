describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Juhana Autti',
			username: 'auttij',
			password: 'salainen'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.get('#username')
		cy.get('#password')
		cy.get('#login-button')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username')
				.type('auttij')

			cy.get('#password')
				.type('salainen')

			cy.get('#login-button')
				.click()

			cy.get('h2')
				.should('contain', 'Blog app')

			cy.get('p')
				.should('contain', 'Juhana Autti logged in')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username')
				.type('auttij')

			cy.get('#password')
				.type('väärä')

			cy.get('#login-button')
				.click()

			cy.get('.error')
				.should('contain', 'wrong credentials')
			cy.get('.error')
				.should('have.css', 'color', 'rgb(255, 0, 0)')
			cy.get('.error')
				.should('have.css', 'border-style', 'solid')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.get('#username')
				.type('auttij')
			cy.get('#password')
				.type('salainen')
			cy.get('#login-button')
				.click()
		})

		it.only('A blog can be created', function() {
			cy.contains('create new blog')
				.click()
			cy.get('form')
			cy.get('#form-title')
				.type('Dependency Management With Python Poetry')
			cy.get('#form-author')
				.type('Philipp Acsany')
			cy.get('#form-url')
				.type('https://realpython.com/dependency-management-python-poetry/')
			cy.get('form').submit()

			cy.get('.notification')
				.should('contain', 'a new blog Dependency Management With Python Poetry by Philipp Acsany added')
			cy.get('.notification')
				.should('have.css', 'color', 'rgb(0, 128, 0)')
			cy.get('.notification')
				.should('have.css', 'border-style', 'solid')

			cy.get('.blog')
				.should('contain', 'Dependency Management With Python Poetry')
				.should('contain', 'Philipp Acsany')
		})
	})
})