import { createBrowserRouter } from "react-router-dom";
import WalletConnect from "../components/WalletConnect/WalletConnect";
import UserRegistration from "../components/UserRegistration/UserRegistration";
import Homepage from "../pages/Homepage/Homepage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";


export const routes = createBrowserRouter(
    [
        {
            path:"/",
            element : (
                <WalletConnect/>
            )
        },
        {
            path:"/register",
            element : (
                <UserRegistration/>
            )
        }, {
            path:"/home",
            element : (
                <ProtectedRoute>
                    <Homepage/>
                </ProtectedRoute>
            )
        },
    ]
)