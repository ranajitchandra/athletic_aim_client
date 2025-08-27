import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import Loading from '../shared/Loading';
import useUserRole from '../hooks/useUserRole';
import { AuthContext } from '../../context/AuthContextProvider';

const UserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    }

    if (role !== 'user' && !roleLoading) {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default UserRoute;