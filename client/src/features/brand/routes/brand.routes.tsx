// features/brand/routes/brand.routes.tsx
import type {RouteObject } from 'react-router-dom';
import BrandLoginPage from '../pages/BrandLoginPage';
import BrandRegisterPage from '../pages/BrandRegisterPage';
import BrandDashboardPage from '../pages/BrandDashboardPage';
import BrandForgotPasswordPage from "../pages/BrandForgotPasswordPage";

export const brandRoutes: RouteObject[] =[
    {
        path: '/brand/register',
        element: <BrandRegisterPage />
    },
    {
        path: '/brand/login',
        element: <BrandLoginPage />
    },
    {
        path: '/brand/dashboard',
        element: <BrandDashboardPage />
    },
    {
     path: "/brand/forgot-password",
    element: <BrandForgotPasswordPage />,
    }
]