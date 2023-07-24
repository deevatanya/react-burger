import { FC } from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { IState } from "../services/initialState";

type Props = {
    element: React.ReactElement;
  }

export const ProtectedRouteElement: FC<Props> = ({ element }) => {
    const getAuthStatus = (state: IState) => state.user.isAuth;
    const isAuth = useSelector(getAuthStatus);

    return isAuth ? element : <Navigate to="/login" replace/>;
} 