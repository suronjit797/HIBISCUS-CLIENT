import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const RequireAuth = ({ children }) => {

    // fire base
    const [user, loading, error] = useAuthState(auth);
    // location
    let location = useLocation();
    
    // error message
    useEffect(() => {
        if (error) {
            toast.error('User Create Successfully', { theme: "colored" })
            console.log(error);
        }
    }, [error])

    // loading spiner
    if(loading){
        return <Spinner animation="border" variant="primary" />
    }


    
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;