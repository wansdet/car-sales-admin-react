import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

export interface IImageCarousel {
    original: string
    thumbnail: string
}

interface ICarouselProps {
    images: IImageCarousel[]
    showThumbnails?: boolean
}

const Carousel = (props: ICarouselProps) => {
    const { images, showThumbnails = false } = props

    return (
        <React.Fragment>
            <CssBaseline />
            {/* The Box component has width: '100vw' set, which makes it span
            the full width of the viewport. The overflowX property of the Box
            component is set to 'hidden' to remove any horizontal scrollbars
            caused by the gallery exceeding the viewport width. */}
            <Box
                data-testid="carousel"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'grey.200',
                }}
            >
                <ImageGallery
                    autoPlay={true}
                    items={images}
                    lazyLoad={true}
                    showFullscreenButton={false}
                    showNav={false}
                    showPlayButton={false}
                    showThumbnails={showThumbnails}
                    slideInterval={10000}
                />
            </Box>
        </React.Fragment>
    )
}

export default Carousel
