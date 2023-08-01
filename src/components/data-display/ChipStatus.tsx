import React from 'react'
import { Chip, ChipProps } from '@mui/material'

import { IStatus } from '@/common'

interface IChipStatusProps {
    statusValue: string
    statuses: IStatus[]
    size?: ChipProps['size']
    variant?: any
}

const ChipStatus: React.FC<IChipStatusProps> = ({
    statusValue,
    statuses,
    size = 'medium',
    variant = 'contained',
}) => {
    const status = statuses.find(
        (status: IStatus) => status.value === statusValue
    )

    return (
        <>
            {status ? (
                <Chip
                    key={status.value}
                    label={status.label}
                    color={status.color as ChipProps['color']}
                    size={size}
                    variant={variant}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default ChipStatus
