import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material'

import {
    IMedia,
    IMediaQueryProps,
} from '@/components/components.generic.interface'

interface ICardMediaGridProps {
    media: IMedia[]
    buttonText: string
    infoPrefix: string
    mediaQueryProps?: IMediaQueryProps
}

const CardMediaGrid = (props: ICardMediaGridProps) => {
    const {
        media,
        buttonText,
        infoPrefix,
        mediaQueryProps = { xs: 12, sm: 6, md: 4, lg: 4 },
    } = props

    return (
        <Grid data-test="card-media-grid" container spacing={4} sx={{ mt: 0 }}>
            {media?.map((item: IMedia) => (
                <Grid
                    item
                    key={item.id}
                    xs={mediaQueryProps.xs}
                    sm={mediaQueryProps.sm}
                    md={mediaQueryProps.md}
                    lg={mediaQueryProps.lg}
                >
                    <Card
                        data-test="grid-card"
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        variant={'outlined'}
                    >
                        <CardMedia
                            component="div"
                            sx={{
                                // 16:9
                                pt: '56.25%',
                            }}
                            image={item.image}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <article>
                                <Typography
                                    data-test="grid-card-title"
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {item.title}
                                </Typography>
                                <Typography data-test="grid-card-description">
                                    {item.description}
                                </Typography>
                            </article>
                        </CardContent>
                        <CardActions sx={{ mb: 1, ml: 1, mr: 1 }}>
                            <Link
                                key={item.title}
                                to={item.link}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Button
                                    data-test="grid-card-button"
                                    size="small"
                                    variant="contained"
                                    title={`${infoPrefix} ${item.title}`}
                                    aria-label={`${infoPrefix} ${item.title}`}
                                    sx={{ mr: 1 }}
                                >
                                    {buttonText}
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default CardMediaGrid
