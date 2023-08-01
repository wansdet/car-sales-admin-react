/**
 * cypress/page-objects/core/AppDrawer.ts
 * AppDrawer page object class.
 */
export class AppDrawer {
    getAppBar() {
        return cy.get('[data-testid="app-bar"]')
    }

    getAppTitle() {
        return cy.get('[data-testid="app-title"]')
    }

    getAppDrawer() {
        return cy.get('[data-testid="app-drawer"]')
    }
}
