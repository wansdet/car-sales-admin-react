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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI, usePatchAPI } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IVehicle,
    bodyTypes,
    colours,
    displayOptions,
    doors,
    fuelTypes,
    historyTypes,
    gearboxTypes,
    makes,
    seats,
    types,
    vehicleStatuses,
    vehicleSchema,
    years,
    IVehicleSearchOptions,
} from '@/common/models/vehicle'
import { getOptionByValue } from '@/utils/generic'
import { Section } from '@/components/data-display'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'
import { VehicleImageGallery } from '@/features/vehicles'

const VehicleEdit = () => {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState<IVehicle | null>(null)
    const [publishedDate, setPublishedDate] = useState<Dayjs | null>(null)
    const [soldDate, setSoldDate] = useState<Dayjs | null>(null)

    const { showNotification, NotificationComponent } = useNotification()
    const {
        data: fetchedVehicle,
        loading: getLoading,
        error: getError,
    } = useGetAPI<IVehicle>(`${API_BASE_URL}/api/vehicles/${id}`)

    const {
        patchData: updatedVehicle,
        loading: getUpdateLoading,
        error: getUpdateError,
    } = usePatchAPI<IVehicleSearchOptions>(`${API_BASE_URL}/api/vehicles/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(vehicleSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

    useEffect(() => {
        if (fetchedVehicle) {
            setVehicle(fetchedVehicle)
            setPublishedDate(dayjs.utc(fetchedVehicle.publishedDate))
            setSoldDate(dayjs.utc(fetchedVehicle.soldDate))
        }
    }, [fetchedVehicle])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    const onSubmit = (data: any) => {
        // Exclude readonly fields (e.g. createdAt) from the data object
        const { createdAt, updatedAt, ...formData } = data

        const make = {
            makeId: data.make,
            makeName: getOptionByValue(data.make, makes).label,
        }

        updatedVehicle({
            ...formData,
            make,
            publishedDate,
            soldDate,
        })
            .then(() => {
                showNotification('Vehicle updated successfully', 'success')
            })
            .catch((error) => {
                console.error('Error occurred while updating vehicle', error)
            })
    }

    return (
        <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 8 }}>
            {vehicle && (
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
                        <Grid container spacing={5} sx={{ mb: 5 }}>
                            <VehicleImageGallery />
                        </Grid>
                        <Section id="vehicle-main-section">
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
                                            defaultValue={vehicle.id.toString()}
                                            fullWidth={true}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="make">
                                            Make
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="make"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.make.makeId}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ my: 0 }}
                                        >
                                            {makes.map((makeOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={makeOption.value}
                                                >
                                                    {makeOption.label}
                                                </MenuItem>
                                            ))}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="model">
                                            Model
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="model"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={vehicle.model}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="type">
                                            Type
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="type"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.type}
                                            sx={{ my: 0 }}
                                        >
                                            {types.map((typeOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={typeOption.value}
                                                >
                                                    {typeOption.label}
                                                </MenuItem>
                                            ))}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="bodyType">
                                            Body Type
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="bodyType"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.bodyType}
                                            sx={{ my: 0 }}
                                        >
                                            {bodyTypes.map(
                                                (bodyTypeOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            bodyTypeOption.value
                                                        }
                                                    >
                                                        {bodyTypeOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="fuelType">
                                            Fuel Type
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="fuelType"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.fuelType}
                                            sx={{ my: 0 }}
                                        >
                                            {fuelTypes.map(
                                                (fuelTypeOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            fuelTypeOption.value
                                                        }
                                                    >
                                                        {fuelTypeOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="transmission">
                                            Colour
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="colour"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.colour}
                                            sx={{ my: 0 }}
                                        >
                                            {colours.map(
                                                (colourOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            colourOption.value
                                                        }
                                                    >
                                                        {colourOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="year">
                                            Year
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="year"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.year.toString()}
                                            sx={{ my: 0 }}
                                        >
                                            {years.map((yearOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={yearOption.value}
                                                >
                                                    {yearOption.label}
                                                </MenuItem>
                                            ))}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="mileage">
                                            Mileage
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="mileage"
                                            control={control}
                                            type="number"
                                            errors={errors}
                                            defaultValue={vehicle.mileage}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Doors
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="doors"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.doors.toString()}
                                            sx={{ my: 0 }}
                                        >
                                            {doors.map((doorOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={doorOption.value}
                                                >
                                                    {doorOption.label}
                                                </MenuItem>
                                            ))}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Seats
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="seats"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.seats.toString()}
                                            sx={{ my: 0 }}
                                        >
                                            {seats.map((seatOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={seatOption.value}
                                                >
                                                    {seatOption.label}
                                                </MenuItem>
                                            ))}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Owners
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="owners"
                                            control={control}
                                            type="number"
                                            errors={errors}
                                            defaultValue={vehicle.owners}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Service History
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="history"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.history}
                                            sx={{ my: 0 }}
                                        >
                                            {historyTypes.map(
                                                (historyOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            historyOption.value
                                                        }
                                                    >
                                                        {historyOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Gearbox
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="gearbox"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.gearbox}
                                            sx={{ my: 0 }}
                                        >
                                            {gearboxTypes.map(
                                                (gearboxOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            gearboxOption.value
                                                        }
                                                    >
                                                        {gearboxOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Price
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="price"
                                            control={control}
                                            type="number"
                                            errors={errors}
                                            defaultValue={vehicle.price}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Title
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="title"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={vehicle.title}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Description
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="description"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={vehicle.description}
                                            fullWidth={true}
                                            multiline={true}
                                            rows={8}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Features
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormInput
                                            name="features"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={vehicle.features}
                                            fullWidth={true}
                                            multiline={true}
                                            rows={8}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Status
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="status"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.status}
                                            sx={{ my: 0 }}
                                        >
                                            {vehicleStatuses.map(
                                                (statusOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            statusOption.value
                                                        }
                                                    >
                                                        {statusOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Display
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <FormSelect
                                            name="display"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={vehicle.display.toString()}
                                            sx={{ my: 0 }}
                                        >
                                            {displayOptions.map(
                                                (displayOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            displayOption.value
                                                        }
                                                    >
                                                        {displayOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Created At
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <DatePicker
                                            value={dayjs.utc(vehicle.createdAt)}
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Updated At
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <DatePicker
                                            value={dayjs.utc(vehicle.updatedAt)}
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Published Date
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <DatePicker
                                            value={publishedDate}
                                            onChange={(newValue) =>
                                                setPublishedDate(newValue)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormLabel htmlFor="price">
                                            Sold Date
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <DatePicker
                                            value={soldDate}
                                            onChange={(newValue) =>
                                                setSoldDate(newValue)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>
                                    <Grid item xs={12} sm={8}>
                                        <ButtonSubmit sx={{ mt: 3, mb: 2 }}>
                                            Submit
                                        </ButtonSubmit>
                                    </Grid>
                                </Grid>
                            </form>
                        </Section>
                    </Box>
                    <NotificationComponent />
                </React.Fragment>
            )}
        </Container>
    )
}

export default VehicleEdit
