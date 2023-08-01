// src/mocks/handlers.ts
import { handlers as customersHandlers } from './services/CustomersService'
import { handlers as usersHandlers } from './services/UsersService'
import { handlers as vehicleHandlers } from './services/VehiclesService'

export const handlers = [
    // To append handlers from services, use the spread operator
    ...customersHandlers,
    ...usersHandlers,
    ...vehicleHandlers,
]
