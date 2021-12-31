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

		it.only('fails with wrong credentials', function() {
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
})