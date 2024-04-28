// @author Vivek Sonani

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Tooltip } from '@mui/material';
import Timer from '../../../../shared/Timer';

// component to render code editor header
const CodeEditorHeader = ({ changeTheme, themeTooltipTitle, resetCode, language, handleChange, codeAssessmentData, codeAssessmentResult }) => {
    const [time, setTime] = useState();

    useEffect(() => {
        if (codeAssessmentResult && codeAssessmentData) {
            const startDateTime = new Date(codeAssessmentResult.startTime);

            const endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(startDateTime.getMinutes() + codeAssessmentData.duration);

            setTime(endDateTime);
        }
    }, [codeAssessmentResult, codeAssessmentData]);

    return (
        <Box style={{ height: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box style={{ fontSize: '2rem', justifyContent: 'flex-start', marginLeft: '0.5rem' }}>
                {time && <Timer expiryTimestamp={time} variant={'h5'} />}
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '1rem' }}>
                <Button style={{ color: 'black' }} onClick={changeTheme}>
                    <Tooltip title={themeTooltipTitle}>
                        <SettingsBrightnessIcon style={{ fontSize: '2rem' }} />
                    </Tooltip>
                </Button>
                <Button style={{ color: 'black', paddingRight: '0.5rem' }} onClick={resetCode}>
                    <Tooltip title="Reset Code">
                        <RefreshIcon style={{ fontSize: '2rem' }} />
                    </Tooltip>
                </Button>
                {codeAssessmentData && codeAssessmentData.languages &&
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            onChange={handleChange}
                            style={{ height: '2rem' }}
                        >
                            {codeAssessmentData.languages.map((lang, index) => (
                                <MenuItem key={index} value={lang}>
                                    {lang}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
            </Box>
        </Box>
    );
}

export default CodeEditorHeader;