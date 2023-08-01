import React from 'react'
import { Box, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'

const SocialMedia = () => {
    return (
        <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" marginRight={1}>
                <FacebookIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="grey.700">
                    facebook
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <TwitterIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="grey.700">
                    twitter
                </Typography>
            </Box>
        </Box>
    )
}

export default SocialMedia
