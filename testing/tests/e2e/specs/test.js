// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
    it('Visits the app root url', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('a.suppliers-edit:first').click()
        cy.contains('h1', 'Supplier #')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('button#saveButton').click()
        cy.contains('table tbody td:first-child', 'NEW COMPANY')
    })
})
