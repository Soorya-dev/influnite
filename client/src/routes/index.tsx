import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "../features/admin/routes/adminRoutes";
import { influencerRoutes } from "../features/influencer/routes/influencerRoutes";
import {LandingPage} from "../features/shared/pages/LandingPage";
import LandingPagee from "../features/shared/pages/LandingPagee";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
     {
        path: "/home",
        element: <LandingPagee />,
    },
    {
        path: "/admin",
        children: adminRoutes,
    },
  
    {
        path: "/influencer",
        children: influencerRoutes,
    },
]);
