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
			cy.login({ username: 'auttij', password: 'salainen' })
		})

		it('A blog can be created', function() {
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

		describe('When blogs created', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'Dependency Management With Python Poetry',
					author: 'Philipp Acsany',
					url: 'https://realpython.com/dependency-management-python-poetry/'
				})
				cy.createBlog({
					title: 'Python Zip Imports: Distribute Modules and Packages Quickly',
					author: 'Leodanis Pozo Ramos',
					url: 'https://realpython.com/python-zip-import/'
				})
				cy.createBlog({
					title: 'Java vs Python: Basic Python for Java Developers',
					author: 'Jan-Hein Bührman',
					url: 'https://realpython.com/java-vs-python/'
				})
			})

			it('can be liked', function() {
				cy.get('.blog')
					.contains('Python Zip Imports: Distribute Modules and Packages Quickly')
					.find('button:visible')
					.click()
				cy.get('.likeButton:visible')
					.click()

				cy.get('.blog')
					.should('contain', 'likes 1')
			})

			it('can be deleted by the creator', function() {
				cy.get('.blog')
					.contains('Python Zip Imports: Distribute Modules and Packages Quickly')
					.find('button:visible')
					.click()

				cy.get('.removeButton:visible')
					.click()

				cy.get('.notification')
					.should('contain', 'Blog successfully removed')
				cy.get('.notification')
					.should('have.css', 'color', 'rgb(0, 128, 0)')
				cy.get('.notification')
					.should('have.css', 'border-style', 'solid')

				cy.get('.blog')
					.contains('Python Zip Imports: Distribute Modules and Packages Quickly')
					.should('not.exist')
			})

			it('should sort by likes', function() {
				cy.get('.blog').contains('Dependency Management With Python Poetry').find('button').click()
				cy.get('.blog').contains('Python Zip Imports: Distribute Modules and Packages Quickly').find('button').click()
				cy.get('.blog').contains('Java vs Python: Basic Python for Java Developers').find('button').click()

				cy.get('.visibleBlog')
					.contains('Dependency Management With Python Poetry')
					.parent()
					.as('blog1')
				cy.get('.visibleBlog')
					.contains('Python Zip Imports: Distribute Modules and Packages Quickly')
					.parent()
					.as('blog2')
				cy.get('.visibleBlog')
					.contains('Java vs Python: Basic Python for Java Developers')
					.parent()
					.as('blog3')

				cy.get('@blog2').find('.likeButton').as('blog2_like')
				cy.get('@blog3').find('.likeButton').as('blog3_like')

				cy.get('@blog3_like')
					.click()
				cy.get('.visibleBlog')
					.first()
					.should('contain', 'Java vs Python: Basic Python for Java Developers')
				cy.get('.visibleBlog')
					.last()
					.should('contain', 'Python Zip Imports: Distribute Modules and Packages Quickly')

				cy.get('@blog2_like')
					.click()
				cy.wait(500)
				cy.get('@blog2_like')
					.click()

				cy.get('.visibleBlog')
					.first()
					.should('contain', 'Python Zip Imports: Distribute Modules and Packages Quickly')
				cy.get('.visibleBlog')
					.last()
					.should('contain', 'Dependency Management With Python Poetry')
			})
		})
	})
})