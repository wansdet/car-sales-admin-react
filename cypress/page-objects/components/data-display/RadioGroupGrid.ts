/**
 * cypress/page-objects/components/data-display/RadioGroupGrid.ts
 * page object for the RadioGroupGrid component
 */
export class RadioGroupGrid {
    getRadioGroupLabel() {
        return cy.get('[data-test="radio-group-label"]')
    }

    getRadioLabel() {
        return cy.get('[data-test="group-radio-label"]')
    }

    getRadio() {
        return cy.get('[data-test="group-radio"]')
    }
}
