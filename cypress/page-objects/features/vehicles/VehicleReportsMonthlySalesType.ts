/**
 * cypress/page-objects/features/vehicles/VehicleReportsMonthlySalesType.ts
 * Page object for the Vehicle Reports Monthly Sales Type page
 */
export class VehicleReportsMonthlySalesType {
    visit() {
        cy.visit('/vehicles/reports/monthly-sales-type')
    }

    getMonthlySalesTypeContent() {
        return cy.get('[data-testid="monthly-sales-type-content"]')
    }

    getMonthlySalesTypeTitle() {
        return cy.get('[data-test="h1"]')
    }

    getMonthlySalesTypeChart() {
        return cy.get('[data-testid="monthly-sales-type-chart"]')
    }
}
