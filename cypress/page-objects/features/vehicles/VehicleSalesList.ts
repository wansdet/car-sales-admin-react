/**
 * cypress/page-objects/features/vehicles/VehicleSalesList.ts
 * Page object for the Vehicle Sales List page
 */
export class VehicleSalesList {
    visit() {
        cy.visit('/vehicles/vehicle-sales-list')
    }

    getVehicleSalesContent() {
        return cy.get('[data-testid="vehicle-sales-content"]')
    }

    getVehicleSalesTitle() {
        return cy.get('[data-test="h1"]')
    }

    getVehicleSalesDataGrid() {
        return cy.get('[data-testid="vehicle-sales-datagrid"]')
    }
}
