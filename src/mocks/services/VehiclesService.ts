import { rest } from 'msw'
import { fakerEN_GB as faker } from '@faker-js/faker'

import { API_BASE_URL } from '@/core/application'
import { IOption } from '@/common'
import {
    colours,
    fuelTypes,
    gearboxTypes,
    historyTypes,
} from '@/common/models/vehicle'
import {
    calculateSalesPerMonth,
    calculateSalesByBodyTypePerMonth,
    calculateAnnualSalesByMake,
} from '@/mocks/services/VehicleReportsService'
import {
    abarth,
    alfaRomeo,
    audi,
    bmw,
    honda,
    jaguar,
    landRover,
    lexus,
    mercedesBenz,
    mini,
    porsche,
    volkswagen,
} from '@/mocks/dbase/vehicles'

export interface IMake {
    makeId: number
    makeName: string
}

export interface IModel {
    modelId: string
    modelName: string
    bodyType: string
    doors: number
    seats: number
    price: number
}

export interface IMakeModel {
    makeId: string
    makeName: string
    models: IModel[]
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
    updatedAt: Date | null
    publishedDate: Date | null
    soldDate: Date | null
}

const getRandomColour = (): IOption => {
    const randomIndex = Math.floor(Math.random() * colours.length)

    return colours[randomIndex]
}

const getVehicleType = (bodyType: string): string => {
    if (bodyType === 'van') {
        return 'van'
    }

    return 'car'
}

const randomFuelType = (modelName: string): IOption => {
    if (modelName.toLowerCase().includes('hybrid')) {
        return fuelTypes[2]
    }

    // petrol or diesel
    const randomIndex = Math.floor(Math.random() * 1)
    return fuelTypes[randomIndex]
}

const startYear = 2018

const getRandomYear = (currentDate: Date): number => {
    const currentYear = currentDate.getFullYear()
    const yearRange = currentYear - startYear + 1

    return Math.floor(Math.random() * yearRange) + startYear
}

const getRandomMileage = (year: number, currentDate: Date): number => {
    const currentYear = currentDate.getFullYear()
    const yearRange = currentYear - year + 1
    // Set annual mileage from random number between 5000 and 10000 miles per year in increments of 250 miles
    const annualMileage = Math.floor(Math.random() * 20) * 250 + 5000
    // and multiply by age of vehicle
    return annualMileage * yearRange
}

const getRandomOwners = (year: number, currentDate: Date): number => {
    const currentYear = currentDate.getFullYear()
    const yearRange = currentYear - year + 1

    if (yearRange === 1) {
        return 1
    }

    if (yearRange <= 4) {
        return Math.floor(Math.random() * 2) + 1
    }

    return Math.floor(Math.random() * 4) + 1
}

const getRandomHistory = (year: number, currentDate: Date): IOption => {
    const currentYear = currentDate.getFullYear()
    const yearRange = currentYear - year + 1
    // If yearRange is 3 or less, then return random index between 0 and 1
    if (yearRange <= 3) {
        const randomIndex = Math.floor(Math.random() * 2)
        return historyTypes[randomIndex]
    }
    // Otherwise return random index
    const randomIndex = Math.floor(Math.random() * historyTypes.length)
    return historyTypes[randomIndex]
}

const getRandomGearbox = (): IOption => {
    const randomIndex = Math.floor(Math.random() * gearboxTypes.length)
    return gearboxTypes[randomIndex]
}

const getRandomPrice = (
    price: number,
    year: number,
    currentDate: Date,
    mileage: number
): number => {
    const currentYear = currentDate.getFullYear()
    const yearRange = currentYear - year + 1
    const age = yearRange

    // Set price new to random percentage between 100% and 110% of price
    const priceNew = price * (Math.floor(Math.random() * 10) + 100) * 0.01
    // console.log('priceNew:', priceNew)

    // Set price adjusted
    let priceAdjusted = priceNew

    // Adjust price based on age
    switch (age) {
        case 1:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 80) * 0.01
            break
        case 2:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 15) + 70) * 0.01
            break
        case 3:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 60) * 0.01
            break
        case 4:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 50) * 0.01
            break
        case 5:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 45) * 0.01
            break
        case 6:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 40) * 0.01
            break
        case 7:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 35) * 0.01
            break
        case 8:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 30) * 0.01
            break
        case 9:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 25) * 0.01
            break
        default:
            priceAdjusted =
                priceNew * (Math.floor(Math.random() * 10) + 20) * 0.01
    }

    // Adjust price to nearest 250
    const priceAdjustedRounded = Math.round(priceAdjusted / 250) * 250
    /*
    console.log(
        'getRandomPrice price:',
        price,
        ', year:',
        year,
        ' mileage:',
        mileage,
        ' age:',
        age,
        ' priceNew:',
        priceNew,
        ' priceAdjustedRounded:',
        priceAdjustedRounded
    )
*/
    return priceAdjustedRounded
}

const getRandomTitle = (
    makeName: string,
    model: string,
    colour: string
): string => {
    return `${makeName} ${model} ${colour}`
}

const generateRandomWordsList = (min: number, max: number) => {
    const count = faker.number.int({ min: min, max: max })
    const words = []
    for (let i = 0; i < count; i++) {
        words.push(faker.word.words({ count: { min: 2, max: 4 } }))
    }

    return words.join(', ')
}

const getCreatedAt = (createdAt: Date): Date => {
    return new Date(createdAt.getTime())
}

// 3.2.23 Get random future date from random number of days between 1 and 3 days
const getRandomFutureDate = (createdAt: Date): Date => {
    const randomDays = Math.floor(Math.random() * 3) + 1
    const randomMilliseconds = randomDays * 24 * 60 * 60 * 1000
    return new Date(createdAt.getTime() + randomMilliseconds)
}

// 3.2.25. Set vehicle soldDate to publishedDate plus random number of days between 7 and 90 days and must be less than current date. If random date is in in future, set soldDate to null
const getRandomSoldDate = (
    publishedDate: Date,
    currentDate: Date
): Date | null => {
    const randomDays = Math.floor(Math.random() * 84) + 7
    const randomMilliseconds = randomDays * 24 * 60 * 60 * 1000
    const soldDate = new Date(publishedDate.getTime() + randomMilliseconds)
    if (soldDate > currentDate) {
        return null
    }
    return soldDate
}

const getStatus = (soldDate: Date | null): string => {
    if (soldDate) {
        return 'sold'
    }
    return 'for_sale'
}

// Set display to true if not sold or if sold and sold date plus 30 days is not in the future
const getDisplayStatus = (
    publishedDate: Date,
    soldDate: Date | null,
    currentDate: Date
): boolean => {
    if (soldDate) {
        const soldDatePlus30Days = new Date(
            soldDate.getTime() + 30 * 24 * 60 * 60 * 1000
        )
        return publishedDate <= currentDate && soldDatePlus30Days >= currentDate
    }
    return publishedDate <= currentDate
}

const vehicleMakeModels: IMakeModel[] = []

vehicleMakeModels.push(
    abarth,
    alfaRomeo,
    audi,
    bmw,
    honda,
    jaguar,
    landRover,
    lexus,
    mercedesBenz,
    mini,
    porsche,
    volkswagen
)

// Create an empty array of vehicles
const vehicles: IVehicle[] = []

// Get the current date
const currentDate = new Date()

// Set the start date to January 1st, 2020
// const startDate = new Date(2020, 0, 1)
const startDate = new Date(2022, 0, 1)

const generateVehicles = () => {
    let loopDate = new Date(startDate)
    let id = 0
    while (loopDate <= currentDate) {
        // 3.1. Create random number of vehicles between 1 and 3 per day
        const numberOfVehicles = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < numberOfVehicles; i++) {
            id++
            // 3.2.1. Get random vehicle from vehicles.json
            const randomIndex = Math.floor(
                Math.random() * vehicleMakeModels.length
            )
            // console.log('randomIndex', randomIndex)

            const randomVehicle: any = vehicleMakeModels[randomIndex]
            const make = {
                makeId: randomVehicle.makeId,
                makeName: randomVehicle.makeName,
            }
            // console.log('randomVehicle', randomVehicle)
            // Get random model from random vehicle
            const randomModelIndex = Math.floor(
                Math.random() * randomVehicle.models.length
            )
            // console.log('randomModelIndex', randomModelIndex)
            const randomModel = randomVehicle.models[randomModelIndex]
            // console.log('randomModel', randomModel)
            const type = getVehicleType(randomVehicle.bodyType)
            const fuelType = randomFuelType(
                randomModel.modelName
            ).value.toLocaleString()
            const colour = getRandomColour().value.toLocaleString()
            const year = getRandomYear(loopDate)
            const mileage = getRandomMileage(year, currentDate)
            const owners = getRandomOwners(year, currentDate)
            const history = getRandomHistory(
                year,
                currentDate
            ).value.toLocaleString()
            const gearbox = getRandomGearbox().value.toLocaleString()
            const price = getRandomPrice(
                randomModel.price,
                year,
                currentDate,
                mileage
            )
            // console.log('randomVehicle.make', randomVehicle.makeName)
            const title = getRandomTitle(
                randomVehicle.makeName,
                randomModel.modelName,
                colour
            )
            const description = faker.lorem.paragraph({ min: 20, max: 30 })
            const features = generateRandomWordsList(30, 40)
            const createdAt = getCreatedAt(loopDate)
            const updatedAt = getRandomFutureDate(loopDate)
            const publishedDate = getRandomFutureDate(updatedAt)
            const soldDate = getRandomSoldDate(publishedDate, currentDate)
            const status = getStatus(soldDate)
            const display = getDisplayStatus(
                publishedDate,
                soldDate,
                currentDate
            )

            const vehicle: IVehicle = {
                id: id,
                make: make,
                model: randomModel.modelName,
                type: type,
                bodyType: randomModel.bodyType,
                fuelType: fuelType,
                colour: colour,
                year: year,
                mileage: mileage,
                doors: randomModel.doors,
                seats: randomModel.seats,
                owners: owners,
                history: history,
                gearbox: gearbox,
                price: price,
                title: title,
                description: description,
                features: features,
                status: status,
                display: display,
                createdAt: createdAt,
                updatedAt: updatedAt,
                publishedDate: publishedDate,
                soldDate: soldDate,
            }

            vehicles.push(vehicle)
        }

        // Move to the next day
        loopDate.setDate(loopDate.getDate() + 1)
    }
}

generateVehicles()

export const handlers = [
    rest.get(`${API_BASE_URL}/api/vehicles/inventory`, (req, res, ctx) => {
        const displayVehicles = vehicles
            .filter((vehicle) => vehicle.display)
            .sort((a, b) => b.id - a.id)

        // console.log('displayVehicles', displayVehicles)
        // console.log('displayVehicles.length', displayVehicles.length)

        return res(ctx.status(200), ctx.json(displayVehicles))
    }),

    rest.get(`${API_BASE_URL}/api/vehicles/sales`, (req, res, ctx) => {
        // Get vehicles that have been sold and order by id Descending
        const soldVehicles = vehicles
            .filter((vehicle) => vehicle.status === 'sold')
            .sort((a, b) => b.id - a.id)

        // console.log('soldVehicles', soldVehicles)
        // console.log('soldVehicles.length', soldVehicles.length)

        return res(ctx.status(200), ctx.json(soldVehicles))
    }),

    rest.get(
        `${API_BASE_URL}/api/vehicles/reports/monthly-sales`,
        (req, res, ctx) => {
            // Calculate the sales per month
            const salesPerMonth = calculateSalesPerMonth(vehicles)

            return res(ctx.status(200), ctx.json(salesPerMonth))
        }
    ),

    rest.get(
        `${API_BASE_URL}/api/vehicles/reports/annual-sales/brands`,
        (req, res, ctx) => {
            const salesByMakePerMonth = calculateAnnualSalesByMake(vehicles)

            return res(ctx.status(200), ctx.json(salesByMakePerMonth))
        }
    ),

    rest.get(
        `${API_BASE_URL}/api/vehicles/reports/monthly-sales/types`,
        (req, res, ctx) => {
            const salesByBodyTypePerMonth =
                calculateSalesByBodyTypePerMonth(vehicles)

            return res(ctx.status(200), ctx.json(salesByBodyTypePerMonth))
        }
    ),

    rest.get(`${API_BASE_URL}/api/vehicles/:id`, (req, res, ctx) => {
        const { id } = req.params
        const vehicle = vehicles.find((vehicle) => vehicle.id === Number(id))
        if (vehicle) {
            return res(ctx.status(200), ctx.json(vehicle))
        }

        return res(
            ctx.status(404),
            ctx.json({ message: `Vehicle with id ${id} not found` })
        )
    }),

    rest.post(`${API_BASE_URL}/api/vehicles`, (req, res, ctx) => {
        const vehicle = req.body as IVehicle
        const existingVehicle = vehicles.find(
            (v) => v.make === vehicle.make && v.model === vehicle.model
        )

        if (existingVehicle) {
            return res(
                ctx.status(400),
                ctx.json({
                    message: `Vehicle with make ${vehicle.make} and model ${vehicle.model} already exists`,
                })
            )
        }

        vehicles.push(vehicle)

        return res(ctx.status(200), ctx.json(vehicle))
    }),

    rest.put(`${API_BASE_URL}/api/vehicles/:id`, (req, res, ctx) => {
        const { id } = req.params
        const vehicle = req.body as IVehicle
        const existingVehicleIndex = vehicles.findIndex(
            (v) => v.id === Number(id)
        )

        if (existingVehicleIndex !== -1) {
            vehicles[existingVehicleIndex] = vehicle
            return res(ctx.status(200), ctx.json(vehicle))
        }

        return res(
            ctx.status(404),
            ctx.json({ message: `Vehicle with id ${id} not found` })
        )
    }),

    rest.patch(`${API_BASE_URL}/api/vehicles/:id`, (req, res, ctx) => {
        const { id } = req.params
        const vehicle = req.body as IVehicle
        const existingVehicleIndex = vehicles.findIndex(
            (v) => v.id === Number(id)
        )

        if (existingVehicleIndex !== -1) {
            vehicles[existingVehicleIndex] = {
                ...vehicles[existingVehicleIndex],
                ...vehicle,
            }
            return res(
                ctx.status(200),
                ctx.json(vehicles[existingVehicleIndex])
            )
        }

        return res(
            ctx.status(404),
            ctx.json({ message: `Vehicle with id ${id} not found` })
        )
    }),

    rest.delete(`${API_BASE_URL}/api/vehicles/:id`, (req, res, ctx) => {
        const { id } = req.params
        const existingVehicleIndex = vehicles.findIndex(
            (v) => v.id === Number(id)
        )

        if (existingVehicleIndex !== -1) {
            vehicles.splice(existingVehicleIndex, 1)
            return res(
                ctx.status(200),
                ctx.json({ message: `Vehicle with id ${id} deleted` })
            )
        }

        return res(
            ctx.status(404),
            ctx.json({ message: `Vehicle with id ${id} not found` })
        )
    }),
]
