// @author Roshni Joshi
// This component renders the 'Select assessment settings' step of coding assessment form

import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getLanguages } from '../../services/api/PreInterviewEvaluationApis';

export default function CodeFormFirstPage({ data, setData, hasSubmitted }) {
  const [languages, setLanguages] = useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getLanguages(setLanguages);
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ px: '7%' }}>
        <Grid container rowGap={3} columnSpacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="languages"
              options={languages}
              disableCloseOnSelect
              value={data.languages}
              getOptionLabel={(language) => language}
              onChange={(event, value) => setData(prev => ({ ...prev, languages: value }))}
              renderOption={(props, language, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {language}
                </li>
              )}
              fullWidth
              renderInput={(params) => (
                <TextField
                  error={hasSubmitted && (data.languages.length === 0)}
                  helperText={(hasSubmitted && (data.languages.length === 0)) ? "Must not be empty" : ""}
                  {...params}
                  label="Languages" />
              )}
            />
          </Grid>
          <Grid item container xs={12} rowGap={3} columnSpacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="duration"
                label="Duration"
                type="text"
                value={data.duration}
                helperText={(hasSubmitted && (data.duration === "")) ? "Must not be empty" : "Must be between 10 and 120"}
                error={hasSubmitted && (data.duration === "" || data.duration < 10 || data.duration > 120)}
                onChange={(e) => setData(prev => ({ ...prev, duration: e.target.value.replace(/[^\d]/g, '') }))}
                placeholder="Minutes"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="passPercent"
                label="Passing Criteria"
                type="text"
                value={data.passPercentage}
                error={hasSubmitted && (data.passPercentage === "" || data.passPercentage < 10 || data.passPercentage > 100)}
                onChange={(e) => setData(prev => ({ ...prev, passPercentage: e.target.value.replace(/[^\d]/g, '') }))}
                placeholder="Percentage (%)"
                helperText={hasSubmitted && (data.passPercentage === "") ? "Must not be empty" : "Must be between 10 and 100"}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}
