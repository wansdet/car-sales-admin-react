import React from 'react'
import { Container, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Container
            data-testid="footer"
            maxWidth={false}
            sx={{
                py: 1,
                height: 'auto',
                marginTop: 'auto',
            }}
        >
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                Your Website {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    )
}

export default Footer
