import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { ApplicationContext, API_BASE_URL } from '@/core/application'
import { useGetAPI } from '@/core/api'
import {
    IVehicle,
    bodyTypes,
    colours,
    fuelTypes,
    historyTypes,
    gearboxTypes,
    vehicleStatuses,
} from '@/common/models/vehicle'
import { getOptionByValue } from '@/utils/generic'
import {
    ChipStatus,
    Heading,
    Paragraph,
    Section,
} from '@/components/data-display'
import { VehicleImageGallery } from '@/features/vehicles'

const VehicleShow = () => {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState<IVehicle | null>(null)
    const {
        data: fetchedVehicle,
        loading: getLoading,
        error: getError,
    } = useGetAPI<IVehicle>(`${API_BASE_URL}/api/vehicles/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedVehicle) {
            setVehicle(fetchedVehicle)
        }
    }, [fetchedVehicle])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

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
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <TableContainer
                                    component={Paper}
                                    variant={'outlined'}
                                    sx={{ flex: 1 }}
                                >
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow></TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Reference</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.id}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Make/Model
                                                </TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.make.makeName}{' '}
                                                        {vehicle.model}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Body type</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {
                                                            getOptionByValue(
                                                                vehicle.bodyType,
                                                                bodyTypes
                                                            )?.label
                                                        }
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Year</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.year}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Colour</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {
                                                            getOptionByValue(
                                                                vehicle.colour,
                                                                colours
                                                            )?.label
                                                        }
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Mileage</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.mileage.toLocaleString()}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Owners</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.owners}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>History</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {
                                                            getOptionByValue(
                                                                vehicle.history,
                                                                historyTypes
                                                            )?.label
                                                        }
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Gearbox</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {
                                                            getOptionByValue(
                                                                vehicle.gearbox,
                                                                gearboxTypes
                                                            )?.label
                                                        }
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Doors</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.doors}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Seats</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {vehicle.seats}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Fuel Type</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        {
                                                            getOptionByValue(
                                                                vehicle.fuelType,
                                                                fuelTypes
                                                            )?.label
                                                        }
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Price</TableCell>
                                                <TableCell>
                                                    <strong>
                                                        £{' '}
                                                        {vehicle.price.toLocaleString()}
                                                    </strong>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Status</TableCell>
                                                <TableCell>
                                                    <ChipStatus
                                                        statusValue={
                                                            vehicle.status
                                                        }
                                                        statuses={
                                                            vehicleStatuses
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <Section id="vehicle-main-section">
                            <header>
                                <Heading>
                                    {vehicle.make.makeName} {vehicle.model}
                                </Heading>
                            </header>
                            <Section id="vehicle-information">
                                <Heading>Vehicle Information</Heading>
                                <Section id="vehicle-details">
                                    <Heading>Details</Heading>
                                    <Paragraph>{vehicle.description}</Paragraph>
                                    <Heading>Features</Heading>
                                    <Paragraph>{vehicle.features}</Paragraph>
                                </Section>
                            </Section>
                        </Section>
                    </Box>
                </React.Fragment>
            )}
        </Container>
    )
}

export default VehicleShow
