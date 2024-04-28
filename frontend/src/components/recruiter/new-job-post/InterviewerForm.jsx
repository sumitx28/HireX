// @author Sumit Savaliya
import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';

const InterviewerForm = ({ formData, handleChange }) => {
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
                error = value.trim() ? '' : 'First Name is required';
                break;
            case 'lastName':
                error = value.trim() ? '' : 'Last Name is required';
                break;
            case 'interviewerEmail':
                error = value.trim() ? (isValidEmail(value) ? '' : 'Invalid email address') : 'Interviewer Email is required';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChangeWithValidation = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
        handleChange(e);
    };

    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        id="first-name"
                        name="firstName"
                        label="First Name *"
                        variant="outlined"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleChangeWithValidation}
                        style={{ width: '100%' }}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                </div>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        id="last-name"
                        name="lastName"
                        label="Last Name *"
                        placeholder="Enter Last Name"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleChangeWithValidation}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                </div>
            </div>

            <TextField
                fullWidth
                margin="dense"
                id="interviewerEmail"
                name="interviewerEmail"
                label="Interviewer's Email *"
                type="email"
                value={formData.interviewerEmail}
                onChange={handleChangeWithValidation}
                error={!!errors.interviewerEmail}
                helperText={errors.interviewerEmail}
            />
        </>
    );
};

export default InterviewerForm;
