import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, FormLabel, Grid, Input } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI } from '@/core/api'
import { ICustomer } from '@/common/models/customer'
import { genderOptions, userStatuses } from '@/common/models/user'
import { getOptionByValue } from '@/utils/generic'
import { ChipStatus } from '@/components/data-display'

const CustomerShow = () => {
    const { id } = useParams()
    const [customer, setCustomer] = useState<ICustomer | null>(null)
    const {
        data: fetchedCustomer,
        loading: getLoading,
        error: getError,
    } = useGetAPI<ICustomer>(`${API_BASE_URL}/api/customers/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedCustomer) {
            setCustomer(fetchedCustomer)
        }
    }, [fetchedCustomer])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    const customerRolesList = (roles: string[]) => {
        return roles.join(', ')
    }

    return (
        <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 8 }}>
            {customer && (
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
                                    value={customer.id}
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
                                    value={customer.firstName}
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
                                    value={customer.lastName}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="middleName">
                                    Middle name
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="middleName"
                                    name="middleName"
                                    value={customer.middleName}
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
                                            customer.gender,
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
                                    value={customer.email}
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
                                    value={customer.phoneNumber}
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
                                    value={customer.mobileNumber}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="jobTtitle">
                                    Job title
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={customer.jobTitle}
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel htmlFor="notes">Notes</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Input
                                    id="description"
                                    name="description"
                                    value={customer.notes}
                                    multiline
                                    maxRows={8}
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
                                    statusValue={customer.status}
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

export default CustomerShow
