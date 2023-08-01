/**
 * cypress/page-objects/features/vehicles/VehiclesList.ts
 * Page object for the Vehicles List page
 */
export class VehiclesList {
    visit() {
        cy.visit('/vehicles/vehicles-list')
    }

    getVehicleInventoryContent() {
        return cy.get('[data-testid="vehicle-inventory-content"]')
    }

    getVehicleInventoryTitle() {
        return cy.get('[data-test="h1"]')
    }

    getVehicleInventoryDataGrid() {
        return cy.get('[data-testid="vehicle-inventory-datagrid"]')
    }
}
