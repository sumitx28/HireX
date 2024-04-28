// @author Vivek Sonani

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

// component to show code editor footer
const CodeEditorFooter = ({
    setConsoleBox,
    setTestcaseBox,
    changeConsoleState,
    generateResult,
    onSubmitCode,
    runSpinner,
    setRunSpinner,
    submitSpinner,
    setSubmitSpinner
}) => {
    return (
        <Box style={{ height: '3rem', display: 'flex', justifyContent: 'space-between', justifySelf: 'flex-end', alignItems: 'center' }}>
            <Box style={{ padding: '0.5rem', justifyContent: 'flex-start' }}>
                <Button onClick={changeConsoleState} style={{ height: '2rem' }}>
                    Console
                </Button>
            </Box>
            <Box style={{ padding: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                {!runSpinner ?
                    <Button variant='outlined' style={{ marginRight: '0.5rem', height: '2rem' }} onClick={() => { generateResult(); setConsoleBox(true); setTestcaseBox(false); setRunSpinner(true); }}>
                        Run
                    </Button>
                    :
                    <CircularProgress style={{ marginRight: '0.5rem', height: '2rem' }} />
                }
                {!submitSpinner ?
                    <Button variant='contained' style={{ height: '2rem' }} onClick={() => { onSubmitCode(); setConsoleBox(true); setTestcaseBox(false); setSubmitSpinner(true); }}>
                        Submit
                    </Button>
                    :
                    <CircularProgress style={{ height: '2rem' }} />
                }
            </Box>
        </Box>
    );
};

export default CodeEditorFooter;