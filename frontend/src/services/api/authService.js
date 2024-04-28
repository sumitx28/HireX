/**
 * Module containing functions to handle user authentication and password management.
 * @module AuthService
 * @author Rushikumar Patel
 */

import hirexAxios from "../utils/hirexAxiosIntercepter";
import { LOGIN } from "../utils/ApiConstants";
import { CANDIDATE_SIGNUP } from "../utils/ApiConstants";
import { RECRUITER_SIGNUP } from "../utils/ApiConstants";
import { FORGOT_PASSWORD } from "../utils/ApiConstants";
import { RESET_PASSWORD } from "../utils/ApiConstants";

export const login = (
  email,
  password,
  setUserData,
  setErrorMessage,
  setLoading
) => {
  hirexAxios
    .post(LOGIN, {
      email,
      password,
    })
    .then((data) => {
      setUserData(data.data);
      setLoading(true);
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setLoading(false);
    });
};

export const candidate_signup = (
  firstname,
  lastname,
  email,
  password,
  role,
  setUserData,
  setErrorMessage,
  setLoading
) => {
  hirexAxios
    .post(CANDIDATE_SIGNUP, {
      firstname,
      lastname,
      email,
      password,
      role,
    })
    .then((data) => {
      setUserData(data.data);
      setLoading(true);
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setLoading(false);
    });
};

export const recruiter_signup = (
  firstname,
  lastname,
  email,
  password,
  role,
  setUserData,
  setErrorMessage,
  setLoading
) => {
  hirexAxios
    .post(RECRUITER_SIGNUP, {
      firstname,
      lastname,
      email,
      password,
      role,
    })
    .then((data) => {
      setUserData(data.data);
      setLoading(true);
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setLoading(false);
    });
};

export const forgot_password = (
  email,
  setUserData,
  setErrorMessage,
  setSubmittedSuccessfully,
  setLoading
) => {
  hirexAxios
    .post(FORGOT_PASSWORD, {
      email,
    })
    .then((data) => {
      setUserData(data.data);
      setSubmittedSuccessfully(true);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setLoading(false);
    });
};

export const reset_password = (
  code,
  password,
  setUserData,
  setErrorMessage,
  setSubmittedSuccessfully
) => {
  hirexAxios
    .post(RESET_PASSWORD, { code, password })
    .then((data) => {
      setUserData(data.data);
      setSubmittedSuccessfully(true);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.message);
    });
};
