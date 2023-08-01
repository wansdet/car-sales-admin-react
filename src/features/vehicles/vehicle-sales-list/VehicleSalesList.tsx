import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid } from '@mui/x-data-grid'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI } from '@/core/api'
import { IVehicle, colours } from '@/common/models/vehicle'
import { getOptionByValue } from '@/utils/generic'
import { dateFormat } from '@/utils/date'
import { H1 } from '@/components/data-display'

const VehicleSalesList = () => {
    const [vehicles, setVehicles] = useState<any[]>([])
    const [pageSize, setPageSize] = useState(10)
    const {
        data: fetchedVehicles,
        loading: getLoading,
        error: getError,
    } = useGetAPI<IVehicle[]>(`${API_BASE_URL}/api/vehicles/sales`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedVehicles) {
            setVehicles(
                fetchedVehicles.map((vehicle: IVehicle) => ({
                    id: vehicle.id,
                    make: vehicle.make.makeName,
                    model: vehicle.model,
                    colour: getOptionByValue(vehicle.colour, colours).label,
                    year: vehicle.year,
                    mileage: vehicle.mileage.toLocaleString(),
                    price: vehicle.price.toLocaleString(),
                    publishedDate: dateFormat(
                        vehicle?.publishedDate,
                        'DD/MM/YYYY'
                    ),
                    soldDate: dateFormat(vehicle?.soldDate, 'DD/MM/YYYY'),
                }))
            )
        }
    }, [fetchedVehicles])

    useEffect(() => {
        setPageSize(10)
    }, [])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    const handleShowVehicle = (params: any, event: any) => {
        navigate(`/vehicles/vehicle-show/${params.id}`)
    }

    const handleEditVehicle = (params: any, event: any) => {
        navigate(`/vehicles/vehicle-edit/${params.id}`)
    }

    const renderVehicleActions = (props: any) => {
        return (
            <React.Fragment>
                <Tooltip
                    title={`View vehicle ${props.row.make} ${props.row.model}`}
                >
                    <IconButton
                        onClick={(event) => handleShowVehicle(props, event)}
                    >
                        <VisibilityIcon aria-label="show" color="success" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Edit vehicle ${props.row.make} ${props.row.model}`}
                >
                    <IconButton
                        onClick={(event) => handleEditVehicle(props, event)}
                    >
                        <EditIcon aria-label="edit" color="primary" />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }

    const vehiclesDataGridColumns: any = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'make', headerName: 'Make', flex: 2 },
        { field: 'model', headerName: 'Model', flex: 2 },
        { field: 'colour', headerName: 'Colour', flex: 1 },
        { field: 'year', headerName: 'Year', flex: 1 },
        { field: 'mileage', headerName: 'Mileage', flex: 1 },
        { field: 'price', headerName: '£ Price', flex: 1 },
        {
            field: 'publishedDate',
            headerName: 'Published Date',
            flex: 2,
        },
        {
            field: 'soldDate',
            headerName: 'Date Sold',
            flex: 2,
        },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 2,
            renderCell: renderVehicleActions,
            align: 'center',
        },
    ]

    return (
        <Container
            data-testid="vehicle-sales-content"
            maxWidth="lg"
            component="main"
            sx={{ pt: 8, pb: 8 }}
        >
            <H1 variant="h4">Vehicle Sales</H1>
            <div data-testid="vehicle-sales-datagrid" style={{ width: '100%' }}>
                <DataGrid
                    autoHeight={true}
                    rows={vehicles}
                    columns={vehiclesDataGridColumns}
                    pagination
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    sx={{ mt: 6, backgroundColor: 'background.paper' }}
                />
            </div>
        </Container>
    )
}

export default VehicleSalesList
