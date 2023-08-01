import {
    VehicleReportsAnnualSalesBrand,
    YearSelection,
} from '../page-objects/features/vehicles'

describe('The Annual Sales by Brand Page', () => {
    const vehicleReportsAnnualSalesBrand = new VehicleReportsAnnualSalesBrand()
    const yearSelection = new YearSelection()
    const currentDate = new Date()

    it('successfully loads and contains the expected elements', () => {
        vehicleReportsAnnualSalesBrand.visit()

        // Check if the monthly sales content is visible and contains the expected elements
        vehicleReportsAnnualSalesBrand
            .getAnnualSalesBrandContent()
            .should('be.visible')
            .within(() => {
                vehicleReportsAnnualSalesBrand
                    .getAnnualSalesBrandTitle()
                    .contains('Annual Sales by Brand')
                yearSelection.getYearSelection().should('be.visible')
                vehicleReportsAnnualSalesBrand
                    .getAnnualSalesBrandChart()
                    .should('be.visible')
            })

        // TODO: Add more tests
    })
})
