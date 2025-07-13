enum Roots {
    HOME = '/',
    AUTH = '/auth',
    RESERVATION = '/reservations',
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
    reservation: {
        root: Roots.RESERVATION,
        list: `${Roots.RESERVATION}/list`,
    },
};
