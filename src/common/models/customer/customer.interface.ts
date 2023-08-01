export interface ICustomer {
    id: number
    firstName: string
    lastName: string
    middleName?: string | undefined | null
    gender: string
    jobTitle: string
    email: string
    phoneNumber: string
    mobileNumber: string
    status: string
    notes: string
}
