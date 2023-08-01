import React, { ReactNode } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import Hidden from '@mui/material/Hidden'

interface RightSideBarProps extends BoxProps {
    children: ReactNode
}

const RightSideBar: React.FC<RightSideBarProps> = ({ children, ...props }) => {
    return (
        <Box
            sx={{
                width: '300px',
                flexShrink: 0,
                bgcolor: 'background.paper',
                marginLeft: 'auto',
            }}
            {...props}
        >
            {children}
        </Box>
    )
}

export default RightSideBar
