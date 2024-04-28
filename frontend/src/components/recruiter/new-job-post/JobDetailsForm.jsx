// @author Sumit Savaliya
import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const JobDetailsForm = ({ formData, handleChange, handleImageUpload }) => {
    const [errors, setErrors] = useState({});
    const [imageSelected, setImageSelected] = useState(false);

    const handleImageChange = (event) => {
        handleImageUpload(event);
        setImageSelected(true);
    };

    const handleImageClear = () => {
        setImageSelected(false);
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'position':
                error = value.trim() === '' ? 'Position is required' : '';
                break;
            case 'companyName':
                error = value.trim() === '' ? 'Company Name is required' : '';
                break;
            case 'jobLocation':
                error = value.trim() === '' ? 'Job Location is required' : '';
                break;
            case 'companyOverview':
                error = value.trim() === '' ? 'Company Overview is required' : '';
                break;
            case 'jobDescription':
                error = value.trim() === '' ? 'Job Description is required' : '';
                break;
            case 'requiredSkills':
                error = value.trim() === '' ? 'Required Skills are required' : '';
                break;
            case 'companyImage':
                error = value === null ? 'Company Image is required' : '';
                break;
            case 'requiredQualifications':
                error = value.trim() === '' ? 'Qualification is required' : '';
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        id="position"
                        name="position"
                        label="Position *"
                        variant="outlined"
                        placeholder="Full Stack Web Developer"
                        value={formData.position}
                        onChange={handleChangeWithValidation}
                        style={{ width: '100%' }}
                        error={!!errors.position}
                        helperText={errors.position}
                    />
                </div>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        id="company-name"
                        name="companyName"
                        label="Company Name *"
                        placeholder="Apple Inc."
                        variant="outlined"
                        value={formData.companyName}
                        onChange={handleChangeWithValidation}
                        error={!!errors.companyName}
                        helperText={errors.companyName}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        id="job-location"
                        name="jobLocation"
                        label="Job Location *"
                        placeholder="Remote, Canada"
                        variant="outlined"
                        value={formData.jobLocation}
                        onChange={handleChangeWithValidation}
                        error={!!errors.jobLocation}
                        helperText={errors.jobLocation}
                    />
                </div>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Select
                        labelId="employment-type"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        <MenuItem value="Full Time">Full Time</MenuItem>
                        <MenuItem value="Part Time">Part Time</MenuItem>
                        <MenuItem value="Open">Open</MenuItem>
                    </Select>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <TextField
                    fullWidth
                    id="company-overview"
                    name="companyOverview"
                    label="Company Overview *"
                    multiline
                    placeholder="Apple Inc. is an American multinational..."
                    rows={4}
                    variant="outlined"
                    value={formData.companyOverview}
                    onChange={handleChangeWithValidation}
                    error={!!errors.companyOverview}
                    helperText={errors.companyOverview}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <TextField
                    fullWidth
                    id="job-description"
                    name="jobDescription"
                    label="Job Description *"
                    multiline
                    placeholder="You will contribute to the technical design..."
                    rows={4}
                    variant="outlined"
                    value={formData.jobDescription}
                    onChange={handleChangeWithValidation}
                    error={!!errors.jobDescription}
                    helperText={errors.jobDescription}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ flex: '1', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        id="required-skills"
                        name="requiredSkills"
                        label="Required Skills *"
                        variant="outlined"
                        placeholder="Spring Boot, Java, Hibernate"
                        value={formData.requiredSkills}
                        onChange={handleChangeWithValidation}
                        error={!!errors.requiredSkills}
                        helperText={errors.requiredSkills}
                    />
                </div>
                <div style={{ flex: '1', marginLeft: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {imageSelected ? (
                        <Box display="flex" alignItems="center">
                            <Typography variant="button" sx={{ color: 'green' }}>Image Selected</Typography>
                            <IconButton onClick={handleImageClear}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <Button variant="contained" component="label" fullWidth>
                            Upload Image
                            <input type="file" hidden accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                        </Button>
                    )}
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <TextField
                    fullWidth
                    id="required-qualifications"
                    name="requiredQualifications"
                    label="Required Qualifications *"
                    multiline
                    placeholder="Deep understanding of software design principles and architecture..."
                    rows={4}
                    variant="outlined"
                    value={formData.requiredQualifications}
                    onChange={handleChangeWithValidation}
                    error={!!errors.requiredQualifications}
                    helperText={errors.requiredQualifications}
                />
            </div>
        </div>
    );
};

export default JobDetailsForm;
