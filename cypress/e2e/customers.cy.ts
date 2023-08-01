import { CustomersList } from '../page-objects/features/customers'

describe('The Customers Page', () => {
    const customersList = new CustomersList()

    it('successfully loads and contains the expected elements', () => {
        customersList.visit()

        // Check if the customers content is visible and contains the expected elements
        customersList
            .getCustomersListContent()
            .should('be.visible')
            .within(() => {
                customersList.getCustomersListTitle().contains('Customers')
                customersList.getCustomersListDataGrid().should('be.visible')
            })

        // TODO: Add more tests
    })
})
