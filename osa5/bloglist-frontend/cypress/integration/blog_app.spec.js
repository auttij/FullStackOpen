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
})