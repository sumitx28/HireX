// @author Roshni Joshi

import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';

export default function Popup({data}) {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate(data.navigateTo, {state: data.stateData})
  };

  return (
    <Box>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>{data.message}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
