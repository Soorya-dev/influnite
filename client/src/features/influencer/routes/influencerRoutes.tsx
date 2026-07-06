import type { RouteObject } from "react-router-dom";
import InfluencerRegisterPage from "../pages/InfluencerRegisterPage";
import InfluencerLoginPage from "../pages/InfluencerLoginPage";
import InfluencerForgotPasswordPage from "../pages/InfluencerForgotPasswordPage";

export const influencerRoutes: RouteObject[] = [
    {
        path: "register",
        element: <InfluencerRegisterPage />,
    },
    {
        path: "login",
        element: <InfluencerLoginPage />,
    },
    {
        path: "forgot-password",
        element: <InfluencerForgotPasswordPage />,
    },
];
