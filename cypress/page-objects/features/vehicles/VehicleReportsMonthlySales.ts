/**
 * cypress/page-objects/features/vehicles/VehicleReportsMonthlySales.ts
 * Page object for the Vehicle Reports Monthly Sales page
 */
export class VehicleReportsMonthlySales {
    visit() {
        cy.visit('/vehicles/reports/monthly-sales')
    }

    getMonthlySalesContent() {
        return cy.get('[data-testid="monthly-sales-content"]')
    }

    getMonthlySalesTitle() {
        return cy.get('[data-test="h1"]')
    }

    getMonthlySalesChart() {
        return cy.get('[data-testid="monthly-sales-chart"]')
    }
}
