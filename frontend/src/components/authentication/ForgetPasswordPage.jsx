/**
 * Forget Password Page Component.
 * This component provides a form for users to request a password reset link.
 * It includes a form field for email address and validates it using a zod schema.
 * Handles form submission and communicates with the authentication provider to initiate password reset.
 * Displays error message, success message, and loading indicator based on form submission status.
 * @module ForgetPasswordPage
 * @author Rushikumar Patel
 */

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z, object } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../authUtility/authprovider";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const validationSchema = object({
  email: z.string().email(),
});

const resolver = zodResolver(validationSchema);

function ForgetPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver,
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const { forgotPasswordProvider } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [loading, setLoading] = useState(false);

  const onForgetPasswordRequest = async (data) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      forgotPasswordProvider(
        data.email,
        setErrorMessage,
        setSubmittedSuccessfully,
        setLoading
      );
      reset({ email: "" });
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error Occured !!");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "5rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forget Password
        </Typography>
        <form
          style={{ width: "70%" }}
          onSubmit={handleSubmit(onForgetPasswordRequest)}
          sx={{ mt: 3 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                onBlur={() => trigger("email")}
              />
            )}
          />
          <Typography variant="body2" color="error">
            {errors.email?.message}
          </Typography>

          {errorMessage && (
            <Box
              sx={{
                textAlign: "center",
                color: "red",
                fontSize: "20px",
                fontFamily: "serif",
                m: 1,
              }}
            >
              {errorMessage}
            </Box>
          )}

          {submittedSuccessfully && !errorMessage && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Link Sent Successfully !!
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Reset Password
            </Button>
          )}
        </form>
        <Typography variant="body1">
          Remember your password? <Link href="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default ForgetPasswordPage;
