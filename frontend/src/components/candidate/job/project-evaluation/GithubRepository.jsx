// @author Vivek Sonani

import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

//component to render github repository
const GithubRepository = ({ link }) => {
    return (
        <Stack style={{ display: 'flex', flexDirection: 'column' }}>
            <Box style={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                    GitHub Repository
                </Typography>
            </Box>
            <Divider />
            <Box style={{ flex: 1, overflowY: 'auto', margin: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ whiteSpace: 'pre-line' }}>
                    <Link to={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
};

export default GithubRepository;