// src/mocks/services/UsersService.ts
import { rest } from 'msw'

import { API_BASE_URL } from '@/core/application'
import { IUser } from '@/common/models/user'
import { users } from '@/mocks/dbase/users/Users'

let userData: IUser[] = users

export const getSalesPeople = (): IUser[] => {
    const salesRoles = ['ROLE_SALES_PERSON', 'ROLE_SALES_MANAGER']
    return userData.filter((user: IUser) => {
        return user.roles.some(
            (role: string | undefined) => role && salesRoles.includes(role)
        )
    })
}

export const handlers = [
    rest.get(`${API_BASE_URL}/api/users`, (req, res, ctx) => {
        return res(ctx.json(userData)) // 200
    }),

    rest.get(`${API_BASE_URL}/api/users/:id`, (req, res, ctx) => {
        const user = userData.find(
            (user: IUser) => user.id === Number(req.params.id)
        )

        return res(ctx.json(user))
    }),

    rest.post(`${API_BASE_URL}/api/users`, (req, res, ctx) => {
        const newUser = req.body as IUser

        userData = [...userData, newUser]

        return res(ctx.status(201), ctx.json(newUser))
    }),

    rest.put(`${API_BASE_URL}/api/users/:id`, (req, res, ctx) => {
        const updatedUser = req.body as IUser
        const userId = req.params.id

        userData = userData.map((user: IUser) =>
            user.id === Number(userId) ? updatedUser : user
        )

        return res(ctx.json(updatedUser))
    }),

    rest.patch(`${API_BASE_URL}/api/users/:id`, (req, res, ctx) => {
        const updatedUser = req.body as IUser
        const userId = req.params.id

        userData = userData.map((user: IUser) =>
            user.id === Number(userId) ? updatedUser : user
        )

        return res(ctx.json(updatedUser))
    }),

    rest.delete(`${API_BASE_URL}/api/users/:id`, (req, res, ctx) => {
        const userId = req.params.id

        userData = userData.filter((user: IUser) => user.id !== Number(userId))

        return res(ctx.status(204))
    }),
]
