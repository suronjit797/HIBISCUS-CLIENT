import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'

const RequireAuth = ({ children }) => {
    const [auth, setAuth] = useState({ user: true })  //have to set is user
    let location = useLocation();
    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;