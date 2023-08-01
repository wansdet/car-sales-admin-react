import { VehicleSalesList } from '../page-objects/features/vehicles'

describe('The Vehicle Sales Page', () => {
    const vehicleSalesList = new VehicleSalesList()

    it('successfully loads and contains the expected elements', () => {
        vehicleSalesList.visit()

        vehicleSalesList
            .getVehicleSalesContent()
            .should('be.visible')
            .within(() => {
                vehicleSalesList
                    .getVehicleSalesTitle()
                    .contains('Vehicle Sales')
                vehicleSalesList.getVehicleSalesDataGrid().should('be.visible')
            })

        // TODO: Add more tests
    })
})
