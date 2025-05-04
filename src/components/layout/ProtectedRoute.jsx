import { Navigate } from 'react-router-dom';

const getUserFromStorage = () => {
    const user = localStorage.getItem('user'); 
    return user ? JSON.parse(user) : null;
};
const ProtectedRoute = ({ children, role }) => {
    const user = getUserFromStorage();

    if (!user) return <Navigate to="/login" />;

    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
