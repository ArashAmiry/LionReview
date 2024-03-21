import { ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }: { children: ReactNode }) {
    const { isLoggedIn } = useAuthContext();
    return (
        <>
        {isLoggedIn === true ? children : <Navigate to="/login" replace />}
        </>)
}

export default PrivateRoutes;