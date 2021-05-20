describe(`registration`, () => {
  it(`should register a new user`, () => {
    cy.createUser().then((user) => {
      cy.visit(`/`)
      cy.findByText(/register/i).click()
      cy.enterCreds(user)
      cy.assertHome()
      cy.assertLoggedInAs(user)
    })
  })

  it(`should show an error message if there's an error registering`, () => {
    cy.server().route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
    })
    cy.visit('/register')
    cy.findByText(/submit/i).click()
    cy.findByText(/error.*try again/i)
  })
})
