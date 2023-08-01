import React from 'react'
import { ImageList, ImageListItem } from '@mui/material'
import { SxProps } from '@mui/system'
import { merge } from 'lodash'

import { IImage } from '@/common/generic.interface'

interface IImageGalleryProps {
    images: IImage[]
    cols?: number
    gap?: number
    sx?: SxProps
}

const ImageGallery = (props: IImageGalleryProps) => {
    const { images, cols = 3, gap = 15, sx } = props

    // Merge the default sx properties with the passed sx properties
    const mergedSx = merge(
        {
            display: 'flex',
            mt: 5,
        },
        sx
    )

    return (
        <React.Fragment>
            <ImageList sx={mergedSx} cols={cols} gap={gap}>
                {images.map((image) => (
                    <ImageListItem key={image.url}>
                        <img
                            src={`${image.url}`}
                            alt={image.title}
                            loading="lazy"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </React.Fragment>
    )
}

export default ImageGallery
