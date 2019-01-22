// https://docs.cypress.io/api/introduction/api.html

describe('Suppliers', () => {
    it('Should open list of suppliers', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('table thead th').should('have.length', 5)
    })

    it('Should update existing supplier', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('a.suppliers-edit:first').click()
        cy.contains('h1', 'Supplier #')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('button#saveButton').click()

        cy.wait(1000)

        cy.contains('table tbody td:first-child', 'NEW COMPANY')
    })

    it('Should create new supplier', () => {
        cy.visit('/suppliers/new')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('input#contactNameField').type('NEW CONTACT')
        cy.get('input#contactTitleField').type('CONTACT TITLE')
        cy.get('input#contactNameField').type('.')
        cy.get('button#saveButton').click()

        cy.wait(1000)

        cy.contains('table tbody tr:last-child td:first-child', 'NEW COMPANY')
    })
})
