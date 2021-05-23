Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password })
    .then(({ body }) => {
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: blog, 
    auth: {
      bearer: JSON.parse(window.localStorage.getItem('loggedBlogsAppUser')).token
    }})
    .then(() => {
      cy.visit('http://localhost:3000')
    })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mohamed Amine Bouguerra',
      username: 'mabouguerra',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mabouguerra')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('Mohamed Amine Bouguerra logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mabouguerra')
      cy.get('#password').type('654321')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain','invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mabouguerra', password: '123456' })
    })
    
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('some title')
      cy.get('#author').type('some author')
      cy.get('#url').type('some url')
      cy.get('#create-button').click()
      cy.contains('some title')
      cy.contains('some author')
      cy.contains('some url')
    })

    describe('When a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'some title',
          author: 'some author',
          url: 'some url'
        })
      })

      it('User can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('The user who created a blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog')
          .should('not.contain', 'some title')
          .should('not.contain', 'some author')
          .should('not.contain', 'some url')
        })

      it('Blogs are ordered by the number of likes', function() {
        cy.createBlog({
          title: 'some other title',
          author: 'some other author',
          url: 'some other url'
        })

        cy.get('.blog:first').contains('view').click()
        cy.get('.blog:last').contains('view').click()
        cy.get('.blog:first').contains('like').click()
        cy.get('.blog:last').contains('like').click().click().click()
        cy.get('.blog:first').contains('likes: 3')

      })
      })
    })
  })