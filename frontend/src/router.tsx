import {
    Page403,
    Page404,
    LandingPage, LoginPage,
} from '@routes/elements.tsx';
import { Navigate, useRoutes } from 'react-router';
import { AuthLayout, CompactLayout, MainLayout } from './layouts';

// ----------------------------------------------------------------------

export default function Router() {

    return useRoutes([
        {
            path: 'auth',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: <LoginPage />,
                },
            ],
        },
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    element: <LandingPage />,
                    index: true,
                },
            ],
        },
        {
            element: <CompactLayout />,
            children: [
                { path: '404', element: <Page404 /> },
                { path: '403', element: <Page403 /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> }, // guard all non-existing routes with 404 page
    ]);

}
