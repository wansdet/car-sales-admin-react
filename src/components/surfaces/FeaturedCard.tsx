import React from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

interface ILink {
    url: string
    title: string
}

interface IFeaturedCardProps {
    title: string
    description: string
    image: string
    link: ILink
}

const FeaturedCard = (props: IFeaturedCardProps) => {
    const { title, description, image, link } = props

    return (
        <Grid item xs={12} md={12}>
            <CardActionArea component={Link} to={link.url}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            {link.title}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 160,
                            display: { xs: 'none', sm: 'block' },
                        }}
                        image={image}
                        alt={title}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    )
}

export default FeaturedCard
