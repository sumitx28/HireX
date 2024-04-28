/**
 * Login Page Component.
 * This component provides a login form for users.
 * It includes form fields for email and password.
 * Validates user input using zod schema.
 * Handles form submission and communicates with the authentication provider to authenticate users.
 * Displays error message, loading indicator, and links for signup and password reset.
 * @module Login
 * @author Rushikumar Patel
 */

import React, { useState } from "react";
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
import loginGif from "../../assets/login1.gif";
import { useForm, Controller } from "react-hook-form";
import { z, object } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../authUtility/authprovider";

const validationSchema = object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required." }),
});

const resolver = zodResolver(validationSchema);

function Login() {
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
      password: "",
    },
  });
  const navigate = useNavigate();

  const { loginProvider } = useAuth();

  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const onLoginRequest = async (data) => {
    try {
      setLoading(true);

      await loginProvider(
        data.email,
        data.password,
        setErrorMessage,
        setLoading
      );
      reset({
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during login");
      }
      console.log(error.response);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            "@media (max-width: 600px)": {
              display: "none",
            },
          }}
        >
          <img
            src={loginGif}
            alt="Login Gif"
            style={{ width: "100%", maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(onLoginRequest)}
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

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  onBlur={() => trigger("password")}
                />
              )}
            />
            <Typography variant="body2" color="error">
              {errors.password?.message}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign In
              </Button>
            )}
          </form>
          <Typography variant="body1" mt={2}>
            New Candidate? <Link href="/signup/candidate">Signup</Link>
          </Typography>
          <Typography variant="body1" mt={2}>
            New Recruiter? <Link href="/signup/recruiter">Signup</Link>
          </Typography>
          <Typography variant="body1" mt={2}>
            <Link href="/forgetpassword">Forgot Password?</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
