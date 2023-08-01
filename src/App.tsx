import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, CssBaseline, ThemeOptions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'

import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ApplicationProvider } from '@/core/application'
import { SecurityProvider } from '@/core/security'
import { AppDrawer, Footer, DrawerHeader } from '@/core/layout'
import Home from '@/features/home/Home'
import {
    VehicleEdit,
    VehicleShow,
    VehiclesList,
    VehicleSalesList,
} from '@/features/vehicles'
import { UserEdit, UserShow, UsersList } from '@/features/users'
import { CustomerEdit, CustomerShow, CustomersList } from '@/features/customers'
import {
    VehicleReportsAnnualSalesBrand,
    VehicleReportsMonthlySales,
    VehicleReportsMonthlySalesType,
} from '@/features/vehicles/reports'

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        leadParagraph: true
    }
}

interface ExtendedTypographyOptions extends TypographyOptions {
    leadParagraph: React.CSSProperties
}

const theme = createTheme({
    typography: {
        leadParagraph: {
            fontSize: '1.5rem',
            fontStyle: 'italic',
        },
    } as ExtendedTypographyOptions,
} as ThemeOptions)

function App() {
    return (
        <React.Fragment>
            <SecurityProvider>
                <ThemeProvider theme={theme}>
                    <ApplicationProvider>
                        <CssBaseline />
                        <div className="App">
                            <Box
                                sx={{
                                    display: 'flex',
                                    backgroundColor: 'grey.50',
                                    flex: '1 1 100%',
                                }}
                            >
                                <AppDrawer />
                                <Box
                                    component="main"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: '100vh',
                                        flexGrow: 1,
                                    }}
                                >
                                    <DrawerHeader />
                                    <Routes>
                                        <Route path={'/'} element={<Home />} />

                                        <Route
                                            path={'/vehicles/vehicles-list'}
                                            element={<VehiclesList />}
                                        />
                                        <Route
                                            path={
                                                '/vehicles/vehicle-sales-list'
                                            }
                                            element={<VehicleSalesList />}
                                        />
                                        <Route
                                            path={'/vehicles/vehicle-show/:id'}
                                            element={<VehicleShow />}
                                        />
                                        <Route
                                            path={'/vehicles/vehicle-edit/:id'}
                                            element={<VehicleEdit />}
                                        />

                                        <Route
                                            path={'/users/users-list'}
                                            element={<UsersList />}
                                        />
                                        <Route
                                            path={'/users/user-show/:id'}
                                            element={<UserShow />}
                                        />
                                        <Route
                                            path={'/users/user-edit/:id'}
                                            element={<UserEdit />}
                                        />

                                        <Route
                                            path={'/customers/customers-list'}
                                            element={<CustomersList />}
                                        />
                                        <Route
                                            path={
                                                '/customers/customer-show/:id'
                                            }
                                            element={<CustomerShow />}
                                        />
                                        <Route
                                            path={
                                                '/customers/customer-edit/:id'
                                            }
                                            element={<CustomerEdit />}
                                        />

                                        <Route
                                            path={
                                                '/vehicles/reports/monthly-sales'
                                            }
                                            element={
                                                <VehicleReportsMonthlySales />
                                            }
                                        />
                                        <Route
                                            path={
                                                '/vehicles/reports/annual-sales-brand'
                                            }
                                            element={
                                                <VehicleReportsAnnualSalesBrand />
                                            }
                                        />
                                        <Route
                                            path={
                                                '/vehicles/reports/monthly-sales-type'
                                            }
                                            element={
                                                <VehicleReportsMonthlySalesType />
                                            }
                                        />
                                    </Routes>
                                    <Footer />
                                </Box>
                            </Box>
                        </div>
                    </ApplicationProvider>
                </ThemeProvider>
            </SecurityProvider>
        </React.Fragment>
    )
}

export default App
