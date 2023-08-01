// src/mocks/services/CustomersService.ts
import { rest } from 'msw'
import { fakerEN_GB as faker } from '@faker-js/faker'

import { API_BASE_URL } from '@/core/application'
import { ICustomer } from '@/common/models/customer'

faker.seed(123)
// creates a date soon after 2023-01-01
// faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' });
// affects all future faker.date.* calls
// faker.setDefaultRefDate('2023-01-01T00:00:00.000Z');

function createRandomCustomer(id: number): ICustomer {
    const gender = faker.person.sexType()
    const firstName = faker.person.firstName(gender)
    const lastName = faker.person.lastName()
    const email = faker.helpers.unique(faker.internet.email, [
        firstName,
        lastName,
    ])

    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        middleName: '',
        gender: gender,
        jobTitle: faker.person.jobTitle(),
        email: email,
        phoneNumber: faker.phone.number('01### ######'),
        mobileNumber: faker.phone.number('07### ######'),
        status: 'active',
        notes: faker.lorem.paragraph(),
    }
}

// Create 2000 random customers
let customers: ICustomer[] = Array.from({ length: 2000 }, (_, i) =>
    createRandomCustomer(i + 1)
)

export const getCustomers = (): ICustomer[] => {
    return customers
}

export const handlers = [
    rest.get(`${API_BASE_URL}/api/customers`, (req, res, ctx) => {
        return res(ctx.json(customers)) // 200
    }),

    rest.get(`${API_BASE_URL}/api/customers/:id`, (req, res, ctx) => {
        const customer = customers.find(
            (customer: ICustomer) => customer.id === Number(req.params.id)
        )

        return res(ctx.json(customer))
    }),

    rest.post(`${API_BASE_URL}/api/customers`, (req, res, ctx) => {
        const newCustomer = req.body as ICustomer
        const updatedCustomers: ICustomer[] = [...customers, newCustomer]

        // Update the JSON data
        customers = updatedCustomers

        return res(ctx.status(201), ctx.json(newCustomer))
    }),

    rest.put(`${API_BASE_URL}/api/customers/:id`, (req, res, ctx) => {
        const updatedCustomer = req.body as ICustomer
        const customerId = req.params.id

        // Update the JSON data
        customers = customers.map((customer: ICustomer) =>
            customer.id === Number(customerId) ? updatedCustomer : customer
        )

        return res(ctx.json(updatedCustomer))
    }),

    rest.patch(`${API_BASE_URL}/api/customers/:id`, (req, res, ctx) => {
        const updatedCustomer = req.body as ICustomer
        const customerId = req.params.id

        // Update the JSON data
        customers = customers.map((customer: ICustomer) =>
            customer.id === Number(customerId) ? updatedCustomer : customer
        )

        return res(ctx.json(updatedCustomer))
    }),

    rest.delete(`${API_BASE_URL}/api/customers/:id`, (req, res, ctx) => {
        const customerId = req.params.id

        // Update the JSON data
        customers = customers.filter(
            (customer: ICustomer) => customer.id !== Number(customerId)
        )

        // Return a successful response
        return res(ctx.status(204))
    }),
]
