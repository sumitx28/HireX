// @author Vivek Sonani

import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

//component to render additional requirement
const AdditionalRequirement = ({ additionalRequirement }) => {
    return (
        <Stack style={{ display: 'flex', flexDirection: 'column' }}>
            <Box style={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                    Additional Requirement
                </Typography>
            </Box>
            <Divider />
            <Box style={{ flex: 1, overflowY: 'auto', marginTop: '1rem', marginLeft: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ whiteSpace: 'pre-wrap' }}>
                    {additionalRequirement}
                </Typography>
            </Box>
        </Stack>
    )
};

export default AdditionalRequirement;