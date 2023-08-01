import React, { useContext, useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { BarChart } from '@mui/x-charts'

import { useGetAPI } from '@/core/api'
import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { IMonthlySales } from '@/common/models/vehicle'
import { bodyTypes } from '@/common/models/vehicle'
import { H1 } from '@/components/data-display'
import { YearSelection } from '@/features/vehicles'

interface ISeries {
    data: number[]
    label: string
    id: string
}

const VehicleReportsMonthlySalesType = () => {
    const [monthlySales, setMonthlySales] = useState<IMonthlySales[]>([])
    const [years, setYears] = useState<number[]>([])
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    )
    const [xAxis, setXAxis] = useState<string[]>([])
    const [series, setSeries] = useState<ISeries[]>([])
    const title = 'Monthly Sales by Body Type'

    const {
        data: fetchedMonthlySales,
        loading: getLoading,
        error: getError,
    } = useGetAPI<any[]>(
        `${API_BASE_URL}/api/vehicles/reports/monthly-sales/types`
    )

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedMonthlySales) {
            setMonthlySales(fetchedMonthlySales)
            // Get unique years
            const uniqueYears = fetchedMonthlySales
                .map((vehicle: IMonthlySales) => vehicle.year)
                .filter((value: number, index: number, self: number[]) => {
                    return self.indexOf(value) === index
                })
            setYears(uniqueYears)
        }
    }, [fetchedMonthlySales])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    useEffect(() => {
        const selectedYearData = monthlySales.filter(
            (vehicle: IMonthlySales) => vehicle.year === selectedYear
        )

        const xAxisData: string[] = []

        const seriesData: ISeries[] = []
        bodyTypes.forEach((bodyTypeOption) => {
            const bodyType = bodyTypeOption.value.toString()
            seriesData.push({
                data: [],
                label: bodyTypeOption.label,
                id: bodyType,
            })
        })

        selectedYearData.forEach((monthData: any) => {
            xAxisData.push(
                new Date(0, monthData.month).toLocaleString('default', {
                    month: 'short',
                })
            )

            monthData.bodyTypes.forEach((bodyType: any) => {
                seriesData
                    .find((series) => series.id === bodyType.id)
                    ?.data.push(bodyType.sales)
            })
        })

        setXAxis(xAxisData)
        setSeries(seriesData)
    }, [selectedYear, monthlySales])

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(Number(event.target.value))
    }

    return (
        <Container
            data-testid="monthly-sales-type-content"
            maxWidth="lg"
            sx={{ pt: 8, pb: 8 }}
        >
            <H1 variant="h4">{title}</H1>
            <YearSelection
                years={years}
                selectedYear={selectedYear}
                onChange={handleYearChange}
            />
            {xAxis.length > 0 && series.length > 0 && (
                <Box
                    data-testid="monthly-sales-type-chart"
                    sx={{
                        backgroundColor: 'background.paper',
                        p: 8,
                        width: '100%',
                        height: '50vh',
                    }}
                >
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: xAxis }]}
                        series={series}
                        sx={{ width: '100%', height: '100%' }}
                    />
                </Box>
            )}
        </Container>
    )
}

export default VehicleReportsMonthlySalesType
