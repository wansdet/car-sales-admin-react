import React from 'react'
import DOMPurify from 'dompurify'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { SxProps } from '@mui/system'

interface ParagraphSanitizedProps {
    text: string
    variant?: TypographyProps['variant']
    sx?: SxProps
}

const ParagraphSanitized: React.FC<ParagraphSanitizedProps> = ({
    text,
    variant = 'body1',
    sx,
}) => {
    const sanitizedText = DOMPurify.sanitize(text.replace(/\n/g, '<br>'))

    return (
        <Typography
            variant={variant}
            sx={{ mt: 3, ...sx }}
            dangerouslySetInnerHTML={{
                __html: sanitizedText,
            }}
        />
    )
}

export default ParagraphSanitized
