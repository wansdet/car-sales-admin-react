import {
    VehicleReportsMonthlySales,
    YearSelection,
} from '../page-objects/features/vehicles'

describe('The Monthly Sales Report Page', () => {
    const vehicleReportsMonthlySales = new VehicleReportsMonthlySales()
    const yearSelection = new YearSelection()
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    it('successfully loads and contains the expected elements', () => {
        vehicleReportsMonthlySales.visit()

        // Check if the monthly sales content is visible and contains the expected elements
        vehicleReportsMonthlySales
            .getMonthlySalesContent()
            .should('be.visible')
            .within(() => {
                vehicleReportsMonthlySales
                    .getMonthlySalesTitle()
                    .contains('Monthly Sales')
                yearSelection
                    .getYearSelection()
                    .should('be.visible')
                    .within(() => {
                        yearSelection
                            .getYearSelectionOption()
                            .should('have.length', 2)
                        yearSelection
                            .getYearSelectionLabel()
                            .contains('Select Year')
                        yearSelection
                            .getYearSelectionOptionLabel()
                            .last()
                            .contains(currentYear)
                        cy.get('input[type="radio"]')
                            .last()
                            .should('be.checked')
                    })

                vehicleReportsMonthlySales
                    .getMonthlySalesChart()
                    .should('be.visible')
            })

        // TODO: Add more tests
    })
})
