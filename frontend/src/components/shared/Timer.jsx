import React from 'react';
import { Typography } from '@mui/material';
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, variant }) => {
    const {
        seconds,
        minutes,
        hours
    } = useTimer({ expiryTimestamp });

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant={variant}>
                <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
            </Typography>
        </div>
    );
}

export default Timer;