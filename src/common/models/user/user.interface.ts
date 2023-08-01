import { IAddress } from 'common/models/address'

export interface IUserCredential {
    username: string
    password: string
}

export interface IUserAuth {
    username: string
    roles: string[]
}

export interface IUser extends IUserAuth {
    id: number
    email: string
    firstName: string
    lastName: string
    password: string
    jobTitle: string
    description: string
    phoneNumber: string
    mobileNumber: string
    gender: string
    status: string
}

export interface IUserUpdate extends IUserAuth {
    id: number
    email: string
    firstName: string
    lastName: string
    jobTitle: string
    description: string
    phoneNumber: string
    mobileNumber: string
    gender: string
    status: string
}

export interface IUserAddress extends IAddress {
    id?: number
    name: string
    phoneNumber?: string
    organisation?: string
    primaryAddress: boolean
}
