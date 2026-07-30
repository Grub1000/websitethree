import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "../css/LoginPage.css"

// React Router imports
import { Link } from "react-router-dom";


export default function LoginPage(){

    const { login, loginWithGoogle } = useAuth();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(
        e: React.FormEvent
    ){

        e.preventDefault();


        await login(
            email,
            password
        );

        navigate("/profile")
    }

    // function handleForgotPassword(){
    //     navigate("/forgot-password")

    // }

    return (
        <section className="LoginPageWrapper">
            <form  className="LoginPageForm" onSubmit={handleSubmit} >
                <GoogleLogin onSuccess={async (credentialResponse) => {
                if (!credentialResponse.credential) {return}
                try {await loginWithGoogle(credentialResponse.credential);
                navigate("/profile");
                }catch {
                    alert("Google login failed.");
                }}}
                onError={() => {

                    console.log(
                        "Google Login Failed"
                    );

                }}/>
                <input className="LoginPageInput"
                    value={email}
                    onChange={
                        e => setEmail(e.target.value)
                    }
                />
                <input className="LoginPageInput"
                    type="password"
                    value={password}
                    onChange={
                        e => setPassword(e.target.value)
                    }
                />
                <Link className="LoginPageForgotPasswordLink" to="/forgot-password">
                    Forgot Password?
                </Link>

                <button  className="LoginPageButton Btn" type="submit">
                    Login
                </button>
            </form>
        </section>

    );

}


// export default LoginPage;