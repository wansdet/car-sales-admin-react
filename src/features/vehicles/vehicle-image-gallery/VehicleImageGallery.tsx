import React from 'react'
import Grid from '@mui/material/Grid'

import { BASE_IMAGE_ASSETS_URL } from '@/core/application'

const VehicleImageGallery = () => {
    return (
        <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img
                        src={`${BASE_IMAGE_ASSETS_URL}/600x400?text=Vehicle Image`}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <img
                                src={`${BASE_IMAGE_ASSETS_URL}/600x400?text=Vehicle Image`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <img
                                src={`${BASE_IMAGE_ASSETS_URL}/600x400?text=Vehicle Image`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <img
                                src={`${BASE_IMAGE_ASSETS_URL}/600x400?text=Vehicle Image`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <img
                                src={`${BASE_IMAGE_ASSETS_URL}/600x400?text=Vehicle Image`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default VehicleImageGallery
