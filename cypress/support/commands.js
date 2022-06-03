import availabilityNotifySelectors from './availability-notify.selectors'
import selectors from './common/selectors'
import { generateAddtoCartCardSelector } from './common/utils'

const availabilityJson = '.availability.json'

Cypress.Commands.add('gotoProductDetailPage', () => {
  cy.get(selectors.ProductAnchorElement)
    .should('have.attr', 'href')
    .then((href) => {
      cy.get(generateAddtoCartCardSelector(href)).first().click()
    })
})

Cypress.Commands.add('openStoreFront', (login = false) => {
  cy.intercept('**/rc.vtex.com.br/api/events').as('events')
  cy.visit('/')
  cy.wait('@events')
  if (login === true) {
    cy.get(selectors.ProfileLabel, { timeout: 20000 })
      .should('be.visible')
      .should('have.contain', `Hello,`)
  }
})

Cypress.Commands.add('openProduct', (product, detailPage = false) => {
  // Search product in search bar
  cy.get(selectors.Search).should('be.not.disabled').should('be.visible')

  cy.get(selectors.Search).type(`${product}{enter}`)
  // Page should load successfully now Filter should be visible
  cy.get(selectors.searchResult).should('have.text', product.toLowerCase())
  cy.get(selectors.FilterHeading, { timeout: 30000 }).should('be.visible')

  if (detailPage) {
    cy.gotoProductDetailPage()
  } else {
    cy.log('Visiting detail page is disabled')
  }
})

Cypress.Commands.add('setavailabilitySubscribeId', (availabilityValue) => {
  cy.writeFile(availabilityJson, availabilityValue)
})

Cypress.Commands.add('getGmailItems', () => {
  return cy.wrap(Cypress.env().base.gmail, { log: false })
})

Cypress.Commands.add('setDeleteId', () => {
  cy.readFile(availabilityJson).then((items) => {
    return items.listRequests
  })
})

Cypress.Commands.add('subscribeToProduct', (data) => {
  cy.get(availabilityNotifySelectors.InputName).type(data.name)
  cy.get(availabilityNotifySelectors.InputEmail).type(data.email)
  cy.get(availabilityNotifySelectors.AvailabilityNotifySubmitButton)
    .should('not.be.disabled')
    .click()
  // operationName: "AvailabilitySubscribe"
})
