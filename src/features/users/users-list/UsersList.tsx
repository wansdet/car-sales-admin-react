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
import { IUser, userStatuses } from '@/common/models/user'
import { ChipStatus, H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const UsersList = () => {
    const [users, setUsers] = useState<any[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const {
        data: fetchedUsers,
        loading: getLoading,
        error: getError,
    } = useGetAPI<IUser[]>(`${API_BASE_URL}/api/users`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedUsers) {
            setUsers(
                fetchedUsers.map((user: IUser) => ({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    jobTitle: user.jobTitle,
                    status: user.status,
                }))
            )
        }
    }, [fetchedUsers])

    const {
        deleteData: deleteUser,
        loading: deleteUserLoading,
        error: deleteUserError,
    } = useDeleteAPI(
        selectedUser ? `${API_BASE_URL}/api/users/${selectedUser.id}` : ''
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

    const handleShowUser = (params: any, event: any) => {
        navigate(`/users/user-show/${params.id}`)
    }

    const handleEditUser = (params: any, event: any) => {
        navigate(`/users/user-edit/${params.id}`)
    }

    const handleDeleteUser = (params: any, event: any) => {
        setSelectedUser(params.row)
        setConfirmDialogOpen(true)
    }

    const onDeleteUser = () => {
        setConfirmDialogOpen(false)

        if (selectedUser) {
            deleteUser()
                .then(() => {
                    showNotification('User deleted successfully', 'success')
                    // Remove the deleted user from fetchedUsers
                    if (fetchedUsers) {
                        const updatedUsers = fetchedUsers.filter(
                            (user: IUser) => user.id !== selectedUser.id
                        )
                        setUsers(updatedUsers)
                    }
                })
                .catch((error) => {
                    console.error('Error occurred while deleting user', error)
                })
        } else {
            console.warn('No user selected.')
        }
    }

    const renderUserStatus = (props: any) => {
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

    const renderUserActions = (props: any) => {
        return (
            <React.Fragment>
                <Tooltip
                    title={`View user ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        onClick={(event) => handleShowUser(props, event)}
                    >
                        <VisibilityIcon aria-label="show" color="success" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Edit user ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        onClick={(event) => handleEditUser(props, event)}
                    >
                        <EditIcon aria-label="edit" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Delete user ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        onClick={(event) => handleDeleteUser(props, event)}
                    >
                        <DeleteIcon aria-label="delete" color="error" />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }

    const usersDataGridColumns: any = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 2 },
        { field: 'firstName', headerName: 'First name', flex: 2 },
        { field: 'lastName', headerName: 'Last name', flex: 2 },
        { field: 'jobTitle', headerName: 'Job title', flex: 2 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: renderUserStatus,
        },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 2,
            renderCell: renderUserActions,
            align: 'center',
        },
    ]

    return (
        <Container
            data-testid="users-list-content"
            maxWidth="lg"
            component="main"
            sx={{ pt: 8, pb: 8 }}
        >
            <H1 variant="h4">Users</H1>
            <div data-testid="users-list-datagrid" style={{ width: '100%' }}>
                <DataGrid
                    autoHeight={true}
                    rows={users}
                    columns={usersDataGridColumns}
                    pagination
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    sx={{ mt: 6, backgroundColor: 'background.paper' }}
                />
            </div>
            <ConfirmDialog
                title="Delete User"
                open={confirmDialogOpen}
                onConfirm={onDeleteUser}
                onClose={() => setConfirmDialogOpen(false)}
            >
                {selectedUser && (
                    <div>
                        <Typography variant="body1" gutterBottom>
                            Are you sure you want to delete this user?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>ID: {selectedUser.id}</strong>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>
                                {selectedUser.firstName} {selectedUser.lastName}
                            </strong>
                        </Typography>
                    </div>
                )}
            </ConfirmDialog>
            <NotificationComponent />
        </Container>
    )
}

export default UsersList
