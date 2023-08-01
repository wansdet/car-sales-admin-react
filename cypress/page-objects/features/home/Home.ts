/**
 * cypress/page-objects/home/Home.ts
 * Home page object class.
 */
export class Home {
    visit() {
        cy.visit('/')
    }

    getHomeTitle() {
        return cy.get('[data-test="h1"]')
    }

    getHomeText() {
        return cy.get('[data-testid="home-text"]')
    }

    getTechnologiesList() {
        return cy.get('[data-testid="technologies-list"]')
    }

    getTechnologiesListItem() {
        return cy.get('[data-test="technologies-list-item"]')
    }
}
