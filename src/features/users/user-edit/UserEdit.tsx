import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Grid,
    MenuItem,
    Select,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI, usePatchAPI } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IUserUpdate,
    genderOptions,
    userRoles,
    userStatuses,
    userUpdateSchema,
} from '@/common/models/user'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'

const UserEdit = () => {
    const { id } = useParams()
    const [user, setUser] = useState<IUserUpdate | null>(null)
    const { showNotification, NotificationComponent } = useNotification()
    const { data: fetchedUser } = useGetAPI<IUserUpdate>(
        `${API_BASE_URL}/api/users/${id}`
    )
    const {
        patchData: updatedUser,
        loading: getLoading,
        error: getError,
    } = usePatchAPI<IUserUpdate>(`${API_BASE_URL}/api/users/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(userUpdateSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

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

    const onSubmit = (data: any) => {
        // console.log(data)
        updatedUser(data)
            .then(() => {
                showNotification('User updated successfully', 'success')
            })
            .catch((error) => {
                console.error('Error occurred while updating user', error)
            })
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
                                        defaultValue={user.id.toString()}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="username">
                                        Username
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="username"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.username}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
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
                                        defaultValue={user.firstName}
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
                                        defaultValue={user.lastName}
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
                                        defaultValue={user.gender}
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
                                        defaultValue={user.email}
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
                                        defaultValue={user.jobTitle}
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
                                        defaultValue={user.phoneNumber}
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
                                        defaultValue={user.mobileNumber}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="roles">Roles</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormControl fullWidth>
                                        <Select
                                            defaultValue={
                                                user.roles.filter(
                                                    Boolean
                                                ) as string[]
                                            } // Filter and cast to string[]
                                            {...register('roles')}
                                            multiple
                                            sx={{ m: 0, p: 0 }}
                                        >
                                            {userRoles.map(
                                                (userRoleOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            userRoleOption.value
                                                        }
                                                    >
                                                        {userRoleOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="description"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        multiline={true}
                                        maxRows={4}
                                        defaultValue={user?.description}
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
                                        defaultValue={user.status}
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

export default UserEdit
