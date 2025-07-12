import LoadingScreen from '@components/loading/loading-screen.tsx';
import { type ElementType, lazy, Suspense } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(
    lazy(() => import('@pages/auth/login-page.tsx')),
);

// MAIN APP
export const LandingPage = Loadable(
    lazy(() => import('@pages/landing/landing-page.tsx')),
);

// ERROR
export const Page403 = Loadable(lazy(() => import('@pages/error/page-403.tsx')));
export const Page404 = Loadable(lazy(() => import('@pages/error/page-404.tsx')));
