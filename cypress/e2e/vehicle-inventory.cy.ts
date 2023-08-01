import { VehiclesList } from '../page-objects/features/vehicles'

describe('The Vehicle Inventory Page', () => {
    const vehiclesList = new VehiclesList()

    it('successfully loads and contains the expected elements', () => {
        vehiclesList.visit()

        // Check if the vehicle inventory content is visible and contains the expected elements
        vehiclesList
            .getVehicleInventoryContent()
            .should('be.visible')
            .within(() => {
                vehiclesList
                    .getVehicleInventoryTitle()
                    .contains('Vehicle Inventory')
                vehiclesList.getVehicleInventoryDataGrid().should('be.visible')
            })

        // TODO: Add more tests
    })
})
