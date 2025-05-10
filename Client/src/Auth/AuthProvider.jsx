import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.loading === false && user.isAuthenticated === true && user.user === null) {
            navigate('/login');
        }
    }, [user, navigate]);

    return children;
};

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.loading === false) {
            if (user.user != null) {
                if (user?.user?.role !== "captain") {
                    navigate('/401');
                }
            } else {
                navigate('/login');
            }
        }
    }, [user, navigate]);

    return user?.user?.role === "captain" ? children : null;
};