import type { RouteObject } from "react-router-dom";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminInfluencerListingPage from "../pages/AdminInfluencerListingPage";
import AdminBusinessListingPage from "../pages/AdminBusinessListingPage";

export const adminRoutes: RouteObject[] = [
    {
        path: "login",
        element: <AdminLoginPage />,
    },
    {
        path: "influencers",
        element: <AdminInfluencerListingPage />,
    },
    {
        path: "business",
        element: <AdminBusinessListingPage />,
    },
];
