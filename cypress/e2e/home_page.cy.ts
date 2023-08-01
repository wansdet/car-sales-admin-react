import { AppDrawer, Footer } from '../page-objects/core'
import { Home } from '../page-objects/features'

describe('The Home Page', () => {
    const appDrawer = new AppDrawer()
    const footer = new Footer()
    const home = new Home()

    it('successfully loads and contains the expected elements', () => {
        home.visit()

        // Check if the app bar is visible and contains the expected elements
        appDrawer
            .getAppBar()
            .should('be.visible')
            .within(() => {
                appDrawer.getAppTitle().contains('Car Sales Admin')
            })

        // Check if the app drawer is visible
        appDrawer.getAppDrawer().should('be.visible')

        // Check main content is visible and contains the expected elements
        home.getHomeTitle().contains('Home')
        home.getHomeText().contains(
            'This demo application is built using the following'
        )
        home.getTechnologiesList()
            .should('be.visible')
            .within(() => {
                home.getTechnologiesListItem().should('have.length', 13)
                home.getTechnologiesListItem().first().contains('React')
                home.getTechnologiesListItem()
                    .last()
                    .contains('ESLint/Prettier/AirBNB')
            })

        // Check if the footer is visible and contains the expected elements
        footer.getFooter().should('be.visible')
    })
})
