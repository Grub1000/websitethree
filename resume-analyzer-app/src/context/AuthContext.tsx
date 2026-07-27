import {
    createContext,
    useContext,
    useState,
} from "react";

import type {ReactNode} from "react";

// Api Auth Services Imports
import { loginUser } from "../api/auth_service";

interface AuthContextType {

    isAuthenticated:boolean;

    login:(
        username:string,
        password:string
    ) => Promise<void>;

    logout:()=>void;

}


const AuthContext = createContext<AuthContextType | null>(null);



interface AuthProviderProps {
    children: ReactNode;
}



export function AuthProvider({
    children
}: AuthProviderProps) {


    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("access"))
    );


    async function login(
    username:string,
    password:string
    ){

    const tokens = await loginUser(
        username,
        password
    );


    localStorage.setItem(
        "access",
        tokens.access
    );


    localStorage.setItem(
        "refresh",
        tokens.refresh
    );


    setIsAuthenticated(true);

    }



    function logout(){

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");


        setIsAuthenticated(false);

    }



    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth(){

    const context = useContext(AuthContext);


    if(!context){

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }


    return context;

}