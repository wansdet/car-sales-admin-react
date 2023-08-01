import { UsersList } from '../page-objects/features/users'

describe('The Users Page', () => {
    const usersList = new UsersList()

    it('successfully loads and contains the expected elements', () => {
        usersList.visit()

        // Check if the customers content is visible and contains the expected elements
        usersList
            .getUsersListContent()
            .should('be.visible')
            .within(() => {
                usersList.getUsersListTitle().contains('Users')
                usersList.getUsersListDataGrid().should('be.visible')
            })

        // TODO: Add more tests
    })
})
