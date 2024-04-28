// @author Vivek Sonani

import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

//component to render project description
const Description = ({ description }) => {
    return (
        <Stack style={{ display: 'flex', flexDirection: 'column' }}>
            <Box style={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                    Description
                </Typography>
            </Box>
            <Divider />
            <Box style={{ flex: 1, overflowY: 'auto', margin: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ whiteSpace: 'pre-line' }}>
                    {description}
                </Typography>
            </Box>
        </Stack>
    )
};

export default Description;