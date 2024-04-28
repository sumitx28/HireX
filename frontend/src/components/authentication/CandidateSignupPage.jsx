/**
 * Candidate Signup Page Component.
 * This component provides a form for candidates to sign up.
 * It includes form fields for first name, last name, email, password, and confirm password.
 * Validates user input using zod schema.
 * Handles form submission and communicates with the authentication provider to sign up candidates.
 * @module CandidateSignupPage
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
  firstname: z
    .string()
    .min(1, { message: "Firstname is required." })
    .refine((value) => !/\d/.test(value), {
      message: "Firstname cannot contain numbers.",
    })
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: "Firstname cannot contain special characters.",
    }),
  lastname: z
    .string()
    .min(1, { message: "Lastname is required." })
    .refine((value) => !/\d/.test(value), {
      message: "Lastname cannot contain numbers.",
    })
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: "Lastname cannot contain special characters.",
    }),
  email: z.string().email(),
  password: z
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
    .min(1, { message: "Confirm Password is required." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required." }),
}).refine((value) => value.confirmPassword === value.password, {
  message: "Password and confirm password must be same.",
  path: ["confirmPassword"],
});

const resolver = zodResolver(validationSchema);

function CandidateSignupPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver,
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const { candidateSignupProvider } = useAuth(); //v

  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  // Function to handle form submission
  const onRegisterRequest = async (data) => {
    try {
      setLoading(true);
      await candidateSignupProvider(
        data.firstname,
        data.lastname,
        data.email,
        data.password,
        "candidate",
        setErrorMessage,
        setLoading
      );

      reset({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        setErrorMessage("An error occurred during signup.");
      }
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
            Candidate SignUp
          </Typography>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(onRegisterRequest)}
            sx={{ mt: 3 }}
          >
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="firstname"
                  label="Firstname"
                  name="firstname"
                  autoComplete="firstname"
                  size="small"
                  onBlur={() => trigger("firstname")}
                />
              )}
            />
            <Typography variant="body2" color="error">
              {errors.firstname?.message}
            </Typography>

            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  name="lastname"
                  autoComplete="lastname"
                  size="small"
                  onBlur={() => trigger("lastname")}
                />
              )}
            />
            <Typography variant="body2" color="error">
              {errors.lastname?.message}
            </Typography>

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
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  size="small"
                  onBlur={() => trigger("confirmPassword")}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
          </form>
          <Typography variant="body1">
            Already have an account? <Link href="/login">Login here</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default CandidateSignupPage;
