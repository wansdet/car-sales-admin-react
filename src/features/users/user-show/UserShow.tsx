import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, FormLabel, Grid, Input } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI } from '@/core/api'
import { IUser, genderOptions, userStatuses } from '@/common/models/user'
import { getOptionByValue } from '@/utils/generic'
import { ChipStatus } from '@/components/data-display'

const UserShow = () => {
    const { id } = useParams()
    const [user, setUser] = useState<IUser | null>(null)
    const {
        data: fetchedUser,
        loading: getLoading,
        error: getError,
    } = useGetAPI<IUser>(`${API_BASE_URL}/api/users/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser)
        }
    }, [fetchedUser])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    const userRolesList = (roles: (string | undefined)[]) => {
        return roles.filter((role) => role !== undefined).join(', ')
    }

    return (
        <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 8 }}>
            {user && (
                <React.Fragment>
                    <Button
                        color="primary"
                        startIcon={<ChevronLeftIcon />}
                        sx={{ mb: 3 }}
                        onClick={() => navigate(-1)}
                    >
                        Return
                    </Button>
                    <Box sx={{ backgroundColor: 'background.paper', p: 8 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="id">ID</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="id"
                                    name="id"
                                    value={user.id}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="username"
                                    name="username"
                                    value={user.username}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="firstName">
                                    First name
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={user.firstName}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="lastName">
                                    Last name
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={user.lastName}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="gender">Gender</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="gender"
                                    name="gender"
                                    value={
                                        getOptionByValue(
                                            user.gender,
                                            genderOptions
                                        ).label
                                    }
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="jobTitle">
                                    Job title
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={user.jobTitle}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="phoneNumber">
                                    Phone number
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="mobileNumber">
                                    Mobile number
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={user.mobileNumber}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="roles">Roles</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="roles"
                                    name="roles"
                                    value={userRolesList(user.roles)}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="description"
                                    name="description"
                                    value={user.description}
                                    multiline
                                    maxRows={4}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="status">Status</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <ChipStatus
                                    statusValue={user.status}
                                    statuses={userStatuses}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </React.Fragment>
            )}
        </Container>
    )
}

export default UserShow
