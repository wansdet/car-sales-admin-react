export interface IMake {
    makeId: string
    makeName: string
    active?: boolean
    sortOrder?: number
}

export interface IMonthlySales {
    month: number
    year: number
    sales: number
}

export interface IVehicle {
    id: number
    make: IMake
    model: string
    type: string
    bodyType: string
    fuelType: string
    colour: string
    year: number
    mileage: number
    doors: number
    seats: number
    owners: number
    history: string
    gearbox: string
    price: number
    title: string
    description: string
    features: string
    status: string
    display: boolean
    createdAt: Date
    updatedAt?: Date
    publishedDate?: Date
    soldDate?: Date
}

export interface IVehicleSearchOptions {
    make: string
    year: string
    bodyType: string
    fuelType: string
    gearboxType: string
    colour: string
    doors: string
    seats: string
    historyType: string
}
