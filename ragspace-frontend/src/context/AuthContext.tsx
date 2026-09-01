import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { User } from "../types/auth";

import {
    loginUser,
    googleLogin,
} from "../api/authApi";

import { getCurrentUser } from "../api/userApi.ts";


interface AuthContextType {
    isAuthenticated: boolean;

    currentUser: User | null;

    loading: boolean;

    login: (
        email: string,
        password: string,
    ) => Promise<void>;

    logout: () => void;

    loginWithGoogle: (
        credential: string,
    ) => Promise<void>;
}


const AuthContext =
    createContext<AuthContextType | null>(null);


interface AuthProviderProps {
    children: ReactNode;
}


export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [
        isAuthenticated,
        setIsAuthenticated,
    ] = useState(false);

    const [
        currentUser,
        setCurrentUser,
    ] = useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);


    async function initializeAuth() {
        const accessToken =
            localStorage.getItem("access");

        if (!accessToken) {
            setIsAuthenticated(false);
            setLoading(false);

            return;
        }

        try {
            const user =
                await getCurrentUser();

            setCurrentUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(
                "Authentication verification failed:",
                error,
            );

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setCurrentUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }


    async function login(
        email: string,
        password: string,
    ) {
        const tokens = await loginUser(
            email,
            password,
        );

        localStorage.setItem(
            "access",
            tokens.access,
        );

        localStorage.setItem(
            "refresh",
            tokens.refresh,
        );

        const user =
            await getCurrentUser();

        setCurrentUser(user);
        setIsAuthenticated(true);
    }


    async function loginWithGoogle(
        credential: string,
    ) {
        await googleLogin(credential);

        const user =
            await getCurrentUser();

        setCurrentUser(user);
        setIsAuthenticated(true);
    }


    function logout() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
    }


    useEffect(() => {
        initializeAuth();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                currentUser,
                loading,
                login,
                logout,
                loginWithGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider",
        );
    }

    return context;
}