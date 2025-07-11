import LoadingScreen from '@components/loading/loading-screen.tsx';
import { type ElementType, lazy, Suspense } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

// ----------------------------------------------------------------------

// MAIN APP
export const LandingPage = Loadable(
    lazy(() => import('@pages/landing/landing-page.tsx')),
);

// ERROR
export const Page403 = Loadable(lazy(() => import('@pages/error/page-403.tsx')));
export const Page404 = Loadable(lazy(() => import('@pages/error/page-404.tsx')));
