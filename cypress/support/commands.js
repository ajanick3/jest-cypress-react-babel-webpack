import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', (overrides) => {
  const user = buildUser(overrides)
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  }).then((response) => ({...response.body.user, ...user}))
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should(`eq`, `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', (user) => {
  cy.window().its(`localStorage.token`).should(`be.a`, `string`)
  cy.findByTestId(`username-display`).should(`have.text`, user.username)
})

Cypress.Commands.add('enterCreds', (user) => {
  cy.findByLabelText(/username/i).type(user.username)
  cy.findByLabelText(/password/i).type(user.password)
  cy.findByText(/submit/i).click()
})

Cypress.Commands.add('login', (user) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: user,
  }).then((response) => {
    window.localStorage.setItem('token', response.body.user.token)
    return {...response.body.user, ...user}
  })
})

Cypress.Commands.add('loginAsNewUser', (user) => {
  cy.createUser().then((user) => {
    cy.login(user)
  })
})
