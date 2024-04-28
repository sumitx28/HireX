//@author Rushikumar Patel

import React, {createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import LocalStorageKey from "../services/utils/LocalStorageKey";
import {forgot_password, login, reset_password} from "../services/api/authService";
import { candidate_signup } from "../services/api/authService";
import { recruiter_signup } from "../services/api/authService";
import ROLES from "../services/utils/roles";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState();
    const [jwtToken, setJwtToken] = useState(localStorage.getItem(LocalStorageKey.JWTTOKEN) || null);
    const [user, setUser] = useState((jwtToken && jwtDecode(jwtToken)) || null);

    useEffect(() => {
        if(userData && userData.user && userData.token){
            const token = userData.token;
            const role = userData.user.userRole;

            if (token) {
                localStorage.setItem(LocalStorageKey.JWTTOKEN, token);
                localStorage.setItem(LocalStorageKey.ROLE, role);
                let redirectPath = '/';
                if(role === ROLES.CANDIDATE){
                    redirectPath = '/candidate/home';
                }
                else if(role === ROLES.RECRUITER || role === ROLES.INTERVIEWER){
                    redirectPath = "/recruiter/home";
                }
                navigate(redirectPath, { replace: true });
                setJwtToken(token);
                setUser(jwtDecode(token));
            }
        }
    }, [userData]);

    const loginProvider = (email, password, setErrorMessage, setLoading) => {
        login(email, password, setUserData, setErrorMessage, setLoading);
       
    };

    const candidateSignupProvider = (firstname, lastname, email, password, role, setErrorMessage, setLoading)=>{
        candidate_signup(firstname, lastname, email, password, role, setUserData, setErrorMessage, setLoading);
    };

    
    const recruiterSignupProvider = (firstname, lastname, email, password, role, setErrorMessage, setLoading)=>{
        recruiter_signup( firstname, lastname, email, password, role, setUserData, setErrorMessage, setLoading);
    };

    const forgotPasswordProvider = (email, setErrorMessage, setSubmittedSuccessfully, setLoading) => {
        forgot_password(email, setUserData, setErrorMessage, setSubmittedSuccessfully, setLoading);
        
    }

    const resetPasswordProvider = (code, password, setErrorMessage, setSubmittedSuccessfully)=>{
        reset_password(code, password, setUserData, setErrorMessage, setSubmittedSuccessfully);
       
    }

    const logoutProvider = ()=> {
        localStorage.removeItem(LocalStorageKey.JWTTOKEN);
        localStorage.removeItem(LocalStorageKey.ROLE);
        const redirectPath = '/';
        navigate(redirectPath, { replace: true });
        setJwtToken(null);
        setUser(null);
    }
    
  const value = {
        loginProvider,
        candidateSignupProvider,
        recruiterSignupProvider,
        forgotPasswordProvider,
        resetPasswordProvider,
        logoutProvider,
        jwtToken,
        user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};