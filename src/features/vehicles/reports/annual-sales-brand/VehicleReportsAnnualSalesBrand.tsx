import React, { useContext, useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { PieChart } from '@mui/x-charts'

import { useGetAPI } from '@/core/api'
import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { IMake } from '@/common/models/vehicle'
import { H1 } from '@/components/data-display'
import { YearSelection } from '@/features/vehicles'

interface IMakeSales {
    make: IMake
    sales: number
}

interface IAnnualSales {
    year: number
    makes: IMakeSales[]
}

interface ISeriesData {
    id: number
    value: number
    label: string
}

const VehicleReportsAnnualSalesBrand = () => {
    const [annualSales, setAnnualSales] = useState<IAnnualSales[]>([])
    const [years, setYears] = useState<number[]>([])
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    )
    const [series, setSeries] = useState<any[]>([])
    const title = 'Annual Sales by Brand'

    const {
        data: fetchedAnnualSales,
        loading: getLoading,
        error: getError,
    } = useGetAPI<any[]>(
        `${API_BASE_URL}/api/vehicles/reports/annual-sales/brands`
    )

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedAnnualSales) {
            setAnnualSales(fetchedAnnualSales)
            // Get unique years
            const uniqueYears = fetchedAnnualSales
                .map((annualSale: IAnnualSales) => annualSale.year)
                .filter((value: number, index: number, self: number[]) => {
                    return self.indexOf(value) === index
                })
            setYears(uniqueYears)
        }
    }, [fetchedAnnualSales])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    useEffect(() => {
        const selectedYearData = annualSales.find(
            (annualSale: IAnnualSales) => annualSale.year === selectedYear
        )

        // console.log(selectedYearData)

        if (selectedYearData) {
            const seriesData: ISeriesData[] = []
            selectedYearData.makes.forEach((make: IMakeSales, index) => {
                seriesData.push({
                    id: index,
                    value: make.sales,
                    label: make.make.makeName,
                })
            })

            // console.log(seriesData)
            setSeries(seriesData)
        } else {
            setSeries([])
        }
    }, [selectedYear, annualSales])

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(Number(event.target.value))
    }

    return (
        <Container
            data-testid="annual-sales-brand-content"
            maxWidth="lg"
            sx={{ pt: 8, pb: 8 }}
        >
            <H1 variant="h4">{title}</H1>
            <YearSelection
                years={years}
                selectedYear={selectedYear}
                onChange={handleYearChange}
            />
            {series.length > 0 && (
                <Box
                    data-testid="annual-sales-brand-chart"
                    sx={{
                        backgroundColor: 'background.paper',
                        p: 8,
                        width: '100%',
                        height: '60vh',
                    }}
                >
                    <PieChart
                        series={[
                            {
                                data: series,
                            },
                        ]}
                        sx={{ width: '100%', height: '100%' }}
                    />
                </Box>
            )}
        </Container>
    )
}

export default VehicleReportsAnnualSalesBrand
