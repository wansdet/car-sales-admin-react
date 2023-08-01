import {
    VehicleReportsMonthlySalesType,
    YearSelection,
} from '../page-objects/features/vehicles'

describe('The Monthly Sales by Vehicle Type Page', () => {
    const vehicleReportsMonthlySalesType = new VehicleReportsMonthlySalesType()
    const yearSelection = new YearSelection()
    const currentDate = new Date()

    it('successfully loads and contains the expected elements', () => {
        vehicleReportsMonthlySalesType.visit()

        cy.visit('/vehicles/reports/monthly-sales-type')

        // Check if the monthly sales content is visible and contains the expected elements
        vehicleReportsMonthlySalesType
            .getMonthlySalesTypeContent()
            .should('be.visible')
            .within(() => {
                vehicleReportsMonthlySalesType
                    .getMonthlySalesTypeTitle()
                    .contains('Monthly Sales by Body Type')
                yearSelection.getYearSelection().should('be.visible')
                vehicleReportsMonthlySalesType
                    .getMonthlySalesTypeChart()
                    .should('be.visible')
            })

        // TODO: Add more tests
    })
})
