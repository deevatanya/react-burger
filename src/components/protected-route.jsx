import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function ProtectedRouteElement({ element }) {
    const getAuthStatus = (state) => state.user.isAuth;
    const isAuth = useSelector(getAuthStatus);

    return isAuth ? element : <Navigate to="/login" replace/>;
} 