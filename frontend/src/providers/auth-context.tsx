import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import api, { endpoints } from '@utils/axios.ts';
import type { UserLoginDataDTO, UserRegisterDataDTO } from '../../../shared/DTO/user.dto.ts';

// ----------------------------------------------------------------

type AuthenticatedUser = {
    id: number;
    first_name: string;
    last_name: string;
    role_id: string;
    username: string;
    email: string;
    accessToken: string;
} | null;

type AuthContextType = {
    user: AuthenticatedUser;
    isAuthenticated: boolean;
    register: (userData: UserRegisterDataDTO) => Promise<void>;
    login: (userData: UserLoginDataDTO) => Promise<void>;
    logout: () => Promise<void>;
    // update: (userData: UserProfileInfoDTO) => Promise<void>;
}

enum Types {
    INITIAL = 'INITIAL',
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    UPDATE = 'UPDATE',
}

type Payload = {
    [Types.INITIAL]: { user: AuthenticatedUser };
    [Types.LOGIN]: { user: AuthenticatedUser };
    [Types.REGISTER]: { user: AuthenticatedUser };
    [Types.LOGOUT]: { user: null };
    [Types.UPDATE]: { user: AuthenticatedUser };
}

type ActionsType = {
    type: keyof Payload;
    payload: Payload[keyof Payload];
}

type AuthState = {
    user: AuthenticatedUser;
}

const initialState: AuthState = { user: null };

const reducer = (state: AuthState, action: ActionsType) => {
    switch (action.type) {
        case Types.INITIAL:
            return { user: action.payload.user };
        case Types.REGISTER:
            return { user: action.payload.user };
        case Types.LOGIN:
            return { user: action.payload.user };
        case Types.LOGOUT:
            return { user: null };
        case Types.UPDATE:
            return { user: action.payload.user };
        default:
            return state;
    }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const response = await api.get(endpoints.auth.check);
            const { user } = response.data;

            dispatch({ type: Types.INITIAL, payload: { user }});
        } catch (error) {
            console.error('Error while initializing AuthProvider:', error);
        }
    }, []);

    useEffect(() => {

        initialize();

    }, [ initialize ]);

    const register = useCallback(async (userData: UserRegisterDataDTO) => {
        const response = await api.post(endpoints.auth.register, userData);

        const { user, accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        dispatch({ type: Types.REGISTER, payload: { user }});
    }, []);

    const login = useCallback(async (userData: UserLoginDataDTO) => {
        const response = await api.post(endpoints.auth.login, {
            username: userData.username,
            password: userData.password,
        });

        const { user, accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        dispatch({ type: Types.LOGIN, payload: { user }});
    }, []);

    const logout = useCallback(async () => {
        await api.post(endpoints.auth.logout);

        localStorage.removeItem('accessToken');

        dispatch({ type: Types.LOGOUT, payload: { user: null }});
    }, []);

    // const update = useCallback(async (userData: UserProfileInfoDTO) => {
    //     if (!userData) return;
    //
    //     const response = await api.put(endpoints.users.single(userData.id), userData);
    //
    //     const { user } = response.data;
    //
    //     dispatch({ type: Types.UPDATE, payload: { user }});
    // }, []);

    const memoizedValue = useMemo(
        () => ({
            user: state.user,
            isAuthenticated: !!state.user,
            register,
            login,
            logout,
            // update,
        }),
        [ state.user, register, login, logout ]);

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
};

