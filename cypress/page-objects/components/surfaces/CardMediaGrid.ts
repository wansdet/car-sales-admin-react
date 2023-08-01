/**
 * src/page-objects/components/surfaces/CardMediaGrid.ts
 * page object for the CardMediaGrid component
 */
export class CardMediaGrid {
    getCardMediaGrid() {
        return cy.get('[data-test="card-media-grid"]')
    }

    getGridCard() {
        return cy.get('[data-test="grid-card"]')
    }

    getGridCardTitle() {
        return cy.get('[data-test="grid-card-title"]')
    }

    getGridCardDescription() {
        return cy.get('[data-test="grid-card-description"]')
    }

    getGridCardButton() {
        return cy.get('[data-test="grid-card-button"]')
    }

    getGridCardByTitle(title: string) {
        return cy
            .get(`[data-test="grid-card-title"]`)
            .contains(title)
            .parents('[data-test="grid-card"]')
    }

    getGridCardButtonByTitle(title: string) {
        return this.getGridCardByTitle(title).find(
            '[data-test="grid-card-button"]'
        )
    }
}
