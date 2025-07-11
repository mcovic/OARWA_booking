enum Roots {
    HOME = '/',
    AUTH = '/auth',
}

// ----------------------------------------------------------------------

export const paths = {
    home: {
        root: Roots.HOME,
    },
    auth: {
        login: `${Roots.AUTH}/login`,
        register: `${Roots.AUTH}/register`,
    },
};
