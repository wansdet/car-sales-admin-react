import React, { ReactNode } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

interface MainContentProps extends BoxProps {
    children: ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children, ...props }) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                paddingRight: (theme) => theme.spacing(6),
                paddingLeft: (theme) => theme.spacing(6),
                paddingTop: (theme) => theme.spacing(8),
                paddingBottom: (theme) => theme.spacing(8),
                bgcolor: 'background.paper',
                overflowY: 'auto',
            }}
            {...props}
        >
            <article>{children}</article>
        </Box>
    )
}

export default MainContent
