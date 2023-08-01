/**
 * cypress/page-objects/core/Footer.ts
 * Footer page object class.
 */
export class Footer {
    getFooter() {
        return cy.get('[data-testid="footer"]')
    }
}
