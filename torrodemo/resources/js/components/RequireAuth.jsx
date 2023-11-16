import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    const isAuthenticated = auth?.isSignedIn;

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default RequireAuth;