// @author Sumit Savaliya
import React, { useState } from 'react';
import { Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';

const Benefits = ({ formData, handleChange, isSalaryMinInvalid, isSalaryMaxInvalid }) => {
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'salaryMin':
                error = value.trim() === '' ? 'Min Salary is required' : '';
                break;
            case 'salaryMax':
                error = value.trim() === '' ? 'Max Salary is required' : '';
                break;
            case 'healthInsurance':
                error = value.trim() === '' ? 'Health Insurance is required' : '';
                break;
            case 'retirementPlan':
                error = value.trim() === '' ? 'Retirement Plan is required' : '';
                break;
            case 'certificationsOrLicenses':
                error = value.trim() === '' ? 'Certifications or Licenses are required' : '';
                break;
            case 'leaves':
                error = value.trim() === '' ? 'Leaves are required' : '';
                break;
            case 'language':
                error = value.trim() === '' ? 'Language Proficiency is required' : '';
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

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormControl variant="outlined" style={{ flex: '1' }}>
                    <InputLabel htmlFor="outlined-min-salary">Min Salary</InputLabel>
                    <OutlinedInput
                        id="outlined-min-salary"
                        name="salaryMin"
                        label="Min Salary *"
                        onChange={handleChange}
                        placeholder="80000"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type="number"
                        value={formData.salaryMin}
                        error={!!errors.salaryMin}
                        helperText={errors.salaryMin}
                    />
                    {isSalaryMinInvalid && <Typography variant="caption" color="error">Min Salary must be less than Max</Typography>}
                </FormControl>
                <FormControl variant="outlined" style={{ flex: '1', marginLeft: '5px' }}>
                    <InputLabel htmlFor="outlined-max-salary">Max Salary</InputLabel>
                    <OutlinedInput
                        id="outlined-max-salary"
                        name="salaryMax"
                        label="Max Salary *"
                        placeholder="100000"
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type="number"
                        value={formData.salaryMax}
                        error={!!errors.salaryMax}
                        helperText={errors.salaryMax}
                    />
                    {isSalaryMaxInvalid && <Typography variant="caption" color="error">Max Salary must be greater than Min</Typography>}
                </FormControl>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                    id="health-insurance"
                    name="healthInsurance"
                    label="Health Insurance *"
                    variant="outlined"
                    placeholder="Provided or Not Provided"
                    value={formData.healthInsurance}
                    onChange={handleChangeWithValidation}
                    fullWidth
                    error={!!errors.healthInsurance}
                    helperText={errors.healthInsurance}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                    id="retirement-plan"
                    name="retirementPlan"
                    label="Retirement Plan *"
                    variant="outlined"
                    placeholder="401(k) matching"
                    value={formData.retirementPlan}
                    onChange={handleChangeWithValidation}
                    fullWidth
                    error={!!errors.retirementPlan}
                    helperText={errors.retirementPlan}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                    id="certifications-or-licenses"
                    name="certificationsOrLicenses"
                    label="Certifications or Licenses *"
                    variant="outlined"
                    placeholder="AWS Solutions Architect"
                    value={formData.certificationsOrLicenses}
                    onChange={handleChangeWithValidation}
                    fullWidth
                    error={!!errors.certificationsOrLicenses}
                    helperText={errors.certificationsOrLicenses}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                    id="leaves"
                    name="leaves"
                    label="Leaves *"
                    variant="outlined"
                    placeholder="15 days per year"
                    value={formData.leaves}
                    onChange={handleChangeWithValidation}
                    fullWidth
                    error={!!errors.leaves}
                    helperText={errors.leaves}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    id="language"
                    name="language"
                    label="Language Proficiency *"
                    variant="outlined"
                    placeholder="English, French"
                    value={formData.language}
                    onChange={handleChangeWithValidation}
                    fullWidth
                    error={!!errors.language}
                    helperText={errors.language}
                />
            </div>
        </div>
    );
};

export default Benefits;
