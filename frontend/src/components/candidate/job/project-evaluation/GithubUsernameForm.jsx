// @author Vivek Sonani

import { Box, Button, CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { z, object } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const validationSchema = object({
    username: z.string().min(1, { message: "Username is required." })
});

const resolver = zodResolver(validationSchema);

//component to render github username form
const GithubUsernameForm = ({ submitGitHubUsername, validationError, submitSpinner }) => {
    const { control, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver,
        defaultValues: {
            username: ''
        }
    });

    return (
        <Stack style={{ display: 'flex', flexDirection: 'column' }}>
            <Box style={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                    GitHub Repository
                </Typography>
            </Box>
            <Divider />
            <Box style={{ flex: 1, overflowY: 'auto', margin: '1rem', display: 'flex', flexDirection: 'column' }}>
                <form style={{ width: '40rem' }} onSubmit={handleSubmit(submitGitHubUsername)}>
                    <Stack spacing={1}>
                        <Stack>
                            <Typography>GitHub Username</Typography>
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        onBlur={() => trigger('username')}
                                    />
                                )}
                            />
                            <Typography style={{ color: 'red' }}>{errors.username?.message}</Typography>
                            {validationError ?
                                <Typography style={{ color: 'red' }}>{validationError}</Typography>
                                :
                                <></>
                            }

                        </Stack>
                        <Stack>
                            {submitSpinner ?
                                <CircularProgress />
                                :
                                <Button type="submit" variant="contained">Submit</Button>
                            }
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Stack>
    )
};

export default GithubUsernameForm;