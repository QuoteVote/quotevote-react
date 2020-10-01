import '@testing-library/cypress/add-commands'

describe('Login', () => {
  const username = Cypress.env('test_username')
  const password = Cypress.env('test_password')
  const rootUrl = `${Cypress.env('root_url')}/auth/login-page`

  beforeEach(() => {
    cy.visit(rootUrl)
  })

  it('has username and password field', () => {
    cy.findByLabelText('Username').should('exist')
    cy.findByLabelText('Password').should('exist')
  })

  it('can login with test account', () => {
    cy.findByLabelText('Username').type(username)
    cy.findByLabelText('Password').type(password)
    cy.findByText('LOGIN').click()
    cy.url().should('include', '/hhsb/Home')
  })

  it('should display error message if wrong credentials', () => {
    cy.findByLabelText('Username').type('invalid')
    cy.findByLabelText('Password').type('invalid')
    cy.findByText('LOGIN').click()
    cy.findByText('Invalid username or password.').should('exist')
  })
})
