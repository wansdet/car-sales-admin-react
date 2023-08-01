import React, { ReactNode } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface IConfirmDialogProps<T> {
    title: string
    children: ReactNode
    open: boolean
    onConfirm: () => void
    onClose: () => void
}

const ConfirmDialog = <T extends {}>({
    title,
    children,
    open,
    onConfirm,
    onClose,
}: IConfirmDialogProps<T>) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'text.secondary',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={onConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
