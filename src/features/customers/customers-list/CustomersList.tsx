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
import { ICustomer } from '@/common/models/customer'
import { userStatuses } from '@/common/models/user'
import { ChipStatus, H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const CustomersList = () => {
    const [customers, setCustomers] = useState<any[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
        null
    )
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const {
        data: fetchedCustomers,
        loading: getLoading,
        error: getError,
    } = useGetAPI<ICustomer[]>(`${API_BASE_URL}/api/customers`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedCustomers) {
            setCustomers(
                fetchedCustomers.map((customer: ICustomer) => ({
                    id: customer.id,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phoneNumber: customer.phoneNumber,
                    mobileNumber: customer.mobileNumber,
                    email: customer.email,
                    status: customer.status,
                }))
            )
        }
    }, [fetchedCustomers])

    const {
        deleteData: deleteCustomer,
        loading: deleteCustomerLoading,
        error: deleteCustomerError,
    } = useDeleteAPI(
        selectedCustomer
            ? `${API_BASE_URL}/api/customers/${selectedCustomer.id}`
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

    const handleShowCustomer = (params: any, event: any) => {
        navigate(`/customers/customer-show/${params.id}`)
    }

    const handleEditCustomer = (params: any, event: any) => {
        navigate(`/customers/customer-edit/${params.id}`)
    }

    const handleDeleteCustomer = (params: any, event: any) => {
        setSelectedCustomer(params.row)
        setConfirmDialogOpen(true)
    }

    const onDeleteCustomer = () => {
        setConfirmDialogOpen(false)

        if (selectedCustomer) {
            deleteCustomer()
                .then(() => {
                    showNotification('Customer deleted successfully', 'success')
                    // Remove the deleted customer from fetchedCustomers
                    if (fetchedCustomers) {
                        const updatedCustomers = fetchedCustomers.filter(
                            (customer: ICustomer) =>
                                customer.id !== selectedCustomer.id
                        )
                        setCustomers(updatedCustomers)
                    }
                })
                .catch((error) => {
                    console.error(
                        'Error occurred while deleting customer',
                        error
                    )
                })
        } else {
            console.warn('No customer selected.')
        }
    }

    const renderCustomerStatus = (props: any) => {
        return (
            <React.Fragment>
                {props.value ? (
                    <ChipStatus
                        statusValue={props.value}
                        statuses={userStatuses}
                        size="small"
                    />
                ) : (
                    ''
                )}
            </React.Fragment>
        )
    }

    const renderCustomerActions = (props: any) => {
        return (
            <React.Fragment>
                <Tooltip
                    title={`View customer ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        onClick={(event) => handleShowCustomer(props, event)}
                    >
                        <VisibilityIcon aria-label="show" color="success" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Edit customer ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        onClick={(event) => handleEditCustomer(props, event)}
                    >
                        <EditIcon aria-label="edit" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Delete customer ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        onClick={(event) => handleDeleteCustomer(props, event)}
                    >
                        <DeleteIcon aria-label="delete" color="error" />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }

    const customersDataGridColumns: any = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'firstName', headerName: 'First name', flex: 2 },
        { field: 'lastName', headerName: 'Last name', flex: 2 },
        { field: 'phoneNumber', headerName: 'Phone', flex: 2 },
        { field: 'mobileNumber', headerName: 'Mobile', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 2 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: renderCustomerStatus,
        },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 2,
            renderCell: renderCustomerActions,
            align: 'center',
        },
    ]

    return (
        <Container
            data-testid="customers-list-content"
            maxWidth="lg"
            component="main"
            sx={{ pt: 8, pb: 8 }}
        >
            <H1 variant="h4">Customers</H1>
            <div
                data-testid="customers-list-datagrid"
                style={{ width: '100%' }}
            >
                <DataGrid
                    autoHeight={true}
                    rows={customers}
                    columns={customersDataGridColumns}
                    pagination
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    sx={{ mt: 6, backgroundColor: 'background.paper' }}
                />
            </div>
            <ConfirmDialog
                title="Delete Customer"
                open={confirmDialogOpen}
                onConfirm={onDeleteCustomer}
                onClose={() => setConfirmDialogOpen(false)}
            >
                {selectedCustomer && (
                    <div>
                        <Typography variant="body1" gutterBottom>
                            Are you sure you want to delete this customer?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>ID: {selectedCustomer.id}</strong>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>
                                {selectedCustomer.firstName}{' '}
                                {selectedCustomer.lastName}
                            </strong>
                        </Typography>
                    </div>
                )}
            </ConfirmDialog>
            <NotificationComponent />
        </Container>
    )
}

export default CustomersList
