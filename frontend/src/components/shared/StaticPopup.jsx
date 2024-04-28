// @author Raj Patel

import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'

export default function StaticPopup({ open, message, closeMessage, handleClose }) {

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{message}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {closeMessage}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
