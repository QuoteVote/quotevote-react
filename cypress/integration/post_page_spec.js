import '@testing-library/cypress/add-commands'

describe('Post Page', () => {
  const title = 'A new title test'
  const text = 'Lorem Ipsum...'
  const username = Cypress.env('test_username')
  const password = Cypress.env('test_password')
  const rootUrl = `${Cypress.env('root_url')}/auth/login-page`

  before('setting pre-tests...', () => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.visit(rootUrl)
    cy.findByLabelText('Username').type(username)
    cy.findByLabelText('Password').type(password)
    cy.findByText('LOGIN').click()
    cy.findByTestId('submit-post-button').click()
    cy.findByDisplayValue('[Enter Title]').type(title)
    cy.findByLabelText('Post *').type(text)
    cy.findByTestId('group').click()
    cy.findByText('test').click()
  })

  it('is able to submit a content or post', () => {
    cy.findByText('Submit').click()
    cy.findByText('Go to Post').click()
    cy.findByText(text).should('exist')
  })

  it('is able to highlight word', () => {
    cy.findByText('Submit').click()
    cy.findByText('Go to Post').click()

    // Problem with the command here
    cy.findByTestId('post-content').setSelection('foo')
  })
})
