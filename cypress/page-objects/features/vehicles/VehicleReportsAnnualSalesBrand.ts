/**
 * cypress/page-objects/features/vehicles/VehicleReportsAnnualSalesBrand.ts
 * Page object for the Vehicle Reports Annual Sales Brand page
 */
export class VehicleReportsAnnualSalesBrand {
    visit() {
        cy.visit('/vehicles/reports/annual-sales-brand')
    }

    getAnnualSalesBrandContent() {
        return cy.get('[data-testid="annual-sales-brand-content"]')
    }

    getAnnualSalesBrandTitle() {
        return cy.get('[data-test="h1"]')
    }

    getAnnualSalesBrandChart() {
        return cy.get('[data-testid="annual-sales-brand-chart"]')
    }
}
