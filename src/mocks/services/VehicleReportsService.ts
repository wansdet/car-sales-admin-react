import { IOption } from '@/common'
import { bodyTypes } from '@/common/models/vehicle'
import { IMake, IVehicle } from '@/mocks/services/VehiclesService'

export const calculateSalesPerMonth = (
    vehicles: IVehicle[]
): {
    month: number
    year: number
    sales: number
}[] => {
    const salesPerMonth: {
        month: number
        year: number
        sales: number
    }[] = []

    // Iterate over the sold vehicles and calculate the count per month/year
    vehicles
        .filter((vehicle) => vehicle.status === 'sold')
        .forEach((vehicle) => {
            const soldDate = vehicle.soldDate
            if (soldDate) {
                const month = soldDate.getMonth()
                const year = soldDate.getFullYear()

                // Check if an entry for the month/year already exists in the salesPerMonth array
                const existingEntryIndex = salesPerMonth.findIndex(
                    (entry) => entry.month === month && entry.year === year
                )
                if (existingEntryIndex !== -1) {
                    // If an entry exists, increment the sales count
                    salesPerMonth[existingEntryIndex].sales += 1
                } else {
                    // If no entry exists, add a new entry
                    salesPerMonth.push({ month, year, sales: 1 })
                }
            }
        })

    // Sort the salesPerMonth array by year (ascending) and then by month (ascending)
    salesPerMonth.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year
        }
        return a.month - b.month
    })

    return salesPerMonth
}

export const calculateSalesByMakePerMonth = (
    vehicles: IVehicle[]
): {
    month: number
    year: number
    makes: { make: IMake; sales: number }[]
}[] => {
    const salesByMakePerMonth: {
        month: number
        year: number
        makes: { make: IMake; sales: number }[]
    }[] = []

    // Iterate over the sold vehicles and calculate the count per make/month/year
    vehicles
        .filter((vehicle) => vehicle.status === 'sold')
        .forEach((vehicle) => {
            const soldDate = vehicle.soldDate
            if (soldDate) {
                const month = soldDate.getMonth()
                const year = soldDate.getFullYear()

                // Check if an entry for the make/month/year already exists in the salesByMakePerMonth array
                const existingEntryIndex = salesByMakePerMonth.findIndex(
                    (entry) => entry.month === month && entry.year === year
                )
                if (existingEntryIndex !== -1) {
                    // If an entry exists, check if the make already exists
                    const existingMakeIndex = salesByMakePerMonth[
                        existingEntryIndex
                    ].makes.findIndex(
                        (make) => make.make.makeId === vehicle.make.makeId
                    )
                    if (existingMakeIndex !== -1) {
                        // If the make exists, increment the sales count
                        salesByMakePerMonth[existingEntryIndex].makes[
                            existingMakeIndex
                        ].sales += 1
                    } else {
                        // If the make doesn't exist, add a new entry
                        salesByMakePerMonth[existingEntryIndex].makes.push({
                            make: vehicle.make,
                            sales: 1,
                        })
                    }
                } else {
                    // If no entry exists, add a new entry with the make
                    salesByMakePerMonth.push({
                        month,
                        year,
                        makes: [
                            {
                                make: vehicle.make,
                                sales: 1,
                            },
                        ],
                    })
                }
            }
        })

    // Sort the salesByMakePerMonth array by year (ascending), month (ascending)
    salesByMakePerMonth.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year
        }
        return a.month - b.month
    })

    return salesByMakePerMonth
}

export const calculateSalesByBodyTypePerMonth = (
    vehicles: IVehicle[]
): {
    month: number
    year: number
    bodyTypes: { id: string; label: string; sales: number }[]
}[] => {
    const salesByBodyTypePerMonth: {
        month: number
        year: number
        bodyTypes: { id: string; label: string; sales: number }[]
    }[] = []

    // Generate initial data structure
    for (let month = 0; month < 12; month++) {
        for (let year = 2022; year <= new Date().getFullYear(); year++) {
            const bodyTypesData: {
                id: string
                label: string
                sales: number
            }[] = []
            bodyTypes.forEach((bodyTypeOption) => {
                const bodyType = bodyTypeOption.value.toString()
                bodyTypesData.push({
                    id: bodyType,
                    label: bodyTypeOption.label,
                    sales: 0,
                })
            })

            salesByBodyTypePerMonth.push({
                month,
                year,
                bodyTypes: bodyTypesData,
            })
        }
    }

    // Calculate sales by bodyType per month
    vehicles
        .filter((vehicle) => vehicle.status === 'sold')
        .forEach((vehicle) => {
            const soldDate = vehicle.soldDate
            if (soldDate) {
                const month = soldDate.getMonth()
                const year = soldDate.getFullYear()

                const salesData = salesByBodyTypePerMonth.find(
                    (data) => data.month === month && data.year === year
                )

                if (salesData) {
                    const bodyTypeData = salesData.bodyTypes.find(
                        (bodyType) => bodyType.id === vehicle.bodyType
                    )

                    if (bodyTypeData) {
                        bodyTypeData.sales += 1
                    }
                }
            }
        })

    return salesByBodyTypePerMonth
}

export const calculateAnnualSalesByMake = (
    vehicles: IVehicle[]
): {
    year: number
    makes: { make: IMake; sales: number }[]
}[] => {
    const salesByYear: {
        year: number
        makes: { make: IMake; sales: number }[]
    }[] = []

    vehicles
        .filter((vehicle) => vehicle.status === 'sold')
        .forEach((vehicle) => {
            const soldDate = vehicle.soldDate
            if (soldDate) {
                const year = soldDate.getFullYear()

                // Check if an entry for the year already exists in the salesByYear array
                const existingYearIndex = salesByYear.findIndex(
                    (entry) => entry.year === year
                )
                if (existingYearIndex !== -1) {
                    // If an entry exists, check if the make already exists
                    const existingMakeIndex = salesByYear[
                        existingYearIndex
                    ].makes.findIndex(
                        (make) => make.make.makeId === vehicle.make.makeId
                    )
                    if (existingMakeIndex !== -1) {
                        // If the make exists, increment the sales count
                        salesByYear[existingYearIndex].makes[
                            existingMakeIndex
                        ].sales += 1
                    } else {
                        // If the make doesn't exist, add a new entry
                        salesByYear[existingYearIndex].makes.push({
                            make: vehicle.make,
                            sales: 1,
                        })

                        // Sort the makes alphabetically
                        salesByYear[existingYearIndex].makes.sort((a, b) =>
                            a.make.makeName.localeCompare(b.make.makeName)
                        )
                    }
                } else {
                    // If no entry exists, add a new entry with the make
                    salesByYear.push({
                        year,
                        makes: [{ make: vehicle.make, sales: 1 }],
                    })
                }
            }
        })

    // Sort the salesByYear array by year (ascending)
    salesByYear.sort((a, b) => a.year - b.year)

    return salesByYear
}
