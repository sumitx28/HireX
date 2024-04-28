//@author Rushikumar Patel

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import LocalStorageKey from "../services/utils/LocalStorageKey";

const Authentication = ({ children }) => {
    const token  = localStorage.getItem(LocalStorageKey.JWTTOKEN);
    const location = useLocation();
    
    if (!token) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    return children;
};

export default Authentication;