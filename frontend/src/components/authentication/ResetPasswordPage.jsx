/**
 * Reset Password Page Component.
 * This component provides a form for users to reset their password.
 * It includes fields for new password and confirm password.
 * Validates user input using zod schema.
 * Handles form submission and communicates with the authentication provider to reset the password.
 * Displays error message, loading indicator, and redirects to the login page upon successful password reset.
 * @module ResetPasswordPage
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
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z, object } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../authUtility/authprovider";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const validationSchema = object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine(
      (value) =>
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value),
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      }
    ),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
}).refine((value) => value.confirmPassword === value.newPassword, {
  message: "New Password and confirm password must be same.",
  path: ["confirmPassword"],
});

const resolver = zodResolver(validationSchema);

function ResetPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver,
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const { code } = useParams();

  const { resetPasswordProvider } = useAuth();

  useEffect(() => {
    if (submittedSuccessfully) {
      navigate("/login");
    }
  }, [submittedSuccessfully]);

  const onResetPassword = async (data) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      resetPasswordProvider(
        code,
        data.newPassword,
        setErrorMessage,
        setSubmittedSuccessfully
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
    <Container maxWidth="xs" sx={{ marginTop: "5rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit(onResetPassword)}
          sx={{ mt: 3 }}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                name="newPassword"
                label="newPassword"
                type="password"
                id="newPassword"
                autoComplete="current-password"
                size="small"
                onBlur={() => trigger("newPassword")}
              />
            )}
          />
          <Typography variant="body2" color="error">
            {errors.newPassword?.message}
          </Typography>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                size="small"
                onBlur={() => trigger("confirmPassword")}
                // value={formData.password}
                // onChange={handleChange}
              />
            )}
          />
          <Typography variant="body2" color="error">
            {errors.confirmPassword?.message}
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
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default ResetPasswordPage;
