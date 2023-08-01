/**
 * cypress/page-objects/features/users/UsersList.ts
 * Page object for the Users List page
 */
export class UsersList {
    visit() {
        cy.visit('/users/users-list')
    }

    getUsersListContent() {
        return cy.get('[data-testid="users-list-content"]')
    }

    getUsersListTitle() {
        return cy.get('[data-test="h1"]')
    }

    getUsersListDataGrid() {
        return cy.get('[data-testid="users-list-datagrid"]')
    }
}
