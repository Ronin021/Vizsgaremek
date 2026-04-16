// cypress/support/e2e.js
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
