import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid } from '@mui/x-data-grid'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI, useDeleteAPI } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import { IVehicle, colours, vehicleStatuses } from '@/common/models/vehicle'
import { getOptionByValue } from '@/utils/generic'
import { ChipStatus, H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState<any[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(
        null
    )
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const {
        data: fetchedVehicles,
        loading: getLoading,
        error: getError,
    } = useGetAPI<IVehicle[]>(`${API_BASE_URL}/api/vehicles/inventory`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
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
                    status: vehicle.status,
                }))
            )
        }
    }, [fetchedVehicles])

    const {
        deleteData: deleteVehicle,
        loading: deleteVehicleLoading,
        error: deleteVehicleError,
    } = useDeleteAPI(
        selectedVehicle
            ? `${API_BASE_URL}/api/vehicles/${selectedVehicle.id}`
            : ''
    )

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

    const handleDeleteVehicle = (params: any, event: any) => {
        setSelectedVehicle(params.row)
        setConfirmDialogOpen(true)
    }

    const onDeleteVehicle = () => {
        setConfirmDialogOpen(false)

        if (selectedVehicle) {
            deleteVehicle()
                .then(() => {
                    showNotification('Vehicle deleted successfully', 'success')
                    // Remove the deleted vehicle from fetchedVehicles
                    if (fetchedVehicles) {
                        const updatedVehicles = fetchedVehicles.filter(
                            (vehicle: IVehicle) =>
                                vehicle.id !== selectedVehicle.id
                        )
                        setVehicles(updatedVehicles)
                    }
                })
                .catch((error) => {
                    console.error(
                        'Error occurred while deleting vehicle',
                        error
                    )
                })
        } else {
            console.warn('No vehicle selected.')
        }
    }

    const renderVehicleStatus = (props: any) => {
        return (
            <React.Fragment>
                {props.value ? (
                    <ChipStatus
                        statusValue={props.value}
                        statuses={vehicleStatuses}
                        size="small"
                    />
                ) : (
                    ''
                )}
            </React.Fragment>
        )
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
                <Tooltip
                    title={`Delete vehicle ${props.row.make} ${props.row.model}`}
                >
                    <IconButton
                        onClick={(event) => handleDeleteVehicle(props, event)}
                    >
                        <DeleteIcon aria-label="delete" color="error" />
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
            field: 'status',
            headerName: 'Status',
            flex: 2,
            renderCell: renderVehicleStatus,
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
            data-testid="vehicle-inventory-content"
            maxWidth="lg"
            component="main"
            sx={{ pt: 8, pb: 8 }}
        >
            <H1 variant="h4">Vehicle Inventory</H1>
            <div
                data-testid="vehicle-inventory-datagrid"
                style={{ width: '100%' }}
            >
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
            <ConfirmDialog
                title="Delete Vehicle"
                open={confirmDialogOpen}
                onConfirm={onDeleteVehicle}
                onClose={() => setConfirmDialogOpen(false)}
            >
                {selectedVehicle && (
                    <div>
                        <Typography variant="body1" gutterBottom>
                            Are you sure you want to delete this vehicle?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>ID: {selectedVehicle.id}</strong>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>
                                {selectedVehicle.make.makeName}{' '}
                                {selectedVehicle.model}
                            </strong>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>
                                {`${selectedVehicle.colour} ${selectedVehicle.mileage} miles`}
                            </strong>
                        </Typography>
                    </div>
                )}
            </ConfirmDialog>
            <NotificationComponent />
        </Container>
    )
}

export default VehiclesList
