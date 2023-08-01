import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import { merge } from 'lodash'
import { Palette } from '@mui/material/styles'

interface INavLink {
    url: string
    title: string
    icon?: string
}

interface INavigationListProps {
    listTitle: string
    navLinks: INavLink[]
    linkColor?: string | keyof Palette['text']
    sx?: SxProps
}

const NavigationList = (props: INavigationListProps) => {
    const theme = useTheme()

    const {
        listTitle,
        navLinks,
        linkColor = theme.palette.primary.main,
        sx,
    } = props

    // Merge the default sx properties with the passed sx properties
    const mergedSx = merge(
        {
            p: 2,
            mt: 3,
            backgroundColor: 'grey.200',
        },
        sx
    )

    return (
        <Paper elevation={0} sx={mergedSx}>
            <Typography component="h2" variant="h5" gutterBottom>
                {listTitle}
            </Typography>
            {navLinks.map((link, index) => (
                <Typography key={index} gutterBottom>
                    <Link
                        to={link.url}
                        style={{ textDecoration: 'none', color: linkColor }}
                    >
                        {link.title}
                    </Link>
                </Typography>
            ))}
        </Paper>
    )
}

export default NavigationList
