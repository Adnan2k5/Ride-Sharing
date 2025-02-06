import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
}
