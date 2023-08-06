import { FC } from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { IState } from "../services/initialState";

type Props = {
    element: React.ReactElement;
  }

export const ProtectedRouteElement: FC<Props> = ({ element }) => {
    const getAuthStatus = (state: IState) => state.user;
    const {isAuth, authRequest} = useSelector(getAuthStatus);
    const location = useLocation();

    if (authRequest) return <Navigate to={`${location.pathname}`} replace/>
    return isAuth ? element : <Navigate to="/login" replace/>;
} 