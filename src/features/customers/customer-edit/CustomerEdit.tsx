import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    FormLabel,
    Grid,
    MenuItem,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI, usePatchAPI } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import { ICustomer, customerSchema } from '@/common/models/customer'
import { genderOptions, userStatuses } from '@/common/models/user'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'

const CustomerEdit = () => {
    const { id } = useParams()
    const [customer, setCustomer] = useState<ICustomer | null>(null)
    const { showNotification, NotificationComponent } = useNotification()
    const { data: fetchedCustomer } = useGetAPI<ICustomer>(
        `${API_BASE_URL}/api/customers/${id}`
    )

    const {
        patchData: updatedCustomer,
        loading: getLoading,
        error: getError,
    } = usePatchAPI<ICustomer>(`${API_BASE_URL}/api/customers/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(customerSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

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

    const onSubmit = (data: ICustomer) => {
        // console.log(data)
        updatedCustomer(data)
            .then(() => {
                showNotification('Customer updated successfully', 'success')
            })
            .catch((error) => {
                console.error('Error occurred while updating customer', error)
            })
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="id">ID</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="id"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.id.toString()}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="firstName">
                                        First name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="firstName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.firstName}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="lastName">
                                        Last name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="lastName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.lastName}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="middleName">
                                        Middle name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="middleName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer?.middleName}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="gender">
                                        Gender
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormSelect
                                        name="gender"
                                        label=""
                                        control={control}
                                        errors={errors}
                                        defaultValue={customer.gender}
                                        sx={{ my: 0 }}
                                    >
                                        {genderOptions.map(
                                            (genderOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={genderOption.value}
                                                >
                                                    {genderOption.label}
                                                </MenuItem>
                                            )
                                        )}
                                    </FormSelect>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="email"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.email}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="jobTitle">
                                        Job title
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="jobTitle"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.jobTitle}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="phoneNumber">
                                        Phone number
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="phoneNumber"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.phoneNumber}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="mobileNumber">
                                        Mobile number
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="mobileNumber"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={customer.mobileNumber}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="notes">Notes</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="notes"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        multiline={true}
                                        maxRows={4}
                                        defaultValue={customer?.notes}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="status">
                                        Status
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormSelect
                                        name="status"
                                        label=""
                                        control={control}
                                        errors={errors}
                                        defaultValue={customer.status}
                                        sx={{ my: 0 }}
                                    >
                                        {userStatuses.map(
                                            (statusOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={statusOption.value}
                                                >
                                                    {statusOption.label}
                                                </MenuItem>
                                            )
                                        )}
                                    </FormSelect>
                                </Grid>
                                <Grid item xs={12} sm={4}></Grid>
                                <Grid item xs={12} sm={8}>
                                    <ButtonSubmit sx={{ mt: 3, mb: 2 }}>
                                        Submit
                                    </ButtonSubmit>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                    <NotificationComponent />
                </React.Fragment>
            )}
        </Container>
    )
}

export default CustomerEdit
