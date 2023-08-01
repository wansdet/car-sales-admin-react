/**
 * cypress/page-objects/features/vehicles/YearSelection.ts
 * Page object for the Year Selection component
 */
export class YearSelection {
    getYearSelection() {
        return cy.get('[data-testid="year-selection"]')
    }

    getYearSelectionLabel() {
        return cy.get('[data-testid="year-selection-label"]')
    }

    getYearSelectionOption() {
        return cy.get('[data-test="year-selection-option"]')
    }

    getYearSelectionOptionLabel() {
        return cy.get('[data-test="year-selection-option-label"]')
    }

    getYearSelectionOptionInput() {
        return cy.get('input[type="radio"]')
    }

    getYearSelectionOptionInputLast() {
        return cy.get('input[type="radio"]').last()
    }
}
