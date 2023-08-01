/**
 * cypress/page-objects/features/customers/CustomersList.ts
 * Page object for the Customers List page
 */
export class CustomersList {
    visit() {
        cy.visit('/customers/customers-list')
    }

    getCustomersListContent() {
        return cy.get('[data-testid="customers-list-content"]')
    }

    getCustomersListTitle() {
        return cy.get('[data-test="h1"]')
    }

    getCustomersListDataGrid() {
        return cy.get('[data-testid="customers-list-datagrid"]')
    }
}
